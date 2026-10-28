import type { ChangeEvent } from 'react';

import { Field, Select } from '@headlessui/react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

import CDescription from '@/ui/atoms/CDescription';
import CLabel from '@/ui/atoms/CLabel';

import s from './FormControl.module.css';

interface ISelectProps {
    value: string | number;
    className?: string;
    label?: string;
    description?: string;
    specs: { label: string; value: string | number }[];
    name?: string;
    ariaLabel?: string;
    disabled?: boolean;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

function CSelect({
    value,
    className,
    label,
    description,
    specs,
    name,
    ariaLabel,
    disabled,
    onChange,
    ...props
}: ISelectProps) {
    return (
        <Field className={clsx('w-full', className)}>
            {label && <CLabel>{label}</CLabel>}
            {description && <CDescription>{description}</CDescription>}

            <div className='relative'>
                <Select
                    value={value}
                    name={name}
                    aria-label={ariaLabel}
                    className={clsx(s.control, s.select)}
                    disabled={disabled}
                    onChange={onChange}
                    {...props}
                >
                    {specs.map((spec) => (
                        <option
                            key={spec.value}
                            value={spec.value}
                        >
                            {spec.label}
                        </option>
                    ))}
                </Select>
                <ChevronDown
                    className='pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-(--text-secondary)'
                    aria-hidden='true'
                />
            </div>
        </Field>
    );
}

export default CSelect;
