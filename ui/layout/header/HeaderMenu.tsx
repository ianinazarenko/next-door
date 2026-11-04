'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PAGES } from '@/data/pages';
import { getActivePath } from '@/utils/helpers/menu-utils';

import s from './HeaderMenu.module.css';

export default function HeaderMenu() {
    const pathname = usePathname();
    const boardIsActive = getActivePath(PAGES.POSTS, pathname);
    const complexesIsActive = getActivePath(PAGES.COMPLEXES, pathname);

    return (
        <nav className={s.menu} aria-label='Main navigation'>
            <Link
                href={PAGES.POSTS.link}
                className={clsx(s.item, boardIsActive && s.active)}
                aria-current={boardIsActive ? 'page' : undefined}
            >
                {PAGES.POSTS.title}
            </Link>

            <Link
                href={PAGES.COMPLEXES.link}
                className={clsx(s.item, complexesIsActive && s.active)}
                aria-current={complexesIsActive ? 'page' : undefined}
            >
                {PAGES.COMPLEXES.title}
            </Link>
        </nav>
    );
}
