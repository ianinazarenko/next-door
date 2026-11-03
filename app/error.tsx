'use client';

import { useEffect } from 'react';

import { PAGES } from '@/data/pages';
import ButtonLink from '@/ui/atoms/ButtonLink';
import CButton from '@/ui/atoms/CButton';

import s from './error-state.module.css';

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const CODE = '500';
    const TITLE = <>We couldn&apos;t open this&nbsp;page</>;
    const DESCRIPTION = 'Please try again in a moment.';
    const BTN_TRY_AGAIN = 'Try again';
    const BTN_BOARD = 'Open the board';

    useEffect(() => {
        if (process.env.NODE_ENV === 'development' && error) {
            console.error(error);
        }
    }, [error]);

    return (
        <div className={`page c-container ${s.page}`}>
            <section className={s.content} aria-labelledby='error-title'>
                <p className={s.codeLarge}>{CODE}</p>

                <h1 id='error-title' className={s.title}>
                    {TITLE}
                </h1>

                <p className={s.description}>{DESCRIPTION}</p>

                <div className={s.actions}>
                    <CButton onClick={reset} className={s.primaryAction}>
                        {BTN_TRY_AGAIN}
                    </CButton>

                    <ButtonLink href={PAGES.POSTS.link}>{BTN_BOARD}</ButtonLink>
                </div>
            </section>
        </div>
    );
}
