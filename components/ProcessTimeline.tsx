'use client';

import { Search, PenTool, Code2, Rocket, TrendingUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { processSteps } from '@/lib/content';

const icons = {
    search: Search,
    pen: PenTool,
    code: Code2,
    rocket: Rocket,
    trend: TrendingUp,
} as const;

/**
 * Vertical alternating timeline — the detailed view used on /process-tech.
 * Reads the same `processSteps` as the compact homepage version, so the two
 * can't drift apart.
 */
const ProcessTimeline = () => (
    <div className="relative">
        {/* Spine: left-aligned on mobile, centred from md up */}
        <div
            aria-hidden="true"
            className="absolute bottom-0 left-[27px] top-0 w-px bg-[linear-gradient(180deg,transparent,rgb(var(--border-strong))_6%,rgb(var(--border-strong))_94%,transparent)] md:left-1/2 md:-translate-x-1/2"
        />

        <ol className="space-y-10 md:space-y-16">
            {processSteps.map((step, index) => {
                const Icon = icons[step.icon];
                const flip = index % 2 === 1;

                return (
                    <ScrollReveal
                        key={step.number}
                        delay={index * 0.08}
                        variant={flip ? 'slideLeft' : 'slideRight'}
                    >
                        <li className="relative flex items-start gap-6 md:gap-0">
                            {/* Marker */}
                            <span className="relative z-[1] flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--border-strong))] bg-[var(--bg)] text-brand md:absolute md:left-1/2 md:-translate-x-1/2">
                                <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                            </span>

                            {/* Card — sits on one side of the spine on desktop */}
                            <div
                                className={`flex-1 md:flex ${flip ? 'md:justify-end' : ''}`}
                            >
                                <div
                                    className={`glass card-interactive w-full rounded-card p-6 md:w-[calc(50%-3rem)] sm:p-7 ${
                                        flip ? '' : 'md:text-right'
                                    }`}
                                >
                                    <div
                                        className={`flex items-center gap-2 ${flip ? '' : 'md:justify-end'}`}
                                    >
                                        <span className="font-mono text-xs text-brand tabular">
                                            Step {step.number}
                                        </span>
                                        <span className="h-3 w-px bg-[rgb(var(--border-strong))]" />
                                        <span className="font-mono text-xs text-subtle">{step.duration}</span>
                                    </div>

                                    <h3 className="mt-2.5 text-title font-bold font-display text-body">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ScrollReveal>
                );
            })}
        </ol>
    </div>
);

export default ProcessTimeline;
