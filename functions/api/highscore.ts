interface Env {
    MEMORIES_KV?: KVNamespace;
}

interface HighScoreEntry {
    name: string;
    score: number;
    multiplier: number;
    missionId: string;
    timestamp: string;
}

// In-memory edge cache fallback for fast reads and zero-config deployment
let inMemoryLeaderboard: HighScoreEntry[] = [
    { name: "Sahil (Architect)", score: 48500, multiplier: 5, missionId: "voyager_interstellar", timestamp: new Date().toISOString() },
    { name: "Orbital Pioneer", score: 32400, multiplier: 4, missionId: "lunar_freereturn", timestamp: new Date().toISOString() },
    { name: "Lagrange Navigator", score: 21800, multiplier: 3, missionId: "lagrange_point", timestamp: new Date().toISOString() }
];

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
    try {
        let scores = inMemoryLeaderboard;

        if (context.env.MEMORIES_KV) {
            const kvVal = await context.env.MEMORIES_KV.get('artits_highscores');
            if (kvVal) {
                scores = JSON.parse(kvVal);
            }
        }

        // Return top scores sorted descending
        scores.sort((a, b) => b.score - a.score);

        return new Response(JSON.stringify({
            success: true,
            highScore: scores[0] || null,
            leaderboard: scores.slice(0, 10)
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error';
        return new Response(JSON.stringify({
            success: true,
            highScore: inMemoryLeaderboard[0],
            leaderboard: inMemoryLeaderboard.slice(0, 5),
            warning: msg
        }), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    try {
        const body: { name?: string; score?: number; multiplier?: number; missionId?: string } = await context.request.json();
        
        const score = typeof body.score === 'number' ? Math.round(body.score) : 0;
        const multiplier = typeof body.multiplier === 'number' ? Math.round(body.multiplier) : 1;
        const name = (body.name || 'Anonymous Navigator').slice(0, 32);
        const missionId = body.missionId || 'lunar_freereturn';

        const newEntry: HighScoreEntry = {
            name,
            score,
            multiplier,
            missionId,
            timestamp: new Date().toISOString()
        };

        inMemoryLeaderboard.push(newEntry);
        inMemoryLeaderboard.sort((a, b) => b.score - a.score);
        inMemoryLeaderboard = inMemoryLeaderboard.slice(0, 20);

        if (context.env.MEMORIES_KV) {
            await context.env.MEMORIES_KV.put('artits_highscores', JSON.stringify(inMemoryLeaderboard));
        }

        return new Response(JSON.stringify({
            success: true,
            entry: newEntry,
            topScore: inMemoryLeaderboard[0]
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
