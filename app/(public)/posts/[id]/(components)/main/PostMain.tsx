import { IPostFull } from '@/types/posts';
import s from './PostMain.module.css';
import PostHeader from '@/app/(public)/posts/[id]/(components)/header/PostHeader';
import PostImage from '@/app/(public)/posts/[id]/(components)/image/PostImage';
import PostContacts from '@/app/(public)/posts/[id]/(components)/contacts/PostContacts';
import PostComments from '@/app/(public)/posts/[id]/(components)/comments/PostComments';

export default function PostMain({ post }: { post: IPostFull }) {
    const { title, createdAt, fullText, author, comments } = post;
    const hasContacts = Boolean(author) && Boolean(author.phone || author.whatsapp);

    return (
        <div className={s.container}>
            <PostHeader
                title={title}
                author={author?.name}
                createdAt={createdAt}
            />

            <section>
                {fullText && <p className={'post-text my-4'}>{fullText}</p>}

                {/* TODO: Add image handling instead of defaults */}
                <PostImage />
            </section>

            {hasContacts && <PostContacts contacts={{ phone: author?.phone, whatsapp: author?.whatsapp }} />}

            {comments.length > 0 && <PostComments comments={comments} />}
        </div>
    );
}
