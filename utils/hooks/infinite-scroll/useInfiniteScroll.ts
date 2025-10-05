import { useEffect, useRef, useState } from 'react';
import { ITEMS_PER_PAGE } from '@/utils/constants/posts';

interface IUseInfiniteScrollProps<T, P> {
    initialOffset: number;
    initialHasMore: boolean;
    params: P;
    action: (params: { limit: number; offset: number; params: P }) => Promise<{
        results: T[];
        hasMore: boolean;
    }>;
    limit?: number;
}

const OPTIONS = {
    rootMargin: '10px',
    threshold: 1.0,
};

export function useInfiniteScroll<T, P>({
    initialOffset,
    initialHasMore,
    params,
    action,
}: IUseInfiniteScrollProps<T, P>) {
    const [items, setItems] = useState<T[]>([]);
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
                limit: ITEMS_PER_PAGE,
                offset,
                params,
            });

            setItems((prev) => [...prev, ...results]);
            setOffset((prev) => prev + ITEMS_PER_PAGE);
            setHasMore(hasMore);
        } catch (error) {
            console.error('[useInfiniteScroll / loadMore]: Error loading more items:', error);
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
        items,
        hasMore,
        isLoading,
        loaderRef,
    };
}
