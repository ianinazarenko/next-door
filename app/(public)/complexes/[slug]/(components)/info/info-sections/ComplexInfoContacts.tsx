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
    metro: string | null;
    address: string | null;
    phone: string | null;
    email: string | null;
    managementCompany: IManagementCompany | null;
}

const TITLE = 'Contacts Info';

export default function ComplexInfoContacts({ contacts }: { contacts: IComplexContacts }) {
    const { phone, email, metro, address, managementCompany } = contacts;
    const { name, phone: companyPhone, email: companyEmail } = managementCompany ?? {};

    const contactItems: IContactItem[] = [
        {
            label: 'Complex Phone',
            value: phone,
            isPhone: true,
        },
        {
            label: 'Complex Email',
            value: email,
            isEmail: true,
        },
        {
            label: 'Address',
            value: address,
        },
        {
            label: 'Metro',
            value: metro,
        },
        {
            label: 'Management Company',
            value: name,
        },
        {
            label: 'Management Phone',
            value: companyPhone,
            isPhone: true,
        },
        {
            label: 'Management Email',
            value: companyEmail,
            isEmail: true,
        },
    ].filter((item) => item.value);

    return (
        <section>
            <div className={s.wrapper}>
                <h2 className={clsx('h3', s.title)}>{TITLE}</h2>

                <ul className={s.list}>
                    {contactItems.map((item, index) => (
                        <ComplexInfoItem
                            key={index}
                            item={item}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}
