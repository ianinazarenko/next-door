import { IComment } from '@/types/comments';
import { dateFormatter } from '@/utils/helpers/date-utils';
import s from './PostComment.module.css';
import clsx from 'clsx';
import UserPic from '@/ui/common/user/UserPic';

export default function PostComment({ comment }: { comment: IComment }) {
    const date = dateFormatter.format(comment.createdAt);
    return (
        <div className={s.card}>
            <UserPic
                image={comment.author?.image}
                name={comment.author?.name}
                index={comment.authorId}
            />

            <div>
                <p className={clsx('card-description', s.author)}>{comment.author?.name || 'Anonymous'}</p>
                {Boolean(date) && <p className={'card-meta mb-2'}>{date}</p>}
                <p>{comment.text}</p>
            </div>
        </div>
    );
}
