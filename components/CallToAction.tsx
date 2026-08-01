'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Check } from 'lucide-react';
import Section from './Section';
import Button from './Button';
import { SITE } from '@/lib/content';

const reassurances = [
    'No commitment or retainer',
    'Fixed quote before any work starts',
    'Reply within one business day',
];

const CallToAction = () => (
    <Section size="md">
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] px-6 py-14 text-center backdrop-blur-xl sm:px-12 sm:py-16"
        >
            {/* Brand wash + grid, purely decorative */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_0%,rgb(34_211_238/0.16),transparent_70%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgb(var(--border))_1px,transparent_1px),linear-gradient(90deg,rgb(var(--border))_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_40%,#000,transparent)]"
            />

            <div className="relative">
                <h2 className="text-display font-bold font-display text-balance">
                    <span className="text-gradient">Tell us what you&apos;re trying to build</span>
                </h2>

                <p className="mx-auto mt-5 max-w-xl text-lead text-muted text-pretty">
                    Twenty minutes on a call is usually enough to tell you whether AI
                    solves your problem, roughly what it costs, and how long it takes.
                    If it isn&apos;t the right fit, we&apos;ll say so.
                </p>

                <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                    <Button
                        href="/contact"
                        variant="primary"
                        size="lg"
                        trailingIcon={<ArrowRight className="h-4 w-4" />}
                    >
                        Book a free 20-min call
                    </Button>
                    <Button
                        href={SITE.whatsapp}
                        variant="outline"
                        size="lg"
                        icon={<MessageCircle className="h-4 w-4" />}
                    >
                        Message on WhatsApp
                    </Button>
                </div>

                <ul className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5">
                    {reassurances.map((item) => (
                        <li key={item} className="flex items-center gap-1.5 text-xs text-subtle sm:text-sm">
                            <Check className="h-3.5 w-3.5 shrink-0 text-brand" aria-hidden="true" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    </Section>
);

export default CallToAction;
