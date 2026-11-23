import type { Metadata } from 'next';
import Link from 'next/link';
import { TalentForm } from '@/components/forms/talent-form';

export const metadata: Metadata = {
  title: 'Devenir talent UGC ou mannequin',
  description:
    'Mannequin ou créatrice UGC, où que tu sois en France ? Postule pour tourner avec les marques clientes d’Impulse Agency.',
  alternates: { canonical: 'https://impulse-agency.fr/talents/rejoindre' },
};

const points = [
  'Des tournages réguliers avec des marques locales et nationales',
  'Brief clair, rémunération annoncée avant chaque mission',
  'Contrat écrit pour chaque collaboration',
];

export default function RejoindrePage() {
  return (
    <div style={{ paddingTop: 'clamp(110px, 12vw, 140px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <Link href="/talents" style={{ color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>← Talents</Link>
        <span className="section-label" style={{ display: 'block', margin: '32px 0 16px' }}>Candidature</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 6vw, 72px)', letterSpacing: '-0.04em', marginBottom: 20 }}>
          Tourne avec nos marques.
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 28 }}>
          On cherche des mannequins et des créatrices UGC partout en France. Pas besoin d’avoir une grosse communauté : on regarde surtout ton aisance face caméra et la qualité de tes contenus.
        </p>
        <ul style={{ listStyle: 'none', marginBottom: 48, borderTop: '1px solid var(--line-hover)' }}>
          {points.map(p => (
            <li key={p} style={{ padding: '14px 0', borderBottom: '1px solid var(--line)', fontWeight: 500 }}>{p}</li>
          ))}
        </ul>
        <TalentForm type="candidature" />
      </div>
    </div>
  );
}
