'use client';

// Types
import { IPanelItem } from '@/types/menu';
// Data
import { MENU_LIST } from '@/utils/data/menu';
// Utils
import clsx from 'clsx';
// Hooks
import { usePathname } from 'next/navigation';
// Components
import Link from 'next/link';
// Styles
import s from './TheMenuMob.module.css';

export default function TheMenuMob() {
    const path = usePathname();
    return (
        <div className={s.panel}>
            <div className={s.wrapper}>
                {MENU_LIST.map((item: IPanelItem, index: number) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={index}
                            href={item.link}
                            className={clsx(s.item, { [s.active]: item.link === path })}
                        >
                            <Icon className={s.icon} />
                            <span className={clsx('card-meta', s.text, { [s.active]: item.link === path })}>
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
