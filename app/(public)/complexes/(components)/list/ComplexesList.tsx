import { IComplexBase } from '@/types/complexes';
import s from './ComplexesList.module.css';
import ComplexesCard from '@/app/(public)/complexes/(components)/card/ComplexesCard';

export default function ComplexesList({ complexes }: { complexes: IComplexBase[] }) {
    if (!complexes?.length) {
        return <p className={'section'}>Sorry, no complexes found</p>;
    }

    return (
        <ul className={s.list}>
            {complexes.map((item) => (
                <li key={item.id}>
                    <ComplexesCard {...item} />
                </li>
            ))}
        </ul>
    );
}
