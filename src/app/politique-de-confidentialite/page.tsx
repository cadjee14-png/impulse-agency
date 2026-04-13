import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Impulse Agency',
  description: 'Politique de confidentialité et protection des données personnelles — Impulse Agency.',
};

export default function PolitiqueConfidentialite() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: 100 }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(24px, 5vw, 64px)',
        background: 'rgba(250,250,250,0.90)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--line)', zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="12" height="16" viewBox="0 0 14 18" fill="none">
              <path d="M8 1L1 10H7L6 17L13 8H7L8 1Z" fill="white"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 17, color: 'var(--text)', letterSpacing: '-0.04em' }}>
            Impulse<span style={{ color: 'var(--accent-light)' }}>.</span>
          </span>
        </Link>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-dim)', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Retour
        </Link>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(24px, 4vw, 40px)' }}>
        <span style={{ fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, display: 'block', marginBottom: 16 }}>
          RGPD
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 48 }}>
          Politique de confidentialité
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.75 }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              1. Qui est responsable de vos données ?
            </h2>
            <p>
              Le responsable du traitement est <strong>Impulse Agency</strong>, représenté par Norman Cadjee.<br/>
              Contact : hello@impulse-agency.fr — +33 6 88 66 31 76
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              2. Quelles données collectons-nous ?
            </h2>
            <p>Lors de votre demande d'audit via notre formulaire, nous collectons :</p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Votre prénom</li>
              <li>Votre numéro de téléphone WhatsApp</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Ces données sont collectées uniquement dans le but de vous recontacter pour votre audit gratuit.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              3. Pourquoi utilisons-nous vos données ?
            </h2>
            <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Traiter votre demande d'audit gratuit</li>
              <li>Vous recontacter par WhatsApp pour convenir d'un rendez-vous</li>
              <li>Vous envoyer des informations relatives à nos services (uniquement avec votre accord)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              4. Combien de temps conservons-nous vos données ?
            </h2>
            <p>
              Vos données sont conservées pendant 3 ans à compter du dernier contact, ou jusqu'à votre demande de suppression.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              5. Partageons-nous vos données ?
            </h2>
            <p>
              Non. Vos données personnelles ne sont jamais vendues, louées ou cédées à des tiers. Elles restent strictement confidentielles et utilisées uniquement par Impulse Agency.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              6. Cookies et mesure d'audience
            </h2>
            <p>
              Ce site utilise Google Analytics 4 pour mesurer l'audience (pages visitées, durée des sessions, provenance du trafic). Ces données sont anonymisées et ne permettent pas de vous identifier personnellement. Vous pouvez refuser ces cookies via les paramètres de votre navigateur ou en installant l'extension Google Analytics Opt-out.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              7. Vos droits
            </h2>
            <p>Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li><strong>Droit d'accès</strong> : connaître les données que nous détenons sur vous</li>
              <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
              <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
              <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
              <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format lisible</li>
            </ul>
            <p style={{ marginTop: 12 }}>
              Pour exercer ces droits, contactez-nous à : <strong>hello@impulse-agency.fr</strong>
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              8. Réclamation
            </h2>
            <p>
              Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la <strong>CNIL</strong> (Commission Nationale de l'Informatique et des Libertés) sur le site cnil.fr.
            </p>
          </section>

          <p style={{ fontSize: 13, color: 'var(--text-muted)', borderTop: '1px solid var(--line)', paddingTop: 24 }}>
            Dernière mise à jour : avril 2026
          </p>
        </div>
      </div>
    </div>
  );
}
