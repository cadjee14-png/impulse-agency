'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '@/data/site';

gsap.registerPlugin(ScrollTrigger);

/* ─── Card visual config ─── */
const cardConfig = [
  { isDark: false, isWide: true,  metricValue: '+180%', metricLabel: 'Leads en moyenne' },
  { isDark: true,  isWide: true,  metricValue: '+340%', metricLabel: 'Engagement moyen' },
  { isDark: false, isWide: false, metricValue: '5.2x',  metricLabel: 'ROAS moyen' },
  { isDark: true,  isWide: false, metricValue: 'Top 3', metricLabel: 'En 90 jours' },
  { isDark: false, isWide: true,  metricValue: '+95%',  metricLabel: 'Satisfaction client' },
];

/* ─── Brand logo ─── */
function BrandLogo({ slug, bg, iconColor = 'ffffff', size = 44 }: {
  slug: string; bg: string; iconColor?: string; size?: number;
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 12, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      overflow: 'hidden',
    }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://cdn.simpleicons.org/${slug}/${iconColor}`}
        width={size * 0.52}
        height={size * 0.52}
        alt={slug}
        style={{ display: 'block' }}
      />
    </div>
  );
}

/* ─── Per-card logo arrays ─── */
const cardLogos: React.ReactNode[][] = [
  // 0 — Sites Web
  [
    <BrandLogo key="shopify"    slug="shopify"           bg="#96BF48" />,
    <BrandLogo key="wordpress"  slug="wordpress"         bg="#21759B" />,
    <BrandLogo key="react"      slug="react"             bg="#20232A" iconColor="61DAFB" />,
    <BrandLogo key="nextjs"     slug="nextdotjs"         bg="#000000" />,
  ],
  // 1 — Social Media
  [
    <BrandLogo key="instagram"  slug="instagram"         bg="linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" />,
    <BrandLogo key="tiktok"     slug="tiktok"            bg="#010101" />,
    <BrandLogo key="facebook"   slug="facebook"          bg="#1877F2" />,
    <BrandLogo key="linkedin"   slug="linkedin"          bg="#0A66C2" />,
  ],
  // 2 — Publicité
  [
    <BrandLogo key="meta"       slug="meta"              bg="#0866FF" />,
    <BrandLogo key="google"     slug="google"            bg="#ffffff"  iconColor="4285F4" />,
    <BrandLogo key="googleads"  slug="googleads"         bg="#4285F4" />,
    <BrandLogo key="tiktok2"    slug="tiktok"            bg="#010101" />,
  ],
  // 3 — SEO
  [
    <BrandLogo key="google2"    slug="google"            bg="#ffffff"  iconColor="4285F4" />,
    <BrandLogo key="gsc"        slug="googlesearchconsole" bg="#458CF5" />,
    <BrandLogo key="ga"         slug="googleanalytics"   bg="#E37400" />,
    <BrandLogo key="semrush"    slug="semrush"           bg="#FF642D" />,
  ],
  // 4 — Branding
  [
    <BrandLogo key="figma"      slug="figma"             bg="#1e1e1e"  iconColor="F24E1E" />,
    <BrandLogo key="canva"      slug="canva"             bg="#00C4CC" />,
    <BrandLogo key="ai"         slug="adobeillustrator"  bg="#FF9A00" />,
  ],
];

/* ─── Service icons ─── */
function IconWeb() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
}
function IconSocial() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>;
}
function IconAds() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>;
}
function IconSeo() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>;
}
function IconBrand() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.5-.7-.5-1.1 0-.9.7-1.7 1.7-1.7H16c3 0 5.5-2.5 5.5-5.5C22 6 17.5 2 12 2z"/><circle cx="8" cy="9" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="9" r="1" fill="currentColor" stroke="none"/></svg>;
}
const ICONS = [IconWeb, IconSocial, IconAds, IconSeo, IconBrand];

/* ─── Grid backgrounds ─── */
const dotGridStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  backgroundImage: 'radial-gradient(circle, rgba(30,70,107,0.12) 1px, transparent 1px)',
  backgroundSize: '24px 24px',
  maskImage: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)',
  WebkitMaskImage: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, transparent 60%)',
};
const lineGridStyle: React.CSSProperties = {
  position: 'absolute', inset: 0, pointerEvents: 'none',
  backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)',
  backgroundSize: '48px 48px',
  maskImage: 'linear-gradient(to bottom,rgba(0,0,0,0.4) 0%,transparent 60%)',
  WebkitMaskImage: 'linear-gradient(to bottom,rgba(0,0,0,0.4) 0%,transparent 60%)',
};

/* ─── Service Card ─── */
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cfg = cardConfig[index];
  const IconComp = ICONS[index];
  const logos = cardLogos[index];
  const cardRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const dark = cfg.isDark;
  const wide = cfg.isWide;

  const bg = dark ? '#0a1628'
    : index === 0 ? 'linear-gradient(135deg,#f0f5fb 0%,#e8f0f8 100%)'
    : index === 4 ? 'linear-gradient(135deg,#e8f0f8 0%,#f0f5fb 100%)'
    : '#f5f8fc';

  const border = dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,70,107,0.1)';
  const shadow = dark ? '0 8px 32px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.03),0 8px 32px rgba(30,70,107,0.06)';

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: -8, scale: 1.01, duration: 0.5, ease: 'power3.out',
      boxShadow: dark ? '0 24px 64px rgba(0,0,0,0.5)' : '0 24px 64px rgba(30,70,107,0.15)' });
    if (accentLineRef.current) gsap.to(accentLineRef.current, { scaleX: 1, duration: 0.5, ease: 'power3.out' });
  };
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.5, ease: 'power3.out', boxShadow: shadow });
    if (accentLineRef.current) gsap.to(accentLineRef.current, { scaleX: 0, duration: 0.5, ease: 'power3.out' });
  };

  return (
    <div
      ref={cardRef}
      className={`service-card service-card-${index}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        gridColumn: wide ? '1 / -1' : undefined,
        background: bg, border, borderRadius: 16,
        padding: wide ? 'clamp(32px,4vw,48px) clamp(24px,3vw,40px)' : 'clamp(28px,3vw,40px) clamp(20px,2.5vw,32px)',
        position: 'relative', overflow: 'hidden', cursor: 'none', willChange: 'transform',
      }}
    >
      <div style={dark ? lineGridStyle : dotGridStyle} />

      {/* Accent line */}
      <div ref={accentLineRef} style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: 3,
        background: dark ? 'rgba(103,186,244,0.8)' : 'var(--accent)',
        borderRadius: '0 0 16px 16px', transform: 'scaleX(0)', transformOrigin: 'left',
      }} />

      {/* Inner */}
      <div className={wide ? 'service-card-inner-wide' : undefined} style={{
        display: wide ? 'grid' : 'block',
        gridTemplateColumns: wide ? '1.2fr 1fr' : undefined,
        gap: wide ? 'clamp(24px,4vw,40px)' : undefined,
        alignItems: wide ? 'center' : undefined,
      }}>

        {/* LEFT */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div className={`service-icon-${index}`} style={{
              width: 52, height: 52, borderRadius: 14,
              background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,70,107,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: dark ? 'rgba(255,255,255,0.7)' : 'var(--accent)', flexShrink: 0,
            }}>
              <IconComp />
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)', fontWeight: 900,
              fontSize: wide ? 'clamp(2rem,3.5vw,3rem)' : 'clamp(1.5rem,2.5vw,2.5rem)',
              color: dark ? 'rgba(255,255,255,0.05)' : 'rgba(30,70,107,0.05)',
              lineHeight: 1, letterSpacing: '-0.02em',
            }}>
              {service.number}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: wide ? 'clamp(1.6rem,3vw,2.8rem)' : 'clamp(1.2rem,2vw,1.75rem)',
            letterSpacing: '-0.025em', lineHeight: 1.1, marginBottom: 12,
            color: dark ? '#ffffff' : 'var(--text)',
          }}>
            {service.name}
          </h3>

          <p style={{
            fontSize: 'clamp(0.9rem,1vw,1.05rem)', lineHeight: 1.7,
            color: dark ? 'rgba(255,255,255,0.5)' : 'var(--text-dim)',
            marginBottom: 24, maxWidth: 400,
          }}>
            {service.description}
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: !wide ? 28 : 0 }}>
            {service.sub.map((tag, t) => (
              <span key={t} className="service-tag" style={{
                fontSize: 11, fontWeight: 600, letterSpacing: '0.04em',
                padding: '5px 13px', borderRadius: 100,
                background: dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,70,107,0.07)',
                color: dark ? 'rgba(255,255,255,0.55)' : 'var(--accent)',
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(30,70,107,0.12)',
              }}>
                {tag}
              </span>
            ))}
          </div>

          {/* Half-card bottom: metric + logos */}
          {!wide && (
            <div style={{
              borderTop: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,70,107,0.08)',
              paddingTop: 20, marginTop: 4,
            }}>
              <div style={{ marginBottom: 16 }}>
                <div className="service-metric-value" style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 900,
                  fontSize: 'clamp(1.6rem,3vw,2.6rem)', letterSpacing: '-0.04em', lineHeight: 1,
                  color: dark ? '#ffffff' : 'var(--accent)',
                }}>
                  {cfg.metricValue}
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em',
                  marginTop: 4, color: dark ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)',
                }}>
                  {cfg.metricLabel}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {logos.map((logo, k) => <span key={k}>{logo}</span>)}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — wide cards only */}
        {wide && (
          <div style={{
            borderLeft: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(30,70,107,0.08)',
            paddingLeft: 'clamp(20px,3vw,40px)',
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 20,
            justifyContent: 'center',
          }}>
            <div>
              <div className="service-metric-value" style={{
                fontFamily: 'var(--font-heading)', fontWeight: 900,
                fontSize: 'clamp(2.2rem,5vw,4.5rem)', letterSpacing: '-0.04em', lineHeight: 1,
                color: dark ? '#ffffff' : 'var(--accent)',
              }}>
                {cfg.metricValue}
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                marginTop: 6, color: dark ? 'rgba(255,255,255,0.35)' : 'var(--text-muted)',
              }}>
                {cfg.metricLabel}
              </div>
            </div>

            {/* Logo grid */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {logos.map((logo, k) => <span key={k}>{logo}</span>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main section ─── */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const eyebrow = headingRef.current?.querySelector('.services-eyebrow');
      const titleWords = headingRef.current?.querySelectorAll<HTMLElement>('.services-title-word');
      const subtitle = headingRef.current?.querySelector('.services-subtitle');

      if (eyebrow) gsap.fromTo(eyebrow, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      if (titleWords?.length) {
        gsap.set(titleWords, { opacity: 0, y: 60, rotateX: -15 });
        gsap.to(titleWords, { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      }
      if (subtitle) gsap.fromTo(subtitle, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.35, scrollTrigger: { trigger: headingRef.current, start: 'top 85%', once: true } });
      if (dividerRef.current) gsap.fromTo(dividerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: 'power3.inOut', transformOrigin: 'left', scrollTrigger: { trigger: dividerRef.current, start: 'top 90%', once: true } });

      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.service-card');
      cards?.forEach((card, i) => {
        gsap.fromTo(card,
          { opacity: 0, y: 80, scale: 0.88, rotateZ: i % 2 === 0 ? -3 : 3, rotateX: -8 },
          { opacity: 1, y: 0, scale: 1, rotateZ: 0, rotateX: 0, duration: 1, ease: 'power3.out', delay: 0.12 * i, scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true } }
        );
        const tags = card.querySelectorAll('.service-tag');
        if (tags.length) gsap.fromTo(tags, { opacity: 0, y: 12, scale: 0.85 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', stagger: 0.08, delay: 0.12 * i + 0.5, scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true } });
        const metric = card.querySelector<HTMLElement>('.service-metric-value');
        if (metric) gsap.fromTo(metric, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut', delay: 0.12 * i + 0.6, scrollTrigger: { trigger: gridRef.current, start: 'top 82%', once: true } });
      });

      services.forEach((_, i) => {
        const icon = gridRef.current?.querySelector(`.service-icon-${i}`);
        if (icon) gsap.to(icon, { y: -8, rotate: 3, duration: 2.6 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.5 });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" style={{ padding: 'clamp(80px,10vw,140px) 0', background: 'var(--bg)', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,4vw,48px)' }}>

        <div ref={headingRef} style={{ marginBottom: 48 }}>
          <div className="services-eyebrow" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20,
            padding: '8px 20px 8px 12px', borderRadius: 100,
            background: 'rgba(30,70,107,0.06)', border: '1px solid rgba(30,70,107,0.14)',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent)' }}>
              Nos Services
            </span>
          </div>

          <h2 style={{ fontFamily: 'var(--font-inter)', fontWeight: 800, fontSize: 'clamp(2.2rem,4.5vw,4rem)', lineHeight: 1, letterSpacing: '-0.04em', perspective: 800, marginBottom: 20, overflow: 'hidden' }}>
            {['On', "s'occupe", 'de'].map((w, i) => (
              <span key={i} className="services-title-word" style={{ display: 'inline-block', marginRight: '0.22em', color: 'var(--text)' }}>{w}</span>
            ))}
            <span className="services-title-word" style={{
              display: 'inline-block', fontStyle: 'italic', fontWeight: 400,
              fontFamily: 'var(--font-playfair), "Playfair Display", Georgia, serif',
              color: 'var(--accent)', letterSpacing: '0.01em',
            }}>
              tout
            </span>
          </h2>

          <p className="services-subtitle" style={{ fontSize: 'clamp(1rem,1.2vw,1.15rem)', color: 'var(--text-dim)', lineHeight: 1.7, maxWidth: 460 }}>
            Concentrez-vous sur votre métier. Impulse gère votre visibilité digitale.
          </p>
        </div>

        <div ref={dividerRef} style={{ width: '100%', height: 1, marginBottom: 48, background: 'linear-gradient(90deg,rgba(30,70,107,0.25),rgba(30,70,107,0.1) 50%,transparent)', transformOrigin: 'left' }} />

        <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }} className="services-cards-grid">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .services-cards-grid { grid-template-columns: 1fr !important; }
          .service-card { grid-column: 1 !important; }
          .service-card-inner-wide { grid-template-columns: 1fr !important; }
          .service-card-inner-wide > div:last-child { display: none !important; }
        }
      `}</style>
    </section>
  );
}
