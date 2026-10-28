import clsx from 'clsx';
import { CircleAlert } from 'lucide-react';

import s from './FormField.module.css';

export default function FormField({
    error,
    className,
    children,
}: {
    error: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={clsx(s.field, className)}>
            {children}
            {error && (
                <span className={s.error}>
                    <CircleAlert size={16} aria-hidden='true' />
                    {error}
                </span>
            )}
        </div>
    );
}
