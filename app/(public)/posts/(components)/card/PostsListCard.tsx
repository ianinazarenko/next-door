import { PAGES } from '@/data/pages';
// Types
import { IPostListItem } from '@/types/posts';
// Utils
import { dateFormatter } from '@/utils/helpers/date-utils';
// Styles
import s from './PostsListCard.module.css';
import clsx from 'clsx';
// Components
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import UserPic from '@/ui/common/user/UserPic';

export default function PostsListCard({ post }: { post: IPostListItem }) {
    const { id, title, shortText, author, deadline, commentsCount, createdAt, category, authorId, complex } = post;

    const deadlineDate: string | null = deadline ? dateFormatter.format(deadline) : null;
    const createdAtDate: string | null = createdAt ? dateFormatter.format(createdAt) : null;

    return (
        <article className={s.card}>
            <header className={s.header}>
                <span className={s.tag}>{category.name}</span>
                <span className={s.complex}>{complex.name}</span>
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
                {createdAtDate && <p className={clsx('card-meta', s.date)}>{createdAtDate}</p>}
            </div>

            {/* FOOTER */}
            <hr className={s.line} />

            <footer className={s.footer}>
                <p className={clsx('card-meta', s.deadline)}>{deadlineDate ? `Deadline: ${deadlineDate}` : null}</p>
                <div className={clsx('card-meta', s.comment)}>
                    <MessageCircle className={s.commentIcon} />
                    {commentsCount}
                </div>
            </footer>

            {id && (
                <Link
                    href={`${PAGES.POSTS.link}/${id}`}
                    className={s.link}
                    target={'_blank'}
                >
                    <span className='visually-hidden'>{`View details of ${title}`}</span>
                </Link>
            )}
        </article>
    );
}
