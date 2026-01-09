import { HOME_CARDS } from '@/data/home-cards';
import s from './HomeCards.module.css';
import HomeCard from '@/app/(public)/(home)/(components)/home/cards/HomeCard';

export default function HomeCards() {
    return (
        <section className={s.list}>
            {HOME_CARDS.map((card) => (
                <HomeCard
                    key={card.id}
                    {...card}
                />
            ))}
        </section>
    );
}
