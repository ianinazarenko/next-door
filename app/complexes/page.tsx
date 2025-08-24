// Types
import { IComplexBase } from '@/types/complexes';
// Styles
import s from './page.module.css';
// Utils
import { fetchComplexes } from '@/lib/queries';
// Components
import { Suspense } from 'react';
import CInput from '@/app/components/ui/CInput';
import ComplexesList from '@/app/components/pages/complexes/ComplexesList';
import ComplexesListSkeleton from '@/app/components/pages/complexes/skeletons/ComplexesListSkeleton';

const TITLE = 'Residential Complexes';
const DESC = 'Find your community to get started';

export default async function ComplexesPage() {
    const complexes: IComplexBase[] = await fetchComplexes({ limit: 10, offset: 0 });

    return (
        <div className={`page c-container`}>
            <div className={s.header}>
                <h1 className={'h1'}>{TITLE}</h1>
                <p className={'card-description'}>{DESC}</p>
            </div>

            <div className={s.search}>
                <CInput />
            </div>

            <Suspense fallback={<ComplexesListSkeleton />}>
                <ComplexesList complexes={complexes} />
            </Suspense>
        </div>
    );
}
