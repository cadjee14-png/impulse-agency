'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { Magnetic } from '@/components/animations/magnetic';
import { FadeIn } from '@/components/animations/fade-in';
import { LineMask } from '@/components/animations/line-mask';
import { siteConfig } from '@/data/site';

export default function AuditPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form || !btnRef.current) return;

    const prenom = (form.querySelector('input[type="text"]') as HTMLInputElement)?.value;
    const whatsapp = (form.querySelector('input[type="tel"]') as HTMLInputElement)?.value;

    btnRef.current.textContent = 'Envoi en cours...';
    btnRef.current.disabled = true;

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, whatsapp }),
      });

      if (res.ok) {
        btnRef.current.textContent = '✓ On vous rappelle sous 24h !';
        btnRef.current.style.background = '#25D366';
        form.reset();
      } else {
        btnRef.current.textContent = 'Erreur — réessayez';
        btnRef.current.style.background = '#e53e3e';
        btnRef.current.disabled = false;
      }
    } catch {
      btnRef.current.textContent = 'Erreur — réessayez';
      btnRef.current.style.background = '#e53e3e';
      btnRef.current.disabled = false;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(24px, 4vw, 40px)' }}>

        {/* Retour */}
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, textDecoration: 'none', marginBottom: 32 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour
        </Link>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
              Audit Gratuit
            </span>
          </FadeIn>

          <LineMask as="h1" trigger="scroll" style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 64px)', color: 'var(--text)',
            letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 20,
          }}>
            {`30 secondes.\nOn s'occupe du reste.`}
          </LineMask>

          <FadeIn direction="up" delay={0.15}>
            <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.6 }}>
              Laissez votre prénom et votre WhatsApp. On vous rappelle sous 24h avec un plan d'action personnalisé — gratuit, sans engagement.
            </p>
          </FadeIn>
        </div>

        {/* Form — 2 champs seulement */}
        <FadeIn direction="up" delay={0.2}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{
              background: 'var(--surface)',
              borderRadius: 20,
              padding: 'clamp(28px, 4vw, 40px)',
              border: '1px solid var(--line)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Prénom *
              </label>
              <input
                type="text"
                placeholder="Votre prénom"
                required
                style={{
                  width: '100%', background: 'var(--bg)',
                  border: '1px solid var(--line)', borderRadius: 12,
                  padding: '15px 18px', fontSize: 16, color: 'var(--text)',
                  fontFamily: 'var(--font-body)', outline: 'none',
                  transition: 'border-color 200ms, box-shadow 200ms',
                }}
                onFocus={e => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--accent)';
                  (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(30,70,107,0.08)';
                }}
                onBlur={e => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--line)';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 8, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Numéro WhatsApp *
              </label>
              <input
                type="tel"
                placeholder="+33 6 00 00 00 00"
                required
                style={{
                  width: '100%', background: 'var(--bg)',
                  border: '1px solid var(--line)', borderRadius: 12,
                  padding: '15px 18px', fontSize: 16, color: 'var(--text)',
                  fontFamily: 'var(--font-body)', outline: 'none',
                  transition: 'border-color 200ms, box-shadow 200ms',
                }}
                onFocus={e => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--accent)';
                  (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(30,70,107,0.08)';
                }}
                onBlur={e => {
                  (e.target as HTMLInputElement).style.borderColor = 'var(--line)';
                  (e.target as HTMLInputElement).style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Submit */}
            <Magnetic style={{ width: '100%' }}>
              <button
                ref={btnRef}
                type="submit"
                style={{
                  width: '100%', background: 'var(--accent)', color: 'white',
                  border: 'none', borderRadius: 64, padding: '18px 40px',
                  fontSize: 'clamp(14px, 4vw, 17px)', fontWeight: 700, fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.01em', cursor: 'none', whiteSpace: 'nowrap',
                  transition: 'background 300ms, box-shadow 300ms',
                  boxShadow: '0 8px 32px rgba(30,70,107,0.22)',
                  marginTop: 4,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-dim)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 16px 48px rgba(30,70,107,0.32)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)';
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px rgba(30,70,107,0.22)';
                }}
              >
                Recevoir mon audit gratuit →
              </button>
            </Magnetic>

            {/* Trust */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(8px, 2vw, 20px)', flexWrap: 'nowrap', paddingTop: 4 }}>
              {['Gratuit', 'Sans engagement', 'Réponse sous 24h'].map((t, i) => (
                <span key={i} style={{ fontSize: 'clamp(11px, 3vw, 12px)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#25D366', fontWeight: 700 }}>✓</span> {t}
                </span>
              ))}
            </div>
          </form>
        </FadeIn>

        {/* WhatsApp direct */}
        <FadeIn direction="up" delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>Ou contactez-nous directement</p>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#25D366', color: 'white', borderRadius: 32,
                padding: '12px 24px', fontSize: 15, fontWeight: 600,
                textDecoration: 'none', transition: 'opacity 200ms',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Écrire sur WhatsApp
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
