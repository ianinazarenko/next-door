import { IPostListItem } from '@/types/posts';
import s from './PostsList.module.css';
import PostsListCard from '@/app/components/pages/posts/list/PostsListCard';

interface IProps {
    posts: IPostListItem[];
}

export default function PostsList({ posts }: IProps) {
    if (!posts?.length) {
        return <p className={'section'}>Sorry, no announcements found</p>;
    }

    return (
        <div className={s.list}>
            {posts.map((post) => (
                <PostsListCard
                    key={post.id}
                    post={post}
                />
            ))}
        </div>
    );
}
