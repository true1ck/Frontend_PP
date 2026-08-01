import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/seo';
import { SITE } from '@/lib/content';

/**
 * The contact page itself must stay a client component (form state), and a
 * client component can't export `metadata` — so the route's SEO lives here
 * in the layout instead.
 */
export const metadata: Metadata = {
    title: 'Contact PandaPath — Book a Free AI Consultation in Bangalore',
    description:
        'Talk to the developer who will build your project. Book a free 20-minute call to scope your WhatsApp AI bot, RAG system or AI product — fixed quote and delivery date, no obligation.',
    alternates: { canonical: '/contact' },
    openGraph: {
        title: 'Contact PandaPath — Book a Free 20-Minute AI Consultation',
        description:
            'Describe your project and get an honest answer on scope, cost and timeline. Bangalore-based, replies within one business day.',
        url: `${SITE.url}/contact`,
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <JsonLd data={breadcrumbSchema([{ name: 'Contact', path: '/contact' }])} />
            {children}
        </>
    );
}
