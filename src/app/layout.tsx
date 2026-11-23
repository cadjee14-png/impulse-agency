import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { inter, plusJakarta, playfair } from '@/lib/fonts';
import { SmoothScroll } from '@/components/layout/smooth-scroll';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { CustomCursor } from '@/components/layout/custom-cursor';
import { StickyCTAMobile } from '@/components/layout/sticky-cta-mobile';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { ExitIntentPopup } from '@/components/layout/exit-intent-popup';

export const metadata: Metadata = {
  metadataBase: new URL('https://impulse-agency.fr'),
  title: {
    default: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
    template: '%s | Impulse Agency',
  },
  description:
    'Agence digitale à Marseille et La Réunion. Publicité Meta & Google, création de sites web, SEO, réseaux sociaux et branding pour les entreprises ambitieuses.',
  keywords: [
    'agence digitale Marseille',
    'agence publicité Marseille',
    'agence Meta Ads Marseille',
    'agence Google Ads Marseille',
    'création site web Marseille',
    'agence SEO Marseille',
    'agence digitale La Réunion',
    'agence publicité La Réunion',
    'marketing digital Marseille',
    'agence réseaux sociaux Marseille',
  ],
  authors: [{ name: 'Impulse Agency' }],
  creator: 'Impulse Agency',
  alternates: {
    canonical: 'https://impulse-agency.fr',
  },
  openGraph: {
    title: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
    description:
      'Publicité Meta & Google, sites web, SEO et réseaux sociaux. On transforme votre business en machine à clients.',
    locale: 'fr_FR',
    type: 'website',
    siteName: 'Impulse Agency',
    url: 'https://impulse-agency.fr',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impulse Agency — Agence Digitale Marseille & La Réunion',
    description:
      'Publicité Meta & Google, sites web, SEO et réseaux sociaux. On transforme votre business en machine à clients.',
    images: ['/api/og'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Schema principal — MarketingAgency + LocalBusiness
// Google utilise ce schema pour : la Knowledge Panel, les résultats locaux,
// et vérifie l'identité de la marque via sameAs.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MarketingAgency', 'LocalBusiness'],
  name: 'Impulse Agency',
  description:
    'Agence digitale spécialisée en publicité Meta & Google, création de sites web, SEO, réseaux sociaux et branding.',
  url: 'https://impulse-agency.fr',
  logo: 'https://impulse-agency.fr/logo.png',
  image: 'https://impulse-agency.fr/logo.png',
  telephone: '+33688663176',
  email: 'contact@impulse-agency.fr',
  address: {
    '@type': 'PostalAddress',
    postalCode: '13003',
    addressLocality: 'Marseille',
    addressRegion: 'Provence-Alpes-Côte d\'Azur',
    addressCountry: 'FR',
  },
  areaServed: [
    { '@type': 'City', name: 'Marseille' },
    { '@type': 'AdministrativeArea', name: 'La Réunion' },
  ],
  serviceType: [
    'Publicité Meta Ads',
    'Publicité Google Ads',
    'Création de site web',
    'SEO',
    'Gestion réseaux sociaux',
    'Branding',
  ],
  priceRange: '€€',
  // sameAs : Google croise ces URLs pour confirmer que c'est bien la même entité.
  // URLs corrigées pour correspondre aux vrais profils.
  sameAs: [
    'https://www.instagram.com/impulseagency.fr/',
    'https://www.facebook.com/profile.php?id=61560655743617',
    'https://www.linkedin.com/company/impulse-agency-fr/',
  ],
};

// Schema FAQ — permet à Google d'afficher les questions/réponses
// directement dans les résultats de recherche (rich snippets).
// Chaque paire question/réponse peut apparaître sous le lien principal.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Comment se passe le diagnostic offert ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'C\'est simple : vous laissez votre prénom et votre numéro WhatsApp. On vous rappelle dans les 24h pour un échange de 20-30 minutes. On analyse votre présence digitale et on vous présente les axes d\'amélioration prioritaires — sans engagement, sans jargon.',
      },
    },
    {
      '@type': 'Question',
      name: 'Combien coûtent vos prestations ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nos tarifs dépendent entièrement de vos besoins, de l\'ampleur du projet et de vos objectifs. Chaque client a une situation unique — c\'est exactement pour ça qu\'on commence par un diagnostic offert. On prend le temps de comprendre votre business avant de vous proposer une offre sur mesure.',
      },
    },
    {
      '@type': 'Question',
      name: 'En combien de temps voit-on des résultats ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pour la publicité (Meta Ads, Google Ads), les premiers résultats se voient en 2-4 semaines. Pour le SEO, comptez 2-3 mois pour des résultats significatifs. Pour les réseaux sociaux, l\'engagement s\'améliore dès le premier mois.',
      },
    },
    {
      '@type': 'Question',
      name: 'Vous travaillez avec quels types de clients ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On accompagne des TPE, PME et indépendants dans tous les secteurs : e-commerce, restauration, services B2B, immobilier, santé, mode. Peu importe votre secteur, si vous voulez développer votre présence digitale et générer plus de clients, on peut vous aider.',
      },
    },
    {
      '@type': 'Question',
      name: 'Est-ce qu\'il y a un engagement minimum ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Non. Nos prestations sont sans engagement longue durée. On travaille mois par mois. Si vous n\'êtes pas satisfait, vous êtes libre de partir. Notre objectif est de vous donner des résultats concrets pour que vous restiez par choix, pas par obligation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Est-ce que vous gérez tout ou faut-il s\'impliquer ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On gère l\'essentiel — stratégie, création, diffusion, optimisation. Votre implication se limite à valider les contenus et nous fournir les informations sur votre business. On s\'adapte à votre disponibilité.',
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${plusJakarta.variable} ${playfair.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S8CMV9K5NT" strategy="afterInteractive" />
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          try { if (localStorage.getItem('impulse-cookie-consent') !== 'accepted') fbq('consent', 'revoke'); } catch (e) { fbq('consent', 'revoke'); }
          fbq('init', '943542001830707');
          fbq('track', 'PageView');
        `}</Script>
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'wait_for_update': 500,
          });
          gtag('js', new Date());
          gtag('config', 'G-S8CMV9K5NT');
        `}</Script>
      </head>
      <body style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}>
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <StickyCTAMobile />
          <CookieBanner />
          <ExitIntentPopup />
        </SmoothScroll>
      </body>
    </html>
  );
}
