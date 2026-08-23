import clsx from 'clsx';
import { getImageProps } from 'next/image';
import s from './BlockHero.module.css';

interface IProps {
    imgMob: string;
    imgDesk: string;
    heading: string;
    deskMeta?: string | null;
    descTop?: string | null;
    descBottom?: string | null;
}

export default function BlockHero({
    imgMob,
    imgDesk,
    heading,
    deskMeta,
    descTop,
    descBottom,
}: IProps) {
    const commonProps = {
        className: s.img,
        fill: true,
        quality: 80,
        alt: '',
    };

    const { props: mobile } = getImageProps({
        src: imgMob,
        sizes: '100vw',
        ...commonProps,
    });

    const {
        props: { srcSet: desktop, sizes },
    } = getImageProps({ src: imgDesk, sizes: '(min-width: 1440px) 1440px, 100vw', ...commonProps });

    return (
        <section className={clsx(s.section, 'bg-overlay-dark')}>
            <picture>
                <source
                    media='(min-width: 744px)'
                    sizes={sizes}
                    srcSet={desktop}
                />

                <img
                    {...mobile}
                    loading={'eager'}
                    className={s.img}
                    alt=''
                />
            </picture>

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
