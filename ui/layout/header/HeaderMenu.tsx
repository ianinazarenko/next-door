'use client';

import s from './HeaderMenu.module.css';

import { MENU_LIST } from '@/data/menu';
import Link from 'next/link';
import { isMenuItemVisible } from '@/utils/helpers/menu-utils';

export default function HeaderMenu({ isSignedIn }: { isSignedIn: boolean }) {
    return (
        <div className={s.menu}>
            {MENU_LIST.map((item, index) =>
                isMenuItemVisible(item.visibility, isSignedIn) ? (
                    <Link
                        href={item.link}
                        key={index}
                        className={s.item}
                    >
                        {item.label}
                    </Link>
                ) : null
            )}
        </div>
    );
}
