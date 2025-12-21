'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';
import Navigation from './Navigation';
import Footer from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <Navigation />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </ThemeProvider>
    );
}
