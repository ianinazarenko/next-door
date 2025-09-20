import { IPostFull } from '@/types/posts';
import s from './PostMain.module.css';
import PostHeader from '@/app/components/pages/post/header/PostHeader';
import PostImage from '@/app/components/pages/post/image/PostImage';
import PostContacs from '@/app/components/pages/post/contacts/PostContacts';

export default function PostMain({ post }: { post: IPostFull }) {
    const { title, shortText, category, createdAt, fullText, phone, whatsapp, authorName } = post;
    console.log(post);
    return (
        <div className={s.container}>
            <PostHeader
                title={title}
                author={authorName}
                createdAt={createdAt}
            />

            {fullText && <p className={s.text}>{fullText}</p>}

            <PostImage />

            <PostContacs contacts={{ phone, whatsapp }} />
        </div>
    );
}
