interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

// Skip static assets to prevent notification spam
const IGNORE_EXTS = [
  '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico',
  '.woff', '.woff2', '.ttf', '.eot', '.map', '.json', '.txt'
];

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname.toLowerCase();

  // 1. Static asset pass-through
  if (IGNORE_EXTS.some(ext => pathname.endsWith(ext))) {
    return next();
  }

  // 2. Internal API calls pass-through
  if (pathname.startsWith('/api/')) {
    return next();
  }

  // Method A: Query parameters (ref, utm_source, token)
  const ref = url.searchParams.get('ref') || url.searchParams.get('utm_source') || url.searchParams.get('token');
  const utmCampaign = url.searchParams.get('utm_campaign');
  const utmMedium = url.searchParams.get('utm_medium');
  const referrer = request.headers.get('referer') || '';
  const userAgent = request.headers.get('user-agent') || '';

  // Method B: Reverse IP & Cloudflare edge ISP / Organization resolution
  const cf = (request as any).cf || {};
  const city = cf.city || 'Unknown City';
  const country = cf.country || 'Unknown Country';
  const region = cf.region || '';
  const asOrg = cf.asOrganization || (cf.asn ? `AS${cf.asn}` : 'Corporate/ISP Network');

  // Filter out internal pings, status checkers, Cloudflare workers, or datacenter probes
  const isCrawler = /bot|spider|crawl|uptime|curl|headless|ping|sentinel|probe|lighthouse|monitoring|monitor|check|fetch|wget|python|urllib|go-http-client|axios/i.test(userAgent);
  const isCloudflareProbe = asOrg.toLowerCase().includes('cloudflare') || userAgent.toLowerCase().includes('cloudflare');
  const isStatusHealthCheck = request.headers.has('x-health-check') ||
                              request.headers.has('x-infortts-probe') ||
                              request.headers.get('x-purpose') === 'uptime-probe';
  const isDatacenter = /cloudflare|amazon|aws|google cloud|microsoft|oracle|digitalocean|linode|hetzner|ovh|fastly|akamai/i.test(asOrg) || cf.asn === 13335;

  // Suppress automated health checks, workers, and bots from Telegram unless specifically requested via campaign ref
  if ((isCrawler || isCloudflareProbe || isStatusHealthCheck || isDatacenter) && !ref) {
    return next();
  }

  const botToken = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    let alertTitle = '🌐 New Portfolio Visit';
    if (ref) {
      alertTitle = `🎯 Targeted Visitor Link Opened [${ref}]`;
    } else if (referrer.includes('linkedin.com')) {
      alertTitle = '💼 LinkedIn Referral Visitor';
    } else if (pathname.includes('/verify')) {
      alertTitle = '🛡️ HR Verification Dossier Accessed';
    } else if (pathname.includes('/resume')) {
      alertTitle = '📄 Resume Accessed / Downloaded';
    }

    const payloadLines = [
      `<b>${alertTitle}</b>`,
      '',
      `<b>Path:</b> <code>${url.pathname}</code>`,
      ref ? `<b>Campaign Ref:</b> <code>${ref}</code>` : null,
      utmCampaign ? `<b>Campaign:</b> ${utmCampaign}` : null,
      utmMedium ? `<b>Medium:</b> ${utmMedium}` : null,
      `<b>Organization / ISP:</b> 🏢 <b>${asOrg}</b>`,
      `<b>Location:</b> 📍 ${city}${region ? ', ' + region : ''}, ${country}`,
      referrer ? `<b>Referrer:</b> 🔗 ${referrer}` : null,
      `<b>Time:</b> ${new Date().toISOString()}`
    ].filter(Boolean).join('\n');

    context.waitUntil(
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: payloadLines,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      }).catch(err => {
        console.error('Telegram notification error:', err);
      })
    );
  }

  return next();
};
