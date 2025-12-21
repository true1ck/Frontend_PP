'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import CaseStudyCard from '@/components/CaseStudyCard';


// Sample case studies data
const caseStudies = [
    {
        slug: 'ai-powered-analytics-platform',
        title: 'AI-Powered Analytics Platform',
        client: 'TechCorp Inc.',
        description: 'Built a real-time analytics platform processing millions of events daily with AI-driven insights and predictive modeling.',
        technologies: ['Next.js', 'Python', 'TensorFlow', 'AWS', 'PostgreSQL'],
        category: 'AI',
        image: '/images/Ai powered analysis platform.png',
    },
    {
        slug: 'mobile-banking-app',
        title: 'Mobile Banking Application',
        client: 'FinanceFlow',
        description: 'Developed a secure, user-friendly mobile banking app with biometric authentication and real-time transaction processing.',
        technologies: ['React Native', 'Node.js', 'MongoDB', 'AWS'],
        category: 'Mobile',
        image: '/images/mobile-banking-app.jpg',
    },
    {
        slug: 'ecommerce-marketplace',
        title: 'E-Commerce Marketplace',
        client: 'ShopHub',
        description: 'Created a scalable multi-vendor marketplace with advanced search, payment processing, and inventory management.',
        technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Stripe', 'Redis'],
        category: 'Web',
        image: '/images/E commerce Makrketplace.png',
    },
    {
        slug: 'cloud-migration-project',
        title: 'Enterprise Cloud Migration',
        client: 'GlobalTech Solutions',
        description: 'Migrated legacy on-premise infrastructure to AWS with zero downtime, reducing costs by 40% and improving performance.',
        technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        category: 'Cloud',
        image: '/images/Enterprise Cloud Migration.png',
    },
    {
        slug: 'healthcare-management-system',
        title: 'Healthcare Management System',
        client: 'MediCare Plus',
        description: 'Built HIPAA-compliant patient management system with telemedicine capabilities and electronic health records.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'WebRTC', 'AWS'],
        category: 'Web',
        image: '/images/HealthCare Management System.png',
    },
    {
        slug: 'iot-monitoring-dashboard',
        title: 'IoT Monitoring Dashboard',
        client: 'SmartFactory',
        description: 'Developed real-time IoT monitoring dashboard for manufacturing with predictive maintenance alerts.',
        technologies: ['React', 'Python', 'InfluxDB', 'MQTT', 'GCP'],
        category: 'AI',
        image: '/images/IOT marketing Platform.png',
    },
];

const categories = ['All', 'Web', 'Mobile', 'AI', 'Cloud'];

export default function CaseStudiesPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredCaseStudies = activeCategory === 'All'
        ? caseStudies
        : caseStudies.filter((study) => study.category === activeCategory);

    return (
        <>
            {/* Hero Section */}
            <Section className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            Case Studies
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                            Real projects, real results. See how we've helped businesses transform their digital presence.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Category Filter */}
            <Section className="py-10">
                <ScrollReveal variant="fadeIn">
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${activeCategory === category
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white neon-glow'
                                    : 'glass border border-gray-700 text-gray-300 hover:border-blue-500/50'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </ScrollReveal>
            </Section>

            {/* Case Studies Grid */}
            <Section className="py-10 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCaseStudies.map((study, index) => (
                            <div key={study.slug}>
                                <CaseStudyCard {...study} />
                            </div>
                        ))}
                    </div>

                    {filteredCaseStudies.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">
                                No case studies found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </Section>

            {/* CTA */}
            <Section className="py-20">
                <ScrollReveal variant="scale">
                    <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl border border-gray-700">
                        <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                            Ready to Create Your Success Story?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Let's discuss how we can help you achieve similar results.
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
