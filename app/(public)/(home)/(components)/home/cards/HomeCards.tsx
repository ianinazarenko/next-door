import { HOME_CARDS } from '@/data/home-cards';

import HomeCard from './HomeCard';
import s from './HomeCards.module.css';

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
