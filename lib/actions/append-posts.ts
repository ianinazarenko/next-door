'use server';

import type { IPostListItem, IPostsState } from '@/types/posts';

import { fetchPosts } from '@/lib/data-access/queries/posts';

export async function fetchPostsAction({
    limit,
    offset,
    params,
}: {
    limit: number;
    offset: number;
    params: IPostsState;
}): Promise<{ results: IPostListItem[]; hasMore: boolean }> {
    return fetchPosts({ limit, offset, params });
}
