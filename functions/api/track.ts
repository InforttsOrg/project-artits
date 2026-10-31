interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

const DEFAULT_BOT_TOKEN = '8729591979:AAGeGhTHJ-KIwK5szPu0QL_VkYMoIzSzrYw';
const DEFAULT_CHAT_ID = '1888142090';

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const data: {
      event?: string;
      ref?: string;
      path?: string;
      linkedinUrl?: string;
      recruiterName?: string;
      recruiterOrg?: string;
      notes?: string;
      consentChoice?: string;
      screen?: string;
      referrer?: string;
    } = await request.json();

    const cf = (request as any).cf || {};
    const city = cf.city || 'Unknown City';
    const country = cf.country || 'Unknown Country';
    const region = cf.region || '';
    const asOrg = cf.asOrganization || (cf.asn ? `AS${cf.asn}` : 'Network / ISP');

    const botToken = env.TELEGRAM_BOT_TOKEN || DEFAULT_BOT_TOKEN;
    const chatId = env.TELEGRAM_CHAT_ID || DEFAULT_CHAT_ID;

    let title = '📊 Visitor Activity';
    if (data.event === 'linkedin_introduction') {
      title = '🤝 Direct Recruiter / LinkedIn Connection';
    } else if (data.event === 'cookie_consent') {
      title = `🍪 Cookie Consent: ${data.consentChoice?.toUpperCase() || 'ACCEPTED'}`;
    } else if (data.event === 'page_view') {
      title = '👀 SPA Page View';
    }

    const lines = [
      `<b>${title}</b>`,
      '',
      data.recruiterName ? `<b>Recruiter Name:</b> ${data.recruiterName}` : null,
      data.recruiterOrg ? `<b>Company / Entity:</b> ${data.recruiterOrg}` : null,
      data.linkedinUrl ? `<b>LinkedIn Profile:</b> <a href="${data.linkedinUrl}">${data.linkedinUrl}</a>` : null,
      data.notes ? `<b>Message:</b> <i>${data.notes}</i>` : null,
      data.ref ? `<b>Ref Tag:</b> <code>${data.ref}</code>` : null,
      data.path ? `<b>Path:</b> <code>${data.path}</code>` : null,
      `<b>Organization / ISP:</b> 🏢 <b>${asOrg}</b>`,
      `<b>Location:</b> 📍 ${city}${region ? ', ' + region : ''}, ${country}`,
      data.referrer ? `<b>Referrer:</b> ${data.referrer}` : null,
      data.screen ? `<b>Screen:</b> ${data.screen}` : null,
      `<b>Timestamp:</b> ${new Date().toISOString()}`
    ].filter(Boolean).join('\n');

    context.waitUntil(
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: lines,
          parse_mode: 'HTML',
          disable_web_page_preview: false
        })
      }).catch(err => {
        console.error('Track dispatch error:', err);
      })
    );

    return new Response(JSON.stringify({ success: true, timestamp: Date.now() }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
};
