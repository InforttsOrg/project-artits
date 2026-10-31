interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  OTP_SECRET?: string;
}

const DEFAULT_BOT_TOKEN = '8729591979:AAGeGhTHJ-KIwK5szPu0QL_VkYMoIzSzrYw';
const DEFAULT_CHAT_ID = '1888142090';
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
      otp?: string;
      challengeToken?: string;
    } = await request.json();

    const cleanEmail = (body.email || '').trim().toLowerCase();
    const cleanOtp = (body.otp || '').trim();
    const challengeToken = (body.challengeToken || '').trim();

    if (!cleanEmail || !cleanOtp || !challengeToken) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing email, OTP code, or verification challenge token.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 1. Decode Challenge Token
    let challengeData: { email: string; expiresAt: number; sig: string };
    try {
      challengeData = JSON.parse(atob(challengeToken));
    } catch {
      return new Response(JSON.stringify({
        success: false,
        error: 'Corrupted or invalid challenge token. Please request a new code.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. Validate Email Binding
    if (challengeData.email !== cleanEmail) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Email does not match the challenge token.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 3. Expiration Check
    if (Date.now() > challengeData.expiresAt) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Verification code has expired (10-minute window exceeded). Please request a new code.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 4. Cryptographic Signature Verification or Authorized Recruiter Passcode
    const secret = env.OTP_SECRET || DEFAULT_SECRET;
    const expectedPayload = `${cleanEmail}::${cleanOtp}::${challengeData.expiresAt}`;
    const calculatedSig = await createHmac(secret, expectedPayload);

    const isSigMatch = (calculatedSig === challengeData.sig);
    const isMasterCode = (cleanOtp === '2026' || cleanOtp.toLowerCase() === 'hr');

    if (!isSigMatch && !isMasterCode) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Invalid verification code or passcode. Please check and try again.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 5. Generate 24-Hour Authorized Session Token
    const sessionExpiresAt = Date.now() + 24 * 60 * 60 * 1000;
    const sessionPayload = `SESSION::${cleanEmail}::${sessionExpiresAt}`;
    const sessionSig = await createHmac(secret, sessionPayload);

    const sessionToken = btoa(JSON.stringify({
      email: cleanEmail,
      expiresAt: sessionExpiresAt,
      sig: sessionSig
    }));

    // 6. Alert Telegram on Successful Unlock
    const botToken = env.TELEGRAM_BOT_TOKEN || DEFAULT_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID;

    const cf = (request as any).cf || {};
    const city = cf.city || 'Unknown City';
    const country = cf.country || 'Unknown Country';
    const asOrg = cf.asOrganization || (cf.asn ? `AS${cf.asn}` : 'Corporate/ISP Network');

    const tgAlert = [
      '🎉 <b>BGV Remuneration Dossier Unlocked!</b>',
      '',
      `<b>Verified Corporate Email:</b> <code>${cleanEmail}</code>`,
      `<b>Access Duration:</b> 24 Hours Session`,
      `<b>Location:</b> 📍 ${city}, ${country}`,
      `<b>Network:</b> 🏢 ${asOrg}`,
      `<b>Timestamp:</b> ${new Date().toISOString()}`
    ].join('\n');

    context.waitUntil(
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: tgAlert,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      }).catch(err => {
        console.error('Telegram notification error:', err);
      })
    );

    return new Response(JSON.stringify({
      success: true,
      sessionToken,
      email: cleanEmail,
      expiresAt: sessionExpiresAt,
      message: 'Email identity confirmed. Remuneration figures unmasked.'
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
      error: err.message || 'Verification failed'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
