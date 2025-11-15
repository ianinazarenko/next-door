// Types
import { IContactItem } from '../types';
// Styles
import s from '@/app/components/pages/complex/info/info-item/ComplexInfoItem.module.css';
// Utils
import clsx from 'clsx';
import { formatPhoneNumber } from '@/utils/helpers/phone-utils';

export default function ComplexInfoItem({ item }: { item: IContactItem }) {
    return (
        <li className={clsx('card-description', s.item)}>
            <span className={s.label}>{item.label}:</span>

            <span className={s.value}>
                {item.isPhone ? (
                    <a
                        className={s.link}
                        href={`tel:${item.value}`}
                    >
                        {formatPhoneNumber(item.value!)}
                    </a>
                ) : item.isEmail ? (
                    <a
                        className={s.link}
                        href={`mailto:${item.value}`}
                    >
                        {item.value}
                    </a>
                ) : (
                    item.value
                )}
            </span>
        </li>
    );
}
