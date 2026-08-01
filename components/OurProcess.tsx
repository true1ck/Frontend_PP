'use client';

import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket, TrendingUp } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import { processSteps } from '@/lib/content';

const icons = {
    search: Search,
    pen: PenTool,
    code: Code2,
    rocket: Rocket,
    trend: TrendingUp,
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

const OurProcess = () => (
    <Section id="process">
        <SectionHeading
            eyebrow="How we work"
            title="Five steps, no surprises"
            description="The same sequence on every project. You always know which step you're in and what comes next."
        />

        <div className="relative mt-16">
            {/* Connector rail. Drawn behind the markers and inset by half a
                marker so it starts and ends at the first and last node
                instead of running off the edges. */}
            <div
                aria-hidden="true"
                className="absolute left-[27px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,transparent,rgb(var(--border-strong))_8%,rgb(var(--border-strong))_92%,transparent)] lg:left-[10%] lg:right-[10%] lg:top-[27px] lg:bottom-auto lg:h-px lg:w-auto lg:bg-[linear-gradient(90deg,transparent,rgb(var(--border-strong))_8%,rgb(var(--border-strong))_92%,transparent)]"
            />

            <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-4">
                {processSteps.map((step, index) => {
                    const Icon = icons[step.icon];

                    return (
                        <motion.li
                            key={step.number}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ delay: index * 0.09, duration: 0.5, ease }}
                            className="group relative flex gap-5 lg:flex-col lg:gap-0 lg:text-center"
                        >
                            {/* Marker */}
                            <span className="relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--border-strong))] bg-[var(--bg)] text-muted transition-colors duration-300 group-hover:border-[var(--brand)] group-hover:text-brand lg:mx-auto">
                                <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                            </span>

                            <div className="pb-2 lg:pt-6">
                                <div className="flex items-center gap-2 lg:justify-center">
                                    <span className="font-mono text-xs text-brand tabular">{step.number}</span>
                                    <span className="h-3 w-px bg-[rgb(var(--border-strong))]" />
                                    <span className="font-mono text-xs text-subtle">{step.duration}</span>
                                </div>

                                <h3 className="mt-2 text-lg font-semibold font-display text-body">
                                    {step.title}
                                </h3>
                                <p className="mt-1.5 text-sm leading-relaxed text-muted lg:px-1">
                                    {step.description}
                                </p>
                            </div>
                        </motion.li>
                    );
                })}
            </ol>
        </div>
    </Section>
);

export default OurProcess;
