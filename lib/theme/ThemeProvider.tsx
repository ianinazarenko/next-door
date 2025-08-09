'use client';

import { ETheme } from './types';
import { useEffect, useState } from 'react';
import { DEFAULT_THEME, MEDIA_QUERY, ThemeContext } from './ThemeContext';

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(DEFAULT_THEME);
    const [systemTheme, setSystemTheme] = useState(DEFAULT_THEME);

    useEffect(() => {
        const mediaQuery = window.matchMedia(MEDIA_QUERY);

        const stored = (localStorage.getItem('theme') as ETheme) ?? ETheme.System;
        const system = mediaQuery.matches ? ETheme.Dark : ETheme.Light;
        const applied = stored === ETheme.System ? ETheme.System : stored;

        setTheme(applied);
        setSystemTheme(system);

        document.documentElement.setAttribute('data-theme', stored === ETheme.System ? '' : applied);
        mediaQuery.addEventListener('change', handleChange);

        function handleChange(e: MediaQueryListEvent) {
            const newSystemTheme = e.matches ? ETheme.Dark : ETheme.Light;
            setSystemTheme(newSystemTheme);
        }

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme, systemTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
