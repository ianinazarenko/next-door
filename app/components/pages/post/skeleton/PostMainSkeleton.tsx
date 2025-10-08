import s from './PostMainSkeleton.module.css';
import clsx from 'clsx';

export default function PostMainSkeleton() {
    return (
        <div className={s.container}>
            <section className={s.header}>
                <div className={clsx(s.title, 'skeleton')}></div>
                <div className={s.meta}>
                    <div className={clsx(s.author, 'skeleton')}></div>
                    <div className={clsx(s.date, 'skeleton')}></div>
                </div>
            </section>

            <section className={s.content}>
                <div className={clsx(s.text, 'skeleton')}></div>
                <div className={clsx(s.image, 'skeleton')}></div>
            </section>

            <section className={s.contacts}>
                <div className={clsx(s.contactTitle, 'skeleton')}></div>
                <div className={s.contactItems}>
                    <div className={clsx(s.contactItem, 'skeleton')}></div>
                    <div className={clsx(s.contactItem, 'skeleton')}></div>
                    <div className={clsx(s.contactItem, 'skeleton')}></div>
                </div>
            </section>

            <section className={s.comments}>
                <h2 className={clsx(s.commentsTitle, 'skeleton')}></h2>
                <ul className={s.commentsList}>
                    {[1, 2].map((i) => (
                        <li
                            key={i}
                            className={clsx(s.comment, 'skeleton')}
                        />
                    ))}
                </ul>
            </section>
        </div>
    );
}
