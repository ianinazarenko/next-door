import { fetchCategoriesSpecs } from '@/lib/data-access/queries/categories';
import { fetchComplexesSpecs } from '@/lib/data-access/queries/complexes';
import NewPostForm from '@/app/(public)/posts/new/(components)/form/NewPostForm';

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
