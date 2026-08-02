import type { Metadata } from 'next';
import { ArrowUpRight, Handshake, Users2, Rocket, Target, MessageCircle, FileSignature, Check, X } from 'lucide-react';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, OG_IMAGE, OG_DEFAULTS } from '@/lib/seo';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Technical Co-Founder — Equity Partnership',
    description:
        'Looking for a technical co-founder, not a vendor? We take on a small number of equity partnerships, working full-stack and AI product ownership for founders who need a technical partner, not another contractor.',
    alternates: { canonical: '/co-founder' },
    openGraph: {
        ...OG_DEFAULTS,
        title: 'Technical Co-Founder — Equity Partnership | PandaPath',
        description:
            'A small number of equity partnerships for founders who need a real technical co-founder, not a contractor.',
        url: `${SITE.url}/co-founder`,
        images: [OG_IMAGE],
    },
    twitter: { images: [OG_IMAGE.url] },
};

const comparison: { label: string; hire: string; cofound: string }[] = [
    { label: 'What you pay', hire: 'A fixed price per project', cofound: 'Equity — no cash quoted here' },
    { label: 'How long it lasts', hire: 'Ends at delivery, or a support retainer', cofound: 'For as long as we both stay in' },
    { label: 'Who it’s for', hire: 'One project inside your business', cofound: 'One company, the whole business' },
    { label: 'Where the risk sits', hire: 'On you — you pay regardless of outcome', cofound: 'Shared — we only win if the company does' },
    { label: 'How we start', hire: 'A 20-minute scoping call', cofound: 'A conversation, then time spent working together' },
];

const criteria = [
    {
        icon: Target,
        title: 'A problem you’ve validated',
        description:
            'Paying customers, a waitlist, a signed LOI — something beyond a slide deck. We’re not the right fit for validating a first idea.',
    },
    {
        icon: Users2,
        title: 'A real technical gap',
        description:
            'You can run the business, sell, raise — but you don’t have someone who can own the product and ship it themselves. That gap is what we fill.',
    },
    {
        icon: Handshake,
        title: 'Willingness to share real ownership',
        description:
            'This only works if the equity is meaningful and the decisions are shared. If you want a hired hand who reports to you, that’s our services page, not this one.',
    },
];

const process = [
    {
        icon: MessageCircle,
        title: 'A conversation',
        description:
            'Tell us what you’re building and why the technical side is the blocker. No deck required — a clear explanation of the problem is worth more than slides.',
    },
    {
        icon: Rocket,
        title: 'Working together first',
        description:
            'Before anything is signed, we spend real time on the product together — this tells both sides more than any pitch could.',
    },
    {
        icon: FileSignature,
        title: 'A formal agreement',
        description:
            'If it’s a fit on both sides, equity and roles get negotiated properly, with each side bringing their own legal counsel. We do not skip this step, and neither should you.',
    },
];

export default function CoFounderPage() {
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
        'Technical co-founder — let’s talk',
    )}&body=${encodeURIComponent(
        'Hi,\n\nWhat we’re building:\n\nWhy the technical side is the gap:\n\nWhere things stand today (traction, team, funding):\n\n',
    )}`;

    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: 'Technical Co-Founder', path: '/co-founder' }])} />

            <Section size="hero" aura>
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal variant="fadeIn">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                            Technical co-founder
                        </p>
                        <h1 className="text-display-xl font-bold font-display text-balance">
                            <span className="text-gradient">Sometimes the right engagement</span>{' '}
                            <span className="text-body">isn&apos;t a project — it&apos;s a partner</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted text-pretty">
                            We take on a small number of equity partnerships alongside our project
                            work — owning the technical and product side full-time so you can run
                            the rest of the business. This isn&apos;t a service we sell. There&apos;s
                            no price on this page, because the only currency here is equity, and
                            that&apos;s a conversation, not a quote.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Comparison against the fixed-price service model */}
            <Section size="sm">
                <SectionHeading
                    eyebrow="How this is different"
                    title="Not the same thing as hiring us"
                    description="If you just need something built, our fixed-price services are the better fit. This page is for something else."
                />
                <ScrollReveal variant="slideUp" delay={0.1}>
                    <div className="mt-12 overflow-x-auto">
                        <table className="w-full min-w-[560px] overflow-hidden rounded-card border border-[rgb(var(--border))] text-sm">
                            <caption className="sr-only">
                                Comparison between hiring PandaPath for a project and a technical
                                co-founder partnership
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col" className="w-1/3 bg-[rgb(var(--surface))] p-4 text-left font-medium text-subtle">
                                        <span className="sr-only">Criterion</span>
                                    </th>
                                    <th scope="col" className="border-l border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 text-center font-semibold text-muted">
                                        <span className="inline-flex items-center gap-1.5">
                                            <X className="h-4 w-4 text-red-400" aria-hidden="true" />
                                            Hire us
                                        </span>
                                    </th>
                                    <th scope="col" className="border-l border-[rgb(var(--border))] bg-[linear-gradient(180deg,rgb(34_211_238/0.12),transparent)] p-4 text-center font-semibold text-brand">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Check className="h-4 w-4" aria-hidden="true" />
                                            Co-found together
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, i) => (
                                    <tr
                                        key={row.label}
                                        className={`border-t border-[rgb(var(--border))] ${i % 2 === 1 ? 'bg-[rgb(var(--surface))]' : ''}`}
                                    >
                                        <th scope="row" className="p-4 text-left font-medium text-muted">
                                            {row.label}
                                        </th>
                                        <td className="border-l border-[rgb(var(--border))] p-4 text-center text-subtle">
                                            {row.hire}
                                        </td>
                                        <td className="border-l border-[rgb(var(--border))] p-4 text-center font-semibold text-body">
                                            {row.cofound}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </Section>

            {/* Criteria */}
            <Section aura>
                <SectionHeading
                    eyebrow="What we're looking for"
                    title="Three things we check for before any conversation goes further"
                />
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {criteria.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <ScrollReveal key={item.title} delay={index * 0.08} variant="scale">
                                <div className="glass card-interactive h-full rounded-card p-6">
                                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-brand">
                                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                    <h3 className="text-base font-semibold font-display text-body">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {item.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </Section>

            {/* Process */}
            <Section size="sm">
                <SectionHeading
                    eyebrow="How it works"
                    title="Three steps, none of them fast"
                    description="Equity partnerships take longer to start than a project does, on purpose."
                />
                <div className="mt-14 grid gap-6 sm:grid-cols-3">
                    {process.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <ScrollReveal key={item.title} delay={index * 0.08} variant="slideUp">
                                <div className="glass card-interactive h-full rounded-card p-6">
                                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-brand">
                                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                    <h3 className="text-base font-semibold font-display text-body">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {item.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </Section>

            {/* Closing CTA */}
            <Section>
                <ScrollReveal variant="scale">
                    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] p-8 text-center backdrop-blur-xl sm:p-12">
                        <h2 className="text-display font-bold font-display">
                            <span className="text-gradient">Tell us what you&apos;re building</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-lead text-muted text-pretty">
                            Write directly to the founder. No form, no pitch deck required — just an
                            honest description of the problem and where the technical gap is.
                        </p>
                        <a
                            href={mailto}
                            className="group mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#2563eb,#0891b2_55%,#7c3aed)] px-7 font-semibold text-white shadow-[0_8px_28px_-8px_rgb(37_99_235/0.65)] transition-transform active:scale-[0.98]"
                        >
                            {SITE.email}
                            <ArrowUpRight
                                className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                        </a>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
