import { IComplexBase } from '@/types/complexes';
import clsx from 'clsx';
import s from './ComplexesList.module.css';
import ComplexesCard from '@/app/(public)/complexes/(components)/card/ComplexesCard';

export default function ComplexesList({ complexes }: { complexes: IComplexBase[] }) {
    if (!complexes?.length) {
        return (
            <p className={clsx('section content-fade-in', s.section)}>Sorry, no complexes found</p>
        );
    }

    return (
        <ul className={clsx(s.list, 'content-fade-in')}>
            {complexes.map((item) => (
                <li key={item.id}>
                    <ComplexesCard {...item} />
                </li>
            ))}
        </ul>
    );
}
