import { fetchPost } from '@/lib/queries/posts';
import { notFound } from 'next/navigation';

import { Suspense } from 'react';
import PostMain from '@/app/components/pages/post/PostMain';
import BackButton from '@/app/components/common/back-button/BackButton';

export const revalidate = 300;

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const post = await fetchPost(id);

    if (!post) {
        return notFound();
    }

    try {
        return (
            <div className={'page c-container'}>
                <BackButton />

                <Suspense fallback={<div>Loading...</div>}>
                    <PostMain post={post} />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error('[PostPage]: Error loading post:', error);
        throw error;
    }
}
