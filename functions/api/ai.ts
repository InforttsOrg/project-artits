interface Env {
    MEMORIES_KV: KVNamespace;
}

export const onRequest: PagesFunction<Env> = async (context) => {
    const url = new URL(context.request.url);
    const format = url.searchParams.get('format') || 'json';

    if (format === 'text') {
        return new Response("Hi Me", {
            headers: { 
                'Content-Type': 'text/plain; charset=utf-8',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }

    return new Response(JSON.stringify({ reply: "Hi Me" }), {
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    return new Response(JSON.stringify({ reply: "Hi Me" }), {
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
    return new Response(JSON.stringify({ reply: "Hi Me" }), {
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
};
