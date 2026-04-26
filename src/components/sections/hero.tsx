'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Magnetic } from '@/components/animations/magnetic';
import { siteConfig } from '@/data/site';

export function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const labelRef     = useRef<HTMLSpanElement>(null);
  const line1Ref     = useRef<HTMLDivElement>(null);
  const line2Ref     = useRef<HTMLDivElement>(null);
  const line3Ref     = useRef<HTMLDivElement>(null);
  const subtextRef   = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef  = useRef<HTMLDivElement>(null);
  const badgeRef     = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    gsap.set(labelRef.current, { y: 20, opacity: 0 });
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      y: '105%', opacity: 0, filter: 'blur(12px)',
    });
    gsap.set(subtextRef.current, { opacity: 0, y: 16 });
    if (ctaGroupRef.current) {
      gsap.set(Array.from(ctaGroupRef.current.children), { y: 24, opacity: 0 });
    }
    gsap.set(badgeRef.current, { opacity: 0, y: 10, scale: 0.95 });
    gsap.set(scrollIndRef.current, { opacity: 0 });

    tl
      .to(labelRef.current, { y: 0, opacity: 1, duration: 0.6 }, 0.15)
      .to([line1Ref.current, line2Ref.current, line3Ref.current], {
        y: '0%', opacity: 1, filter: 'blur(0px)',
        duration: 1.1, stagger: 0.12,
      }, 0.35)
      .to(subtextRef.current, { opacity: 1, y: 0, duration: 0.8 }, 1.0)
      .to(badgeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 1.1)
      .to(ctaGroupRef.current ? Array.from(ctaGroupRef.current.children) : [], {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.7,
      }, 1.2)
      .to(scrollIndRef.current, { opacity: 1, duration: 0.5 }, 1.6);

    return () => { tl.kill(); };
  }, []);

  const scrollToRealisations = () => {
    document.querySelector('#realisations')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="hero-mesh"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(100px, 14vw, 160px) clamp(24px, 4vw, 64px) 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Background blurs ── */}
      <div style={{
        position: 'absolute', top: '15%', right: '5%',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(103,186,244,0.16) 0%, transparent 70%)',
        filter: 'blur(90px)', pointerEvents: 'none',
        animation: 'floatBlur 9s ease-in-out infinite alternate',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', left: '3%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(30,70,107,0.09) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none',
        animation: 'floatBlur 11s ease-in-out infinite alternate-reverse',
      }} />

      {/* ── IMPULSE watermark — CSS only, no GSAP conflict ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(160px, 24vw, 420px)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          color: 'rgba(30,70,107,0.10)',
          pointerEvents: 'none',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          animation: 'watermarkFloat 12s ease-in-out infinite',
          zIndex: 0,
        }}
      >
        IMPULSE
      </div>

      <style>{`
        @keyframes floatBlur {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -30px) scale(1.1); }
        }
        @keyframes watermarkFloat {
          0%   { transform: translateY(-50%) translateX(0px)   scale(1); }
          30%  { transform: translateY(-54%) translateX(-22px) scale(1.03); }
          60%  { transform: translateY(-46%) translateX(14px)  scale(0.98); }
          100% { transform: translateY(-50%) translateX(0px)   scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        @media (max-width: 768px) {
          .scroll-indicator { display: none !important; }
        }
      `}</style>

      {/* ── Content — aligné à gauche ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <span
          ref={labelRef}
          className="section-label"
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}
        >
          <span style={{
            display: 'inline-block', width: 30, height: 1.5,
            background: 'var(--accent)', borderRadius: 2,
          }} />
          Agence Digitale Full-Service
        </span>

        {/* Headline — 3 lignes */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(48px, 6.5vw, 108px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
            marginBottom: 'clamp(24px, 3vw, 40px)',
            maxWidth: '55vw',
          }}
        >
          <div ref={line1Ref} style={{ overflow: 'hidden', paddingBottom: '0.15em' }}>
            <span style={{ display: 'block' }}>Transformez votre</span>
          </div>
          <div ref={line2Ref} style={{ overflow: 'hidden', paddingBottom: '0.15em' }}>
            <span style={{ display: 'block' }}>
              <span style={{ color: 'var(--accent)', position: 'relative', display: 'inline-block' }}>
                business
                <svg
                  style={{ position: 'absolute', bottom: '-4px', left: 0, width: '100%', height: '6px', overflow: 'visible' }}
                  viewBox="0 0 100 6" preserveAspectRatio="none"
                >
                  <path d="M0,5 Q25,0 50,4 Q75,8 100,3" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </span>
          </div>
          <div ref={line3Ref} style={{ overflow: 'hidden', paddingBottom: '0.15em' }}>
            <span style={{ display: 'block', color: 'var(--text-dim)' }}>en ligne.</span>
          </div>
        </h1>

        {/* Subtext */}
        <p
          ref={subtextRef}
          style={{
            fontSize: 'clamp(15px, 1.5vw, 18px)',
            color: 'var(--text-dim)',
            lineHeight: 1.7,
            maxWidth: 480,
            marginBottom: 32,
          }}
        >
          {siteConfig.subtext}
        </p>

        {/* Badge */}
        <div
          ref={badgeRef}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(30,70,107,0.08)',
            border: '1px solid rgba(30,70,107,0.22)',
            borderRadius: 32, padding: '8px 18px',
            fontSize: 12, color: 'var(--accent)',
            fontWeight: 600, marginBottom: 24,
            letterSpacing: '0.02em',
          }}
        >
          <span style={{
            display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          Diagnostic offert — Sans engagement
          <style>{`@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.4)} }`}</style>
        </div>

        {/* CTAs */}
        <div
          ref={ctaGroupRef}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}
        >
          <Magnetic>
            <a
              href="/audit"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--accent)', color: 'white',
                borderRadius: 64,
                padding: 'clamp(14px, 2vw, 18px) clamp(28px, 4vw, 40px)',
                fontSize: 'clamp(14px, 1.3vw, 16px)',
                fontWeight: 700, fontFamily: 'var(--font-heading)',
                textDecoration: 'none',
                transition: 'background 300ms var(--ease-expo), box-shadow 300ms',
                boxShadow: '0 8px 32px rgba(30,70,107,0.25)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'var(--accent-dim)';
                el.style.boxShadow = '0 16px 48px rgba(30,70,107,0.35)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'var(--accent)';
                el.style.boxShadow = '0 8px 32px rgba(30,70,107,0.25)';
              }}
            >
              Recevoir mon diagnostic offert →
            </a>
          </Magnetic>

          <button
            onClick={scrollToRealisations}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent', color: 'var(--text)',
              border: '1px solid var(--line-hover)',
              borderRadius: 64,
              padding: 'clamp(14px, 2vw, 18px) clamp(24px, 3vw, 32px)',
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              fontWeight: 500, fontFamily: 'var(--font-body)',
              transition: 'border-color 300ms, background 300ms',
              cursor: 'none',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = 'var(--accent)';
              el.style.background = 'rgba(30,70,107,0.04)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = 'var(--line-hover)';
              el.style.background = 'transparent';
            }}
          >
            Obtenir ces résultats →
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="scroll-indicator"
        style={{
          position: 'absolute', bottom: 40, left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        }}
      >
        <span style={{ fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          Scroll
        </span>
        <div style={{
          width: 1, height: 40,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          animation: 'bounce 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}
