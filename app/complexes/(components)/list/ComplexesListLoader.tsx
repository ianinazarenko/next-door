'use client';

import { IComplexBase, IComplexesState } from '@/types/complexes';
import { fetchComplexesAction } from '@/lib/actions/append-complexes';
import InfiniteLoader from '@/ui/common/wrappers/infinite-loader/InfiniteLoader';
import ComplexesCard from '@/app/complexes/(components)/card/ComplexesCard';

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
