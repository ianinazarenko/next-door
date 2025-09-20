import s from './PostContacts.module.css';
import { SiWhatsapp } from 'react-icons/si';
import { Phone } from 'lucide-react';

interface IProps {
    phone?: string | null;
    whatsapp?: string | null;
}

const LINKS: Record<keyof IProps, (num: string) => string> = {
    phone: (num: string) => `tel:${num}`,
    whatsapp: (num: string) => `https://api.whatsapp.com/send?phone=${num.replace(/\D/g, '')}`,
};

const ICONS: Record<keyof IProps, React.ReactNode> = {
    phone: <Phone className={s.icon} />,
    whatsapp: <SiWhatsapp size={16} />,
};
function buildLinks(contacts: IProps) {
    return (Object.entries(contacts) as [keyof IProps, string | null][])
        .map(([key, value]) => (value ? { key, href: LINKS[key](value) } : { key, href: null }))
        .filter((item): item is { key: keyof IProps; href: string } => Boolean(item.href));
}

export default function PostContacts({ contacts }: { contacts: IProps }) {
    const links: { key: keyof IProps; href: string }[] = buildLinks(contacts);

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
