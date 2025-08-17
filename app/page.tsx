import HomeHero from '@/app/components/pages/home/HomeHero';
import HomeCards from '@/app/components/pages/home/HomeCards';

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
