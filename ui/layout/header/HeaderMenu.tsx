'use client';

import { MENU_LIST } from '@/data/menu';

import s from './HeaderMenu.module.css';

import clsx from 'clsx';
import { isMenuItemVisible } from '@/utils/helpers/menu-utils';

import Link from 'next/link';

export default function HeaderMenu({ isSignedIn }: { isSignedIn: boolean }) {
    return (
        <div className={s.menu}>
            {MENU_LIST.map((item, index) => {
                const isVisible = isMenuItemVisible(item.visibility, isSignedIn);
                return (
                    <Link
                        href={item.link}
                        key={index}
                        className={clsx(s.item, { 'fade-out': !isVisible })}
                        aria-hidden={!isVisible}
                        tabIndex={!isVisible ? -1 : undefined}
                    >
                        {item.label}
                    </Link>
                );
            })}
        </div>
    );
}
