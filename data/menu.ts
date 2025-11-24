import { IPanelItem } from '@/types/menu';
import { PAGES } from '@/data/pages';
import { House, Building2, LayoutDashboard } from 'lucide-react';

export const MENU_LIST: IPanelItem[] = [
    { icon: House, link: PAGES.HOME.link, label: PAGES.HOME.title },
    { icon: LayoutDashboard, link: PAGES.POSTS.link, label: PAGES.POSTS.title },
    { icon: Building2, link: PAGES.COMPLEXES.link, label: PAGES.COMPLEXES.title },
];
