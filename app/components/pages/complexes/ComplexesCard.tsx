// Types
import { IComplexBase } from '@/types/complexes';
// Styles
import s from './ComplexesCard.module.css';
import clsx from 'clsx';
// Constants
import { PAGES } from '@/utils/data/pages';
// Components
import Image from 'next/image';
import Link from 'next/link';
import ComplexesImgDefault from '@/app/components/common/placeholders/ComplexesImgDefault';

export default function ComplexesCard({ slug, name, address, img = '' }: IComplexBase & { img?: string }) {
    return (
        <div className={s.card}>
            <div className={s.img}>
                {img ? (
                    <Image
                        src={img}
                        alt={`Complex ${name}`}
                        className={'img-cover'}
                        sizes={'(max-width: 768px) 10rem, (max-width: 1024px) 50vw, 33vw'}
                        fill
                    />
                ) : (
                    <ComplexesImgDefault />
                )}
            </div>

            <div className={s.info}>
                {name && <h3 className={clsx('card-title', s.title)}>{name}</h3>}
                {address && <p className={'card-description'}>{address}</p>}
            </div>

            {slug && (
                <Link
                    href={`${PAGES.COMPLEXES.link}/${slug}`}
                    className={s.link}
                    aria-label={`View details of ${name}`}
                />
            )}
        </div>
    );
}
