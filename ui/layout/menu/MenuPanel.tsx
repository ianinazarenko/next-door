'use client';

// Styles
import s from './MenuPanel.module.css';
// Types
import { IPanelItem } from '@/types/menu';
// Data
import { MENU_LIST } from '@/data/menu';
// Utils
import clsx from 'clsx';
import { isMenuItemVisible } from '@/utils/helpers/menu-utils';
// Hooks
import { usePathname } from 'next/navigation';
// Components
import Link from 'next/link';

export default function MenuPanel({ isSignedIn }: { isSignedIn: boolean }) {
    const path = usePathname();

    return (
        <div className={s.panel}>
            <div className={s.wrapper}>
                {MENU_LIST.map((item: IPanelItem, index: number) => {
                    const Icon = item.icon;
                    const isVisible = isMenuItemVisible(item.visibility, isSignedIn);
                    return (
                        <Link
                            key={index}
                            href={item.link}
                            className={clsx(s.item, { [s.active]: item.link === path, [s.itemHidden]: !isVisible })}
                            aria-hidden={!isVisible}
                            tabIndex={!isVisible ? -1 : undefined}
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

