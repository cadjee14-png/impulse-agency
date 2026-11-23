import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTalent, visibleTalents } from '@/data/talents';
import { TalentPhoto } from '@/components/sections/talent-card';
import { TalentForm } from '@/components/forms/talent-form';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return visibleTalents().map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = getTalent(slug);
  if (!t) return {};
  const title = `${t.name} — ${t.roles.join(' & ')} à ${t.city}`;
  return {
    title,
    description: t.bio.slice(0, 155),
    alternates: { canonical: `https://impulse-agency.fr/talents/${t.slug}` },
    openGraph: { title, url: `https://impulse-agency.fr/talents/${t.slug}`, images: t.photos[0] ? [{ url: t.photos[0] }] : undefined },
  };
}

export default async function TalentPage({ params }: Props) {
  const { slug } = await params;
  const t = getTalent(slug);
  if (!t) notFound();

  return (
    <div style={{ paddingTop: 'clamp(110px, 12vw, 140px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <Link href="/talents" style={{ display: 'inline-flex', gap: 6, color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, textDecoration: 'none', marginBottom: 32 }}>
          ← Tous les talents
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'start' }}>
          <TalentPhoto talent={t} src={t.photos[0]} priority />

          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>{t.roles.join(' · ')}</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(44px, 7vw, 88px)', letterSpacing: '-0.04em', marginBottom: 12 }}>{t.name}</h1>
            <p style={{ color: 'var(--text-dim)', marginBottom: 28 }}>{t.city}</p>
            <p style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 36 }}>{t.bio}</p>

            {t.measurements?.length ? (
              <dl style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', borderTop: '1px solid var(--line-hover)', marginBottom: 36 }}>
                {t.measurements.map(m => (
                  <div key={m.label} style={{ padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                    <dt style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 2, color: 'var(--text-muted)' }}>{m.label}</dt>
                    <dd style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, marginTop: 4 }}>{m.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {t.socials.length ? (
              <ul style={{ listStyle: 'none', display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
                {t.socials.map(s => (
                  <li key={s.platform}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', gap: 8, padding: '10px 18px', border: '1.5px solid var(--line-hover)', borderRadius: 'var(--radius-btn)', textDecoration: 'none', color: 'var(--text)', fontWeight: 600, fontSize: 14 }}>
                      {s.platform} <span style={{ color: 'var(--accent)' }}>{s.followers}</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {t.specialties.length ? (
              <p style={{ color: 'var(--text-dim)', fontSize: 15 }}>Spécialités : {t.specialties.join(', ')}</p>
            ) : null}
          </div>
        </div>

        {t.photos.length > 1 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))', gap: 20, marginTop: 'clamp(48px, 6vw, 80px)' }}>
            {t.photos.slice(1).map(src => <TalentPhoto key={src} talent={t} src={src} />)}
          </div>
        )}

        <section style={{ margin: 'clamp(64px, 8vw, 112px) 0', maxWidth: 860 }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(26px, 3.5vw, 44px)', marginBottom: 12 }}>Booker {t.name}</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 32 }}>Décrivez votre projet, on revient vers vous sous 24h avec ses disponibilités et un devis.</p>
          <TalentForm type="booking" defaultTalent={t.name} />
        </section>
      </div>
    </div>
  );
}
