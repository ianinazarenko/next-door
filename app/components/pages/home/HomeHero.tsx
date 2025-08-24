import s from './HomeHero.module.css';
import clsx from 'clsx';
import Image from 'next/image';

const HEADING = 'Help is Next Door';
const DESC_TOP = 'There is always someone nearby who can help.';
const DESC_BOTTOM = 'Join our community!';
const ALT = 'Home Hero';
const IMG_MOB = '/images/home/home-hero-mob.jpg';
const IMG_DESK = '/images/home/home-hero-desk.jpg';

export default function HomeHero() {
    return (
        <section className={clsx(s.section, 'bg-overlay-dark')}>
            <Image
                src={IMG_MOB}
                alt={ALT}
                className={clsx(s.img)}
                fill
            />

            <Image
                src={IMG_DESK}
                alt={ALT}
                className={clsx(s.img, s._desk)}
                fill
            />

            <div className={s.container}>
                <div className={s.wrapper}>
                    <h1 className={'h1'}>{HEADING}</h1>
                    <p className={clsx('card-description', s.desc)}>{DESC_TOP}</p>
                    <p className={clsx('card-description', s.desc)}>{DESC_BOTTOM}</p>
                </div>
            </div>
        </section>
    );
}
