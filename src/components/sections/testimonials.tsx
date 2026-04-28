'use client';

import { useState, useRef } from 'react';
import { SectionHeading } from '@/components/animations/section-heading';
import { FadeIn } from '@/components/animations/fade-in';
import { testimonials } from '@/data/site';

export function Testimonials() {
  const [active, setActive] = useState(0);
  const total = testimonials.length;
  const dragStartX = useRef<number | null>(null);
  const didDrag = useRef(false);

  const prev = () => setActive(i => (i - 1 + total) % total);
  const next = () => setActive(i => (i + 1) % total);

  const onDragStart = (clientX: number) => {
    dragStartX.current = clientX;
    didDrag.current = false;
  };
  const onDragEnd = (clientX: number) => {
    if (dragStartX.current === null) return;
    const delta = dragStartX.current - clientX;
    if (Math.abs(delta) > 40) {
      didDrag.current = true;
      delta > 0 ? next() : prev();
    }
    dragStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      style={{ padding: 'clamp(64px,8vw,120px) 0', background: 'var(--surface)', overflow: 'hidden' }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Header */}
        <FadeIn direction="up">
          <div style={{ marginBottom: 'clamp(48px,6vw,80px)' }}>
            <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
              Témoignages
            </span>
            <SectionHeading accent="témoignent">
              Nos clients
            </SectionHeading>
          </div>
        </FadeIn>

        {/* Carousel stage */}
        <div
          style={{ position: 'relative', overflow: 'hidden', padding: '28px 0 8px', cursor: 'grab', userSelect: 'none' }}
          onMouseDown={e => onDragStart(e.clientX)}
          onMouseUp={e => onDragEnd(e.clientX)}
          onMouseLeave={e => { if (dragStartX.current !== null) onDragEnd(e.clientX); }}
          onTouchStart={e => onDragStart(e.touches[0].clientX)}
          onTouchEnd={e => onDragEnd(e.changedTouches[0].clientX)}
        >
          <div
            style={{
              display: 'flex',
              gap: 'var(--tc-gap)',
              transition: 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
              transform: `translateX(calc(50% - var(--tc-w) / 2 - ${active} * (var(--tc-w) + var(--tc-gap))))`,
              willChange: 'transform',
            }}
          >
            {testimonials.map((t, i) => {
              const dist = Math.abs(i - active);
              const isActive = dist === 0;
              return (
                <div
                  key={i}
                  onClick={() => { if (!didDrag.current && !isActive) (i < active ? prev() : next()); }}
                  style={{
                    flexShrink: 0,
                    width: 'var(--tc-w)',
                    background: isActive ? '#ffffff' : 'rgba(0,0,0,0.025)',
                    border: `1px solid ${isActive ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.04)'}`,
                    borderRadius: 20,
                    padding: 'clamp(28px,3vw,44px)',
                    position: 'relative',
                    opacity: dist === 0 ? 1 : dist === 1 ? 0.55 : 0.15,
                    transform: `scale(${dist === 0 ? 1 : 0.9})`,
                    transition: 'all 600ms cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: isActive ? '0 16px 60px rgba(0,0,0,0.1)' : 'none',
                    cursor: isActive ? 'grab' : 'pointer',
                    pointerEvents: dist > 1 ? 'none' : 'auto',
                  }}
                >
                  {/* Quote mark */}
                  <div style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: 72,
                    lineHeight: 1,
                    color: isActive ? 'var(--accent)' : 'rgba(0,0,0,0.08)',
                    marginBottom: 12,
                    userSelect: 'none',
                    transition: 'color 600ms',
                  }}>
                    "
                  </div>

                  {/* Quote */}
                  <p style={{
                    fontFamily: 'var(--font-heading)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    fontSize: 'clamp(15px,1.6vw,19px)',
                    color: isActive ? 'var(--text)' : 'rgba(0,0,0,0.3)',
                    lineHeight: 1.55,
                    letterSpacing: '-0.01em',
                    marginBottom: 'clamp(24px,3vw,36px)',
                    transition: 'color 600ms',
                  }}>
                    {t.quote}
                  </p>

                  {/* Author + star */}
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12 }}>
                    <div>
                      <p style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: isActive ? 'var(--text)' : 'rgba(0,0,0,0.25)',
                        marginBottom: 4,
                        transition: 'color 600ms',
                      }}>
                        {t.author}
                      </p>
                      <p style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isActive ? 'var(--accent)' : 'rgba(0,0,0,0.2)',
                        transition: 'color 600ms',
                      }}>
                        {t.company}
                      </p>
                    </div>

                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: isActive ? 'var(--accent)' : 'rgba(0,0,0,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, transition: 'all 600ms',
                    }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill={isActive ? '#ffffff' : 'rgba(0,0,0,0.2)'}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Metric badge */}
                  {isActive && (
                    <div style={{
                      position: 'absolute', top: -14, right: 24,
                      background: 'var(--accent)', color: '#ffffff',
                      borderRadius: 64, padding: '6px 16px',
                      fontSize: 12, fontWeight: 800, fontFamily: 'var(--font-heading)',
                      letterSpacing: '-0.01em', whiteSpace: 'nowrap',
                      boxShadow: '0 4px 16px rgba(30,70,107,0.25)',
                    }}>
                      {t.metric}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginTop: 40 }}>
          <button
            onClick={prev}
            aria-label="Précédent"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.12)',
              background: 'transparent', color: 'var(--text-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 250ms',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(0,0,0,0.06)'; el.style.borderColor = 'rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.borderColor = 'rgba(0,0,0,0.12)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 28 : 8, height: 8, borderRadius: 4,
                  background: i === active ? 'var(--accent)' : 'rgba(0,0,0,0.15)',
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'all 400ms cubic-bezier(0.16,1,0.3,1)',
                }}
                aria-label={`Témoignage ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Suivant"
            style={{
              width: 44, height: 44, borderRadius: '50%',
              border: '1px solid rgba(0,0,0,0.12)',
              background: 'transparent', color: 'var(--text-dim)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 250ms',
            }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(0,0,0,0.06)'; el.style.borderColor = 'rgba(0,0,0,0.2)'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.borderColor = 'rgba(0,0,0,0.12)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* CTA */}
        <FadeIn direction="up" delay={0.2}>
          <div
            className="testi-cta"
            style={{
              marginTop: 'clamp(48px,6vw,72px)',
              borderTop: '1px solid var(--line)',
              paddingTop: 'clamp(40px,5vw,56px)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 32,
            }}
          >
            <div>
              <p style={{
                fontFamily: 'var(--font-heading)', fontWeight: 900,
                fontSize: 'clamp(1.2rem,2.2vw,1.9rem)',
                letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.1, marginBottom: 10,
              }}>
                Prochains résultats ? Les vôtres.
              </p>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 440 }}>
                Rejoignez les entrepreneurs qui ont choisi de passer à l&apos;action. Diagnostic offert, sans engagement.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
              <a href="/audit" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--accent)', color: 'white',
                borderRadius: 64, padding: '16px 36px',
                fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
                textDecoration: 'none', letterSpacing: '-0.01em',
                boxShadow: '0 8px 32px rgba(30,70,107,0.2)', whiteSpace: 'nowrap',
              }}>
                Je veux ces résultats
              </a>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', paddingLeft: 4 }}>
                30+ clients · Résultats garantis ou remboursé
              </p>
            </div>
          </div>
        </FadeIn>
      </div>

      <style>{`
        :root {
          --tc-w: 540px;
          --tc-gap: 24px;
        }
        @media (max-width: 768px) {
          :root {
            --tc-w: 80vw;
            --tc-gap: 14px;
          }
          .testi-cta {
            flex-direction: column;
            align-items: center !important;
            text-align: center;
          }
          .testi-cta > div:last-child { align-items: center !important; }
        }
      `}</style>
    </section>
  );
}
