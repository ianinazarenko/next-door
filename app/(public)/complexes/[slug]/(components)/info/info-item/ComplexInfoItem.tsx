// Types
import { IContactItem } from '../types';
// Styles
import s from '@/app/(public)/complexes/[slug]/(components)/info/info-item/ComplexInfoItem.module.css';
// Utils
import clsx from 'clsx';
import { parsePhoneNumber } from '@/utils/helpers/phone-utils';

export default function ComplexInfoItem({ item }: { item: IContactItem }) {
    let valueNode: React.ReactNode = item.value ?? null;

    if (item.isPhone) {
        const phone = parsePhoneNumber(item.value);

        if (phone.isDialable) {
            valueNode = (
                <a
                    className={s.link}
                    href={`tel:${phone.callable}`}
                >
                    {phone.readable}
                </a>
            );
        }
    } else if (item.isEmail && item.value) {
        valueNode = (
            <a
                className={s.link}
                href={`mailto:${item.value}`}
            >
                {item.value}
            </a>
        );
    }

    return (
        <li className={clsx('card-description', s.item)}>
            <span className={s.label}>{item.label}:</span>
            <span className={s.value}>{valueNode}</span>
        </li>
    );
}
