import { SITE, services, faqs, caseStudies } from './content';

/**
 * Structured-data builders.
 *
 * Everything reads from lib/content.ts, so the prices and timelines Google
 * indexes are literally the same strings rendered on the page. Mismatched
 * schema is a manual-action risk, not just an inaccuracy.
 */

const ORG_ID = `${SITE.url}/#organization`;
const SITE_ID = `${SITE.url}/#website`;

/**
 * Social share image, referenced explicitly on every page.
 *
 * This used to be the `opengraph-image.tsx` file-convention route. Two bugs
 * with that approach: (1) under `output: 'export'`, Next writes it to a file
 * with no extension, so nginx serves it with no Content-Type header at all —
 * WhatsApp/LinkedIn/Slack scrapers can silently refuse to render it; (2) any
 * page that declares its own `openGraph` object (about, services,
 * case-studies, contact, process-tech) replaces the inherited object
 * wholesale and loses the auto-injected image, so those pages shared with
 * zero image. A static PNG under /public with a real extension plus an
 * explicit `images` array on every page's metadata sidesteps both.
 */
export const OG_IMAGE = {
    url: `${SITE.url}/images/og-cover.png`,
    width: 1200,
    height: 630,
    alt: 'PandaPath — AI products for Indian startups, shipped in weeks.',
};

/**
 * Same "replaces wholesale" problem as OG_IMAGE above, but for og:type,
 * og:locale and og:site_name: any page with its own `openGraph` object drops
 * these unless it redeclares them. Spread this into every page's openGraph.
 */
export const OG_DEFAULTS = {
    type: 'website' as const,
    locale: 'en_IN',
    siteName: 'PandaPath',
};

export const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE.name,
    alternateName: 'PandaPath AI Studio',
    url: SITE.url,
    logo: {
        '@type': 'ImageObject',
        url: `${SITE.url}/images/logo.png`,
        width: 256,
        height: 246,
    },
    image: `${SITE.url}/images/logo.png`,
    description:
        'PandaPath is an AI product studio in Bangalore building WhatsApp AI bots, RAG knowledge systems and full-stack AI products for Indian startups. Fixed pricing from ₹25,000, delivered in 2–4 weeks.',
    slogan: SITE.tagline,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: '₹₹',
    address: {
        '@type': 'PostalAddress',
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
    },
    areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'City', name: 'Bangalore' },
        { '@type': 'City', name: 'Mumbai' },
        { '@type': 'City', name: 'Delhi' },
        { '@type': 'City', name: 'Hyderabad' },
        { '@type': 'City', name: 'Pune' },
    ],
    knowsAbout: [
        'WhatsApp Business API chatbot development',
        'Retrieval-augmented generation (RAG)',
        'Large language model integration',
        'AI product development',
        'Full-stack web and mobile development',
    ],
    sameAs: ['https://www.linkedin.com/in/pandapaths/'],
    contactPoint: [
        {
            '@type': 'ContactPoint',
            contactType: 'sales',
            email: SITE.email,
            telephone: SITE.phone,
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi'],
        },
    ],
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '19:00',
        },
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI development services',
        itemListElement: services.map((service) => ({
            '@type': 'Offer',
            name: service.title,
            description: service.description,
            priceCurrency: 'INR',
            price: service.priceFrom.IN.replace(/[₹,]/g, ''),
            url: `${SITE.url}/services#${service.slug}`,
        })),
    },
};

export const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-IN',
};

export const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
        },
    })),
};

export const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AI development services by PandaPath',
    itemListElement: services.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'Service',
            name: service.title,
            description: service.description,
            serviceType: service.summary,
            provider: { '@id': ORG_ID },
            areaServed: { '@type': 'Country', name: 'India' },
            url: `${SITE.url}/services#${service.slug}`,
            offers: {
                '@type': 'Offer',
                priceCurrency: 'INR',
                price: service.priceFrom.IN.replace(/[₹,]/g, ''),
                priceSpecification: {
                    '@type': 'PriceSpecification',
                    priceCurrency: 'INR',
                    minPrice: service.priceFrom.IN.replace(/[₹,]/g, ''),
                },
            },
        },
    })),
};

export const caseStudiesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'PandaPath case studies',
    itemListElement: caseStudies.map((study, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
            '@type': 'CreativeWork',
            name: study.title,
            description: study.description,
            about: study.category,
            creator: { '@id': ORG_ID },
        },
    })),
};

/** Breadcrumbs help Google render the URL path instead of a bare link. */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE.url}${crumb.path === '/' ? '' : crumb.path}`,
    })),
});
