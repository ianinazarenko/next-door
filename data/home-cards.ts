import { IHomeCard } from '@/types/home-cards';
import { PAGES } from '@/data/pages';

export const HOME_CARDS: IHomeCard[] = [
    {
        id: 'board',
        icon: 'LayoutDashboard',
        title: 'Announcement board',
        description: 'See requests, offers and events from your neighbors.',
        link: PAGES.POSTS.link,
        linkLabel: 'Explore announcements',
    },
    {
        id: 'complexes',
        icon: 'Building2',
        title: 'Residential Complexes',
        description: 'Find your building and its useful contacts.',
        link: PAGES.COMPLEXES.link,
        linkLabel: 'Find your complex',
    },
    {
        id: 'create',
        icon: 'SquarePen',
        title: 'Create an announcement',
        description: 'Ask for help, give something away, or invite your neighbors.',
        link: PAGES.NEW_POST.link,
        linkLabel: 'Create announcement',
    },
];
