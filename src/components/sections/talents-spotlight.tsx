import Link from 'next/link';
import Image from 'next/image';
import { FadeIn } from '@/components/animations/fade-in';
import { visibleTalents, brandOffers } from '@/data/talents';

export function TalentsSpotlight() {
  const featured = visibleTalents().filter(t => t.photos.length);
  const photos = featured.flatMap(t => t.photos.slice(0, 3).map(src => ({ src, talent: t }))).slice(0, 3);

  return (
    <section id="talents" style={{ padding: 'clamp(80px, 10vw, 140px) 0', background: 'var(--dark)', color: 'white', overflow: 'hidden' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(48px, 6vw, 96px)',
          alignItems: 'center',
        }}
      >
        <div>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 24, color: 'var(--accent-light)' }}>
              <span style={{ border: '1px solid var(--accent-light)', borderRadius: 999, padding: '3px 10px', letterSpacing: 2 }}>Nouveau</span>
              Talents UGC & Influence
            </span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(34px, 5vw, 68px)', marginBottom: 28 }}>
              On fait vos pubs.<br />
              <span style={{ color: 'var(--accent-light)' }}>On vous trouve aussi les visages.</span>
            </h2>
            <p style={{ fontSize: 'clamp(16px, 1.4vw, 18px)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 36, maxWidth: 520 }}>
              Impulse représente des mannequins et des créatrices UGC. Vous bookez un talent, on gère le tournage, le montage et la diffusion de vos contenus en publicité. Un seul interlocuteur du casting jusqu’aux résultats.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={0.1}>
            <ul style={{ listStyle: 'none', borderTop: '1px solid rgba(255,255,255,0.12)', marginBottom: 40 }}>
              {brandOffers.map((o, i) => (
                <li key={o.title} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.12)', fontWeight: 600, fontSize: 17 }}>
                  <span style={{ color: 'var(--accent-light)', fontFamily: 'var(--font-heading)' }}>0{i + 1}</span>
                  {o.title}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link href="/talents#booking" style={{ background: 'white', color: 'var(--dark)', padding: '16px 30px', borderRadius: 'var(--radius-btn)', fontWeight: 700, textDecoration: 'none', fontFamily: 'var(--font-heading)' }}>
                Booker un talent
              </Link>
              <Link href="/talents" style={{ border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', padding: '16px 30px', borderRadius: 'var(--radius-btn)', fontWeight: 600, textDecoration: 'none' }}>
                Voir nos talents
              </Link>
            </div>
          </FadeIn>
        </div>

        {photos.length > 0 && (
          <FadeIn direction="up" delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gridTemplateRows: '1fr 1fr', gap: 14, aspectRatio: '1 / 1.05', maxWidth: 560, marginInline: 'auto' }}>
              {photos.map((p, i) => (
                <Link
                  key={p.src}
                  href={`/talents/${p.talent.slug}`}
                  style={{ position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden', gridRow: i === 0 ? '1 / 3' : undefined, display: 'block' }}
                >
                  <Image src={p.src} alt={`${p.talent.name}, ${p.talent.roles.join(' et ').toLowerCase()}`} fill sizes="(max-width: 768px) 60vw, 30vw" style={{ objectFit: 'cover' }} className="img-treated" />
                  {i === 0 && (
                    <span style={{ position: 'absolute', left: 16, bottom: 16, background: 'rgba(13,13,13,0.7)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: 999, fontSize: 14, fontWeight: 600 }}>
                      {p.talent.name} · {p.talent.roles.join(' & ')}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
