import { IPostListItem } from '@/types/posts';
import s from './PostsList.module.css';
import PostsListCard from '@/app/(public)/posts/(components)/card/PostsListCard';
import clsx from 'clsx';

interface IProps {
    posts: IPostListItem[];
}

export default function PostsList({ posts }: IProps) {
    if (!posts?.length) {
        return <p className={'section'}>Sorry, no announcements found</p>;
    }

    return (
        <ul
            className={clsx(s.list, 'content-fade-in')}
            data-testid='posts-list'
        >
            {posts.map((post) => (
                <li key={post.id}>
                    <PostsListCard post={post} />
                </li>
            ))}
        </ul>
    );
}
