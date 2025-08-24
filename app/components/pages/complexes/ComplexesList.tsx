import { IComplexBase } from '@/types/complexes';
import s from './ComplexesList.module.css';
import ComplexesCard from '@/app/components/pages/complexes/ComplexesCard';

const TITLE = 'Available Complexes';

export default function ComplexesList({ complexes }: { complexes: IComplexBase[] }) {
    if (!complexes?.length) {
        return <p className={'section'}>Sorry, no complexes found</p>;
    }

    return (
        <div className={s.container}>
            <h2 className={'h4'}>{TITLE}</h2>

            <div className={s.list}>
                {complexes.map((item) => (
                    <ComplexesCard
                        key={item.id}
                        title={item.name}
                        address={item.address}
                    />
                ))}
            </div>
        </div>
    );
}
