import { fetchCategoriesSpecs } from '@/lib/queries/categories';
import { fetchComplexesSpecs } from '@/lib/queries/complexes';

import { Suspense } from 'react';
import NewPostHeader from '@/app/components/pages/posts-new/NewPostHeader';
import NewPostForm from '@/app/components/pages/posts-new/form/NewPostForm';
import NewPostLoader from '@/app/components/pages/posts-new/NewPostLoader';

export default async function NewPostPage() {
    try {
        const [categoriesSpecs, complexSpecs] = await Promise.all([
            fetchCategoriesSpecs(false),
            fetchComplexesSpecs(false),
        ]);

        return (
            <div className={'page c-container'}>
                <NewPostHeader />

                <Suspense fallback={<NewPostLoader />}>
                    <NewPostForm specs={{ complex: complexSpecs, category: categoriesSpecs }} />
                </Suspense>
            </div>
        );
    } catch (error) {
        console.error('[NewPostPage]: Error loading specs:', error);
        throw error;
    }
}
