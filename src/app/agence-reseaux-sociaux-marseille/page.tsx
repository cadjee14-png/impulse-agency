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
  title: 'Agence Réseaux Sociaux Marseille',
  description:
    'Agence réseaux sociaux à Marseille. Gestion Instagram, Facebook, TikTok et LinkedIn pour les entreprises marseillaises. Contenus qui engagent, communautés qui achètent.',
  keywords: [
    'agence réseaux sociaux Marseille',
    'gestion réseaux sociaux Marseille',
    'agence social media Marseille',
    'community management Marseille',
    'agence Instagram Marseille',
    'agence TikTok Marseille',
    'agence Facebook Marseille',
    'agence LinkedIn Marseille',
    'agence communication Marseille',
    'marketing réseaux sociaux Marseille',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/agence-reseaux-sociaux-marseille',
  },
  openGraph: {
    title: 'Agence Réseaux Sociaux Marseille — Impulse Agency',
    description:
      'Gestion Instagram, Facebook, TikTok et LinkedIn à Marseille. Des contenus qui engagent et une communauté qui achète.',
    url: 'https://impulse-agency.fr/agence-reseaux-sociaux-marseille',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Agence Réseaux Sociaux Marseille — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — Agence Réseaux Sociaux Marseille',
  description:
    'Agence spécialisée en gestion des réseaux sociaux à Marseille. Instagram, Facebook, TikTok, LinkedIn — contenus stratégiques et community management pour les entreprises marseillaises.',
  url: 'https://impulse-agency.fr/agence-reseaux-sociaux-marseille',
  logo: 'https://impulse-agency.fr/logo.png',
  telephone: '+33688663176',
  email: 'contact@impulse-agency.fr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '23 rue Mathieu Stilati',
    addressLocality: 'Marseille',
    postalCode: '13003',
    addressCountry: 'FR',
  },
  areaServed: {
    '@type': 'City',
    name: 'Marseille',
  },
  serviceType: [
    'Gestion réseaux sociaux Marseille',
    'Community management Marseille',
    'Création de contenu Instagram Marseille',
    'Gestion Facebook Marseille',
    'Agence TikTok Marseille',
    'Stratégie social media Marseille',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PageReseauxSociauxMarseille() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        label="Agence Réseaux Sociaux Marseille"
        subtext="On gère vos réseaux sociaux à Marseille pour que vous puissiez vous concentrer sur votre business. Instagram, Facebook, TikTok, LinkedIn — des contenus qui engagent, une communauté qui achète."
      />
      <LocalIntro {...{
        "eyebrow": "Community management Marseille",
        "title": "Des réseaux sociaux tenus avec régularité, sans que vous y passiez vos soirées",
        "paragraphs": [
          "Le problème des réseaux sociaux pour un commerçant, ce n'est pas de savoir quoi poster. C'est de le faire toutes les semaines, avec de belles photos, pendant qu'on gère déjà la boutique, l'équipe et les fournisseurs.",
          "On s'en occupe : calendrier éditorial, création des visuels et des Reels, publication et réponses aux messages. Pour Chick & Cheez, Pokebab ou Culture Thaï, on a géré les lancements et l'animation des comptes au quotidien."
        ],
        "points": [
          {
            "title": "Un calendrier validé à l'avance",
            "text": "Vous voyez les publications du mois avant leur mise en ligne. Vous validez, on publie."
          },
          {
            "title": "Du contenu tourné chez vous",
            "text": "Photos et vidéos de vos produits, de votre équipe, de votre lieu. Ce qui marche à Marseille, c'est le vrai, pas la banque d'images."
          },
          {
            "title": "Instagram, Facebook, TikTok, LinkedIn",
            "text": "On choisit les réseaux selon votre clientèle, pas pour être partout."
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
