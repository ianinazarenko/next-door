// Constants
import { DYNAMIC_PAGES_METADATA } from '@/data/seo';
// Types
import { Metadata } from 'next';
// Utils
import { notFound } from 'next/navigation';
import { fetchComplexCached } from '@/lib/data-access/queries/complexes';
// Components
import ComplexHero from '@/app/complexes/[slug]/(components)/hero/ComplexHero';
import ComplexInfo from '@/app/complexes/[slug]/(components)/info/ComplexInfo';

export const revalidate = 86400; // 60 * 60 * 24 – once in 24 hours

interface IProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { slug } = await params;
    const complex = await fetchComplexCached(slug);
    return DYNAMIC_PAGES_METADATA.COMPLEX_DETAIL(complex);
}

export default async function ComplexPage({ params }: IProps) {
    const { slug } = await params;

    try {
        const complex = await fetchComplexCached(slug);

        if (!complex) {
            return notFound();
        }

        return (
            <div className={'page'}>
                <ComplexHero complex={complex} />

                <div className={'c-container'}>
                    <ComplexInfo complex={complex} />
                </div>
            </div>
        );
    } catch (error) {
        console.error('[ComplexPage]: Error loading complex:', slug, error);
        throw error;
    }
}
