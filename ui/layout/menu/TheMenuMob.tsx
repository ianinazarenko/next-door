'use client';

import type { IPanelItem } from '@/types/menu';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MENU_LIST } from '@/data/menu';
import { isMenuItemVisible } from '@/utils/helpers/menu-utils';

import s from './TheMenuMob.module.css';

export default function TheMenuMob({ isSignedIn }: { isSignedIn: boolean }) {
    const path = usePathname();

    return (
        <div className={s.panel}>
            <nav
                aria-label='Mobile navigation'
                className={s.wrapper}
            >
                {MENU_LIST.map((item: IPanelItem, index: number) => {
                    const Icon = item.icon;
                    const isVisible = isMenuItemVisible(item.visibility, isSignedIn);
                    return (
                        <Link
                            key={index}
                            href={item.link}
                            className={clsx(s.item, {
                                [s.active]: item.link === path,
                                [s.itemHidden]: !isVisible,
                            })}
                            aria-hidden={!isVisible}
                            tabIndex={!isVisible ? -1 : undefined}
                        >
                            <Icon className={s.icon} />
                            <span
                                className={clsx('card-meta', s.text, {
                                    [s.active]: item.link === path,
                                })}
                            >
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
