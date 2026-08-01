'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reserve the exact final size before mount so the navbar doesn't reflow
    // when the toggle appears (CLS).
    if (!mounted) {
        return <div className="h-11 w-11" aria-hidden="true" />;
    }

    const nextTheme = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            onClick={toggleTheme}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-muted transition-colors duration-200 hover:border-[var(--brand)] hover:text-brand active:scale-95 touch-manipulation"
            aria-label={`Switch to ${nextTheme} theme`}
            title={`Switch to ${nextTheme} theme`}
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={theme}
                    initial={{ opacity: 0, rotate: -75, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 75, scale: 0.6 }}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5" aria-hidden="true" />
                    ) : (
                        <Moon className="h-5 w-5" aria-hidden="true" />
                    )}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
