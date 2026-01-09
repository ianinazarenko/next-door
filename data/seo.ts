import { PAGES } from '@/data/pages';
import type { Metadata } from 'next';
import { IPostFull } from '@/types/posts';
import { IComplexFull } from '@/types/complexes';

export const PAGES_METADATA: Record<keyof typeof PAGES, Metadata> = {
    HOME: {
        title: 'NextDoor – Help is next door!',
        description:
            'NextDoor is a community platform where neighbors can connect, share information, and support each other.',
        alternates: {
            canonical: PAGES.HOME.link,
        },
    },
    POSTS: {
        title: 'Announcements Board | NextDoor',
        description: 'Find local announcements, events and community updates.',
        alternates: {
            canonical: PAGES.POSTS.link,
        },
    },
    NEW_POST: {
        title: 'Create New Announcement | NextDoor',
        description: 'Share your latest events, requests or updates with the community members.',
        alternates: {
            canonical: PAGES.NEW_POST.link,
        },
    },
    COMPLEXES: {
        title: 'Find Your Complex | NextDoor',
        description: 'Access information about residential complexes in your area.',
        alternates: {
            canonical: PAGES.COMPLEXES.link,
        },
    },
    SIGN_IN: {
        title: 'Sign In | NextDoor',
        description: 'Sign in to your NextDoor account to connect with neighbors and access community features.',
        alternates: {
            canonical: PAGES.SIGN_IN.link,
        },
    },
};

export const DYNAMIC_PAGES_METADATA = {
    POST_DETAIL: (val: IPostFull | null): Metadata => ({
        title: val?.title ? `${val?.title} | NextDoor` : 'Announcement | NextDoor',
        description: val?.shortText || 'Full announcement information',
        alternates: {
            canonical: val?.id ? `${PAGES.POSTS.link}/${val.id}` : `${PAGES.POSTS.link}/id`,
        },
    }),
    COMPLEX_DETAIL: (val: IComplexFull | null): Metadata => ({
        title: val?.name ? `${val?.name} Residential Complex | NextDoor` : 'Residential Complex | NextDoor',
        description: val?.description || 'Full residential complex information',
        alternates: {
            canonical: val?.slug ? `${PAGES.COMPLEXES.link}/${val.slug}` : `${PAGES.COMPLEXES.link}/slug`,
        },
    }),
};
