import { Button } from '@headlessui/react';
import clsx from 'clsx';
import { PulseLoader } from 'react-spinners';

import { EButtonTheme } from '@/utils/constants/ui';

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

const themeBaseClasses: Record<EButtonTheme, string> = {
    [EButtonTheme.Primary]: 'bg-(--accent) text-(--bg-primary) border border-(--accent)',
    [EButtonTheme.Secondary]:
        'bg-transparent text-(--text-primary) border border-(--text-secondary)',
    [EButtonTheme.Tertiary]:
        'bg-(--bg-secondary) text-(--text-secondary) border border-transparent',
};

const themeInteractiveClasses: Record<EButtonTheme, string> = {
    [EButtonTheme.Primary]: 'hover:bg-(--accent-hover) active:bg-(--accent-hover)',
    [EButtonTheme.Secondary]: 'bg-transparent hover:text-(--accent) border hover:border-(--accent)',
    [EButtonTheme.Tertiary]:
        'hover:bg-(--accent-50) hover:text-(--accent) active:bg-(--accent-50) active:text-(--accent)',
};

const loaderColor: Record<EButtonTheme, string> = {
    [EButtonTheme.Primary]: 'var(--bg-primary)',
    [EButtonTheme.Secondary]: 'var(--text-primary)',
    [EButtonTheme.Tertiary]: 'var(--text-secondary)',
};

const baseClasses =
    'relative inline-flex h-(--btn-height) items-center justify-center gap-2 rounded-(--radius-btn) px-(--p-btn) text-[1.6rem] font-semibold transition-[color,background-color,border-color,transform] duration-150 ease-out motion-safe:active:scale-[.98] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)';
const equalClasses = 'px-0 w-(--btn-height) justify-center items-center flex';
const roundClasses = 'rounded-[6rem]';
const disabledClasses = 'cursor-not-allowed opacity-75';

// eslint-disable-next-line complexity
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
            disabled={disabled || isLoading}
            aria-label={ariaLabel ?? (isLoading ? 'Loading' : undefined)}
            aria-busy={isLoading}
            onClick={onClick}
        >
            <span
                className={clsx(
                    'inline-flex items-center justify-center gap-2',
                    isLoading && 'invisible'
                )}
            >
                {children}
            </span>
            {isLoading && (
                <span
                    className='absolute inset-0 flex items-center justify-center'
                    aria-hidden='true'
                >
                    <PulseLoader
                        color={loaderColor[theme]}
                        size={8}
                    />
                </span>
            )}
        </Button>
    );
}

export default CButton;
