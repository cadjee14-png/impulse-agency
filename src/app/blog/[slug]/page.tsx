import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { blogPosts, getPostBySlug, getRelatedPosts, type BlogSection } from '@/data/blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: { canonical: `https://impulse-agency.fr/blog/${post.slug}` },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      url: `https://impulse-agency.fr/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
  };
}

function renderSection(section: BlogSection, idx: number) {
  const baseText: React.CSSProperties = { fontSize: 17, color: 'var(--text-dim)', lineHeight: 1.75, marginBottom: 24 };
  const heading2: React.CSSProperties = {
    fontFamily: 'var(--font-heading)', fontWeight: 800,
    fontSize: 'clamp(22px, 3vw, 28px)', color: 'var(--text)',
    letterSpacing: '-0.03em', lineHeight: 1.15,
    marginTop: 48, marginBottom: 20,
  };
  const heading3: React.CSSProperties = {
    fontFamily: 'var(--font-heading)', fontWeight: 700,
    fontSize: 'clamp(18px, 2.5vw, 22px)', color: 'var(--text)',
    letterSpacing: '-0.02em', lineHeight: 1.2,
    marginTop: 32, marginBottom: 14,
  };

  switch (section.type) {
    case 'h2':
      return <h2 key={idx} style={heading2}>{section.content as string}</h2>;
    case 'h3':
      return <h3 key={idx} style={heading3}>{section.content as string}</h3>;
    case 'p':
      return <p key={idx} style={baseText}>{section.content as string}</p>;
    case 'ul':
      return (
        <ul key={idx} style={{ marginBottom: 24, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {(section.content as string[]).map((item, i) => (
            <li key={i} style={{ display: 'flex', gap: 12, fontSize: 16, color: 'var(--text-dim)', lineHeight: 1.65 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', marginTop: 11, flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      );
    case 'blockquote':
      return (
        <blockquote key={idx} style={{
          margin: '32px 0', padding: '20px 28px',
          background: 'rgba(30,70,107,0.05)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: '0 12px 12px 0',
          fontSize: 17, color: 'var(--text)',
          lineHeight: 1.65, fontStyle: 'italic', fontWeight: 500,
        }}>
          {section.content as string}
        </blockquote>
      );
    default:
      return null;
  }
}

const GEO_LABELS: Record<string, string> = { marseille: 'Marseille', reunion: 'La Réunion', both: 'Marseille & La Réunion' };
const GEO_COLORS: Record<string, string> = { marseille: '#1E466B', reunion: '#0D6E4F', both: '#7B3FA0' };

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    image: post.image,
    datePublished: post.publishedAt,
    author: { '@type': 'Organization', name: 'Impulse Agency', url: 'https://impulse-agency.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'Impulse Agency',
      logo: { '@type': 'ImageObject', url: 'https://impulse-agency.fr/logo.png' },
    },
    keywords: post.keywords.join(', '),
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://impulse-agency.fr/blog/${post.slug}` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>

        {/* Hero image */}
        <div style={{ position: 'relative', height: 'clamp(220px, 40vw, 440px)', overflow: 'hidden' }}>
          <Image src={post.image} alt={post.title} fill style={{ objectFit: 'cover' }} priority className="img-treated" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,13,13,0.1) 0%, rgba(13,13,13,0.65) 100%)' }} />
        </div>

        {/* Content */}
        <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px) 100px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 28, marginBottom: 32, fontSize: 13, color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Accueil</Link>
            <span>/</span>
            <Link href="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
            <span>/</span>
            <span style={{ color: 'var(--text-dim)' }}>{post.category}</span>
          </div>

          {/* Header */}
          <header style={{ marginBottom: 40 }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 32, background: `${GEO_COLORS[post.geo]}12`, color: GEO_COLORS[post.geo] }}>
                {GEO_LABELS[post.geo]}
              </span>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 32, background: 'var(--bg-2)', color: 'var(--text-muted)' }}>
                {post.category}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', color: 'var(--text)', letterSpacing: '-0.035em', lineHeight: 1.05, marginBottom: 20 }}>
              {post.title}
            </h1>

            <p style={{ fontSize: 18, color: 'var(--text-dim)', lineHeight: 1.65, marginBottom: 24, fontStyle: 'italic' }}>
              {post.excerpt}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingBottom: 32, borderBottom: '1px solid var(--line)', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'white', fontFamily: 'var(--font-heading)' }}>I</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)' }}>Impulse Agency</span>
              </div>
              <span style={{ color: 'var(--line)' }}>|</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                {new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
              <span style={{ color: 'var(--line)' }}>|</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{post.readTime} min de lecture</span>
            </div>
          </header>

          {/* Article body */}
          <div style={{ paddingBottom: 48 }}>
            {post.sections.map((section, idx) => renderSection(section, idx))}
          </div>

          {/* Mots-clés */}
          <div style={{ paddingTop: 32, borderTop: '1px solid var(--line)', marginBottom: 64 }}>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>Sujets</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {post.keywords.map(kw => (
                <span key={kw} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 32, background: 'var(--bg-2)', color: 'var(--text-dim)', border: '1px solid var(--line)' }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'var(--accent)', borderRadius: 20, padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center', marginBottom: 80 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-light)', marginBottom: 16 }}>
              Diagnostic Offert
            </p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: 'white', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 16 }}>
              Prêt à appliquer ces stratégies pour votre business ?
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 28 }}>
              On analyse votre situation et on vous propose un plan d&apos;action personnalisé — gratuit, sans engagement, en 24h.
            </p>
            <Link
              href="/audit"
              className="blog-cta-link"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: 'var(--accent)', borderRadius: 64, padding: '16px 32px', fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-heading)', textDecoration: 'none' }}
            >
              Obtenir mon diagnostic offert
            </Link>
          </div>

          {/* Articles liés */}
          {related.length > 0 && (
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: 24 }}>
                Articles liés
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {related.map(p => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="blog-related-link"
                    style={{ textDecoration: 'none', display: 'flex', gap: 16, padding: 16, borderRadius: 14, border: '1px solid var(--line)', background: 'var(--surface)' }}
                  >
                    <div style={{ position: 'relative', width: 80, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
                      <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: GEO_COLORS[p.geo], display: 'block', marginBottom: 4 }}>{GEO_LABELS[p.geo]}</span>
                      <p style={{ fontFamily: 'var(--font-heading)', fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.3, marginBottom: 4 }}>{p.title}</p>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.readTime} min de lecture</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
