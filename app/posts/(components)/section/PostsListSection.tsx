import { ITEMS_PER_PAGE, OFFSET } from '@/utils/constants/posts';
import { IPostsState } from '@/types/posts';
import { fetchPostsAction } from '@/lib/actions/append-posts';
import PostsList from '@/app/posts/(components)/list/PostsList';
import PostsListLoader from '@/app/posts/(components)/list/PostsListLoader';

export default async function PostsListSection({ params }: { params: IPostsState }) {
    try {
        const postsData = await fetchPostsAction({ limit: ITEMS_PER_PAGE, offset: OFFSET, params });
        return (
            <>
                <PostsList posts={postsData.results} />

                <PostsListLoader
                    initialOffset={OFFSET + ITEMS_PER_PAGE}
                    initialHasMore={postsData.hasMore}
                    params={params}
                    key={JSON.stringify(params)}
                />
            </>
        );
    } catch (error) {
        console.error('[PostsListSection]: Error loading posts:', error);
        throw error;
    }
}
