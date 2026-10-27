import type { IComplexFull } from '@/types/complexes';
import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

// Components
import ComplexHero from '@/app/(public)/complexes/[slug]/(components)/hero/ComplexHero';
import ComplexInfo from '@/app/(public)/complexes/[slug]/(components)/info/ComplexInfo';
// Constants
import { DYNAMIC_PAGES_METADATA } from '@/data/seo';
import { fetchComplexCached } from '@/lib/data-access/queries/complexes';

export const revalidate = 86400; // 60 * 60 * 24 – once in 24 hours

interface IProps {
    params: Promise<{ slug: string }>;
}

async function getComplex(slug: string): Promise<IComplexFull | null> {
    try {
        return await fetchComplexCached(slug);
    } catch (error) {
        console.error('[complexes/[slug]]: Error loading complex:', slug, error);
        throw error;
    }
}
export async function generateMetadata({ params }: IProps): Promise<Metadata> {
    const { slug } = await params;
    const complex = await getComplex(slug);
    return DYNAMIC_PAGES_METADATA.COMPLEX_DETAIL(complex);
}

export default async function ComplexPage({ params }: IProps) {
    const { slug } = await params;
    const complex = await getComplex(slug);

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
}
