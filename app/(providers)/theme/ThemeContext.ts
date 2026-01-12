'use client';

import { ETheme } from '@/utils/constants/theme';
import { createContext } from 'react';

interface IThemeContext {
    theme: ETheme;
    systemTheme: ETheme;
    setTheme: (theme: ETheme) => void;
}

export const DEFAULT_THEME = ETheme.System;
export const MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const ThemeContext = createContext<IThemeContext>({
    theme: DEFAULT_THEME,
    systemTheme: DEFAULT_THEME,
    // eslint-disable-next-line
    setTheme: () => {},
});
