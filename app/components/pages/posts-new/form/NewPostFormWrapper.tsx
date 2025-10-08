import { fetchCategoriesSpecs } from '@/lib/queries/categories';
import { fetchComplexesSpecs } from '@/lib/queries/complexes';
import NewPostForm from '@/app/components/pages/posts-new/form/NewPostForm';

export default async function NewPostFormWrapper() {
    try {
        const [categoriesSpecs, complexSpecs] = await Promise.all([
            fetchCategoriesSpecs(false),
            fetchComplexesSpecs(false),
        ]);

        return (
            <>
                <NewPostForm specs={{ complex: complexSpecs, category: categoriesSpecs }} />
            </>
        );
    } catch (error) {
        console.error('[NewPostFormWrapper]: Error loading specs:', error);
        throw error;
    }
}
