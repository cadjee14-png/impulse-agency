'use client';

import { Counter } from '@/components/animations/counter';
import { stats } from '@/data/site';

export function Stats() {
  return (
    <section
      id="stats"
      style={{
        background: 'var(--dark)',
        padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(24px, 3vw, 40px) 16px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              gap: 8,
            }}
          >
            <span
              className="stats-num"
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 'clamp(36px, 5vw, 72px)',
                color: 'var(--accent-light)',
                lineHeight: 1,
                letterSpacing: '-0.04em',
              }}
            >
              <Counter
                target={stat.value}
                suffix={stat.suffix}
                isFloat={false}
                duration={2.2}
              />
            </span>
            <span
              className="stats-label"
              style={{
                fontSize: 12,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.45)',
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── CTA strip (desktop only) ── */}
      <div className="stats-cta-strip" style={{
        maxWidth: 1280, margin: '0 auto',
        padding: 'clamp(24px,3vw,36px) clamp(24px,5vw,80px) 0',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 16,
      }}>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.9rem,1.1vw,1.05rem)', lineHeight: 1.6 }}>
          <strong style={{ color: '#fff', fontFamily: 'var(--font-heading)', display: 'block', fontSize: 'clamp(1rem,1.3vw,1.2rem)', letterSpacing: '-0.02em', marginBottom: 4 }}>
            Votre business mérite ces résultats.
          </strong>
          On analyse votre situation — gratuitement, en 15 minutes.
        </p>
        <a href="/audit" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--accent-light)', color: '#0D0D0D',
          borderRadius: 64, padding: '14px 28px',
          fontSize: 14, fontWeight: 700, fontFamily: 'var(--font-heading)',
          textDecoration: 'none', letterSpacing: '-0.01em', flexShrink: 0,
          boxShadow: '0 4px 20px rgba(103,186,244,0.25)',
          whiteSpace: 'nowrap',
        }}>
          Obtenir mon diagnostic
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-cta-strip { display: none !important; }
          section#stats {
            padding: 16px 16px !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div {
            padding: 10px 8px !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          }
          .stats-num {
            font-size: 28px !important;
          }
          .stats-label {
            font-size: 10px !important;
            letter-spacing: 2px !important;
          }
        }
      `}</style>
    </section>
  );
}
