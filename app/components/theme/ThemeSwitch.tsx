// Types
import { ETheme } from '@/lib/theme/types';
// Utils
import clsx from 'clsx';
// Hooks
import { useTheme } from '@/lib/hooks/theme/useTheme';
// Components
import { Moon, Sun } from 'lucide-react';
import CSwitch from '@/app/components/ui/CSwitch';

export default function ThemeSwitch({ theme, toggleTheme }: { theme: ETheme; toggleTheme: (theme: ETheme) => void }) {
    const { systemTheme } = useTheme();
    return (
        <CSwitch
            bg={theme === ETheme.System ? 'bg-secondary' : 'accent-50'}
            checked={theme === ETheme.Dark || (theme === ETheme.System && systemTheme === ETheme.Dark)}
            onChange={(checked) => toggleTheme(checked ? ETheme.Dark : ETheme.Light)}
        >
            <span className='none flex h-full items-center justify-center text-(--text-secondary)'>
                <Sun className={clsx('text(--secondary) size-3', { hidden: theme !== ETheme.Light })} />
                <Moon className={clsx('text(--secondary) size-3', { hidden: theme !== ETheme.Dark })} />
            </span>
        </CSwitch>
    );
}
