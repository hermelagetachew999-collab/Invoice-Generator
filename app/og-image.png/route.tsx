import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 60%, #1d4ed8 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    fontFamily: 'sans-serif',
                }}
            >
                {/* Background decorative circles */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-120px',
                        right: '-120px',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'rgba(59, 130, 246, 0.15)',
                        display: 'flex',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-80px',
                        left: '-80px',
                        width: '350px',
                        height: '350px',
                        borderRadius: '50%',
                        background: 'rgba(59, 130, 246, 0.1)',
                        display: 'flex',
                    }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '200px',
                        right: '200px',
                        width: '180px',
                        height: '180px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.03)',
                        display: 'flex',
                    }}
                />

                {/* Main content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '80px 100px',
                        height: '100%',
                        gap: '0px',
                    }}
                >
                    {/* Logo row */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '20px',
                            marginBottom: '48px',
                        }}
                    >
                        {/* Icon box */}
                        <div
                            style={{
                                width: '64px',
                                height: '64px',
                                background: '#3b82f6',
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {/* File/invoice SVG icon */}
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                        </div>

                        {/* Brand name */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                            <span
                                style={{
                                    fontSize: '36px',
                                    fontWeight: '800',
                                    color: '#ffffff',
                                    letterSpacing: '-1px',
                                    lineHeight: '1',
                                }}
                            >
                                InvoiceGen
                            </span>
                            <span
                                style={{
                                    fontSize: '13px',
                                    fontWeight: '700',
                                    color: '#60a5fa',
                                    letterSpacing: '3px',
                                    textTransform: 'uppercase',
                                }}
                            >
                                Always Free &amp; Unlimited
                            </span>
                        </div>
                    </div>

                    {/* Main headline */}
                    <div
                        style={{
                            fontSize: '68px',
                            fontWeight: '900',
                            color: '#ffffff',
                            lineHeight: '1.05',
                            letterSpacing: '-2px',
                            marginBottom: '28px',
                        }}
                    >
                        Free Invoice
                        <br />
                        <span style={{ color: '#60a5fa' }}>Generator</span>
                    </div>

                    {/* Subheading */}
                    <div
                        style={{
                            fontSize: '24px',
                            color: '#94a3b8',
                            fontWeight: '500',
                            lineHeight: '1.4',
                            marginBottom: '48px',
                            maxWidth: '620px',
                        }}
                    >
                        Create professional PDF invoices in seconds.
                        No sign-up. Unlimited downloads.
                    </div>

                    {/* Feature pills */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {['PDF Download', 'VAT / Tax', 'Custom Logo', 'Multi-Currency'].map((feat) => (
                            <div
                                key={feat}
                                style={{
                                    background: 'rgba(59, 130, 246, 0.2)',
                                    border: '1px solid rgba(59, 130, 246, 0.4)',
                                    borderRadius: '100px',
                                    padding: '10px 22px',
                                    fontSize: '16px',
                                    fontWeight: '700',
                                    color: '#93c5fd',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                }}
                            >
                                <span style={{ color: '#3b82f6', fontSize: '18px' }}>✓</span>
                                {feat}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right side — decorative invoice card */}
                <div
                    style={{
                        position: 'absolute',
                        right: '80px',
                        top: '50%',
                        transform: 'translateY(-50%) rotate(6deg)',
                        width: '280px',
                        background: 'rgba(255,255,255,0.07)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: '20px',
                        padding: '28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Invoice</span>
                        <span style={{ color: '#60a5fa', fontSize: '12px', fontWeight: '700' }}>#2026-0042</span>
                    </div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', display: 'flex' }} />
                    {[
                        { label: 'Web Design', amount: '$1,200' },
                        { label: 'SEO Package', amount: '$450' },
                        { label: 'Consulting', amount: '$800' },
                    ].map((item) => (
                        <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#cbd5e1', fontSize: '14px' }}>{item.label}</span>
                            <span style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600' }}>{item.amount}</span>
                        </div>
                    ))}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', display: 'flex' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: '700' }}>TOTAL</span>
                        <span style={{ color: '#60a5fa', fontSize: '22px', fontWeight: '900' }}>$2,450</span>
                    </div>
                    <div
                        style={{
                            background: '#3b82f6',
                            borderRadius: '10px',
                            padding: '10px',
                            textAlign: 'center',
                            color: 'white',
                            fontSize: '13px',
                            fontWeight: '800',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        ↓ Download PDF — Free
                    </div>
                </div>

                {/* Bottom URL bar */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '36px',
                        left: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <div
                        style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: '#22c55e',
                            display: 'flex',
                        }}
                    />
                    <span style={{ color: '#475569', fontSize: '16px', fontWeight: '600' }}>
                        invoicegenhub.com
                    </span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
