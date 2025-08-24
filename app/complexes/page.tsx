import { IComplexBase } from '@/types/complexes';
import s from './page.module.css';
import CInput from '@/app/components/ui/CInput';
import ComplexesList from '@/app/components/pages/complexes/ComplexesList';
import { fetchComplexes } from '@/lib/queries';

const TITLE = 'Residential Complexes';
const DESC = 'Find your community to get started';

export default async function ComplexesPage() {
    const complexes: IComplexBase[] = await fetchComplexes({ limit: 10, offset: 0 });
    console.log(complexes);

    return (
        <div className={`page c-container`}>
            <div className={s.header}>
                <h1 className={'h1'}>{TITLE}</h1>
                <p className={'card-description'}>{DESC}</p>
            </div>

            <div>
                <CInput />
            </div>

            <ComplexesList />
        </div>
    );
}
