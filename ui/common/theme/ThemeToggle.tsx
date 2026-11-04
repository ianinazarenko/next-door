'use client';

import type { ReactElement } from 'react';

import clsx from 'clsx';
import { Moon, Sun, SunMoon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { ETheme } from '@/utils/constants/theme';

import s from './ThemeToggle.module.css';

function ThemeToggle(): ReactElement {
    const { resolvedTheme, setTheme } = useTheme();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // next-themes needs a mounted guard to avoid hydration mismatches.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    const isDark = resolvedTheme === ETheme.Dark;

    return (
        <span className={s.control}>
            <span
                className={clsx(s.placeholder, isMounted && s.placeholderHidden)}
                aria-hidden='true'
            >
                <SunMoon className={s.placeholderIcon} />
            </span>

            {isMounted && (
                <button
                    type='button'
                    className={clsx(
                        s.button,
                        'flex size-12 shrink-0 items-center justify-center rounded-full bg-(--bg-secondary) text-(--text-secondary) transition-[background-color,color,transform] duration-[180ms] ease-out hover:bg-(--accent-50) hover:text-(--accent) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) motion-safe:active:scale-[.98] motion-reduce:transition-none motion-safe:min-[1280px]:active:scale-[.8]'
                    )}
                    aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
                    onClick={() => setTheme(isDark ? ETheme.Light : ETheme.Dark)}
                >
                    {isDark ? (
                        <Sun className='size-5' aria-hidden='true' />
                    ) : (
                        <Moon className='size-5' aria-hidden='true' />
                    )}
                </button>
            )}
        </span>
    );
}

export default ThemeToggle;
