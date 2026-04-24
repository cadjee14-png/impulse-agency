'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'impulse-cookie-consent';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) {
      // Léger délai pour ne pas bloquer le rendu initial
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
    if (consent === 'accepted' && typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="cookie-banner-enter"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9990,
        background: 'rgba(13, 13, 13, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(16px, 2.5vw, 20px) clamp(20px, 4vw, 40px)',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        flexWrap: 'wrap',
      }}>
        {/* Icon + texte */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 240 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: 'rgba(103, 186, 244, 0.12)',
            border: '1px solid rgba(103, 186, 244, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#67BAF4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <p style={{ margin: 0, fontSize: 'clamp(13px, 2vw, 14px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
            <strong style={{ color: 'white', fontWeight: 600 }}>Cookies & Confidentialité</strong>
            {' '}— Nous utilisons Google Analytics pour analyser notre trafic de façon anonyme.{' '}
            <Link href="/politique-de-confidentialite" style={{ color: '#67BAF4', textDecoration: 'none', fontSize: 13 }}>
              En savoir plus
            </Link>
          </p>
        </div>

        {/* Boutons */}
        <div style={{ display: 'flex', gap: 10, flexShrink: 0, alignItems: 'center' }}>
          <button
            onClick={decline}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.18)',
              borderRadius: 32,
              padding: '10px 20px',
              fontSize: 14, fontWeight: 600,
              color: 'rgba(255,255,255,0.65)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              transition: 'all 200ms',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.35)';
              (e.currentTarget as HTMLButtonElement).style.color = 'white';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.18)';
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)';
            }}
          >
            Refuser
          </button>
          <button
            onClick={accept}
            style={{
              background: 'var(--accent)',
              border: 'none',
              borderRadius: 32,
              padding: '10px 22px',
              fontSize: 14, fontWeight: 700,
              color: 'white',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              transition: 'background 200ms, box-shadow 200ms',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(30,70,107,0.35)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-dim)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 24px rgba(30,70,107,0.45)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px rgba(30,70,107,0.35)';
            }}
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
