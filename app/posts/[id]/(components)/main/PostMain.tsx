import { IPostFull } from '@/types/posts';
import s from './PostMain.module.css';
import PostHeader from '@/app/posts/[id]/(components)/header/PostHeader';
import PostImage from '@/app/posts/[id]/(components)/image/PostImage';
import PostContacts from '@/app/posts/[id]/(components)/contacts/PostContacts';
import PostComments from '@/app/posts/[id]/(components)/comments/PostComments';

export default function PostMain({ post }: { post: IPostFull }) {
    const { title, createdAt, fullText, phone, whatsapp, authorName, comments } = post;

    return (
        <div className={s.container}>
            <PostHeader
                title={title}
                author={authorName}
                createdAt={createdAt}
            />

            <section>
                {fullText && <p className={'my-4'}>{fullText}</p>}

                <PostImage />
            </section>

            <PostContacts contacts={{ phone, whatsapp }} />

            {comments.length > 0 && <PostComments comments={comments} />}
        </div>
    );
}
