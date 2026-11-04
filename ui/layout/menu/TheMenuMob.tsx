'use client';

import type { IPanelItem } from '@/types/menu';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MENU_LIST } from '@/data/menu';
import { PAGES } from '@/data/pages';
import { getActivePath } from '@/utils/helpers/menu-utils';

import s from './TheMenuMob.module.css';

export default function TheMenuMob() {
    const path = usePathname();

    return (
        <div className={s.panel}>
            <nav aria-label='Mobile navigation' className={s.wrapper}>
                {MENU_LIST.map((item: IPanelItem) => {
                    const Icon = item.icon;
                    const isActive = getActivePath(item, path);

                    return (
                        <Link
                            key={item.link}
                            href={item.link}
                            className={clsx(s.item, {
                                [s.active]: isActive,
                                [s.create]: item.link === PAGES.NEW_POST.link,
                            })}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <Icon className={s.icon} aria-hidden='true' />
                            <span className={clsx('card-meta', s.text)}>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
