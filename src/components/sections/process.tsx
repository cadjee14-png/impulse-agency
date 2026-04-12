'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LineMask } from '@/components/animations/line-mask';
import { FadeIn } from '@/components/animations/fade-in';
import { process as processSteps } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const lineRef = useRef<SVGLineElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    const length = 1000;
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;

    const tween = gsap.to(line, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 60%',
        scrub: 0.8,
      },
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        padding: 'clamp(64px, 8vw, 120px) 0',
        background: 'var(--surface)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        {/* Header */}
        <div style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>
            Comment ça marche
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
            Simple, rapide, efficace
          </LineMask>
        </div>

        {/* Steps */}
        <div
          className="process-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(24px, 4vw, 48px)',
            position: 'relative',
          }}
        >
          {/* Connecting line SVG (desktop only) */}
          <svg
            className="process-line-svg"
            style={{
              position: 'absolute',
              top: 40,
              left: '16.5%',
              width: '67%',
              height: 2,
              overflow: 'visible',
              pointerEvents: 'none',
            }}
            viewBox="0 0 1000 2"
            preserveAspectRatio="none"
          >
            <line
              ref={lineRef}
              x1="0"
              y1="1"
              x2="1000"
              y2="1"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
          </svg>

          {processSteps.map((step, i) => (
            <FadeIn key={i} direction="up" delay={i * 0.15}>
              <div
                style={{
                  padding: 'clamp(24px, 3vw, 40px)',
                  background: 'var(--surface)',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid var(--line)',
                  position: 'relative',
                  transition: 'box-shadow 400ms, border-color 400ms',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = 'var(--shadow-card)';
                  el.style.borderColor = 'var(--line-hover)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLDivElement;
                  el.style.boxShadow = 'none';
                  el.style.borderColor = 'var(--line)';
                }}
              >
                {/* Step number circle */}
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 24,
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 800,
                      fontSize: 18,
                      color: 'white',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {step.number}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 'clamp(18px, 2.5vw, 24px)',
                    color: 'var(--text)',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.1,
                    marginBottom: 12,
                  }}
                >
                  {step.title}
                </h3>
                <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.65 }}>
                  {step.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* CTA below */}
        <FadeIn direction="up" delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 'clamp(48px, 6vw, 72px)' }}>
            <p style={{ fontSize: 16, color: 'var(--text-dim)', marginBottom: 24 }}>
              Prêt à commencer ? L'audit est entièrement gratuit.
            </p>
            <a
              href="/audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--accent)',
                color: 'white',
                borderRadius: 64,
                padding: '16px 36px',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                transition: 'background 300ms',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-dim)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'}
            >
              Démarrer mon audit →
            </a>
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .process-grid {
            grid-template-columns: 1fr !important;
          }
          .process-line-svg {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
