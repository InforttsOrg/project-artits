interface Env {
  // Bindings if any
}

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const tab = url.searchParams.get('tab') || 'stats';
  const targetUrl = `https://graph.infortts.site/?tab=${encodeURIComponent(tab)}`;

  try {
    const resp = await fetch(targetUrl, {
      headers: {
        'User-Agent': context.request.headers.get('User-Agent') || 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });

    if (!resp.ok) {
      return new Response(`Upstream graph returned ${resp.status}`, { status: resp.status });
    }

    let html = await resp.text();
    // Inject <base href="https://graph.infortts.site/"> so assets and api calls resolve to graph.infortts.site
    html = html.replace('<head>', '<head><base href="https://graph.infortts.site/">');

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        // Remove frame-ancestors 'none' to allow embedding inside artits.infortts.site
        'Content-Security-Policy': "frame-ancestors 'self' https://artits.infortts.site https://*.infortts.site http://localhost:*;",
        'X-Frame-Options': 'ALLOWALL',
      },
    });
  } catch (err: any) {
    return new Response(`Failed to proxy graph: ${err.message}`, { status: 502 });
  }
};
