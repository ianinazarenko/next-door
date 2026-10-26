import clsx from 'clsx';
import s from './ComplexHeroSkeleton.module.css';

export default function ComplexHeroSkeleton() {
    return (
        <section className={clsx(s.section, 'bg-overlay-dark')}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <div className={clsx(s.title, 'skeleton')} />
                    <div className={s.meta}>
                        <div className={clsx(s.desc, 'skeleton')} />
                        <div className={clsx(s.metro, 'skeleton')} />
                    </div>
                </div>
            </div>
        </section>
    );
}
