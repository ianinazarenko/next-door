import { IPostListItem } from '@/types/posts';
import s from './PostsList.module.css';
import PostsListCard from '@/app/(public)/posts/(components)/card/PostsListCard';

interface IProps {
    posts: IPostListItem[];
}

export default function PostsList({ posts }: IProps) {
    if (!posts?.length) {
        return <p className={'section'}>Sorry, no announcements found</p>;
    }

    return (
        <ul
            className={s.list}
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
