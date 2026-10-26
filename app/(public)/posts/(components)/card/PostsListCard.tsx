import { PAGES } from '@/data/pages';
// Types
import { IPostListItem } from '@/types/posts';
// Utils
import { dateFormatter, formatPostAge } from '@/utils/helpers/date-utils';
// Styles
import s from './PostsListCard.module.css';
import clsx from 'clsx';
// Components
import { MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import UserPic from '@/ui/common/user/UserPic';
import PostsCategoryTag from './PostsCategoryTag';

export default function PostsListCard({ post }: { post: IPostListItem }) {
    const {
        id,
        title,
        shortText,
        author,
        deadline,
        commentsCount,
        createdAt,
        category,
        authorId,
        complex,
    } = post;

    const deadlineDate: string | null = deadline ? dateFormatter.format(deadline) : null;
    return (
        <article className={s.card}>
            <header className={s.header}>
                <PostsCategoryTag category={category} />

                <span className={s.complex}>
                    <MapPin
                        className={s.complexIcon}
                        aria-hidden='true'
                    />
                    <span className={s.complexName}>{complex.name}</span>
                </span>
            </header>

            <h2 className={clsx(s.title, 'card-title')}>{title}</h2>

            <p className={clsx(s.text, 'card-description')}>{shortText}</p>

            {/* INFO SECTION */}
            <div className={s.info}>
                {author?.name && (
                    <div className={s.author}>
                        <UserPic
                            className={s.picture}
                            image={author?.image}
                            name={author.name}
                            index={authorId}
                        />
                        <p className={clsx('card-meta', s.authorName)}>{author.name}</p>
                    </div>
                )}

                <time
                    className={clsx('card-meta', s.date)}
                    dateTime={createdAt.toISOString()}
                >
                    {formatPostAge(createdAt)}
                </time>

                <span className={clsx('card-meta', s.comment)}>
                    <MessageCircle
                        className={s.commentIcon}
                        aria-hidden='true'
                    />
                    {commentsCount}
                    <span className='visually-hidden'> comments</span>
                </span>
            </div>

            {/* FOOTER */}
            {deadlineDate && (
                <footer className={s.footer}>
                    <span
                        className={clsx('card-meta', s.deadline)}
                    >{`Deadline: ${deadlineDate}`}</span>
                </footer>
            )}

            {id && (
                <Link
                    href={`${PAGES.POSTS.link}/${id}`}
                    className={s.link}
                    target={'_blank'}
                >
                    <span className='visually-hidden'>{`View details of ${title} (opens in a new tab)`}</span>
                </Link>
            )}
        </article>
    );
}
