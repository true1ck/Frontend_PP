'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Handshake } from 'lucide-react';
import Section from './Section';

const CoFounderTeaser = () => (
    <Section size="sm">
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[linear-gradient(135deg,rgb(124_58_237/0.1),rgb(37_99_235/0.06)_60%,transparent)] px-6 py-10 sm:px-10 sm:py-12"
        >
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[var(--accent-2)]">
                        <Handshake className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <div>
                        <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--accent-2)]">
                            Beyond project work
                        </p>
                        <h2 className="mt-2 text-subtitle font-bold font-display text-body">
                            Looking for a technical co-founder, not a vendor?
                        </h2>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                            We take on a small number of equity partnerships alongside our
                            project work — owning the technical side full-time so you can
                            run the rest of the business.
                        </p>
                    </div>
                </div>

                <Link
                    href="/co-founder"
                    className="group inline-flex min-h-[48px] shrink-0 items-center justify-center gap-1.5 self-start rounded-full border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] px-5 py-2.5 text-sm font-semibold text-body transition-colors hover:border-[var(--accent-2)] hover:text-[var(--accent-2)] sm:self-center"
                >
                    See how it works
                    <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                        aria-hidden="true"
                    />
                </Link>
            </div>
        </motion.div>
    </Section>
);

export default CoFounderTeaser;
