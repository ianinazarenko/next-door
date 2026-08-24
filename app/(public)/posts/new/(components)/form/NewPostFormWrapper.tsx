import { fetchCategoriesSpecs } from '@/lib/data-access/queries/categories';
import { fetchComplexesSpecs } from '@/lib/data-access/queries/complexes';
import NewPostForm from '@/app/(public)/posts/new/(components)/form/NewPostForm';

export default async function NewPostFormWrapper() {
    let categoriesSpecs: Awaited<ReturnType<typeof fetchCategoriesSpecs>>;
    let complexSpecs: Awaited<ReturnType<typeof fetchComplexesSpecs>>;

    try {
        [categoriesSpecs, complexSpecs] = await Promise.all([fetchCategoriesSpecs(false), fetchComplexesSpecs(false)]);
    } catch (error) {
        console.error('[NewPostFormWrapper]: Error loading specs:', error);
        throw error;
    }

    const specs = {
        complex: complexSpecs,
        category: categoriesSpecs,
    };

    return <NewPostForm specs={specs} />;
}
