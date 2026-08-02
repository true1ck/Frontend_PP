'use client';

import { useEffect, useState } from 'react';
import { GEO_CACHE_KEY, type Bucket } from './GeoPricing';

const OPTIONS: { value: Bucket; label: string }[] = [
    { value: 'IN', label: 'India (default)' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'EU', label: 'Europe' },
    { value: 'default', label: 'US / rest of world' },
];

/**
 * Lets you see how the site looks in each region without a VPN or waiting
 * on the real Cloudflare rollout — sets the same sessionStorage bucket
 * GeoPricing reads, then reloads. Hidden unless the URL has
 * ?preview-region=1, so real visitors never see it.
 */
export default function RegionPreviewSwitcher() {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState<Bucket>('IN');

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setVisible(params.get('preview-region') === '1');
        const cached = sessionStorage.getItem(GEO_CACHE_KEY);
        if (cached) setCurrent(cached as Bucket);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[70] flex items-center gap-2 rounded-full border border-[rgb(var(--border-strong))] bg-[var(--surface-solid)] px-3 py-2 text-xs shadow-2xl">
            <span className="font-mono uppercase tracking-wide text-subtle">Preview as</span>
            <select
                value={current}
                onChange={(e) => {
                    const bucket = e.target.value as Bucket;
                    sessionStorage.setItem(GEO_CACHE_KEY, bucket);
                    window.location.reload();
                }}
                className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-2 py-1 text-xs text-body"
            >
                {OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
