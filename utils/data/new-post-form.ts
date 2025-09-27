import { INewPostField, TSchema } from '@/types/form';

import CInput from '@/app/components/ui/CInput';
import CTextarea from '@/app/components/ui/CTextarea';
import CSelect from '@/app/components/ui/CSelect';

export const DEFAULT_VALUES: Record<keyof TSchema, string> = {
    title: '',
    shortText: '',
    fullText: '',
    complex: '',
    category: '',
    phone: '',
    whatsApp: '',
};

export const FIELDS: INewPostField[] = [
    {
        name: 'title',
        label: 'Title',
        is: CInput,
        placeholder: 'e.g. Free puppy for a good home',
    },
    {
        name: 'shortText',
        label: 'Short text',
        is: CTextarea,
        placeholder: 'A short summary of your announcement',
        rows: 2,
    },
    {
        name: 'fullText',
        label: 'Detailed text',
        is: CTextarea,
        placeholder: 'A detailed description of your announcement',
        rows: 4,
    },
    {
        name: 'phone',
        label: 'Phone',
        is: CInput,
        placeholder: 'Your phone number',
        className: 'col',
    },
    {
        name: 'whatsApp',
        label: 'WhatsApp',
        is: CInput,
        placeholder: 'Your WhatsApp number',
        className: 'col',
    },
    {
        name: 'category',
        label: 'Category',
        is: CSelect,
        placeholder: 'Select category',
        specs: [],
    },
];
