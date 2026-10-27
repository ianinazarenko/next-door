'use client';

import type { IComplexBase, IComplexesState } from '@/types/complexes';

import ComplexesCard from '@/app/(public)/complexes/(components)/card/ComplexesCard';
import { fetchComplexesAction } from '@/lib/actions/append-complexes';
import InfiniteLoader from '@/ui/common/wrappers/infinite-loader/InfiniteLoader';

interface IProps {
    initialOffset: number;
    initialHasMore: boolean;
    params: IComplexesState;
}

export default function ComplexesListLoader({ initialOffset, initialHasMore, params }: IProps) {
    const renderComplexCard = (props: IComplexBase) => <ComplexesCard {...props} />;

    return (
        <InfiniteLoader<IComplexBase, IComplexesState>
            initialOffset={initialOffset}
            initialHasMore={initialHasMore}
            params={params}
            action={fetchComplexesAction}
            renderItem={renderComplexCard}
        />
    );
}
