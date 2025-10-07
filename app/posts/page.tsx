// Constants
import { PAGES_METADATA } from '@/utils/data/seo';
// Types
import { IPostsState } from '@/types/posts';
import { Metadata } from 'next';
// Styles
import clsx from 'clsx';
import s from './page.module.css';
// Components
import { Suspense } from 'react';
import PostsHeader from '@/app/components/pages/posts/PostsHeader';
import PostsListSkeleton from '@/app/components/pages/posts/skeletons/PostsListSkeleton';
import PostsListAddBtn from '@/app/components/pages/posts/list/PostsListAddBtn';
import PostsListSection from '@/app/components/pages/posts/list/PostsListSection';
import PostsFiltersSection from '@/app/components/pages/posts/filters/PostsFiltersSection';
import PostsFiltersSkeleton from '@/app/components/pages/posts/filters/PostsFiltersSkeleton';

export const metadata: Metadata = PAGES_METADATA.POSTS;

export default async function PostsPage({ searchParams }: { searchParams: Promise<IPostsState> }) {
    const params = await searchParams;
    try {
        return (
            <div className={'page c-container'}>
                <PostsHeader />

                <Suspense fallback={<PostsFiltersSkeleton />}>
                    <PostsFiltersSection />
                </Suspense>

                <section className={clsx('section', s.list)}>
                    <Suspense fallback={<PostsListSkeleton />}>
                        <PostsListSection params={params} />
                    </Suspense>

                    <PostsListAddBtn />
                </section>
            </div>
        );
    } catch (error) {
        console.error('[PostsPage]: Error loading posts:', error);
        throw error;
    }
}
