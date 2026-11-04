import { House } from 'lucide-react';
import Link from 'next/link';

import { PAGES } from '@/data/pages';

import s from './TheFooter.module.css';

const year = new Date().getFullYear();
const PROFILE_LINK = 'https://github.com/ianinazarenko';
const PROJECT_LINK = 'https://github.com/ianinazarenko/next-door';
const ARCHITECTURE_LINK = `${PROJECT_LINK}/blob/main/ARCHITECTURE.md`;

export default function TheFooter() {
    return (
        <footer className={s.footer}>
            <div className={`c-container ${s.container}`}>
                <div className={s.brandBlock}>
                    <Link href={PAGES.HOME.link} className={s.brand} aria-label='NextDoor home'>
                        <House size={20} aria-hidden='true' />
                        NextDoor
                    </Link>
                    <p className={s.tagline}>A calmer way to connect with neighbors.</p>
                </div>

                <div className={s.details}>
                    <nav className={s.links} aria-label='Footer'>
                        <a
                            href={PROJECT_LINK}
                            className={s.link}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            GitHub
                        </a>

                        <a
                            href={ARCHITECTURE_LINK}
                            className={s.link}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Architecture
                        </a>
                    </nav>

                    <p className={s.credit}>
                        © {year} Demo project by{' '}
                        <a
                            href={PROFILE_LINK}
                            className={s.link}
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            Ianina Nazarenko
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
