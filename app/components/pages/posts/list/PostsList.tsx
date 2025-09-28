import { IPostListItem } from '@/types/posts';
import s from './PostsList.module.css';
import clsx from 'clsx';
import PostsListCard from '@/app/components/pages/posts/list/PostsListCard';
import PostsListAddBtn from '@/app/components/pages/posts/list/PostsListAddBtn';

interface IProps {
    posts: IPostListItem[];
}

export default function PostsList({ posts }: IProps) {
    if (!posts?.length) {
        return <p className={'section'}>Sorry, no announcements found</p>;
    }

    return (
        <section className={clsx('section', s.list)}>
            {posts.map((post) => (
                <PostsListCard
                    key={post.id}
                    post={post}
                />
            ))}

            {/*  TODO: add pagination and loading */}

            <PostsListAddBtn />
        </section>
    );
}
