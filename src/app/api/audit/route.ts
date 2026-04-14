import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { prenom, whatsapp, services } = await req.json();

    if (!prenom || !whatsapp) {
      return NextResponse.json({ error: 'Champs manquants' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Impulse Agency <noreply@impulse-agency.fr>',
      to: 'cadjee14@gmail.com',
      subject: `🔥 Nouveau lead — ${prenom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 520px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
          <div style="background: #1E466B; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🔥 Nouveau lead Impulse Agency</h1>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; font-size: 14px; width: 120px;">Prénom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; font-size: 16px; color: #0D0D0D;">${prenom}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: ${services?.length ? '1px solid #eee' : 'none'}; color: #666; font-size: 14px;">WhatsApp</td>
              <td style="padding: 12px 0; border-bottom: ${services?.length ? '1px solid #eee' : 'none'}; font-weight: 600; font-size: 16px; color: #0D0D0D;">${whatsapp}</td>
            </tr>
            ${services?.length ? `<tr>
              <td style="padding: 12px 0; color: #666; font-size: 14px; vertical-align: top;">Besoins</td>
              <td style="padding: 12px 0; font-size: 14px; color: #0D0D0D;">${(services as string[]).map(s => `<span style="display:inline-block;background:#EBF4FF;color:#1E466B;padding:3px 10px;border-radius:20px;margin:2px;font-size:13px;">${s}</span>`).join('')}</td>
            </tr>` : ''}
          </table>
          <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" style="display: inline-block; margin-top: 24px; background: #25D366; color: white; padding: 14px 28px; border-radius: 32px; text-decoration: none; font-weight: 600; font-size: 15px;">
            📲 Rappeler sur WhatsApp
          </a>
          <p style="margin-top: 24px; font-size: 12px; color: #aaa;">Reçu depuis le formulaire d'audit — impulse-agency.fr</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 });
  }
}
