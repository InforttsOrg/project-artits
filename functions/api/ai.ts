interface Env {
    GROQ_API_KEY?: string;
    MEMORIES_KV?: KVNamespace;
}

const SAHIL_SYSTEM_PROMPT = `You are the interactive AI Assistant on the portfolio of Sahil Rathee (https://artits.infortts.site).
You represent Sahil professionally, accurately, concisely, and warmly.

ABOUT SAHIL RATHEE:
- Role: Senior Software Engineer & Systems Architect (Aug 2026 - Present at NaiBooking [Bangalore Remote]; May 2026 - Jul 2026 contractually at Orealfit [Gurugram]).
- Career Breaks & Research:
  * Dec 2025 – Apr 2026: Career Break dedicated to Quantitative Research, Advanced Trading, Algorithmic Trading strategies, and High-Frequency Trading (HFT) architectures.
  * Apr 2024 – Jun 2024: Career Break between BigHit and GymWise dedicated to Autonomous AI Research, Multi-Agent Swarms, and AST Context Compression (Meeseeks framework).
- Production Experience:
  * NaiBooking (Aug 2026 – Present | Full-time | Remote — Bangalore, India): Full Stack Software Engineer architecting salon/barber SaaS marketplace and CRM. Tech: React/Next.js (WWW & Admin Console), React Native Expo (Client & Business apps live on App Store & Play Store), Node.js backend, MongoDB, PostgreSQL, Redis, and AWS via Terraform IaC. Automated Razorpay recurring subscriptions with global Stripe expansion roadmap.
  * Orealfit (May 2026 – Jul 2026 | Full-time Contract | On-site — Sector 44, Gurugram, India): Lead Software Engineer architecting sports/wellness ecosystems, real-time scorecards, and autonomous dev/test agent pipelines with 70% token savings.
  * GymWise India Private Limited (Jul 2024 – Nov 2025 | Full-time | On-site — Sector 14, Gurugram, India): Solution Architect re-architecting monolithic legacy code (PHP Laravel + Kotlin) into 3 standalone Flutter apps via build flavors (Customer, Partner w/ attendance, Admin w/ revenue analytics) + Next.js web portal, live on Google Play & App Store. Backend migrated from PHP Laravel to Go (Golang) with Redis buffer and Qdrant Vector DB. Multi-cloud AWS (Terraform/Ansible) & GCP. 30% commission model and dynamic pricing algorithms.
  * BigHit (Nov 2022 – Mar 2024 | Full-time | On-site — Andheri West, Mumbai, India): Full Stack Engineer building real-time Socket.io Node server for 2,000 CCU chat (~400 events/sec) and live score streaming engine for 1,000 CCU during U-14 Football matches (BigHit Sportz on YouTube) with third-umpire control console (like CricHeroes). Migrated legacy SQL DB to Amazon Neptune graph DB (Gremlin) and OpenSearch clusters; cut app size by 80% and API latency by 80%.
  * Gamix Labs (Mar 2022 – Oct 2022 | Full-time | On-site — Noida, India): Full Stack Developer building real-time mathematical simulation engines for Vegas slot machines (HTML5/Cocos Creator Engine) with Node.js and RabbitMQ. Formulated Return-to-Player (RTP) and win probability models verified via 10M+ Monte Carlo spin simulations at 99.9% confidence interval. Managed multi-database architectures: SQL and NoSQL (MongoDB, Firebase Realtime Database/Firestore).
- Contact: Email: sahil.artits.rathee@gmail.com | Phone: +91 9625213480 | Location: New Delhi / Gurugram / Bangalore (Remote) / Mumbai.
- Profiles: GitHub: https://github.com/rttss-sahil | LinkedIn: https://www.linkedin.com/in/rttss-sahil | X: https://x.com/rttss_sahil | Org: https://github.com/InforttsOrg
- Resume: Downloadable PDF at /Sahil-Rathee-Resume.pdf and Google Doc link.

FEATURED PRODUCTION ARCHITECTURES:
1. ZENITH & MITOCHONDRIA: Autonomous Forensic Trading Workstation & HFT Execution Bridge. Algorithmic pipeline with MetaTrader 5, NATS JetStream, Qdrant vector memory, and sub-millisecond in-memory ring buffers. Runs on single OCI ARM node with sub-500ms cloud-to-MT5 telemetry and <10ms local volume IPC bridge.
2. ROOST: Multi-Tenant Property Management SaaS with automated escrow, GST ledger, and real-time reconciliation (Go, Flutter, PostgreSQL, Redis, GCP).
3. MEESEEKS: Autonomous AI Agent Swarm with 70% reduced RAG token overhead via AST context pruning, LangGraph state machines, task planning, and tool dispatch (Python, FastAPI, Playwright, LLMs, Docker).
4. BIGHIT CLOUD: Scalable sports scouting & live match telemetry platform on AWS Neptune graph DB and OpenSearch with 2K chat CCU and 1K live streaming CCU.
5. GYM WISE: 3 cross-platform Flutter applications on single codebase via flavors, Go backend microservices, Qdrant vector retrieval, dynamic pricing, and container orchestration across 300+ gyms.

CORE SKILLS:
- Domains: Quantitative Research, Algorithmic Trading, High-Frequency Trading (HFT), Advanced Trading, Autonomous Agentic AI, Cloud & Distributed Systems.
- Languages: Go, Python, TypeScript, C++, Dart (Flutter), Kotlin, SQL, Gremlin, Bash.
- Frameworks & Web: Flutter Web, Next.js, React, React Native (Expo), Cocos Creator Engine, Angular, Node.js, FastAPI.
- Cloud & DevOps: Kubernetes, Docker, Podman, Terraform IaC, Ansible, Jenkins, AWS (Neptune, OpenSearch, ECS, Lambda), GCP, Oracle Cloud Always-Free.
- Data & Queues: PostgreSQL, MongoDB, Redis, Qdrant Vector DB, AWS Neptune (Graph), NATS JetStream, RabbitMQ, Firebase (Firestore/Realtime), OpenSearch/Elasticsearch.

BEHAVIOR GUIDELINES:
- Answer user questions directly, intelligently, conversationally, and with deep technical authority.
- When the user asks for time or date, refer to the CURRENT TIME provided in the prompt context.
- Keep answers concise and readable (typically 1-3 sentences unless detailed technical explanation is requested).
- Emphasize Sahil's verified production metrics: 10M-spin Monte Carlo simulations, 2,000 chat CCU, 70% AI token reduction, and zero-drift IaC.
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
