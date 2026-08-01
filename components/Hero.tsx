'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Button from './Button';
import { useTheme } from '@/contexts/ThemeContext';

// Lazy load heavy 3D components to improve initial page load
const TechSphere = dynamic(() => import('./TechSphereWrapper'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent" />
  )
});

const proofPoints = [
  { value: '2–4', label: 'weeks to launch' },
  { value: '₹25k', label: 'starting price' },
  { value: '1:1', label: 'with your developer' },
];

const capabilities = ['WhatsApp AI', 'RAG Systems', 'Full-Stack AI', 'Made for India'];

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [theme]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-24 pb-16 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent" />

      {/* Dark-mode hero background. The light-mode fluid simulation now lives in
          the root layout as a site-wide fixed layer (see FluidBackground), so
          only the Three.js sphere is scoped to the hero. */}
      {mounted && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className={`${theme === 'dark' ? 'block' : 'hidden'} w-full h-full transform translate-y-8 sm:translate-y-12`}>
            <Suspense fallback={<div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-purple-900/20 to-transparent" />}>
              <TechSphere />
            </Suspense>
          </div>
        </div>
      )}

      {/* Legibility scrim: text sat directly on the high-contrast WebGL
          layers. A soft radial wash in the page background colour restores
          AA contrast behind the copy without hiding the animation. */}
      <div aria-hidden="true" className="hero-scrim" />

      {/* Hero Content — pointer-events stay off so the fluid simulation
          underneath still receives mouse movement. */}
      <div className="pointer-events-none relative z-10 mx-auto w-full max-w-4xl text-center">
        {/* Availability signal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="pointer-events-auto mb-6 inline-flex items-center gap-2 rounded-pill border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-4 py-1.5 text-xs font-medium backdrop-blur-md sm:text-[0.8rem]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-muted">Taking on 2 new builds this month</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7, ease }}
          className="text-display-xl font-bold font-display text-balance"
        >
          <span className="text-gradient">AI products for Indian startups,</span>
          <br className="hidden sm:block" />{' '}
          <span className="text-body">shipped in weeks.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.7, ease }}
          className="mx-auto mt-5 max-w-2xl text-lead text-muted text-pretty sm:mt-6"
        >
          WhatsApp AI bots, RAG knowledge systems and full-stack AI builds — scoped
          at a fixed price, live in 2–4 weeks, built by the developer you actually talk to.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6, ease }}
          className="pointer-events-auto mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <Button href="/contact" variant="primary" size="lg" trailingIcon={<ArrowRight className="h-4 w-4" />}>
            Book a free 20-min call
          </Button>
          <Button href="/case-studies" variant="outline" size="lg">
            See what we&apos;ve built
          </Button>
        </motion.div>

        {/* Proof strip — answers "how fast, how much, who builds it" up front */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6, ease }}
          className="pointer-events-auto mx-auto mt-10 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--border))] backdrop-blur-md"
        >
          {proofPoints.map((point) => (
            <div key={point.label} className="bg-[var(--bg)]/70 px-3 py-4 text-center backdrop-blur-md">
              <dt className="sr-only">{point.label}</dt>
              <dd>
                <span className="block font-mono text-xl font-medium text-brand tabular sm:text-2xl">
                  {point.value}
                </span>
                <span className="mt-1 block text-[0.7rem] leading-tight text-subtle sm:text-xs">
                  {point.label}
                </span>
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5"
        >
          {capabilities.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + index * 0.06, duration: 0.4, ease }}
              className="rounded-pill border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3.5 py-1.5 font-mono text-[0.7rem] tracking-wide text-muted backdrop-blur-md transition-colors duration-200 hover:border-[var(--brand)] hover:text-brand sm:text-xs"
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          onClick={() => document.getElementById('who-we-are')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className="pointer-events-auto group mx-auto mt-10 flex h-11 w-11 items-center justify-center rounded-full text-subtle transition-colors hover:text-brand"
          aria-label="Scroll to next section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 5, 0] }}
          transition={{
            opacity: { delay: 0.8, duration: 0.5 },
            y: { repeat: Infinity, duration: 2.2, ease: 'easeInOut' },
          }}
        >
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;
