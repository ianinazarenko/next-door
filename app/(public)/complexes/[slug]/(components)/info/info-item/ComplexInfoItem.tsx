// Types
import { IContactItem } from '../types';
// Styles
import s from '@/app/(public)/complexes/[slug]/(components)/info/info-item/ComplexInfoItem.module.css';
// Utils
import clsx from 'clsx';
import { parsePhoneNumber } from '@/utils/helpers/phone-utils';

export default function ComplexInfoItem({ item }: { item: IContactItem }) {
    let value = item.value;
    let href: string | null = null;

    if (item.isPhone) {
        const phone = parsePhoneNumber(item.value);

        if (phone.isDialable) {
            value = phone.readable;
            href = `tel:${phone.callable}`;
        }
    } else if (item.isEmail && item.value) {
        href = `mailto:${item.value}`;
    }

    const content = (
        <>
            <span className={s.label}>{item.label}</span>
            <span className={s.value}>{value}</span>
        </>
    );

    return (
        <li className={s.item}>
            {href ? (
                <a
                    className={clsx('card-description', s.row, s.rowLink)}
                    href={href}
                >
                    {content}
                </a>
            ) : (
                <div className={clsx('card-description', s.row)}>{content}</div>
            )}
        </li>
    );
}
