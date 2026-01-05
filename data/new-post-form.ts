import { INewPostField, TSchema } from '@/types/forms';

import CInput from '@/ui/atoms/CInput';
import CTextarea from '@/ui/atoms/CTextarea';
import CSelect from '@/ui/atoms/CSelect';

export const DEFAULT_VALUES: Record<keyof TSchema, string> = {
    title: '',
    shortText: '',
    fullText: '',
    complex: '',
    category: '',
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
        name: 'category',
        label: 'Category',
        is: CSelect,
        placeholder: 'Select category',
        specs: [],
        className: 'col',
    },
    {
        name: 'complex',
        label: 'Complex',
        is: CSelect,
        placeholder: 'Select complex',
        specs: [],
        className: 'col',
    },
];
