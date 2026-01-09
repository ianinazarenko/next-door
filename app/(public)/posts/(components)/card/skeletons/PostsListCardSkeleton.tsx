import s from './PostsListCardSkeleton.module.css';
import clsx from 'clsx';

export default function PostsListCardSkeleton() {
    return (
        <div className={s.card}>
            <div className={clsx(s.tag, 'skeleton')} />

            <div className={clsx(s.title, 'skeleton')} />

            <div className={clsx(s.text, 'skeleton')} />

            <div className={s.info}>
                <div className={s.author}>
                    <div className={clsx(s.picture, 'skeleton')} />

                    <div className={clsx(s.authorName, 'skeleton')} />
                </div>

                <div className={clsx(s.createdAt, 'skeleton')} />
            </div>

            <hr className={s.line} />

            <div className={s.footer}>
                <p className={clsx(s.deadline, 'skeleton')} />

                <div className={clsx('card-meta', s.comment)}>
                    <div className={clsx(s.commentIcon, 'skeleton')} />
                </div>
            </div>
        </div>
    );
}
