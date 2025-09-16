import { IPostListItem } from '@/types/posts';
import s from './PostsList.module.css';
import clsx from 'clsx';
import PostsListCard from '@/app/components/pages/posts/list/PostsListCard';

interface IProps {
    posts: IPostListItem[];
}

export default function PostsList({ posts }: IProps) {
    return (
        <section className={clsx('section', s.list)}>
            {posts.map((post) => (
                <PostsListCard
                    key={post.id}
                    post={post}
                />
            ))}
        </section>
    );
}
