'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { SectionHeading } from '@/components/animations/section-heading';
import { CircularGallery, type CarouselItem } from '@/components/ui/circular-gallery';

// ─────────────────────────────────────────────
// DONNÉES
// ─────────────────────────────────────────────

const SITES = [
  { url: 'bellarya.fr',        image: '/images/site-bellarya.jpg',       objectPosition: 'top center', client: 'Bellarya',       category: 'Site Web · Beauté & Cosmétiques',    result: 'Lancement boutique en ligne', link: 'https://bellarya.fr' },
  { url: 'viboost.fr',         image: '/images/site-viboost.jpg',        objectPosition: 'top center', client: 'ViBoost',        category: 'Site Web · Réservation en ligne',     result: '×3 prises de rendez-vous',    link: 'https://viboost-v5.vercel.app/' },
  { url: 'cabinet-sourire.fr', image: '/images/site-cabinet-sourire.jpg',objectPosition: 'top center', client: 'Cabinet Sourire',category: 'Site Web · Santé & Dentaire',         result: 'Site vitrine premium',        link: 'https://cabinet-sourire.vercel.app/' },
  { url: 'kits-nation.com',    image: '/images/site-kits-nation.jpg',    objectPosition: 'top center', client: 'Kits Nation',    category: 'E-commerce · Sport',                  result: 'Boutique en ligne complète',  link: 'https://kits-nation.com/' },
  { url: 'buon-cibo-pizza.fr', image: '/images/site-buon-cibo.jpg',      objectPosition: 'top center', client: 'Buon Cibo Pizza',category: 'Site Web · Restauration',             result: 'Site vitrine & menu en ligne',link: 'https://buon-cibo-pizza.vercel.app/' },
];

const VISUELS: { image: string; format: 'square'|'story'; label: string; client: string; detail: string }[] = [
  { image: '/images/card-5.jpg',  format: 'story',  label: 'Flyer',              client: 'WilliBarber',     detail: 'Création de flyers · Recrutement' },
  { image: '/images/card-3.jpg',  format: 'square', label: 'Post Instagram',      client: 'Chick & Cheez',   detail: 'Création de contenu · Social Media' },
  { image: '/images/card-6.jpg',  format: 'story',  label: 'Menu & Flyer',        client: 'Napolino',        detail: 'Création de menu · Identité visuelle' },
  { image: '/images/card-2.jpg',  format: 'square', label: 'Post Instagram',      client: 'Pokebab',         detail: "Campagne d'ouverture · Branding" },
  { image: '/images/card-9.jpg',  format: 'story',  label: 'Flyer',              client: 'Smash Corner',    detail: 'Menu & flyer · Identité visuelle' },
  { image: '/images/card-1.jpg',  format: 'square', label: 'Post Instagram',      client: 'Culture Thaï',    detail: 'Contenus animés · Stratégie éditoriale' },
  { image: '/images/card-10.jpg', format: 'story',  label: 'Flyer promotionnel',  client: 'La Maison Burger',detail: 'Visuel campagne · Social Media' },
  { image: '/images/card-7.jpg',  format: 'square', label: 'Visuel promotionnel', client: 'DnnUp',           detail: 'Campagne produit · Identité visuelle' },
  { image: '/images/card-8.jpg',  format: 'square', label: 'Post Instagram',      client: 'La Roche-Posay',  detail: 'Visuel produit · Campagne réseaux' },
];

// Mapping sites → CarouselItem
const SITES_ITEMS: CarouselItem[] = SITES.map(s => ({
  image: s.image,
  badge: 'Site Web',
  title: s.client,
  subtitle: s.result,
  objectPosition: s.objectPosition,
  url: s.url,
  link: s.link,
}));

// Mapping visuels → CarouselItem
const VISUELS_ITEMS: CarouselItem[] = VISUELS.map(v => ({
  image: v.image,
  badge: v.label,
  title: v.client,
  subtitle: v.detail.split(' · ')[0],
}));

// ─────────────────────────────────────────────
// Export principal
// ─────────────────────────────────────────────
export function Realisations() {
  return (
    <section id="realisations" style={{ background: 'var(--dark)', overflow: 'hidden' }}>

      {/* ── BLOC 1 : Sites Web ── */}
      <div style={{ padding: 'clamp(64px, 8vw, 120px) 0 clamp(48px, 6vw, 80px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'rgba(255,255,255,0.4)' }}>Nos Réalisations</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <SectionHeading accent="convertissent" style={{ color: '#ffffff' }}>Des sites qui vraiment</SectionHeading>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 520, marginTop: 16 }}>
              Des sites conçus pour générer de vrais clients, pas du trafic vide.
            </p>
          </FadeIn>
        </div>
        <CircularGallery items={SITES_ITEMS} variant="site" />
      </div>

      {/* Séparateur */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)' }}>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>

      {/* ── BLOC 2 : Créations Graphiques — carrousel 3D ── */}
      <div style={{ padding: 'clamp(48px, 6vw, 80px) 0 clamp(64px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(24px, 5vw, 80px)', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
          <FadeIn direction="up">
            <span className="section-label" style={{ display: 'block', marginBottom: 20, color: 'rgba(255,255,255,0.4)' }}>Créations Graphiques</span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <SectionHeading accent="performent" style={{ color: '#ffffff' }}>Des visuels qui vraiment</SectionHeading>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, maxWidth: 520, marginTop: 16 }}>
              Posts, stories et flyers conçus pour capter l&apos;attention et la convertir.
            </p>
          </FadeIn>
        </div>
        <CircularGallery items={VISUELS_ITEMS} />
      </div>

      {/* CTA */}
      <FadeIn direction="up" delay={0.2}>
        <div style={{ textAlign: 'center', paddingBottom: 'clamp(64px, 8vw, 100px)' }}>
          <a
            href="/audit"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 64, padding: '14px 32px', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'all 300ms' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background='rgba(255,255,255,0.08)'; el.style.borderColor='rgba(255,255,255,0.3)'; el.style.color='#ffffff'; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background='transparent'; el.style.borderColor='rgba(255,255,255,0.15)'; el.style.color='rgba(255,255,255,0.8)'; }}
          >
            Obtenir ces résultats
          </a>
        </div>
      </FadeIn>

    </section>
  );
}
