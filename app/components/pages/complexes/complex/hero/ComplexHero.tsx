import { IComplexFull } from '@/types/complexes';
import { COMPLEX_IMG, DEFAULT_IMG } from '@/utils/data/complex-images';
import BlockHero from '@/app/components/common/blocks/BlockHero';

function getImages(slug: string) {
    return COMPLEX_IMG[slug] || DEFAULT_IMG;
}

export default function ComplexHero({ complex }: { complex: IComplexFull }) {
    const { name, address, slug } = complex;
    const { mob, desk } = getImages(slug);

    return (
        <BlockHero
            imgMob={mob}
            imgDesk={desk}
            heading={name}
            deskMeta={address}
        />
    );
}
