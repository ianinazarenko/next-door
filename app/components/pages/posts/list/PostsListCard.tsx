import { IPostListItem } from '@/types/posts';

import { dateFormatter } from '@/utils/helpers/date-utils';

import s from './PostsListCard.module.css';
import clsx from 'clsx';

import { MessageCircle, User } from 'lucide-react';
import Link from 'next/link';

export default function PostsListCard({ post }: { post: IPostListItem }) {
    const { id, title, shortText, authorName, deadline, commentsCount, createdAt, category } = post;

    let deadlineDate: string | undefined;
    let createdAtDate: string | undefined;

    if (deadline) {
        deadlineDate = dateFormatter.format(deadline);
    }

    if (createdAt) {
        createdAtDate = dateFormatter.format(createdAt);
    }

    const hasFooter = Boolean(deadlineDate || commentsCount);
    return (
        <div className={s.card}>
            <div className={s.tag}>{category.name}</div>

            <p className={'card-title'}>{title}</p>

            <p className={'card-description'}>{shortText}</p>

            {/* INFO SECTION */}
            <div className={s.info}>
                {authorName && (
                    <div className={s.author}>
                        <div className={s.picture}>
                            <User />
                        </div>
                        <p className={'card-meta'}>{authorName}</p>
                    </div>
                )}
                {createdAtDate && <p className={'card-meta'}>{createdAtDate}</p>}
            </div>

            {/* FOOTER */}
            {hasFooter && <hr className={s.line} />}

            {hasFooter && (
                <div className={s.footer}>
                    {deadlineDate && <p className={'card-meta'}>Deadline: {deadlineDate}</p>}
                    {Boolean(commentsCount) && (
                        <div className={clsx('card-meta', s.comment)}>
                            <MessageCircle className={s.commentIcon} />
                            {commentsCount}
                        </div>
                    )}
                </div>
            )}

            {id && (
                <Link
                    href={`/posts/${id}`}
                    className={s.link}
                    target={'_blank'}
                />
            )}
        </div>
    );
}
