import { fetchComplexesSpecs } from '@/lib/data-access/queries/complexes';
import { fetchCategoriesSpecs } from '@/lib/data-access/queries/categories';
import PostsFilters from '@/app/(public)/posts/(components)/filters/PostsFilters';

export default async function PostsFiltersSection() {
    try {
        const [complexSpecs, categoriesSpecs] = await Promise.all([fetchComplexesSpecs(), fetchCategoriesSpecs()]);
        return (
            <>
                <PostsFilters specs={{ complex: complexSpecs, category: categoriesSpecs }} />
            </>
        );
    } catch (e) {
        console.error('[PostsFiltersSection]: Error loading posts specs:', e);
        throw e;
    }
}
