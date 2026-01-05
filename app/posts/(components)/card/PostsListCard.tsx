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
    const { id, title, shortText, author, deadline, commentsCount, createdAt, category } = post;

    const deadlineDate: string | null = deadline ? dateFormatter.format(deadline) : null;
    const createdAtDate: string | null = createdAt ? dateFormatter.format(createdAt) : null;

    const text = shortText.length > 80 ? shortText.slice(0, 80) + '...' : shortText;
    return (
        <div className={s.card}>
            <div className={s.tag}>{category.name}</div>

            <p className={clsx(s.title, 'card-title')}>{title}</p>

            <p className={clsx(s.text, 'card-description')}>{text}</p>

            {/* INFO SECTION */}
            <div className={s.info}>
                {author?.name && (
                    <div className={s.author}>
                        <UserPic
                            className={s.picture}
                            index={id}
                        />
                        <p className={'card-meta'}>{author.name}</p>
                    </div>
                )}
                {createdAtDate && <p className={'card-meta'}>{createdAtDate}</p>}
            </div>

            {/* FOOTER */}
            <hr className={s.line} />

            <div className={s.footer}>
                {deadlineDate && <p className={'card-meta'}>Deadline: {deadlineDate}</p>}
                <div className={clsx('card-meta', s.comment)}>
                    <MessageCircle className={s.commentIcon} />
                    {commentsCount}
                </div>
            </div>

            {id && (
                <Link
                    href={`/posts/${id}`}
                    className={s.link}
                    target={'_blank'}
                >
                    <span className='visually-hidden'>{`View details of ${title}`}</span>
                </Link>
            )}
        </div>
    );
}
