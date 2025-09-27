// Types
import { IPostsState } from '@/types/posts';
// Utils
import { fetchComplexesSpecs } from '@/lib/queries/complexes';
import { fetchCategoriesSpecs } from '@/lib/queries/categories';
import { fetchPosts } from '@/lib/queries/posts';
// Components
import { Suspense } from 'react';
import PostsHeader from '@/app/components/pages/posts/PostsHeader';
import PostsFilters from '@/app/components/pages/posts/filters/PostsFilters';
import PostsList from '@/app/components/pages/posts/list/PostsList';
import PostsListSkeleton from '@/app/components/pages/posts/skeletons/PostsListSkeleton';

export default async function PostsPage({ searchParams }: { searchParams: Promise<IPostsState> }) {
    const params = await searchParams;
    try {
        const [complexSpecs, categoriesSpecs, posts] = await Promise.all([
            fetchComplexesSpecs(),
            fetchCategoriesSpecs(),
            fetchPosts({ limit: 10, offset: 0, params }),
        ]);

        return (
            <div className={'page c-container'}>
                <PostsHeader />

                <PostsFilters specs={{ complex: complexSpecs, category: categoriesSpecs }} />

                <Suspense fallback={<PostsListSkeleton />}>
                    <PostsList posts={posts} />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error('[PostsPage]: Error loading posts:', error);
        throw error;
    }
}
