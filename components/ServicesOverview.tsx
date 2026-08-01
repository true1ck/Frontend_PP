'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessagesSquare, BrainCircuit, Rocket, Compass, ArrowRight } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import TechIcon from './icons/TechIcon';
import { services } from '@/lib/content';

const icons = {
    chat: MessagesSquare,
    brain: BrainCircuit,
    rocket: Rocket,
    compass: Compass,
} as const;

// Accent per service so the four cards are distinguishable at a glance
// without relying on colour alone — each also carries its own icon.
const accents = {
    emerald: { ring: 'group-hover:border-emerald-400/50', chip: 'from-emerald-400/18 to-teal-400/10 text-emerald-400' },
    purple: { ring: 'group-hover:border-purple-400/50', chip: 'from-purple-400/18 to-fuchsia-400/10 text-purple-400' },
    blue: { ring: 'group-hover:border-blue-400/50', chip: 'from-blue-400/18 to-cyan-400/10 text-blue-400' },
    amber: { ring: 'group-hover:border-amber-400/50', chip: 'from-amber-400/18 to-orange-400/10 text-amber-500' },
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

const ServicesOverview = () => (
    <Section id="services">
        <SectionHeading
            eyebrow="What we build"
            title="Four ways to start"
            description="Every engagement is fixed-price and fixed-scope. Pick the one that matches where you are — or take the audit first and decide afterwards."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {services.map((service, index) => {
                const Icon = icons[service.icon];
                const accent = accents[service.accent];

                return (
                    <motion.article
                        key={service.slug}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: index * 0.08, duration: 0.55, ease }}
                        className={`group glass card-interactive flex flex-col rounded-card p-6 sm:p-8 ${accent.ring}`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <span
                                className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-gradient-to-br ${accent.chip}`}
                            >
                                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                            </span>

                            <div className="text-right">
                                <div className="font-mono text-lg font-medium text-body tabular">
                                    from {service.priceFrom}
                                </div>
                                <div className="mt-0.5 text-xs text-subtle">{service.timeline}</div>
                            </div>
                        </div>

                        <h3 className="mt-5 text-subtitle font-semibold font-display text-body">
                            {service.title}
                        </h3>
                        <p className="mt-1 text-sm font-medium text-brand">{service.summary}</p>

                        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                            {service.description}
                        </p>

                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[rgb(var(--border))] pt-5">
                            <ul className="flex items-center gap-3 text-subtle" aria-label="Technologies used">
                                {service.stack.map((tech) => (
                                    <li key={tech} className="transition-colors duration-200 group-hover:text-muted">
                                        <TechIcon name={tech} size={18} />
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/services#${service.slug}`}
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-body transition-colors hover:text-brand"
                            >
                                Details
                                <ArrowRight
                                    className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </motion.article>
                );
            })}
        </div>
    </Section>
);

export default ServicesOverview;
