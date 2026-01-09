import { IUsefulPhone } from '@/types/complexes';
import clsx from 'clsx';
import s from './ComplexInfoContacts.module.css';
import ComplexInfoItem from '@/app/(public)/complexes/[slug]/(components)/info/info-item/ComplexInfoItem';

const TITLE = 'Useful Phones';

export default function ComplexInfoPhones({ usefulPhones }: { usefulPhones: IUsefulPhone[] }) {
    return (
        <section>
            <div className={s.wrapper}>
                <h2 className={clsx('h3', s.title)}>{TITLE}</h2>

                <ul className={s.list}>
                    {usefulPhones.map((phone) => (
                        <ComplexInfoItem
                            key={phone.id}
                            item={{ label: phone.name, value: phone.number, isPhone: true }}
                        />
                    ))}
                </ul>
            </div>
        </section>
    );
}
