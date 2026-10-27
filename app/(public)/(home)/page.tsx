import type { Metadata } from 'next';

import HomeCards from '@/app/(public)/(home)/(components)/home/cards/HomeCards';
import HomeHero from '@/app/(public)/(home)/(components)/home/hero/HomeHero';
import { PAGES_METADATA } from '@/data/seo';

export const metadata: Metadata = PAGES_METADATA.HOME;

export default function Home() {
    return (
        <div className={'page'}>
            <HomeHero />

            <div className={'c-container'}>
                <HomeCards />
            </div>
        </div>
    );
}
