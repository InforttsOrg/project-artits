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
    tagline: 'Autonomous Forensic Algorithmic Forex Trading Workstation & In-Memory IPC',
    category: 'DISTRIBUTED SYSTEMS & QUANTITATIVE FINTECH',
    hookQuestion: 'How do you stream and execute 50,000 tick/sec market fluctuations without triggering thread starvation, garbage collection pauses, or OS-level latency jitter?',
    role: 'Principal Systems Architect',
    timeline: '2023 - Present',
    organization: 'Infortts Open-Source Swarms',
    companyUrl: 'https://artits.infortts.site',
    keyMetric: '<0.7ms Order Execution',
    secondaryMetric: '100k msg/sec Throughput',
    summary: 'High-frequency algorithmic trade execution workstation interfacing directly with MetaTrader 5 (MT5). Constructed custom lock-free memory ring buffers and low-latency C++/Python pipelines, broadcasting zero-loss tick streams via NATS JetStream to real-time vector analysis clusters powered by Qdrant.',
    tags: ['Python', 'C++', 'MetaTrader 5 API', 'NATS JetStream', 'Qdrant Vector DB', 'Lock-Free RingBuffers', 'WebSockets', 'Flutter Desktop'],
    challenge: {
      context: 'Retail and proprietary forex trading desks suffer from high execution slippage when trading market shock events (e.g. Non-Farm Payrolls, CPI releases). Standard polling architectures introduce 50ms - 200ms latency delays.',
      bottleneck: 'Traditional message brokers (Kafka/RabbitMQ) and relational DB writes introduce garbage collection pauses, network hop overhead, and lock contention that breach latency SLAs.',
      whyExistingFailed: [
        'Standard Python multithreading suffers from GIL contention under high-frequency tick feeds.',
        'REST-based broker APIs hit connection pool exhaustion during flash market spikes.',
        'Conventional relational time-series tables bottleneck on write locks under 40+ parallel instrument feeds.'
      ]
    },
    architecture: {
      overview: 'Engineered a multi-tier pipeline separating tick ingestion, in-memory queueing, distributed messaging, and vector recognition into isolated zero-contention stages.',
      steps: [
        {
          title: 'Direct IPC Memory Ingestion',
          description: 'A native C++ DLL bridge attached directly to the MetaTrader 5 terminal process writes raw ticks into shared memory with zero serialization overhead.',
          tech: 'C++ / Native Win32 Shared Memory'
        },
        {
          title: 'Lock-Free Ring Buffer Queue',
          description: 'Single-producer single-consumer (SPSC) circular ring buffer capable of storing 500,000 tick objects with sub-microsecond enqueue/dequeue latency.',
          tech: 'In-Memory RingBuffer'
        },
        {
          title: 'NATS JetStream Pub/Sub Clustering',
          description: 'Broadcasts partitioned streams across distributed analysis workers with at-least-once delivery guarantees and persistent replay capabilities.',
          tech: 'NATS JetStream 2.10'
        },
        {
          title: 'Qdrant Vector Pattern Matching',
          description: 'Transforms rolling 100-bar candlestick formations into 1536-dimensional embeddings to identify historical liquidity sweep patterns in real time.',
          tech: 'Qdrant Vector Search'
        }
      ]
    },
    metrics: [
      { label: 'Order Execution Latency', value: '<0.7ms', detail: 'Reduced from 85ms legacy baseline' },
      { label: 'Tick Ingestion Throughput', value: '100k msg/s', detail: 'Zero dropped packets across 40+ asset pairs' },
      { label: 'Memory Footprint', value: '18MB', detail: 'Optimized memory layout with zero runtime allocations' },
      { label: 'System Uptime', value: '99.99%', detail: 'Zero downtime during volatile London/NY market overlaps' }
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
    tagline: 'Autonomous Forensic Algorithmic Forex Trading Workstation & In-Memory IPC',
    category: 'DISTRIBUTED SYSTEMS & QUANTITATIVE FINTECH',
    hookQuestion: 'How do you stream and execute 50,000 tick/sec market fluctuations without triggering thread starvation, garbage collection pauses, or OS-level latency jitter?',
    role: 'Principal Systems Architect',
    timeline: '2023 - Present',
    organization: 'Infortts Open-Source Swarms',
    companyUrl: 'https://artits.infortts.site',
    keyMetric: '<0.7ms Order Execution',
    secondaryMetric: '100k msg/sec Throughput',
    summary: 'High-frequency algorithmic trade execution workstation interfacing directly with MetaTrader 5 (MT5). Constructed custom lock-free memory ring buffers and low-latency C++/Python pipelines, broadcasting zero-loss tick streams via NATS JetStream to real-time vector analysis clusters powered by Qdrant.',
    tags: ['Python', 'C++', 'MetaTrader 5 API', 'NATS JetStream', 'Qdrant Vector DB', 'Lock-Free RingBuffers', 'WebSockets', 'Flutter Desktop'],
    challenge: {
      context: 'Retail and proprietary forex trading desks suffer from high execution slippage when trading market shock events. Standard polling architectures introduce 50ms - 200ms latency delays.',
      bottleneck: 'Traditional message brokers and relational DB writes introduce garbage collection pauses and lock contention that breach latency SLAs.',
      whyExistingFailed: [
        'Standard Python multithreading suffers from GIL contention under high-frequency tick feeds.',
        'REST-based broker APIs hit connection pool exhaustion during flash market spikes.',
        'Conventional relational time-series tables bottleneck on write locks under 40+ parallel instrument feeds.'
      ]
    },
    architecture: {
      overview: 'Engineered a multi-tier pipeline separating tick ingestion, in-memory queueing, distributed messaging, and vector recognition into isolated zero-contention stages.',
      steps: [
        {
          title: 'Direct IPC Memory Ingestion',
          description: 'A native C++ DLL bridge attached directly to the MetaTrader 5 terminal process writes raw ticks into shared memory with zero serialization overhead.',
          tech: 'C++ / Native Win32 Shared Memory'
        },
        {
          title: 'Lock-Free Ring Buffer Queue',
          description: 'Single-producer single-consumer circular ring buffer with sub-microsecond enqueue/dequeue latency.',
          tech: 'In-Memory RingBuffer'
        },
        {
          title: 'NATS JetStream Pub/Sub Clustering',
          description: 'Broadcasts partitioned streams across distributed analysis workers with at-least-once delivery guarantees.',
          tech: 'NATS JetStream'
        },
        {
          title: 'Qdrant Vector Pattern Matching',
          description: 'Transforms candlestick formations into 1536-dimensional embeddings to identify liquidity sweep patterns in real time.',
          tech: 'Qdrant Vector Search'
        }
      ]
    },
    metrics: [
      { label: 'Order Execution Latency', value: '<0.7ms', detail: 'Reduced from 85ms legacy baseline' },
      { label: 'Tick Ingestion Throughput', value: '100k msg/s', detail: 'Zero dropped packets across 40+ asset pairs' },
      { label: 'Memory Footprint', value: '18MB', detail: 'Optimized memory layout with zero runtime allocations' },
      { label: 'System Uptime', value: '99.99%', detail: 'Zero downtime during volatile London/NY market overlaps' }
    ],
    nextProject: { slug: 'meeseeks', title: 'MEESEEKS' },
    prevProject: { slug: 'bighit', title: 'BIGHIT CLOUD' }
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
