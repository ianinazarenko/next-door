import BlockHero from '@/ui/common/blocks/hero/BlockHero';

const HEADING = 'Help is Next Door';
const DESC_TOP = 'There is always someone nearby who can help.';
const DESC_BOTTOM = 'Join our community!';
const IMG_MOB = '/images/home/home-hero-mob.jpg';
const IMG_DESK = '/images/home/home-hero-desk.jpg';

export default function HomeHero() {
    return (
        <BlockHero
            imgMob={IMG_MOB}
            imgDesk={IMG_DESK}
            heading={HEADING}
            descTop={DESC_TOP}
            descBottom={DESC_BOTTOM}
        />
    );
}
