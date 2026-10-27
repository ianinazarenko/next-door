'use client';

import type { IHomeCard } from '@/types/home-cards';
import type {LucideIcon} from 'lucide-react';

import clsx from 'clsx';
import { ArrowRight, Building2, LayoutDashboard, SquarePen } from 'lucide-react';
import Link from 'next/link';

import s from './HomeCard.module.css';

const ICON_COMPONENTS: Record<IHomeCard['icon'], LucideIcon> = {
    LayoutDashboard: LayoutDashboard,
    Building2: Building2,
    SquarePen: SquarePen,
};

export default function HomeCard({ id, title, description, link, linkLabel, icon }: IHomeCard) {
    const Icon = ICON_COMPONENTS[icon];

    return (
        <Link
            href={link}
            className={clsx(s.card, id === 'create' && s.createCard)}
            aria-labelledby={`${id}-home-card-title`}
        >
            <div className={s.iconWrap}>
                <Icon
                    className={s.icon}
                    aria-hidden='true'
                />
            </div>

            <h2
                id={`${id}-home-card-title`}
                className={'card-title'}
            >
                {title}
            </h2>

            <p className={'card-description'}>{description}</p>

            <span className={s.action}>
                {linkLabel}

                <ArrowRight
                    className={s.actionIcon}
                    aria-hidden='true'
                />
            </span>
        </Link>
    );
}
