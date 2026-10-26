// Types
import { IManagementCompany } from '@/types/complexes';
import { IContactItem } from '@/app/(public)/complexes/[slug]/(components)/info/types';
// Styles
import s from './ComplexInfoContacts.module.css';
// Utils
import clsx from 'clsx';
// Components
import ComplexInfoItem from '@/app/(public)/complexes/[slug]/(components)/info/info-item/ComplexInfoItem';

interface IComplexContacts {
    phone: string | null;
    email: string | null;
    managementCompany: IManagementCompany | null;
}

// eslint-disable-next-line complexity
export default function ComplexInfoContacts({ contacts }: { contacts: IComplexContacts }) {
    const { phone, email, managementCompany } = contacts;
    const { name, phone: companyPhone, email: companyEmail } = managementCompany ?? {};

    const complexItems: IContactItem[] = [
        {
            label: 'Phone',
            value: phone,
            isPhone: true,
        },
        {
            label: 'Email',
            value: email,
            isEmail: true,
        },
    ].filter((item) => item.value);

    const managementItems: IContactItem[] = [
        {
            label: 'Phone',
            value: companyPhone,
            isPhone: true,
        },
        {
            label: 'Email',
            value: companyEmail,
            isEmail: true,
        },
    ].filter((item) => item.value);

    const hasManagement = Boolean(name || managementItems.length);

    if (!hasManagement && !complexItems.length) return null;

    return (
        <section className={s.wrapper}>
            <h2 className={clsx('h3', s.title)}>
                {hasManagement ? 'Management company' : 'Complex contacts'}
            </h2>

            {name && <p className={clsx('card-title', s.companyName)}>{name}</p>}

            {managementItems.length > 0 && (
                <ul className={s.list}>
                    {managementItems.map((item) => (
                        <ComplexInfoItem
                            key={item.label}
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
                                key={item.label}
                                item={item}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}
