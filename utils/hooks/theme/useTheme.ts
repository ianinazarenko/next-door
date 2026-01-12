'use client';
import { ETheme } from '@/utils/constants/theme';
import { useContext } from 'react';
import { ThemeContext } from '@/app/(providers)/theme/ThemeContext';

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
    const { theme, setTheme, systemTheme } = ctx;

    function toggleTheme(theme: ETheme) {
        setTheme(theme);
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    return {
        theme,
        toggleTheme,
        systemTheme,
    };
}
