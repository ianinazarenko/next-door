import type { IUsefulPhone } from '@/types/complexes';

import clsx from 'clsx';

import ComplexInfoItem from '@/app/(public)/complexes/[slug]/(components)/info/info-item/ComplexInfoItem';

import s from './ComplexInfoContacts.module.css';

const TITLE = 'Useful numbers';

export default function ComplexInfoPhones({ usefulPhones }: { usefulPhones: IUsefulPhone[] }) {
    if (!usefulPhones.length) return null;

    const phones = [...usefulPhones].sort(
        (a, b) =>
            Number(b.name.trim().toLowerCase() === 'emergency') -
            Number(a.name.trim().toLowerCase() === 'emergency')
    );

    return (
        <section className={s.wrapper}>
            <h2 className={clsx('h3', s.title)}>{TITLE}</h2>

            <ul className={s.list}>
                {phones.map((phone) => (
                    <ComplexInfoItem
                        key={phone.id}
                        item={{ label: phone.name, value: phone.number, type: 'phone' }}
                    />
                ))}
            </ul>
        </section>
    );
}
