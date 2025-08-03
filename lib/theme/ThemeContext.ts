'use client';

import { ETheme } from '@/lib/theme/types';
import { createContext } from 'react';

interface IThemeContext {
    theme: ETheme;
    setTheme: (theme: ETheme) => void;
}

export const DEFAULT_THEME = ETheme.System;
export const MEDIA_QUERY = '(prefers-color-scheme: dark)';

export const ThemeContext = createContext<IThemeContext>({
    theme: DEFAULT_THEME,
    // eslint-disable-next-line
    setTheme: () => {},
});
