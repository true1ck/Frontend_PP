'use client';

import Link from 'next/link';
import { Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { LinkedInIcon, WhatsAppIcon } from './icons/BrandIcons';
import RegionCopy from './RegionCopy';

const linkGroups = [
    {
        heading: 'Services',
        links: [
            { label: 'WhatsApp AI Bots', foreignLabel: 'AI Chat Automation', href: '/services#whatsapp-ai-bot' },
            { label: 'RAG Knowledge Systems', href: '/services#rag-knowledge-system' },
            { label: 'Full AI Product Builds', href: '/services#full-ai-product-build' },
            { label: 'AI Business Audit', href: '/services#ai-business-audit' },
        ],
    },
    {
        heading: 'Company',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Case Studies', href: '/case-studies' },
            { label: 'Process & Tech', href: '/process-tech' },
            { label: 'Careers', href: '/careers' },
            { label: 'Technical Co-Founder', href: '/co-founder' },
        ],
    },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative z-10 mt-8 border-t border-[rgb(var(--border))] bg-[var(--bg-subtle)]">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-8">
                    {/* Brand + positioning */}
                    <div className="col-span-2 lg:col-span-4">
                        <Link href="/" className="inline-flex items-center gap-2.5" aria-label="PandaPath — home">
                            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[rgb(var(--border-strong))]">
                                <img src="/images/logo.png" alt="PandaPath logo" className="h-full w-full object-cover" width={44} height={44} />
                            </span>
                            <span className="text-xl font-bold font-display tracking-tight">
                                <span className="text-body">Panda</span>
                                <span className="text-brand">Path</span>
                            </span>
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
                            An AI product studio in Bangalore. We build WhatsApp bots, RAG systems
                            and full-stack AI products for Indian startups — fixed price, live in
                            2–4 weeks, straight from the developer who builds it.
                        </p>

                        <div className="mt-5 flex items-center gap-2">
                            <a
                                href="https://www.linkedin.com/in/pandapaths/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] text-muted transition-colors hover:border-[var(--brand)] hover:text-brand"
                                aria-label="PandaPath on LinkedIn"
                            >
                                <LinkedInIcon size={18} />
                            </a>
                            <a
                                href="https://wa.me/917411147986"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] text-muted transition-colors hover:border-[#25D366] hover:text-[#25D366]"
                                aria-label="Message PandaPath on WhatsApp"
                            >
                                <WhatsAppIcon size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {linkGroups.map((group) => (
                        <nav key={group.heading} className="lg:col-span-2" aria-label={group.heading}>
                            <h2 className="text-sm font-semibold text-body">{group.heading}</h2>
                            <ul className="mt-4 space-y-2.5">
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted transition-colors hover:text-brand"
                                        >
                                            {'foreignLabel' in link && link.foreignLabel ? (
                                                <RegionCopy in={link.label} foreign={link.foreignLabel} />
                                            ) : (
                                                link.label
                                            )}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    ))}

                    {/* Contact */}
                    <div className="col-span-2 lg:col-span-4">
                        <h2 className="text-sm font-semibold text-body">Get in touch</h2>
                        <ul className="mt-4 space-y-3 text-sm text-muted">
                            <li>
                                <a
                                    href="mailto:contactpanda@pandapath.in"
                                    className="inline-flex items-start gap-2.5 transition-colors hover:text-brand"
                                >
                                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                                    contactpanda@pandapath.in
                                </a>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                                <span>Bangalore, Karnataka, India</span>
                            </li>
                            <li className="flex items-start gap-2.5">
                                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                                <span>Mon–Fri, 9:00–19:00 IST</span>
                            </li>
                        </ul>

                        <Link
                            href="/contact"
                            className="group mt-5 inline-flex items-center gap-1.5 rounded-full border border-[rgb(var(--border-strong))] px-4 py-2.5 text-sm font-semibold text-body transition-colors hover:border-[var(--brand)] hover:text-brand"
                        >
                            Start a project
                            <ArrowUpRight
                                className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                aria-hidden="true"
                            />
                        </Link>
                    </div>
                </div>

                {/* pr on the last row keeps the copy clear of the floating
                    WhatsApp button, which is fixed over this corner. */}
                <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[rgb(var(--border))] pt-6 pb-16 text-xs text-subtle sm:flex-row sm:pb-4 sm:pr-20">
                    <p>&copy; {currentYear} PandaPath. All rights reserved.</p>
                    <p>Built in Bangalore · Serving startups across India</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
