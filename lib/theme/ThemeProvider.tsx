'use client';

import { ETheme } from './types';
import { useEffect, useState } from 'react';
import { DEFAULT_THEME, MEDIA_QUERY, ThemeContext } from './ThemeContext';

function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState(DEFAULT_THEME);

    useEffect(() => {
        const stored = (localStorage.getItem('theme') as ETheme) ?? ETheme.System;
        const system = window.matchMedia(MEDIA_QUERY).matches ? ETheme.Dark : ETheme.Light;
        const applied = stored === ETheme.System ? system : stored;

        setTheme(applied);

        document.documentElement.setAttribute('theme', stored === ETheme.System ? '' : applied);
    }, []);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeProvider;
