import { notFound } from 'next/navigation';
import { fetchComplex } from '@/lib/queries';

import { Suspense } from 'react';
import ComplexHero from '@/app/components/pages/complex/hero/ComplexHero';
import ComplexHeroSkeleton from '@/app/components/pages/complex/skeleton/ComplexHeroSkeleton';
import ComplexInfo from '@/app/components/pages/complex/info/ComplexInfo';
import ComplexInfoSkeleton from '@/app/components/pages/complex/info/ComplexInfoSkeleton';

export const revalidate = 86400; // 60 * 60 * 24 – once in 24 hours

export default async function ComplexPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    try {
        const complex = await fetchComplex(slug);

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
