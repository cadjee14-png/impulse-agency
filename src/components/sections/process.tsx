'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '@/components/animations/section-heading';
import { process as processSteps } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

const stepConfig = [
  { isDark: false, tags: ['Analyse complète', "Plan d'action", 'Objectifs concrets'] },
  { isDark: true,  tags: ['100% personnalisée', 'Budget optimisé', 'Roadmap claire'] },
  { isDark: false, tags: ['Résultats mesurables', 'Optimisation continue', 'Reporting régulier'] },
];

function ProcessStep({
  step, index, isLast,
}: {
  step: typeof processSteps[0];
  index: number;
  isLast: boolean;
}) {
  const cfg = stepConfig[index];
  const dark = cfg.isDark;
  const cardRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: -4, duration: 0.5, ease: 'power3.out',
      boxShadow: dark ? '0 24px 64px rgba(0,0,0,0.45)' : '0 16px 48px rgba(30,70,107,0.12)' });
    if (accentRef.current) gsap.to(accentRef.current, { scaleY: 1, duration: 0.5, ease: 'power3.out' });
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: 0, duration: 0.5, ease: 'power3.out',
      boxShadow: dark ? '0 8px 32px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.03),0 8px 32px rgba(0,0,0,0.04)' });
    if (accentRef.current) gsap.to(accentRef.current, { scaleY: 0, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div
      className="process-step"
      style={{
        paddingLeft: 72,
        paddingBottom: isLast ? 0 : 60,
        position: 'relative',
      }}
    >
      {/* Dot shell */}
      <div style={{
        position: 'absolute', left: 13, top: 6,
        width: 24, height: 24, borderRadius: '50%',
        border: '2px solid var(--accent)',
        background: 'var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 2,
      }}>
        {/* Inner fill */}
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)' }} />
        {/* Pulse ring */}
        <div className="process-dot-ring" style={{
          position: 'absolute', width: 24, height: 24, borderRadius: '50%',
          border: '1px solid var(--accent)', opacity: 0.6,
        }} />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative', overflow: 'hidden',
          background: dark ? '#0a1628' : '#ffffff',
          border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(10,10,10,0.06)',
          borderRadius: 16, padding: '36px 32px',
          boxShadow: dark
            ? '0 8px 32px rgba(0,0,0,0.3),0 2px 8px rgba(0,0,0,0.2)'
            : '0 2px 8px rgba(0,0,0,0.03),0 8px 32px rgba(0,0,0,0.04)',
          cursor: 'none', willChange: 'transform',
        }}
      >
        {/* Accent left border (hover) */}
        <div ref={accentRef} style={{
          position: 'absolute', left: 0, top: 0,
          width: 4, height: '100%',
          background: dark ? 'rgba(103,186,244,0.9)' : 'var(--accent)',
          borderRadius: '16px 0 0 16px',
          transform: 'scaleY(0)', transformOrigin: 'top',
        }} />

        {/* Dark card decorations */}
        {dark && (
          <>
            {/* Dot grid */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '24px 24px',
              maskImage: 'linear-gradient(160deg, rgba(0,0,0,0.5) 0%, transparent 45%)',
              WebkitMaskImage: 'linear-gradient(160deg, rgba(0,0,0,0.5) 0%, transparent 45%)',
            }} />
            {/* Radial glow */}
            <div style={{
              position: 'absolute', top: '-20%', right: '-15%',
              width: '50%', height: '70%', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(103,186,244,0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
            }} />
            {/* Watermark */}
            <div style={{
              position: 'absolute', right: -10, bottom: -16,
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: '6rem', lineHeight: 1, letterSpacing: '-0.05em',
              color: 'rgba(255,255,255,0.04)', pointerEvents: 'none',
              userSelect: 'none', transform: 'rotate(-3deg)',
            }}>
              IMPULSE
            </div>
          </>
        )}

        {/* Number watermark */}
        <div className="process-bg-num" style={{
          position: 'absolute', left: 24, top: -10,
          fontFamily: 'var(--font-heading)', fontWeight: 900,
          fontSize: '9rem', lineHeight: 1, letterSpacing: '-0.04em',
          color: dark ? 'rgba(255,255,255,0.04)' : 'rgba(30,70,107,0.05)',
          pointerEvents: 'none', userSelect: 'none',
        }}>
          {step.number}
        </div>

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 12 }}>
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: '1.1rem', letterSpacing: '-0.02em',
              color: dark ? 'rgba(255,255,255,0.2)' : 'rgba(30,70,107,0.2)',
            }}>
              {step.number}
            </span>
            <h3 style={{
              fontFamily: 'var(--font-inter)', fontWeight: 800,
              fontSize: 'clamp(1.2rem,2.5vw,1.75rem)',
              letterSpacing: '-0.03em', lineHeight: 1.1,
              color: dark ? '#ffffff' : 'var(--text)',
            }}>
              {step.title}
            </h3>
          </div>

          <p style={{
            fontSize: 'clamp(0.9rem,1.1vw,1.05rem)', lineHeight: 1.7,
            color: dark ? 'rgba(255,255,255,0.5)' : 'var(--text-dim)',
            marginBottom: 20, maxWidth: 540,
          }}>
            {step.description}
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {cfg.tags.map((tag, t) => (
              <span key={t} style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.02em',
                padding: '6px 14px', borderRadius: 100,
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,70,107,0.06)',
                color: dark ? 'rgba(255,255,255,0.6)' : 'var(--text-dim)',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(30,70,107,0.1)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Process() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const stepsRef    = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      /* ── Heading words ── */
      const eyebrow    = headingRef.current?.querySelector('.process-eyebrow');
      const titleWords = headingRef.current?.querySelectorAll<HTMLElement>('.sh-word');
      const subtitle   = headingRef.current?.querySelector('.process-sub');

      if (eyebrow) gsap.fromTo(eyebrow,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } }
      );
      if (titleWords?.length) {
        gsap.set(titleWords, { opacity: 0, y: 40, rotateX: -10 });
        gsap.to(titleWords, { opacity: 1, y: 0, rotateX: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      }
      if (subtitle) gsap.fromTo(subtitle,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } }
      );

      /* ── Timeline line grows on scroll (scrub) ── */
      if (lineFillRef.current && stepsRef.current) {
        gsap.fromTo(lineFillRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 70%',
              end: 'bottom 60%',
              scrub: 1,
            },
          }
        );
      }

      /* ── Cards slide in from left ── */
      const steps = stepsRef.current?.querySelectorAll<HTMLElement>('.process-step');
      steps?.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, x: -60, rotateZ: -2 },
          { opacity: 1, x: 0, rotateZ: 0, duration: 0.9, ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: stepsRef.current, start: 'top 75%', once: true },
          }
        );

        /* Watermark parallax */
        const bgNum = step.querySelector<HTMLElement>('.process-bg-num');
        if (bgNum) {
          gsap.to(bgNum, { y: -40, ease: 'none',
            scrollTrigger: { trigger: step, start: 'top bottom', end: 'bottom top', scrub: 2 } });
        }
      });

      /* ── Dot pulse rings ── */
      const rings = stepsRef.current?.querySelectorAll<HTMLElement>('.process-dot-ring');
      rings?.forEach((ring, i) => {
        gsap.to(ring, {
          scale: 1.8, opacity: 0, duration: 1.5, ease: 'power2.out',
          repeat: -1, delay: i * 0.5,
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        padding: 'clamp(80px,10vw,140px) clamp(20px,4vw,48px)',
        background: 'linear-gradient(180deg, var(--bg) 0%, #f0f5fb 50%, var(--bg) 100%)',
        overflow: 'hidden',
      }}
    >
      {/* ── Heading (centered) ── */}
      <div ref={headingRef} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>
        <div className="process-eyebrow" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20,
          padding: '8px 20px 8px 12px', borderRadius: 100,
          background: 'rgba(30,70,107,0.06)', border: '1px solid rgba(30,70,107,0.14)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)' }}>
            Notre Process
          </span>
        </div>

        <SectionHeading
          accent="travaille"
          fontSize="clamp(2.2rem,5vw,4.5rem)"
          style={{ justifyContent: 'center', display: 'flex', flexWrap: 'wrap', gap: '0.22em', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 20 }}
        >
          Comment on
        </SectionHeading>

        <p className="process-sub" style={{
          fontSize: 'clamp(1rem,1.2vw,1.15rem)', color: 'var(--text-dim)',
          lineHeight: 1.7, maxWidth: 460, margin: '0 auto',
        }}>
          Simple, rapide et transparent. On vous accompagne de A à Z.
        </p>
      </div>

      {/* ── Steps container ── */}
      <div
        ref={stepsRef}
        style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}
      >
        {/* Timeline track (background) */}
        <div style={{
          position: 'absolute', left: 24, top: 0, bottom: 0,
          width: 2, background: 'rgba(30,70,107,0.1)',
        }} />

        {/* Timeline fill (animated) */}
        <div
          ref={lineFillRef}
          style={{
            position: 'absolute', left: 24, top: 0, bottom: 0,
            width: 2, background: 'var(--accent)',
            transformOrigin: 'center top', transform: 'scaleY(0)',
          }}
        />

        {/* Steps */}
        {processSteps.map((step, i) => (
          <ProcessStep
            key={i}
            step={step}
            index={i}
            isLast={i === processSteps.length - 1}
          />
        ))}
      </div>

      {/* ── CTA bloc ── */}
      <div style={{
        maxWidth: 800, margin: 'clamp(48px,6vw,72px) auto 0',
        background: 'var(--accent)',
        borderRadius: 20,
        padding: 'clamp(36px,5vw,56px) clamp(28px,4vw,56px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', gap: 20, position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'contents' }}>
          <span style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
          }}>
            Étape 1 — Offert &amp; sans engagement
          </span>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 900,
            fontSize: 'clamp(1.4rem,3vw,2.2rem)', color: '#ffffff',
            letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0,
          }}>
            Prêt à démarrer ?<br />Votre diagnostic est gratuit.
          </h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, maxWidth: 420, margin: 0 }}>
            15 minutes avec notre équipe suffisent à identifier les leviers qui vont vraiment faire bouger votre business.
          </p>
          <a href="/audit" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#ffffff', color: 'var(--accent)',
            borderRadius: 64, padding: '16px 40px',
            fontSize: 15, fontWeight: 800, fontFamily: 'var(--font-heading)',
            textDecoration: 'none', letterSpacing: '-0.01em',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            Démarrer maintenant →
          </a>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.03em', margin: 0 }}>
            Gratuit · Sans engagement · Réponse sous 24h
          </p>
        </div>
      </div>
    </section>
  );
}
