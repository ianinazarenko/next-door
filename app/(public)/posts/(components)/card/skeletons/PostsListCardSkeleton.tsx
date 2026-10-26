import s from './PostsListCardSkeleton.module.css';
import clsx from 'clsx';

export default function PostsListCardSkeleton() {
    return (
        <div
            className={s.card}
            aria-hidden='true'
        >
            <div className={s.header}>
                <div className={clsx(s.tag, 'skeleton')} />
                <div className={clsx(s.complex, 'skeleton')} />
            </div>

            <div className={s.title}>
                <div className={clsx(s.titleLine, 'skeleton')} />
                <div className={clsx(s.titleLineShort, 'skeleton')} />
            </div>

            <div className={s.text}>
                <div className={clsx(s.textLine, 'skeleton')} />
                {/*<div className={clsx(s.textLine, 'skeleton')} />*/}
                <div className={clsx(s.textLineShort, 'skeleton')} />
            </div>

            <div className={s.info}>
                <div className={s.author}>
                    <div className={clsx(s.picture, 'skeleton')} />

                    <div className={clsx(s.authorName, 'skeleton')} />
                </div>

                <div className={clsx(s.date, 'skeleton')} />
                <div className={clsx(s.comment, 'skeleton')} />
            </div>
        </div>
    );
}
