import { ITEMS_PER_PAGE } from '@/utils/constants/posts';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useInfiniteScroll } from '../useInfiniteScroll';

let observerCallback: (entries: unknown[]) => void;

global.IntersectionObserver = jest.fn().mockImplementation((callback) => {
    observerCallback = callback; // Catch the callback when observer is created
    return {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    };
});

describe('useInfiniteScroll', () => {
    const mockAction = jest.fn();

    const DEFAULT_OPTIONS = {
        initialOffset: 0,
        initialHasMore: true,
        params: { complexSlug: 'test' },
        action: mockAction,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (observerCallback as unknown) = null;
    });

    it('should initialize with correct default values', () => {
        const { result } = renderHook(() => useInfiniteScroll(DEFAULT_OPTIONS));

        expect(result.current.hasMore).toBe(true);
        expect(result.current.items).toEqual([]);
        expect(result.current.isLoading).toBe(false);
    });

    it('should load more items when element becomes visible', async () => {
        const mockData = {
            results: [{ id: 1, title: 'Post 1' }],
            hasMore: true,
        };

        mockAction.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useInfiniteScroll(DEFAULT_OPTIONS));

        // Simulate the element appearing in the visibility zone
        // Wrap it in an act, as this will trigger a state update
        await act(async () => {
            observerCallback([{ isIntersecting: true }]);
        });

        // Waiting for the state to change
        await waitFor(() => {
            expect(result.current.items).toHaveLength(1);
        });

        expect(result.current.items).toEqual(mockData.results);
        expect(mockAction).toHaveBeenCalledWith({
            limit: ITEMS_PER_PAGE,
            offset: 0,
            params: DEFAULT_OPTIONS.params,
        });
    });

    it('should not load more items when initialHasMore is false', async () => {
        const optionsWithNoMore = {
            ...DEFAULT_OPTIONS,
            initialHasMore: false,
        };

        renderHook(() => useInfiniteScroll(optionsWithNoMore));

        if (observerCallback) {
            await act(async () => {
                observerCallback([{ isIntersecting: true }]);
            });
        }

        expect(mockAction).not.toHaveBeenCalled();
    });
});
