import clsx from 'clsx';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import CSwitch from '@/ui/atoms/CSwitch';
import { ETheme } from '@/utils/constants/theme';
import { ESize } from '@/utils/constants/ui';

export default function ThemeSwitch({
    theme,
    toggleTheme,
}: {
    theme: ETheme | string | undefined;
    toggleTheme: (theme: ETheme) => void;
}) {
    const { systemTheme, resolvedTheme } = useTheme();
    return (
        <CSwitch
            bg={theme === ETheme.System ? 'bg-secondary' : 'accent-50'}
            size={ESize.Lg}
            checked={
                theme === ETheme.Dark || (theme === ETheme.System && systemTheme === ETheme.Dark)
            }
            ariaLabel={`Switch theme to ${resolvedTheme === ETheme.Dark ? ETheme.Light : ETheme.Dark}`}
            onChange={(checked) => toggleTheme(checked ? ETheme.Dark : ETheme.Light)}
        >
            <span className='none flex h-full items-center justify-center text-(--text-secondary)'>
                <Sun
                    className={clsx('size-5', { hidden: theme !== ETheme.Light })}
                />
                <Moon
                    className={clsx('size-5', { hidden: theme !== ETheme.Dark })}
                />
            </span>
        </CSwitch>
    );
}
