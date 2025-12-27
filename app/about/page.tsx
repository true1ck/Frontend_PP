import type { Metadata } from 'next';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
    title: 'About Us - PandaPaths',
    description: 'Learn about PandaPaths, our mission to deliver world-class IT solutions, and our architecture-first approach to software development.',
};

export default function AboutPage() {
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'PandaPaths',
        description: 'Full-stack IT solutions company delivering scalable software, AI systems, and cloud-ready digital products.',
        url: 'https://pandapaths.com',
        logo: 'https://pandapaths.com/logo.png',
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
            <Section className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
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
            <Section className="py-20">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="slideUp">
                        <div className="glass p-6 sm:p-8 md:p-12 rounded-2xl border border-gray-700">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display mb-4 sm:mb-6 text-blue-400">
                                Our Story
                            </h2>
                            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                                <p>
                                    PandaPaths was founded with a simple yet powerful vision: to bridge the gap between
                                    ambitious ideas and scalable, production-ready software. We saw too many projects
                                    fail not from lack of innovation, but from poor architecture and rushed implementation.
                                </p>
                                <p>
                                    Today, we&apos;re a full-stack IT solutions company that partners with startups, enterprises,
                                    and product teams to build software that scales. From AI-powered applications to
                                    cloud-native platforms, we bring technical excellence and strategic thinking to every project.
                                </p>
                                <p>
                                    Our name reflects our philosophy: like a panda navigating through bamboo forests,
                                    we help our clients find clear paths through complex technical landscapes.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Mission & Vision */}
            <Section className="py-20">
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
            <Section className="py-20">
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

            {/* Why PandaPaths */}
            <Section className="py-20">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-center mb-12 sm:mb-16 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Why Choose PandaPaths?
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-4 sm:space-y-6">
                        {[
                            {
                                title: 'Full-Stack Expertise',
                                description: 'From frontend to backend, cloud infrastructure to AI/ML, we have deep expertise across the entire technology stack.',
                            },
                            {
                                title: 'Proven Track Record',
                                description: 'We have delivered successful projects for startups that raised millions and enterprises serving millions of users.',
                            },
                            {
                                title: 'Architecture-First Mindset',
                                description: 'Unlike agencies that rush to code, we start with system design. This approach prevents costly rewrites and ensures scalability.',
                            },
                            {
                                title: 'Modern Tech Stack',
                                description: 'We use cutting-edge technologies like Next.js, React, AI/ML frameworks, and cloud-native solutions to build future-proof applications.',
                            },
                            {
                                title: 'Transparent Communication',
                                description: 'No black boxes. You will understand every decision we make and have full visibility into the development process.',
                            },
                        ].map((item, index) => (
                            <ScrollReveal key={item.title} delay={index * 0.1} variant="slideUp">
                                <div className="glass p-5 sm:p-6 md:p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-display mb-2 sm:mb-3 text-cyan-400">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <Section className="py-20">
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
