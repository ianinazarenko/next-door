import type { IPage } from '@/types/menu';

import { EPages } from '@/utils/constants/menu';

export const PAGES: Record<string, IPage> = {
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
    NEW_POST: {
        slug: EPages.NewPost,
        title: 'Create announcement',
        shortTitle: 'Create',
        link: `/${EPages.Posts}/new`,
    },
    SIGN_IN: {
        slug: EPages.SignIn,
        title: 'Sign In',
        link: `/${EPages.SignIn}`,
    },
};
