import { IPanelItem } from '@/types/menu';
import { PAGES } from '@/utils/data/pages';
import { House, StickyNote, Building2 } from 'lucide-react';

export const PANEL_LIST: IPanelItem[] = [
    { icon: House, link: PAGES.HOME.link, label: PAGES.HOME.title },
    { icon: StickyNote, link: PAGES.POSTS.link, label: PAGES.POSTS.title },
    { icon: Building2, link: PAGES.COMPLEXES.link, label: PAGES.COMPLEXES.title },
];
