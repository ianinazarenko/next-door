import type { IComplexBase } from '@/types/complexes';

import clsx from 'clsx';

import ComplexesCard from '@/app/(public)/complexes/(components)/card/ComplexesCard';

import s from './ComplexesList.module.css';

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
