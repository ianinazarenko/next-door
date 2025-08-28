import clsx from 'clsx';
import s from './ComplexHeroSkeleton.module.css';

export default function ComplexHeroSkeleton() {
    return (
        <section className={clsx(s.section, 'bg-overlay-dark')}>
            <div className={s.container}>
                <div className={s.wrapper}>
                    <div className={clsx(s.title, 'skeleton')} />
                    <div className={clsx(s.desc, 'skeleton')} />
                </div>
            </div>
        </section>
    );
}
