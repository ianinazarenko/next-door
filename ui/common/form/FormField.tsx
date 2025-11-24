import clsx from 'clsx';
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
            {error && <span className={clsx('card-meta', s.error)}>{error}</span>}
        </div>
    );
}
