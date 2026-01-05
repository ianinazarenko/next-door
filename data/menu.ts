import { IPanelItem } from '@/types/menu';
import { EMenuItemsVisibility } from '@/utils/constants/menu';
import { PAGES } from '@/data/pages';
import { Building2, House, LayoutDashboard, LogIn } from 'lucide-react';

export const MENU_LIST: IPanelItem[] = [
    { icon: House, link: PAGES.HOME.link, label: PAGES.HOME.title },
    { icon: LayoutDashboard, link: PAGES.POSTS.link, label: PAGES.POSTS.title },
    { icon: Building2, link: PAGES.COMPLEXES.link, label: PAGES.COMPLEXES.title },
    { icon: LogIn, link: PAGES.SIGN_IN.link, label: PAGES.SIGN_IN.title, visibility: EMenuItemsVisibility.GuestOnly },
];
