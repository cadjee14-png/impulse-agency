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
  title: 'Agence Publicité Facebook Marseille',
  description:
    'Agence publicité Facebook à Marseille. Campagnes Facebook Ads qui attirent des clients locaux pour votre commerce, restaurant ou service. Résultats mesurables garantis.',
  keywords: [
    'agence publicité Facebook Marseille',
    'publicité Facebook Marseille',
    'Facebook Ads Marseille',
    'agence Facebook Marseille',
    'pub Facebook Marseille',
    'campagne Facebook Marseille',
    'publicité Facebook entreprise Marseille',
    'agence Facebook Ads Marseille',
    'faire de la pub sur Facebook Marseille',
    'gérer Facebook Ads Marseille',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/agence-publicite-facebook-marseille',
  },
  openGraph: {
    title: 'Agence Publicité Facebook Marseille — Impulse Agency',
    description:
      'Publicité Facebook à Marseille qui ramène de vrais clients. Ciblage local, créatifs efficaces, gestion complète de vos campagnes.',
    url: 'https://impulse-agency.fr/agence-publicite-facebook-marseille',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Agence Publicité Facebook Marseille — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — Agence Publicité Facebook Marseille',
  description:
    'Agence spécialisée en publicité Facebook à Marseille. Création et gestion de campagnes Facebook Ads ciblées localement pour commerces, restaurants, services et PME marseillaises.',
  url: 'https://impulse-agency.fr/agence-publicite-facebook-marseille',
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
    'Publicité Facebook Marseille',
    'Facebook Ads Marseille',
    'Campagnes Facebook locales Marseille',
    'Gestion pub Facebook Marseille',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PagePubliciteFacebookMarseille() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        label="Agence Publicité Facebook Marseille"
        subtext="Vos clients sont sur Facebook. On les cible pour vous avec des publicités qui donnent envie d'agir — pas juste de scroller. Ciblage local Marseille, créatifs testés, résultats mesurables."
      />
      <LocalIntro {...{
        "eyebrow": "Publicité Facebook Marseille",
        "title": "Faire venir des Marseillais chez vous grâce à Facebook",
        "paragraphs": [
          "Facebook reste le réseau le plus utilisé par les 35-65 ans, ceux qui réservent une table, prennent rendez-vous chez le dentiste ou font refaire leur cuisine. Pour un commerce de quartier, c'est souvent le canal le plus rentable.",
          "On construit des campagnes locales : rayon de quelques kilomètres autour de votre adresse, quartiers ciblés, messages qui parlent de Marseille. L'objectif n'est pas les likes, c'est l'appel, le message ou la réservation."
        ],
        "points": [
          {
            "title": "Ciblage géographique serré",
            "text": "Le Panier, la Joliette, le Prado, Aubagne… on diffuse là où vos clients habitent et travaillent, pas dans toute la région."
          },
          {
            "title": "Formulaires et Messenger",
            "text": "Selon votre activité, on fait arriver les contacts directement sur WhatsApp, Messenger ou via un formulaire Facebook pré-rempli."
          },
          {
            "title": "Budget maîtrisé",
            "text": "On démarre avec un budget test, on mesure, puis on augmente seulement ce qui ramène des demandes."
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
