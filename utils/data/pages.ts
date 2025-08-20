import { EPages } from '@/utils/constants/menu';

export const PAGES = {
    HOME: {
        slug: EPages.Home,
        title: 'Home',
        link: `/`,
    },
    POSTS: {
        slug: EPages.Posts,
        title: 'Board',
        link: `/${EPages.Posts}`,
    },
    COMPLEXES: {
        slug: EPages.Complexes,
        title: 'Complexes',
        link: `/${EPages.Complexes}`,
    },
};
