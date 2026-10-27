import clsx from 'clsx';

import s from './PostsFiltersSkeleton.module.css';

export default function PostsFiltersSkeleton() {
    return (
        <section className={s.filters}>
            <div className={clsx(s.select, 'skeleton')}></div>
            <div className={clsx(s.select, 'skeleton')}></div>
            <div className={clsx(s.button, 'skeleton')}></div>
        </section>
    );
}
