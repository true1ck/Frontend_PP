import type { Metadata } from 'next';
import Link from 'next/link';
import { MessagesSquare, BrainCircuit, Rocket, Compass, Check, ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import JsonLd from '@/components/JsonLd';
import TechIcon from '@/components/icons/TechIcon';
import { WhatsAppIcon } from '@/components/icons/BrandIcons';
import { services, SITE } from '@/lib/content';
import { servicesSchema, breadcrumbSchema } from '@/lib/seo';

export const metadata: Metadata = {
    title: 'AI Development Services — WhatsApp Bots, RAG Systems & AI Products',
    description:
        'Fixed-price AI development services for Indian startups. WhatsApp AI bots from ₹25,000, RAG knowledge systems from ₹40,000, and full AI product builds from ₹80,000 — delivered in 2–6 weeks from Bangalore.',
    alternates: { canonical: '/services' },
    openGraph: {
        title: 'AI Development Services in India | PandaPath',
        description:
            'WhatsApp AI bots from ₹25,000, RAG systems from ₹40,000, full AI product builds from ₹80,000. Fixed price, 2–6 weeks.',
        url: `${SITE.url}/services`,
    },
};

const icons = {
    chat: MessagesSquare,
    brain: BrainCircuit,
    rocket: Rocket,
    compass: Compass,
} as const;

const accents = {
    emerald: 'from-emerald-400/16 to-teal-400/8 text-emerald-400',
    purple: 'from-purple-400/16 to-fuchsia-400/8 text-purple-400',
    blue: 'from-blue-400/16 to-cyan-400/8 text-blue-400',
    amber: 'from-amber-400/16 to-orange-400/8 text-amber-500',
} as const;

export default function ServicesPage() {
    return (
        <>
            <JsonLd data={servicesSchema} />
            <JsonLd data={breadcrumbSchema([{ name: 'Services', path: '/services' }])} />

            <Section size="hero" aura>
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal variant="fadeIn">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                            Services
                        </p>
                        <h1 className="text-display-xl font-bold font-display text-balance">
                            <span className="text-gradient">AI development,</span>{' '}
                            <span className="text-body">priced before we start</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted text-pretty">
                            Four fixed-scope engagements. Each one has a price and a delivery date
                            attached before any work begins — so you can decide with a number in
                            front of you rather than an estimate range.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            <Section size="sm">
                <div className="space-y-8">
                    {services.map((service, index) => {
                        const Icon = icons[service.icon];

                        return (
                            <ScrollReveal key={service.slug} delay={index * 0.06} variant="slideUp">
                                {/* scroll-mt clears the fixed navbar when linked from the footer */}
                                <article
                                    id={service.slug}
                                    className="glass card-interactive scroll-mt-28 rounded-card p-6 sm:p-8 lg:p-10"
                                >
                                    <div className="grid gap-8 lg:grid-cols-12">
                                        <div className="lg:col-span-7">
                                            <div className="flex items-start gap-4">
                                                <span
                                                    className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-gradient-to-br ${accents[service.accent]}`}
                                                >
                                                    <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                                                </span>
                                                <div>
                                                    <h2 className="text-title font-bold font-display text-body">
                                                        {service.title}
                                                    </h2>
                                                    <p className="mt-1 text-sm font-medium text-brand">
                                                        {service.summary}
                                                    </p>
                                                </div>
                                            </div>

                                            <p className="mt-5 max-w-prose text-[0.95rem] leading-relaxed text-muted">
                                                {service.description}
                                            </p>

                                            <div className="mt-6">
                                                <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">
                                                    What&apos;s included
                                                </h3>
                                                <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                                                    {service.features.map((feature) => (
                                                        <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
                                                            <Check
                                                                className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                                                                strokeWidth={2.5}
                                                                aria-hidden="true"
                                                            />
                                                            <span>{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Pricing rail */}
                                        <aside className="lg:col-span-5">
                                            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6">
                                                <div className="text-xs uppercase tracking-wider text-subtle">
                                                    Starting at
                                                </div>
                                                <div className="mt-1 font-mono text-3xl font-medium text-body tabular">
                                                    {service.priceFrom}
                                                </div>
                                                <div className="mt-2 flex items-center gap-2 text-sm text-muted">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                                                    Delivered in {service.timeline}
                                                </div>

                                                <div className="my-5 hairline" />

                                                <h3 className="text-xs font-semibold uppercase tracking-wider text-subtle">
                                                    Built with
                                                </h3>
                                                <ul className="mt-3 flex flex-wrap gap-2">
                                                    {service.technologies.map((tech) => (
                                                        <li
                                                            key={tech}
                                                            className="rounded-pill border border-[rgb(var(--border))] px-2.5 py-1 font-mono text-[0.7rem] text-muted"
                                                        >
                                                            {tech}
                                                        </li>
                                                    ))}
                                                </ul>

                                                <ul className="mt-4 flex items-center gap-3 text-subtle" aria-hidden="true">
                                                    {service.stack.map((tech) => (
                                                        <li key={tech}>
                                                            <TechIcon name={tech} size={18} />
                                                        </li>
                                                    ))}
                                                </ul>

                                                <Link
                                                    href="/contact"
                                                    className="group mt-6 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#2563eb,#0891b2_55%,#7c3aed)] px-5 font-semibold text-white shadow-[0_8px_24px_-10px_rgb(37_99_235/0.7)] transition-transform active:scale-[0.98]"
                                                >
                                                    Get a fixed quote
                                                    <ArrowRight
                                                        className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5"
                                                        aria-hidden="true"
                                                    />
                                                </Link>
                                            </div>
                                        </aside>
                                    </div>
                                </article>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </Section>

            {/* Not-sure CTA */}
            <Section>
                <ScrollReveal variant="scale">
                    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] p-8 text-center backdrop-blur-xl sm:p-12">
                        <SectionHeading
                            title="Not sure which one you need?"
                            description="Start with the ₹6,000 AI Business Audit. Two hours, a written report on your three best opportunities, and an honest read on which ones aren't worth doing. The fee comes off your first project."
                        />
                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                            <Button href="/contact" variant="primary" size="lg" trailingIcon={<ArrowRight className="h-4 w-4" />}>
                                Book a free 20-min call
                            </Button>
                            <Button
                                href={SITE.whatsapp}
                                variant="outline"
                                size="lg"
                                icon={<WhatsAppIcon size={16} />}
                            >
                                Ask on WhatsApp
                            </Button>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
