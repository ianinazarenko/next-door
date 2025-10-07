// Constants
import { PAGES_METADATA } from '@/utils/data/seo';
// Types
import { IComplexesState } from '@/types/complexes';
import { Metadata } from 'next';
// Styles
import s from './page.module.css';
// Components
import { Suspense } from 'react';
import ComplexesListSkeleton from '@/app/components/pages/complexes/skeletons/ComplexesListSkeleton';
import ComplexesSearch from '@/app/components/pages/complexes/ComplexesSearch';
import ComplexesListSection from '@/app/components/pages/complexes/ComplexesListSection';

export const metadata: Metadata = PAGES_METADATA.COMPLEXES;

const TITLE_H1 = 'Residential Complexes';
const DESC = 'Find your community to get started';
const TITLE_H2 = 'Available Complexes';

export default async function ComplexesPage({ searchParams }: { searchParams: Promise<IComplexesState> }) {
    const params = await searchParams;

    return (
        <div className={`page c-container`}>
            <div className={s.header}>
                <h1 className={'h1'}>{TITLE_H1}</h1>
                <p className={'card-description'}>{DESC}</p>
            </div>

            <div className={s.search}>
                <ComplexesSearch />
            </div>

            <section className={s.container}>
                <h2 className={'h4'}>{TITLE_H2}</h2>

                <Suspense fallback={<ComplexesListSkeleton />}>
                    <ComplexesListSection params={params} />
                </Suspense>
            </section>
        </div>
    );
}
