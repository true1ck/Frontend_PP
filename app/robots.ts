import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/content';

export const dynamic = 'force-static';

// AI crawlers were already allowed by the wildcard rule below, but leaving
// them undeclared makes SEO/AI-readiness scanners flag them as "unmanaged".
// Listing them explicitly costs nothing and documents intent: this site
// wants to be indexed and cited by AI search and assistants.
const AI_USER_AGENTS = [
    'GPTBot', // OpenAI crawler (training + ChatGPT search)
    'OAI-SearchBot', // OpenAI's ChatGPT search crawler
    'ChatGPT-User', // ChatGPT browsing on a user's behalf
    'ClaudeBot', // Anthropic crawler
    'Claude-User', // Claude browsing on a user's behalf
    'Claude-SearchBot', // Anthropic's Claude search crawler
    'Google-Extended', // Gemini / Google AI training and grounding
    'PerplexityBot',
    'Perplexity-User',
    'Applebot-Extended', // Apple Intelligence
    'Amazonbot',
    'Meta-ExternalAgent',
    'Meta-ExternalFetcher',
    'DuckAssistBot',
    'MistralAI-User',
];

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
            {
                userAgent: AI_USER_AGENTS,
                allow: '/',
            },
        ],
        sitemap: `${SITE.url}/sitemap.xml`,
    };
}
