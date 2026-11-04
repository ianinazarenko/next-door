'use client';

import clsx from 'clsx';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { PAGES } from '@/data/pages';
import { getActivePath } from '@/utils/helpers/menu-utils';

import s from './HeaderButtonLink.module.css';

export default function HeaderButtonLInk() {
    const pathname = usePathname();
    const isActive = getActivePath(PAGES.NEW_POST, pathname);

    return (
        <Link
            href={PAGES.NEW_POST.link}
            className={clsx(s.createButton, isActive && s.createActive)}
            aria-current={isActive ? 'page' : undefined}
        >
            <SquarePen size={18} aria-hidden='true' />

            <span>{PAGES.NEW_POST.title}</span>
        </Link>
    );
}
