export interface ProjectData {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  hookQuestion: string;
  role: string;
  timeline: string;
  organization: string;
  companyUrl?: string;
  companyLogo?: string;
  keyMetric: string;
  secondaryMetric: string;
  summary: string;
  tags: string[];
  challenge: {
    context: string;
    bottleneck: string;
    whyExistingFailed: string[];
  };
  architecture: {
    overview: string;
    steps: {
      title: string;
      description: string;
      tech: string;
    }[];
  };
  metrics: {
    label: string;
    value: string;
    detail: string;
  }[];
  nextProject: {
    slug: string;
    title: string;
  };
  prevProject: {
    slug: string;
    title: string;
  };
}

export const PROJECTS_DATA: Record<string, ProjectData> = {
  mitochondria: {
    id: 'mitochondria',
    slug: 'mitochondria',
    number: '01',
    title: 'MITOCHONDRIA',
    tagline: 'Autonomous XAUUSD & Nifty Algorithmic Trading Workstation & MT5 Container Engine',
    category: 'DISTRIBUTED SYSTEMS & QUANTITATIVE FINTECH',
    hookQuestion: 'How do you run autonomous trading algorithms inside sandboxed Linux/Wine MetaTrader 5 without exposing database ports to the host network, while strictly enforcing per-account hard risk limits before order dispatch?',
    role: 'Principal Systems Architect & Founding Engineer',
    timeline: '2023 - Present',
    organization: 'Infortts Inc.',
    companyUrl: 'https://infortts.site',
    keyMetric: '<0.7ms Order Execution',
    secondaryMetric: '0 Exposed DB Ports (NATS RPC)',
    summary: 'High-scale autonomous trading cluster interfacing directly with sandboxed MetaTrader 5 (MT5 Oracle) inside Linux/Wine containers. Built an isolated private container network (zenith-net) where PostgreSQL, NATS JetStream, and Qdrant have zero exposed host ports, communicating strictly via typed RPC on NATS subject db.query (Charnia Database Proxy) with raw SQL disabled. Integrates the Zenith multi-agent collective (hive orchestrator, execution pool, FastAPI relay) and Nimble Terminal (Flutter mobile/web workstation) automated to Google Play.',
    tags: ['MetaTrader 5', 'Linux/Wine Container', 'Charnia NATS Proxy', 'PostgreSQL Locked RPC', 'Python FastAPI', 'Flutter Desktop/Web', 'Fastlane Google Play', 'Qdrant Vector DB'],
    challenge: {
      context: 'Running autonomous execution strategies on high-leverage commodities (XAUUSD) and index futures (Nifty) requires sub-millisecond latency and ironclad account security. Standard retail setups expose database ports (PostgreSQL 5432, NATS 4222) to host networks or rely on synthetic paper mocks that fail to replicate real-world bridge execution and broker slippage.',
      bottleneck: 'Direct SQL execution from trading bots risks catastrophic balance drain or account compromise. Simultaneously, traditional Windows-dependent MT5 installations lack containerized headless isolation, multi-instance orchestration, and automated CI/CD deployment.',
      whyExistingFailed: [
        'Standard MT5 deployments require interactive Windows desktops with manual GUI management, preventing automated cloud cluster orchestration.',
        'Exposing Postgres or Redis ports on trading VPS instances creates severe attack vectors for proprietary account credentials and active orders.',
        'Uncontrolled bot scripts without database-level risk gates (equity floors, max daily loss, max lot sizing) cause account liquidation during sudden flash crashes.'
      ]
    },
    architecture: {
      overview: 'Architected a dual-plane topology: an isolated private container network (zenith-net) with zero exposed database ports, fronted by a typed NATS RPC proxy (Charnia) and a sandboxed Linux/Wine MetaTrader 5 oracle paired with a Flutter workstation.',
      steps: [
        {
          title: 'Sandboxed MT5 Wine Container (zenith-mt5)',
          description: 'Headless MetaTrader 5 oracle running inside a Linux/Wine container with browser-based VNC (port 6080) and native VNC (5901) for live bridge connectivity without Windows licensing overhead.',
          tech: 'Linux / Wine Container / MT5 Bridge'
        },
        {
          title: 'Charnia NATS Database Proxy (db.query)',
          description: 'Host-side services communicate strictly via typed JSON-RPC on NATS subject db.query (named_query, trades_by_symbol, upsert_account). Raw SQL is disabled (CHARNIA_ALLOW_RAW_SQL=false), keeping Postgres (5432) and Qdrant (6333) completely isolated within zenith-net.',
          tech: 'NATS JetStream RPC / PostgreSQL / Qdrant'
        },
        {
          title: 'Multi-Agent Zenith Collective (Hive & Execution Pool)',
          description: 'Specialized agents for Technical Analysis and News Sentiment stream orders through pre-trade risk validators checking Postgres mt5_accounts invariants (max_lot, equity_floor, max_daily_loss, max_dd_pct).',
          tech: 'Python FastAPI / Hive Orchestrator / Multi-Agent Swarms'
        },
        {
          title: 'Nimble Terminal & Google Play Automation',
          description: 'Flutter-based trading terminal with live tick feeds, strategy heatmaps, and SL/TP visualization, signed with Infortts keystore and deployed directly to Google Play Internal Testing (com.infortts.mitochondria) via Fastlane.',
          tech: 'Flutter Desktop/Web / Fastlane / Google Play Track'
        }
      ]
    },
    metrics: [
      { label: 'Order Execution Latency', value: '<0.7ms', detail: 'Sub-millisecond order fulfillment via Wine MT5 socket bridge' },
      { label: 'Exposed Database Ports', value: '0 Ports', detail: 'Postgres & Qdrant locked inside zenith-net private mesh' },
      { label: 'Risk Gate Enforcement', value: '100% Guaranteed', detail: 'Per-account equity floor & daily loss checked before order dispatch' },
      { label: 'Operational Invariant', value: 'Zero Simulation', detail: 'Every trade runs against live verified FTMO / broker bridge connections' }
    ],
    nextProject: { slug: 'meeseeks', title: 'MEESEEKS' },
    prevProject: { slug: 'bighit', title: 'BIGHIT CLOUD' }
  },

  // Alias for backward compatibility if /work/zenith is accessed
  zenith: {
    id: 'mitochondria',
    slug: 'mitochondria',
    number: '01',
    title: 'MITOCHONDRIA',
    tagline: 'Autonomous XAUUSD & Nifty Algorithmic Trading Workstation & MT5 Container Engine',
    category: 'DISTRIBUTED SYSTEMS & QUANTITATIVE FINTECH',
    hookQuestion: 'How do you run autonomous trading algorithms inside sandboxed Linux/Wine MetaTrader 5 without exposing database ports to the host network, while strictly enforcing per-account hard risk limits before order dispatch?',
    role: 'Principal Systems Architect & Founding Engineer',
    timeline: '2023 - Present',
    organization: 'Infortts Inc.',
    companyUrl: 'https://infortts.site',
    keyMetric: '<0.7ms Order Execution',
    secondaryMetric: '0 Exposed DB Ports (NATS RPC)',
    summary: 'High-scale autonomous trading cluster interfacing directly with sandboxed MetaTrader 5 (MT5 Oracle) inside Linux/Wine containers. Built an isolated private container network (zenith-net) where PostgreSQL, NATS JetStream, and Qdrant have zero exposed host ports, communicating strictly via typed RPC on NATS subject db.query (Charnia Database Proxy) with raw SQL disabled. Integrates the Zenith multi-agent collective (hive orchestrator, execution pool, FastAPI relay) and Nimble Terminal (Flutter mobile/web workstation) automated to Google Play.',
    tags: ['MetaTrader 5', 'Linux/Wine Container', 'Charnia NATS Proxy', 'PostgreSQL Locked RPC', 'Python FastAPI', 'Flutter Desktop/Web', 'Fastlane Google Play', 'Qdrant Vector DB'],
    challenge: {
      context: 'Running autonomous execution strategies on high-leverage commodities (XAUUSD) and index futures (Nifty) requires sub-millisecond latency and ironclad account security. Standard retail setups expose database ports (PostgreSQL 5432, NATS 4222) to host networks or rely on synthetic paper mocks that fail to replicate real-world bridge execution and broker slippage.',
      bottleneck: 'Direct SQL execution from trading bots risks catastrophic balance drain or account compromise. Simultaneously, traditional Windows-dependent MT5 installations lack containerized headless isolation, multi-instance orchestration, and automated CI/CD deployment.',
      whyExistingFailed: [
        'Standard MT5 deployments require interactive Windows desktops with manual GUI management, preventing automated cloud cluster orchestration.',
        'Exposing Postgres or Redis ports on trading VPS instances creates severe attack vectors for proprietary account credentials and active orders.',
        'Uncontrolled bot scripts without database-level risk gates (equity floors, max daily loss, max lot sizing) cause account liquidation during sudden flash crashes.'
      ]
    },
    architecture: {
      overview: 'Architected a dual-plane topology: an isolated private container network (zenith-net) with zero exposed database ports, fronted by a typed NATS RPC proxy (Charnia) and a sandboxed Linux/Wine MetaTrader 5 oracle paired with a Flutter workstation.',
      steps: [
        {
          title: 'Sandboxed MT5 Wine Container (zenith-mt5)',
          description: 'Headless MetaTrader 5 oracle running inside a Linux/Wine container with browser-based VNC (port 6080) and native VNC (5901) for live bridge connectivity without Windows licensing overhead.',
          tech: 'Linux / Wine Container / MT5 Bridge'
        },
        {
          title: 'Charnia NATS Database Proxy (db.query)',
          description: 'Host-side services communicate strictly via typed JSON-RPC on NATS subject db.query (named_query, trades_by_symbol, upsert_account). Raw SQL is disabled (CHARNIA_ALLOW_RAW_SQL=false), keeping Postgres (5432) and Qdrant (6333) completely isolated within zenith-net.',
          tech: 'NATS JetStream RPC / PostgreSQL / Qdrant'
        },
        {
          title: 'Multi-Agent Zenith Collective (Hive & Execution Pool)',
          description: 'Specialized agents for Technical Analysis and News Sentiment stream orders through pre-trade risk validators checking Postgres mt5_accounts invariants (max_lot, equity_floor, max_daily_loss, max_dd_pct).',
          tech: 'Python FastAPI / Hive Orchestrator / Multi-Agent Swarms'
        },
        {
          title: 'Nimble Terminal & Google Play Automation',
          description: 'Flutter-based trading terminal with live tick feeds, strategy heatmaps, and SL/TP visualization, signed with Infortts keystore and deployed directly to Google Play Internal Testing (com.infortts.mitochondria) via Fastlane.',
          tech: 'Flutter Desktop/Web / Fastlane / Google Play Track'
        }
      ]
    },
    metrics: [
      { label: 'Order Execution Latency', value: '<0.7ms', detail: 'Sub-millisecond order fulfillment via Wine MT5 socket bridge' },
      { label: 'Exposed Database Ports', value: '0 Ports', detail: 'Postgres & Qdrant locked inside zenith-net private mesh' },
      { label: 'Risk Gate Enforcement', value: '100% Guaranteed', detail: 'Per-account equity floor & daily loss checked before order dispatch' },
      { label: 'Operational Invariant', value: 'Zero Simulation', detail: 'Every trade runs against live verified FTMO / broker bridge connections' }
    ],
    nextProject: { slug: 'meeseeks', title: 'MEESEEKS' },
  },

  meeseeks: {
    id: 'meeseeks',
    slug: 'meeseeks',
    number: '02',
    title: 'MEESEEKS AGENT ENGINE',
    tagline: 'Hierarchical Autonomous Multi-Agent AI Orchestration Framework',
    category: 'AUTONOMOUS AGENTIC AI & COMPILER SYSTEMS',
    hookQuestion: 'How can an autonomous supervisor LLM reliably coordinate specialized subagents to refactor full repositories without context explosion, hallucination loops, or human babysitting?',
    role: 'Lead Systems Architect & AI Engineer',
    timeline: '2024 - Present',
    organization: 'Orealfit & Infortts Org',
    companyUrl: 'https://orealfit.com',
    keyMetric: '-70% Token Expenditure',
    secondaryMetric: '100% Deterministic Eval Loop',
    summary: 'Architected a self-evolving multi-agent swarm framework where a supervisor LLM orchestrates specialized sub-agents equipped with domain-specific toolsets (Playwright headless browsing, AST-level codebase refactoring, and sandbox execution).',
    tags: ['Python', 'FastAPI', 'LangChain', 'Playwright', 'Model Context Protocol', 'Docker Sandboxes', 'AST Parsers'],
    challenge: {
      context: 'Single-agent coding assistants fail on complex real-world codebases because entire files exceed the attention budget, leading to hallucinated dependencies and invalid syntax.',
      bottleneck: 'Passing entire raw repositories into LLM context windows causes quadratic token cost spikes, rate limit exhaustion, and severe degradation in architectural adherence.',
      whyExistingFailed: [
        'Naive RAG retrieves disconnected text fragments that miss lexical scoping and type hierarchy.',
        'Ungoverned recursive subagent loops burn thousands in API credits without reaching task termination.',
        'Lack of isolated runtime sandboxing allowed untrusted code executions to corrupt host filesystems.'
      ]
    },
    architecture: {
      overview: 'Separates planning from execution using a strict Directed Acyclic Graph (DAG) state machine with compiler-verified evaluation gates.',
      steps: [
        {
          title: 'Supervisor Decomposition & DAG Planner',
          description: 'The root orchestrator breaks user briefs into discrete, verifiable subtasks with explicit prerequisite dependencies.',
          tech: 'LangGraph State Machine'
        },
        {
          title: 'Lexical AST Pruning & Token Slicing',
          description: 'Parses codebase Abstract Syntax Trees to strip unreachable symbols and comments, compressing prompt context by over 70%.',
          tech: 'Tree-sitter / Python AST'
        },
        {
          title: 'Sandboxed Tool Dispatch Protocol',
          description: 'Standardized Model Context Protocol (MCP) clients invoking Playwright headless browsers, Postgres queries, and git commits.',
          tech: 'Model Context Protocol (MCP)'
        },
        {
          title: 'Self-Healing Verification Loop',
          description: 'Executes static analysis (mypy, eslint) and unit tests inside isolated Docker containers, feeding compiler errors back to the agent.',
          tech: 'Docker Engine / Podman'
        }
      ]
    },
    metrics: [
      { label: 'Token Cost Reduction', value: '-70%', detail: 'Achieved via AST-level context slicing' },
      { label: 'End-to-End Task Success', value: '94.2%', detail: 'Measured across 250+ automated refactoring benchmarks' },
      { label: 'Parallel Swarm Concurrency', value: '16 Agents', detail: 'Simultaneous subagent execution without state corruption' },
      { label: 'Syntax Regression Rate', value: '0.0%', detail: 'Zero invalid code commits accepted to master branch' }
    ],
    nextProject: { slug: 'roost', title: 'ROOST ESCROW' },
    prevProject: { slug: 'mitochondria', title: 'MITOCHONDRIA' }
  },

  roost: {
    id: 'roost',
    slug: 'roost',
    number: '03',
    title: 'ROOST & RENT1ST ESCROW',
    tagline: 'Multi-Tenant Property Management SaaS & Financial Escrow Ledger',
    category: 'ENTERPRISE FINTECH & DISTRIBUTED LEDGERS',
    hookQuestion: 'How do you guarantee absolute ACID idempotency across automated property rental escrows with high-concurrency Go microservices and zero double-charge risk?',
    role: 'Principal Backend Architect',
    timeline: '2023 - 2025',
    organization: 'Roost / Rent1st India',
    companyUrl: 'https://rent1st.in',
    companyLogo: '/companies/rent1st.png',
    keyMetric: '99.99% Uptime',
    secondaryMetric: '100% Reconciled Ledgers',
    summary: 'Designed and built a multi-tenant property management platform handling automated escrow transactions. Engineered concurrent Go microservices with strict idempotent double-entry ledger bookkeeping, advisory lock concurrency, and automated GST reconciliation.',
    tags: ['Go (Golang)', 'PostgreSQL', 'Flutter', 'Redis', 'Google Cloud Platform', 'Docker', 'Stripe / Razorpay API'],
    challenge: {
      context: 'Multi-tenant commercial and residential property management platforms encounter severe race conditions when tenants initiate concurrent payment retries during payment gateway delays.',
      bottleneck: 'Standard optimistic locking causes serialization failures and abandoned payments under peak monthly rent settlement cycles.',
      whyExistingFailed: [
        'Single-entry accounting designs fail audit compliance when handling refunds and deposit deductions.',
        'Third-party payment webhooks often arrive out of chronological order, leading to double-credit ledger state errors.',
        'High database connection churn caused cloud database crashes during morning bank clearing hours.'
      ]
    },
    architecture: {
      overview: 'Built a strict event-driven double-entry bookkeeping engine where money is never created or destroyed, only transferred across immutable ledger entries.',
      steps: [
        {
          title: 'Idempotency Key Verification',
          description: 'Every transaction requires a cryptographically signed idempotency token cached in Redis with a 24-hour expiration TTL.',
          tech: 'Redis Sharded Cluster'
        },
        {
          title: 'Advisory Lock Concurrency Control',
          description: 'PostgreSQL session-level advisory locks prevent concurrent ledger writes to the same tenant account without blocking unrelated users.',
          tech: 'PostgreSQL pg_locks'
        },
        {
          title: 'Double-Entry Ledger Balancing',
          description: 'Every financial transfer creates matching DEBIT and CREDIT journal records verified by database constraint triggers.',
          tech: 'Go / SQL Transactions'
        },
        {
          title: 'Automated GST Invoice Pipeline',
          description: 'Asynchronous event workers calculate multi-state GST tax splits and generate digital PDF invoices sent to owners instantly.',
          tech: 'Go Microservices / PubSub'
        }
      ]
    },
    metrics: [
      { label: 'System Availability', value: '99.99%', detail: 'Continuous uptime across rent payment cycles' },
      { label: 'Double-Entry Discrepancies', value: '0.00', detail: 'Zero audit discrepancies across all fiscal years' },
      { label: 'Transaction Latency', value: '<25ms', detail: 'End-to-end ledger settlement response time' },
      { label: 'Tenant Onboarding Speed', value: '<2 Mins', detail: 'Automated KYC and bank verification pipeline' }
    ],
    nextProject: { slug: 'bighit', title: 'BIGHIT CLOUD' },
    prevProject: { slug: 'meeseeks', title: 'MEESEEKS' }
  },

  bighit: {
    id: 'bighit',
    slug: 'bighit',
    number: '04',
    title: 'BIGHIT SPORTZ FOUNDRY',
    tagline: 'High-Availability Kubernetes Cluster & Multi-Sport Scouting Infrastructure',
    category: 'CLOUD INFRASTRUCTURE & SCALABLE BACKENDS',
    hookQuestion: 'How do you scale a nationwide youth scouting and sports platform across India with zero downtime during live tournament spikes while cutting server costs by 60%?',
    role: 'Full Stack Engineer & DevOps Lead',
    timeline: '2022 - 2024',
    organization: 'BigHit Pvt Ltd (BigHit Sportz)',
    companyUrl: 'https://bighit.pro',
    companyLogo: '/companies/bighit.svg',
    keyMetric: '-80% Bundle Size',
    secondaryMetric: '+60% Server Cost Efficiency',
    summary: 'Spearheaded mobile & backend infrastructure modernization for India’s premier youth sports scouting platform (partnered with FC Bayern Youth Cup and Bundesliga Dream). Deployed Amazon Neptune graph DB, OpenSearch clusters, and declarative Terraform Kubernetes infrastructure.',
    tags: ['Kubernetes (EKS)', 'AWS (EC2, S3, RDS, Neptune)', 'Terraform', 'OpenSearch', 'Docker', 'CI/CD GitOps', 'TypeScript', 'React Native'],
    challenge: {
      context: 'Legacy monolithic architecture suffered from runaway cloud infrastructure bills, bloated 120MB app bundles that failed downloads on 3G/4G networks in tier-2/tier-3 Indian cities, and unindexed API queries that timed out during regional tournament trials.',
      bottleneck: 'Relational database joins across millions of player records, coaches, tournament fixtures, and match videos brought database CPU utilization to 100%.',
      whyExistingFailed: [
        'Monolithic EC2 instances were over-provisioned 24/7 to survive transient tournament traffic spikes.',
        'React Native bundle contained duplicate native libraries and unoptimized asset packages.',
        'Relational joins could not efficiently traverse multi-degree sports networking connections.'
      ]
    },
    architecture: {
      overview: 'Migrated from monolithic EC2 instances to an auto-scaling Kubernetes microservice mesh backed by Amazon Neptune graph databases for athlete connections and OpenSearch for instant player scouting.',
      steps: [
        {
          title: 'Graph Database Networking',
          description: 'Modeled athletes, scouts, clubs, and tournament fixtures as nodes and edges in Amazon Neptune, enabling sub-10ms relationship traversals.',
          tech: 'AWS Neptune (Gremlin / SPARQL)'
        },
        {
          title: 'OpenSearch Full-Text Scouting',
          description: 'Synchronized athlete stats, athletic metrics, and video transcripts into OpenSearch for sub-20ms multi-attribute talent discovery.',
          tech: 'AWS OpenSearch Service'
        },
        {
          title: 'Kubernetes Autoscaling Mesh',
          description: 'Deployed microservices on AWS EKS utilizing Kubernetes Event-driven Autoscaling (KEDA) to scale pods based on live queue depth.',
          tech: 'AWS EKS / KEDA / Terraform'
        },
        {
          title: 'Mobile Optimization & Bundle Slicing',
          description: 'Re-engineered React Native compilation pipelines with Hermes engine and dynamic asset loading, dropping bundle size from 120MB to 24MB (-80%).',
          tech: 'React Native / Hermes / Webpack'
        }
      ]
    },
    metrics: [
      { label: 'Bundle Size Cut', value: '-80%', detail: 'Shrunk from 120MB to 24MB for seamless tier-2 city downloads' },
      { label: 'Cloud Infrastructure Savings', value: '60%', detail: 'Eliminated over-provisioned static instances via K8s HPA' },
      { label: 'Search Query Latency', value: '<18ms', detail: 'OpenSearch cluster handling complex multi-attribute scout queries' },
      { label: 'Team Velocity Increase', value: '+300%', detail: 'Led team of 6 engineers with automated CI/CD canary rollouts' }
    ],
    nextProject: { slug: 'mitochondria', title: 'MITOCHONDRIA' },
    prevProject: { slug: 'roost', title: 'ROOST ESCROW' }
  }
};
