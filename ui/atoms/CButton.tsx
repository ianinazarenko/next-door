import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    equal?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
    isLoading?: boolean;
    ariaLabel?: string;
}

function CButton({
    type = 'button',
    disabled,
    className,
    equal,
    isLoading,
    ariaLabel,
    onClick,
    children,
}: IButtonProps) {
    const classes = clsx(
        'h-(--btn-height) rounded-(--radius-btn) bg-(--accent) ) px-(--p-btn) text-[1.4rem] font-semibold text-(--bg-primary) transition-colors',
        !disabled && 'hover:bg-(--accent-hover) active:bg-(--accent-hover)',
        equal && 'px-0 w-(--btn-height) justify-center items-center flex',
        {
            'cursor-not-allowed opacity-50': disabled,
        },
        className
    );

    return (
        <Button
            className={classes}
            type={type}
            disabled={disabled}
            aria-label={ariaLabel}
            onClick={onClick}
        >
            {!isLoading && children}
            {isLoading && (
                <PulseLoader
                    color={'var(--bg-primary)'}
                    size={8}
                />
            )}
        </Button>
    );
}

export default CButton;
