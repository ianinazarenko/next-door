import ComplexHeroSkeleton from '@/app/(public)/complexes/[slug]/(components)/hero/skeletons/ComplexHeroSkeleton';
import ComplexInfoSkeleton from '@/app/(public)/complexes/[slug]/(components)/info/skeletons/ComplexInfoSkeleton';

export default function ComplexPageLoading() {
    return (
        <div className={'page'}>
            <ComplexHeroSkeleton />

            <div className={'c-container'}>
                <ComplexInfoSkeleton />
            </div>
        </div>
    );
}
