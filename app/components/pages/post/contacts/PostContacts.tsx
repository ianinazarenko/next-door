import { CONTACTS } from '@/utils/data/post-contacts';
import { IContactsProps } from '@/types/contacts';
import s from './PostContacts.module.css';
import { Phone } from 'lucide-react';
import { SiWhatsapp } from 'react-icons/si';

const ICONS: Record<keyof IContactsProps, React.ReactNode> = {
    phone: <Phone className={s.icon} />,
    whatsapp: <SiWhatsapp size={16} />,
};

export default function PostContacts({ contacts }: { contacts: IContactsProps }) {
    const links = CONTACTS.filter((item) => contacts[item.key]).map((item) => ({
        ...item,
        href: item.getLink(contacts[item.key] ?? ''),
    }));

    return (
        <div className={s.container}>
            {links.map((item) => (
                <a
                    key={item.key}
                    href={item.href}
                    target={item.key === 'phone' ? '_self' : '_blank'}
                    rel={item.key === 'phone' ? undefined : 'noopener noreferrer'}
                    className={'card-description'}
                >
                    <div className={s.item}>{ICONS[item.key]}</div>
                </a>
            ))}
        </div>
    );
}
