'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Process & Tech', href: '/process-tech' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 md:py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-lg sm:text-xl md:text-2xl font-bold font-display bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 bg-clip-text text-transparent"
            >
              🐼 PandaPaths
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link relative font-semibold text-xs lg:text-sm xl:text-base px-2 lg:px-3 xl:px-4 py-2 rounded-lg bg-transparent hover:bg-transparent transition-all group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <ThemeToggle />
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 lg:px-4 xl:px-6 py-1.5 lg:py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-xs lg:text-sm xl:text-base font-semibold neon-glow hover:shadow-xl transition-shadow whitespace-nowrap"
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Tablet/Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-900 dark:text-white p-2 -mr-2 touch-manipulation min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          </div>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-4 sm:mt-6 pb-4 space-y-1"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-link block py-3 sm:py-4 px-4 -mx-4 font-semibold text-base sm:text-lg rounded-lg bg-transparent hover:bg-blue-500/10 transition-all touch-manipulation min-h-[44px] flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 flex items-center justify-between px-4 -mx-4">
              <span className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Theme</span>
            </div>
            <Link href="/contact" className="block pt-2" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white text-sm sm:text-base font-semibold neon-glow touch-manipulation min-h-[44px]">
                Get Started
              </button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
