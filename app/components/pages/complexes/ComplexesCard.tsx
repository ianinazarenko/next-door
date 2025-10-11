import { COMPLEX_IMG } from '@/utils/data/complex-images';
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
    const image = COMPLEX_IMG[slug].mob;
    return (
        <div className={s.card}>
            <div className={s.img}>
                {img || image ? (
                    <Image
                        src={img || image}
                        alt={`Complex ${name}`}
                        className={clsx('img-cover')}
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
                >
                    <span className='visually-hidden'>{`View details of ${name}`}</span>
                </Link>
            )}
        </div>
    );
}
