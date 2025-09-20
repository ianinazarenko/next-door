import { Button } from '@headlessui/react';
import clsx from 'clsx';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

function CButton({ type = 'button', disabled, className, onClick, children }: IButtonProps) {
    const classes = clsx(
        'h-(--btn-height) rounded-(--radius-btn) bg-(--accent) px-(--p-btn) text-[1.4rem] font-semibold text-(--bg-primary) transition-colors',
        !disabled && 'hover:bg-(--accent-hover) active:bg-(--accent-hover)',
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
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

export default CButton;
