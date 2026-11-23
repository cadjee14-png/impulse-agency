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

export const metadata: Metadata = {
  title: 'Agence Réseaux Sociaux La Réunion',
  description:
    'Agence réseaux sociaux à La Réunion. Gestion Instagram, Facebook et TikTok pour les entreprises réunionnaises. Contenus locaux, communauté engagée, clients qui reviennent.',
  keywords: [
    'agence réseaux sociaux La Réunion',
    'gestion réseaux sociaux La Réunion',
    'agence social media La Réunion',
    'community manager La Réunion',
    'agence Instagram La Réunion',
    'agence TikTok La Réunion',
    'agence Facebook La Réunion',
    'social media La Réunion',
    'community management 974',
    'gestion Instagram La Réunion',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/agence-reseaux-sociaux-la-reunion',
  },
  openGraph: {
    title: 'Agence Réseaux Sociaux La Réunion — Impulse Agency',
    description:
      'Gestion Instagram, Facebook et TikTok à La Réunion. Des contenus qui parlent aux Réunionnais, une communauté qui achète.',
    url: 'https://impulse-agency.fr/agence-reseaux-sociaux-la-reunion',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Agence Réseaux Sociaux La Réunion — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — Agence Réseaux Sociaux La Réunion',
  description:
    'Agence spécialisée en gestion des réseaux sociaux à La Réunion. Instagram, Facebook, TikTok — contenus adaptés au marché réunionnais et community management pour les entreprises du 974.',
  url: 'https://impulse-agency.fr/agence-reseaux-sociaux-la-reunion',
  logo: 'https://impulse-agency.fr/logo.png',
  telephone: '+33688663176',
  email: 'contact@impulse-agency.fr',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'La Réunion',
  },
  serviceType: [
    'Gestion réseaux sociaux La Réunion',
    'Community management La Réunion',
    'Gestion Instagram La Réunion',
    'Gestion Facebook La Réunion',
    'Agence TikTok La Réunion',
    'Social media La Réunion',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PageReseauxSociauxReunion() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        label="Agence Réseaux Sociaux La Réunion"
        subtext="On gère vos réseaux sociaux à La Réunion avec des contenus qui parlent aux Réunionnais. Instagram, Facebook, TikTok — une présence locale cohérente qui construit votre réputation et attire des clients."
      />
      <LocalIntro {...{
        "eyebrow": "Réseaux sociaux 974",
        "title": "Une présence Instagram et Facebook qui parle aux Réunionnais",
        "paragraphs": [
          "Les Réunionnais suivent beaucoup les comptes locaux : nouveaux restos, boutiques, événements. Un compte actif et soigné devient vite une référence dans sa commune. Un compte abandonné depuis six mois envoie le message inverse.",
          "On prend en charge la ligne éditoriale, la création des contenus et la publication. Le ton reste le vôtre, avec les codes de l'île plutôt qu'un style copié-collé de la métropole."
        ],
        "points": [
          {
            "title": "Ton local, pas générique",
            "text": "Références, humour et rythme adaptés au public réunionnais."
          },
          {
            "title": "Contenus courts en priorité",
            "text": "Reels et TikTok pour toucher de nouveaux abonnés, posts et stories pour garder le lien avec vos clients actuels."
          },
          {
            "title": "Publication régulière",
            "text": "Un rythme tenu chaque semaine, planifié à l'avance, même pendant vos périodes chargées."
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
