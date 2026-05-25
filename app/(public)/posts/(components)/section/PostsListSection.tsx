import { ITEMS_PER_PAGE, OFFSET } from '@/utils/constants/posts';
import { IPostsState } from '@/types/posts';
import { fetchPostsAction } from '@/lib/actions/append-posts';
import PostsList from '@/app/(public)/posts/(components)/list/PostsList';
import PostsListLoader from '@/app/(public)/posts/(components)/list/PostsListLoader';

export default async function PostsListSection({ params }: { params: IPostsState }) {
    let postsData: Awaited<ReturnType<typeof fetchPostsAction>>;

    try {
        postsData = await fetchPostsAction({ limit: ITEMS_PER_PAGE, offset: OFFSET, params });
    } catch (error) {
        console.error('[PostsListSection]: Error loading posts:', error);
        throw error;
    }

    const { results, hasMore } = postsData;

    return (
        <>
            <PostsList posts={results} />

            <PostsListLoader
                initialOffset={OFFSET + ITEMS_PER_PAGE}
                initialHasMore={hasMore}
                params={params}
                key={JSON.stringify(params)}
            />
        </>
    );
}
