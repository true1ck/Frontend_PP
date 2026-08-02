interface RegionCopyProps {
    /** Shown to Indian visitors, and as the static fallback everywhere else. */
    in: string;
    /** Swapped in for non-Indian visitors by GeoPersonalization. */
    foreign: string;
    className?: string;
}

/**
 * Same swap contract as components/Price.tsx, but for wording rather than
 * numbers — e.g. "WhatsApp" is a strong hook in India, meaningless in most
 * Western markets. GeoPersonalization.tsx does the actual text swap.
 */
export default function RegionCopy({ in: inCopy, foreign, className }: RegionCopyProps) {
    return (
        <span className={className} data-region-copy={JSON.stringify({ in: inCopy, foreign })}>
            {inCopy}
        </span>
    );
}
