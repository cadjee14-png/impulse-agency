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
  title: 'Agence Meta Ads Marseille — Facebook & Instagram Ads',
  description:
    'Agence Meta Ads à Marseille. Campagnes Facebook et Instagram Ads qui génèrent des leads qualifiés pour votre business. Gestion complète : ciblage, créatifs, optimisation.',
  keywords: [
    'agence Meta Ads Marseille',
    'agence Facebook Ads Marseille',
    'agence Instagram Ads Marseille',
    'publicité Facebook Marseille',
    'publicité Instagram Marseille',
    'gestion Meta Ads Marseille',
    'campagne Facebook Marseille',
    'agence publicité réseaux sociaux Marseille',
    'Facebook Ads Marseille',
    'Meta Ads Marseille entreprise',
  ],
  alternates: {
    canonical: 'https://impulse-agency.fr/agence-meta-ads-marseille',
  },
  openGraph: {
    title: 'Agence Meta Ads Marseille — Facebook & Instagram Ads — Impulse Agency',
    description:
      'Campagnes Meta Ads rentables à Marseille. Facebook, Instagram — ciblage précis, créatifs percutants, ROI mesurable.',
    url: 'https://impulse-agency.fr/agence-meta-ads-marseille',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Impulse Agency',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Agence Meta Ads Marseille — Impulse Agency' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency — Agence Meta Ads Marseille',
  description:
    'Agence spécialisée en publicité Meta Ads à Marseille. Création et gestion de campagnes Facebook et Instagram Ads pour générer des leads qualifiés et augmenter les ventes des entreprises marseillaises.',
  url: 'https://impulse-agency.fr/agence-meta-ads-marseille',
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
    'Meta Ads Marseille',
    'Facebook Ads Marseille',
    'Instagram Ads Marseille',
    'Gestion publicité Facebook Marseille',
    'Campagnes Meta Marseille',
    'Publicité réseaux sociaux Marseille',
  ],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

export default function PageMetaAdsMarseille() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        label="Agence Meta Ads Marseille"
        subtext="On gère vos campagnes Facebook et Instagram Ads à Marseille pour que chaque euro investi rapporte. Ciblage précis, créatifs qui convertissent, optimisation quotidienne — des leads qualifiés dès le premier mois."
      />
      <LocalIntro {...{
        "eyebrow": "Meta Ads à Marseille",
        "title": "Des campagnes Facebook et Instagram pilotées chaque semaine",
        "paragraphs": [
          "Booster une publication depuis l'appli, ce n'est pas faire de la publicité Meta. Sans pixel bien installé, sans audiences construites et sans tests de créatifs, l'algorithme dépense votre budget sur des gens qui ne viendront jamais.",
          "On structure vos campagnes dans le Gestionnaire de publicités : tracking propre, ciblage sur Marseille et sa périphérie, plusieurs visuels testés en parallèle. Chaque semaine, on coupe ce qui ne convertit pas et on remet le budget sur ce qui ramène des contacts."
        ],
        "points": [
          {
            "title": "Tracking avant tout",
            "text": "Pixel Meta et événements de conversion vérifiés avant la première campagne. Sans données fiables, on optimise à l'aveugle."
          },
          {
            "title": "Créatifs pensés pour le scroll",
            "text": "Formats verticaux, accroche dans les deux premières secondes, déclinaisons Reels et Stories. Un visuel qui s'use est remplacé."
          },
          {
            "title": "Un reporting que vous comprenez",
            "text": "Coût par contact, nombre de demandes, budget dépensé. Les chiffres qui comptent pour votre caisse, pas les métriques de vanité."
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
