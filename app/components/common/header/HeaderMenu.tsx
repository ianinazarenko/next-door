'use client';

import { MENU_LIST } from '@/utils/data/menu';
import s from './HeaderMenu.module.css';
import Link from 'next/link';

export default function HeaderMenu() {
    return (
        <div className={s.menu}>
            {MENU_LIST.map((item, index) => (
                <Link
                    href={item.link}
                    key={index}
                    className={s.item}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
}
