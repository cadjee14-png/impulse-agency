import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const esc = (v: unknown) =>
  String(v ?? '')
    .slice(0, 2000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const LABELS: Record<string, string> = {
  prenom: 'Prénom',
  contact: 'WhatsApp / email',
  entreprise: 'Entreprise',
  besoin: 'Besoin',
  talent: 'Talent souhaité',
  budget: 'Budget',
  age: 'Âge',
  ville: 'Ville',
  profil: 'Profil',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  message: 'Message',
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const type = body.type === 'candidature' ? 'candidature' : 'booking';

    if (!body.prenom || !body.contact) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }
    if (type === 'candidature' && body.majeure !== true) {
      return NextResponse.json({ error: 'Candidature réservée aux personnes majeures' }, { status: 400 });
    }

    const rows = Object.keys(LABELS)
      .filter(k => body[k])
      .map(k => `<tr>
          <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:14px;width:140px;vertical-align:top;">${LABELS[k]}</td>
          <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:15px;color:#0D0D0D;">${esc(body[k]).replace(/\n/g, '<br>')}</td>
        </tr>`)
      .join('');

    const title = type === 'candidature' ? 'Nouvelle candidature talent' : 'Nouvelle demande de booking';

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Impulse Agency <noreply@impulse-agency.fr>',
      to: 'cadjee14@gmail.com',
      subject: `${title} — ${String(body.prenom).slice(0, 60)}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:12px;">
          <div style="background:#1E466B;border-radius:8px;padding:20px 24px;margin-bottom:24px;">
            <h1 style="color:white;margin:0;font-size:20px;">${title}</h1>
          </div>
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
          <p style="margin-top:24px;font-size:12px;color:#aaa;">Reçu depuis impulse-agency.fr/talents</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 });
  }
}
