import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://pandapath.in';

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/services',
        '/case-studies',
        '/process-tech',
        '/careers',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic case study pages
    const caseStudySlugs = [
        'ai-powered-analytics-platform',
        'mobile-banking-app',
        'ecommerce-marketplace',
        'cloud-migration-project',
        'healthcare-management-system',
        'iot-monitoring-dashboard',
    ];

    const caseStudyPages = caseStudySlugs.map((slug) => ({
        url: `${baseUrl}/case-studies/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [...staticPages, ...caseStudyPages];
}
