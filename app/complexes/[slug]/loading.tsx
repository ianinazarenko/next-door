import ComplexHeroSkeleton from '@/app/components/pages/complex/skeleton/ComplexHeroSkeleton';
import ComplexInfoSkeleton from '@/app/components/pages/complex/info/ComplexInfoSkeleton';

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
