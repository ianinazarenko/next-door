'use client';

// Types
import { ReactElement } from 'react';
import { ETheme } from '@/lib/theme/types';
// Styles
// import clsx from 'clsx';
// import s from './ThemeToggle.module.css';
// Hooks
import { useTheme } from '@/lib/hooks/theme/useTheme';
// Components
import { Moon, Sun, SunMoon } from 'lucide-react';

const buttons = [
    { id: ETheme.Light, label: 'Light', icon: <Sun /> },
    { id: ETheme.System, label: 'System', icon: <SunMoon /> },
    { id: ETheme.Dark, label: 'Dark', icon: <Moon /> },
];

function ThemeToggleTemp(): ReactElement {
    const { theme, toggleTheme } = useTheme();

    function getBtnClass(id: ETheme): string {
        // return clsx(`iconButton`, id === theme && s._active);
        return '';
    }

    return (
        <div>
            <div>
                {buttons.map((b) => (
                    <button
                        className={getBtnClass(b.id)}
                        key={b.id}
                        onClick={() => toggleTheme(b.id)}
                    >
                        {b.icon}
                    </button>
                ))}
            </div>

            <p>Theme is: {theme}</p>
        </div>
    );
}

export default ThemeToggleTemp;
