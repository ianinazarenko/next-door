// Constants
import { PAGES_METADATA } from '@/utils/data/seo';
import { ITEMS_PER_PAGE, OFFSET } from '@/utils/constants/posts';
// Types
import { IPostsState } from '@/types/posts';
import { Metadata } from 'next';
// Utils
import { fetchComplexesSpecs } from '@/lib/queries/complexes';
import { fetchCategoriesSpecs } from '@/lib/queries/categories';
import { fetchPostsAction } from '@/lib/actions/append-posts';
// Components
import { Suspense } from 'react';
import PostsHeader from '@/app/components/pages/posts/PostsHeader';
import PostsFilters from '@/app/components/pages/posts/filters/PostsFilters';
import PostsList from '@/app/components/pages/posts/list/PostsList';
import PostsListSkeleton from '@/app/components/pages/posts/skeletons/PostsListSkeleton';
import PostsListAddBtn from '@/app/components/pages/posts/list/PostsListAddBtn';
import PostsListLoader from '@/app/components/pages/posts/list/PostsListLoader';

export const metadata: Metadata = PAGES_METADATA.POSTS;

export default async function PostsPage({ searchParams }: { searchParams: Promise<IPostsState> }) {
    const params = await searchParams;
    try {
        const [complexSpecs, categoriesSpecs, postsData] = await Promise.all([
            fetchComplexesSpecs(),
            fetchCategoriesSpecs(),
            fetchPostsAction({ limit: ITEMS_PER_PAGE, offset: OFFSET, params }),
        ]);

        return (
            <div className={'page c-container'}>
                <PostsHeader />

                <PostsFilters specs={{ complex: complexSpecs, category: categoriesSpecs }} />

                <section className='section'>
                    <Suspense fallback={<PostsListSkeleton />}>
                        <PostsList posts={postsData.results} />
                    </Suspense>

                    <PostsListLoader
                        initialOffset={OFFSET + ITEMS_PER_PAGE}
                        initialHasMore={postsData.hasMore}
                        params={params}
                    />

                    <PostsListAddBtn />
                </section>
            </div>
        );
    } catch (error) {
        console.error('[PostsPage]: Error loading posts:', error);
        throw error;
    }
}
