// Types
import { IPostListItem } from '@/types/posts';
// Utils
import { fetchPosts } from '@/lib/queries';
// Components
import { Suspense } from 'react';
import PostsHeader from '@/app/components/pages/posts/PostsHeader';
import PostsFilters from '@/app/components/pages/posts/filters/PostsFilters';
import PostsList from '@/app/components/pages/posts/list/PostsList';
import PostsListSkeleton from '@/app/components/pages/posts/skeletons/PostsListSkeleton';

export interface IPostsPageParams {
    categorySlug?: string;
    complexSlug?: string;
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<IPostsPageParams> }) {
    const params = await searchParams;

    try {
        const posts: IPostListItem[] = await fetchPosts({ limit: 10, offset: 0, params });

        console.log(posts);

        return (
            <div className={'page c-container'}>
                <PostsHeader />

                <PostsFilters />

                <Suspense fallback={<PostsListSkeleton />}>
                    <PostsList posts={posts} />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error('[PostsPage]: Error loading complexes:', error);
        throw error;
    }
}
