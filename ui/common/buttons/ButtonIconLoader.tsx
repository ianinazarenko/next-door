import type { ReactNode } from 'react';

import clsx from 'clsx';
import { PuffLoader } from 'react-spinners';

import s from './ButtonIconLoader.module.css';

export default function ButtonIconLoader({
    loading,
    size,
    className,
    children,
}: {
    loading: boolean;
    size: number;
    className?: string;
    children: ReactNode;
}) {
    return (
        <span className={clsx(s.iconArea, className)}>
            {loading ? (
                <PuffLoader
                    size={size}
                    className={s.loader}
                    color='currentColor'
                />
            ) : (
                children
            )}
        </span>
    );
}
