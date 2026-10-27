import clsx from 'clsx';

import PostsListCardSkeleton from '@/app/(public)/posts/(components)/card/skeletons/PostsListCardSkeleton';

import s from './PostsListSkeleton.module.css';

export default function PostsListSkeleton() {
    return (
        <div className={clsx(s.list, 'content-fade-in')}>
            {Array.from({ length: 6 }).map((_, index) => (
                <PostsListCardSkeleton key={index} />
            ))}
        </div>
    );
}
