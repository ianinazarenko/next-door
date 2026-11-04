import { PAGES } from '@/data/pages';
import ButtonLink from '@/ui/atoms/ButtonLink';

import s from './error-state.module.css';

export default function NotFoundPage() {
    const CODE = '404';
    const TITLE = 'Page Not Found';
    const DESCRIPTION = 'This page may have moved, or the link may be outdated.';
    const BTN_HOME = 'Go home';
    const BTN_BOARD = 'Open the board';

    return (
        <div className={`page c-container ${s.page}`}>
            <section className={s.content} aria-labelledby='not-found-title'>
                <p className={s.codeLarge}>{CODE}</p>

                <h1 id='not-found-title' className={s.title}>
                    {TITLE}
                </h1>

                <p className={s.description}>{DESCRIPTION}</p>

                <div className={s.actions}>
                    <ButtonLink
                        href={PAGES.HOME.link}
                        variant='filled'
                        showArrow={false}
                        className={s.primaryLink}
                    >
                        {BTN_HOME}
                    </ButtonLink>

                    <ButtonLink href={PAGES.POSTS.link}>{BTN_BOARD}</ButtonLink>
                </div>
            </section>
        </div>
    );
}
