'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import Input from '@/components/ui/Input';
import Button from '@/components/Button';


export default function CareersPage() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setEmail('');
    };

    return (
        <>
            {/* Hero */}
            <Section className="!pt-32 md:!pt-30 lg:!pt-40 !pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-5xl md:text-7xl font-bold font-display leading-tight pb-2 mb-8 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            Join Our Team
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                            Build the future with a team of passionate engineers who value excellence, innovation, and continuous growth.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Culture */}
            <Section className="py-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-4xl md:text-5xl font-bold font-display text-center mb-16 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            Our Culture
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: '🚀',
                                title: 'Innovation First',
                                description: 'We encourage experimentation and give you the freedom to explore new technologies and approaches.',
                            },
                            {
                                icon: '🎓',
                                title: 'Continuous Learning',
                                description: 'Annual learning budget, conference tickets, and dedicated time for skill development.',
                            },
                            {
                                icon: '🤝',
                                title: 'Collaborative Environment',
                                description: 'Work with talented engineers who are eager to share knowledge and grow together.',
                            },
                            {
                                icon: '⚖️',
                                title: 'Work-Life Balance',
                                description: 'Flexible hours, remote work options, and a culture that respects your personal time.',
                            },
                        ].map((item, index) => (
                            <ScrollReveal key={item.title} delay={index * 0.1} variant="slideUp">
                                <div className="glass p-8 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
                                    <div className="text-5xl mb-4">{item.icon}</div>
                                    <h3 className="text-2xl font-bold font-display mb-3 text-blue-400">
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

            {/* Benefits */}
            <Section className="py-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 text-purple-400">
                            Benefits & Perks
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            '💰 Competitive Salary',
                            '🏥 Health Insurance',
                            '🏖️ Unlimited PTO',
                            '💻 Latest Equipment',
                            '📚 Learning Budget',
                            '🎯 Equity Options',
                            '🏠 Remote Work',
                            '🎉 Team Events',
                            '☕ Free Snacks & Coffee',
                        ].map((benefit, index) => (
                            <ScrollReveal key={benefit} delay={index * 0.05} variant="scale">
                                <div className="glass p-4 rounded-lg border border-gray-700 text-center text-gray-300 hover:border-blue-500/50 transition-all duration-300">
                                    {benefit}
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </Section>

            {/* What We Look For */}
            <Section className="py-8">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal variant="fadeIn">
                        <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 text-cyan-400">
                            What We Look For
                        </h2>
                    </ScrollReveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: 'Technical Excellence',
                                description: 'Strong fundamentals in computer science and a passion for writing clean, maintainable code.',
                            },
                            {
                                title: 'Problem Solving',
                                description: 'Ability to break down complex problems and design elegant solutions.',
                            },
                            {
                                title: 'Growth Mindset',
                                description: 'Eagerness to learn, adapt, and continuously improve your skills.',
                            },
                            {
                                title: 'Team Player',
                                description: 'Strong communication skills and ability to collaborate effectively.',
                            },
                            {
                                title: 'Ownership',
                                description: 'Take responsibility for your work and see projects through to completion.',
                            },
                            {
                                title: 'User Focus',
                                description: 'Understanding that great engineering serves real user needs.',
                            },
                        ].map((item, index) => (
                            <ScrollReveal key={item.title} delay={index * 0.1} variant="slideUp">
                                <div className="glass p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
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

            {/* Current Openings */}
            <Section className="py-8">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal variant="scale">
                        <div className="glass p-12 rounded-2xl border border-gray-700 text-center">
                            <div className="text-6xl mb-6">🔔</div>
                            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                                Future Openings Coming Soon
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                We&apos;re always looking for exceptional engineers. Sign up to be notified when we have openings that match your skills.
                            </p>

                            {isSubmitted ? (
                                <div className="glass p-6 rounded-xl border border-green-500/50 bg-green-900/20">
                                    <p className="text-green-400 text-lg">
                                        ✓ Thanks! We&apos;ll notify you when positions open up.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                                    <div className="flex gap-3">
                                        <Input
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="flex-1"
                                        />
                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Subscribing...' : 'Notify Me'}
                                        </Button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>
                </div>
            </Section>
        </>
    );
}
