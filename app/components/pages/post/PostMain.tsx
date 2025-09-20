import { IPostFull } from '@/types/posts';
import PostHeader from '@/app/components/pages/post/PostHeader';

export default function PostMain({ post }: { post: IPostFull }) {
    const { title, shortText, category, createdAt, fullText, image, phone, whatsapp, authorName } = post;
    console.log(post);
    return (
        <div>
            <PostHeader
                title={title}
                author={authorName}
                createdAt={createdAt}
            />
        </div>
    );
}
