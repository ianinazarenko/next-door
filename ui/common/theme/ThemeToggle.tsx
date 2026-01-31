'use client';

// Types
import { ReactElement } from 'react';
import { ETheme } from '@/utils/constants/theme';
// Utils
import clsx from 'clsx';
// Hooks
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
// Components
import { SunMoon } from 'lucide-react';
import ThemeSwitch from '@/ui/common/theme/ThemeSwitch';

function ThemeToggle(): ReactElement {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    const basicClasses =
        'flex size-9 flex-initial items-center justify-center rounded-full transition-colors hover:text-(--accent-hover) md:size-9';

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <span
                className='h-9 w-32'
                aria-hidden
            />
        );
    }

    return (
        <div className='fade-in flex items-center justify-end gap-4'>
            <ThemeSwitch
                theme={theme}
                toggleTheme={setTheme}
            />

            <div className='flex w-fit gap-2'>
                <button
                    className={clsx(
                        basicClasses,
                        theme === ETheme.System && 'bg-(--accent-50) text-(--accent)',
                        theme !== ETheme.System && 'bg-(--bg-secondary) text-(--text-secondary)'
                    )}
                    aria-label='Switch to system theme'
                    onClick={() => setTheme(ETheme.System)}
                >
                    <SunMoon className='size-4' />
                </button>
            </div>
        </div>
    );
}

export default ThemeToggle;
