interface Env {
    GROQ_API_KEY?: string;
    MEMORIES_KV?: KVNamespace;
}

const SAHIL_SYSTEM_PROMPT = `You are the interactive AI Assistant on the portfolio of Sahil Rathee (https://artits.infortts.site).
You represent Sahil professionally, accurately, concisely, and warmly.

ABOUT SAHIL RATHEE:
- Role: Senior Software Engineer & AI Architect with 4+ years of experience.
- Core Domains: Financial Systems Engineering, Distributed Cloud Infrastructure, Real-Time Low-Latency Telemetry, and Agentic AI Workflows.
- Contact: Email: sahil.artits.rathee@gmail.com | Phone: +91 9625213480 | Location: New Delhi, India.
- Profiles: GitHub: https://github.com/rttss-sahil | LinkedIn: https://www.linkedin.com/in/rttss-sahil | X: https://x.com/rttss_sahil | Org: https://github.com/InforttsOrg
- Resume: Downloadable PDF at /Sahil-Rathee-Resume.pdf and Google Doc link.

FEATURED PRODUCTION ARCHITECTURES:
1. ZENITH & MITOCHONDRIA: Autonomous Forensic Trading Workstation. Algorithmic pipeline with MetaTrader 5, NATS JetStream, Qdrant vector memory, and sub-millisecond in-memory ring buffers.
2. ROOST: Multi-Tenant Property Management SaaS with automated escrow, GST ledger, and real-time reconciliation (Go, Flutter, PostgreSQL, Redis, GCP).
3. MEESEEKS: Autonomous AI Agent Swarm with 70% reduced RAG token overhead, task planning, and tool dispatch (Python, FastAPI, Playwright, LLMs, Docker).
4. BIGHIT CLOUD: Cloud infrastructure modernization on AWS & Kubernetes yielding 80% bundle reduction and 60% server efficiency gains.
5. GYM WISE: Solution Architect delivering biometric attendance, automated billing, and member access controls.

CORE SKILLS:
- Languages: Go, Python, TypeScript, Dart (Flutter), Cocos, Kotlin, SQL, Bash.
- Frameworks & Web: Flutter Web, Next.js, React Native, Angular, Node.js, FastAPI, TailwindCSS.
- Cloud & DevOps: Kubernetes, Docker, Podman, Terraform, Ansible, Jenkins, AWS Lambda/Serverless, Cloudflare (Pages/Workers), GCP, Oracle Cloud.
- Data & Queues: PostgreSQL, MySQL, MongoDB, Redis, Qdrant, NATS JetStream, OpenSearch/Elasticsearch, GIS.

BEHAVIOR GUIDELINES:
- Answer user questions directly, intelligently, and conversationally.
- When the user asks for time or date, refer to the CURRENT TIME provided in the prompt context.
- Keep answers concise and readable (typically 1-3 sentences unless detailed technical explanation is requested).
- Never fabricate experience or hallucinate skills outside of Sahil's background.`;

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

export const onRequestGet: PagesFunction<Env> = async () => {
    return new Response(JSON.stringify({ 
        status: "online", 
        service: "Sahil Rathee AI Assistant API",
        time: new Date().toISOString()
    }), {
        headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const corsHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    };

    let userMessage = "";
    let clientTime = "";

    try {
        const body = await context.request.json() as { message?: string; clientTime?: string; timeZone?: string };
        userMessage = (body?.message || "").trim();
        clientTime = body?.clientTime || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    } catch {
        userMessage = "";
        clientTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    }

    if (!userMessage) {
        return new Response(JSON.stringify({ 
            reply: "Hi! I am Sahil's AI assistant. Ask me anything about his technical stack, systems architecture, or get in touch!" 
        }), { headers: corsHeaders });
    }

    // Quick local pattern check for instant responses
    const lower = userMessage.toLowerCase();
    if (lower.includes("time") || lower.includes("date") || lower.includes("clock")) {
        const timeStr = clientTime || new Date().toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' });
        return new Response(JSON.stringify({ 
            reply: `The current time is ${timeStr}. How can I assist you with Sahil's projects or skills?` 
        }), { headers: corsHeaders });
    }

    const apiKey = context.env.GROQ_API_KEY || "";

    try {
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "qwen/qwen3.8-27b",
                temperature: 0.6,
                max_tokens: 350,
                messages: [
                    {
                        role: "system",
                        content: `${SAHIL_SYSTEM_PROMPT}\n\nCURRENT CONTEXT TIME: ${clientTime} (Asia/Kolkata timezone default).`
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ]
            })
        });

        if (groqResponse.ok) {
            const data = await groqResponse.json() as { choices?: Array<{ message?: { content?: string } }> };
            const reply = data.choices?.[0]?.message?.content?.trim();
            if (reply) {
                return new Response(JSON.stringify({ reply }), { headers: corsHeaders });
            }
        }
    } catch (err) {
        console.error("Groq AI completion error:", err);
    }

    // Contextual fallback response
    let fallback = "Sahil is a Senior Software Engineer & AI Architect specializing in Financial Systems, Distributed Cloud Infrastructure, and Agentic AI workflows. Feel free to explore the 3D architecture graph or email him at sahil.artits.rathee@gmail.com!";
    if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("phone")) {
        fallback = "You can reach Sahil directly at sahil.artits.rathee@gmail.com or by phone at +91 9625213480. He is currently open to Senior and Staff engineering opportunities!";
    } else if (lower.includes("resume") || lower.includes("cv")) {
        fallback = "You can download Sahil's ATS-optimized resume directly using the 'Download Resume PDF' button at the top or at /Sahil-Rathee-Resume.pdf.";
    }

    return new Response(JSON.stringify({ reply: fallback }), { headers: corsHeaders });
};
