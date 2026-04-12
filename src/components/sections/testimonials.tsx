'use client';

import { LineMask } from '@/components/animations/line-mask';
import { FadeIn } from '@/components/animations/fade-in';
import { testimonials } from '@/data/site';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--surface)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)', maxWidth: 640 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
            Ils nous font confiance
          </span>
          <LineMask
            as="h2"
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              color: 'var(--text)',
            }}
          >
            Nos clients témoignent
          </LineMask>
        </div>

        {/* Testimonials — editorial style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {testimonials.map((t, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.1}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 3fr 1fr',
                  gap: 'clamp(24px, 4vw, 64px)',
                  alignItems: 'start',
                  padding: 'clamp(32px, 4vw, 56px) 0',
                  borderBottom: i < testimonials.length - 1 ? '1px solid var(--line)' : 'none',
                }}
                className="testimonial-row"
              >
                {/* Author */}
                <div style={{ paddingTop: 8 }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 12,
                      color: 'white',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: 18,
                    }}
                  >
                    {t.author[0]}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                    {t.author}
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{t.role}</p>
                  <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{t.company}</p>
                </div>

                {/* Quote */}
                <div>
                  <div
                    style={{
                      fontSize: 'clamp(18px, 2.5vw, 28px)',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700,
                      color: 'var(--text)',
                      lineHeight: 1.3,
                      letterSpacing: '-0.02em',
                      marginBottom: 16,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </div>
                  <div
                    style={{
                      width: 40,
                      height: 2,
                      background: 'var(--accent)',
                      borderRadius: 2,
                    }}
                  />
                </div>

                {/* Metric */}
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: 'clamp(18px, 2.5vw, 28px)',
                      color: 'var(--accent)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      background: 'rgba(30,70,107,0.08)',
                      borderRadius: 12,
                      padding: '12px 16px',
                    }}
                  >
                    {t.metric}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .testimonial-row {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .testimonial-row > div:last-child {
            text-align: left !important;
          }
        }
      `}</style>
    </section>
  );
}
