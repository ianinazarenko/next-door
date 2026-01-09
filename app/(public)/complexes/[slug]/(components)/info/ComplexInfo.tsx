// Types
import { IComplexFull } from '@/types/complexes';
// Utils
import clsx from 'clsx';
// Styles
import s from '@/app/(public)/complexes/[slug]/(components)/info/ComplexInfo.module.css';
// Components
import ComplexInfoContacts from '@/app/(public)/complexes/[slug]/(components)/info/info-sections/ComplexInfoContacts';
import ComplexInfoPhones from '@/app/(public)/complexes/[slug]/(components)/info/info-sections/ComplexInfoPhones';

export default function ComplexInfo({ complex }: { complex: IComplexFull }) {
    const { phone, email, address, description, metro, managementCompany, usefulPhones } = complex;

    return (
        <div className={'section'}>
            {description && <p className={'card-description'}>{description}</p>}

            <div className={clsx(s.container, 'section')}>
                <ComplexInfoContacts contacts={{ phone, email, metro, address, managementCompany }} />

                <ComplexInfoPhones usefulPhones={usefulPhones} />
            </div>
        </div>
    );
}
