'use client';

// Types
import { ReactElement } from 'react';
import { ETheme } from '@/lib/theme/types';
// Hooks
import { useTheme } from '@/lib/hooks/theme/useTheme';
// Components
import { Moon, Sun, SunMoon } from 'lucide-react';

const buttons = [
    { id: ETheme.Light, label: 'Light theme', icon: <Sun className="size-4" /> },
    { id: ETheme.System, label: 'System theme', icon: <SunMoon className="size-4" /> },
    { id: ETheme.Dark, label: 'Dark theme', icon: <Moon className="size-4" /> },
];

function ThemeToggle(): ReactElement {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className="flex items-center justify-end gap-4">
            <p>Theme is: {theme}</p>

            <div
                className="flex w-fit gap-2 text-(--text-secondary)"
                role="radiogroup"
                aria-label="Theme switch"
            >
                {buttons.map((b) => (
                    <button
                        className={` ${b.id === theme ? 'text-(--accent)' : ''} flex size-8 flex-initial items-center justify-center rounded-full bg-(--bg-secondary) transition-colors hover:text-(--accent-hover) md:size-9`}
                        key={b.id}
                        role="radio"
                        aria-checked={b.id === theme}
                        aria-label={b.label}
                        onClick={() => toggleTheme(b.id)}
                    >
                        {b.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ThemeToggle;
