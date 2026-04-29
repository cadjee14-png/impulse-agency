'use client';

import { useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'impulse_exit_popup_seen';
const DELAY_BEFORE_ACTIVE = 8000; // actif après 8s sur la page

export function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const activeRef  = useRef(false); // popup prêt à se déclencher
  const shownRef   = useRef(false); // déjà montré dans cette session

  useEffect(() => {
    // Ne pas afficher si déjà vu dans les 3 derniers jours
    const seen = localStorage.getItem(STORAGE_KEY);
    if (seen && Date.now() - parseInt(seen) < 3 * 24 * 60 * 60 * 1000) return;

    // Activer le trigger seulement après 8 secondes (visiteur engagé)
    const timer = setTimeout(() => { activeRef.current = true; }, DELAY_BEFORE_ACTIVE);

    const onMouseOut = (e: MouseEvent) => {
      if (!activeRef.current || shownRef.current) return;
      // Déclenchement quand la souris sort par le haut
      if (e.clientY <= 10) {
        shownRef.current = true;
        setVisible(true);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
      }
    };

    document.addEventListener('mouseleave', onMouseOut);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseOut);
    };
  }, []);

  const close = () => setVisible(false);

  if (!visible) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 9998,
          animation: 'fadeIn 300ms ease',
        }}
      />

      {/* Popup */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          background: '#ffffff',
          borderRadius: 24,
          padding: 'clamp(32px, 5vw, 52px)',
          maxWidth: 480,
          width: 'calc(100vw - 40px)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.25)',
          animation: 'popupIn 350ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {/* Bouton fermer */}
        <button
          onClick={close}
          aria-label="Fermer"
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 32, height: 32, borderRadius: '50%',
            border: 'none', background: 'rgba(0,0,0,0.06)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-dim)', fontSize: 18, lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'rgba(30,70,107,0.08)', borderRadius: 32,
          padding: '6px 14px', marginBottom: 20,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Diagnostic offert
          </span>
        </div>

        {/* Titre */}
        <h2 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 900,
          fontSize: 'clamp(22px, 4vw, 30px)', color: 'var(--text)',
          letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12,
        }}>
          Avant de partir —<br />
          <span style={{ color: 'var(--accent)' }}>on peut vous aider.</span>
        </h2>

        {/* Sous-titre */}
        <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 28 }}>
          30 secondes pour recevoir une analyse gratuite de votre présence digitale. Plan d&apos;action personnalisé sous 24h.
        </p>

        {/* Réassurance */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
          {['Gratuit', 'Sans engagement', 'Sous 24h'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-dim)' }}>{item}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          href="/audit"
          onClick={close}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            background: 'var(--accent)', color: '#ffffff',
            borderRadius: 64, padding: '16px 32px',
            fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
            textDecoration: 'none', letterSpacing: '-0.01em',
            boxShadow: '0 8px 32px rgba(30,70,107,0.25)',
            marginBottom: 12,
          }}
        >
          Je veux mon diagnostic gratuit
        </a>

        {/* Lien secondaire */}
        <button
          onClick={close}
          style={{
            display: 'block', width: '100%', textAlign: 'center',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 13, color: 'var(--text-muted)', padding: '4px 0',
          }}
        >
          Non merci, je reviendrai plus tard
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes popupIn {
          from { opacity: 0; transform: translate(-50%, calc(-50% + 20px)); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </>
  );
}
