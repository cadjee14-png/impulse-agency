import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Impulse Agency',
  description: 'Conditions générales de vente des prestations de services Impulse Agency.',
};

export default function CGV() {
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
          Contractuel
        </span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 52px)', letterSpacing: '-0.03em', lineHeight: 0.95, marginBottom: 48 }}>
          Conditions générales de vente
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.75 }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              1. Objet
            </h2>
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent l'ensemble des prestations de services proposées par <strong>Impulse Agency</strong> à ses clients. Toute commande de prestation implique l'acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              2. Identité du prestataire
            </h2>
            <p>
              <strong>Impulse Agency</strong><br/>
              Micro-entreprise — Représentant légal : Norman Cadjee<br/>
              SIRET : 104 336 540 000 18<br/>
              Adresse : 23 rue Mathieu Stilati, 13003 Marseille, France<br/>
              Email : contact@impulse-agency.fr<br/>
              Téléphone : +33 6 88 66 31 76
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              3. Services proposés
            </h2>
            <p>Impulse Agency propose les prestations suivantes :</p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Création et refonte de sites web</li>
              <li>Gestion de publicités Meta (Facebook / Instagram) et Google Ads</li>
              <li>Référencement naturel (SEO local et national)</li>
              <li>Gestion des réseaux sociaux</li>
              <li>Audit digital</li>
              <li>Branding et identité visuelle</li>
              <li>Toute prestation de marketing digital définie dans le devis accepté</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              4. Devis et commande
            </h2>
            <p>
              Toute prestation fait l'objet d'un devis préalable, transmis par email ou tout autre support écrit. Le devis précise la nature des prestations, le montant et les délais estimés.
            </p>
            <p style={{ marginTop: 8 }}>
              La commande est considérée comme ferme et définitive à réception du devis signé et, le cas échéant, du paiement de l'acompte prévu. Toute modification demandée par le client après acceptation du devis peut faire l'objet d'un avenant tarifaire.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              5. Prix et modalités de paiement
            </h2>
            <p>
              Les prix sont exprimés en euros (€) hors taxes. En tant que micro-entreprise, Impulse Agency bénéficie de la franchise en base de TVA (article 293B du CGI) — la TVA n'est pas applicable à la date des présentes CGV.
            </p>
            <p style={{ marginTop: 8 }}>
              Les modalités de paiement sont définies dans le devis. En l'absence de mention contraire :
            </p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Un acompte de 30 % à 50 % est requis à la commande pour les prestations supérieures à 300 €</li>
              <li>Le solde est exigible à la livraison ou à la mise en ligne de la prestation</li>
              <li>Les prestations récurrentes (gestion réseaux, publicités) sont facturées mensuellement</li>
            </ul>
            <p style={{ marginTop: 8 }}>
              En cas de retard de paiement, des pénalités de retard au taux légal en vigueur seront appliquées, sans mise en demeure préalable.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              6. Délais d'exécution
            </h2>
            <p>
              Les délais indiqués dans le devis sont donnés à titre indicatif. Impulse Agency s'engage à tout mettre en œuvre pour les respecter. Les délais peuvent être prolongés en cas de retard dans la fourniture des éléments nécessaires par le client (textes, images, accès, validations).
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              7. Obligations des parties
            </h2>
            <p><strong>Impulse Agency s'engage à :</strong></p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Exécuter les prestations dans les règles de l'art</li>
              <li>Respecter la confidentialité des informations transmises par le client</li>
              <li>Informer le client de tout élément susceptible d'affecter le bon déroulement de la mission</li>
            </ul>
            <p style={{ marginTop: 12 }}><strong>Le client s'engage à :</strong></p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <li>Fournir en temps utile les informations et éléments nécessaires à la réalisation de la prestation</li>
              <li>Valider les étapes intermédiaires dans les délais convenus</li>
              <li>Régler les factures à leur échéance</li>
              <li>S'assurer que les contenus transmis ne portent pas atteinte aux droits de tiers</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              8. Propriété intellectuelle
            </h2>
            <p>
              Les créations réalisées par Impulse Agency (sites web, visuels, textes, etc.) restent la propriété d'Impulse Agency jusqu'au règlement intégral des sommes dues. Une fois le paiement complet effectué, les droits d'exploitation sont cédés au client pour un usage professionnel.
            </p>
            <p style={{ marginTop: 8 }}>
              Impulse Agency se réserve le droit de mentionner la réalisation de la prestation dans son portfolio et ses supports de communication, sauf accord contraire écrit du client.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              9. Responsabilité
            </h2>
            <p>
              Impulse Agency est soumise à une obligation de moyens. Sa responsabilité ne saurait être engagée en cas de résultats non atteints dépendant de facteurs extérieurs (algorithmes des plateformes publicitaires, référencement naturel, comportement des utilisateurs).
            </p>
            <p style={{ marginTop: 8 }}>
              Impulse Agency ne saurait être tenue responsable des dommages indirects (perte de chiffre d'affaires, perte de clientèle) résultant de l'exécution ou de l'inexécution des présentes.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              10. Droit de rétractation
            </h2>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne s'applique pas aux prestations de services pleinement exécutées avant la fin du délai de rétractation, avec l'accord exprès du consommateur.
            </p>
            <p style={{ marginTop: 8 }}>
              Pour les clients professionnels (B2B), aucun droit de rétractation n'est applicable. Les conditions d'annulation sont définies dans le devis ou la convention signée.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              11. Données personnelles
            </h2>
            <p>
              Les données personnelles collectées dans le cadre de la relation commerciale sont traitées conformément à notre{' '}
              <Link href="/politique-de-confidentialite" style={{ color: 'var(--accent)', fontWeight: 600 }}>
                Politique de confidentialité
              </Link>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              12. Modification des CGV
            </h2>
            <p>
              Impulse Agency se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur au jour de la signature du devis.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 18, color: 'var(--text)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              13. Règlement des litiges et loi applicable
            </h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire.
            </p>
            <p style={{ marginTop: 8 }}>
              À défaut d'accord amiable, le litige sera soumis aux tribunaux compétents de Marseille.
            </p>
            <p style={{ marginTop: 8 }}>
              Conformément à l'article L612-1 du Code de la consommation, tout client consommateur a le droit de recourir gratuitement à un médiateur de la consommation en cas de litige.
            </p>
          </section>

          <p style={{ fontSize: 13, color: 'var(--text-muted)', borderTop: '1px solid var(--line)', paddingTop: 24 }}>
            Dernière mise à jour : mai 2026
          </p>
        </div>
      </div>
    </div>
  );
}
