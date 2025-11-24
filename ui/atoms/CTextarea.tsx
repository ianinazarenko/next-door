import React, { ChangeEventHandler } from 'react';
import { Field, Textarea as HeadlessTextarea } from '@headlessui/react';
import CLabel from '@/ui/atoms/CLabel';
import CDescription from '@/ui/atoms/CDescription';

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
                className={`mt-1 block min-h-[100px] w-full resize-y rounded-(--radius-input) border-none bg-(--bg-secondary) px-(--p-input-x) py-(--p-input-y) text-(--input-text) text-(--text-primary) focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-(--border)`}
                onChange={onChange}
                {...props}
            />
        </Field>
    );
}

export default CTextarea;
