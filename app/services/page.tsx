'use client';

import type { Metadata } from 'next';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import { useTheme } from '@/contexts/ThemeContext';


// Metadata is now handled in layout or parent component since this is a client component

const services = [
    {
        icon: '🌐',
        title: 'Web Development',
        description: 'Build lightning-fast, SEO-optimized web applications that scale with your business.',
        technologies: ['React', 'Next.js', 'Vue', 'TypeScript'],
        features: [
            'Server-side rendering for optimal performance',
            'Progressive Web Apps (PWA)',
            'Responsive design across all devices',
            'Advanced state management',
            'Real-time features with WebSockets',
        ],
    },
    {
        icon: '📱',
        title: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
        technologies: ['React Native', 'Flutter', 'iOS', 'Android'],
        features: [
            'Native iOS and Android development',
            'Cross-platform solutions',
            'Offline-first architecture',
            'Push notifications and deep linking',
            'App Store optimization',
        ],
    },
    {
        icon: '🤖',
        title: 'AI & Machine Learning',
        description: 'Harness the power of AI to automate processes and unlock insights from your data.',
        technologies: ['LLMs', 'RAG Systems', 'TensorFlow', 'PyTorch'],
        features: [
            'Custom LLM integration and fine-tuning',
            'RAG (Retrieval Augmented Generation) systems',
            'Computer vision and NLP solutions',
            'Predictive analytics and forecasting',
            'AI-powered chatbots and assistants',
        ],
    },
    {
        icon: '🏗️',
        title: 'System Design & Architecture',
        description: 'Scalable, maintainable system architectures that grow with your business needs.',
        technologies: ['Microservices', 'Event-Driven', 'CQRS', 'DDD'],
        features: [
            'Microservices architecture design',
            'Event-driven systems',
            'Database schema design and optimization',
            'API design and documentation',
            'Performance optimization strategies',
        ],
    },
    {
        icon: '☁️',
        title: 'Cloud & DevOps',
        description: 'Robust cloud infrastructure and CI/CD pipelines for reliable, automated deployments.',
        technologies: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
        features: [
            'Cloud migration and optimization',
            'Infrastructure as Code (IaC)',
            'CI/CD pipeline setup',
            'Container orchestration',
            'Monitoring and logging solutions',
        ],
    },
    {
        icon: '🔗',
        title: 'Automation & API Integrations',
        description: 'Streamline workflows and connect your tools with custom automation and integrations.',
        technologies: ['REST', 'GraphQL', 'Webhooks', 'Zapier'],
        features: [
            'Third-party API integrations',
            'Custom workflow automation',
            'Data synchronization',
            'Webhook implementations',
            'Legacy system modernization',
        ],
    },
];

export default function ServicesPage() {
    const { theme } = useTheme();

    return (
        <>
            {/* Hero Section */}
            <Section className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
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
            <Section className="py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {services.map((service, index) => (
                            <ScrollReveal
                                key={service.title}
                                delay={index * 0.1}
                                variant="slideUp"
                            >
                                <div className="glass p-6 sm:p-8 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col group">
                                    {/* Icon & Title */}
                                    <div className="flex items-center gap-4 mb-3 sm:mb-4">
                                        <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-display text-blue-400 group-hover:text-cyan-400 transition-colors">
                                            {service.title}
                                        </h2>
                                    </div>

                                    {/* Description */}
                                    <p className={`text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'}`}>
                                        {service.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <div className={`text-sm font-semibold mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-400'}`}>
                                            Technologies:
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
                                            Key Features:
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

                                    {/* Learn More Link */}
                                    <div className="mt-6 pt-6 border-t border-gray-700">
                                        <a
                                            href="/contact"
                                            className="inline-flex items-center text-blue-400 hover:text-cyan-400 font-semibold transition-colors group/link"
                                        >
                                            Get Started
                                            <svg
                                                className="w-4 h-4 ml-2 group-hover/link:translate-x-1 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA Section */}
            <Section className="py-20">
                <ScrollReveal variant="scale">
                    <div className="max-w-4xl mx-auto text-center glass p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-700">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-4 sm:mb-6">
                            Not Sure Which Service You Need?
                        </h2>
                        <p className={`text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4 ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
                            Book a free consultation and we&apos;ll help you find the perfect solution for your project.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg neon-glow hover:shadow-xl transition-shadow"
                        >
                            Book Free Consultation
                        </a>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
