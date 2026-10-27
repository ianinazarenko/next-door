import type { IComplexFull } from '@/types/complexes';

import { TrainFront } from 'lucide-react';

import { COMPLEX_IMG, DEFAULT_IMG } from '@/data/complex-images';
import BlockHero from '@/ui/common/blocks/hero/BlockHero';

import s from './ComplexHero.module.css';

function getImages(slug: string) {
    return COMPLEX_IMG[slug] || DEFAULT_IMG;
}

export default function ComplexHero({ complex }: { complex: IComplexFull }) {
    const { name, address, metro, slug } = complex;
    const { mob, desk } = getImages(slug);

    const location =
        address || metro ? (
            <span className={s.location}>
                {address && <span>{address}</span>}
                {metro && (
                    <span className={s.metro}>
                        <TrainFront
                            className={s.metroIcon}
                            aria-hidden='true'
                        />
                        <span className='visually-hidden'>Metro: </span>
                        {metro}
                    </span>
                )}
            </span>
        ) : null;

    return (
        <BlockHero
            imgMob={mob}
            imgDesk={desk}
            heading={name}
            deskMeta={location}
        />
    );
}
