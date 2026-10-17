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
  zenith: {
    id: 'zenith',
    slug: 'zenith',
    number: '01',
    title: 'ZENITH & MITOCHONDRIA',
    tagline: 'Autonomous Forensic Algorithmic Forex Trading Workstation',
    category: 'DISTRIBUTED SYSTEMS & FINTECH',
    hookQuestion: 'How do you stream and execute 40+ concurrent MetaTrader 5 tick feeds with sub-millisecond execution without dropping a single tick during high-volatility news events?',
    role: 'Principal Systems Architect',
    timeline: '2023 - Present',
    organization: 'Infortts Core',
    keyMetric: '<1ms Order Execution',
    secondaryMetric: '100k msg/sec Throughput',
    summary: 'High-frequency algorithmic trade execution workstation interfacing directly with MetaTrader 5 (MT5). Constructed custom lock-free memory ring buffers and low-latency C++/Python pipelines, broadcasting zero-loss tick streams via NATS JetStream to real-time vector analysis clusters powered by Qdrant.',
    tags: ['Python', 'MetaTrader 5 API', 'NATS JetStream', 'Qdrant Vector DB', 'Lock-Free RingBuffers', 'WebSockets', 'Flutter Desktop'],
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
      { label: 'Order Execution Latency', value: '<0.8ms', detail: 'Reduced from 85ms legacy baseline' },
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
    title: 'MEESEEKS',
    tagline: 'Hierarchical Autonomous Multi-Agent AI Orchestration Engine',
    category: 'AUTONOMOUS AGENTIC AI',
    hookQuestion: 'How do you coordinate autonomous multi-agent coding swarms without blowing up LLM token budgets or generating hallucinated code regressions?',
    role: 'AI Systems Architect',
    timeline: '2023 - Present',
    organization: 'Infortts Intelligence',
    keyMetric: '70% RAG Token Cost Reduction',
    secondaryMetric: '100% Deterministic Verification',
    summary: 'Self-evolving multi-agent swarm framework where a supervisor LLM orchestrates specialized sub-agents equipped with domain-specific toolsets (Playwright headless browsing, AST-level codebase refactoring, and sandbox execution).',
    tags: ['Python', 'FastAPI', 'LangChain', 'Playwright', 'Model Context Protocol (MCP)', 'Docker Sandboxes', 'Qdrant'],
    challenge: {
      context: 'Complex software engineering tasks require multi-step reasoning, file editing, test execution, and deployment. Single-prompt LLMs fail on tasks exceeding 3 files.',
      bottleneck: 'Naive multi-agent setups pass massive conversational transcripts back and forth, exhausting context windows and multiplying token costs by 10x with low success rates.',
      whyExistingFailed: [
        'Unbounded context window growth leading to prompt truncation and model confusion.',
        'Lack of formal AST verification resulting in silent syntax errors and broken imports.',
        'Brittle tool integrations with non-standard JSON schemas causing recurring tool call failures.'
      ]
    },
    architecture: {
      overview: 'Implemented a hierarchical command topology combining supervisor-directed subagent workers with semantic context pruning and automated sandbox validation.',
      steps: [
        {
          title: 'Supervisor Agent Decomposition',
          description: 'Incoming user requirements are analyzed by a Lead Planner that constructs a directed acyclic task graph (DAG) with explicit dependency milestones.',
          tech: 'LangChain / Reasoning Planner'
        },
        {
          title: 'Semantic Context Pruning & Deduplication',
          description: 'A pre-flight filter strips repetitive logs and token bloat, passing only diff-level context to subagents, reducing token consumption by 70%.',
          tech: 'AST Parser / Token Optimizer'
        },
        {
          title: 'Model Context Protocol (MCP) Tool Routing',
          description: 'Standardized tool dispatch enabling subagents to inspect databases, execute headless browser tests, and invoke terminal scripts in secure sandboxes.',
          tech: 'MCP Standard / FastAPI'
        },
        {
          title: 'Self-Healing Verification Loop',
          description: 'Automated syntax checks, linters, and unit tests run before any change is accepted. Failed tests feed back into agent retry loops automatically.',
          tech: 'Docker Sandbox / PyTest'
        }
      ]
    },
    metrics: [
      { label: 'Token Cost Reduction', value: '70%', detail: 'Achieved through semantic diff filtering' },
      { label: 'Task Success Rate', value: '94.2%', detail: 'Up from 61% on single-agent frameworks' },
      { label: 'Avg Execution Time', value: '42s', detail: 'Parallel execution across concurrent subagents' },
      { label: 'Deterministic Verification', value: '100%', detail: 'Zero unverified code accepted into master branch' }
    ],
    nextProject: { slug: 'roost', title: 'ROOST ESCROW' },
    prevProject: { slug: 'zenith', title: 'ZENITH & MITOCHONDRIA' }
  },

  roost: {
    id: 'roost',
    slug: 'roost',
    number: '03',
    title: 'ROOST ESCROW PLATFORM',
    tagline: 'Multi-Tenant Property Management SaaS & Financial Escrow Ledger',
    category: 'FINTECH & HIGH-CONCURRENCY SAAS',
    hookQuestion: 'How do you build a multi-tenant property management platform handling millions in escrow payments with zero financial reconciliation errors and 99.99% uptime?',
    role: 'Backend & Platform Architect',
    timeline: '2022 - 2023',
    organization: 'Roost Living',
    keyMetric: '99.99% Platform Uptime',
    secondaryMetric: 'Zero Escrow Discrepancies',
    summary: 'Designed and built a multi-tenant property management platform handling millions in automated escrow transactions. Engineered concurrent Go microservices with strict idempotent double-entry ledger bookkeeping.',
    tags: ['Go (Golang)', 'PostgreSQL', 'Flutter (iOS/Android)', 'Redis', 'Google Cloud Platform', 'Docker', 'Stripe/Razorpay'],
    challenge: {
      context: 'Co-living operators manage thousands of tenants with complex rent splits, utility deposits, and security refund escrows subject to strict GST tax rules.',
      bottleneck: 'Manual banking reconciliation caused payment disputes, double-charging during network blips, and costly compliance audit penalties.',
      whyExistingFailed: [
        'Single-database transactions caused deadlock timeouts during mass monthly rent payment spikes.',
        'Non-idempotent webhooks from payment gateways created ghost credit entries.',
        'Lack of double-entry ledger accounting made auditing financial state nearly impossible.'
      ]
    },
    architecture: {
      overview: 'Constructed an event-driven Go microservices architecture enforcing mathematical double-entry accounting with PostgreSQL serializable transactions and idempotent payment webhooks.',
      steps: [
        {
          title: 'Idempotent Payment Ingestion',
          description: 'All banking and gateway webhooks are signed, validated, and processed with unique idempotency keys stored in Redis with distributed leases.',
          tech: 'Go / Redis Distributed Locks'
        },
        {
          title: 'Double-Entry Escrow Ledger',
          description: 'Every financial movement creates immutable paired debit and credit journal entries with zero sum balance validation enforced at database schema level.',
          tech: 'PostgreSQL / SQL Check Constraints'
        },
        {
          title: 'Automated GST & Invoice Generation',
          description: 'Background Go worker queues calculate state-level GST splits and generate cryptographically signed digital tax invoices within seconds of payment.',
          tech: 'Go Goroutines / Worker Pool'
        },
        {
          title: 'Cross-Platform Tenant & Owner Portals',
          description: 'Responsive mobile applications built in Flutter providing real-time deposit status, rent agreements, and instant bank payout tracking.',
          tech: 'Flutter / Dart / WebSockets'
        }
      ]
    },
    metrics: [
      { label: 'Ledger Accuracy', value: '100.00%', detail: 'Zero discrepancies across $10M+ transaction volume' },
      { label: 'System Uptime', value: '99.99%', detail: 'Continuous operation across all billing cycles' },
      { label: 'Reconciliation Speed', value: '<2.5s', detail: 'Instant automated reconciliation vs 3 days manual' },
      { label: 'Concurrent Transactions', value: '10k/sec', detail: 'Benchmarked on Go pgx connection pool' }
    ],
    nextProject: { slug: 'bighit', title: 'BIGHIT CLOUD' },
    prevProject: { slug: 'meeseeks', title: 'MEESEEKS' }
  },

  bighit: {
    id: 'bighit',
    slug: 'bighit',
    number: '04',
    title: 'BIGHIT CLOUD FOUNDRY',
    tagline: 'High-Availability Kubernetes Infrastructure & Declarative Cloud Modernization',
    category: 'CLOUD INFRASTRUCTURE & DEVOPS',
    hookQuestion: 'How do you modernize legacy monolithic cloud infrastructure to reduce container bundle footprint by 80% and achieve zero-downtime canary deployments?',
    role: 'Infrastructure Architect',
    timeline: '2023',
    organization: 'BigHit Entertainment Cloud',
    keyMetric: '80% Bundle Size Cut',
    secondaryMetric: '60% Server Cost Efficiency',
    summary: 'Executed complete cloud infrastructure migration and modernization across AWS and Kubernetes. Designed modular Terraform templates, deployed containerized microservices, and instituted automated canary rollouts.',
    tags: ['Kubernetes (EKS)', 'AWS (EC2, S3, RDS, Neptune)', 'Terraform (IaC)', 'Docker', 'OpenSearch', 'NATS', 'ArgoCD'],
    challenge: {
      context: 'Legacy monolithic servers suffered from slow deployment cycles (2 hours), high cloud expenditure, and frequent outages during traffic surges.',
      bottleneck: 'Massive monolithic container images (>1.8GB) caused slow container scaling, image pull timeouts, and fragile dependency conflicts.',
      whyExistingFailed: [
        'Manual AWS console provisioning resulting in configuration drift and untracked changes.',
        'Over-provisioned EC2 instances running at 12% average CPU utilization wasting thousands monthly.',
        'Lack of canary traffic shifting causing all users to experience bugs during new releases.'
      ]
    },
    architecture: {
      overview: 'Migrated infrastructure to 100% declarative Infrastructure as Code using Terraform and Kubernetes (AWS EKS) with GitOps CI/CD pipelines.',
      steps: [
        {
          title: 'Declarative Infrastructure as Code',
          description: 'Provisioned multi-AZ VPCs, EKS clusters, RDS databases, and Neptune graph clusters using reusable, version-controlled Terraform modules.',
          tech: 'Terraform / AWS Provider'
        },
        {
          title: 'Multi-Stage Container Optimization',
          description: 'Stripped build runtimes and compiled static binaries in scratch and alpine images, slashing image sizes from 1.8GB down to 85MB.',
          tech: 'Docker BuildKit / Multi-Stage'
        },
        {
          title: 'Automated GitOps & Canary Deployments',
          description: 'ArgoCD synchronizes Kubernetes manifests directly from Git commits with progressive 5% -> 25% -> 100% traffic shifting via Istio ingress.',
          tech: 'ArgoCD / Istio Service Mesh'
        },
        {
          title: 'Horizontal Pod Autoscaling (HPA)',
          description: 'Custom metrics scaling pods dynamically based on incoming HTTP request volume and NATS queue depths rather than raw CPU spikes.',
          tech: 'Kubernetes HPA / Prometheus'
        }
      ]
    },
    metrics: [
      { label: 'Container Image Size', value: '-80%', detail: 'Reduced from 1.8GB to 85MB' },
      { label: 'Cloud Infrastructure Cost', value: '-60%', detail: 'Achieved through right-sizing and spot instances' },
      { label: 'Deployment Downtime', value: '0s', detail: 'Zero downtime achieved with progressive canary releases' },
      { label: 'CI/CD Pipeline Speed', value: '4m 12s', detail: 'Reduced from 45+ minutes legacy build time' }
    ],
    nextProject: { slug: 'zenith', title: 'ZENITH & MITOCHONDRIA' },
    prevProject: { slug: 'roost', title: 'ROOST ESCROW' }
  }
};
