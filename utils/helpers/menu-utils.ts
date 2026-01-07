import { EMenuItemsVisibility } from '@/utils/constants/menu';

export function isMenuItemVisible(visibility: EMenuItemsVisibility | undefined, isSigned: boolean) {
    if (!visibility || visibility === EMenuItemsVisibility.Always) return true;
    if (visibility === EMenuItemsVisibility.AuthOnly) return isSigned;
    return !isSigned;
}
