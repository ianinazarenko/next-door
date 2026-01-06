import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

type ButtonTheme = 'primary' | 'secondary' | 'tertiary';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    equal?: boolean;
    theme?: ButtonTheme;
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
    theme = 'primary',
    isLoading,
    ariaLabel,
    onClick,
    children,
}: IButtonProps) {
    const themeBaseClasses: Record<ButtonTheme, string> = {
        primary: 'bg-(--accent) text-(--bg-primary) border border-(--accent)',
        secondary: 'bg-transparent text-(--accent) border border-(--accent)',
        tertiary: 'bg-transparent text-(--text-primary) border border-transparent',
    };

    const themeInteractiveClasses: Record<ButtonTheme, string> = {
        primary: 'hover:bg-(--accent-hover) active:bg-(--accent-hover)',
        secondary: 'hover:bg-(--accent-50) active:bg-(--accent-50)',
        tertiary: 'hover:bg-(--bg-secondary) active:bg-(--bg-secondary)',
    };

    const loaderColor: Record<ButtonTheme, string> = {
        primary: 'var(--bg-primary)',
        secondary: 'var(--accent)',
        tertiary: 'var(--text-primary)',
    };

    const baseClasses =
        'h-(--btn-height) rounded-(--radius-btn) px-(--p-btn) text-[1.4rem] font-semibold transition-colors';
    const equalClasses = 'px-0 w-(--btn-height) justify-center items-center flex';
    const disabledClasses = 'cursor-not-allowed opacity-50';

    const classes = clsx(
        baseClasses,
        themeBaseClasses[theme],
        !disabled && themeInteractiveClasses[theme],
        equal && equalClasses,
        disabled && disabledClasses,
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
                    color={loaderColor[theme]}
                    size={8}
                />
            )}
        </Button>
    );
}

export default CButton;
