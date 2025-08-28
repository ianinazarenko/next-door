import s from './BlockHero.module.css';
import clsx from 'clsx';
import Image from 'next/image';

const ALT = 'Hero background image';

interface IProps {
    imgMob: string;
    imgDesk: string;
    heading: string;
    deskMeta?: string | null;
    descTop?: string | null;
    descBottom?: string | null;
}

export default function BlockHero({ imgMob, imgDesk, heading, deskMeta, descTop, descBottom }: IProps) {
    return (
        <section className={clsx(s.section, 'bg-overlay-dark')}>
            {imgMob && (
                <Image
                    src={imgMob}
                    alt={ALT}
                    className={clsx(s.img)}
                    sizes={'100vw'}
                    priority
                    fill
                />
            )}

            {imgDesk && (
                <Image
                    src={imgDesk}
                    alt={ALT}
                    className={clsx(s.img, s._desk)}
                    sizes={'100vw'}
                    priority
                    fill
                />
            )}

            <div className={s.container}>
                <div className={s.wrapper}>
                    {heading && <h1 className={'h1'}>{heading}</h1>}
                    {deskMeta && <p className={clsx('card-meta', s.descMeta)}>{deskMeta}</p>}
                    {descTop && <p className={clsx('card-description', s.desc)}>{descTop}</p>}
                    {descBottom && <p className={clsx('card-description', s.desc)}>{descBottom}</p>}
                </div>
            </div>
        </section>
    );
}
