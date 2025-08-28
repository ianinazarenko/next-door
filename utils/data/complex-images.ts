interface ComplexImages {
    mob: string;
    desk: string;
}

// TODO: temp! add images to complexes
export const COMPLEX_IMG: Record<string, ComplexImages> = {
    'pixel-park': {
        mob: '/images/complexes/complex-1-mob.jpg',
        desk: '/images/complexes/complex-1-desk.jpg',
    },
    'bugless-heights': {
        mob: '/images/complexes/complex-2-mob.jpg',
        desk: '/images/complexes/complex-2-desk.jpg',
    },
};

export const DEFAULT_IMG: ComplexImages = {
    mob: '/images/complexes/complex-1-mob.jpg',
    desk: '/images/complexes/complex-1-desk.jpg',
};
