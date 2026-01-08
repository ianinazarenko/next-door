import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { ESize } from '@/constants/ui';

type TSwitchSize = Extract<ESize, ESize.Md | ESize.Lg>;
interface ICSwitchProps {
    color?: 'accent' | 'success' | 'bg-secondary';
    bg: 'accent-50' | 'bg-secondary';
    ariaLabel?: string;
    children?: React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
    size?: TSwitchSize;
}

export default function CSwitch({
    children,
    color = 'bg-secondary',
    bg = 'bg-secondary',
    ariaLabel = 'Switch',
    checked,
    onChange,
    size = ESize.Md,
}: ICSwitchProps) {
    const sizeClasses: Record<TSwitchSize, string> = {
        [ESize.Md]: 'h-7 w-14', // 2.8rem × 5.6rem
        [ESize.Lg]: 'h-9 w-18', // 3.6rem × 7.2rem
    };

    const circleClasses: Record<TSwitchSize, string> = {
        [ESize.Md]: 'size-5', // 2rem (2.8rem - 0.8rem padding)
        [ESize.Lg]: 'size-7', // 2.8rem (3.6rem - 0.8rem padding)
    };

    const translateClasses: Record<TSwitchSize, string> = {
        [ESize.Md]: 'translate-x-0 group-data-checked:translate-x-7', // 5.6rem - 0.8rem - 2rem = 2.8rem
        [ESize.Lg]: 'translate-x-0 group-data-checked:translate-x-9', // 7.2rem - 0.8rem - 2.8rem = 3.6rem
    };

    const baseClasses =
        'group relative flex cursor-pointer rounded-full ' +
        'p-1 transition-colors ease-in-out focus:not-data-focus:outline-none data-focus:outline';
    const checkedClasses = `bg-(--${bg}) data-checked:bg-(--${color})`;

    return (
        <Switch
            checked={Boolean(checked)}
            onChange={onChange}
            className={clsx(baseClasses, sizeClasses[size], checkedClasses)}
            aria-label={ariaLabel}
        >
            <span
                aria-hidden='true'
                className={clsx(
                    'pointer-events-none inline-block rounded-full bg-(--bg-primary) shadow-lg ring-0 transition duration-200 ease-in-out',
                    circleClasses[size],
                    translateClasses[size]
                )}
            >
                {children}
            </span>
        </Switch>
    );
}
