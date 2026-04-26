'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Magnetic } from '@/components/animations/magnetic';
import { siteConfig } from '@/data/site';

/* ─── Card data — replace src with your real screenshots ─── */
const CARDS = [
  { rot: -14, tx: -55, ty:  15, z: 3, src: '/images/card-2.jpg' },
  { rot:  -3, tx:  20, ty:   0, z: 2, src: '/images/card-1.jpg' },
  { rot:   9, tx:  95, ty:  20, z: 1, src: '/images/card-1.jpg' },
];

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
  const cardsRef     = useRef<HTMLDivElement>(null);

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

    // Cards entrance
    if (cardsRef.current) {
      const cardEls = Array.from(cardsRef.current.children);
      gsap.set(cardEls, { opacity: 0, y: 60, scale: 0.85 });
      tl.to(cardEls, {
        opacity: 1, y: 0, scale: 1,
        duration: 1.0, stagger: 0.12, ease: 'power3.out',
      }, 0.3);
    }

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
      className="hero-mesh hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(100px, 14vw, 160px) clamp(24px, 4vw, 64px) 80px',
        position: 'relative',
        overflow: 'hidden',
        gap: 'clamp(40px, 6vw, 100px)',
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

      <style>{`
        @keyframes floatBlur {
          0%   { transform: translate(0, 0) scale(1); }
          100% { transform: translate(20px, -30px) scale(1.1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        @keyframes cardFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @media (max-width: 900px) {
          .hero-cards       { display: none !important; }
          .scroll-indicator { display: none !important; }
          .hero-badge       { display: none !important; }
          .hero-h1          { font-size: 40px !important; }
          .hero-section     {
            align-items: flex-start !important;
            padding-top: 100px !important;
            padding-bottom: 48px !important;
            min-height: auto !important;
          }
          .hero-cta-group   {
            flex-wrap: nowrap !important;
            justify-content: center !important;
            gap: 8px !important;
          }
          .hero-cta-group > * {
            flex: 0 0 auto !important;
            display: block !important;
          }
          .hero-cta-group > * > a,
          .hero-cta-group > button {
            display: flex !important;
            justify-content: center !important;
            padding: 14px 22px !important;
            font-size: 14px !important;
            white-space: nowrap !important;
          }
          .cta-text-long  { display: none !important; }
          .cta-text-short { display: inline !important; }
        }
        @media (min-width: 901px) {
          .cta-text-short { display: none; }
        }
      `}</style>

      {/* ── Left — content ── */}
      <div style={{ flex: 1, minWidth: 0, position: 'relative', zIndex: 1 }}>

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

        <h1
          className="hero-h1"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(54px, 6vw, 104px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: 'var(--text)',
            marginBottom: 'clamp(24px, 3vw, 40px)',
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

        <p
          ref={subtextRef}
          style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            color: 'var(--text-dim)',
            lineHeight: 1.7,
            maxWidth: 460,
            marginBottom: 32,
          }}
        >
          {siteConfig.subtext}
        </p>

        <div
          ref={badgeRef}
          className="hero-badge"
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

        <div
          ref={ctaGroupRef}
          className="hero-cta-group"
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
              <span className="cta-text-long">Recevoir mon audit gratuit</span>
              <span className="cta-text-short">Booster mon business</span>
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
              <span className="cta-text-long">Voir nos réalisations</span>
              <span className="cta-text-short">Voir les résultats</span>
          </button>
        </div>
      </div>

      {/* ── Right — stacked cards ── */}
      <div
        className="hero-cards"
        style={{
          position: 'relative',
          width: 'clamp(320px, 32vw, 480px)',
          height: 'clamp(380px, 42vw, 560px)',
          flexShrink: 0,
          zIndex: 1,
          animation: 'cardFloat 6s ease-in-out infinite',
        }}
      >
        <div ref={cardsRef} style={{ position: 'relative', width: '100%', height: '100%' }}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 'clamp(180px, 18vw, 260px)',
                height: 'clamp(250px, 26vw, 370px)',
                marginLeft: 'calc(clamp(180px, 18vw, 260px) / -2)',
                marginTop: 'calc(clamp(250px, 26vw, 370px) / -2)',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 24px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.10)',
                transform: `rotate(${card.rot}deg) translate(${card.tx}px, ${card.ty}px)`,
                zIndex: card.z,
                background: '#1E466B',
              }}
            >
              {/* Screenshot — add your image to /public/images/card-1.jpg etc. */}
              <img
                src={card.src}
                alt=""
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top',
                  display: 'block',
                }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              />
              {/* Fallback gradient si image absente */}
              <div style={{
                position: 'absolute', inset: 0,
                background: i === 0
                  ? 'linear-gradient(145deg, #1E466B 0%, #0d2640 100%)'
                  : i === 1
                  ? 'linear-gradient(145deg, #163350 0%, #0a1e30 100%)'
                  : 'linear-gradient(145deg, #0a1628 0%, #05101e 100%)',
                zIndex: -1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{
                  color: 'rgba(255,255,255,0.15)',
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: 2, textTransform: 'uppercase',
                  fontFamily: 'var(--font-heading)',
                }}>
                  Projet {i + 1}
                </span>
              </div>
              {/* Badge logo */}
              <div style={{
                position: 'absolute', top: 14, left: 14,
                width: 34, height: 34, borderRadius: 10,
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
              }}>
                <span style={{
                  color: 'white', fontSize: 13,
                  fontWeight: 900, fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.03em',
                }}>I</span>
              </div>
            </div>
          ))}
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
