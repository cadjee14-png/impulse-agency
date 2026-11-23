import Link from 'next/link';
import Image from 'next/image';
import type { Talent } from '@/data/talents';

export function TalentPhoto({ talent, src, priority }: { talent: Talent; src?: string; priority?: boolean }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '4 / 5', borderRadius: 'var(--radius-card)', overflow: 'hidden', background: 'var(--surface-2)' }}>
      {src ? (
        <Image src={src} alt={`${talent.name} — ${talent.roles.join(' et ')}`} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: 'cover' }} className="img-treated" priority={priority} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 64, color: 'var(--text-muted)' }}>
          {talent.name.slice(0, 1)}
        </div>
      )}
    </div>
  );
}

export function TalentCard({ talent }: { talent: Talent }) {
  return (
    <Link href={`/talents/${talent.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <TalentPhoto talent={talent} src={talent.photos[0]} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 18, gap: 12 }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, letterSpacing: '-0.02em' }}>{talent.name}</h3>
        <span style={{ fontSize: 14, color: 'var(--text-dim)' }}>{talent.city}</span>
      </div>
      <p style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 600, marginTop: 6 }}>{talent.roles.join(' · ')}</p>
    </Link>
  );
}
