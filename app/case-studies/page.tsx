import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import CaseStudiesGrid from '@/components/CaseStudiesGrid';
import Button from '@/components/Button';
import JsonLd from '@/components/JsonLd';
import { caseStudiesSchema, breadcrumbSchema, OG_IMAGE } from '@/lib/seo';
import { SITE } from '@/lib/content';

export const metadata: Metadata = {
    title: 'Case Studies — AI Projects for Indian Startups | PandaPath',
    description:
        'Real projects from PandaPath: WhatsApp AI assistants, RAG systems, analytics platforms and cloud migrations built for startups across India.',
    alternates: { canonical: '/case-studies' },
    openGraph: {
        title: 'PandaPath Case Studies — AI Projects for Indian Startups',
        description:
            'WhatsApp AI assistants, RAG knowledge systems, analytics platforms and cloud migrations delivered in 2–6 weeks.',
        url: `${SITE.url}/case-studies`,
        images: [OG_IMAGE],
    },
    twitter: { images: [OG_IMAGE.url] },
};

export default function CaseStudiesPage() {
    return (
        <>
            <JsonLd data={caseStudiesSchema} />
            <JsonLd data={breadcrumbSchema([{ name: 'Case Studies', path: '/case-studies' }])} />

            <Section size="hero" aura>
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal variant="fadeIn">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                            Case studies
                        </p>
                        <h1 className="text-display-xl font-bold font-display text-balance">
                            <span className="text-gradient">Work we&apos;ve</span>{' '}
                            <span className="text-body">actually shipped</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted text-pretty">
                            Client names are withheld under NDA. Everything else — the problem, the
                            approach, the stack and the timeline — is exactly as delivered.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            <Section size="sm">
                <CaseStudiesGrid />
            </Section>

            <Section>
                <ScrollReveal variant="scale">
                    <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-[rgb(var(--border-strong))] bg-[rgb(var(--surface))] p-8 text-center backdrop-blur-xl sm:p-12">
                        <h2 className="text-display font-bold font-display">
                            <span className="text-gradient">Have something similar in mind?</span>
                        </h2>
                        <p className="mx-auto mt-5 max-w-xl text-lead text-muted text-pretty">
                            Tell us the problem in twenty minutes and we&apos;ll tell you what it
                            takes to solve — scope, price and delivery date.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <Button href="/contact" variant="primary" size="lg" trailingIcon={<ArrowRight className="h-4 w-4" />}>
                                Start your project
                            </Button>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
