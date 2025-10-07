import { IComplexBase } from '@/types/complexes';
import s from './ComplexesList.module.css';
import ComplexesCard from '@/app/components/pages/complexes/ComplexesCard';

export default function ComplexesList({ complexes }: { complexes: IComplexBase[] }) {
    if (!complexes?.length) {
        return <p className={'section'}>Sorry, no complexes found</p>;
    }

    return (
        <div className={s.list}>
            {complexes.map((item) => (
                <ComplexesCard
                    key={item.id}
                    {...item}
                />
            ))}
        </div>
    );
}
