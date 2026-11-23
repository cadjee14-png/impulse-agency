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
  title: 'Agence Publicité Facebook La Réunion',
  description:
    'Agence publicité Facebook à La Réunion. Campagnes Facebook Ads et Instagram Ads ciblées 974 pour attirer des clients locaux. Résultats mesurables pour les entreprises réunionnaises.',
  keywords: [
    'agence publicité Facebook La Réunion',
    'Facebook Ads La Réunion',
    'publicité Facebook La Réunion',
    'agence Facebook Ads La Réunion',
    'agence Facebook Réunion',
    'campagne Facebook 974',
    'publicité Facebook 974',
    'agence Meta Ads La Réunion',
    'pub Facebook La Réunion',
    'Facebook Ads 974',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/agence-publicite-facebook-la-reunion',
  },
  openGraph: {
    title: 'Agence Publicité Facebook La Réunion — Impulse Agency',
    description:
      'Publicité Facebook et Instagram ciblée La Réunion. Des campagnes qui ramènent de vrais clients locaux pour votre business réunionnais.',
    url: 'https://impulse-agency.fr/agence-publicite-facebook-la-reunion',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Agence Publicité Facebook La Réunion — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — Agence Publicité Facebook La Réunion',
  description:
    'Agence spécialisée en publicité Facebook et Instagram Ads à La Réunion. Campagnes ciblées 974 pour commerces, restaurants, services et PME réunionnaises. Résultats mesurables.',
  url: 'https://impulse-agency.fr/agence-publicite-facebook-la-reunion',
  logo: 'https://impulse-agency.fr/logo.png',
  telephone: '+33688663176',
  email: 'contact@impulse-agency.fr',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'La Réunion',
  },
  serviceType: [
    'Publicité Facebook La Réunion',
    'Facebook Ads La Réunion',
    'Instagram Ads La Réunion',
    'Meta Ads La Réunion',
    'Campagnes Facebook 974',
    'Gestion publicité Facebook Réunion',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PagePubliciteFacebookReunion() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        label="Agence Publicité Facebook La Réunion"
        subtext="Vos clients réunionnais sont sur Facebook et Instagram. On crée et gère vos campagnes 974 pour qu'ils viennent chez vous — ciblage local précis, créatifs adaptés au marché réunionnais, résultats concrets."
      />
      <LocalIntro {...{
        "eyebrow": "Publicité Facebook 974",
        "title": "Facebook, le réflexe des Réunionnais pour trouver un commerce",
        "paragraphs": [
          "À La Réunion, Facebook sert de vitrine, d'annuaire et de bouche-à-oreille à la fois. Les groupes locaux, les pages de quartier et Marketplace sont consultés tous les jours. Une publicité bien placée y touche vite votre clientèle.",
          "On adapte les campagnes au marché de l'île : audience plus restreinte, donc créatifs renouvelés plus souvent pour éviter la lassitude, ciblage par commune et messages qui sonnent local plutôt que métropolitain."
        ],
        "points": [
          {
            "title": "Ciblage commune par commune",
            "text": "Saint-Denis, Saint-Pierre, Saint-Paul, Le Tampon… on règle la diffusion selon votre zone de chalandise réelle."
          },
          {
            "title": "Rotation des visuels",
            "text": "Sur une petite audience, une pub fatigue vite. On prévoit plusieurs déclinaisons dès le départ pour garder un coût par contact bas."
          },
          {
            "title": "Suivi à l'heure de l'île",
            "text": "Points réguliers et ajustements calés sur votre fuseau horaire."
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
