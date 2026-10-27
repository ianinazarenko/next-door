import type { ICategory } from '@/types/categories';
import type { LucideIcon } from 'lucide-react';

import clsx from 'clsx';
import { CalendarDays, Gift, HandHeart, Shapes, Tag } from 'lucide-react';

import { ECategorySlug } from '@/utils/constants/categories';

import s from './PostsCategoryTag.module.css';

interface ICategoryVisual {
    icon: LucideIcon;
    className: string;
}

const CATEGORY_VISUALS: Record<ECategorySlug, ICategoryVisual> = {
    [ECategorySlug.OfferHelp]: { icon: HandHeart, className: s.help },
    [ECategorySlug.RequestHelp]: { icon: HandHeart, className: s.help },
    [ECategorySlug.Buy]: { icon: Tag, className: s.commerce },
    [ECategorySlug.Sell]: { icon: Tag, className: s.commerce },
    [ECategorySlug.GiveAway]: { icon: Gift, className: s.gift },
    [ECategorySlug.Event]: { icon: CalendarDays, className: s.event },
};

const DEFAULT_VISUAL: ICategoryVisual = { icon: Shapes, className: s.default };

export default function PostsCategoryTag({ category }: { category: ICategory }) {
    const visual = CATEGORY_VISUALS[category.slug as ECategorySlug] ?? DEFAULT_VISUAL;

    const Icon = visual.icon;

    return (
        <span className={clsx(s.tag, visual.className)}>
            <Icon
                className={s.icon}
                aria-hidden='true'
            />

            {category.name}
        </span>
    );
}
