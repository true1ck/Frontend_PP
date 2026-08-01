'use client';

import { useState, useEffect, useRef } from 'react';
import Section from '@/components/Section';
import ScrollReveal from '@/components/ScrollReveal';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Check, ArrowRight, AlertCircle } from 'lucide-react';
import { WhatsAppIcon, LinkedInIcon } from '@/components/icons/BrandIcons';
import { BACKEND_URL } from '@/lib/config';
import { SITE } from '@/lib/content';

const WHATSAPP_URL = SITE.whatsapp;

const contactChannels = [
    { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, external: false },
    { icon: WhatsAppIcon, label: 'WhatsApp', value: 'Message us directly', href: WHATSAPP_URL, external: true },
    { icon: LinkedInIcon, label: 'LinkedIn', value: 'linkedin.com/in/pandapaths', href: 'https://www.linkedin.com/in/pandapaths/', external: true },
    { icon: MapPin, label: 'Location', value: 'Bangalore, Karnataka, India', href: null, external: false },
    { icon: Clock, label: 'Hours', value: 'Mon–Fri, 9:00–19:00 IST', href: null, external: false },
] as const;

const nextSteps = [
    'We read it ourselves — no bot, no intake team.',
    'You get a reply within one business day, usually sooner.',
    'A 20-minute call to scope the problem properly.',
    'A fixed quote and a delivery date, in writing.',
];

export default function ContactPage() {
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

            // Combine country code and phone number
            const fullPhoneNumber = formData.countryCode.trim()
                ? `+${formData.countryCode.trim()}${formData.phone.trim()}`
                : formData.phone.trim();

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

            // Call backend API directly (static export doesn't support API routes)
            const response = await fetch(`${BACKEND_URL}/api/contact`, {
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
            <Section size="hero" aura>
                <div className="mx-auto max-w-3xl text-center">
                    <ScrollReveal variant="fadeIn">
                        <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-brand">
                            Contact
                        </p>
                        <h1 className="text-display-xl font-bold font-display text-balance">
                            <span className="text-gradient">Tell us what</span>{' '}
                            <span className="text-body">you&apos;re building</span>
                        </h1>
                    </ScrollReveal>
                    <ScrollReveal delay={0.15}>
                        <p className="mx-auto mt-6 max-w-2xl text-lead text-muted text-pretty">
                            Book a free 20-minute call. Describe the problem and you&apos;ll get an
                            honest answer on whether we can ship it in 2–4 weeks and what it costs.
                            No pitch deck, no pressure.
                        </p>
                    </ScrollReveal>
                </div>
            </Section>

            <Section size="sm">
                <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
                    {/* Contact details */}
                    <div className="lg:col-span-2">
                        <ScrollReveal variant="slideRight">
                            <div className="space-y-3">
                                {contactChannels.map((channel) => {
                                    const Icon = channel.icon;
                                    const body = (
                                        <>
                                            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-brand">
                                                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-xs uppercase tracking-wider text-subtle">
                                                    {channel.label}
                                                </span>
                                                <span className="mt-0.5 block truncate text-sm font-medium text-body">
                                                    {channel.value}
                                                </span>
                                            </span>
                                        </>
                                    );

                                    return channel.href ? (
                                        <a
                                            key={channel.label}
                                            href={channel.href}
                                            target={channel.external ? '_blank' : undefined}
                                            rel={channel.external ? 'noopener noreferrer' : undefined}
                                            className="glass card-interactive flex items-center gap-3.5 rounded-xl p-4"
                                        >
                                            {body}
                                        </a>
                                    ) : (
                                        <div key={channel.label} className="glass flex items-center gap-3.5 rounded-xl p-4">
                                            {body}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="glass mt-6 rounded-card p-6">
                                <h2 className="text-base font-semibold font-display text-body">
                                    What happens next
                                </h2>
                                <ol className="mt-4 space-y-3">
                                    {nextSteps.map((step, i) => (
                                        <li key={step} className="flex gap-3 text-sm text-muted">
                                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgb(var(--border-strong))] font-mono text-[0.65rem] text-brand tabular">
                                                {i + 1}
                                            </span>
                                            <span className="leading-relaxed">{step}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        <ScrollReveal variant="slideLeft">
                            <div className="glass rounded-card p-6 sm:p-8 lg:p-10">
                                {isSubmitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.96 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="py-10 text-center"
                                        role="status"
                                        aria-live="polite"
                                    >
                                        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400">
                                            <Check className="h-8 w-8" strokeWidth={2.5} aria-hidden="true" />
                                        </span>
                                        <h2 className="mt-6 text-title font-bold font-display text-body">
                                            Message sent
                                        </h2>
                                        <p className="mx-auto mt-3 max-w-md text-muted">
                                            Thanks for reaching out — you&apos;ll hear back within one
                                            business day. If it&apos;s urgent, WhatsApp is faster.
                                        </p>
                                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                            <button
                                                onClick={() => setIsSubmitted(false)}
                                                className="min-h-[48px] rounded-full border border-[rgb(var(--border-strong))] px-6 font-semibold text-body transition-colors hover:border-[var(--brand)] hover:text-brand"
                                            >
                                                Send another message
                                            </button>
                                            <a
                                                href={WHATSAPP_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-[#25D366] px-6 font-semibold text-[#04231a] transition-transform active:scale-[0.98]"
                                            >
                                                <WhatsAppIcon size={16} />
                                                WhatsApp us
                                            </a>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                        <div>
                                            <h2 className="text-title font-bold font-display text-body">
                                                Start the conversation
                                            </h2>
                                            <p className="mt-2 text-sm text-muted">
                                                Three fields. That&apos;s genuinely all we need to give
                                                you a useful first answer.
                                            </p>
                                        </div>

                                        <Input
                                            label="Your name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            error={errors.name}
                                            required
                                            autoComplete="name"
                                            placeholder="e.g. Rahul Sharma"
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            error={errors.email}
                                            required
                                            autoComplete="email"
                                            inputMode="email"
                                            placeholder="rahul@yourstartup.in"
                                        />
                                        <Textarea
                                            label="What do you want to build?"
                                            name="projectDescription"
                                            value={formData.projectDescription}
                                            onChange={handleChange}
                                            error={errors.projectDescription}
                                            required
                                            rows={5}
                                            maxLength={500}
                                            showCharCount
                                            placeholder="e.g. A WhatsApp bot for my D2C brand that answers product and sizing questions automatically..."
                                        />

                                        {errors.submit && (
                                            <div
                                                role="alert"
                                                aria-live="assertive"
                                                className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-400"
                                            >
                                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                                                <span className="whitespace-pre-line">{errors.submit}</span>
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,#2563eb,#0891b2_55%,#7c3aed)] px-8 text-base font-semibold text-white shadow-[0_8px_28px_-8px_rgb(37_99_235/0.65)] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                                    </svg>
                                                    Sending…
                                                </>
                                            ) : (
                                                <>
                                                    Send message
                                                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                                </>
                                            )}
                                        </button>

                                        <p className="text-center text-sm text-subtle">
                                            Prefer a quick chat?{' '}
                                            <a
                                                href={WHATSAPP_URL}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-semibold text-brand underline underline-offset-4"
                                            >
                                                Message us on WhatsApp
                                            </a>
                                        </p>
                                    </form>
                                )}
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </Section>
        </>
    );
}
