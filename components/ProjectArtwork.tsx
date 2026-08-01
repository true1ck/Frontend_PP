'use client';

/**
 * Abstract product artwork for project / case-study cards.
 *
 * Two hard constraints shape every composition here:
 *
 * 1. The same SVG is `slice`-cropped into containers ranging from ~1.05:1
 *    (featured column) to ~2.7:1 (grid card header). Only the intersection
 *    of those crops is guaranteed visible, so the whole motif lives inside
 *    SAFE and just the wash, dot texture and stray particles bleed past it.
 *    The grid card's category pill sits beyond SAFE's right edge, so it
 *    never lands on artwork either.
 * 2. Colour comes from theme tokens, not fixed hex. Cyan-400 on a white
 *    card is ~1.9:1 and reads as a wash; `var(--brand)` resolves to a
 *    darker teal in light mode and keeps the artwork crisp in both themes.
 */

export type ArtworkVariant =
    | 'conversation'
    | 'knowledge'
    | 'analytics'
    | 'commerce'
    | 'fintech'
    | 'health'
    | 'cloud'
    | 'iot';

interface ProjectArtworkProps {
    variant: ArtworkVariant;
    className?: string;
}

const W = 400;
const H = 260;

/** x 66→334, y 57→203. Survives every crop the cards produce. */

/* Artwork surfaces are theme-swapped in globals.css — see --pa-*. */
const panel = { fill: 'var(--pa-panel)', fillOpacity: 'var(--pa-panel-a)' } as const;
const edge = { stroke: 'currentColor', strokeOpacity: 'var(--pa-edge-a)' } as const;

const ProjectArtwork = ({ variant, className = '' }: ProjectArtworkProps) => {
    // Namespaced ids — several artworks share a page and duplicate
    // gradient ids would cross-reference.
    const id = (suffix: string) => `pa-${variant}-${suffix}`;

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            className={className}
            role="img"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
        >
            <defs>
                <linearGradient id={id('wash')} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" style={{ stopColor: 'var(--brand)', stopOpacity: 'var(--pa-wash-a)' }} />
                    <stop offset="52%" style={{ stopColor: 'var(--accent)', stopOpacity: 'var(--pa-wash-b)' }} />
                    <stop offset="100%" style={{ stopColor: 'var(--accent-2)', stopOpacity: 'var(--pa-wash-c)' }} />
                </linearGradient>
                <radialGradient id={id('glowA')} cx="18%" cy="12%" r="62%">
                    <stop offset="0%" style={{ stopColor: 'var(--brand)', stopOpacity: 'var(--pa-glow-a)' }} />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                </radialGradient>
                <radialGradient id={id('glowB')} cx="86%" cy="94%" r="60%">
                    <stop offset="0%" style={{ stopColor: 'var(--accent-2)', stopOpacity: 'var(--pa-glow-b)' }} />
                    <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
                </radialGradient>

                {/* Primary "ink" — every hero element uses one of these two */}
                <linearGradient id={id('ink')} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" />
                    <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
                <linearGradient id={id('ink2')} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--accent-2)" />
                </linearGradient>
                <linearGradient id={id('fade')} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.36" />
                    <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                </linearGradient>

                {/* Dot matrix reads as precision engineering; ruled lines
                    read as an unfinished wireframe. */}
                <pattern id={id('dots')} width="17" height="17" patternUnits="userSpaceOnUse">
                    <circle cx="1.5" cy="1.5" r="1.15" fill="currentColor" style={{ fillOpacity: 'var(--pa-dot-a)' }} />
                </pattern>

                <filter id={id('soft')} x="-45%" y="-45%" width="190%" height="190%">
                    <feDropShadow
                        dx="0"
                        dy="6"
                        stdDeviation="7"
                        style={{ floodColor: 'var(--pa-shadow)', floodOpacity: 'var(--pa-shadow-a)' }}
                    />
                </filter>
                <filter id={id('lift')} x="-60%" y="-60%" width="220%" height="220%">
                    <feDropShadow
                        dx="0"
                        dy="9"
                        stdDeviation="11"
                        style={{ floodColor: 'var(--pa-shadow)', floodOpacity: 'var(--pa-shadow-a)' }}
                    />
                </filter>
            </defs>

            {/* Ambient layers — free to crop */}
            <rect width={W} height={H} fill={`url(#${id('wash')})`} />
            <rect width={W} height={H} fill={`url(#${id('dots')})`} />
            <rect width={W} height={H} fill={`url(#${id('glowA')})`} />
            <rect width={W} height={H} fill={`url(#${id('glowB')})`} />

            {variant === 'conversation' && <Conversation id={id} />}
            {variant === 'knowledge' && <Knowledge id={id} />}
            {variant === 'analytics' && <Analytics id={id} />}
            {variant === 'commerce' && <Commerce id={id} />}
            {variant === 'fintech' && <Fintech id={id} />}
            {variant === 'health' && <Health id={id} />}
            {variant === 'cloud' && <Cloud id={id} />}
            {variant === 'iot' && <Iot id={id} />}
        </svg>
    );
};

type Sub = { id: (s: string) => string };

/* ── Shared primitives ──────────────────────────────────────────── */

/** Opaque surface, so cards sit *on* the wash instead of dissolving into it. */
const Card = ({
    x,
    y,
    w,
    h,
    r = 14,
    filter,
}: {
    x: number;
    y: number;
    w: number;
    h: number;
    r?: number;
    filter?: string;
}) => (
    <g filter={filter}>
        <rect x={x} y={y} width={w} height={h} rx={r} style={panel} />
        <rect x={x} y={y} width={w} height={h} rx={r} fill="currentColor" style={{ fillOpacity: 'var(--pa-tint-a)' }} />
        <rect x={x} y={y} width={w} height={h} rx={r} fill="none" style={edge} />
    </g>
);

const Line = ({
    x,
    y,
    w,
    h = 5,
    o = 0.2,
    fill = 'currentColor',
}: {
    x: number;
    y: number;
    w: number;
    h?: number;
    o?: number;
    fill?: string;
}) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} fillOpacity={o} />;

/** Four-point concave star — the "AI" mark used across the set. */
const Spark = ({ cx, cy, r, fill = '#fff', o = 1 }: { cx: number; cy: number; r: number; fill?: string; o?: number }) => {
    const k = r * 0.32;
    return (
        <path
            d={`M${cx} ${cy - r} C${cx} ${cy - k} ${cx + k} ${cy} ${cx + r} ${cy} C${cx + k} ${cy} ${cx} ${cy + k} ${cx} ${cy + r} C${cx} ${cy + k} ${cx - k} ${cy} ${cx - r} ${cy} C${cx - k} ${cy} ${cx} ${cy - k} ${cx} ${cy - r} Z`}
            fill={fill}
            fillOpacity={o}
        />
    );
};

/* ── Conversational AI ──────────────────────────────────────────── */
const Conversation = ({ id }: Sub) => (
    <g>
        {/* Customer message */}
        <g filter={`url(#${id('soft')})`}>
            <rect x="66" y="62" width="112" height="44" rx="16" style={panel} />
            <path d="M74 104 L74 118 L90 105 Z" style={panel} />
            <rect x="66" y="62" width="112" height="44" rx="16" fill="none" style={edge} />
        </g>
        <Line x={82} y={76} w={72} h={6} o={0.24} />
        <Line x={82} y={90} w={48} h={6} o={0.14} />

        {/* Always-on marker */}
        <g className="pa-float">
            <Card x={244} y={58} w={90} h={36} r={18} filter={`url(#${id('soft')})`} />
            <circle cx="264" cy="76" r="9" fill="var(--brand)" fillOpacity="0.2" className="pa-glow" />
            <circle cx="264" cy="76" r="4.5" fill="var(--brand)" />
            <Line x={280} y={69} w={38} h={6} o={0.24} />
            <Line x={280} y={80} w={24} h={5} o={0.13} />
        </g>

        {/* Assistant reply — the one saturated block, so the eye lands here */}
        <path
            d="M84 118 C 84 140, 116 128, 138 132"
            fill="none"
            stroke="var(--brand)"
            strokeOpacity="0.45"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="pa-dash"
        />
        <g filter={`url(#${id('lift')})`}>
            <rect x="152" y="122" width="182" height="66" rx="18" fill={`url(#${id('ink')})`} />
            <path d="M326 186 L326 200 L310 187 Z" fill="var(--accent)" />
        </g>
        <Line x={172} y={138} w={122} h={6} fill="#ffffff" o={0.95} />
        <Line x={172} y={153} w={100} h={6} fill="#ffffff" o={0.7} />
        <Line x={172} y={168} w={64} h={6} fill="#ffffff" o={0.45} />

        {/* AI badge riding the reply's corner */}
        <circle cx="156" cy="118" r="15" fill={`url(#${id('ink2')})`} filter={`url(#${id('soft')})`} />
        <Spark cx={156} cy={118} r={7.5} />

        {/* Still typing */}
        <rect x="66" y="160" width="84" height="34" rx="17" style={{ ...panel, ...edge }} />
        {[0, 1, 2].map((i) => (
            <circle
                key={i}
                cx={86 + i * 14}
                cy={177}
                r="4.5"
                fill="var(--brand)"
                className="pa-blink"
                style={{ animationDelay: `${i * 0.18}s` }}
            />
        ))}
    </g>
);

/* ── Retrieval / knowledge base ─────────────────────────────────── */
const Knowledge = ({ id }: Sub) => (
    <g>
        {/* Fanned source documents */}
        <g transform="translate(118 130)">
            <g transform="rotate(-13)" opacity="0.45">
                <rect x="-38" y="-56" width="76" height="112" rx="12" style={{ ...panel, ...edge }} />
            </g>
            <g transform="rotate(-6)" opacity="0.72">
                <rect x="-38" y="-56" width="76" height="112" rx="12" style={{ ...panel, ...edge }} />
            </g>
            <g transform="rotate(1)">
                <g filter={`url(#${id('soft')})`}>
                    <rect x="-38" y="-56" width="76" height="112" rx="12" style={panel} />
                </g>
                <rect x="-38" y="-56" width="76" height="112" rx="12" fill="none" style={edge} />
                <Line x={-24} y={-42} w={48} h={5} o={0.26} />
                <Line x={-24} y={-31} w={34} h={5} o={0.15} />
                <Line x={-24} y={-20} w={42} h={5} o={0.15} />
                {/* The paragraph the answer will cite */}
                <rect x="-28" y="-8" width="60" height="20" rx="6" fill="var(--brand)" fillOpacity="0.16" stroke="var(--brand)" strokeOpacity="0.45" />
                <Line x={-22} y={-1} w={44} h={5} fill="var(--brand)" o={0.9} />
                <Line x={-24} y={22} w={38} h={5} o={0.15} />
                <Line x={-24} y={33} w={48} h={5} o={0.15} />
            </g>
        </g>

        {/* Embedding hops */}
        <path
            d="M166 124 C 190 116, 198 104, 220 100"
            fill="none"
            stroke="var(--brand)"
            strokeOpacity="0.5"
            strokeWidth="1.8"
            strokeLinecap="round"
            className="pa-dash"
        />
        {[[180, 119], [196, 111], [210, 103]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3" fill="var(--brand)" className="pa-glow" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}

        {/* Answer, with its source attached */}
        <Card x={226} y={66} w={108} h={130} r={14} filter={`url(#${id('lift')})`} />
        <circle cx="246" cy="88" r="11" fill={`url(#${id('ink')})`} />
        <Spark cx={246} cy={88} r={5.5} />
        <Line x={264} y={84} w={48} h={6} o={0.24} />
        <Line x={242} y={112} w={76} h={5} o={0.18} />
        <Line x={242} y={124} w={62} h={5} o={0.18} />
        <Line x={242} y={136} w={70} h={5} o={0.18} />
        <rect x="242" y="156" width="76" height="24" rx="8" fill="var(--brand)" fillOpacity="0.14" stroke="var(--brand)" strokeOpacity="0.4" />
        <path d="M252 168 h7 m-7 -4.5 v9" stroke="var(--brand)" strokeWidth="1.8" strokeLinecap="round" />
        <Line x={266} y={165} w={40} h={5} fill="var(--brand)" o={0.85} />
    </g>
);

/* ── Analytics dashboard ────────────────────────────────────────── */
const Analytics = ({ id }: Sub) => (
    <g>
        <Card x={66} y={70} w={234} h={132} r={18} filter={`url(#${id('soft')})`} />

        <Line x={84} y={86} w={54} h={6} o={0.24} />
        {[['var(--brand)', 1], ['var(--accent-2)', 1], ['currentColor', 0.2]].map(([c, o], i) => (
            <circle key={i} cx={252 + i * 16} cy={89} r="4.5" fill={c as string} fillOpacity={o as number} />
        ))}

        {/* Volume behind, trend in front */}
        {[26, 44, 32, 58, 40, 70, 50].map((h, i) => (
            <rect key={i} x={84 + i * 30} y={184 - h} width="16" height={h} rx="5" fill="currentColor" fillOpacity="0.09" />
        ))}
        <path
            d="M92 168 L122 158 L152 172 L182 144 L212 154 L242 128 L272 118 L272 184 L92 184 Z"
            fill={`url(#${id('fade')})`}
        />
        <path
            d="M92 168 L122 158 L152 172 L182 144 L212 154 L242 128 L272 118"
            fill="none"
            stroke={`url(#${id('ink')})`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <line x1="84" y1="184" x2="290" y2="184" stroke="currentColor" strokeOpacity="0.12" />
        {[[122, 158], [182, 144], [242, 128]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="4" stroke="var(--brand)" strokeWidth="2.5" style={panel} />
        ))}
        <circle cx="272" cy="118" r="11" fill="var(--brand)" fillOpacity="0.2" className="pa-glow" />
        <circle cx="272" cy="118" r="5.5" fill="var(--brand)" />

        {[0, 1, 2].map((i) => (
            <Line key={i} x={84 + i * 58} y={192} w={42} h={4} o={0.12} />
        ))}

        {/* Live KPI, floating over the panel edge */}
        <g className="pa-float">
            <Card x={244} y={57} w={90} h={44} r={13} filter={`url(#${id('lift')})`} />
            <path d="M260 85 l9 -13 l9 13 z" fill="var(--brand)" />
            <Line x={286} y={69} w={34} h={6} o={0.26} />
            <Line x={286} y={81} w={22} h={5} o={0.14} />
        </g>
    </g>
);

/* ── Marketplace / commerce ─────────────────────────────────────── */
const Commerce = ({ id }: Sub) => (
    <g>
        <Card x={66} y={62} w={184} h={138} r={18} filter={`url(#${id('soft')})`} />

        {/* Faceted search */}
        <rect x="80" y="76" width="112" height="20" rx="10" fill="currentColor" fillOpacity="0.07" />
        <circle cx="94" cy="86" r="4.5" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.6" />
        <path d="M97.5 89.5 l3.5 3.5" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
        <Line x={110} y={83} w={40} h={6} o={0.13} />

        {/* Listings from multiple sellers */}
        {[0, 1, 2, 3].map((i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            const x = 80 + col * 74;
            const y = 104 + row * 48;
            return (
                <g key={i}>
                    <rect x={x} y={y} width={66} height={40} rx="10" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeOpacity="0.1" />
                    <rect
                        x={x + 7}
                        y={y + 7}
                        width="26"
                        height="26"
                        rx="7"
                        fill={i === 0 ? `url(#${id('ink')})` : i === 3 ? `url(#${id('ink2')})` : 'currentColor'}
                        fillOpacity={i === 0 || i === 3 ? 1 : 0.12}
                    />
                    <Line x={x + 40} y={y + 10} w={18} h={4} o={0.2} />
                    <Line x={x + 40} y={y + 20} w={12} h={4} o={0.12} />
                    <Line x={x + 40} y={y + 29} w={16} h={5} fill="var(--brand)" o={0.75} />
                </g>
            );
        })}

        {/* Cart */}
        <g className="pa-float">
            <Card x={242} y={66} w={92} h={56} r={14} filter={`url(#${id('lift')})`} />
            <path
                d="M256 82 h7 l6 23 h22 l5 -17 h-27"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle cx="271" cy="110" r="2.6" fill="currentColor" fillOpacity="0.4" />
            <circle cx="287" cy="110" r="2.6" fill="currentColor" fillOpacity="0.4" />
            <circle cx="313" cy="80" r="12" fill={`url(#${id('ink')})`} />
            <circle cx="313" cy="80" r="4.5" fill="#ffffff" />
        </g>

        {/* Split payout to sellers */}
        <Card x={242} y={138} w={92} h={62} r={14} filter={`url(#${id('lift')})`} />
        {[0, 1].map((i) => (
            <g key={i} transform={`translate(256, ${152 + i * 26})`}>
                <circle cx="9" cy="9" r="9" fill={i === 0 ? `url(#${id('ink2')})` : 'currentColor'} fillOpacity={i === 0 ? 1 : 0.12} />
                <Line x={24} y={2} w={24} h={5} o={0.18} />
                <Line x={24} y={12} w={36} h={6} fill="var(--brand)" o={i === 0 ? 0.85 : 0.38} />
            </g>
        ))}
    </g>
);

/* ── Payments / fintech ─────────────────────────────────────────── */
const Fintech = ({ id }: Sub) => (
    <g>
        {/* Ledger sits behind the card */}
        <Card x={228} y={60} w={106} h={140} r={16} filter={`url(#${id('soft')})`} />
        <Line x={244} y={76} w={48} h={6} o={0.24} />
        {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(244, ${96 + i * 26})`}>
                <circle cx="9" cy="9" r="9" fill={i === 0 ? 'var(--brand)' : 'currentColor'} fillOpacity={i === 0 ? 1 : 0.1} />
                {i === 0 && (
                    <path d="M5.5 9.5 l2.5 2.5 l4.5 -5.5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                )}
                <Line x={24} y={3} w={32 - i * 4} h={5} o={0.2} />
                <Line x={24} y={13} w={20} h={4} o={0.11} />
                <Line x={64} y={7} w={18} h={6} fill={i === 0 ? 'var(--brand)' : 'currentColor'} o={i === 0 ? 0.85 : 0.16} />
            </g>
        ))}

        {/* Card */}
        <g transform="rotate(-8 148 118)">
            <g filter={`url(#${id('lift')})`}>
                <rect x="74" y="66" width="148" height="94" rx="16" fill={`url(#${id('ink2')})`} />
            </g>
            <path d="M74 138 L222 96 v46 a16 16 0 0 1 -16 16 h-116 a16 16 0 0 1 -16 -16 z" fill="#ffffff" fillOpacity="0.07" />
            <rect x="74" y="66" width="148" height="94" rx="16" fill="none" stroke="#ffffff" strokeOpacity="0.22" />
            <rect x="92" y="88" width="27" height="21" rx="5" fill="#ffffff" fillOpacity="0.55" />
            <path d="M101 88 v21 M110 88 v21" stroke="var(--accent-2)" strokeOpacity="0.3" strokeWidth="1.4" />
            <Line x={92} y={124} w={76} h={7} fill="#ffffff" o={0.85} />
            <Line x={92} y={140} w={42} h={5} fill="#ffffff" o={0.5} />
            <circle cx="180" cy="136" r="12" fill="#ffffff" fillOpacity="0.5" />
            <circle cx="195" cy="136" r="12" fill="#ffffff" fillOpacity="0.3" />
        </g>

        {/* Biometric unlock, floating over the card's lower edge */}
        <g className="pa-float">
            <Card x={70} y={160} w={110} h={42} r={21} filter={`url(#${id('lift')})`} />
            <g stroke="var(--brand)" strokeWidth="2" fill="none" strokeLinecap="round" transform="translate(95 178)">
                <path d="M-12 2 a12 13 0 0 1 24 0 v6" strokeOpacity="0.45" />
                <path d="M-12 2 v7" strokeOpacity="0.45" />
                <path d="M-7.5 4 a7.5 8.5 0 0 1 15 0 v8" />
                <path d="M-3 6 a3 3.5 0 0 1 6 0 v9" />
            </g>
            <Line x={114} y={173} w={48} h={6} o={0.24} />
            <Line x={114} y={184} w={30} h={5} o={0.13} />
        </g>
    </g>
);

/* ── Clinic / healthcare ────────────────────────────────────────── */
const Health = ({ id }: Sub) => (
    <g>
        <Card x={66} y={60} w={178} h={140} r={18} filter={`url(#${id('soft')})`} />

        {/* Patient */}
        <circle cx="88" cy="84" r="14" fill={`url(#${id('ink2')})`} />
        <circle cx="88" cy="79" r="4.5" fill="#ffffff" fillOpacity="0.85" />
        <path d="M80 93 a9 7 0 0 1 16 0" fill="#ffffff" fillOpacity="0.85" />
        <Line x={110} y={76} w={58} h={6} o={0.24} />
        <Line x={110} y={88} w={38} h={5} o={0.13} />

        {/* Vitals */}
        <rect x="80" y="106" width="150" height="46" rx="11" fill="currentColor" fillOpacity="0.05" />
        <path
            d="M90 132 h20 l6 -17 l9 34 l8 -24 l6 10 h16 l6 -14 l8 21 l6 -10 h47"
            fill="none"
            stroke={`url(#${id('ink')})`}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="222" cy="132" r="4.5" fill="var(--brand)" className="pa-glow" />

        {/* Records */}
        {[0, 1].map((i) => (
            <g key={i} transform={`translate(80, ${162 + i * 20})`}>
                <rect width="13" height="16" rx="3" fill="currentColor" fillOpacity="0.1" />
                <path d="M3.5 5.5 h6 M3.5 10 h4" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
                <Line x={22} y={2} w={72 - i * 16} h={5} o={0.19} />
                <Line x={22} y={12} w={48} h={4} o={0.11} />
                <rect x="116" y="2" width="30" height="14" rx="7" fill={i === 0 ? 'var(--brand)' : 'currentColor'} fillOpacity={i === 0 ? 0.85 : 0.12} />
            </g>
        ))}

        {/* Scheduling + teleconsult */}
        <Card x={236} y={74} w={98} h={116} r={14} filter={`url(#${id('lift')})`} />
        <Line x={250} y={90} w={40} h={6} o={0.24} />
        {Array.from({ length: 12 }, (_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const booked = i === 5;
            return (
                <rect
                    key={i}
                    x={250 + col * 18}
                    y={108 + row * 16}
                    width="12"
                    height="12"
                    rx="3.5"
                    fill={booked ? 'var(--brand)' : 'currentColor'}
                    fillOpacity={booked ? 1 : 0.12}
                />
            );
        })}
        <rect x="250" y="162" width="70" height="22" rx="7" fill="var(--accent-2)" fillOpacity="0.14" stroke="var(--accent-2)" strokeOpacity="0.4" />
        <rect x="258" y="167" width="14" height="12" rx="3" fill="var(--accent-2)" />
        <path d="M274 170 l7 -5 v14 l-7 -5 z" fill="var(--accent-2)" />
        <Line x={288} y={170} w={22} h={5} fill="var(--accent-2)" o={0.8} />
    </g>
);

/* ── Cloud migration ────────────────────────────────────────────── */
const Cloud = ({ id }: Sub) => (
    <g>
        {/* The on-premise rack being left behind — dims down the stack */}
        {[0, 1, 2].map((i) => (
            <g key={i} opacity={1 - i * 0.24}>
                <Card x={66} y={88 + i * 30} w={76} h={26} r={8} filter={`url(#${id('soft')})`} />
                <circle cx="80" cy={101 + i * 30} r="3.5" fill="currentColor" fillOpacity="0.22" />
                <Line x={90} y={98 + i * 30} w={38} h={5} o={0.16} />
            </g>
        ))}

        {/* Lift and shift */}
        <path
            d="M152 131 H192"
            stroke="var(--brand)"
            strokeOpacity="0.55"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="pa-dash"
        />
        <path d="M188 124 l9 7 l-9 7" fill="none" stroke="var(--brand)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Cloud */}
        <g transform="translate(189 38) scale(0.72)">
            <g filter={`url(#${id('soft')})`}>
                <path
                    d="M 60 132 C 42 132 30 120 30 105 C 30 92 40 81 53 79 C 57 60 74 47 94 47 C 113 47 129 59 134 76 C 137 75 140 74 144 74 C 160 74 172 86 172 101 C 172 118 159 132 142 132 Z"
                    fill={`url(#${id('ink')})`}
                    fillOpacity="0.16"
                    stroke="var(--brand)"
                    strokeOpacity="0.55"
                    strokeWidth="2.6"
                />
            </g>
            <circle cx="101" cy="96" r="26" fill={`url(#${id('ink')})`} />
            <path d="M88 96 l9 9 l17 -18" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Orchestration links */}
        <g fill="none" stroke="var(--brand)" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" className="pa-dash">
            <path d="M262 134 C 262 143, 222 141, 221 150" />
            <path d="M262 134 L262 150" />
            <path d="M262 134 C 262 143, 302 141, 303 150" />
        </g>

        {/* Containers */}
        {[0, 1, 2].map((i) => (
            <g key={i}>
                <Card x={200 + i * 46} y={150} w={42} h={42} r={11} filter={`url(#${id('soft')})`} />
                <rect x={209 + i * 46} y={162} width="20" height="4.5" rx="2.25" fill="var(--brand)" fillOpacity={i === 1 ? 0.9 : 0.5} />
                <rect x={209 + i * 46} y={172} width="12" height="4.5" rx="2.25" fill="currentColor" fillOpacity="0.15" />
                <circle
                    cx={211 + i * 46}
                    cy={183}
                    r="3.5"
                    fill="var(--brand)"
                    className="pa-glow"
                    style={{ animationDelay: `${i * 0.4}s` }}
                />
            </g>
        ))}
    </g>
);

/* ── IoT telemetry mesh ─────────────────────────────────────────── */
const Iot = ({ id }: Sub) => {
    const cx = 180;
    const cy = 130;
    const nodes: Array<[number, number, boolean]> = [
        [cx, cy - 58, false],
        [cx + 50, cy - 29, false],
        [cx + 50, cy + 29, true],
        [cx, cy + 58, false],
        [cx - 50, cy + 29, false],
        [cx - 50, cy - 29, false],
    ];

    return (
        <g>
            {/* Broadcast range */}
            {[0, 1, 2].map((i) => (
                <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="72"
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth="1.5"
                    className="pa-ring"
                    style={{ animationDelay: `${i * 1.2}s` }}
                />
            ))}
            <circle cx={cx} cy={cy} r="72" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeDasharray="3 6" />

            {/* Uplinks */}
            {nodes.map(([x, y], i) => (
                <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={`url(#${id('ink')})`} strokeOpacity="0.35" strokeWidth="1.6" />
            ))}

            {/* Sensors */}
            {nodes.map(([x, y, alert], i) => (
                <g key={i}>
                    <circle cx={x} cy={y} r="13" style={{ ...panel, ...edge }} filter={`url(#${id('soft')})`} />
                    {alert && <circle cx={x} cy={y} r="19" fill="#f59e0b" fillOpacity="0.18" className="pa-glow" />}
                    <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill={alert ? '#f59e0b' : i % 2 === 0 ? 'var(--brand)' : 'var(--accent-2)'}
                        className={alert ? 'pa-blink' : undefined}
                    />
                </g>
            ))}

            {/* Gateway */}
            <g filter={`url(#${id('lift')})`}>
                <rect x={cx - 23} y={cy - 23} width="46" height="46" rx="15" fill={`url(#${id('ink')})`} />
            </g>
            <rect x={cx - 10} y={cy - 1} width="20" height="13" rx="4" fill="#ffffff" fillOpacity="0.9" />
            <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinecap="round">
                <path d={`M${cx - 8} ${cy - 7} a12 12 0 0 1 16 0`} strokeOpacity="0.85" />
                <path d={`M${cx - 14} ${cy - 13} a20 20 0 0 1 28 0`} strokeOpacity="0.5" />
            </g>

            {/* Telemetry readout */}
            <Card x={256} y={148} w={78} h={52} r={13} filter={`url(#${id('lift')})`} />
            <path
                d="M268 182 l12 -14 l10 9 l12 -19 l10 12"
                fill="none"
                stroke={`url(#${id('ink')})`}
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <Line x={268} y={160} w={34} h={5} o={0.22} />
        </g>
    );
};

export default ProjectArtwork;
