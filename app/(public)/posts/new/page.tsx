import type { Metadata } from 'next';

import { Suspense } from 'react';

import NewPostFormWrapper from '@/app/(public)/posts/new/(components)/form/NewPostFormWrapper';
import NewPostHeader from '@/app/(public)/posts/new/(components)/header/NewPostHeader';
import NewPostLoader from '@/app/(public)/posts/new/(components)/loader/NewPostLoader';
import { PAGES_METADATA } from '@/data/seo';

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
