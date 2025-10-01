// Constants
import { DYNAMIC_PAGES_METADATA } from '@/utils/data/seo';
// Types
import { Metadata } from 'next';
// Utils
import { notFound } from 'next/navigation';
import { fetchComplexCached } from '@/lib/queries/complexes';
// Components
import { Suspense } from 'react';
import ComplexHero from '@/app/components/pages/complex/hero/ComplexHero';
import ComplexHeroSkeleton from '@/app/components/pages/complex/skeleton/ComplexHeroSkeleton';
import ComplexInfo from '@/app/components/pages/complex/info/ComplexInfo';
import ComplexInfoSkeleton from '@/app/components/pages/complex/info/ComplexInfoSkeleton';

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
                <Suspense fallback={<ComplexHeroSkeleton />}>
                    <ComplexHero complex={complex} />
                </Suspense>

                <div className={'c-container'}>
                    <Suspense fallback={<ComplexInfoSkeleton />}>
                        <ComplexInfo complex={complex} />
                    </Suspense>
                </div>
            </div>
        );
    } catch (error) {
        console.error('[ComplexPage]: Error loading complex:', slug, error);
        throw error;
    }
}
