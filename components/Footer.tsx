'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="glass border-t border-gray-800/50">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2 flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center justify-center h-12 w-12 md:h-[3.2rem] md:w-[3.2rem] rounded-full bg-white overflow-hidden p-[1.5px]">
                  <img src="/images/logo.png" alt="PandaPaths Logo" className="h-full w-full object-cover" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </div>
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold font-display select-none">
                {!mounted || theme === 'light' ? (
                  // Light mode: Panda in dark, Path in cyan
                  <>
                    <span style={{ color: '#232b36' }}>Panda</span>
                    <span style={{ color: '#19c3d6' }}>Path</span>
                  </>
                ) : (
                  // Dark mode: white text
                  <span className="text-white">PandaPath</span>
                )}
              </span>
            </div>
            <p className="footer-text font-bold text-sm sm:text-base mb-4 text-center">
              AI-first builds for Indian startups — shipped in weeks, not months.
            </p>
            <p className="footer-text text-xs text-center mb-4" style={{ opacity: 0.7 }}>
              Trusted by founders across Bangalore, Mumbai &amp; Delhi
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/pandapaths/" target="_blank" rel="noopener noreferrer" className="footer-text hover:text-blue-400 transition-colors p-2 -m-2 touch-manipulation" aria-label="LinkedIn">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="footer-text hover:opacity-80 transition-colors text-sm sm:text-base touch-manipulation inline-block py-1">About Us</Link></li>
              <li><Link href="/services" className="footer-text hover:opacity-80 transition-colors text-sm sm:text-base touch-manipulation inline-block py-1">Services</Link></li>
              <li><Link href="/case-studies" className="footer-text hover:opacity-80 transition-colors text-sm sm:text-base touch-manipulation inline-block py-1">Case Studies</Link></li>
              <li><Link href="/careers" className="footer-text hover:opacity-80 transition-colors text-sm sm:text-base touch-manipulation inline-block py-1">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="footer-heading font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Contact</h4>
            <ul className="space-y-2 footer-text text-sm sm:text-base">
              <li>📧 contactpanda@pandapath.in</li>
              <li>📍 Bangalore, Karnataka, India</li>
              <li>🕐 Mon–Fri, 9AM–7PM IST</li>
              <li>
                <a href="https://wa.me/917411147986" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors">
                  💬 WhatsApp Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800/50 mt-6 sm:mt-8 md:mt-10 pt-6 sm:pt-8 md:pt-10 text-center footer-text text-xs sm:text-sm">
          <p>&copy; 2026 PandaPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
