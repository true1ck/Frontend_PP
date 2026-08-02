import type { RegionalPrice } from '@/lib/content';

interface PriceProps {
    value: RegionalPrice;
    className?: string;
}

/**
 * Renders the India price as static fallback text, plus the full per-region
 * table as a data attribute. A Cloudflare Worker (cloudflare/geo-pricing-worker.js)
 * rewrites the text content at the edge based on visitor country — this
 * component has no client-side logic of its own.
 */
export default function Price({ value, className }: PriceProps) {
    return (
        <span className={className} data-prices={JSON.stringify(value)}>
            {value.IN}
        </span>
    );
}
