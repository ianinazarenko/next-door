import type { IPanelItem } from '@/types/menu';

import { Building2, House, LayoutDashboard, SquarePen } from 'lucide-react';

import { PAGES } from '@/data/pages';

export const MENU_LIST: IPanelItem[] = [
    { icon: House, link: PAGES.HOME.link, label: PAGES.HOME.title },
    { icon: LayoutDashboard, link: PAGES.POSTS.link, label: PAGES.POSTS.title },
    {
        icon: SquarePen,
        link: PAGES.NEW_POST.link,
        label: PAGES.NEW_POST.shortTitle ?? PAGES.NEW_POST.title,
    },
    { icon: Building2, link: PAGES.COMPLEXES.link, label: PAGES.COMPLEXES.title },
];
