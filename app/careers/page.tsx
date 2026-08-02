import type { Metadata } from 'next';
import { Mail, Code2, GraduationCap, Users, Clock, ArrowUpRight } from 'lucide-react';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, OG_IMAGE, OG_DEFAULTS } from '@/lib/seo';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Careers — Work With Us in Bangalore',
    description:
        "PandaPath is a small AI studio in Bangalore. We hire rarely and carefully — if you ship full-stack AI products end to end, send us something you've built.",
    alternates: { canonical: '/careers' },
    openGraph: {
        ...OG_DEFAULTS,
        title: 'Careers — Work With PandaPath in Bangalore',
        description:
            'A small AI studio in Bangalore. We hire rarely, and carefully — for people who ship full-stack AI products end to end.',
        url: `${SITE.url}/careers`,
        images: [OG_IMAGE],
    },
    twitter: { images: [OG_IMAGE.url] },
};

const reality = [
    {
        icon: Code2,
        title: 'You own projects end to end',
        description:
            'There is no ticket queue to hide in. You scope with the client, build it, deploy it and support it. That is either exactly what you want or exactly what you do not.',
    },
    {
        icon: Users,
        title: 'The team is small',
        description:
            'That means real ownership and no politics. It also means no large engineering org to learn from, and you will be the most senior person on some calls.',
    },
    {
        icon: GraduationCap,
        title: 'You will work across the stack',
        description:
            'Frontend, APIs, model integration, deployment. Specialists are welcome, but generalists have a better time here.',
    },
    {
        icon: Clock,
        title: 'Short cycles, real deadlines',
        description:
            'Projects run two to six weeks. Shipping matters more than perfect abstractions, and the feedback loop is measured in days.',
    },
];

export default function CareersPage() {
    const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(
        'Working with PandaPath',
    )}&body=${encodeURIComponent(
        'Hi PandaPath team,\n\nA bit about me:\n\nSomething I have built (link):\n\nWhat I would want to work on:\n\n',
    )}`;

    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: 'Careers', path: '/careers' }])} />

            <Section size="hero" aura>
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal variant="fadeIn">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                            Careers
                        </p>
                        <h1 className="text-display-xl font-bold font-display text-balance">
                            <span className="text-gradient">We hire rarely,</span>{' '}
                            <span className="text-body">and carefully</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted text-pretty">
                            We&apos;re a small studio in Bangalore, so a new person changes how the
                            whole place works. Here&apos;s an honest picture of the job before you
                            decide whether to write to us.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            <Section size="sm">
                <SectionHeading
                    eyebrow="The reality"
                    title="What working here is actually like"
                    description="Including the parts that won't suit everyone."
                />

                <div className="mt-14 grid gap-6 md:grid-cols-2">
                    {reality.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <ScrollReveal key={item.title} delay={index * 0.08} variant="slideUp">
                                <div className="glass card-interactive h-full rounded-card p-6 sm:p-7">
                                    <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-brand">
                                        <Icon className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
                                    </span>
                                    <h2 className="text-subtitle font-semibold font-display text-body">
                                        {item.title}
                                    </h2>
                                    <p className="mt-2.5 text-sm leading-relaxed text-muted">
                                        {item.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        );
                    })}
                </div>
            </Section>

            {/* Open roles / how to reach us */}
            <Section>
                <ScrollReveal variant="scale">
                    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] p-8 text-center backdrop-blur-xl sm:p-12">
                        <span className="inline-flex items-center gap-2 rounded-pill border border-[rgb(var(--border))] px-3.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-subtle">
                            No open roles right now
                        </span>

                        <h2 className="mt-6 text-display font-bold font-display">
                            <span className="text-gradient">Write to us anyway</span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-lead text-muted text-pretty">
                            We don&apos;t keep a waitlist and we won&apos;t pretend to email you
                            later. But if you send something you&apos;ve built and it&apos;s good,
                            we&apos;ll remember — that&apos;s how our last two hires happened.
                        </p>

                        <a
                            href={mailto}
                            className="group mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#2563eb,#0891b2_55%,#7c3aed)] px-7 font-semibold text-white shadow-[0_8px_28px_-8px_rgb(37_99_235/0.65)] transition-transform active:scale-[0.98]"
                        >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            {SITE.email}
                            <ArrowUpRight
                                className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                        </a>

                        <p className="mt-5 text-sm text-subtle">
                            Send a link to something real — a repo, a live product, a side project.
                            A CV on its own tells us very little.
                        </p>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
