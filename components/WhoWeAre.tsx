'use client';

import { motion } from 'framer-motion';
import { Zap, MessagesSquare, Receipt, ShieldCheck } from 'lucide-react';
import Section from './Section';
import SectionHeading from './SectionHeading';

const differentiators = [
    {
        icon: Zap,
        title: 'Weeks, not quarters',
        body: 'Scoped in one call, first working build inside two weeks. You see progress every few days, not at a monthly review.',
    },
    {
        icon: MessagesSquare,
        title: 'Talk to the developer',
        body: 'No account managers, no relay. The person writing your code is the person on WhatsApp answering your questions.',
    },
    {
        icon: Receipt,
        title: 'Fixed price, quoted upfront',
        body: 'You get a number before we start and it does not move. No hourly billing, no scope-creep invoices at the end.',
    },
    {
        icon: ShieldCheck,
        title: 'Yours to keep',
        body: 'Full source code, your cloud accounts, your data. Nothing is locked to us — including the right to walk away.',
    },
];

const ease = [0.22, 1, 0.36, 1] as const;

const WhoWeAre = () => (
    <Section id="who-we-are" aura>
        <SectionHeading
            eyebrow="Who we are"
            title="A small studio that ships"
            description="PandaPath is an AI product studio in Bangalore. We exist because Indian founders kept paying big-agency prices for junior work delivered six months late."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {differentiators.map((item, index) => {
                const Icon = item.icon;
                return (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ delay: index * 0.08, duration: 0.55, ease }}
                        className="glass card-interactive rounded-card p-6 sm:p-7"
                    >
                        <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[linear-gradient(135deg,rgb(34_211_238/0.16),rgb(59_130_246/0.12))] text-brand">
                            <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                        </span>
                        <h3 className="text-subtitle font-semibold font-display text-body">{item.title}</h3>
                        <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
                    </motion.div>
                );
            })}
        </div>
    </Section>
);

export default WhoWeAre;
