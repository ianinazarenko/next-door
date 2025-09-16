import s from './PostsListSkeleton.module.css';
import clsx from 'clsx';
import PostsListCardSkeleton from '@/app/components/pages/posts/skeletons/PostsListCardSkeleton';

export default function PostsListSkeleton() {
    return (
        <section className={clsx('section', s.list)}>
            {Array.from({ length: 6 }).map((item, index) => (
                <PostsListCardSkeleton key={index} />
            ))}
        </section>
    );
}
