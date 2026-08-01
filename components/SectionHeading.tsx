'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionHeadingProps {
    /** Small label above the title — orients the reader before they read it. */
    eyebrow?: string;
    title: ReactNode;
    description?: ReactNode;
    align?: 'center' | 'left';
    /** Heading level — keeps the document outline sequential (h1 → h2 → h3). */
    as?: 'h1' | 'h2' | 'h3';
    className?: string;
}

const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = 'center',
    as: Tag = 'h2',
    className = '',
}: SectionHeadingProps) => {
    const centered = align === 'center';

    return (
        <div className={`${centered ? 'text-center mx-auto' : 'text-left'} max-w-3xl ${centered ? '' : 'mr-auto'} ${className}`}>
            {eyebrow && (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-flex items-center gap-2 mb-4 rounded-pill border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3.5 py-1.5 text-[0.7rem] font-mono uppercase tracking-[0.18em] text-brand ${centered ? '' : ''}`}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-shimmer" />
                    {eyebrow}
                </motion.div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
                <Tag className="text-display font-bold font-display text-gradient pb-1">
                    {title}
                </Tag>
            </motion.div>

            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className={`mt-4 text-lead text-muted text-pretty ${centered ? 'mx-auto' : ''}`}
                >
                    {description}
                </motion.p>
            )}
        </div>
    );
};

export default SectionHeading;
