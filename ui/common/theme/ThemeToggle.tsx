'use client';

import type { ReactElement } from 'react';

import clsx from 'clsx';
import { SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import ThemeSwitch from '@/ui/common/theme/ThemeSwitch';
import { ETheme } from '@/utils/constants/theme';

function ThemeToggle(): ReactElement {
    const { theme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    const basicClasses =
        'flex size-12 flex-initial items-center justify-center rounded-full transition-[background-color,color,transform] duration-150 ease-out hover:bg-(--accent-50) hover:text-(--accent-hover) motion-safe:active:scale-[.98] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)';

    useEffect(() => {
        // next-themes needs a mounted guard to avoid hydration mismatches.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return (
            <span
                className='h-12 w-[15.2rem]'
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
                    type='button'
                    className={clsx(
                        basicClasses,
                        theme === ETheme.System && 'bg-(--accent-50) text-(--accent)',
                        theme !== ETheme.System && 'bg-(--bg-secondary) text-(--text-secondary)'
                    )}
                    aria-label='Switch to system theme'
                    aria-pressed={theme === ETheme.System}
                    onClick={() => setTheme(ETheme.System)}
                >
                    <SunMoon className='size-5' aria-hidden='true' />
                </button>
            </div>
        </div>
    );
}

export default ThemeToggle;
