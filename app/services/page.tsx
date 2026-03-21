'use client';

import type { Metadata } from 'next';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import { useTheme } from '@/contexts/ThemeContext';


// Metadata is now handled in layout or parent component since this is a client component

const services = [
    {
        icon: '💬',
        title: 'WhatsApp AI Bot',
        tagline: 'from ₹25,000 · 2 weeks',
        description: 'Build a fully automated WhatsApp assistant that handles customer queries, lead capture, support tickets, and sales — 24/7, without a human agent.',
        technologies: ['WhatsApp Business API', 'LLMs', 'Node.js', 'Webhooks'],
        features: [
            'Natural language conversation (Hindi + English)',
            'CRM & sheet integration out of the box',
            'Lead capture and auto-follow-up flows',
            'Custom trained on your product/FAQs',
            'Analytics dashboard for conversation insights',
        ],
        color: 'from-green-500/20 to-emerald-500/20',
        borderColor: 'hover:border-green-500/50',
    },
    {
        icon: '🧠',
        title: 'RAG Knowledge System',
        tagline: 'from ₹40,000 · 3 weeks',
        description: 'Turn your documents, PDFs, SOPs, and knowledge base into a smart AI assistant your team or customers can query in plain English — no hallucinations.',
        technologies: ['RAG', 'OpenAI / Gemini', 'Vector DB', 'Python'],
        features: [
            'Ingest PDFs, Notion, Google Docs, websites',
            'Accurate retrieval — no hallucinations',
            'Private deployment (your data stays yours)',
            'Slack / WhatsApp / web widget integration',
            'Role-based access control',
        ],
        color: 'from-purple-500/20 to-violet-500/20',
        borderColor: 'hover:border-purple-500/50',
    },
    {
        icon: '🚀',
        title: 'Full AI Product Build',
        tagline: 'from ₹80,000 · 4–6 weeks',
        description: 'End-to-end build of your AI-powered product — web app, mobile app, or platform — with production-grade architecture, APIs, and deployment included.',
        technologies: ['Next.js', 'React Native', 'AI APIs', 'AWS / GCP'],
        features: [
            'Full-stack web or mobile application',
            'AI feature integration (chat, recommendations, automation)',
            'Production deployment & CI/CD pipeline',
            'Direct WhatsApp with developer — no account managers',
            'Post-launch support for 30 days',
        ],
        color: 'from-blue-500/20 to-cyan-500/20',
        borderColor: 'hover:border-blue-500/50',
    },
    {
        icon: '🔍',
        title: 'AI Business Audit',
        tagline: '₹6,000 · 2 hours',
        description: 'Not sure where to start with AI? We spend 2 hours reviewing your business and tell you exactly which AI tool or automation will save you the most time and money.',
        technologies: ['Strategy', 'Process mapping', 'Tooling review'],
        features: [
            '2-hour 1-on-1 deep-dive call',
            'Written report of top 3 AI opportunities',
            'Cost vs benefit breakdown for each',
            'Recommended tools and implementation order',
            'First project scoped and quoted at the end',
        ],
        color: 'from-orange-500/20 to-amber-500/20',
        borderColor: 'hover:border-orange-500/50',
    },
];


export default function ServicesPage() {
    const { theme } = useTheme();

    return (
        <>
            {/* Hero Section */}
            <Section className="!pt-32 md:!pt-30 lg:!pt-40 !pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display leading-tight pb-2 mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            Our Services
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className={`text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed px-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
                            End-to-end technology solutions tailored to your business goals.
                            From concept to deployment, we&apos;ve got you covered.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Services Grid */}
            <Section className="py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <ScrollReveal
                                key={service.title}
                                delay={index * 0.1}
                                variant="slideUp"
                            >
                                <div className={`glass p-6 sm:p-8 rounded-2xl border border-gray-700 ${service.borderColor} transition-all duration-300 h-full flex flex-col group bg-gradient-to-br ${service.color}`}>
                                    {/* Icon & Title */}
                                    <div className="flex items-start gap-4 mb-3 sm:mb-4">
                                        <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                                            {service.icon}
                                        </div>
                                        <div>
                                            <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold font-display transition-colors ${theme === 'light' ? 'text-gray-900 group-hover:text-gray-600' : 'text-blue-400 group-hover:text-cyan-400'}`}>
                                                {service.title}
                                            </h2>
                                            <div className="text-sm font-semibold text-cyan-400 mt-1 font-mono">
                                                {service.tagline}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'}`}>
                                        {service.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <div className={`text-sm font-semibold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                                            Stack:
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {service.technologies.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-blue-900/30 border border-blue-700/50 rounded-full text-sm text-cyan-400 font-mono"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="flex-1">
                                        <div className={`text-sm font-semibold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                                            What&apos;s included:
                                        </div>
                                        <ul className="space-y-2">
                                            {service.features.map((feature) => (
                                                <li
                                                    key={feature}
                                                    className={`flex items-start text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'}`}
                                                >
                                                    <svg
                                                        className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* CTA */}
                                    <div className="mt-6 pt-6 border-t border-gray-700">
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center text-blue-400 hover:text-cyan-400 font-semibold transition-colors group/link"
                                        >
                                            Book a free 20-min call →
                                        </a>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="py-8">
                <ScrollReveal variant="scale">
                    <div className="max-w-4xl mx-auto text-center glass p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-700">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-4 sm:mb-6">
                            Not sure where to start?
                        </h2>
                        <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
                            Start with our ₹6,000 AI Business Audit. We&apos;ll review your business and tell you exactly which AI tool will save you the most time — with a full written report and a scoped quote at the end.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/contact"
                                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg neon-glow hover:shadow-xl transition-shadow"
                            >
                                Book a Free 20-Min Call
                            </a>
                            <a
                                href="https://wa.me/917411147986"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 rounded-full text-white font-semibold text-lg transition-colors"
                            >
                                💬 WhatsApp Us
                            </a>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
