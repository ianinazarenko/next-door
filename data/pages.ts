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
    NEW_POST: {
        slug: EPages.NewPost,
        title: 'Create New Post',
        link: `/${EPages.Posts}/new`,
    },
    SIGN_IN: {
        slug: EPages.SignIn,
        title: 'SignIn',
        link: `/${EPages.SignIn}`,
    },
};
