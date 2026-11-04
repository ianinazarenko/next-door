import { PAGES } from '@/data/pages';
import ButtonLink from '@/ui/atoms/ButtonLink';

import s from './HomeHero.module.css';

export default function HomeHero() {
    const TITLE = <>Help is Next&nbsp;Door</>;
    const DESCRIPTION =
        'Find local announcements, useful building contacts, and help from your neighbors in one place.';
    const BTN_BOARD = 'Explore the board';

    return (
        <section className={s.section}>
            <div className='c-container'>
                <div className={s.content}>
                    <h1 className='h1 display'>{TITLE}</h1>

                    <p className={s.description}>{DESCRIPTION}</p>

                    <ButtonLink href={PAGES.POSTS.link} variant='filled' size='large'>
                        {BTN_BOARD}
                    </ButtonLink>
                </div>
            </div>
        </section>
    );
}
