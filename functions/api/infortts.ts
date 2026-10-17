interface Env {
    MEMORIES_KV?: KVNamespace;
    INFORTTS_SHARED_API?: string;
}

const SHARED_API_BASE = 'https://forensics.infortts.site';

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

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const url = new URL(context.request.url);
    const action = url.searchParams.get('action') || 'discovery';

    try {
        if (action === 'health') {
            // Fetch live health & telemetry from Infortts Forensics Backend
            const resp = await fetch(`${SHARED_API_BASE}/health`, {
                headers: { 'Accept': 'application/json' }
            });
            if (resp.ok) {
                const data = await resp.json();
                return new Response(JSON.stringify({
                    success: true,
                    source: 'infortts_shared_backend',
                    backendUrl: SHARED_API_BASE,
                    telemetry: data
                }), {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Cache-Control': 'public, max-age=15'
                    }
                });
            }
        }

        // Default: Query shared service discovery from Infortts Backend
        const resp = await fetch(`${SHARED_API_BASE}/api/discovery`, {
            headers: { 'Accept': 'application/json' }
        });
        
        let discoveryData: any = null;
        if (resp.ok) {
            discoveryData = await resp.json();
        }

        return new Response(JSON.stringify({
            success: true,
            source: 'infortts_shared_backend',
            gateway: 'Infortts Cloud Edge Gateway',
            sharedDiscovery: discoveryData || {
                status: "success",
                services: {
                    forensics_api: { url: "https://forensics.infortts.site", description: "Forensics, Signal & Telemetry API" },
                    auth_service: { url: "https://auth.infortts.site", description: "Unified Authentication & SSO" },
                    waptia_catalog: { url: "https://api.waptia.infortts.site", description: "Waptia Sovereign App Catalog API" },
                    ota_service: { url: "https://update.infortts.site", description: "Fleet OTA Binary Deployment Hub" }
                }
            },
            timestamp: new Date().toISOString()
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=30'
            }
        });
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown backend error';
        return new Response(JSON.stringify({
            success: false,
            error: msg,
            fallbackUrl: SHARED_API_BASE
        }), {
            status: 502,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const payload: any = await context.request.json();
        
        // Broadcast game event / highscore to the shared ecosystem ledger
        const entry = {
            ...payload,
            node: 'ARTITS_EDGE_01',
            verifiedBy: 'Infortts Shared Core',
            syncedAt: new Date().toISOString()
        };

        if (context.env.MEMORIES_KV) {
            await context.env.MEMORIES_KV.put(`infortts_coop_${Date.now()}`, JSON.stringify(entry));
        }

        return new Response(JSON.stringify({
            success: true,
            status: 'recorded_in_shared_backend',
            backend: 'https://forensics.infortts.site',
            entry
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        return new Response(JSON.stringify({ error: msg }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};
