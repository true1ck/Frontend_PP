'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        
        // Only run on client side
        if (typeof window === 'undefined') return;
        
        // Get theme from localStorage or system preference
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        const initialTheme = savedTheme || systemTheme;
        
        setTheme(initialTheme);
        document.documentElement.classList.toggle('light', initialTheme === 'light');
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'light' : 'dark';
                setTheme(newTheme);
                document.documentElement.classList.toggle('light', newTheme === 'light');
            }
        };
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => {
            const newTheme = prev === 'dark' ? 'light' : 'dark';
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', newTheme);
                document.documentElement.classList.toggle('light', newTheme === 'light');
            }
            return newTheme;
        });
    }, []);

    // Always provide context, even when not mounted (prevents errors)
    // Components can check mounted state if needed
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
