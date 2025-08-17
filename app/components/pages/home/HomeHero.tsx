import s from './HomeHero.module.css';
import clsx from 'clsx';
import Image from 'next/image';

export default function HomeHero() {
    const HEADING = 'Help is Next Door';
    const DESC_TOP = 'There is always someone nearby who can help.';
    const DESC_BOTTOM = 'Join our community!';

    return (
        <section className={clsx(s.section, 'bg-overlay-dark')}>
            <Image
                src={'/images/home/home-hero-mob.jpg'}
                alt={'Home Hero'}
                className={clsx(s.img)}
                fill
            />

            <Image
                src={'/images/home/home-hero-desk.jpg'}
                alt={'Home Hero'}
                className={clsx(s.img, s._desk)}
                fill
            />

            <div className={s.wrapper}>
                <h1 className={'h1'}>{HEADING}</h1>
                <p className={clsx('card-description', s.desc)}>{DESC_TOP}</p>
                <p className={clsx('card-description', s.desc)}>{DESC_BOTTOM}</p>
            </div>
        </section>
    );
}
