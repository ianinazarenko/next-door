import type { IComplexBase } from '@/types/complexes';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { COMPLEX_IMG } from '@/data/complex-images';
import { PAGES } from '@/data/pages';
import ComplexesImgDefault from '@/ui/common/placeholders/ComplexesImgDefault';

import s from './ComplexesCard.module.css';

export default function ComplexesCard({
    slug,
    name,
    address,
    img = '',
}: IComplexBase & { img?: string }) {
    const image = COMPLEX_IMG[slug].mob;
    return (
        <Link
            href={`${PAGES.COMPLEXES.link}/${slug}`}
            className={s.link}
            aria-labelledby={name ? `${slug}-title` : undefined}
        >
            <article className={s.card}>
                <div className={s.img}>
                    {img || image ? (
                        <Image
                            src={img || image}
                            alt={`Complex ${name}`}
                            className={clsx('img-cover')}
                            sizes={'(min-width: 744px) 50vw, (min-width: 1024px) 33vw, 100vw'}
                            fill
                        />
                    ) : (
                        <ComplexesImgDefault />
                    )}
                </div>

                <header className={s.info}>
                    {name && (
                        <h3
                            id={`${slug}-title`}
                            className={clsx('card-title', s.title)}
                        >
                            {name}
                        </h3>
                    )}
                    {address && (
                        <address className={clsx('card-description', s.address)}>{address}</address>
                    )}
                </header>
            </article>
        </Link>
    );
}
