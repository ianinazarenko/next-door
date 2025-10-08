// Constants
import { PAGES_METADATA } from '@/utils/data/seo';
// Types
import { Metadata } from 'next';
// Utils
// Components
import { Suspense } from 'react';
import NewPostHeader from '@/app/components/pages/posts-new/NewPostHeader';
import NewPostLoader from '@/app/components/pages/posts-new/NewPostLoader';
import NewPostFormWrapper from '@/app/components/pages/posts-new/form/NewPostFormWrapper';

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
