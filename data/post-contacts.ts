import { IContactsItem, IContactsProps } from '@/types/contacts';

export const CONTACTS: IContactsItem<IContactsProps>[] = [
    {
        key: 'phone',
        getLink: (num: string) => `tel:${num}`,
        target: '_self',
        rel: undefined,
        href: '',
    },
    {
        key: 'whatsapp',
        getLink: (num: string) => `https://api.whatsapp.com/send?phone=${num.replace(/\D/g, '')}`,
        target: '_blank',
        rel: 'noopener noreferrer',
        href: '',
    },
] as const;
