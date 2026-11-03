// ALTERNATIVE ERROR PAGE DESIGN
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { PAGES } from '@/data/pages';

import s from './page.module.css';

export default function Error500PreviewPage() {
    if (process.env.NODE_ENV !== 'development') {
        notFound();
    }

    return (
        <div className={`page c-container ${s.page}`}>
            <section className={s.content} aria-labelledby='error-preview-title'>
                <p className={s.code}>Error 500</p>

                <h1 id='error-preview-title' className={s.title}>
                    We couldn&apos;t open this page
                </h1>

                <p className={s.description}>Please try again in a moment.</p>

                <div className={s.actions}>
                    <span className={s.primaryAction}>Try again</span>

                    <Link href={PAGES.POSTS.link} className={s.secondaryAction}>
                        <span>Open the board</span>
                        <ArrowRight className={s.arrow} strokeWidth={2.5} aria-hidden='true' />
                    </Link>
                </div>
            </section>
        </div>
    );
}
