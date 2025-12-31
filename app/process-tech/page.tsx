import type { Metadata } from 'next';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import ProcessTimeline from '@/components/ProcessTimeline';
import TechGrid from '@/components/TechGrid';

export const metadata: Metadata = {
    title: 'Our Process & Technology Stack - PandaPaths',
    description: 'Discover our proven development process and the cutting-edge technologies we use to build world-class software.',
};

export default function ProcessTechPage() {
    return (
        <>
            {/* Hero */}
            <Section className="!pt-32 md:!pt-30 lg:!pt-40 !pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight pb-2 mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            Process & Technology
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                            A proven methodology combined with cutting-edge technology to deliver exceptional results.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Process Section */}
            <Section className="py-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Our Development Process
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                We follow a structured, iterative approach that ensures quality, transparency, and timely delivery.
                            </p>
                        </div>
                    </ScrollReveal>

                    <ProcessTimeline />
                </div>
            </Section>

            {/* Methodology */}
            <Section className="py-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 text-purple-400">
                            Our Methodology
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: '🎯',
                                title: 'Agile Development',
                                description: 'Iterative sprints with regular demos and feedback loops to ensure alignment with your vision.',
                            },
                            {
                                icon: '🔒',
                                title: 'Quality Assurance',
                                description: 'Comprehensive testing at every stage, from unit tests to end-to-end integration testing.',
                            },
                            {
                                icon: '📊',
                                title: 'Transparent Reporting',
                                description: 'Regular updates, sprint reviews, and full visibility into development progress.',
                            },
                        ].map((item, index) => (
                            <ScrollReveal key={item.title} delay={index * 0.1} variant="slideUp">
                                <div className="glass p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300 text-center">
                                    <div className="text-5xl mb-4">{item.icon}</div>
                                    <h3 className="text-xl font-bold font-display mb-3 text-blue-400">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* Technology Stack */}
            <Section className="py-8">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Technology Stack
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                We leverage the best tools and frameworks to build scalable, performant, and maintainable solutions.
                            </p>
                        </div>
                    </ScrollReveal>

                    <TechGrid />
                </div>
            </Section>

            {/* Why Our Stack */}
            <Section className="py-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 text-cyan-400">
                            Why These Technologies?
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-6">
                        {[
                            {
                                title: 'Battle-Tested & Production-Ready',
                                description: 'Every technology in our stack is proven at scale by companies like Netflix, Airbnb, and Uber.',
                            },
                            {
                                title: 'Strong Community Support',
                                description: 'Large, active communities mean better documentation, more libraries, and faster problem-solving.',
                            },
                            {
                                title: 'Future-Proof',
                                description: 'We choose technologies with strong roadmaps and backing from major tech companies.',
                            },
                            {
                                title: 'Developer Experience',
                                description: 'Modern tooling and great DX means faster development and fewer bugs.',
                            },
                            {
                                title: 'Performance & Scalability',
                                description: 'Our stack is optimized for both developer productivity and application performance.',
                            },
                        ].map((item, index) => (
                            <ScrollReveal key={item.title} delay={index * 0.1} variant="slideUp">
                                <div className="glass p-6 md:p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                                    <h3 className="text-xl md:text-2xl font-bold font-display mb-3 text-blue-400">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* CTA */}
            <Section className="py-8">
                <ScrollReveal variant="scale">
                    <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl border border-gray-700">
                        <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                            Ready to Experience Our Process?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Let&apos;s start building your next great product together.
                        </p>
                        <a
                            href="/contact"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg neon-glow hover:shadow-xl transition-shadow"
                        >
                            Get Started
                        </a>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
