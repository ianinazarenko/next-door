'use server';

import { fetchComplexes } from '@/lib/queries/complexes';
import { IComplexBase, IComplexesState } from '@/types/complexes';

export async function fetchComplexesAction({
    limit,
    offset,
    params,
}: {
    limit: number;
    offset: number;
    params: IComplexesState;
}): Promise<{ results: IComplexBase[]; hasMore: boolean }> {
    return fetchComplexes({ limit, offset, params });
}
