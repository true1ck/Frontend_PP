import type { Metadata } from 'next';
import { ArrowRight, GitBranch, ShieldCheck, Eye, Gauge, Users2, PackageOpen } from 'lucide-react';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';
import ProcessTimeline from '@/components/ProcessTimeline';
import TechGrid from '@/components/TechGrid';
import Button from '@/components/Button';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, OG_IMAGE } from '@/lib/seo';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Process & Tech Stack — How PandaPath Builds AI | PandaPath',
    description:
        'How PandaPath scopes, builds and ships AI products in 2–6 weeks, and the stack we use: Next.js, Python, RAG, Claude, Gemini, PostgreSQL, Docker.',
    alternates: { canonical: '/process-tech' },
    openGraph: {
        title: 'Process & Technology Stack | PandaPath',
        description: 'How we scope, build and ship AI products in 2–6 weeks — and the stack we do it on.',
        url: `${SITE.url}/process-tech`,
        images: [OG_IMAGE],
    },
    twitter: { images: [OG_IMAGE.url] },
};

const methodology = [
    {
        icon: Eye,
        title: 'You watch it being built',
        description:
            'A staging link goes up in the first few days and updates continuously. You never wait for a milestone to see progress.',
    },
    {
        icon: GitBranch,
        title: 'Small, reviewable changes',
        description:
            'Work lands in small pull requests with CI running on each. Easier to review, far easier to roll back when something is wrong.',
    },
    {
        icon: ShieldCheck,
        title: 'Testing where it earns its keep',
        description:
            'Automated coverage on the logic that would genuinely hurt if it broke — payments, auth, data integrity — rather than chasing a coverage percentage.',
    },
    {
        icon: Gauge,
        title: 'Performance measured, not assumed',
        description:
            'Core Web Vitals and API latency are checked before launch. "It feels fast on my laptop" is not a benchmark.',
    },
    {
        icon: Users2,
        title: 'One senior engineer, start to finish',
        description:
            'The person who scoped your project is the person who builds and deploys it. Nothing is lost in a handover, because there is no handover.',
    },
    {
        icon: PackageOpen,
        title: 'A real handover at the end',
        description:
            'Source code, infrastructure in your own accounts, environment docs and a walkthrough call. You could take it to another team the next day.',
    },
];

const stackRationale = [
    {
        title: 'Proven beats novel',
        description:
            'Everything here runs in production at scale somewhere serious. We are not experimenting on your budget.',
    },
    {
        title: 'You can hire for it',
        description:
            'Every tool we use has a large Indian talent pool. When you bring development in-house, you will be able to staff it.',
    },
    {
        title: 'Model-agnostic by design',
        description:
            'AI features sit behind an abstraction, so swapping Claude for Gemini — or adding a local model — is a config change, not a rewrite.',
    },
    {
        title: 'Cheap to run',
        description:
            'We default to managed services and serverless where it fits, so a low-traffic product costs very little to keep alive.',
    },
    {
        title: 'Portable',
        description:
            'Containerised and standards-based. Nothing traps you on one cloud vendor or on us.',
    },
];

export default function ProcessTechPage() {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: 'Process & Tech', path: '/process-tech' }])} />

            <Section size="hero" aura>
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal variant="fadeIn">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                            Process &amp; technology
                        </p>
                        <h1 className="text-display-xl font-bold font-display text-balance">
                            <span className="text-gradient">How the work</span>{' '}
                            <span className="text-body">actually gets done</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted text-pretty">
                            The same five steps on every project, and a deliberately boring stack
                            chosen so your product is cheap to run and easy to hand over.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            <Section size="sm">
                <SectionHeading
                    eyebrow="The process"
                    title="Five steps, start to handover"
                    description="You always know which step you're in, what's next, and what it costs."
                />
                <div className="mt-16">
                    <ProcessTimeline />
                </div>
            </Section>

            <Section aura>
                <SectionHeading
                    eyebrow="How we build"
                    title="Engineering practice"
                    description="The habits that keep a two-week timeline from turning into a two-month one."
                />

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {methodology.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <ScrollReveal key={item.title} delay={index * 0.07} variant="slideUp">
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

            <Section size="sm">
                <SectionHeading
                    eyebrow="Technology"
                    title="The stack we build on"
                    description="Filter by layer to see what we reach for and why."
                />
                <div className="mt-12">
                    <TechGrid />
                </div>
            </Section>

            <Section size="sm" width="narrow">
                <SectionHeading
                    eyebrow="Why these"
                    title="How we choose tools"
                    align="left"
                />

                <dl className="mt-10 divide-y divide-[rgb(var(--border))] border-y border-[rgb(var(--border))]">
                    {stackRationale.map((item, index) => (
                        <ScrollReveal key={item.title} delay={index * 0.06} variant="fadeIn">
                            <div className="py-5">
                                <dt className="text-base font-semibold font-display text-body">
                                    {item.title}
                                </dt>
                                <dd className="mt-1.5 max-w-prose text-sm leading-relaxed text-muted">
                                    {item.description}
                                </dd>
                            </div>
                        </ScrollReveal>
                    ))}
                </dl>
            </Section>

            <Section>
                <ScrollReveal variant="scale">
                    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] p-8 text-center backdrop-blur-xl sm:p-12">
                        <h2 className="text-display font-bold font-display">
                            <span className="text-gradient">Want to see it applied to your project?</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-lead text-muted text-pretty">
                            Bring the problem to a 20-minute call and you&apos;ll leave with a
                            scope, a stack recommendation and a fixed number.
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
