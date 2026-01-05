import { EMenuItemsVisibility } from '@/utils/constants/menu';

export interface IPanelItem {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    link: string;
    label: string;
    visibility?: EMenuItemsVisibility;
}
