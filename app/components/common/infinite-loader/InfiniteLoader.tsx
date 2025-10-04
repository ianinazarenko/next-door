'use client';

// Constants
import { POSTS_PER_PAGE } from '@/utils/constants/posts';
// Types
import { IPostListItem, IPostsState } from '@/types/posts';
// Styles
import s from './InfiniteLoader.module.css';
// Utils
import { fetchPostsAction } from '@/lib/actions/append-posts';
import { useEffect, useRef, useState } from 'react';
// Components
import PostsListCard from '@/app/components/pages/posts/list/PostsListCard';
import { PulseLoader } from 'react-spinners';

interface IProps {
    initialOffset: number;
    initialHasMore: boolean;
    params: IPostsState;
}

const LOAD_MORE_TXT = 'Load more...';
const NO_POSTS_TXT = 'There is no more cards';
const OPTIONS = {
    rootMargin: '10px',
    threshold: 1.0,
};
export default function InfiniteLoader({ initialOffset, initialHasMore, params }: IProps) {
    const [posts, setPosts] = useState<IPostListItem[]>([]);
    const [offset, setOffset] = useState(initialOffset);
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    async function handleObserver(entries: IntersectionObserverEntry[]) {
        if (!hasMore || isLoading) return;

        if (entries[0].isIntersecting) {
            await loadMore();
        }
    }

    async function loadMore() {
        setIsLoading(true);

        try {
            const { results, hasMore } = await fetchPostsAction({
                limit: POSTS_PER_PAGE,
                offset,
                params,
            });

            setPosts((prev) => [...prev, ...results]);
            setOffset((prev) => prev + POSTS_PER_PAGE);
            setHasMore(hasMore);
        } catch (error) {
            console.error('[InfiniteLoader / loadMore]: Error loading more posts:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!hasMore) return;

        const observer = new IntersectionObserver(handleObserver, OPTIONS);

        const target = loaderRef.current;
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target && observer) {
                observer.unobserve(target);
            }
        };
    }, [offset, hasMore, isLoading]);

    return (
        <>
            <div className={s.list}>
                {posts.map((post) => (
                    <PostsListCard
                        key={post.id}
                        post={post}
                    />
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
