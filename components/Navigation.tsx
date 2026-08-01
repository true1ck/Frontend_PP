'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Process & Tech', href: '/process-tech' },
    { name: 'Contact', href: '/contact' },
];

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Reading-progress bar. Springing it stops the jitter you get from
    // painting raw scroll values every frame.
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 30, mass: 0.3 });

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 24);
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close the drawer on navigation — otherwise it stays open over the new page.
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    // Escape closes the drawer (WCAG: every modal needs a keyboard exit).
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isMobileMenuOpen]);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <motion.header
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isScrolled
                    ? 'glass-strong border-b border-[rgb(var(--border))] backdrop-blur-xl'
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <nav aria-label="Primary" className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="PandaPath — home">
                        <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[rgb(var(--border-strong))] transition-transform duration-300 ease-out-expo group-hover:scale-105">
                            <img
                                src="/images/logo.png"
                                alt=""
                                className="h-full w-full object-cover"
                                width={44}
                                height={44}
                            />
                        </span>
                        <span className="text-lg sm:text-xl font-bold font-display tracking-tight select-none">
                            <span className="text-body">Panda</span>
                            <span className="text-brand">Path</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        active ? 'text-brand' : 'text-muted hover:text-body'
                                    }`}
                                >
                                    {item.name}
                                    {/* Shared-element underline that slides between items */}
                                    {active && (
                                        <motion.span
                                            layoutId="nav-active"
                                            className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-[linear-gradient(90deg,var(--accent),var(--brand))]"
                                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <ThemeToggle />
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,#2563eb,#0891b2_55%,#7c3aed)] bg-[length:200%_100%] bg-left px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgb(37_99_235/0.7)] transition-[background-position,box-shadow] duration-300 ease-out-expo hover:bg-right hover:shadow-[0_12px_32px_-10px_rgb(37_99_235/0.8)] active:scale-[0.97]"
                        >
                            Book a call
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Mobile controls */}
                    <div className="flex lg:hidden items-center gap-1">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="flex h-11 w-11 items-center justify-center rounded-lg text-body transition-colors hover:bg-[rgb(var(--surface))] touch-manipulation"
                            aria-label="Open menu"
                            aria-expanded={isMobileMenuOpen}
                            aria-controls="mobile-menu"
                        >
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </nav>

            {/* Reading progress — only meaningful once the user has scrolled */}
            <motion.div
                style={{ scaleX: progress }}
                className={`h-[2px] origin-left bg-[linear-gradient(90deg,var(--accent),var(--brand),var(--accent-2))] transition-opacity duration-300 ${
                    isScrolled ? 'opacity-100' : 'opacity-0'
                }`}
                aria-hidden="true"
            />

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            key="backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        />

                        <motion.div
                            key="drawer"
                            id="mobile-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Site menu"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
                            className="fixed top-0 right-0 z-[60] h-full w-[86vw] max-w-sm overflow-y-auto border-l border-[rgb(var(--border))] bg-[var(--surface-solid)] shadow-2xl lg:hidden"
                        >
                            <div className="flex items-center justify-between border-b border-[rgb(var(--border))] px-5 h-16">
                                <span className="font-display font-bold text-lg">
                                    <span className="text-body">Panda</span>
                                    <span className="text-brand">Path</span>
                                </span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex h-11 w-11 items-center justify-center rounded-lg text-body transition-colors hover:bg-[rgb(var(--surface))] touch-manipulation"
                                    aria-label="Close menu"
                                >
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>

                            <div className="p-5">
                                <ul className="space-y-1">
                                    {navItems.map((item, i) => {
                                        const active = isActive(item.href);
                                        return (
                                            <motion.li
                                                key={item.name}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    aria-current={active ? 'page' : undefined}
                                                    className={`flex min-h-[48px] items-center justify-between rounded-xl px-4 text-base font-medium transition-colors ${
                                                        active
                                                            ? 'bg-[rgb(var(--surface))] text-brand'
                                                            : 'text-muted hover:bg-[rgb(var(--surface))] hover:text-body'
                                                    }`}
                                                >
                                                    {item.name}
                                                    {active && <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />}
                                                </Link>
                                            </motion.li>
                                        );
                                    })}
                                </ul>

                                <Link
                                    href="/contact"
                                    className="mt-6 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#2563eb,#0891b2_55%,#7c3aed)] px-6 font-semibold text-white shadow-[0_8px_24px_-10px_rgb(37_99_235/0.7)] active:scale-[0.98] transition-transform"
                                >
                                    Book a free 20-min call
                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                </Link>

                                <p className="mt-6 text-sm text-subtle">
                                    Prefer WhatsApp?{' '}
                                    <a
                                        href="https://wa.me/917411147986"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-medium text-brand underline underline-offset-4"
                                    >
                                        Message us directly
                                    </a>
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navigation;
