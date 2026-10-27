import type { IComplexFull } from '@/types/complexes';

import clsx from 'clsx';

import s from './ComplexInfo.module.css';
import ComplexInfoContacts from './info-sections/ComplexInfoContacts';
import ComplexInfoPhones from './info-sections/ComplexInfoPhones';

export default function ComplexInfo({ complex }: { complex: IComplexFull }) {
    const { phone, email, description, managementCompany, usefulPhones } = complex;

    return (
        <div className={'section'}>
            {description && <p className={'card-description'}>{description}</p>}

            <div className={clsx(s.container, 'section')}>
                <ComplexInfoContacts contacts={{ phone, email, managementCompany }} />

                <ComplexInfoPhones usefulPhones={usefulPhones} />
            </div>
        </div>
    );
}
