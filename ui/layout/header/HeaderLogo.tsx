import { House } from 'lucide-react';
import Link from 'next/link';

import { PAGES } from '@/data/pages';

import s from './HeaderLogo.module.css';

const BRAND_NAME = 'NextDoor';

export default function HeaderLogo() {
    return (
        <Link href={PAGES.HOME.link} className={s.brand} aria-label='NextDoor home'>
            <span className={s.brandMark}>
                <House size={22} strokeWidth={2.2} aria-hidden='true' />
            </span>

            <span>{BRAND_NAME}</span>
        </Link>
    );
}
