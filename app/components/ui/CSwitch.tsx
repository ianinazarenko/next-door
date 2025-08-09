import { Switch } from '@headlessui/react';
import clsx from 'clsx';

interface ICSwitchProps {
    color?: 'accent' | 'success' | 'bg-secondary';
    bg: 'accent-50' | 'bg-secondary';
    children?: React.ReactNode;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function CSwitch({
    children,
    color = 'bg-secondary',
    bg = 'bg-secondary',
    checked,
    onChange,
}: ICSwitchProps) {
    const baseClasses =
        'group relative flex h-7 w-14 cursor-pointer rounded-full  ' +
        'p-1 transition-colors ease-in-out focus:not-data-focus:outline-none data-focus:outline';
    const checkedClasses = `bg-(--${bg}) data-checked:bg-(--${color})`;

    return (
        <Switch
            checked={Boolean(checked)}
            onChange={onChange}
            className={clsx(baseClasses, checkedClasses)}
        >
            <span
                aria-hidden='true'
                className='pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-(--bg-primary) shadow-lg ring-0 transition duration-200 ease-in-out group-data-checked:translate-x-7'
            >
                {children}
            </span>
        </Switch>
    );
}
