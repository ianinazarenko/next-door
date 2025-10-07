import React, { ChangeEventHandler } from 'react';
import { Field, Input } from '@headlessui/react';
import CLabel from '@/app/components/ui/CLabel';
import CDescription from '@/app/components/ui/CDescription';

interface IInputProps {
    value: string;
    label?: string;
    description?: string;
    placeholder?: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function CInput({ onChange, value, label, description, placeholder, ...props }: IInputProps) {
    return (
        <Field className='w-full'>
            {label && <CLabel>{label}</CLabel>}
            {description && <CDescription>{description}</CDescription>}
            <Input
                value={value}
                placeholder={placeholder}
                className={`mt-1 block w-full rounded-(--radius-input) border-none bg-(--bg-secondary) px-(--p-input-x) py-(--p-input-y) text-(--input-text) text-(--text-primary) focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-(--border)`}
                onChange={onChange}
                {...props}
            />
        </Field>
    );
}

export default CInput;
