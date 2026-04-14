'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Magnetic } from '@/components/animations/magnetic';
import { LineMask } from '@/components/animations/line-mask';
import { FadeIn } from '@/components/animations/fade-in';
import { siteConfig } from '@/data/site';

const SERVICES = ['Sites Web', 'Publicité (Meta/Google/TikTok)', 'Réseaux Sociaux', 'SEO', 'Branding'];

export function AuditCta() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedServices, setSelectedServices] = React.useState<string[]>([]);
  const router = useRouter();

  const toggleService = (s: string) => {
    setSelectedServices(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    const prenom = (form.querySelector('input[name="prenom"]') as HTMLInputElement)?.value;
    const whatsapp = (form.querySelector('input[name="whatsapp"]') as HTMLInputElement)?.value;
    const entreprise = (form.querySelector('input[name="entreprise"]') as HTMLInputElement)?.value;
    const secteur = (form.querySelector('select[name="secteur"]') as HTMLSelectElement)?.value;

    if (btn) { btn.textContent = 'Envoi en cours...'; btn.disabled = true; }

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, whatsapp, entreprise, secteur, services: selectedServices }),
      });

      if (res.ok) {
        router.push('/merci');
      } else {
        if (btn) { btn.textContent = 'Erreur — réessayez'; btn.style.background = '#e53e3e'; btn.disabled = false; }
      }
    } catch {
      if (btn) { btn.textContent = 'Erreur — réessayez'; btn.style.background = '#e53e3e'; btn.disabled = false; }
    }
  };

  return (
    <section
      id="audit"
      style={{
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
        background: 'var(--accent)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        width: '60vw',
        height: '60vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(103,186,244,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        left: '-5%',
        width: '40vw',
        height: '40vw',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(22,51,80,0.4) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative', textAlign: 'center' }}>
        {/* Label */}
        <FadeIn direction="up">
          <span
            style={{
              display: 'inline-block',
              fontSize: 10,
              letterSpacing: 5,
              textTransform: 'uppercase',
              color: 'var(--accent-light)',
              fontWeight: 600,
              marginBottom: 24,
            }}
          >
            Diagnostic Offert
          </span>
        </FadeIn>

        {/* Headline */}
        <LineMask
          as="h2"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 800,
            fontSize: 'clamp(36px, 6vw, 88px)',
            color: 'white',
            letterSpacing: '-0.035em',
            lineHeight: 0.92,
            marginBottom: 24,
          }}
        >
          {`Prêt à faire exploser\nvotre business ?`}
        </LineMask>

        <FadeIn direction="up" delay={0.2}>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 48 }}>
            Réservez votre diagnostic offert maintenant.<br />
            On vous rappelle sur WhatsApp sous 24h.
          </p>
        </FadeIn>

        {/* Form */}
        <FadeIn direction="up" delay={0.3}>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            style={{
              background: 'var(--surface)',
              borderRadius: 24,
              padding: 'clamp(28px, 4vw, 40px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
              marginBottom: 24,
            }}
          >
            <div
              className="form-grid-2"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <input
                type="text"
                name="prenom"
                placeholder="Votre prénom"
                required
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '14px 18px',
                  fontSize: 15,
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border-color 200ms',
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--line)'}
              />
              <input
                type="tel"
                name="whatsapp"
                placeholder="Votre numéro WhatsApp"
                required
                style={{
                  background: 'var(--bg)',
                  border: '1px solid var(--line)',
                  borderRadius: 12,
                  padding: '14px 18px',
                  fontSize: 15,
                  color: 'var(--text)',
                  fontFamily: 'var(--font-body)',
                  outline: 'none',
                  transition: 'border-color 200ms',
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--line)'}
              />
            </div>

            {/* Entreprise + Secteur */}
            <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <input
                type="text"
                name="entreprise"
                placeholder="Nom / site de votre entreprise"
                style={{
                  background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12,
                  padding: '14px 18px', fontSize: 15, color: 'var(--text)',
                  fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 200ms',
                }}
                onFocus={e => (e.target as HTMLInputElement).style.borderColor = 'var(--accent)'}
                onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'var(--line)'}
              />
              <select
                name="secteur"
                defaultValue=""
                style={{
                  background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 12,
                  padding: '14px 18px', fontSize: 15, color: 'var(--text-dim)',
                  fontFamily: 'var(--font-body)', outline: 'none', transition: 'border-color 200ms',
                  appearance: 'none', cursor: 'pointer',
                }}
                onFocus={e => (e.target as HTMLSelectElement).style.borderColor = 'var(--accent)'}
                onBlur={e => (e.target as HTMLSelectElement).style.borderColor = 'var(--line)'}
              >
                <option value="" disabled>Votre secteur</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Restaurant / Food">Restaurant / Food</option>
                <option value="Services B2B">Services B2B</option>
                <option value="Retail / Boutique">Retail / Boutique</option>
                <option value="Santé / Bien-être">Santé / Bien-être</option>
                <option value="Immobilier">Immobilier</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Services */}
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>
                Vos besoins <span style={{ fontWeight: 400, opacity: 0.6 }}>(optionnel)</span>
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SERVICES.map(s => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleService(s)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 32,
                      fontSize: 13,
                      fontFamily: 'var(--font-body)',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 200ms',
                      border: selectedServices.includes(s) ? '1px solid var(--accent-light)' : '1px solid rgba(255,255,255,0.2)',
                      background: selectedServices.includes(s) ? 'rgba(103,186,244,0.15)' : 'transparent',
                      color: selectedServices.includes(s) ? 'var(--accent-light)' : 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {selectedServices.includes(s) ? '✓ ' : ''}{s}
                  </button>
                ))}
              </div>
            </div>

            <Magnetic style={{ width: '100%' }}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'var(--accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: 64,
                  padding: '18px 40px',
                  fontSize: 'clamp(14px, 4vw, 17px)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  letterSpacing: '-0.01em',
                  whiteSpace: 'nowrap',
                  transition: 'background 300ms, transform 300ms',
                  cursor: 'none',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'var(--accent-dim)';
                  el.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = 'var(--accent)';
                  el.style.transform = 'scale(1)';
                }}
              >
                Recevoir mon diagnostic offert →
              </button>
            </Magnetic>

            {/* Trust badges */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: 'clamp(8px, 2vw, 24px)',
                flexWrap: 'nowrap',
              }}
            >
              {['Gratuit', 'Sans engagement', 'Réponse sous 24h'].map((badge, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 'clamp(11px, 3vw, 13px)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>
                  {badge}
                </span>
              ))}
            </div>
          </form>
        </FadeIn>

        {/* WhatsApp CTA */}
        <FadeIn direction="up" delay={0.4}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
              Ou écrivez-nous directement
            </span>
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
                padding: '10px 20px',
                fontSize: 14,
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
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-grid-2 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
