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

      <style>{`
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.15);
          }
        }
      `}</style>
    </section>
  );
}
