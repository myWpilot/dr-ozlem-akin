export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Eksik alan' });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Dr. Ozlem Akin <onboarding@resend.dev>',
        to: 'ozlem.akin@yeditepe.edu.tr',
        reply_to: email,
        subject: `Web Sitesi Iletisim: ${subject || 'Yeni Mesaj'}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;">
            <h2 style="color:#2F80ED;margin-bottom:24px;">Yeni Iletisim Mesaji</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;color:#6B7280;width:100px;">Ad Soyad</td><td style="padding:10px 0;font-weight:600;color:#1F2937;">${name}</td></tr>
              <tr><td style="padding:10px 0;color:#6B7280;">E-posta</td><td style="padding:10px 0;color:#2F80ED;">${email}</td></tr>
              <tr><td style="padding:10px 0;color:#6B7280;">Konu</td><td style="padding:10px 0;color:#1F2937;">${subject || '-'}</td></tr>
            </table>
            <div style="margin-top:24px;padding:20px;background:#F8FAFC;border-left:4px solid #2F80ED;border-radius:2px;">
              <p style="color:#374151;line-height:1.7;margin:0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="margin-top:24px;font-size:12px;color:#9CA3AF;">Bu mesaj drozlemakin.com.tr uzerinden gonderildi.</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'E-posta gonderilemedi' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Sunucu hatasi' });
  }
}
