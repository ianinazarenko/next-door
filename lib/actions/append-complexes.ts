'use server';

import type { IComplexBase, IComplexesState } from '@/types/complexes';

import { fetchComplexes } from '@/lib/data-access/queries/complexes';

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
