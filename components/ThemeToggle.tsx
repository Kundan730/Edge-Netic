'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-cyan-500/30 hover:bg-cyan-500/10 transition-all duration-300"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
            ) : (
                <Moon className="w-5 h-5 text-indigo-400 transition-transform duration-300 rotate-0 hover:-rotate-12" />
            )}
        </Button>
    );
}
