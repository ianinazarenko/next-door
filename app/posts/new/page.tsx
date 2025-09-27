import { fetchCategoriesSpecs } from '@/lib/queries/categories';

import { Suspense } from 'react';
import NewPostHeader from '@/app/components/pages/posts-new/NewPostHeader';
import NewPostForm from '@/app/components/pages/posts-new/form/NewPostForm';
import NewPostLoader from '@/app/components/pages/posts-new/NewPostLoader';

export default async function NewPostPage() {
    try {
        const categoriesSpecs = await fetchCategoriesSpecs(false);

        return (
            <div className={'page c-container'}>
                <NewPostHeader />

                <Suspense fallback={<NewPostLoader />}>
                    <NewPostForm categoriesSpecs={categoriesSpecs} />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error('[NewPostPage]: Error loading specs:', error);
        throw error;
    }
}
