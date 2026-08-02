import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

/**
 * Generated at build time (works with `output: 'export'`), which replaces
 * the hand-maintained public/sitemap.xml that had gone stale — it still
 * listed a lastmod of 2025-12-31 and was missing pages.
 */
export const dynamic = 'force-static';

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/co-founder', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/process-tech', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'yearly' },
    { path: '/careers', priority: 0.5, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    return routes.map((route) => ({
        url: `${SITE.url}${route.path === '/' ? '' : route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
