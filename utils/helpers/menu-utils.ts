import { PAGES } from '@/data/pages';

export function getActivePath(item: { link: string }, path: string) {
    return (
        item.link === path ||
        (item.link === PAGES.POSTS.link &&
            path.startsWith(PAGES.POSTS.link) &&
            path !== PAGES.NEW_POST.link)
    );
}
