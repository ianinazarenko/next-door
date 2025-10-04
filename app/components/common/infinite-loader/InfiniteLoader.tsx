'use client';

// Types
import { IPostListItem, IPostsState } from '@/types/posts';
// Styles
import s from './InfiniteLoader.module.css';
// Utils
import { fetchPostsAction } from '@/lib/actions/append-posts';
// Components
import { PulseLoader } from 'react-spinners';
import { useInfiniteScroll } from '@/utils/hooks/infinite-scroll/useInfiniteScroll';

interface IProps {
    initialOffset: number;
    initialHasMore: boolean;
    params: IPostsState;
    action: typeof fetchPostsAction;
    renderItem: (props: IPostListItem) => React.ReactNode;
}

const LOAD_MORE_TXT = 'Load more...';
const NO_POSTS_TXT = 'There is no more cards';

export default function InfiniteLoader({ initialOffset, initialHasMore, params, renderItem, action }: IProps) {
    const { posts, hasMore, isLoading, loaderRef } = useInfiniteScroll({
        initialOffset,
        initialHasMore,
        params,
        action,
    });

    return (
        <>
            <div className={s.list}>
                {posts.map((post) => (
                    <div key={post.id}>{renderItem(post)}</div>
                ))}
            </div>

            {hasMore && !isLoading && (
                <div
                    ref={loaderRef}
                    style={{ padding: '20px', textAlign: 'center' }}
                >
                    {isLoading ? <PulseLoader /> : <span>{LOAD_MORE_TXT}</span>}
                </div>
            )}
            {!hasMore && <div style={{ padding: '20px', textAlign: 'center' }}>{NO_POSTS_TXT}</div>}
        </>
    );
}
