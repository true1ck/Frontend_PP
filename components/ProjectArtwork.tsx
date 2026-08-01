'use client';

/**
 * Abstract product artwork for project / case-study cards.
 *
 * These replace the mismatched stock PNGs. Reasons for going SVG:
 *  - they adapt to light and dark mode (stock photos can't),
 *  - they cost ~2 KB instead of ~400 KB and never shift layout,
 *  - they read as "here is the product we built" rather than as
 *    a generic photo of a laptop on a desk.
 *
 * Every variant shares the same frame, stroke weight and palette so the
 * grid reads as one system.
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

const ProjectArtwork = ({ variant, className = '' }: ProjectArtworkProps) => {
    // Namespaced ids — multiple artworks render on the same page and
    // duplicate gradient ids would cross-reference.
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
                <linearGradient id={id('bg')} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.16" />
                    <stop offset="55%" stopColor="#6366f1" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.16" />
                </linearGradient>
                <linearGradient id={id('accent')} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <linearGradient id={id('accent2')} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
                <radialGradient id={id('glow')} cx="50%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Shared canvas + soft brand wash */}
            <rect width={W} height={H} fill={`url(#${id('bg')})`} />
            <ellipse cx={W / 2} cy={H * 0.42} rx={150} ry={110} fill={`url(#${id('glow')})`} />

            {/* Faint grid — gives the abstractions a technical, blueprint feel */}
            <g stroke="currentColor" strokeOpacity="0.07" strokeWidth="1">
                {Array.from({ length: 9 }, (_, i) => (
                    <line key={`v${i}`} x1={(i + 1) * 40} y1="0" x2={(i + 1) * 40} y2={H} />
                ))}
                {Array.from({ length: 5 }, (_, i) => (
                    <line key={`h${i}`} x1="0" y1={(i + 1) * 43} x2={W} y2={(i + 1) * 43} />
                ))}
            </g>

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

/* Panel chrome shared by the "screen" variants */
const Panel = ({ x, y, w, h, r = 10 }: { x: number; y: number; w: number; h: number; r?: number }) => (
    <>
        <rect x={x} y={y} width={w} height={h} rx={r} fill="currentColor" fillOpacity="0.07" />
        <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke="currentColor" strokeOpacity="0.18" />
    </>
);

const Bar = ({ x, y, w, h = 6, o = 0.22, fill = 'currentColor' }: { x: number; y: number; w: number; h?: number; o?: number; fill?: string }) => (
    <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} fillOpacity={fill === 'currentColor' ? o : 1} />
);

/* ── WhatsApp / conversational AI ───────────────────────────────── */
const Conversation = ({ id }: Sub) => (
    <g>
        {/* Phone frame */}
        <rect x="132" y="26" width="136" height="212" rx="20" fill="currentColor" fillOpacity="0.08" />
        <rect x="132" y="26" width="136" height="212" rx="20" fill="none" stroke="currentColor" strokeOpacity="0.22" />
        <rect x="176" y="34" width="48" height="6" rx="3" fill="currentColor" fillOpacity="0.25" />

        {/* Incoming bubble */}
        <rect x="144" y="60" width="78" height="30" rx="12" fill="currentColor" fillOpacity="0.13" />
        <Bar x={154} y={70} w={48} h={4} o={0.35} />
        <Bar x={154} y={79} w={32} h={4} o={0.22} />

        {/* Outgoing (AI) bubble */}
        <rect x="178" y="100" width="78" height="38" rx="12" fill={`url(#${id('accent')})`} fillOpacity="0.9" />
        <Bar x={188} y={110} w={54} h={4} fill="#ffffff" />
        <Bar x={188} y={119} w={44} h={4} fill="#ffffff" />
        <Bar x={188} y={128} w={30} h={4} fill="#ffffff" />

        {/* Incoming reply */}
        <rect x="144" y="148" width="66" height="24" rx="11" fill="currentColor" fillOpacity="0.13" />
        <Bar x={154} y={158} w={40} h={4} o={0.32} />

        {/* Typing indicator */}
        <rect x="178" y="182" width="52" height="22" rx="11" fill={`url(#${id('accent')})`} fillOpacity="0.28" />
        <circle cx="192" cy="193" r="3" fill="#22d3ee" />
        <circle cx="204" cy="193" r="3" fill="#22d3ee" fillOpacity="0.6" />
        <circle cx="216" cy="193" r="3" fill="#22d3ee" fillOpacity="0.35" />

        {/* Automation nodes flanking the phone */}
        <g stroke={`url(#${id('accent')})`} strokeWidth="1.5" fill="none" strokeOpacity="0.65">
            <path d="M132 96 H96 a10 10 0 0 1-10-10 V70" />
            <path d="M268 130 h34 a10 10 0 0 0 10-10 V96" />
        </g>
        <circle cx="86" cy="62" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="86" cy="62" r="4" fill="#22d3ee" />
        <circle cx="312" cy="88" r="12" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="312" cy="88" r="4" fill="#a855f7" />
    </g>
);

/* ── RAG / knowledge retrieval ──────────────────────────────────── */
const Knowledge = ({ id }: Sub) => (
    <g>
        {/* Source documents */}
        <g>
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(${34 + i * 6}, ${68 + i * 26})`}>
                    <rect width="72" height="52" rx="8" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.2" />
                    <Bar x={12} y={14} w={44} h={4} o={0.3} />
                    <Bar x={12} y={24} w={36} h={4} o={0.2} />
                    <Bar x={12} y={34} w={28} h={4} o={0.15} />
                </g>
            ))}
        </g>

        {/* Vector index */}
        <g>
            {Array.from({ length: 12 }, (_, i) => {
                const col = i % 4;
                const row = Math.floor(i / 4);
                const active = [1, 4, 6, 11].includes(i);
                return (
                    <circle
                        key={i}
                        cx={176 + col * 20}
                        cy={100 + row * 20}
                        r={active ? 6 : 4}
                        fill={active ? '#22d3ee' : 'currentColor'}
                        fillOpacity={active ? 0.95 : 0.22}
                    />
                );
            })}
        </g>
        <rect x="160" y="82" width="92" height="76" rx="12" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeDasharray="4 4" />

        {/* Retrieval flow */}
        <g stroke={`url(#${id('accent')})`} strokeWidth="1.6" fill="none" strokeOpacity="0.7">
            <path d="M118 116 H158" />
            <path d="M254 120 H286" />
        </g>

        {/* Answer card */}
        <rect x="288" y="86" width="82" height="76" rx="10" fill={`url(#${id('accent2')})`} fillOpacity="0.18" stroke="#a855f7" strokeOpacity="0.45" />
        <circle cx="304" cy="104" r="7" fill="#a855f7" />
        <Bar x={300} y={122} w={58} h={5} o={0.4} />
        <Bar x={300} y={134} w={48} h={5} o={0.28} />
        <Bar x={300} y={146} w={38} h={5} o={0.2} />
    </g>
);

/* ── Analytics dashboard ────────────────────────────────────────── */
const Analytics = ({ id }: Sub) => (
    <g>
        <Panel x={38} y={34} w={324} h={192} r={14} />
        {/* KPI tiles */}
        {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${56 + i * 102}, 52)`}>
                <rect width="86" height="44" rx="9" fill="currentColor" fillOpacity="0.08" />
                <Bar x={12} y={13} w={30} h={4} o={0.25} />
                <rect x="12" y="24" width="44" height="9" rx="4" fill={`url(#${id('accent')})`} />
            </g>
        ))}
        {/* Bar chart */}
        <g>
            {[38, 62, 44, 78, 56, 92, 70].map((h, i) => (
                <rect
                    key={i}
                    x={58 + i * 26}
                    y={196 - h}
                    width="14"
                    height={h}
                    rx="4"
                    fill={i === 5 ? `url(#${id('accent')})` : 'currentColor'}
                    fillOpacity={i === 5 ? 1 : 0.2}
                />
            ))}
        </g>
        {/* Trend line over the bars */}
        <path
            d="M65 158 L91 136 L117 150 L143 118 L169 138 L195 104 L221 122"
            fill="none"
            stroke="#a855f7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {[[65, 158], [117, 150], [169, 138], [221, 122]].map(([cx, cy], i) => (
            <circle key={i} cx={cx} cy={cy} r="3.5" fill="#a855f7" />
        ))}
        {/* Side legend */}
        <g transform="translate(252, 116)">
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(0, ${i * 22})`}>
                    <rect width="10" height="10" rx="3" fill={i === 0 ? '#22d3ee' : i === 1 ? '#a855f7' : 'currentColor'} fillOpacity={i === 2 ? 0.25 : 1} />
                    <Bar x={18} y={3} w={62 - i * 12} h={4} o={0.25} />
                </g>
            ))}
        </g>
    </g>
);

/* ── E-commerce ─────────────────────────────────────────────────── */
const Commerce = ({ id }: Sub) => (
    <g>
        <Panel x={38} y={30} w={324} h={200} r={14} />
        {/* Search bar */}
        <rect x="58" y="48" width="200" height="20" rx="10" fill="currentColor" fillOpacity="0.1" />
        <circle cx="72" cy="58" r="5" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" />
        <path d="M76 62 l4 4" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" />
        {/* Cart with badge */}
        <path d="M300 50 h6 l5 22 h22 l4-15 h-27" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="314" cy="78" r="2.5" fill="currentColor" fillOpacity="0.45" />
        <circle cx="330" cy="78" r="2.5" fill="currentColor" fillOpacity="0.45" />
        <circle cx="338" cy="48" r="9" fill={`url(#${id('accent')})`} />
        <text x="338" y="52" textAnchor="middle" fontSize="10" fontWeight="700" fill="#04121a" fontFamily="system-ui, sans-serif">3</text>

        {/* Product grid */}
        {[0, 1, 2, 3].map((i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            return (
                <g key={i} transform={`translate(${58 + col * 108}, ${84 + row * 70})`}>
                    <rect width="94" height="58" rx="9" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.14" />
                    <rect x="8" y="8" width="34" height="34" rx="7" fill={i === 0 ? `url(#${id('accent')})` : 'currentColor'} fillOpacity={i === 0 ? 0.9 : 0.18} />
                    <Bar x={50} y={14} w={34} h={4} o={0.3} />
                    <Bar x={50} y={24} w={24} h={4} o={0.2} />
                    <Bar x={50} y={34} w={18} h={5} o={0.4} />
                </g>
            );
        })}

        {/* Recommendation rail */}
        <g transform="translate(280, 92)">
            <Bar x={0} y={0} w={54} h={5} o={0.3} />
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(0, ${16 + i * 30})`}>
                    <rect width="22" height="22" rx="6" fill="currentColor" fillOpacity="0.15" />
                    <Bar x={30} y={5} w={40} h={4} o={0.22} />
                    <Bar x={30} y={13} w={26} h={4} o={0.14} />
                </g>
            ))}
        </g>
    </g>
);

/* ── Fintech / payments ─────────────────────────────────────────── */
const Fintech = ({ id }: Sub) => (
    <g>
        {/* Card */}
        <g transform="rotate(-8 130 96)">
            <rect x="52" y="52" width="156" height="98" rx="14" fill={`url(#${id('accent2')})`} />
            <rect x="52" y="52" width="156" height="98" rx="14" fill="none" stroke="#ffffff" strokeOpacity="0.25" />
            <rect x="70" y="78" width="26" height="20" rx="4" fill="#ffffff" fillOpacity="0.55" />
            <Bar x={70} y={112} w={80} h={6} fill="#ffffff" />
            <Bar x={70} y={128} w={44} h={4} fill="#ffffff" />
            <circle cx="176" cy="128" r="11" fill="#ffffff" fillOpacity="0.5" />
            <circle cx="190" cy="128" r="11" fill="#ffffff" fillOpacity="0.32" />
        </g>

        {/* Transaction list */}
        <rect x="216" y="44" width="150" height="172" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.18" />
        <Bar x={232} y={62} w={60} h={5} o={0.32} />
        {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(232, ${84 + i * 32})`}>
                <circle cx="10" cy="10" r="10" fill={i === 0 ? '#22d3ee' : 'currentColor'} fillOpacity={i === 0 ? 0.9 : 0.15} />
                <Bar x={28} y={4} w={54 - i * 6} h={4} o={0.28} />
                <Bar x={28} y={13} w={34} h={4} o={0.16} />
                <Bar x={98} y={8} w={20} h={5} o={i === 0 ? 0.5 : 0.22} />
            </g>
        ))}

        {/* Biometric badge */}
        <circle cx="96" cy="196" r="24" fill="currentColor" fillOpacity="0.08" stroke="#22d3ee" strokeOpacity="0.5" />
        <g stroke="#22d3ee" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeOpacity="0.9">
            <path d="M87 200 a9 11 0 0 1 18 0" />
            <path d="M92 202 a4 6 0 0 1 8 0" />
            <path d="M83 196 a13 15 0 0 1 26 0" strokeOpacity="0.5" />
        </g>
    </g>
);

/* ── Healthcare ─────────────────────────────────────────────────── */
const Health = ({ id }: Sub) => (
    <g>
        <Panel x={38} y={34} w={324} h={192} r={14} />
        {/* Vitals waveform */}
        <rect x="58" y="52" width="196" height="76" rx="10" fill="currentColor" fillOpacity="0.06" />
        <path
            d="M68 96 h30 l8-22 l10 44 l9-30 l8 14 h20 l7-18 l9 26 l8-14 h44"
            fill="none"
            stroke={`url(#${id('accent')})`}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Vitals tiles */}
        {[0, 1].map((i) => (
            <g key={i} transform={`translate(268, ${52 + i * 40})`}>
                <rect width="76" height="32" rx="8" fill="currentColor" fillOpacity="0.08" />
                <circle cx="16" cy="16" r="6" fill={i === 0 ? '#22d3ee' : '#a855f7'} />
                <Bar x={30} y={9} w={34} h={4} o={0.3} />
                <Bar x={30} y={19} w={22} h={4} o={0.18} />
            </g>
        ))}
        {/* Patient record rows */}
        {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(58, ${146 + i * 26})`}>
                <circle cx="11" cy="11" r="11" fill="currentColor" fillOpacity="0.14" />
                <path d="M11 6 v10 M6 11 h10" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.6" strokeLinecap="round" />
                <Bar x={32} y={5} w={120 - i * 22} h={5} o={0.26} />
                <Bar x={32} y={15} w={80 - i * 14} h={4} o={0.15} />
                <rect x="252" y="4" width="34" height="14" rx="7" fill={i === 0 ? '#22d3ee' : 'currentColor'} fillOpacity={i === 0 ? 0.85 : 0.16} />
            </g>
        ))}
    </g>
);

/* ── Cloud infrastructure ───────────────────────────────────────── */
const Cloud = ({ id }: Sub) => (
    <g>
        {/* Legacy stack (left) */}
        <g transform="translate(46, 92)">
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(0, ${i * 30})`}>
                    <rect width="82" height="24" rx="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.18" />
                    <circle cx="14" cy="12" r="4" fill="currentColor" fillOpacity="0.3" />
                    <Bar x={26} y={10} w={42} h={4} o={0.2} />
                </g>
            ))}
        </g>

        {/* Migration arrow */}
        <g>
            <path d="M140 128 H236" stroke={`url(#${id('accent')})`} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 7" />
            <path d="M232 120 l10 8 l-10 8" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* Cloud shape */}
        <path
            d="M262 92 a26 26 0 0 1 50-6 a22 22 0 0 1 20 22 a18 18 0 0 1-18 18 h-52 a22 22 0 0 1-4-34 z"
            fill={`url(#${id('accent2')})`}
            fillOpacity="0.2"
            stroke="#3b82f6"
            strokeOpacity="0.5"
            strokeWidth="1.6"
        />
        {/* Container pods under the cloud */}
        {[0, 1, 2, 3].map((i) => {
            const col = i % 2;
            const row = Math.floor(i / 2);
            return (
                <g key={i} transform={`translate(${262 + col * 44}, ${152 + row * 36})`}>
                    <rect width="36" height="28" rx="7" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.2" />
                    <rect x="8" y="9" width="20" height="4" rx="2" fill="#22d3ee" fillOpacity="0.85" />
                    <rect x="8" y="17" width="12" height="4" rx="2" fill="currentColor" fillOpacity="0.25" />
                </g>
            );
        })}
        {/* Uptime pill */}
        <rect x="46" y="34" width="96" height="26" rx="13" fill="currentColor" fillOpacity="0.08" stroke="#22d3ee" strokeOpacity="0.4" />
        <circle cx="62" cy="47" r="5" fill="#22d3ee" />
        <Bar x={76} y={44} w={50} h={5} o={0.35} />
    </g>
);

/* ── IoT / sensor mesh ──────────────────────────────────────────── */
const Iot = ({ id }: Sub) => {
    const cx = 152;
    const cy = 130;
    const nodes = [
        [cx, cy - 74], [cx + 66, cy - 38], [cx + 66, cy + 38],
        [cx, cy + 74], [cx - 66, cy + 38], [cx - 66, cy - 38],
    ];

    return (
        <g>
            {/* Concentric range rings */}
            {[38, 62, 86].map((r, i) => (
                <circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity={0.16 - i * 0.04} strokeWidth="1" strokeDasharray="3 5" />
            ))}

            {/* Spokes */}
            {nodes.map(([x, y], i) => (
                <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={`url(#${id('accent')})`} strokeOpacity="0.4" strokeWidth="1.4" />
            ))}

            {/* Sensor nodes */}
            {nodes.map(([x, y], i) => (
                <g key={i}>
                    <circle cx={x} cy={y} r="15" fill="currentColor" fillOpacity="0.09" stroke="currentColor" strokeOpacity="0.2" />
                    <circle cx={x} cy={y} r="5" fill={i % 2 === 0 ? '#22d3ee' : '#a855f7'} fillOpacity={i === 4 ? 0.35 : 1} />
                </g>
            ))}

            {/* Gateway hub */}
            <circle cx={cx} cy={cy} r="26" fill={`url(#${id('accent2')})`} fillOpacity="0.25" stroke="#3b82f6" strokeOpacity="0.6" />
            <rect x={cx - 10} y={cy - 8} width="20" height="16" rx="4" fill="#22d3ee" />
            <path d={`M${cx - 16} ${cy - 14} a22 22 0 0 1 32 0`} fill="none" stroke="#22d3ee" strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />

            {/* Telemetry readout */}
            <rect x="272" y="56" width="94" height="148" rx="12" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeOpacity="0.18" />
            <Bar x={286} y={74} w={44} h={5} o={0.3} />
            <path
                d="M286 118 l14-16 l12 10 l14-22 l12 14 l14-8"
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(286, ${140 + i * 22})`}>
                    <circle cx="5" cy="5" r="5" fill={i === 1 ? '#f59e0b' : '#22d3ee'} fillOpacity={i === 2 ? 0.3 : 0.9} />
                    <Bar x={16} y={3} w={52 - i * 10} h={4} o={0.22} />
                </g>
            ))}
        </g>
    );
};

export default ProjectArtwork;
