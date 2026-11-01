import type { INewPostField, TSchema } from '@/types/forms';

import CInput from '@/ui/atoms/CInput';
import CSelect from '@/ui/atoms/CSelect';
import CTextarea from '@/ui/atoms/CTextarea';

export const DEFAULT_VALUES: Record<keyof TSchema, string> = {
    title: '',
    shortText: '',
    fullText: '',
    complex: '',
    category: '',
};

export const FIELD_GROUPS: { title: string; fields: INewPostField[] }[] = [
    {
        title: 'Basics',
        fields: [
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
            {
                name: 'title',
                label: 'Title',
                is: CInput,
                placeholder: 'e.g. Free puppy for a good home',
                description: 'Up to 40 characters.',
                maxLength: 40,
            },
        ],
    },
    {
        title: 'Details',
        fields: [
            {
                name: 'shortText',
                label: 'Short summary',
                is: CTextarea,
                placeholder: 'A short summary of your announcement',
                description: 'Shown on the announcement card. Up to 80 characters.',
                maxLength: 80,
                rows: 2,
            },
            {
                name: 'fullText',
                label: 'Description',
                is: CTextarea,
                placeholder: 'A detailed description of your announcement',
                description: 'Shown on the announcement page. Up to 500 characters.',
                maxLength: 500,
                rows: 4,
            },
        ],
    },
];
