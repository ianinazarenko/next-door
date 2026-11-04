import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import s from './ButtonLink.module.css';

interface ButtonLinkProps {
    href: string;
    children: React.ReactNode;
    variant?: 'transparent' | 'filled';
    size?: 'default' | 'large';
    showArrow?: boolean;
    className?: string;
}

export default function ButtonLink({
    href,
    children,
    variant = 'transparent',
    size = 'default',
    showArrow = true,
    className,
}: ButtonLinkProps) {
    return (
        <Link
            href={href}
            className={clsx(s.link, s[variant], size === 'large' && s.large, className)}
        >
            <span>{children}</span>

            {showArrow && <ArrowRight className={s.icon} strokeWidth={2.5} aria-hidden='true' />}
        </Link>
    );
}
