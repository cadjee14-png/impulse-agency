'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Magnetic } from '@/components/animations/magnetic';
import { siteConfig } from '@/data/site';

/* ── Icons ─────────────────────────────────────────────────────── */
const IconMonitor = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
  </svg>
);
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconShare = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/>
  </svg>
);
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);
const IconCheck = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 5l-7 7 7 7"/>
  </svg>
);
const IconArrowRight = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

/* ── Data ──────────────────────────────────────────────────────── */
const SERVICES = [
  { label: 'Sites Web',       desc: 'Vitrine, e-commerce, landing page',   icon: <IconMonitor /> },
  { label: 'Publicité',       desc: 'Meta Ads, Google Ads, TikTok Ads',    icon: <IconTarget /> },
  { label: 'Réseaux Sociaux', desc: 'Contenu, community management',       icon: <IconShare /> },
  { label: 'SEO',             desc: 'Référencement naturel, contenu',      icon: <IconSearch /> },
  { label: 'Branding',        desc: 'Logo, identité visuelle, charte',     icon: <IconStar /> },
];

const BUDGETS = [
  { label: 'Moins de 500€',   sub: 'par mois',        value: '<500€/mois' },
  { label: '500 — 1 000€',    sub: 'par mois',        value: '500-1000€/mois' },
  { label: '1 000 — 2 000€',  sub: 'par mois',        value: '1000-2000€/mois' },
  { label: '2 000 — 5 000€',  sub: 'par mois',        value: '2000-5000€/mois' },
  { label: '5 000€+',         sub: 'par mois',        value: '5000€+/mois' },
  { label: 'Sur devis',       sub: 'projet ponctuel', value: 'Sur devis' },
];

const SECTEURS = ['E-commerce', 'Restaurant / Food', 'Services B2B', 'Retail / Boutique', 'Santé / Bien-être', 'Immobilier', 'Autre'];

const STEP_CONFIG = [
  { title: 'Quels services vous intéressent ?',   sub: 'Plusieurs choix possibles.' },
  { title: 'Quel est votre budget mensuel ?',     sub: 'Pas de bonne ou mauvaise réponse.' },
  { title: 'Vos coordonnées',                    sub: 'On vous rappelle sous 24h, gratuit.' },
];

/* ── Props ─────────────────────────────────────────────────────── */
interface DiagnosticFormProps {
  /** 'section' = embedded in homepage (dark bg), 'page' = standalone /audit */
  variant?: 'section' | 'page';
}

/* ── Component ──────────────────────────────────────────────────── */
export function DiagnosticForm({ variant = 'page' }: DiagnosticFormProps) {
  const router = useRouter();
  const isSection = variant === 'section';

  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<'fwd' | 'bck'>('fwd');

  const [services, setServices]     = useState<string[]>([]);
  const [budget, setBudget]         = useState('');
  const [description, setDescription] = useState('');
  const [prenom, setPrenom]         = useState('');
  const [whatsapp, setWhatsapp]     = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [secteur, setSecteur]       = useState('');
  const [error, setError]           = useState('');
  const [submitting, setSubmitting] = useState(false);

  const toggleService = (s: string) =>
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const goNext = () => { setDirection('fwd'); setStep(s => s + 1); };
  const goBack = () => { setDirection('bck'); setStep(s => s - 1); };

  const handleSubmit = async () => {
    if (!prenom.trim() || !whatsapp.trim()) {
      setError('Veuillez renseigner votre prénom et votre numéro WhatsApp.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, whatsapp, entreprise, secteur, services, budget, description }),
      });
      if (res.ok) {
        router.push('/merci');
      } else {
        setError('Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.');
        setSubmitting(false);
      }
    } catch {
      setError('Une erreur est survenue. Réessayez ou contactez-nous sur WhatsApp.');
      setSubmitting(false);
    }
  };

  const progress = (step / 3) * 100;

  // ── Styles adaptés selon variant ─────────────────────────────
  const cardBg      = isSection ? 'var(--surface)'         : 'var(--surface)';
  const cardBorder  = isSection ? '1px solid rgba(255,255,255,0.08)' : '1.5px solid var(--line)';
  const inputBg     = isSection ? 'var(--bg)'              : 'var(--surface)';
  const stepTitleC  = isSection ? 'var(--text)'            : 'var(--text)';
  const stepSubC    = isSection ? 'var(--text-dim)'        : 'var(--text-dim)';

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: inputBg,
    border: '1.5px solid var(--line)',
    borderRadius: 12,
    padding: '14px 18px',
    fontSize: 15,
    color: 'var(--text)',
    fontFamily: 'var(--font-body)',
    outline: 'none',
    transition: 'border-color 200ms, box-shadow 200ms',
  };

  const focusInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--accent)';
    e.target.style.boxShadow = '0 0 0 3px rgba(30,70,107,0.08)';
  };
  const blurInput = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'var(--line)';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{
      background: cardBg,
      borderRadius: 24,
      padding: 'clamp(24px, 4vw, 36px)',
      border: cardBorder,
      boxShadow: isSection ? '0 32px 80px rgba(0,0,0,0.2)' : '0 24px 64px rgba(0,0,0,0.06)',
    }}>

      {/* ── Barre de progression ──────────────────────────────── */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          {[1, 2, 3].map((n, i) => (
            <React.Fragment key={n}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                background: step > n ? 'var(--accent)' : step === n ? 'var(--accent)' : 'rgba(30,70,107,0.08)',
                border: step === n ? '2px solid var(--accent)' : step > n ? 'none' : '2px solid var(--line)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 400ms var(--ease-expo)',
                boxShadow: step === n ? '0 0 0 3px rgba(30,70,107,0.12)' : 'none',
              }}>
                {step > n
                  ? <IconCheck />
                  : <span style={{ fontSize: 10, fontWeight: 700, color: step === n ? 'white' : 'var(--text-muted)' }}>{n}</span>
                }
              </div>
              {i < 2 && (
                <div style={{
                  flex: 1, height: 2, marginLeft: 5, marginRight: 5,
                  background: step > n ? 'var(--accent)' : 'var(--line)',
                  transition: 'background 400ms var(--ease-expo)',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
        <div style={{ height: 3, background: 'var(--line)', borderRadius: 9999, overflow: 'hidden' }}>
          <div style={{
            height: '100%', width: `${progress}%`,
            background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-light) 100%)',
            borderRadius: 9999,
            transition: 'width 600ms var(--ease-expo)',
          }} />
        </div>
      </div>

      {/* ── Contenu animé ─────────────────────────────────────── */}
      <div key={step} className={`step-${direction}`}>

        {/* Header étape */}
        <div style={{ marginBottom: 20 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent)' }}>
            Étape {step} sur 3
          </span>
          <h3 style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(18px, 3vw, 24px)', color: stepTitleC,
            letterSpacing: '-0.03em', lineHeight: 1.1,
            marginTop: 6, marginBottom: 6,
          }}>
            {STEP_CONFIG[step - 1].title}
          </h3>
          <p style={{ fontSize: 13, color: stepSubC, lineHeight: 1.5 }}>
            {STEP_CONFIG[step - 1].sub}
          </p>
        </div>

        {/* ÉTAPE 1 — Services */}
        {step === 1 && (
          <div className="services-grid" style={{ marginBottom: 20 }}>
            {SERVICES.map((s) => {
              const sel = services.includes(s.label);
              return (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => toggleService(s.label)}
                  style={{
                    position: 'relative',
                    background: sel ? 'rgba(30,70,107,0.07)' : 'var(--bg)',
                    border: `1.5px solid ${sel ? 'var(--accent)' : 'var(--line)'}`,
                    borderRadius: 14, padding: '16px 14px',
                    textAlign: 'left', cursor: 'pointer',
                    transition: 'all 250ms var(--ease-expo)',
                    transform: sel ? 'scale(1.02)' : 'scale(1)',
                    boxShadow: sel ? '0 6px 24px rgba(30,70,107,0.12)' : 'none',
                  }}
                >
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 18, height: 18, borderRadius: '50%',
                    background: sel ? 'var(--accent)' : 'var(--line)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 250ms',
                  }}>
                    {sel && <IconCheck />}
                  </div>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: sel ? 'rgba(30,70,107,0.12)' : 'var(--bg-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: sel ? 'var(--accent)' : 'var(--text-dim)',
                    marginBottom: 10, transition: 'all 250ms',
                  }}>
                    {s.icon}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: sel ? 'var(--accent)' : 'var(--text)', fontFamily: 'var(--font-heading)', marginBottom: 3 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    {s.desc}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* ÉTAPE 2 — Budget + Description */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
            <div className="budget-grid">
              {BUDGETS.map((b) => {
                const sel = budget === b.value;
                return (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => setBudget(b.value)}
                    style={{
                      background: sel ? 'rgba(30,70,107,0.07)' : 'var(--bg)',
                      border: `1.5px solid ${sel ? 'var(--accent)' : 'var(--line)'}`,
                      borderRadius: 12, padding: '13px 14px',
                      textAlign: 'left', cursor: 'pointer',
                      transition: 'all 250ms var(--ease-expo)',
                      transform: sel ? 'scale(1.02)' : 'scale(1)',
                      display: 'flex', flexDirection: 'column', gap: 2,
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: sel ? 'var(--accent)' : 'var(--text)', fontFamily: 'var(--font-heading)' }}>
                      {b.label}
                    </span>
                    <span style={{ fontSize: 11, color: sel ? 'rgba(30,70,107,0.6)' : 'var(--text-muted)' }}>
                      {b.sub}
                    </span>
                  </button>
                );
              })}
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Décrivez votre projet <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnel)</span>
              </label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Mon objectif principal est..."
                rows={3}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
          </div>
        )}

        {/* ÉTAPE 3 — Coordonnées */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-resp">
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Prénom *</label>
                <input type="text" value={prenom} onChange={e => setPrenom(e.target.value)} placeholder="Votre prénom" autoFocus style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>WhatsApp *</label>
                <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="+33 6 00 00 00 00" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="form-grid-resp">
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Entreprise</label>
                <input type="text" value={entreprise} onChange={e => setEntreprise(e.target.value)} placeholder="Votre société ou site" style={inputStyle} onFocus={focusInput} onBlur={blurInput} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Secteur</label>
                <div style={{ position: 'relative' }}>
                  <select value={secteur} onChange={e => setSecteur(e.target.value)} style={{ ...inputStyle, color: secteur ? 'var(--text)' : 'var(--text-muted)', appearance: 'none', cursor: 'pointer' }} onFocus={focusInput} onBlur={blurInput}>
                    <option value="">Votre secteur</option>
                    {SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <svg style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>
            </div>
            {error && (
              <div style={{ background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#dc2626', lineHeight: 1.5 }}>
                {error}
              </div>
            )}
          </div>
        )}

        {/* ── Navigation ──────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 10, alignItems: 'stretch' }}>
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              style={{
                flexShrink: 0,
                background: 'transparent',
                border: '1.5px solid var(--line)',
                borderRadius: 64, padding: '14px 18px',
                fontSize: 14, fontWeight: 600,
                fontFamily: 'var(--font-body)',
                cursor: 'pointer', color: 'var(--text-dim)',
                transition: 'all 200ms',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line-hover)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--line)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-dim)'; }}
            >
              <IconArrowLeft /> Retour
            </button>
          )}
          <Magnetic style={{ flex: 1, display: 'block' }}>
            {step < 3 ? (
              <button
                type="button"
                onClick={goNext}
                style={{
                  width: '100%',
                  background: 'var(--accent)', color: 'white',
                  border: 'none', borderRadius: 64, padding: '16px 28px',
                  fontSize: 15, fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  cursor: 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  transition: 'background 300ms, box-shadow 300ms',
                  boxShadow: '0 8px 28px rgba(30,70,107,0.25)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-dim)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 40px rgba(30,70,107,0.35)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(30,70,107,0.25)'; }}
              >
                Suivant <IconArrowRight />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                style={{
                  width: '100%',
                  background: submitting ? 'var(--text-muted)' : 'var(--accent)',
                  color: 'white', border: 'none', borderRadius: 64,
                  padding: '16px 24px',
                  fontSize: 'clamp(13px, 3vw, 15px)', fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  cursor: submitting ? 'not-allowed' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  transition: 'background 300ms, box-shadow 300ms',
                  boxShadow: submitting ? 'none' : '0 8px 28px rgba(30,70,107,0.25)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { if (!submitting) { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-dim)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 14px 40px rgba(30,70,107,0.35)'; }}}
                onMouseLeave={e => { if (!submitting) { (e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 28px rgba(30,70,107,0.25)'; }}}
              >
                {submitting ? 'Envoi en cours...' : 'Recevoir mon diagnostic offert →'}
              </button>
            )}
          </Magnetic>
        </div>

        {/* Trust badges — étape 3 */}
        {step === 3 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(8px, 2vw, 18px)', flexWrap: 'nowrap', paddingTop: 12 }}>
            {['Gratuit', 'Sans engagement', 'Sous 24h'].map((t, i) => (
              <span key={i} style={{ fontSize: 11, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 3, whiteSpace: 'nowrap' }}>
                <span style={{ color: '#25D366', fontWeight: 700 }}>✓</span> {t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* WhatsApp */}
      <div style={{ borderTop: '1px solid var(--line)', marginTop: 20, paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ou directement</span>
        <a
          href={siteConfig.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#25D366', color: 'white', borderRadius: 32, padding: '8px 16px', fontSize: 13, fontWeight: 600, textDecoration: 'none', transition: 'opacity 200ms' }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </a>
      </div>

      <style>{`
        @media (max-width: 520px) {
          .form-grid-resp { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
