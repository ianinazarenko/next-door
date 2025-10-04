'use server';

import { fetchPosts } from '@/lib/queries/posts';
import { IPostListItem, IPostsState } from '@/types/posts';

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
