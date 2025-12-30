'use client';

import { useState, useEffect, useRef } from 'react';
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
        countryCode: '',
        phone: '',
        company: '',
        projectDescription: '',
        budget: '',
        timeline: '',
        // Lead Quality Indicators
        projectType: '',
        industry: '',
        companySize: '',
        decisionMaker: false,
        // Project Context
        projectCategory: '',
        techStack: [] as string[],
        teamSize: '',
        hasExistingSystem: false,
        integrationRequirements: [] as string[],
        complianceNeeds: [] as string[],
        // Communication Preferences
        preferredContactMethod: '',
        preferredContactTime: '',
        communicationLanguage: '',
        newsletterOptIn: false,
        projectUpdatesOptIn: false,
        // Business Context
        businessStage: '',
        fundingStage: '',
        annualRevenue: '',
        competitors: [] as string[],
        painPoints: [] as string[],
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [customBudget, setCustomBudget] = useState('');
    const [scrollDepth, setScrollDepth] = useState(0);
    const [formAbandonmentAttempts, setFormAbandonmentAttempts] = useState(0);

    // Tracking data
    const pageLoadTime = useRef<number>(Date.now());
    const formStartTime = useRef<number | null>(null);
    const maxScrollDepth = useRef<number>(0);

    // Get or create session ID
    const getSessionId = (): string => {
        if (typeof window !== 'undefined') {
            let sid = sessionStorage.getItem('sessionId');
            if (!sid) {
                sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                sessionStorage.setItem('sessionId', sid);
            }
            return sid;
        }
        return '';
    };

    const sessionId = useRef<string>(getSessionId());

    const budgetOptions = [
        { value: 'under-2k', label: 'Under ₹20,000' },
        { value: '2k-5k', label: '₹20,000 - ₹50,000' },
        { value: '5k-10k', label: '₹50,000 - ₹100,000' },
        { value: '10k-30k', label: '₹100,000 - ₹300,000' },
        { value: 'over-30k', label: 'Over ₹300,000' },
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
        
        // Restrict input based on field type
        let processedValue = value;
        
        if (name === 'name') {
            // Only allow letters, spaces, hyphens, and apostrophes
            processedValue = value.replace(/[^a-zA-Z\s\-']/g, '');
        } else if (name === 'phone' || name === 'countryCode') {
            // Only allow numbers
            processedValue = value.replace(/\D/g, '');
        }
        
        setFormData((prev) => ({ ...prev, [name]: processedValue }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    // Track form interaction start and scroll depth
    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!formStartTime.current) {
                formStartTime.current = Date.now();
            }
        };

        // Track when user starts interacting with form
        document.addEventListener('focusin', handleFirstInteraction, { once: true });
        document.addEventListener('click', handleFirstInteraction, { once: true });

        // Track scroll depth
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollPercentage = Math.round((scrollTop / (documentHeight - windowHeight)) * 100);
            maxScrollDepth.current = Math.max(maxScrollDepth.current, scrollPercentage);
            setScrollDepth(maxScrollDepth.current);
        };

        window.addEventListener('scroll', handleScroll);

        // Track form abandonment (when user starts filling but doesn't submit)
        const handleBeforeUnload = () => {
            if (formStartTime.current && !isSubmitted) {
                const attempts = parseInt(sessionStorage.getItem('formAbandonmentAttempts') || '0', 10);
                sessionStorage.setItem('formAbandonmentAttempts', String(attempts + 1));
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener('focusin', handleFirstInteraction);
            document.removeEventListener('click', handleFirstInteraction);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isSubmitted]);

    // Collect device and browser information
    const getDeviceInfo = () => {
        if (typeof window === 'undefined') return {};

        const ua = navigator.userAgent;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
        const isTablet = /iPad|Android/i.test(ua) && !/Mobile/i.test(ua);
        const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';

        return {
            deviceType,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            browserName: getBrowserName(),
            browserVersion: getBrowserVersion(),
            operatingSystem: getOperatingSystem(),
            language: navigator.language || navigator.languages?.[0] || 'en',
            isMobile,
            isTablet,
        };
    };

    const getBrowserName = () => {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    };

    const getBrowserVersion = () => {
        const ua = navigator.userAgent;
        const match = ua.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
        return match ? match[2] : 'Unknown';
    };

    const getOperatingSystem = () => {
        const ua = navigator.userAgent;
        if (ua.includes('Windows')) return 'Windows';
        if (ua.includes('Mac OS')) return 'macOS';
        if (ua.includes('Linux')) return 'Linux';
        if (ua.includes('Android')) return 'Android';
        if (ua.includes('iOS')) return 'iOS';
        return 'Unknown';
    };

    // Get marketing attribution from URL and localStorage
    const getMarketingData = () => {
        if (typeof window === 'undefined') return {};

        const urlParams = new URLSearchParams(window.location.search);
        const landingPage = window.location.href;

        // Get entry point
        let entryPoint = 'direct';
        if (document.referrer) {
            const referrer = new URL(document.referrer);
            if (referrer.hostname !== window.location.hostname) {
                if (referrer.hostname.includes('google')) entryPoint = 'search';
                else if (referrer.hostname.includes('facebook') || referrer.hostname.includes('linkedin')) entryPoint = 'social';
                else entryPoint = 'referral';
            }
        }

        // Get UTM and click IDs from URL
        const gclid = urlParams.get('gclid');
        const fbclid = urlParams.get('fbclid');

        // Store in sessionStorage for persistence
        if (gclid) sessionStorage.setItem('gclid', gclid);
        if (fbclid) sessionStorage.setItem('fbclid', fbclid);

        return {
            landingPage,
            entryPoint,
            utmSource: urlParams.get('utm_source') || null,
            utmMedium: urlParams.get('utm_medium') || null,
            utmCampaign: urlParams.get('utm_campaign') || null,
            campaignId: urlParams.get('campaign_id') || null,
            adGroup: urlParams.get('adgroup') || null,
            keyword: urlParams.get('keyword') || null,
            gclid: gclid || sessionStorage.getItem('gclid') || null,
            fbclid: fbclid || sessionStorage.getItem('fbclid') || null,
            sessionStartTime: new Date(pageLoadTime.current).toISOString(),
        };
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // Name validation - only letters and spaces
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (!/^[a-zA-Z\s\-']+$/.test(formData.name.trim())) {
            newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        // Country code validation - only numbers, 1-4 digits
        if (!formData.countryCode.trim()) {
            newErrors.countryCode = 'Country code is required';
        } else if (!/^\d{1,4}$/.test(formData.countryCode)) {
            newErrors.countryCode = 'Country code must be 1-4 digits';
        }

        // Phone number validation - only numbers, 7-15 digits
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{7,15}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be 7-15 digits';
        }

        // Project description validation
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
        setErrors({}); // Clear previous errors

        try {
            // Calculate tracking metrics
            const timeOnPage = Math.floor((Date.now() - pageLoadTime.current) / 1000);
            const formFillDuration = formStartTime.current
                ? Math.floor((Date.now() - formStartTime.current) / 1000)
                : null;

            // Get page views from sessionStorage
            const pageViews = parseInt(sessionStorage.getItem('pageViews') || '1', 10);
            sessionStorage.setItem('pageViews', String(pageViews + 1));

            // Get visit number and previous visits from localStorage
            const visitNumber = parseInt(localStorage.getItem('visitNumber') || '1', 10);
            const previousVisits = Math.max(0, visitNumber - 1);
            localStorage.setItem('visitNumber', String(visitNumber + 1));

            // Get form abandonment attempts
            const abandonmentAttempts = parseInt(sessionStorage.getItem('formAbandonmentAttempts') || '0', 10);

            // Calculate urgency based on timeline and budget
            const calculateUrgency = (): 'low' | 'medium' | 'high' => {
                const timeline = formData.timeline;
                const budget = formData.budget;

                if (timeline === 'asap' || (timeline === '1-3-months' && (budget === 'over-30k' || budget === '10k-30k'))) {
                    return 'high';
                }
                if (timeline === '1-3-months' || timeline === '3-6-months' || budget === 'over-30k' || budget === '10k-30k') {
                    return 'medium';
                }
                return 'low';
            };

            // Collect all tracking data
            const deviceInfo = getDeviceInfo();
            const marketingData = getMarketingData();

            // Prepare data for API
            // Send country code and phone number separately
            const payload = {
                // Required fields
                name: formData.name.trim(),
                email: formData.email.trim(),
                countryCode: formData.countryCode.trim(),
                phone: formData.phone.trim(), // Phone number without country code
                projectDescription: formData.projectDescription.trim(),

                // Optional form fields
                company: formData.company.trim() || undefined,
                budget: formData.budget || undefined,
                timeline: formData.timeline || undefined,
                customBudget: formData.budget === 'custom' ? customBudget : undefined,

                // User Behavior
                timeOnPage,
                formFillDuration,
                pageViews,
                scrollDepth: maxScrollDepth.current,
                formAbandonmentAttempts: abandonmentAttempts,
                sessionId: sessionId.current,
                visitNumber,
                previousVisits,

                // Device & Browser
                ...deviceInfo,

                // Marketing & Attribution
                ...marketingData,

                // Lead Quality Indicators
                projectType: formData.projectType || undefined,
                industry: formData.industry || undefined,
                companySize: formData.companySize || undefined,
                decisionMaker: formData.decisionMaker || undefined,
                urgency: calculateUrgency(),

                // Project Context
                projectCategory: formData.projectCategory || undefined,
                techStack: formData.techStack.length > 0 ? formData.techStack : undefined,
                teamSize: formData.teamSize ? parseInt(formData.teamSize, 10) : undefined,
                hasExistingSystem: formData.hasExistingSystem || undefined,
                integrationRequirements: formData.integrationRequirements.length > 0 ? formData.integrationRequirements : undefined,
                complianceNeeds: formData.complianceNeeds.length > 0 ? formData.complianceNeeds : undefined,

                // Communication Preferences
                preferredContactMethod: formData.preferredContactMethod || undefined,
                preferredContactTime: formData.preferredContactTime || undefined,
                communicationLanguage: formData.communicationLanguage || undefined,
                newsletterOptIn: formData.newsletterOptIn || undefined,
                projectUpdatesOptIn: formData.projectUpdatesOptIn || undefined,

                // Business Context
                businessStage: formData.businessStage || undefined,
                fundingStage: formData.fundingStage || undefined,
                annualRevenue: formData.annualRevenue || undefined,
                competitors: formData.competitors.length > 0 ? formData.competitors : undefined,
                painPoints: formData.painPoints.length > 0 ? formData.painPoints : undefined,
            };

            // Call API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle validation errors
                if (data.errors && Array.isArray(data.errors)) {
                    const newErrors: Record<string, string> = {};
                    data.errors.forEach((error: { field: string; message: string }) => {
                        newErrors[error.field] = error.message;
                    });
                    setErrors(newErrors);
                    setIsSubmitting(false);
                    return;
                }
                
                // Handle backend connection errors with helpful message
                if (data.error === 'BACKEND_CONNECTION_ERROR') {
                    const troubleshooting = data.troubleshooting || [];
                    const fullMessage = data.message + (troubleshooting.length > 0 
                        ? '\n\n' + troubleshooting.join('\n')
                        : '');
                    throw new Error(fullMessage);
                }
                
                throw new Error(data.message || 'Failed to submit form');
            }

            // Success
            setIsSubmitted(true);

            // Reset form
            setFormData({
                name: '',
                email: '',
                countryCode: '',
                phone: '',
                company: '',
                projectDescription: '',
                budget: '',
                timeline: '',
                projectType: '',
                industry: '',
                companySize: '',
                decisionMaker: false,
                projectCategory: '',
                techStack: [],
                teamSize: '',
                hasExistingSystem: false,
                integrationRequirements: [],
                complianceNeeds: [],
                preferredContactMethod: '',
                preferredContactTime: '',
                communicationLanguage: '',
                newsletterOptIn: false,
                projectUpdatesOptIn: false,
                businessStage: '',
                fundingStage: '',
                annualRevenue: '',
                competitors: [],
                painPoints: [],
            });
            setCustomBudget('');
            setScrollDepth(0);
        } catch (error) {
            console.error('Form submission error:', error);
            setErrors({
                submit: error instanceof Error ? error.message : 'An error occurred. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
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
                                    {/* <div>
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
                                    </div> */}
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
                                                    helperText="Only letters, spaces, hyphens, and apostrophes allowed"
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

                                            {/* Phone Number Field - Grouped Design */}
                                            <div className="space-y-2">
                                                <label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'}`}>
                                                    Phone Number <span className="text-red-400">*</span>
                                                </label>
                                                <div className="flex items-start gap-2">
                                                    {/* Country Code - Compact */}
                                                    <div className="w-20 flex-shrink-0">
                                                        <motion.input
                                                            name="countryCode"
                                                            type="tel"
                                                            value={formData.countryCode}
                                                            onChange={handleChange}
                                                            placeholder="+91"
                                                            maxLength={4}
                                                            whileFocus={{ scale: 1.02 }}
                                                            className={`
                                                                w-full px-2.5 py-3 rounded-lg
                                                                glass border ${errors.countryCode ? 'border-red-500' : 'border-gray-700'}
                                                                bg-gray-900/50 ${theme === 'light' ? 'text-gray-900' : 'text-white'}
                                                                placeholder:text-gray-500
                                                                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                                                                transition-all duration-200
                                                                text-center text-sm font-semibold
                                                            `}
                                                        />
                                                    </div>
                                                    {/* Phone Number - Main Field */}
                                                    <div className="flex-1">
                                                        <motion.input
                                                            name="phone"
                                                            type="tel"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            placeholder="9876543210"
                                                            maxLength={15}
                                                            whileFocus={{ scale: 1.01 }}
                                                            className={`
                                                                w-full px-4 py-3 rounded-lg
                                                                glass border ${errors.phone ? 'border-red-500' : 'border-gray-700'}
                                                                bg-gray-900/50 ${theme === 'light' ? 'text-gray-900' : 'text-white'}
                                                                placeholder:text-gray-500
                                                                focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                                                                transition-all duration-200
                                                            `}
                                                        />
                                                    </div>
                                                </div>
                                                {/* Error Messages and Helper Text */}
                                                <div className="flex items-start gap-2">
                                                    <div className="w-20 flex-shrink-0">
                                                        {errors.countryCode && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-xs text-red-400"
                                                            >
                                                                {errors.countryCode}
                                                            </motion.p>
                                                        )}
                                                        {!errors.countryCode && !errors.phone && (
                                                            <p className="text-xs text-gray-400">Code</p>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        {errors.phone && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-xs text-red-400"
                                                            >
                                                                {errors.phone}
                                                            </motion.p>
                                                        )}
                                                        {!errors.phone && !errors.countryCode && (
                                                            <p className="text-xs text-gray-400">Enter your phone number (7-15 digits)</p>
                                                        )}
                                                    </div>
                                                </div>
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
                                                                onChange={(e) => {
                                                                    // Only allow numbers
                                                                    const numbersOnly = e.target.value.replace(/\D/g, '');
                                                                    setCustomBudget(numbersOnly);
                                                                }}
                                                                placeholder="Enter amount in ₹"
                                                                helperText="Numbers only"
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

                                            {errors.submit && (
                                                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm whitespace-pre-line">
                                                    {errors.submit}
                                                </div>
                                            )}
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
            {/* <Section className="py-20">
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
            </Section> */}
        </>
    );
}
