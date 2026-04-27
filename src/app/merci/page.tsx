'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function MerciContent() {
  const searchParams = useSearchParams();
  const prenom = searchParams.get('prenom') || '';
  const [whatsappUrl, setWhatsappUrl] = useState('https://wa.me/33688663176');

  useEffect(() => {
    const message = prenom
      ? `Bonjour Norman, je viens de remplir le formulaire sur impulse-agency.fr — je suis ${prenom}. J'attends ton appel pour le diagnostic 🙂`
      : `Bonjour Norman, je viens de remplir le formulaire sur impulse-agency.fr. J'attends ton appel pour le diagnostic 🙂`;
    setWhatsappUrl(`https://wa.me/33688663176?text=${encodeURIComponent(message)}`);
  }, [prenom]);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        event_category: 'lead',
        event_label: 'audit_form_submitted',
      });
    }
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(24px, 5vw, 64px)' }}>

      <div style={{ maxWidth: 520, width: '100%', textAlign: 'center' }}>

        {/* Logo */}
        <Link href="/" style={{ display: 'inline-block', marginBottom: 48 }}>
          <Image src="/logo.png" alt="Impulse Agency" width={120} height={48} style={{ objectFit: 'contain', height: 40, width: 'auto' }} priority />
        </Link>

        {/* Icône succès */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(37,211,102,0.12)',
          border: '2px solid rgba(37,211,102,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 32px',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontWeight: 800,
          fontSize: 'clamp(32px, 6vw, 52px)', color: 'var(--text)',
          letterSpacing: '-0.035em', lineHeight: 1, marginBottom: 16,
        }}>
          {prenom ? `C'est envoyé, ${prenom} !` : "C'est envoyé !"}
        </h1>

        <p style={{ fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 40 }}>
          Une dernière étape — confirmez votre demande sur WhatsApp.<br />
          Norman vous répond <strong style={{ color: 'var(--text)' }}>sous 24h</strong> avec votre plan d'action.
        </p>

        {/* WhatsApp CTA — au-dessus */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#25D366', color: 'white', borderRadius: 32,
            padding: '16px 32px', fontSize: 16, fontWeight: 700,
            textDecoration: 'none', transition: 'opacity 200ms',
            marginBottom: 40, boxShadow: '0 8px 24px rgba(37,211,102,0.3)',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '0.85'}
          onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.opacity = '1'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Confirmer sur WhatsApp
        </a>

        {/* Ce qui va se passer */}
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 20,
          padding: 'clamp(24px, 4vw, 36px)',
          marginBottom: 32,
          textAlign: 'left',
        }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>
            Ce qui va se passer
          </p>
          {[
            { step: '1', text: 'Norman analyse votre situation', sub: 'Avant même de vous appeler' },
            { step: '2', text: 'Il vous contacte sur WhatsApp', sub: 'Dans les 24h — souvent bien avant' },
            { step: '3', text: 'Vous recevez votre plan d\'action', sub: 'Gratuit, sans engagement, 100% personnalisé' },
          ].map(({ step, text, sub }) => (
            <div key={step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 20 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                background: 'rgba(30,70,107,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700, color: 'var(--accent)',
                fontFamily: 'var(--font-heading)',
              }}>
                {step}
              </div>
              <div>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{text}</p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
          Ou{' '}
          <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
            retourner à l'accueil
          </Link>
        </p>

      </div>
    </div>
  );
}

export default function MerciPage() {
  return (
    <Suspense fallback={null}>
      <MerciContent />
    </Suspense>
  );
}
