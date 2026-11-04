import type { EPages } from '@/utils/constants/menu';

export interface IPanelItem {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    link: string;
    label: string;
}

export interface IPage {
    slug: EPages;
    title: string;
    link: string;
    shortTitle?: string;
}
