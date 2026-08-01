import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                // Crawl everything, including /_next/* — Googlebot renders the
                // page with JavaScript, so blocking the chunks would make it
                // index an empty shell. Nothing on this site is private.
                allow: '/',
            },
        ],
        sitemap: `${SITE.url}/sitemap.xml`,
    };
}
