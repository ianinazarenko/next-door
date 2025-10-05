'use client';

// Styles
import s from './InfiniteLoader.module.css';
// Utils
import { PulseLoader } from 'react-spinners';
import { useInfiniteScroll } from '@/utils/hooks/infinite-scroll/useInfiniteScroll';

interface IProps<T, P> {
    initialOffset: number;
    initialHasMore: boolean;
    params: P;
    action: (params: { limit: number; offset: number; params: P }) => Promise<{ results: T[]; hasMore: boolean }>;
    renderItem: (item: T) => React.ReactNode;
}

const LOAD_MORE_TXT = 'Load more...';
const NO_POSTS_TXT = 'There is no more cards';

export default function InfiniteLoader<T extends { id: string | number }, P>({
    initialOffset,
    initialHasMore,
    params,
    renderItem,
    action,
}: IProps<T, P>) {
    const { items, hasMore, isLoading, loaderRef } = useInfiniteScroll<T, P>({
        initialOffset,
        initialHasMore,
        params,
        action,
    });
    return (
        <>
            <div className={s.list}>
                {items.map((item) => (
                    <div key={item.id}>{renderItem(item)}</div>
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
