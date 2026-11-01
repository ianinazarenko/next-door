import type { TSchema } from '@/types/forms';
import type { Control } from 'react-hook-form';

import clsx from 'clsx';
import { useWatch } from 'react-hook-form';

import s from './FormFieldCounter.module.css';

interface IProps {
    name: keyof TSchema;
    control: Control<TSchema>;
    maxLength: number;
}

export default function FormFieldCounter({ name, control, maxLength }: IProps) {
    const watched = useWatch({ name, control });
    const count = Array.from(watched.trim()).length;
    const counter = `${count} / ${maxLength}`;

    return <span className={clsx(s.counter, { [s.error]: count > maxLength })}>{counter}</span>;
}
