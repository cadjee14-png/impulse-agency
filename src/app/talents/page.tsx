import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn } from '@/components/animations/fade-in';
import { LineMask } from '@/components/animations/line-mask';
import { TalentForm } from '@/components/forms/talent-form';
import { TalentCard } from '@/components/sections/talent-card';
import { visibleTalents, brandOffers, bookingSteps } from '@/data/talents';

export const metadata: Metadata = {
  title: 'Talents UGC & Influence à Marseille',
  description:
    'Créatrices UGC et mannequins pour vos pubs Meta et TikTok, shootings et collaborations influence. Booking, tournage, montage et diffusion gérés par Impulse Agency.',
  alternates: { canonical: 'https://impulse-agency.fr/talents' },
  openGraph: {
    title: 'Talents UGC & Influence | Impulse Agency',
    description: 'Créatrices UGC et mannequins pour vos campagnes. Du brief à la diffusion en pub.',
    url: 'https://impulse-agency.fr/talents',
    images: [{ url: '/api/og', width: 1200, height: 630 }],
  },
};

const wrap: React.CSSProperties = { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' };
const h2: React.CSSProperties = { fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 52px)', marginBottom: 'clamp(32px, 4vw, 56px)', maxWidth: 720 };

export default function TalentsPage() {
  const list = visibleTalents();

  return (
    <>
      {/* Hero */}
      <section className="hero-mesh" style={{ paddingTop: 'clamp(140px, 16vw, 200px)', paddingBottom: 'clamp(64px, 8vw, 112px)' }}>
        <div style={wrap}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 24 }}>Talents UGC & Influence</span>
          </FadeIn>
          <LineMask as="h1" trigger="immediate" style={{
            fontFamily: 'var(--font-heading)', fontWeight: 800,
            fontSize: 'clamp(44px, 7.5vw, 112px)', letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 28,
          }}>
            {`Des créatrices\npour vos pubs.`}
          </LineMask>
          <FadeIn direction="up" delay={0.2}>
            <p style={{ fontSize: 'clamp(17px, 1.6vw, 20px)', color: 'var(--text-dim)', maxWidth: 620, lineHeight: 1.6, marginBottom: 36 }}>
              Vidéos UGC, shootings et collaborations influence avec nos talents basées dans le Sud. L’agence qui tourne vos contenus est aussi celle qui les diffuse : casting, tournage, montage et, si vous le voulez, campagnes Meta Ads ou TikTok Ads.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#booking" style={{ background: 'var(--accent)', color: 'white', padding: '16px 30px', borderRadius: 'var(--radius-btn)', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-heading)' }}>
                Booker un talent
              </a>
              <Link href="/talents/rejoindre" style={{ border: '1.5px solid var(--line-hover)', color: 'var(--text)', padding: '16px 30px', borderRadius: 'var(--radius-btn)', fontWeight: 600, textDecoration: 'none' }}>
                Devenir talent
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Talents */}
      <section style={{ padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div style={wrap}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>Nos talents</span>
          <h2 style={h2}>Des profils qu’on connaît et avec qui on tourne déjà.</h2>
          {list.length ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))', gap: 'clamp(24px, 3vw, 40px)' }}>
              {list.map(t => <TalentCard key={t.slug} talent={t} />)}
            </div>
          ) : (
            <p style={{ color: 'var(--text-dim)' }}>Les fiches de nos talents arrivent très vite. En attendant, décrivez-nous votre besoin plus bas.</p>
          )}
        </div>
      </section>

      {/* Offres marques */}
      <section style={{ padding: 'clamp(64px, 8vw, 112px) 0', background: 'var(--dark)', color: 'white' }}>
        <div style={wrap}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'var(--accent-light)' }}>Pour les marques</span>
          <h2 style={{ ...h2, color: 'white' }}>Un talent, un tournage, des formats prêts à diffuser.</h2>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {brandOffers.map((o, i) => (
              <div key={o.title} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 16, padding: '32px 0', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(22px, 2.4vw, 30px)', letterSpacing: '-0.02em' }}>
                  <span style={{ color: 'var(--accent-light)', marginRight: 14 }}>0{i + 1}</span>{o.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 17, lineHeight: 1.65 }}>{o.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section style={{ padding: 'clamp(64px, 8vw, 112px) 0' }}>
        <div style={wrap}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>Comment ça marche</span>
          <h2 style={h2}>Du brief à la pub en ligne.</h2>
          <ol style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 20 }}>
            {bookingSteps.map(s => (
              <li key={s.number} style={{ border: '1px solid var(--line-hover)', borderRadius: 'var(--radius-card)', padding: 28, background: 'var(--surface)' }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, color: 'var(--accent)', fontSize: 14 }}>{s.number}</span>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, margin: '12px 0 10px', letterSpacing: '-0.02em' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-dim)', fontSize: 15, lineHeight: 1.6 }}>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" style={{ padding: 'clamp(64px, 8vw, 112px) 0', background: 'var(--bg-2)' }}>
        <div style={{ ...wrap, maxWidth: 860 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 20 }}>Booking</span>
          <h2 style={{ ...h2, marginBottom: 16 }}>Parlez-nous de votre campagne.</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: 40 }}>Réponse sous 24h avec une proposition de talent et un devis.</p>
          <TalentForm type="booking" />
        </div>
      </section>

      {/* Recrutement */}
      <section style={{ padding: 'clamp(56px, 7vw, 96px) 0' }}>
        <div style={{ ...wrap, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ maxWidth: 620 }}>
            <h2 style={{ ...h2, marginBottom: 12, fontSize: 'clamp(24px, 3vw, 36px)' }}>Tu es mannequin ou créatrice UGC ?</h2>
            <p style={{ color: 'var(--text-dim)' }}>On cherche des profils à Marseille et à La Réunion pour des tournages réguliers avec nos marques clientes.</p>
          </div>
          <Link href="/talents/rejoindre" style={{ border: '1.5px solid var(--accent)', color: 'var(--accent)', padding: '16px 30px', borderRadius: 'var(--radius-btn)', fontWeight: 700, textDecoration: 'none' }}>
            Envoyer ma candidature
          </Link>
        </div>
      </section>
    </>
  );
}
