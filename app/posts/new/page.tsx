// Constants
import { PAGES_METADATA } from '@/data/seo';
// Types
import { Metadata } from 'next';
// Utils
// Components
import { Suspense } from 'react';
import NewPostHeader from '@/app/posts/new/(components)/header/NewPostHeader';
import NewPostLoader from '@/app/posts/new/(components)/loader/NewPostLoader';
import NewPostFormWrapper from '@/app/posts/new/(components)/form/NewPostFormWrapper';

export const metadata: Metadata = PAGES_METADATA.NEW_POST;

export default async function NewPostPage() {
    return (
        <div className={'page c-container'}>
            <NewPostHeader />

            <Suspense fallback={<NewPostLoader />}>
                <NewPostFormWrapper />
            </Suspense>
        </div>
    );
}
