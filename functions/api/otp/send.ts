interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  OTP_SECRET?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  BREVO_API_KEY?: string;
}

const DEFAULT_SECRET = 'artits-recruiter-vault-secure-hmac-key-2026';

async function createHmac(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body: {
      email?: string;
      name?: string;
      company?: string;
      linkedin?: string;
    } = await request.json();

    const rawEmail = body.email || '';
    const cleanEmail = rawEmail.trim().toLowerCase();
    const name = (body.name || '').trim();
    const company = (body.company || '').trim();
    const linkedin = (body.linkedin || '').trim();

    // 1. Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Please enter a valid official work email address.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. Generate 6-digit OTP
    const rnd = new Uint32Array(1);
    crypto.getRandomValues(rnd);
    const otp = String(100000 + (rnd[0] % 900000));
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // 3. Cryptographic HMAC Signature
    const secret = env.OTP_SECRET || DEFAULT_SECRET;
    const signPayload = `${cleanEmail}::${otp}::${expiresAt}`;
    const sig = await createHmac(secret, signPayload);

    const challengePayload = JSON.stringify({
      email: cleanEmail,
      expiresAt,
      sig
    });
    // Base64 encode without pipe
    const challengeToken = btoa(challengePayload);

    // 4. Cloudflare edge telemetry
    const cf = (request as any).cf || {};
    const city = cf.city || 'Unknown City';
    const country = cf.country || 'Unknown Country';
    const region = cf.region || '';
    const asOrg = cf.asOrganization || (cf.asn ? `AS${cf.asn}` : 'Corporate/ISP Network');

    // 5. Attempt Email Delivery via Resend or Brevo if configured
    let emailDelivered = false;
    let emailError: string | null = null;

    if (env.RESEND_API_KEY) {
      try {
        const fromAddr = env.RESEND_FROM || 'Sahil Rathee BGV Dossier <onboarding@resend.dev>';
        const resendResp = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: fromAddr,
            to: [cleanEmail],
            subject: `${otp} is your verification code for Sahil Rathee BGV Dossier`,
            html: `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 28px; background: #0a0a0f; color: #f4f4f5; border: 1px solid #27272a; border-radius: 16px;">
                <div style="margin-bottom: 20px;">
                  <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: #10b981; text-transform: uppercase;">Official HR Verification Gateway</span>
                  <h2 style="font-size: 22px; margin: 6px 0 0; color: #ffffff;">Access Verification Code</h2>
                </div>
                <p style="font-size: 14px; color: #a1a1aa; line-height: 1.5; margin: 0 0 20px;">
                  Hello ${name ? name : 'there'},<br/>
                  You requested access to inspect the verified remuneration, banking credits, and statutory EPFO documentation for <strong>Sahil Rathee</strong>.
                </p>
                <div style="background: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 24px;">
                  <span style="font-size: 12px; color: #71717a; text-transform: uppercase; letter-spacing: 0.15em;">Your 6-Digit One-Time Code</span>
                  <div style="font-size: 34px; font-weight: 800; letter-spacing: 0.25em; color: #34d399; font-family: monospace; margin-top: 6px;">
                    ${otp}
                  </div>
                  <span style="display: block; font-size: 11px; color: #71717a; margin-top: 8px;">Valid for 10 minutes • Do not share this code</span>
                </div>
                <div style="font-size: 12px; color: #71717a; border-top: 1px solid #27272a; pt-4; padding-top: 16px;">
                  Requested from: 📍 ${city}, ${country} (${asOrg})<br/>
                  Candidate: Sahil Rathee • Senior Software Engineer & AI Architect
                </div>
              </div>
            `
          })
        });
        if (resendResp.ok) {
          emailDelivered = true;
        } else {
          emailError = await resendResp.text();
        }
      } catch (e: any) {
        emailError = e.message;
      }
    } else if (env.BREVO_API_KEY) {
      try {
        const brevoResp = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST',
          headers: {
            'api-key': env.BREVO_API_KEY,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            sender: { name: 'Sahil Rathee BGV Dossier', email: 'verification@infortts.site' },
            to: [{ email: cleanEmail, name: name || 'Recruiter' }],
            subject: `${otp} is your verification code for Sahil Rathee BGV Dossier`,
            htmlContent: `
              <div style="font-family: sans-serif; max-width: 500px; padding: 24px; background: #000; color: #fff; border-radius: 12px;">
                <h2 style="color: #10b981;">Sahil Rathee BGV Verification</h2>
                <p>Your one-time access code is:</p>
                <h1 style="font-size: 36px; letter-spacing: 4px; color: #34d399; font-family: monospace;">${otp}</h1>
                <p style="color: #888; font-size: 12px;">Expires in 10 minutes.</p>
              </div>
            `
          })
        });
        if (brevoResp.ok) {
          emailDelivered = true;
        } else {
          emailError = await brevoResp.text();
        }
      } catch (e: any) {
        emailError = e.message;
      }
    }

    // 6. Real-time Telegram Alert to Sahil (if configured)
    const botToken = env.TELEGRAM_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const tgLines = [
        '🔐 <b>Recruiter BGV Verification Requested</b>',
        '',
        `<b>Corporate Email:</b> <code>${cleanEmail}</code>`,
        name ? `<b>Contact Name:</b> ${name}` : null,
        company ? `<b>Organization:</b> 🏢 <b>${company}</b>` : null,
        linkedin ? `<b>LinkedIn:</b> ${linkedin}` : null,
        `<b>Issued OTP:</b> 🔑 <code>${otp}</code>`,
        `<b>Email Dispatch:</b> ${emailDelivered ? '✅ Sent via Provider' : (emailError ? `⚠️ Provider Error: ${emailError.slice(0, 100)}` : '📲 Alert Dispatched')}`,
        `<b>Location:</b> 📍 ${city}${region ? ', ' + region : ''}, ${country}`,
        `<b>Network:</b> ${asOrg}`,
        `<b>Expires:</b> 10 minutes`,
        `<b>Timestamp:</b> ${new Date().toISOString()}`
      ].filter(Boolean).join('\n');

      context.waitUntil(
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: tgLines,
            parse_mode: 'HTML',
            disable_web_page_preview: true
          })
        }).catch(err => {
          console.error('Telegram dispatch error:', err);
        })
      );
    }

    return new Response(JSON.stringify({
      success: true,
      challengeToken,
      expiresAt,
      email: cleanEmail,
      message: `A 6-digit verification code has been dispatched to ${cleanEmail}.`
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({
      success: false,
      error: err.message || 'Failed to process verification request'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
