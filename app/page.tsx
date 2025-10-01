import { Metadata } from 'next';
import { PAGES_METADATA } from '@/utils/data/seo';
import HomeHero from '@/app/components/pages/home/HomeHero';
import HomeCards from '@/app/components/pages/home/HomeCards';

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
