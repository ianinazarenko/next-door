import { Field, Select } from '@headlessui/react';
import CLabel from '@/app/components/ui/CLabel';
import CDescription from '@/app/components/ui/CDescription';
import { ChevronDown } from 'lucide-react';

interface ISelectProps {
    label?: string;
    description?: string;
    specs: { label: string; value: string | number }[];
    name?: string;
    ariaLabel?: string;
}

function CSelect({ label, description, specs, name, ariaLabel }: ISelectProps) {
    return (
        <Field className='w-full'>
            {label && <CLabel>{label}</CLabel>}
            {description && <CDescription>{description}</CDescription>}

            <div className='relative'>
                <Select
                    name={name}
                    aria-label={ariaLabel}
                    className={
                        'mt-3 block w-full appearance-none rounded-(--radius-input) border-none bg-(--bg-secondary) px-(--p-input-x) py-(--p-input-y) text-(--input-text) text-(--text-primary) focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-(--border)'
                    }
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
                    className='pointer-events-none absolute top-2.5 right-2.5 size-3 text-(--text-secondary)'
                    aria-hidden='true'
                />
            </div>
        </Field>
    );
}

export default CSelect;
