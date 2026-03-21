import type { Metadata } from 'next';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'About PandaPath — AI-First Builds for Indian Startups',
    description: 'PandaPath builds WhatsApp AI bots, RAG systems, and full-stack AI products for Indian startups — fast, lean, and founder-direct. Based in Bangalore.',
};

export default function AboutPage() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'PandaPath',
        description: 'Full-stack IT solutions company delivering scalable software, AI systems, and cloud-ready digital products.',
        url: 'https://pandapaths.com',
        logo: '/images/logo.png',
        foundingDate: '2020',
        sameAs: [
            'https://twitter.com/pandapaths',
            'https://linkedin.com/company/pandapaths',
            'https://github.com/pandapaths',
        ],
    };

    return (
        <>
            <JsonLd data={organizationSchema} />

            {/* Hero Section */}
            <Section className="!pt-32 md:!pt-30 lg:!pt-40 !pb-0">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display leading-tight pb-2 mb-6 sm:mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            Building the Future, One Path at a Time
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed px-4">
                            We&apos;re a team of passionate engineers, designers, and innovators dedicated to crafting
                            exceptional digital experiences that drive real business value.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Our Story */}
            <Section className="pt-1 pb-1">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="slideUp">
                        <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-700">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-4 sm:mb-6 text-blue-400">
                                Our Story
                            </h2>
                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                                <p>
                                    PandaPath started with a simple frustration: Indian startups were overpaying for slow, bloated software agencies and getting junior developers doing the work while the founders took the calls.
                                </p>
                                <p>
                                    We built PandaPath to be the answer — lean, fast, AI-first builds that founders can actually afford, shipped in weeks instead of months. When you work with us, you work directly with the developer. No account managers. No middlemen.
                                </p>
                                <p>
                                    We’re based in Bangalore and focused entirely on the Indian startup ecosystem — building WhatsApp bots, RAG knowledge systems, and full-stack AI products for founders who want things shipped, not promised.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Mission & Vision */}
            <Section className="py-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        <ScrollReveal variant="slideRight">
                            <div className="glass p-6 sm:p-8 rounded-2xl border border-gray-700 h-full hover:border-blue-500/50 transition-all duration-300">
                                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🎯</div>
                                <h3 className="text-xl sm:text-2xl font-bold font-display mb-3 sm:mb-4 text-cyan-400">
                                    Our Mission
                                </h3>
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                    To empower businesses with cutting-edge technology solutions that are not just
                                    functional, but scalable, maintainable, and built to last. We believe in
                                    architecture-first development that sets our clients up for long-term success.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal variant="slideLeft" delay={0.2}>
                            <div className="glass p-6 sm:p-8 rounded-2xl border border-gray-700 h-full hover:border-purple-500/50 transition-all duration-300">
                                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🚀</div>
                                <h3 className="text-xl sm:text-2xl font-bold font-display mb-3 sm:mb-4 text-purple-400">
                                    Our Vision
                                </h3>
                                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                    To be the go-to technology partner for companies that refuse to compromise on
                                    quality. We envision a world where every digital product is built with the same
                                    rigor and excellence as the most successful tech companies.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </Section>

            {/* Core Values */}
            <Section className="py-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-center mb-12 sm:mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Our Core Values
                        </h2>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        {[
                            {
                                icon: '🏗️',
                                title: 'Architecture First',
                                description: 'We design systems that scale. Every project starts with solid architectural foundations.',
                            },
                            {
                                icon: '💎',
                                title: 'Quality Over Speed',
                                description: 'We believe in doing it right the first time. No shortcuts, no technical debt.',
                            },
                            {
                                icon: '🤝',
                                title: 'True Partnership',
                                description: 'Your success is our success. We are invested in your long-term growth.',
                            },
                            {
                                icon: '🔬',
                                title: 'Innovation Driven',
                                description: 'We stay ahead of the curve, leveraging the latest technologies responsibly.',
                            },
                            {
                                icon: '📚',
                                title: 'Continuous Learning',
                                description: 'Technology evolves rapidly. We invest in our team growth and expertise.',
                            },
                            {
                                icon: '🎨',
                                title: 'User-Centric Design',
                                description: 'Beautiful interfaces backed by powerful engineering create exceptional experiences.',
                            },
                        ].map((value, index) => (
                            <ScrollReveal key={value.title} delay={index * 0.1} variant="scale">
                                <div className="glass p-5 sm:p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 h-full">
                                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{value.icon}</div>
                                    <h3 className="text-lg sm:text-xl font-bold font-display mb-2 sm:mb-3 text-blue-400">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Why PandaPath */}
            <Section className="py-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-center mb-12 sm:mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            PandaPath vs a Big Agency
                        </h2>
                    </ScrollReveal>

                    <ScrollReveal variant="slideUp" delay={0.1}>
                        <div className="glass rounded-2xl border border-gray-700 overflow-hidden">
                            <div className="grid grid-cols-3 text-sm font-semibold">
                                <div className="p-4 bg-gray-800/50 text-gray-400 border-b border-gray-700"></div>
                                <div className="p-4 bg-red-900/20 text-red-300 border-b border-l border-gray-700 text-center">Big Agency</div>
                                <div className="p-4 bg-cyan-900/20 text-cyan-300 border-b border-l border-gray-700 text-center">PandaPath</div>
                            </div>
                            {[
                                ['Cost', '₹5L+ project', 'From ₹25,000'],
                                ['Timeline', '3–6 months', '2–4 weeks'],
                                ['Who you talk to', 'Account manager', 'Direct with developer'],
                                ['Who does the work', 'Junior devs', 'Founder-level'],
                                ['Communication', 'Weekly status calls', 'WhatsApp, any time'],
                                ['AI expertise', 'Outsourced', 'Core specialty'],
                            ].map(([label, agency, pandapath], i) => (
                                <div key={label} className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? 'bg-gray-900/30' : ''}`}>
                                    <div className="p-4 text-gray-400 border-b border-gray-800">{label}</div>
                                    <div className="p-4 text-red-300/70 border-b border-l border-gray-800 text-center">{agency}</div>
                                    <div className="p-4 text-cyan-300 font-semibold border-b border-l border-gray-800 text-center">{pandapath}</div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* CTA */}
            <Section className="py-8">
                <ScrollReveal variant="scale">
                    <div className="max-w-4xl mx-auto text-center glass p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-700">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-4 sm:mb-6">
                            Ready to Build Something Amazing?
                        </h2>
                        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 px-4">
                            Let&apos;s discuss how we can help bring your vision to life.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg neon-glow hover:shadow-xl transition-shadow"
                        >
                            Get in Touch
                        </a>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
