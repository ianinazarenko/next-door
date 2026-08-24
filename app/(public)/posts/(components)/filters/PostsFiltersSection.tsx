import { fetchComplexesSpecs } from '@/lib/data-access/queries/complexes';
import { fetchCategoriesSpecs } from '@/lib/data-access/queries/categories';
import PostsFilters from '@/app/(public)/posts/(components)/filters/PostsFilters';

export default async function PostsFiltersSection() {
    let complexSpecs: Awaited<ReturnType<typeof fetchComplexesSpecs>>;
    let categoriesSpecs: Awaited<ReturnType<typeof fetchCategoriesSpecs>>;

    try {
        [complexSpecs, categoriesSpecs] = await Promise.all([fetchComplexesSpecs(), fetchCategoriesSpecs()]);
    } catch (e) {
        console.error('[PostsFiltersSection]: Error loading posts specs:', e);
        throw e;
    }

    const specs = {
        complex: complexSpecs,
        category: categoriesSpecs,
    };

    return <PostsFilters specs={specs} />;
}
