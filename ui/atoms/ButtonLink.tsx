import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import s from './ButtonLink.module.css';

interface ButtonLinkProps {
    href: string;
    children: React.ReactNode;
}

export default function ButtonLink({ href, children }: ButtonLinkProps) {
    return (
        <Link href={href} className={s.link}>
            <span>{children}</span>
            <ArrowRight className={s.icon} strokeWidth={2.5} aria-hidden='true' />
        </Link>
    );
}
