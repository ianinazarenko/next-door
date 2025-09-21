export interface IContactsProps {
    phone?: string | null;
    whatsapp?: string | null;
}

export interface IContactsItem<T> {
    key: keyof T;
    getLink: (num: string) => string;
    target: '_self' | '_blank';
    rel: 'noopener noreferrer' | undefined;
    href: string;
}
