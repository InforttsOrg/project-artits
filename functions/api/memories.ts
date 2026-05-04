interface Env {
    MEMORIES_KV: KVNamespace;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body: any = await context.request.json();
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
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const list = await context.env.MEMORIES_KV.list();
    const memories = [];
    
    for (const key of list.keys) {
        const val = await context.env.MEMORIES_KV.get(key.name);
        if (val) memories.push(JSON.parse(val));
    }
    
    return new Response(JSON.stringify(memories), {
        headers: { 'Content-Type': 'application/json' }
    });
};
