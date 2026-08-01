'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CaseStudyCard from './CaseStudyCard';
import { caseStudies } from '@/lib/content';

const categories = ['All', 'AI', 'Web', 'Mobile', 'Cloud'] as const;

/**
 * Client island: only the filter needs interactivity, so the surrounding
 * page stays a server component and keeps its exported metadata.
 */
const CaseStudiesGrid = () => {
    const [active, setActive] = useState<(typeof categories)[number]>('All');

    const filtered =
        active === 'All' ? caseStudies : caseStudies.filter((study) => study.category === active);

    return (
        <>
            <div role="tablist" aria-label="Filter case studies" className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => {
                    const selected = active === category;
                    return (
                        <button
                            key={category}
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setActive(category)}
                            className={`relative min-h-[42px] rounded-pill px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                                selected
                                    ? 'text-white'
                                    : 'border border-[rgb(var(--border))] text-muted hover:border-[var(--brand)] hover:text-brand'
                            }`}
                        >
                            {selected && (
                                <motion.span
                                    layoutId="case-filter-pill"
                                    className="absolute inset-0 rounded-pill bg-[linear-gradient(100deg,#2563eb,#0891b2)]"
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative z-[1]">{category}</span>
                        </button>
                    );
                })}
            </div>

            <motion.div layout className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                    {filtered.map((study, index) => (
                        <motion.div
                            key={study.slug}
                            layout
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{
                                duration: 0.4,
                                delay: Math.min(index * 0.05, 0.3),
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <CaseStudyCard {...study} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filtered.length === 0 && (
                <p className="py-20 text-center text-muted">No case studies in this category yet.</p>
            )}
        </>
    );
};

export default CaseStudiesGrid;
