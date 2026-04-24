import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Blog — Stratégie Digitale Marseille & La Réunion',
  description: 'Conseils, stratégies et guides pratiques en marketing digital pour les entreprises de Marseille et La Réunion. SEO, Meta Ads, Google Ads, création de site web.',
  alternates: { canonical: 'https://impulse-agency.fr/blog' },
  openGraph: {
    title: 'Blog Impulse Agency — Marketing Digital Marseille & La Réunion',
    description: 'Stratégies digitales concrètes pour développer votre business à Marseille et à La Réunion.',
    url: 'https://impulse-agency.fr/blog',
  },
};

const GEO_LABELS: Record<string, string> = {
  marseille: 'Marseille',
  reunion: 'La Réunion',
  both: 'Marseille & La Réunion',
};
const GEO_COLORS: Record<string, string> = {
  marseille: '#1E466B',
  reunion: '#0D6E4F',
  both: '#7B3FA0',
};

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(48px, 7vw, 80px) clamp(24px, 5vw, 60px) 0' }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 16 }}>
            Blog & Ressources
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 72px)', color: 'var(--text)', letterSpacing: '-0.035em', lineHeight: 0.95, marginBottom: 20 }}>
            Marketing Digital
            <br />
            <span style={{ color: 'var(--accent)' }}>Marseille & La Réunion</span>
          </h1>
          <p style={{ fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.6, maxWidth: 560 }}>
            Stratégies concrètes, guides pratiques et analyses pour développer votre business en ligne sur vos deux marchés.
          </p>
        </div>

        {/* Article featured */}
        <Link href={`/blog/${featured.slug}`} style={{ display: 'block', textDecoration: 'none', marginBottom: 64 }}>
          <article
            className="blog-card-featured"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid var(--line)',
              background: 'var(--surface)',
            }}
          >
            <div style={{ position: 'relative', minHeight: 340, overflow: 'hidden' }}>
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                style={{ objectFit: 'cover' }}
                className="img-treated"
              />
            </div>
            <div style={{ padding: 'clamp(28px, 4vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 32, background: `${GEO_COLORS[featured.geo]}15`, color: GEO_COLORS[featured.geo], letterSpacing: '0.04em' }}>
                  {GEO_LABELS[featured.geo]}
                </span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 32, background: 'var(--bg-2)', color: 'var(--text-muted)' }}>
                  {featured.category}
                </span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--text)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
                {featured.title}
              </h2>
              <p style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 24 }}>
                {featured.excerpt}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {new Date(featured.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>·</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{featured.readTime} min de lecture</span>
                <span style={{ marginLeft: 'auto', fontSize: 14, fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Lire l&apos;article
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </div>
          </article>
        </Link>

        {/* Grid articles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24, paddingBottom: 100 }}>
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article
                className="blog-card"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', height: 200, overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} className="img-treated" />
                </div>
                <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 32, background: `${GEO_COLORS[post.geo]}12`, color: GEO_COLORS[post.geo] }}>
                      {GEO_LABELS[post.geo]}
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 32, background: 'var(--bg-2)', color: 'var(--text-muted)' }}>
                      {post.category}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 10 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: 20, flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 16, borderTop: '1px solid var(--line)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>·</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{post.readTime} min</span>
                    <span style={{ marginLeft: 'auto', color: 'var(--accent)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
