import type { ChangeEventHandler } from 'react';

import { Field, Textarea as HeadlessTextarea } from '@headlessui/react';
import React from 'react';

import CDescription from '@/ui/atoms/CDescription';
import CLabel from '@/ui/atoms/CLabel';

import s from './FormControl.module.css';

interface ITextareaProps {
    label?: string;
    description?: string;
    placeholder?: string;
    rows?: number;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
    className?: string;
}

function CTextarea({ onChange, label, description, placeholder, rows = 4, className = '', ...props }: ITextareaProps) {
    return (
        <Field className={`w-full ${className}`}>
            {label && <CLabel>{label}</CLabel>}
            {description && <CDescription>{description}</CDescription>}
            <HeadlessTextarea
                placeholder={placeholder}
                rows={rows}
                className={`${s.control} ${s.textarea}`}
                onChange={onChange}
                {...props}
            />
        </Field>
    );
}

export default CTextarea;
