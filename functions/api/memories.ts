interface Env {
    MEMORIES_KV: KVNamespace;
}

function kvUnavailable(message: string): Response {
    return new Response(
        JSON.stringify({ error: `MEMORIES_KV is not configured: ${message}` }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        if (!context.env.MEMORIES_KV) {
            return kvUnavailable('no KV namespace bound to this Pages project');
        }
        const body: { content?: string } = await context.request.json();
        const id = Date.now().toString();
        
        const memory = {
            id,
            date: new Date().toISOString(),
            content: body.content,
            status: 'pending'
        };
        
        await context.env.MEMORIES_KV.put(id, JSON.stringify(memory));
        
        return new Response(JSON.stringify({ success: true, id }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
    try {
        if (!context.env.MEMORIES_KV) {
            return kvUnavailable('no KV namespace bound to this Pages project');
        }
        const list = await context.env.MEMORIES_KV.list();
        const memories = [];
        
        for (const key of list.keys) {
            const val = await context.env.MEMORIES_KV.get(key.name);
            if (val) memories.push(JSON.parse(val));
        }
        
        return new Response(JSON.stringify(memories), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
};
