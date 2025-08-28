import { IComplexFull } from '@/types/complexes';
import BlockHero from '@/app/components/common/blocks/BlockHero';

// TODO: add images to complexes
const IMG: Record<string, { mob: string; desk: string }> = {
    'pixel-park': {
        mob: '/images/complexes/complex-1-mob.jpg',
        desk: '/images/complexes/complex-1-desk.jpg',
    },
    'bugless-heights': {
        mob: '/images/complexes/complex-2-mob.jpg',
        desk: '/images/complexes/complex-2-desk.jpg',
    },
};

export default function ComplexHero({ complex }: { complex: IComplexFull }) {
    const { name, address, slug } = complex;

    const imgMob = IMG[slug].mob;
    const imgDesk = IMG[slug].desk;

    return (
        <BlockHero
            imgMob={imgMob}
            imgDesk={imgDesk}
            heading={name}
            deskMeta={address}
        />
    );
}
