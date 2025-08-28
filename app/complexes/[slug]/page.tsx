import { fetchComplex } from '@/lib/queries';

import { Suspense } from 'react';
import ComplexNotFound from '@/app/components/pages/complexes/complex/not-found/ComplexNotFound';
import ComplexHero from '@/app/components/pages/complexes/complex/hero/ComplexHero';
import ComplexHeroSkeleton from '@/app/components/pages/complexes/complex/skeleton/ComplexHeroSkeleton';

export const revalidate = 86400; // 60 * 60 * 24 – once in 24 hours

export default async function ComplexPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const complex = await fetchComplex(slug);

    if (!complex) {
        return (
            <div className={'page c-container'}>
                <ComplexNotFound />
            </div>
        );
    }

    return (
        <div className={'page'}>
            <Suspense fallback={<ComplexHeroSkeleton />}>
                <ComplexHero complex={complex} />
            </Suspense>

            <div className={'c-container'}></div>
        </div>
    );
}
