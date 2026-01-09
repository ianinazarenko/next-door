import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

import { EButtonTheme } from '@/constants/ui';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
    equal?: boolean;
    round?: boolean;
    theme?: EButtonTheme;
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
    round,
    theme = EButtonTheme.Primary,
    isLoading,
    ariaLabel,
    onClick,
    children,
}: IButtonProps) {
    const themeBaseClasses: Record<EButtonTheme, string> = {
        [EButtonTheme.Primary]: 'bg-(--accent) text-(--bg-primary) border border-(--accent)',
        [EButtonTheme.Secondary]: 'bg-transparent text-(--text-primary) border border-(--text-secondary)',
        [EButtonTheme.Tertiary]: 'bg-(--bg-secondary) text-(--text-primary) border border-transparent',
    };

    const themeInteractiveClasses: Record<EButtonTheme, string> = {
        [EButtonTheme.Primary]: 'hover:bg-(--accent-hover) active:bg-(--accent-hover)',
        [EButtonTheme.Secondary]: 'bg-transparent hover:text-(--accent) border hover:border-(--accent)',
        [EButtonTheme.Tertiary]: 'hover:text-(--accent) active:text-(--accent)',
    };

    const loaderColor: Record<EButtonTheme, string> = {
        [EButtonTheme.Primary]: 'var(--bg-primary)',
        [EButtonTheme.Secondary]: 'var(--text-primary)',
        [EButtonTheme.Tertiary]: 'var(--text-primary)',
    };

    const baseClasses =
        'h-(--btn-height) rounded-(--radius-btn) px-(--p-btn) text-[1.4rem] font-semibold transition transition-colors duration-300 ease-linear';
    const equalClasses = 'px-0 w-(--btn-height) justify-center items-center flex';
    const roundClasses = 'rounded-[6rem]';
    const disabledClasses = 'cursor-not-allowed opacity-50';

    const classes = clsx(
        baseClasses,
        themeBaseClasses[theme],
        !disabled && themeInteractiveClasses[theme],
        equal && equalClasses,
        round && roundClasses,
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
