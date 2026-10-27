import type { IPostsSearchParams, IPostsState } from '@/types/posts';
import type { Metadata } from 'next';

import clsx from 'clsx';
import { Suspense } from 'react';

import PostsListAddBtn from '@/app/(public)/posts/(components)/add-button/PostsListAddBtn';
import PostsFiltersSection from '@/app/(public)/posts/(components)/filters/PostsFiltersSection';
import PostsFiltersSkeleton from '@/app/(public)/posts/(components)/filters/PostsFiltersSkeleton';
import PostsHeader from '@/app/(public)/posts/(components)/header/PostsHeader';
import PostsListSkeleton from '@/app/(public)/posts/(components)/list/skeletons/PostsListSkeleton';
import PostsListSection from '@/app/(public)/posts/(components)/section/PostsListSection';
import { PAGES_METADATA } from '@/data/seo';
// Utils
import { getSearchParamValue } from '@/utils/helpers/url-utils';

import s from './page.module.css';

export const metadata: Metadata = PAGES_METADATA.POSTS;

export default async function PostsPage({
    searchParams,
}: {
    searchParams: Promise<IPostsSearchParams>;
}) {
    const { complex, category } = await searchParams;

    const params: IPostsState = {
        complex: getSearchParamValue(complex) ?? '',
        category: getSearchParamValue(category) ?? '',
    };

    const postsListKey = `${params.complex}-${params.category}`;

    return (
        <div className={'page c-container'}>
            <PostsHeader />

            <Suspense fallback={<PostsFiltersSkeleton />}>
                <PostsFiltersSection />
            </Suspense>

            <section className={clsx('section', s.list)}>
                <Suspense
                    key={postsListKey}
                    fallback={<PostsListSkeleton />}
                >
                    <PostsListSection params={params} />
                </Suspense>

                <PostsListAddBtn />
            </section>
        </div>
    );
}
