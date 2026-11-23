import type { Metadata } from 'next';
import { Hero } from '@/components/sections/hero';
import { Stats } from '@/components/sections/stats';
import { LocalIntro } from '@/components/sections/local-intro';
import { Services } from '@/components/sections/services';
import { Realisations } from '@/components/sections/realisations';
import { Process } from '@/components/sections/process';
import { Testimonials } from '@/components/sections/testimonials';
import { Faq } from '@/components/sections/faq';
import { Integrations } from '@/components/sections/integrations';
import { AuditCta } from '@/components/sections/audit-cta';

// ─── Métadonnées SEO dédiées La Réunion ───────────────────────────────────
// Cette page cible spécifiquement les recherches depuis La Réunion.
// Google la positionnera sur les requêtes locales réunionnaises
// indépendamment de l'adresse physique de l'agence à Marseille.
export const metadata: Metadata = {
  title: 'Agence Digitale La Réunion',
  description:
    'Agence digitale à La Réunion. Création de sites web, publicité Meta & Google Ads, SEO et réseaux sociaux pour les entreprises réunionnaises. Résultats mesurables en 90 jours.',
  keywords: [
    'agence digitale La Réunion',
    'agence web La Réunion',
    'création site web La Réunion',
    'agence marketing La Réunion',
    'SEO La Réunion',
    'Meta Ads La Réunion',
    'Google Ads La Réunion',
    'agence publicité La Réunion',
    'marketing digital La Réunion',
    'agence réseaux sociaux La Réunion',
    'agence digitale Saint-Denis Réunion',
    'agence digitale Saint-Pierre Réunion',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/agence-digitale-la-reunion',
  },
  openGraph: {
    title: 'Agence Digitale La Réunion — Impulse Agency',
    description:
      'Création de sites web, Meta Ads, Google Ads, SEO et réseaux sociaux à La Réunion. On transforme votre business en machine à clients.',
    url: 'https://impulse-agency.fr/agence-digitale-la-reunion',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Agence Digitale La Réunion — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

// ─── Schema LocalBusiness dédié La Réunion ────────────────────────────────
// Un schema distinct de la homepage permet à Google de comprendre
// qu'Impulse Agency opère aussi à La Réunion, pas seulement à Marseille.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — La Réunion',
  description:
    'Agence digitale spécialisée en création de sites web, publicité Meta & Google Ads, SEO et réseaux sociaux pour les entreprises de La Réunion.',
  url: 'https://impulse-agency.fr/agence-digitale-la-reunion',
  logo: 'https://impulse-agency.fr/logo.png',
  telephone: '+33688663176',
  email: 'contact@impulse-agency.fr',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'La Réunion',
  },
  serviceType: [
    'Création de site web La Réunion',
    'Publicité Meta Ads La Réunion',
    'Publicité Google Ads La Réunion',
    'SEO La Réunion',
    'Gestion réseaux sociaux La Réunion',
    'Branding La Réunion',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PageReunion() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Même interface exacte que la homepage, avec un hero adapté La Réunion */}
      <Hero
        label="Agence Digitale La Réunion"
        subtext="Impulse accompagne les entreprises réunionnaises avec des stratégies digitales qui génèrent de vrais résultats. De Saint-Denis à Saint-Pierre, on booste votre présence en ligne et vous amenons des clients."
      />
      <LocalIntro {...{
        "eyebrow": "Agence digitale 974",
        "title": "Une agence digitale qui connaît le marché réunionnais",
        "paragraphs": [
          "À La Réunion, tout le monde connaît quelqu'un qui connaît votre commerce. Le bouche-à-oreille compte énormément, mais il passe aujourd'hui par Facebook, Instagram et les avis Google. Une entreprise invisible en ligne perd des clients qui habitent à dix minutes de chez elle.",
          "On travaille avec des commerces, restaurants et prestataires de toute l'île, de Saint-Denis à Saint-Pierre en passant par Saint-Paul et Le Port. Le site, la pub, les réseaux et le référencement sont gérés au même endroit, avec un seul interlocuteur."
        ],
        "points": [
          {
            "title": "Un marché insulaire, une stratégie adaptée",
            "text": "Audience plus petite, concurrence plus visible : on cible par micro-région et on adapte le message au public local plutôt que de copier ce qui marche en métropole."
          },
          {
            "title": "Le décalage horaire n'est pas un problème",
            "text": "Réponses et appels calés sur l'heure de La Réunion. Vous n'attendez pas le lendemain pour avoir un retour."
          },
          {
            "title": "Tout le digital sous un même toit",
            "text": "Site web, Meta Ads, Google Ads, SEO local et contenus : chaque levier alimente les autres au lieu de fonctionner en silo."
          }
        ]
      }} />
      <Stats />
      <Services />
      <Realisations />
      <Process />
      <Testimonials />
      <Faq />
      <Integrations />
      <AuditCta />
    </>
  );
}
