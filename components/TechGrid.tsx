'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechIcon, { techBrandColor, techTitle, type TechKey } from './icons/TechIcon';

type Category = 'Frontend' | 'Backend' | 'AI' | 'Cloud' | 'Data' | 'Integrations';

const stack: { key: TechKey; category: Category }[] = [
    { key: 'react', category: 'Frontend' },
    { key: 'nextjs', category: 'Frontend' },
    { key: 'typescript', category: 'Frontend' },
    { key: 'tailwind', category: 'Frontend' },
    { key: 'vue', category: 'Frontend' },
    { key: 'flutter', category: 'Frontend' },
    { key: 'expo', category: 'Frontend' },

    { key: 'node', category: 'Backend' },
    { key: 'python', category: 'Backend' },
    { key: 'fastapi', category: 'Backend' },
    { key: 'go', category: 'Backend' },
    { key: 'graphql', category: 'Backend' },

    { key: 'anthropic', category: 'AI' },
    { key: 'gemini', category: 'AI' },
    { key: 'langchain', category: 'AI' },
    { key: 'huggingface', category: 'AI' },
    { key: 'pytorch', category: 'AI' },
    { key: 'tensorflow', category: 'AI' },

    { key: 'docker', category: 'Cloud' },
    { key: 'kubernetes', category: 'Cloud' },
    { key: 'gcp', category: 'Cloud' },
    { key: 'cloudflare', category: 'Cloud' },
    { key: 'vercel', category: 'Cloud' },

    { key: 'postgres', category: 'Data' },
    { key: 'mongodb', category: 'Data' },
    { key: 'redis', category: 'Data' },
    { key: 'mysql', category: 'Data' },
    { key: 'supabase', category: 'Data' },

    { key: 'whatsapp', category: 'Integrations' },
    { key: 'stripe', category: 'Integrations' },
    { key: 'github', category: 'Integrations' },
];

const categories: ('All' | Category)[] = ['All', 'AI', 'Frontend', 'Backend', 'Data', 'Cloud', 'Integrations'];

const TechGrid = () => {
    const [active, setActive] = useState<'All' | Category>('All');

    const filtered = active === 'All' ? stack : stack.filter((t) => t.category === active);

    return (
        <div>
            {/* Filter — a tablist rather than loose buttons, so screen readers
                announce the selected state and arrow keys behave. */}
            <div role="tablist" aria-label="Filter technologies" className="flex flex-wrap justify-center gap-2">
                {categories.map((category) => {
                    const selected = active === category;
                    return (
                        <button
                            key={category}
                            role="tab"
                            aria-selected={selected}
                            onClick={() => setActive(category)}
                            className={`relative min-h-[40px] rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                                selected
                                    ? 'text-white'
                                    : 'border border-[rgb(var(--border))] text-muted hover:border-[var(--brand)] hover:text-brand'
                            }`}
                        >
                            {selected && (
                                <motion.span
                                    layoutId="tech-filter-pill"
                                    className="absolute inset-0 rounded-pill bg-[linear-gradient(100deg,#2563eb,#0891b2)]"
                                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                />
                            )}
                            <span className="relative z-[1]">{category}</span>
                        </button>
                    );
                })}
            </div>

            <motion.ul
                layout
                className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6"
            >
                <AnimatePresence mode="popLayout">
                    {filtered.map((tech) => (
                        <motion.li
                            key={tech.key}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="group"
                        >
                            {/* Marks render monochrome and take their brand colour on
                                hover — 30 full-colour logos at once is visual noise. */}
                            <div
                                className="glass card-interactive flex h-full flex-col items-center justify-center gap-2.5 rounded-xl p-4 text-subtle sm:p-5"
                                style={{ ['--brand-hex' as string]: techBrandColor(tech.key) }}
                            >
                                <span className="transition-colors duration-300 group-hover:text-[var(--brand-hex)]">
                                    <TechIcon name={tech.key} size={26} />
                                </span>
                                <span className="text-center text-xs font-medium leading-tight text-muted">
                                    {techTitle(tech.key)}
                                </span>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>
        </div>
    );
};

export default TechGrid;
