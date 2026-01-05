import { auth } from '@/lib/auth';
import { fetchCategoriesSpecs } from '@/lib/data-access/queries/categories';
import { fetchComplexesSpecs } from '@/lib/data-access/queries/complexes';
import NewPostForm from '@/app/posts/new/(components)/form/NewPostForm';

export default async function NewPostFormWrapper() {
    try {
        const [categoriesSpecs, complexSpecs, session] = await Promise.all([
            fetchCategoriesSpecs(false),
            fetchComplexesSpecs(false),
            auth(),
        ]);

        return (
            <>
                <NewPostForm
                    specs={{ complex: complexSpecs, category: categoriesSpecs }}
                    isSignedIn={Boolean(session)}
                />
            </>
        );
    } catch (error) {
        console.error('[NewPostFormWrapper]: Error loading specs:', error);
        throw error;
    }
}
