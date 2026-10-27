'use client';

import clsx from 'clsx';
import Link from 'next/link';

import { MENU_LIST } from '@/data/menu';
import { isMenuItemVisible } from '@/utils/helpers/menu-utils';

import s from './HeaderMenu.module.css';

export default function HeaderMenu({ isSignedIn }: { isSignedIn: boolean }) {
    return (
        <nav
            className={s.menu}
            aria-label='Main navigation'
        >
            {MENU_LIST.map((item, index) => {
                const isVisible = isMenuItemVisible(item.visibility, isSignedIn);
                return (
                    <Link
                        href={item.link}
                        key={index}
                        className={clsx(s.item, { [s.itemHidden]: !isVisible })}
                        aria-hidden={!isVisible}
                        tabIndex={!isVisible ? -1 : undefined}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
