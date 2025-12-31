import { createClient } from '@sanity/client';
import type { SanityClient } from '@sanity/client';

// Sanity client configuration
export const sanityClient: SanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: process.env.NODE_ENV === 'production', // Use CDN in production mode
    token: process.env.SANITY_API_TOKEN,
});

// Type definitions for Sanity documents
export interface CaseStudy {
    _id: string;
    _type: 'caseStudy';
    title: string;
    slug: { current: string };
    client: string;
    industry: string;
    duration: string;
    teamSize: string;
    challenge: string;
    solution: string;
    technologies: string[];
    results: Array<{ metric: string; label: string }>;
    impact: string;
    testimonial?: {
        quote: string;
        author: string;
        role: string;
    };
    category: string;
    image?: string;
}

export interface Service {
    _id: string;
    _type: 'service';
    title: string;
    slug: { current: string };
    description: string;
    icon: string;
    technologies: string[];
    features: string[];
}

// Helper functions to fetch data
export async function getCaseStudies(): Promise<CaseStudy[]> {
    const query = `*[_type == "caseStudy"] | order(_createdAt desc)`;
    return sanityClient.fetch(query);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
    const query = `*[_type == "caseStudy" && slug.current == $slug][0]`;
    return sanityClient.fetch(query, { slug });
}

export async function getServices(): Promise<Service[]> {
    const query = `*[_type == "service"] | order(order asc)`;
    return sanityClient.fetch(query);
}
