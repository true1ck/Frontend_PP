import { ImageResponse } from 'next/og';

/**
 * Generated once at build time (compatible with `output: 'export'`).
 * The site previously had no OG image at all, so every share on WhatsApp,
 * LinkedIn or Slack rendered as a bare text link.
 */
// Required by `output: 'export'` — bakes the PNG at build time instead of
// generating it per request.
export const dynamic = 'force-static';

export const alt = 'PandaPath — AI products for Indian startups, shipped in weeks';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    background: 'linear-gradient(135deg, #05070d 0%, #0b1226 55%, #131033 100%)',
                    padding: '72px',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Brand row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div
                        style={{
                            width: '52px',
                            height: '52px',
                            borderRadius: '999px',
                            background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
                            display: 'flex',
                        }}
                    />
                    <div style={{ display: 'flex', fontSize: '34px', fontWeight: 700, color: '#f2f5fa' }}>
                        Panda<span style={{ color: '#22d3ee' }}>Path</span>
                    </div>
                </div>

                {/* Headline */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: '76px',
                            fontWeight: 700,
                            lineHeight: 1.08,
                            letterSpacing: '-2.5px',
                            color: '#22d3ee',
                        }}
                    >
                        AI products for Indian startups,
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: '76px',
                            fontWeight: 700,
                            lineHeight: 1.08,
                            letterSpacing: '-2.5px',
                            color: '#f2f5fa',
                            marginTop: '4px',
                        }}
                    >
                        shipped in weeks.
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: '30px',
                            color: '#a9b4c7',
                            marginTop: '28px',
                        }}
                    >
                        WhatsApp AI bots · RAG knowledge systems · Full-stack AI builds
                    </div>
                </div>

                {/* Proof row */}
                <div style={{ display: 'flex', gap: '20px' }}>
                    {[
                        ['2–4 weeks', 'to launch'],
                        // Satori can't fetch a font covering ₹, so it renders as
                        // tofu — spell the currency out instead.
                        ['From INR 25,000', 'fixed price'],
                        ['Bangalore', 'founder-direct'],
                    ].map(([value, label]) => (
                        <div
                            key={value}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '18px 28px',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.12)',
                                background: 'rgba(255,255,255,0.04)',
                            }}
                        >
                            <div style={{ display: 'flex', fontSize: '30px', fontWeight: 600, color: '#f2f5fa' }}>
                                {value}
                            </div>
                            <div style={{ display: 'flex', fontSize: '20px', color: '#79859b', marginTop: '4px' }}>
                                {label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        size,
    );
}
