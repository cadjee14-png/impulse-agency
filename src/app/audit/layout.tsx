import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Diagnostic Offert — Audit Digital Gratuit',
  description:
    'Obtenez votre diagnostic digital offert. On analyse votre présence en ligne et on vous propose un plan d\'action personnalisé. Réponse sous 24h sur WhatsApp.',
  alternates: {
    canonical: 'https://impulse-agency.fr/audit',
  },
  openGraph: {
    title: 'Diagnostic Offert — Audit Digital Gratuit | Impulse Agency',
    description:
      'Obtenez votre diagnostic digital offert. On analyse votre présence en ligne et on vous propose un plan d\'action personnalisé.',
    url: 'https://impulse-agency.fr/audit',
  },
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
