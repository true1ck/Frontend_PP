import type { Metadata } from 'next';
import { ArrowRight, Ship, Receipt, MessagesSquare, Wrench, KeyRound, ThumbsDown, Target, Telescope, X, Check } from 'lucide-react';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';
import Button from '@/components/Button';
import JsonLd from '@/components/JsonLd';
import { organizationSchema, breadcrumbSchema, OG_IMAGE, OG_DEFAULTS } from '@/lib/seo';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
    // Root template appends " · PandaPath"; naming the brand here too made it
    // read "About PandaPath … · PandaPath" in results.
    title: 'About — AI Product Studio in Bangalore',
    description:
        'PandaPath is a small AI studio in Bangalore building WhatsApp bots, RAG systems and full AI products. Fixed pricing, 2–4 week delivery.',
    alternates: { canonical: '/about' },
    openGraph: {
        ...OG_DEFAULTS,
        title: 'About PandaPath — AI Product Studio in Bangalore',
        description:
            'A small AI studio building for Indian startups. Fixed pricing, 2–4 week delivery, founder-direct.',
        url: `${SITE.url}/about`,
        images: [OG_IMAGE],
    },
    twitter: { images: [OG_IMAGE.url] },
};

const principles = [
    {
        icon: Ship,
        title: 'Ship, then refine',
        description:
            'A working build in your hands in week one beats a perfect specification in month three. We iterate against something real.',
    },
    {
        icon: Receipt,
        title: 'One number, agreed upfront',
        description:
            'Fixed price and fixed scope before we start. If the scope genuinely changes, we re-quote in the open — never in the invoice.',
    },
    {
        icon: MessagesSquare,
        title: 'No layers between us',
        description:
            'You message the developer writing your code. There is no account manager translating your requirements into a ticket.',
    },
    {
        icon: Wrench,
        title: 'Boring tech, on purpose',
        description:
            'We pick proven tools with large communities. Novel frameworks are fun for us and expensive for you to maintain later.',
    },
    {
        icon: KeyRound,
        title: 'Your code, your cloud',
        description:
            'Source handed over at launch, deployed in your own accounts. Nothing is locked to us — including your ability to leave.',
    },
    {
        icon: ThumbsDown,
        title: 'We say no',
        description:
            'If AI is not the right answer for your problem, we tell you in the first call. A bad-fit project helps neither of us.',
    },
];

const comparison = [
    ['Cost', '₹5L+ per project', 'From ₹25,000'],
    ['Timeline', '3–6 months', '2–4 weeks'],
    ['Who you talk to', 'An account manager', 'The developer building it'],
    ['Who writes the code', 'Whoever is on the bench', 'A senior engineer'],
    ['Communication', 'Weekly status call', 'WhatsApp, same day'],
    ['AI expertise', 'Subcontracted out', 'The core of what we do'],
    ['Code ownership', 'Often theirs', 'Always yours'],
];

export default function AboutPage() {
    return (
        <>
            <JsonLd data={organizationSchema} />
            <JsonLd data={breadcrumbSchema([{ name: 'About', path: '/about' }])} />

            <Section size="hero" aura>
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal variant="fadeIn">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                            About us
                        </p>
                        <h1 className="text-display-xl font-bold font-display text-balance">
                            <span className="text-gradient">Small studio,</span>{' '}
                            <span className="text-body">short timelines</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted text-pretty">
                            We build AI products for Indian startups from Bangalore. Fixed price,
                            live in weeks, and you always know exactly who is writing your code.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Story */}
            <Section size="sm" width="narrow">
                <ScrollReveal variant="slideUp">
                    <div className="glass rounded-card p-7 sm:p-10">
                        <h2 className="text-title font-bold font-display text-body">Why we started</h2>
                        <div className="mt-5 space-y-4 text-[0.95rem] leading-relaxed text-muted">
                            <p>
                                PandaPath started from a pattern we kept seeing: Indian founders
                                paying large-agency prices, waiting two quarters, and receiving work
                                done by whoever happened to be free that month — while the people
                                they met during the pitch were never seen again.
                            </p>
                            <p>
                                So we built the opposite. One senior engineer on your project. A
                                fixed number agreed before anything starts. A working link within
                                days rather than a status deck at the end of the month. If something
                                is going to slip, you hear it from the person it is slipping for.
                            </p>
                            <p>
                                We stay deliberately small and deliberately focused: WhatsApp
                                automation, retrieval systems over your own documents, and
                                full-stack products with AI genuinely built in rather than bolted
                                on. It is a narrow slice, and it is the slice we are good at.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>

            {/* Mission & vision */}
            <Section size="sm">
                <div className="grid gap-6 md:grid-cols-2">
                    <ScrollReveal variant="slideRight">
                        <div className="glass card-interactive h-full rounded-card p-7 sm:p-8">
                            <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[linear-gradient(135deg,rgb(34_211_238/0.16),rgb(59_130_246/0.1))] text-brand">
                                <Target className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                            </span>
                            <h2 className="text-subtitle font-semibold font-display text-body">Our mission</h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted">
                                Make production-grade AI affordable for startups that do not have a
                                crore to spend or six months to wait. The technology is not the
                                bottleneck any more — access to people who can ship it is.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal variant="slideLeft" delay={0.1}>
                        <div className="glass card-interactive h-full rounded-card p-7 sm:p-8">
                            <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[linear-gradient(135deg,rgb(168_85_247/0.16),rgb(59_130_246/0.1))] text-[var(--accent-2)]">
                                <Telescope className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                            </span>
                            <h2 className="text-subtitle font-semibold font-display text-body">Where we&apos;re going</h2>
                            <p className="mt-3 text-sm leading-relaxed text-muted">
                                To be the first call an Indian founder makes when they want AI in
                                their product — because we quote honestly, ship on the date we
                                said, and tell them when the answer is no.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Principles */}
            <Section aura>
                <SectionHeading
                    eyebrow="How we operate"
                    title="Six things we don't compromise on"
                    description="These are the rules we actually run the studio by, not values written for a careers page."
                />

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {principles.map((principle, index) => {
                        const Icon = principle.icon;
                        return (
                            <ScrollReveal key={principle.title} delay={index * 0.07} variant="scale">
                                <div className="glass card-interactive h-full rounded-card p-6">
                                    <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-brand">
                                        <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                    <h3 className="text-base font-semibold font-display text-body">
                                        {principle.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted">
                                        {principle.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </Section>

            {/* Comparison */}
            <Section size="sm">
                <SectionHeading
                    eyebrow="Honest comparison"
                    title="PandaPath vs a large agency"
                    description="Not every project belongs with us. If you need a 30-person team and a two-year roadmap, an agency is genuinely the better call."
                />

                <ScrollReveal variant="slideUp" delay={0.1}>
                    {/* Wide table scrolls inside its own container rather than
                        forcing the page body to scroll horizontally. */}
                    <div className="mt-12 overflow-x-auto">
                        <table className="w-full min-w-[560px] overflow-hidden rounded-card border border-[rgb(var(--border))] text-sm">
                            <caption className="sr-only">
                                Comparison of PandaPath and a large agency across cost, timeline,
                                communication, expertise and code ownership
                            </caption>
                            <thead>
                                <tr>
                                    <th scope="col" className="w-1/3 bg-[rgb(var(--surface))] p-4 text-left font-medium text-subtle">
                                        <span className="sr-only">Criterion</span>
                                    </th>
                                    <th scope="col" className="border-l border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 text-center font-semibold text-muted">
                                        <span className="inline-flex items-center gap-1.5">
                                            <X className="h-4 w-4 text-red-400" aria-hidden="true" />
                                            Large agency
                                        </span>
                                    </th>
                                    <th scope="col" className="border-l border-[rgb(var(--border))] bg-[linear-gradient(180deg,rgb(34_211_238/0.12),transparent)] p-4 text-center font-semibold text-brand">
                                        <span className="inline-flex items-center gap-1.5">
                                            <Check className="h-4 w-4" aria-hidden="true" />
                                            PandaPath
                                        </span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map(([label, agency, pandapath], i) => (
                                    <tr
                                        key={label}
                                        className={`border-t border-[rgb(var(--border))] ${i % 2 === 1 ? 'bg-[rgb(var(--surface))]' : ''}`}
                                    >
                                        <th scope="row" className="p-4 text-left font-medium text-muted">
                                            {label}
                                        </th>
                                        <td className="border-l border-[rgb(var(--border))] p-4 text-center text-subtle">
                                            {agency}
                                        </td>
                                        <td className="border-l border-[rgb(var(--border))] p-4 text-center font-semibold text-body">
                                            {pandapath}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </ScrollReveal>
            </Section>

            <Section>
                <ScrollReveal variant="scale">
                    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] p-8 text-center backdrop-blur-xl sm:p-12">
                        <h2 className="text-display font-bold font-display">
                            <span className="text-gradient">Let&apos;s see if we&apos;re a fit</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-lead text-muted text-pretty">
                            Twenty minutes, no pitch deck. Describe the problem and we&apos;ll tell
                            you honestly whether we&apos;re the right people to solve it.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Button href="/contact" variant="primary" size="lg" trailingIcon={<ArrowRight className="h-4 w-4" />}>
                                Book a free 20-min call
                            </Button>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
