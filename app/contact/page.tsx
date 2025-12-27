'use client';

import { useState } from 'react';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

export default function ContactPage() {
    const { theme } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        projectDescription: '',
        budget: '',
        timeline: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [customBudget, setCustomBudget] = useState('');

    const budgetOptions = [
        { value: 'under-2l', label: 'Under ₹2,00,000' },
        { value: '2l-5l', label: '₹2,00,000 - ₹5,00,000' },
        { value: '5l-10l', label: '₹5,00,000 - ₹10,00,000' },
        { value: '10l-20l', label: '₹10,00,000 - ₹20,00,000' },
        { value: 'over-20l', label: 'Over ₹20,00,000' },
        { value: 'custom', label: 'Custom' },
    ];

    const timelineOptions = [
        { value: 'asap', label: 'ASAP' },
        { value: '1-3-months', label: '1-3 months' },
        { value: '3-6-months', label: '3-6 months' },
        { value: '6-12-months', label: '6-12 months' },
        { value: 'flexible', label: 'Flexible' },
    ];

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.projectDescription.trim()) {
            newErrors.projectDescription = 'Project description is required';
        } else if (formData.projectDescription.length < 20) {
            newErrors.projectDescription = 'Please provide more details (minimum 20 characters)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form
        setFormData({
            name: '',
            email: '',
            company: '',
            projectDescription: '',
            budget: '',
            timeline: '',
        });
    };

    return (
        <>
            {/* Hero */}
            <Section className="pt-32 pb-20">
                <div className="max-w-4xl mx-auto text-center">
                    <ScrollReveal variant="fadeIn">
                        <h1 className="text-5xl md:text-7xl font-bold font-display mb-6 bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                            Let&apos;s Build Something Amazing
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.2}>
                        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                            Tell us about your project and we&apos;ll get back to you within 24 hours.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            {/* Contact Form & Info */}
            <Section className="py-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <ScrollReveal variant="slideRight">
                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-2xl font-bold font-display mb-6 text-blue-400">
                                            Get in Touch
                                        </h2>
                                        <p className="text-gray-300 leading-relaxed mb-8">
                                            Whether you have a project in mind or just want to chat about technology, we&apos;d love to hear from you.
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="glass p-4 rounded-xl border border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📧</div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Email</div>
                                                    <div className="text-cyan-400 font-semibold">
                                                        contactpanda@pandapath.in
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="glass p-4 rounded-xl border border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">📍</div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Location</div>
                                                    <div className="text-gray-300">
                                                        Panaji Goa, India
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="glass p-4 rounded-xl border border-gray-700">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">🕐</div>
                                                <div>
                                                    <div className="text-sm text-gray-400">Hours</div>
                                                    <div className="text-gray-300">
                                                        Mon-Fri: 9AM - 6PM PST
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div>
                                        <div className="text-sm text-gray-400 mb-3">Follow Us</div>
                                        <div className="flex gap-3">
                                            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
                                                <a
                                                    key={social}
                                                    href="#"
                                                    className={`glass px-4 py-2 rounded-lg border border-gray-700 hover:border-blue-500/50 text-sm ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'} hover:text-blue-400 transition-all duration-300`}
                                                >
                                                    {social}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <ScrollReveal variant="slideLeft">
                                <div className="glass p-8 md:p-12 rounded-2xl border border-gray-700">
                                    {isSubmitted ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="text-center py-12"
                                        >
                                            <div className="text-6xl mb-6">✓</div>
                                            <h3 className="text-3xl font-bold font-display mb-4 text-green-400">
                                                Message Sent!
                                            </h3>
                                            <p className="text-xl text-gray-300 mb-8">
                                                Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                                            </p>
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold neon-glow hover:shadow-xl transition-shadow"
                                            >
                                                Send Another Message
                                            </button>
                                        </motion.div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <Input
                                                    label="Name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    error={errors.name}
                                                    required
                                                    placeholder="John Doe"
                                                />
                                                <Input
                                                    label="Email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    error={errors.email}
                                                    required
                                                    placeholder="john@company.com"
                                                />
                                            </div>

                                            <Input
                                                label="Company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                placeholder="Your Company Name (Optional)"
                                            />

                                            <Textarea
                                                label="Project Description"
                                                name="projectDescription"
                                                value={formData.projectDescription}
                                                onChange={handleChange}
                                                error={errors.projectDescription}
                                                required
                                                rows={5}
                                                maxLength={1000}
                                                showCharCount
                                                placeholder="Tell us about your project, goals, and any specific requirements..."
                                            />

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div>
                                                    <Select
                                                        label="Budget Range"
                                                        name="budget"
                                                        value={formData.budget}
                                                        onChange={handleChange}
                                                        options={budgetOptions}
                                                    />
                                                    {formData.budget === 'custom' && (
                                                        <div className="mt-4">
                                                            <Input
                                                                label="Custom Budget Amount"
                                                                name="customBudget"
                                                                type="text"
                                                                value={customBudget}
                                                                onChange={(e) => setCustomBudget(e.target.value)}
                                                                placeholder="Enter amount in ₹"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                                <Select
                                                    label="Timeline"
                                                    name="timeline"
                                                    value={formData.timeline}
                                                    onChange={handleChange}
                                                    options={timelineOptions}
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                disabled={isSubmitting}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-semibold text-lg neon-glow hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? 'Sending...' : 'Send Message'}
                                            </motion.button>
                                        </form>
                                    )}
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </Section>

            {/* Map Placeholder */}
            <Section className="py-20">
                <ScrollReveal variant="fadeIn">
                    <div className="max-w-7xl mx-auto">
                        <div className="glass rounded-2xl border border-gray-700 overflow-hidden h-96 flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-4">🗺️</div>
                                <p className="text-gray-400">Map Integration Placeholder</p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Panaji Goa, India
                                </p>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </Section>
        </>
    );
}
