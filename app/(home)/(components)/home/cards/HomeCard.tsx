'use client';

// Types
import { IHomeCard } from '@/types/home-cards';
// Styles
import s from './HomeCard.module.css';
// Hooks
import { useState } from 'react';
// Components
import Link from 'next/link';
import CLinkButton from '@/ui/atoms/CLinkButton';
import { Building2, LayoutDashboard, SquarePen } from 'lucide-react';

const ICON_COMPONENTS: Record<string, React.ElementType> = {
    LayoutDashboard: LayoutDashboard,
    Building2: Building2,
    SquarePen: SquarePen,
};

export default function HomeCard({ title, description, link, linkLabel, icon }: IHomeCard) {
    const Icon = ICON_COMPONENTS[icon];

    const [isHovering, setIsHovering] = useState(false);
    return (
        <div
            className={s.card}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className={s.iconWrap}>
                <Icon className={s.icon} />
            </div>

            <h2 className={'card-title'}>{title}</h2>
            <p className={'card-description'}>{description}</p>

            <CLinkButton
                type={'button'}
                isHovering={isHovering}
            >
                {linkLabel}
            </CLinkButton>

            <Link
                className={s.link}
                href={link}
            >
                <span className='visually-hidden'>{`View details of ${title}`}</span>
            </Link>
        </div>
    );
}
