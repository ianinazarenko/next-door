'use client';

// Types
import { ReactElement } from 'react';
import { ETheme } from '@/lib/theme/types';
// Utils
import clsx from 'clsx';
// Hooks
import { useTheme } from '@/utils/hooks/theme/useTheme';
// Components
import { SunMoon } from 'lucide-react';
import ThemeSwitch from '@/app/components/theme/ThemeSwitch';

function ThemeToggle(): ReactElement {
    const { theme, toggleTheme } = useTheme();

    const basicClasses =
        'flex size-8 flex-initial items-center justify-center rounded-full transition-colors hover:text-(--accent-hover) md:size-9';
    return (
        <div className='ml-auto flex items-center justify-end gap-4'>
            <p>Theme is: {theme}</p>

            <ThemeSwitch
                theme={theme}
                toggleTheme={toggleTheme}
            />

            <div className='flex w-fit gap-2'>
                <button
                    className={clsx(
                        basicClasses,
                        theme === ETheme.System && 'bg-(--accent-50) text-(--accent)',
                        theme !== ETheme.System && 'bg-(--bg-secondary) text-(--text-secondary)'
                    )}
                    aria-label='Switch to system theme'
                    onClick={() => toggleTheme(ETheme.System)}
                >
                    <SunMoon className='size-4' />
                </button>
            </div>
        </div>
    );
}

export default ThemeToggle;
