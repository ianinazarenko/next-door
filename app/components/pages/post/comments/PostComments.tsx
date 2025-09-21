import { IComment } from '@/types/comments';
import s from './PostComments.module.css';
import PostComment from '@/app/components/pages/post/comments/PostComment';

const SECTION_TITLE = 'Comments';
export default function PostComments({ comments }: { comments: IComment[] }) {
    const count = comments.length;

    return (
        <section>
            <h2 className={'h4 py-4'}>
                {SECTION_TITLE} ({count > 0 ? count : ''})
            </h2>

            <ul className={s.list}>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <PostComment comment={comment} />
                    </li>
                ))}
            </ul>
        </section>
    );
}
