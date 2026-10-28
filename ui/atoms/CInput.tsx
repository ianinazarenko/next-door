import type { ChangeEventHandler } from 'react';

import { Field, Input } from '@headlessui/react';
import React from 'react';

import CDescription from '@/ui/atoms/CDescription';
import CLabel from '@/ui/atoms/CLabel';

import s from './FormControl.module.css';

interface IInputProps {
    value: string;
    label?: string;
    description?: string;
    placeholder?: string;
    disabled?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function CInput({ onChange, value, label, description, placeholder, disabled, ...props }: IInputProps) {
    return (
        <Field className='w-full'>
            {label && <CLabel>{label}</CLabel>}
            {description && <CDescription>{description}</CDescription>}
            <Input
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                className={s.control}
                onChange={onChange}
                {...props}
            />
        </Field>
    );
}

export default CInput;
