import s from './PostsListSkeleton.module.css';
import clsx from 'clsx';
import PostsListCardSkeleton from '@/app/posts/(components)/card/skeletons/PostsListCardSkeleton';

export default function PostsListSkeleton() {
    return (
        <div className={clsx(s.list)}>
            {Array.from({ length: 6 }).map((item, index) => (
                <PostsListCardSkeleton key={index} />
            ))}
        </div>
    );
}
