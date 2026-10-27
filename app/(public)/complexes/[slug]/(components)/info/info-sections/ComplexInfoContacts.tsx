import type { IContactItem } from '@/app/(public)/complexes/[slug]/(components)/info/types';
import type { IManagementCompany } from '@/types/complexes';

import clsx from 'clsx';

import ComplexInfoItem from '../info-item/ComplexInfoItem';

import s from './ComplexInfoContacts.module.css';

interface IComplexContacts {
    phone: string | null;
    email: string | null;
    managementCompany: IManagementCompany | null;
}

const KEYS = ['phone', 'email'] as const;
const LABELS = {
    phone: 'Phone',
    email: 'Email',
} as const;

function getItems(item: IComplexContacts | IManagementCompany) {
    return KEYS.map((key) => ({
        label: LABELS[key],
        value: item[key],
        type: key,
    }));
}

export default function ComplexInfoContacts({ contacts }: { contacts: IComplexContacts }) {
    const complexItems: IContactItem[] = getItems(contacts);
    const mCompany = contacts.managementCompany;
    const mName = mCompany?.name;
    const managementItems: IContactItem[] = mCompany ? getItems(mCompany) : [];
    const hasManagement = Boolean(mName || managementItems.length);

    // RENDER
    if (!hasManagement && !complexItems.length) return null;

    return (
        <section className={s.wrapper}>
            <h2 className={clsx('h3', s.title)}>
                {hasManagement ? 'Management company' : 'Complex contacts'}
            </h2>

            {mName && <p className={clsx('card-title', s.companyName)}>{mName}</p>}

            {managementItems.length > 0 && (
                <ul className={s.list}>
                    {managementItems.map((item) => (
                        <ComplexInfoItem
                            key={item.type}
                            item={item}
                        />
                    ))}
                </ul>
            )}

            {complexItems.length > 0 && (
                <div className={hasManagement ? s.group : undefined}>
                    {hasManagement && <h3 className={s.subheading}>Complex contacts</h3>}

                    <ul className={s.list}>
                        {complexItems.map((item) => (
                            <ComplexInfoItem
                                key={item.type}
                                item={item}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
