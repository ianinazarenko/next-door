// Types
import { ETheme } from '@/utils/constants/theme';
import { ESize } from '@/utils/constants/ui';
// Utils
import clsx from 'clsx';
// Hooks
import { useTheme } from '@/utils/hooks/theme/useTheme';
// Components
import { Moon, Sun } from 'lucide-react';
import CSwitch from '@/ui/atoms/CSwitch';

export default function ThemeSwitch({ theme, toggleTheme }: { theme: ETheme; toggleTheme: (theme: ETheme) => void }) {
    const { systemTheme } = useTheme();
    return (
        <CSwitch
            bg={theme === ETheme.System ? 'bg-secondary' : 'accent-50'}
            size={ESize.Lg}
            checked={theme === ETheme.Dark || (theme === ETheme.System && systemTheme === ETheme.Dark)}
            ariaLabel={`Switch theme to ${theme === ETheme.Dark ? ETheme.Light : ETheme.Dark}`}
            onChange={(checked) => toggleTheme(checked ? ETheme.Dark : ETheme.Light)}
        >
            <span className='none flex h-full items-center justify-center text-(--text-secondary)'>
                <Sun className={clsx('text(--secondary) size-3', { hidden: theme !== ETheme.Light })} />
                <Moon className={clsx('text(--secondary) size-3', { hidden: theme !== ETheme.Dark })} />
            </span>
        </CSwitch>
    );
}
