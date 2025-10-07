import s from './PostsFiltersSkeleton.module.css';
import clsx from 'clsx';

export default function PostsFiltersSkeleton() {
    return (
        <section className={s.filters}>
            <div className={clsx(s.select, 'skeleton')}></div>
            <div className={clsx(s.select, 'skeleton')}></div>
            <div className={clsx(s.button, 'skeleton')}></div>
        </section>
    );
}
