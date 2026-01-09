'use client';

import { IPostListItem, IPostsState } from '@/types/posts';
import { fetchPostsAction } from '@/lib/actions/append-posts';
import InfiniteLoader from '@/ui/common/wrappers/infinite-loader/InfiniteLoader';
import PostsListCard from '@/app/(public)/posts/(components)/card/PostsListCard';

interface IProps {
    initialOffset: number;
    initialHasMore: boolean;
    params: IPostsState;
}

export default function PostsListLoader({ initialOffset, initialHasMore, params }: IProps) {
    const renderPostCard = (post: IPostListItem) => <PostsListCard post={post} />;

    return (
        <InfiniteLoader<IPostListItem, IPostsState>
            initialOffset={initialOffset}
            initialHasMore={initialHasMore}
            params={params}
            action={fetchPostsAction}
            renderItem={renderPostCard}
        />
    );
}
