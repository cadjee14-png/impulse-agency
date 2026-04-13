'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: 'var(--dark)',
        color: 'white',
        paddingTop: 64,
        paddingBottom: 32,
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 48,
            paddingBottom: 48,
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            marginBottom: 32,
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 16 }}>
              <Image src="/logo.png" alt="Impulse Agency" width={140} height={56} style={{ objectFit: 'contain', height: 44, width: 'auto', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, maxWidth: 240 }}>
              Stratégies digitales qui génèrent de vrais résultats pour les marques ambitieuses.
            </p>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'border-color 300ms, color 300ms',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-light)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-light)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'border-color 300ms, color 300ms',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-light)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-light)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.7)',
                  transition: 'border-color 300ms, color 300ms',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent-light)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent-light)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.2)';
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34l-.01-8.72a8.19 8.19 0 0 0 4.79 1.53V4.68a4.85 4.85 0 0 1-1.01-.99z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>Services</p>
            {['Sites Web', 'Social Media', 'Publicité', 'SEO', 'Branding'].map(s => (
              <div key={s} style={{ marginBottom: 10 }}>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', transition: 'color 200ms' }}
                  onMouseEnter={e => (e.currentTarget as HTMLSpanElement).style.color = 'white'}
                  onMouseLeave={e => (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.55)'}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>

          {/* Pages */}
          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>Navigation</p>
            {[
              { label: 'Accueil', href: '/' },
              { label: 'Réalisations', href: '#realisations' },
              { label: 'Process', href: '#process' },
              { label: 'Audit gratuit', href: '/audit' },
            ].map(link => (
              <div key={link.href} style={{ marginBottom: 10 }}>
                <Link
                  href={link.href}
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition: 'color 200ms',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}
                  onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p className="section-label" style={{ marginBottom: 20 }}>Contact</p>
            <a
              href={`tel:${siteConfig.phone}`}
              style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 10, transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'}
            >
              {siteConfig.phone}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              style={{ display: 'block', fontSize: 14, color: 'rgba(255,255,255,0.55)', textDecoration: 'none', marginBottom: 20, transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'white'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.55)'}
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                background: '#25D366',
                color: 'white',
                borderRadius: 32,
                padding: '10px 18px',
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'opacity 300ms',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            © {year} Impulse Agency. Tous droits réservés.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <Link
              href="/mentions-legales"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)'}
            >
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)'}
            >
              Confidentialité
            </Link>
            <a
              href="/audit"
              style={{ fontSize: 13, color: 'var(--accent-light)', textDecoration: 'none', fontWeight: 500, transition: 'opacity 300ms' }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.7'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
            >
              Audit gratuit →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
