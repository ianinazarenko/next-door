import { IPostListItem, IPostsState } from '@/types/posts';
import { useEffect, useRef, useState } from 'react';
import { fetchPostsAction } from '@/lib/actions/append-posts';
import { POSTS_PER_PAGE } from '@/utils/constants/posts';

interface IProps {
    initialOffset: number;
    initialHasMore: boolean;
    params: IPostsState;
    action: typeof fetchPostsAction;
}

const OPTIONS = {
    rootMargin: '10px',
    threshold: 1.0,
};

export function useInfiniteScroll({ initialOffset, initialHasMore, params, action }: IProps) {
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
            const { results, hasMore } = await action({
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

    return {
        posts,
        offset,
        hasMore,
        isLoading,
        loaderRef,
    };
}
