'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from './Button';
import Section from './Section';
import { useTheme } from '@/contexts/ThemeContext';

// Lazy load heavy 3D components to improve initial page load
const TechSphere = dynamic(() => import('./TechSphere'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent" />
  )
});

const FluidCursor = dynamic(() => import('./FluidCursor'), { 
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent" />
  )
});

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 sm:px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent" />

      {/* Dynamic Background - Keep both components mounted, just hide/show to prevent remounting */}
      {mounted && (
        <div className="absolute inset-0 w-full h-full">
          <div className={theme === 'light' ? 'block' : 'hidden'}>
            <FluidCursor />
          </div>
          <div className={theme === 'dark' ? 'block' : 'hidden'}>
            <TechSphere />
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto w-full pointer-events-none">
        <motion.div
          className="pointer-events-none"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent pointer-events-none px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Engineering Digital Paths to the Future
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto pointer-events-none px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            PandaPaths is a full-stack IT solutions company delivering scalable software,
            AI systems, and cloud-ready digital products.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pointer-events-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button href="/contact" variant="primary">
              Book a Free Consultation
            </Button>
            <Button href="/services" variant="outline">
              View Our Services
            </Button>
          </motion.div>

          {/* Floating Tech Labels */}
          <motion.div
            className="mt-12 sm:mt-16 flex flex-wrap gap-3 sm:gap-4 justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {['AI', 'Cloud', 'Mobile', 'Web'].map((tech, index) => (
              <motion.div
                key={tech}
                className="glass px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-mono text-cyan-400 pointer-events-auto"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(6, 182, 212, 0.5)' }}
              >
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </Section>
  );
};

export default Hero;
