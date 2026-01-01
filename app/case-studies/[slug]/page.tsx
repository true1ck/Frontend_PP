import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';

// Sample case study data (in production, this would come from Sanity CMS)
const caseStudiesData: Record<string, any> = {
    'ai-powered-analytics-platform': {
        title: 'AI-Powered Analytics Platform',
        client: 'TechCorp Inc.',
        industry: 'Technology',
        duration: '6 months',
        teamSize: '8 engineers',
        challenge: 'TechCorp needed a real-time analytics platform capable of processing millions of events daily while providing AI-driven insights and predictive modeling for their enterprise clients.',
        solution: 'We architected a scalable microservices-based platform using Next.js for the frontend, Python for AI/ML processing, and AWS infrastructure. The system processes events in real-time using Kafka streams and stores data in PostgreSQL with TimescaleDB for time-series optimization.',
        technologies: ['Next.js', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL', 'Kafka', 'Redis', 'Docker'],
        results: [
            { metric: '10M+', label: 'Events processed daily' },
            { metric: '99.9%', label: 'System uptime' },
            { metric: '60%', label: 'Faster insights' },
            { metric: '40%', label: 'Cost reduction' },
        ],
        impact: 'The platform enabled TechCorp to offer predictive analytics as a service to their clients, opening a new revenue stream worth $2M annually. Processing speed improved by 60%, allowing real-time decision making.',
        testimonial: {
            quote: 'PandaPath delivered beyond our expectations. The platform is robust, scalable, and has become a key differentiator for our business.',
            author: 'Sarah Johnson',
            role: 'CTO, TechCorp Inc.',
        },
    },
    'mobile-banking-app': {
        title: 'Mobile Banking Application',
        client: 'FinanceFlow',
        industry: 'Financial Services',
        duration: '8 months',
        teamSize: '10 engineers',
        challenge: 'FinanceFlow wanted to modernize their banking experience with a mobile-first approach, requiring biometric authentication, real-time transactions, and compliance with financial regulations.',
        solution: 'Built a cross-platform mobile app using React Native with a Node.js backend. Implemented end-to-end encryption, biometric authentication, and real-time transaction processing with fraud detection algorithms.',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS', 'Redis', 'WebSocket'],
        results: [
            { metric: '500K+', label: 'Active users' },
            { metric: '4.8/5', label: 'App Store rating' },
            { metric: '80%', label: 'Mobile adoption' },
            { metric: '0', label: 'Security breaches' },
        ],
        impact: 'The app transformed FinanceFlow\'s customer engagement, with 80% of customers now preferring mobile banking. Transaction volume increased by 150% in the first year.',
        testimonial: {
            quote: 'The team\'s expertise in both mobile development and financial services was invaluable. They delivered a secure, user-friendly app that our customers love.',
            author: 'Michael Chen',
            role: 'VP of Digital, FinanceFlow',
        },
    },
    // Add more case studies as needed
};

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all case study slugs (required for static export)
export async function generateStaticParams() {
    return Object.keys(caseStudiesData).map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const caseStudy = caseStudiesData[slug];

    if (!caseStudy) {
        return {
            title: 'Case Study Not Found',
        };
    }

    return {
        title: `${caseStudy.title} - Case Study | PandaPath`,
        description: caseStudy.challenge,
    };
}

export default async function CaseStudyPage({ params }: PageProps) {
    const { slug } = await params;
    const caseStudy = caseStudiesData[slug];

    if (!caseStudy) {
        notFound();
    }

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: caseStudy.title,
        description: caseStudy.challenge,
        author: {
            '@type': 'Organization',
            name: 'PandaPath',
        },
    };

    return (
        <>
            <JsonLd data={structuredData} />

            {/* Hero */}
            <Section className="pt-32 pb-20">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <div className="text-sm font-mono text-cyan-400 mb-4">
                            Case Study
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            {caseStudy.title}
                        </h1>
                    </ScrollReveal>

                    <ScrollReveal delay={0.2}>
                        <div className="flex flex-wrap gap-6 text-gray-300">
                            <div>
                                <div className="text-sm text-gray-500">Client</div>
                                <div className="font-semibold">{caseStudy.client}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Industry</div>
                                <div className="font-semibold">{caseStudy.industry}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Duration</div>
                                <div className="font-semibold">{caseStudy.duration}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Team Size</div>
                                <div className="font-semibold">{caseStudy.teamSize}</div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Challenge */}
            <Section className="py-8">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal variant="slideUp">
                        <div className="glass p-8 md:p-12 rounded-2xl border border-gray-700">
                            <h2 className="text-3xl font-bold font-display mb-6 text-blue-400">
                                The Challenge
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {caseStudy.challenge}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Solution */}
            <Section className="py-8">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal variant="slideUp">
                        <div className="glass p-8 md:p-12 rounded-2xl border border-gray-700">
                            <h2 className="text-3xl font-bold font-display mb-6 text-cyan-400">
                                Our Solution
                            </h2>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                {caseStudy.solution}
                            </p>

                            <div className="border-t border-gray-700 pt-6">
                                <h3 className="text-xl font-semibold mb-4 text-gray-200">
                                    Technologies Used
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {caseStudy.technologies.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-blue-900/30 border border-blue-700/50 rounded-full text-sm text-cyan-400 font-mono"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Results */}
            <Section className="py-8">
                <div className="max-w-5xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Results & Impact
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {caseStudy.results.map((result: any, index: number) => (
                            <ScrollReveal key={result.label} delay={index * 0.1} variant="scale">
                                <div className="glass p-6 rounded-xl border border-gray-700 text-center">
                                    <div className="text-3xl md:text-4xl font-bold font-display mb-2 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                        {result.metric}
                                    </div>
                                    <div className="text-sm text-gray-400">
                                        {result.label}
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal variant="slideUp">
                        <div className="glass p-8 md:p-12 rounded-2xl border border-gray-700">
                            <h3 className="text-2xl font-bold font-display mb-4 text-purple-400">
                                Business Impact
                            </h3>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {caseStudy.impact}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Testimonial */}
            {caseStudy.testimonial && (
                <Section className="py-8">
                    <div className="max-w-4xl mx-auto">
                        <ScrollReveal variant="scale">
                            <div className="glass p-8 md:p-12 rounded-2xl border border-gray-700 text-center">
                                <div className="text-5xl mb-6">💬</div>
                                <blockquote className="text-xl md:text-2xl text-gray-300 italic mb-6 leading-relaxed">
                                    &ldquo;{caseStudy.testimonial.quote}&rdquo;
                                </blockquote>
                                <div className="text-cyan-400 font-semibold">
                                    {caseStudy.testimonial.author}
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {caseStudy.testimonial.role}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </Section>
            )}

            {/* CTA */}
            <Section className="py-8">
                <ScrollReveal variant="scale">
                    <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl border border-gray-700">
                        <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                            Want Similar Results for Your Business?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Let&apos;s discuss how we can help you achieve your goals.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg neon-glow hover:shadow-xl transition-shadow"
                        >
                            Start Your Project
                        </a>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
