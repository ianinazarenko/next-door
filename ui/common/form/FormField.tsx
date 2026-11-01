import type { TSchema } from '@/types/forms';
import type { Control } from 'react-hook-form';

import clsx from 'clsx';
import { CircleAlert } from 'lucide-react';
import { useState } from 'react';

import FormFieldCounter from '@/ui/common/form/FormFieldCounter';

import s from './FormField.module.css';

export default function FormField({
    name,
    error,
    errorId,
    control,
    maxLength,
    className,
    children,
}: {
    name: keyof TSchema;
    error: string;
    errorId: string;
    control: Control<TSchema>;
    maxLength?: number;
    className?: string;
    children: React.ReactNode;
}) {
    const [displayedError, setDisplayedError] = useState(error);

    // Keep the last message visible until its fade-out finishes.
    if (error && error !== displayedError) {
        setDisplayedError(error);
    }

    return (
        <div className={clsx(s.field, className)} data-error={Boolean(error)}>
            {children}

            <div className={s.footer}>
                <div className={s.feedback} aria-hidden={!error}>
                    <div className={s.error}>
                        <span id={errorId} className={s.errorMessage}>
                            <CircleAlert size={16} aria-hidden='true' />
                            {displayedError}
                        </span>
                    </div>
                </div>

                {maxLength && (
                    <FormFieldCounter name={name} control={control} maxLength={maxLength} />
                )}
            </div>
        </div>
    );
}
