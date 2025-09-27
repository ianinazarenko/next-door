import { ChangeEvent } from 'react';
import { Field, Select } from '@headlessui/react';
import CLabel from '@/app/components/ui/CLabel';
import CDescription from '@/app/components/ui/CDescription';
import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

interface ISelectProps {
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
                    name={name}
                    aria-label={ariaLabel}
                    className={
                        'mt-1 block w-full appearance-none rounded-(--radius-input) border-none bg-(--bg-secondary) px-(--p-input-x) py-(--p-input-y) text-(--input-text) text-(--text-primary) focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-(--border)'
                    }
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
                    className='pointer-events-none absolute top-4 right-4 size-3 text-(--text-secondary)'
                    aria-hidden='true'
                />
            </div>
        </Field>
    );
}

export default CSelect;
