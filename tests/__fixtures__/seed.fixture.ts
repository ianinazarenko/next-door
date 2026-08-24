export const QUERY_PARAMS = {
    search: 'search',
    complex: 'complex',
    category: 'category',
} as const;

export const COMPLEXES = {
    buglessHeights: {
        name: 'Bugless Heights',
        value: 'bugless-heights',
    },
    pixelPark: {
        name: 'Pixel Park Residences',
        value: 'pixel-park',
    },
} as const;

export const POST_CATEGORIES = {
    event: {
        name: 'Event',
        value: 'event',
    },
    giveAway: {
        name: 'Give Away',
        value: 'give-away',
    },
    sell: {
        name: 'Sell',
        value: 'sell',
    },
} as const;

export const COMPLEX_SEARCH = {
    placeholder: 'Search complexes...',
    query: 'Pixel',
    emptyQuery: 'NonExistentComplex',
    emptyText: 'Sorry, no complexes found',
} as const;
