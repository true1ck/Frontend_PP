'use client';

import { useEffect } from 'react';

/**
 * Client-side counterpart to cloudflare/geo-pricing-worker.js — same bucket
 * logic, same data-prices contract, but runs in the browser via a public
 * geo-IP lookup instead of at the edge. Ships without needing the site to
 * sit behind Cloudflare; swap for (or run alongside) the Worker once that's
 * live. Silently no-ops on any failure — the static India price already
 * rendered is always a safe fallback.
 *
 * Also swaps `[data-region-copy]` wording (see components/RegionCopy.tsx) —
 * same detection pass, since both are "show something different to
 * non-Indian visitors" and don't need separate lookups.
 *
 * The country lookup is cached in sessionStorage — without this, every page
 * view re-hits the free geo-IP API, which burns through its rate limit fast
 * under real traffic and starts failing silently (visitors just see the
 * India default with no error anywhere). One lookup per browser session is
 * enough; country essentially never changes mid-session.
 *
 * pandapath.site is the foreign-facing domain — pandapath.in stays the
 * India-first canonical property. Visitors there get the 'default' (foreign)
 * bucket immediately, before the geo-IP lookup even resolves, so the domain
 * itself — not just the visitor's IP — has a genuinely different rendered
 * default. This is also what Google's renderer sees when crawling
 * pandapath.site, which is what keeps the two domains from reading as
 * duplicate content. The geo-IP lookup still runs after and can refine this
 * to a more specific bucket (e.g. GB) once it resolves.
 */
const FOREIGN_DOMAIN = /(^|\.)pandapath\.site$/;

const EU_COUNTRIES = new Set([
    'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
    'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

export type Bucket = 'IN' | 'GB' | 'EU' | 'default';

export const GEO_CACHE_KEY = 'pp_geo_bucket';

function bucketFor(country: string): Bucket {
    if (country === 'IN') return 'IN';
    if (country === 'GB') return 'GB';
    if (EU_COUNTRIES.has(country)) return 'EU';
    return 'default';
}

function applySwap(bucket: Bucket) {
    if (bucket === 'IN') return; // already showing the static default

    document.querySelectorAll<HTMLElement>('[data-prices]').forEach((el) => {
        try {
            const prices = JSON.parse(el.getAttribute('data-prices') || '{}');
            el.textContent = prices[bucket] ?? prices.default ?? prices.IN;
        } catch {
            // malformed attribute — leave the fallback text untouched
        }
    });

    document.querySelectorAll<HTMLElement>('[data-region-copy]').forEach((el) => {
        try {
            const copy = JSON.parse(el.getAttribute('data-region-copy') || '{}');
            el.textContent = copy.foreign ?? copy.in;
        } catch {
            // malformed attribute — leave the fallback text untouched
        }
    });
}

export default function GeoPricing() {
    useEffect(() => {
        let cancelled = false;

        let cached: string | null = null;
        try {
            cached = sessionStorage.getItem(GEO_CACHE_KEY);
        } catch {
            // sessionStorage unavailable (privacy mode, etc.) — fall through to a fresh lookup
        }

        if (cached) {
            applySwap(cached as Bucket);
            return;
        }

        if (FOREIGN_DOMAIN.test(window.location.hostname)) {
            applySwap('default');
        }

        fetch('https://ipapi.co/json/')
            .then((res) => res.json())
            .then((data: { country_code?: string }) => {
                if (cancelled || !data.country_code) return;
                const bucket = bucketFor(data.country_code);
                try {
                    sessionStorage.setItem(GEO_CACHE_KEY, bucket);
                } catch {
                    // sessionStorage unavailable — swap still applies, just re-fetches next page
                }
                applySwap(bucket);
            })
            .catch(() => {
                // geo lookup unavailable — India price stays visible, which is
                // still correct for Indian visitors and a reasonable default otherwise
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return null;
}
