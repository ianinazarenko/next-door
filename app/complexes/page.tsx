// Constants
import { PAGES_METADATA } from '@/utils/data/seo';
import { ITEMS_PER_PAGE, OFFSET } from '@/utils/constants/posts';
// Types
import { IComplexesState } from '@/types/complexes';
import { Metadata } from 'next';
// Styles
import s from './page.module.css';
// Utils
import { fetchComplexesAction } from '@/lib/actions/append-complexes';
// Components
import { Suspense } from 'react';
import ComplexesList from '@/app/components/pages/complexes/ComplexesList';
import ComplexesListSkeleton from '@/app/components/pages/complexes/skeletons/ComplexesListSkeleton';
import ComplexesSearch from '@/app/components/pages/complexes/ComplexesSearch';
import ComplexesListLoader from '@/app/components/pages/complexes/ComplexesListLoader';

export const metadata: Metadata = PAGES_METADATA.COMPLEXES;

const TITLE = 'Residential Complexes';
const DESC = 'Find your community to get started';

export default async function ComplexesPage({ searchParams }: { searchParams: Promise<IComplexesState> }) {
    const params = await searchParams;

    try {
        const pageData = await fetchComplexesAction({ limit: ITEMS_PER_PAGE, offset: OFFSET, params });

        return (
            <div className={`page c-container`}>
                <div className={s.header}>
                    <h1 className={'h1'}>{TITLE}</h1>
                    <p className={'card-description'}>{DESC}</p>
                </div>

                <div className={s.search}>
                    <ComplexesSearch />
                </div>

                <section>
                    <Suspense fallback={<ComplexesListSkeleton />}>
                        <ComplexesList complexes={pageData.results} />
                    </Suspense>

                    <ComplexesListLoader
                        initialOffset={OFFSET + ITEMS_PER_PAGE}
                        initialHasMore={pageData.hasMore}
                        params={params}
                    />
                </section>
            </div>
        );
    } catch (error) {
        console.error('[ComplexesPage]: Error loading complexes:', error);
        throw error;
    }
}
