import { IHomeCard } from '@/types/home-cards';
import { PAGES } from '@/utils/data/pages';

export const HOME_CARDS: IHomeCard[] = [
    {
        id: 'board',
        icon: 'LayoutDashboard',
        title: 'Bulletin board',
        description: 'Find local announcements, events and community updates.',
        link: PAGES.POSTS.link,
        linkLabel: 'View Board',
    },
    {
        id: 'complexes',
        icon: 'Building2',
        title: 'Residential Complexes',
        description: 'Access information about residential complexes in your area.',
        link: PAGES.COMPLEXES.link,
        linkLabel: 'Go to Page',
    },
    {
        id: 'create',
        icon: 'SquarePen',
        title: 'Create an announcement',
        description: 'Share your latest events, requests or updates with the community members.',
        link: PAGES.NEW_POST.link,
        linkLabel: 'Create Now',
    },
];
