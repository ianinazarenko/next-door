import { ITEMS_PER_PAGE, OFFSET } from '@/utils/constants/posts';
import { IComplexesState } from '@/types/complexes';
import { fetchComplexesAction } from '@/lib/actions/append-complexes';
import ComplexesList from '@/app/complexes/(components)/list/ComplexesList';
import ComplexesListLoader from '@/app/complexes/(components)/list/ComplexesListLoader';

export default async function ComplexesListSection({ params }: { params: IComplexesState }) {
    try {
        const { results, hasMore } = await fetchComplexesAction({ limit: ITEMS_PER_PAGE, offset: OFFSET, params });

        return (
            <>
                <ComplexesList complexes={results} />

                <ComplexesListLoader
                    initialOffset={OFFSET + ITEMS_PER_PAGE}
                    initialHasMore={hasMore}
                    params={params}
                    key={JSON.stringify(params)}
                />
            </>
        );
    } catch (error) {
        console.error('[ComplexesListSection]: Error loading complexes:', error);
        throw error;
    }
}
