'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Field = {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'select' | 'number';
  options?: string[];
  required?: boolean;
  placeholder?: string;
};

const FIELDS: Record<'booking' | 'candidature', Field[]> = {
  booking: [
    { name: 'prenom', label: 'Prénom', required: true },
    { name: 'entreprise', label: 'Marque / entreprise' },
    { name: 'contact', label: 'WhatsApp ou email', required: true },
    { name: 'besoin', label: 'Votre besoin', type: 'select', options: ['Vidéos UGC pour mes pubs', 'Shooting photo / campagne', 'Collaboration influence', 'Je ne sais pas encore'] },
    { name: 'budget', label: 'Budget estimé', type: 'select', options: ['Moins de 500 €', '500 — 1 500 €', '1 500 — 3 000 €', '3 000 € et plus', 'À définir'] },
    { name: 'message', label: 'Votre projet en quelques mots', type: 'textarea', placeholder: 'Produit, plateformes, délai…' },
  ],
  candidature: [
    { name: 'prenom', label: 'Prénom', required: true },
    { name: 'age', label: 'Âge', type: 'number', required: true },
    { name: 'ville', label: 'Ville', required: true },
    { name: 'contact', label: 'WhatsApp ou email', required: true },
    { name: 'profil', label: 'Tu postules en tant que', type: 'select', required: true, options: ['Mannequin', 'Créatrice UGC', 'Les deux'] },
    { name: 'instagram', label: 'Lien Instagram', placeholder: 'https://instagram.com/…' },
    { name: 'tiktok', label: 'Lien TikTok', placeholder: 'https://tiktok.com/@…' },
    { name: 'message', label: 'Parle-nous de toi', type: 'textarea', placeholder: 'Expériences, marques déjà tournées, disponibilités…' },
  ],
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  borderRadius: 12,
  border: '1.5px solid var(--line-hover)',
  background: 'var(--surface)',
  fontSize: 16,
  color: 'var(--text)',
  fontFamily: 'var(--font-body)',
  outline: 'none',
};

export function TalentForm({ type, defaultTalent }: { type: 'booking' | 'candidature'; defaultTalent?: string }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [majeure, setMajeure] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const fields = FIELDS[type];
  const set = (k: string, v: string) => setValues(prev => ({ ...prev, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const missing = fields.filter(f => f.required && !values[f.name]?.trim());
    if (missing.length) return setError(`Champ requis : ${missing.map(f => f.label).join(', ')}.`);
    if (type === 'candidature') {
      if (Number(values.age) < 18 || !majeure) return setError('Les candidatures sont réservées aux personnes majeures.');
    }
    setError('');
    setSending(true);
    try {
      const res = await fetch('/api/talents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...values, talent: defaultTalent, majeure }),
      });
      if (!res.ok) throw new Error();
      if (type === 'booking') router.push(`/merci?prenom=${encodeURIComponent(values.prenom.trim())}`);
      else setSent(true);
    } catch {
      setError('Une erreur est survenue. Réessaie ou écris-nous sur WhatsApp.');
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div style={{ border: '1.5px solid var(--line-hover)', borderRadius: 'var(--radius-card)', padding: 32, background: 'var(--surface)' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Candidature reçue.</p>
        <p style={{ color: 'var(--text-dim)' }}>On regarde ton profil et on te recontacte sous 7 jours si ça colle avec nos besoins du moment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 16 }}>
      {fields.map(f => (
        <label key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: 8, gridColumn: f.type === 'textarea' ? '1 / -1' : undefined }}>
          <span style={{ fontSize: 14, fontWeight: 600 }}>
            {f.label}{f.required && <span style={{ color: 'var(--accent)' }}> *</span>}
          </span>
          {f.type === 'textarea' ? (
            <textarea rows={4} style={{ ...inputStyle, resize: 'vertical' }} placeholder={f.placeholder} value={values[f.name] ?? ''} onChange={e => set(f.name, e.target.value)} />
          ) : f.type === 'select' ? (
            <select style={inputStyle} value={values[f.name] ?? ''} onChange={e => set(f.name, e.target.value)}>
              <option value="">Choisir…</option>
              {f.options!.map(o => <option key={o}>{o}</option>)}
            </select>
          ) : (
            <input type={f.type ?? 'text'} min={f.type === 'number' ? 18 : undefined} style={inputStyle} placeholder={f.placeholder} value={values[f.name] ?? ''} onChange={e => set(f.name, e.target.value)} />
          )}
        </label>
      ))}

      {type === 'candidature' && (
        <label style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 14, color: 'var(--text-dim)' }}>
          <input type="checkbox" checked={majeure} onChange={e => setMajeure(e.target.checked)} style={{ marginTop: 3, width: 18, height: 18 }} />
          Je certifie avoir 18 ans ou plus et j’accepte qu’Impulse Agency conserve ces informations le temps d’étudier ma candidature.
        </label>
      )}

      {error && <p style={{ gridColumn: '1 / -1', color: '#B42318', fontSize: 14 }}>{error}</p>}

      <button
        type="submit"
        disabled={sending}
        style={{
          gridColumn: '1 / -1',
          justifySelf: 'start',
          background: 'var(--accent)',
          color: 'white',
          border: '1px solid var(--accent-dim)',
          borderRadius: 'var(--radius-btn)',
          padding: '16px 32px',
          fontSize: 16,
          fontWeight: 700,
          fontFamily: 'var(--font-heading)',
          opacity: sending ? 0.6 : 1,
        }}
      >
        {sending ? 'Envoi…' : type === 'booking' ? 'Demander un devis' : 'Envoyer ma candidature'}
      </button>
    </form>
  );
}
