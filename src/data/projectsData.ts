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
    tagline: 'Automated Trading Infrastructure & Containerized Execution Engine',
    category: 'FINANCIAL SYSTEMS & CLOUD INFRASTRUCTURE',
    hookQuestion: 'How do you run automated trading strategies in containerized Linux environments without exposing databases to the public internet, while strictly enforcing pre-trade risk controls?',
    role: 'Principal Systems Architect & Lead Engineer',
    timeline: '2023 - Present',
    organization: 'Infortts Inc.',
    companyUrl: 'https://infortts.site',
    keyMetric: '<1ms Execution Latency',
    secondaryMetric: '0 Public Database Ports',
    summary: 'High-performance automated trading system interfacing directly with MetaTrader 5 (MT5). Containerized MT5 inside headless Linux environments to eliminate expensive Windows VM licensing, isolated PostgreSQL and vector databases within a private Docker bridge network with zero public-facing ports, and built a cross-platform Flutter workstation deployed to Google Play.',
    tags: ['MetaTrader 5', 'Linux Containers', 'NATS Messaging', 'PostgreSQL (Isolated)', 'Python FastAPI', 'Flutter Desktop/Web', 'Fastlane CI/CD', 'Qdrant Vector DB'],
    challenge: {
      context: 'Automated trading algorithms for currency pairs and commodities require sub-millisecond execution reliability, continuous uptime, and strict account risk protection. Typical retail setups run on unmanaged Windows desktops and expose database ports directly to the internet, creating severe stability and security vulnerabilities.',
      bottleneck: 'Running multiple strategy instances on standard Windows machines requires manual GUI maintenance and lacks containerized orchestration. Additionally, direct database access from trading bots creates risks of balance over-drawdown during unexpected market volatility.',
      whyExistingFailed: [
        'Traditional MT5 setups depend on manual Windows GUI sessions, preventing automated cloud deployments and orchestration.',
        'Exposing database ports on cloud virtual machines creates critical security risks for sensitive broker credentials and financial transactions.',
        'Unconstrained automated order scripts without mandatory pre-trade risk checks can cause rapid account drawdowns during flash volatility.'
      ]
    },
    architecture: {
      overview: 'Designed a secure two-tier architecture: an isolated private container network hosting databases and message brokers with zero exposed public ports, fronted by a headless containerized MT5 execution engine and an internal RPC proxy.',
      steps: [
        {
          title: 'Headless Containerized MT5 Engine',
          description: 'Packaged MetaTrader 5 inside lightweight Linux containers with isolated VNC access, enabling headless execution in cloud environments without Windows VM licensing costs.',
          tech: 'Linux / Docker / MT5 Bridge'
        },
        {
          title: 'Isolated Database Proxy & Messaging',
          description: 'Internal services communicate via typed RPC over NATS JetStream. Raw external SQL access is disabled, keeping PostgreSQL and vector stores fully isolated within a private container network with zero open public ports.',
          tech: 'NATS JetStream / PostgreSQL / Qdrant'
        },
        {
          title: 'Automated Pre-Trade Risk Management',
          description: 'Every trade is evaluated against strict real-time risk policies—including maximum lot sizing, maximum daily loss, and equity drawdown thresholds—before being dispatched to the broker bridge.',
          tech: 'Python FastAPI / Risk Engine / Invariant Checks'
        },
        {
          title: 'Cross-Platform Trading Workstation (Flutter)',
          description: 'Developed a unified desktop and mobile interface for live market feeds, position tracking, and risk controls, automated for production deployment to Google Play via Fastlane.',
          tech: 'Flutter Desktop/Mobile / Fastlane / Google Play'
        }
      ]
    },
    metrics: [
      { label: 'Order Execution Latency', value: '<1ms', detail: 'Sub-millisecond order fulfillment via direct socket bridge' },
      { label: 'Exposed Database Ports', value: '0 Ports', detail: 'PostgreSQL & Qdrant strictly isolated in private container network' },
      { label: 'Risk Policy Enforcement', value: '100% Guaranteed', detail: 'Automated pre-trade checks on drawdown limits and position sizing' },
      { label: 'System Reliability', value: 'Production Verified', detail: 'Zero unauthorized database access and zero unhandled order dropouts' }
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
    tagline: 'Automated Trading Infrastructure & Containerized Execution Engine',
    category: 'FINANCIAL SYSTEMS & CLOUD INFRASTRUCTURE',
    hookQuestion: 'How do you run automated trading strategies in containerized Linux environments without exposing databases to the public internet, while strictly enforcing pre-trade risk controls?',
    role: 'Principal Systems Architect & Lead Engineer',
    timeline: '2023 - Present',
    organization: 'Infortts Inc.',
    companyUrl: 'https://infortts.site',
    keyMetric: '<1ms Execution Latency',
    secondaryMetric: '0 Public Database Ports',
    summary: 'High-performance automated trading system interfacing directly with MetaTrader 5 (MT5). Containerized MT5 inside headless Linux environments to eliminate expensive Windows VM licensing, isolated PostgreSQL and vector databases within a private Docker bridge network with zero public-facing ports, and built a cross-platform Flutter workstation deployed to Google Play.',
    tags: ['MetaTrader 5', 'Linux Containers', 'NATS Messaging', 'PostgreSQL (Isolated)', 'Python FastAPI', 'Flutter Desktop/Web', 'Fastlane CI/CD', 'Qdrant Vector DB'],
    challenge: {
      context: 'Automated trading algorithms for currency pairs and commodities require sub-millisecond execution reliability, continuous uptime, and strict account risk protection. Typical retail setups run on unmanaged Windows desktops and expose database ports directly to the internet, creating severe stability and security vulnerabilities.',
      bottleneck: 'Running multiple strategy instances on standard Windows machines requires manual GUI maintenance and lacks containerized orchestration. Additionally, direct database access from trading bots creates risks of balance over-drawdown during unexpected market volatility.',
      whyExistingFailed: [
        'Traditional MT5 setups depend on manual Windows GUI sessions, preventing automated cloud deployments and orchestration.',
        'Exposing database ports on cloud virtual machines creates critical security risks for sensitive broker credentials and financial transactions.',
        'Unconstrained automated order scripts without mandatory pre-trade risk checks can cause rapid account drawdowns during flash volatility.'
      ]
    },
    architecture: {
      overview: 'Designed a secure two-tier architecture: an isolated private container network hosting databases and message brokers with zero exposed public ports, fronted by a headless containerized MT5 execution engine and an internal RPC proxy.',
      steps: [
        {
          title: 'Headless Containerized MT5 Engine',
          description: 'Packaged MetaTrader 5 inside lightweight Linux containers with isolated VNC access, enabling headless execution in cloud environments without Windows VM licensing costs.',
          tech: 'Linux / Docker / MT5 Bridge'
        },
        {
          title: 'Isolated Database Proxy & Messaging',
          description: 'Internal services communicate via typed RPC over NATS JetStream. Raw external SQL access is disabled, keeping PostgreSQL and vector stores fully isolated within a private container network with zero open public ports.',
          tech: 'NATS JetStream / PostgreSQL / Qdrant'
        },
        {
          title: 'Automated Pre-Trade Risk Management',
          description: 'Every trade is evaluated against strict real-time risk policies—including maximum lot sizing, maximum daily loss, and equity drawdown thresholds—before being dispatched to the broker bridge.',
          tech: 'Python FastAPI / Risk Engine / Invariant Checks'
        },
        {
          title: 'Cross-Platform Trading Workstation (Flutter)',
          description: 'Developed a unified desktop and mobile interface for live market feeds, position tracking, and risk controls, automated for production deployment to Google Play via Fastlane.',
          tech: 'Flutter Desktop/Mobile / Fastlane / Google Play'
        }
      ]
    },
    metrics: [
      { label: 'Order Execution Latency', value: '<1ms', detail: 'Sub-millisecond order fulfillment via direct socket bridge' },
      { label: 'Exposed Database Ports', value: '0 Ports', detail: 'PostgreSQL & Qdrant strictly isolated in private container network' },
      { label: 'Risk Policy Enforcement', value: '100% Guaranteed', detail: 'Automated pre-trade checks on drawdown limits and position sizing' },
      { label: 'System Reliability', value: 'Production Verified', detail: 'Zero unauthorized database access and zero unhandled order dropouts' }
    ],
    nextProject: { slug: 'meeseeks', title: 'MEESEEKS' },
    prevProject: { slug: 'bighit', title: 'BIGHIT SPORTZ' }
  },

  meeseeks: {
    id: 'meeseeks',
    slug: 'meeseeks',
    number: '02',
    title: 'MEESEEKS',
    tagline: 'Multi-Agent AI Orchestration Framework for Automated Code Refactoring',
    category: 'AUTONOMOUS AI SYSTEMS & DEVELOPER TOOLING',
    hookQuestion: 'How can an orchestrator AI coordinate specialized code agents to refactor complex codebases without context window explosion, hallucination loops, or broken syntax?',
    role: 'Lead Systems Architect & AI Engineer',
    timeline: '2024 - Present',
    organization: 'Orealfit & Infortts Org',
    companyUrl: 'https://orealfit.com',
    keyMetric: '-70% Token Costs',
    secondaryMetric: '100% Deterministic Eval Loop',
    summary: 'Developed an automated multi-agent framework designed to handle repository-scale code refactoring and developer tooling tasks. Designed a hierarchical planner that decomposes user goals into structured dependency graphs, parses code Abstract Syntax Trees (ASTs) to prune unnecessary tokens, and validates generated changes inside isolated Docker test containers before git commits.',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Playwright', 'Model Context Protocol (MCP)', 'Docker Sandboxes', 'Tree-sitter AST'],
    challenge: {
      context: 'Language models often hallucinate or produce syntax errors when tasked with large repository refactors because entire files overwhelm context limits, leading to high API costs and unreliable output.',
      bottleneck: 'Injecting raw repositories into prompts causes quadratic token cost spikes, rate limit exhaustion, and broken architectural patterns.',
      whyExistingFailed: [
        'Naive text chunking retrieves fragmented snippets without understanding type hierarchies or module scope.',
        'Ungoverned recursive agent loops burn excessive API tokens without converging on verified solutions.',
        'Running generated code on the host machine poses security risks and risks corrupting local configuration.'
      ]
    },
    architecture: {
      overview: 'Separates planning from code execution using a Directed Acyclic Graph (DAG) state machine backed by isolated compiler and linter verification gates.',
      steps: [
        {
          title: 'Hierarchical Task Decomposition',
          description: 'The root orchestrator breaks complex refactoring goals into isolated, sequential subtasks with explicit dependencies.',
          tech: 'LangGraph State Machine'
        },
        {
          title: 'AST-Based Context Optimization',
          description: 'Parses Abstract Syntax Trees to extract only relevant interfaces, symbols, and type definitions, reducing prompt token consumption by 70%.',
          tech: 'Tree-sitter / Python AST'
        },
        {
          title: 'Standardized Tool Calling (MCP)',
          description: 'Equipped subagents with verified Model Context Protocol tools for headless browser testing, database queries, and git operations.',
          tech: 'Model Context Protocol (MCP)'
        },
        {
          title: 'Automated Container Test Verification',
          description: 'Runs static analysis (mypy, eslint) and unit tests inside isolated Docker containers, automatically feeding compiler errors back to the model for self-correction.',
          tech: 'Docker Engine / Podman'
        }
      ]
    },
    metrics: [
      { label: 'Token Cost Reduction', value: '-70%', detail: 'Achieved via AST-level context pruning' },
      { label: 'Task Success Rate', value: '94.2%', detail: 'Evaluated across 250+ automated refactoring benchmarks' },
      { label: 'Parallel Agent Concurrency', value: '16 Agents', detail: 'Concurrent task execution without state collisions' },
      { label: 'Syntax Regression Rate', value: '0.0%', detail: 'Compiler-verified code commits before git merge' }
    ],
    nextProject: { slug: 'roost', title: 'ROOST' },
    prevProject: { slug: 'mitochondria', title: 'MITOCHONDRIA' }
  },

  roost: {
    id: 'roost',
    slug: 'roost',
    number: '03',
    title: 'ROOST / RENT1ST',
    tagline: 'Multi-Tenant Property Management SaaS & Financial Escrow System',
    category: 'FINTECH SAAS & DISTRIBUTED LEDGERS',
    hookQuestion: 'How do you guarantee absolute financial consistency and zero duplicate payments across high-concurrency rental transactions using Go microservices?',
    role: 'Principal Backend Architect',
    timeline: '2023 - 2025',
    organization: 'Roost / Rent1st India',
    companyUrl: 'https://rent1st.in',
    companyLogo: '/companies/rent1st.png',
    keyMetric: '99.99% Uptime',
    secondaryMetric: '100% Reconciled Ledgers',
    summary: 'Architected and built a multi-tenant rental management and escrow platform handling high-volume rent collections and owner payouts. Engineered concurrent Go backend services with strict double-entry ledger bookkeeping, PostgreSQL advisory locks for race-condition prevention, and automated GST reconciliation.',
    tags: ['Go (Golang)', 'PostgreSQL', 'Flutter', 'Redis', 'Google Cloud Platform', 'Docker', 'Razorpay / Stripe API'],
    challenge: {
      context: 'Multi-tenant commercial and residential property management systems experience massive concurrent payment surges during month-end rent collection periods.',
      bottleneck: 'Delayed payment gateway webhooks and tenant payment retries frequently create race conditions, risking duplicate balance credits and balance discrepancies.',
      whyExistingFailed: [
        'Single-entry accounting designs fail audit compliance when handling refunds, partial payments, and security deposit deductions.',
        'Out-of-order webhook delivery from third-party payment gateways causes corrupted account balances.',
        'High database connection churn caused database saturation during morning clearing cycles.'
      ]
    },
    architecture: {
      overview: 'Engineered an event-driven double-entry accounting ledger where money transfers are recorded as immutable debit/credit journal entries with strict transactional guarantees.',
      steps: [
        {
          title: 'Idempotent Payment Processing',
          description: 'Every checkout and webhook event requires a cryptographically validated idempotency key cached in Redis to eliminate duplicate transaction processing.',
          tech: 'Redis Sharded Cluster'
        },
        {
          title: 'Concurrency Control via Advisory Locks',
          description: 'Utilized PostgreSQL session-level advisory locks to serialize concurrent balance updates for individual tenant accounts without blocking unrelated users.',
          tech: 'PostgreSQL pg_locks'
        },
        {
          title: 'Double-Entry Accounting Engine',
          description: 'Every financial transfer produces matching balanced DEBIT and CREDIT journal records verified by database constraints before commit.',
          tech: 'Go / PostgreSQL Transactions'
        },
        {
          title: 'Automated Tax & Invoicing Pipeline',
          description: 'Asynchronous event workers calculate multi-state GST splits and generate digital PDF invoices sent automatically to owners and tenants.',
          tech: 'Go Microservices / Google Cloud PubSub'
        }
      ]
    },
    metrics: [
      { label: 'Platform Availability', value: '99.99%', detail: 'Continuous uptime across high-volume month-end rent cycles' },
      { label: 'Audit Discrepancies', value: '0.00', detail: 'Zero reconciliation discrepancies across all fiscal quarters' },
      { label: 'Transaction Latency', value: '<25ms', detail: 'End-to-end ledger settlement response time' },
      { label: 'Tenant Onboarding Speed', value: '<2 Mins', detail: 'Automated KYC and bank verification pipeline' }
    ],
    nextProject: { slug: 'bighit', title: 'BIGHIT SPORTZ' },
    prevProject: { slug: 'meeseeks', title: 'MEESEEKS' }
  },

  bighit: {
    id: 'bighit',
    slug: 'bighit',
    number: '04',
    title: 'BIGHIT SPORTZ',
    tagline: 'Scalable Cloud Infrastructure & Youth Sports Scouting Platform',
    category: 'CLOUD INFRASTRUCTURE & SCALABLE BACKENDS',
    hookQuestion: 'How do you scale a nationwide sports scouting platform across India with zero downtime during live tournament spikes while cutting server infrastructure costs by 60%?',
    role: 'Full Stack Engineer & DevOps Lead',
    timeline: '2022 - 2024',
    organization: 'BigHit Pvt Ltd (BigHit Sportz)',
    companyUrl: 'https://bighit.pro',
    companyLogo: '/companies/bighit.svg',
    keyMetric: '-80% App Bundle Size',
    secondaryMetric: '+60% Infrastructure Efficiency',
    summary: 'Led mobile performance optimization and backend cloud infrastructure modernization for India’s premier youth sports scouting platform (official partner of FC Bayern Youth Cup and Bundesliga Dream). Migrated monolithic systems to Kubernetes (AWS EKS), implemented Amazon Neptune graph databases for athlete discovery, and optimized React Native mobile applications.',
    tags: ['Kubernetes (EKS)', 'AWS (EC2, S3, RDS, Neptune)', 'Terraform', 'OpenSearch', 'Docker', 'CI/CD GitOps', 'TypeScript', 'React Native'],
    challenge: {
      context: 'Legacy monolithic architecture suffered from high cloud hosting costs, bloated 120MB app bundles that failed downloads on cellular networks in tier-2/tier-3 Indian cities, and database timeouts during regional tournament registrations.',
      bottleneck: 'Complex relational database queries across millions of player records, coaches, tournament fixtures, and match videos brought database CPU utilization to 100%.',
      whyExistingFailed: [
        'Monolithic EC2 instances were over-provisioned 24/7 to survive transient tournament traffic spikes.',
        'React Native mobile bundle contained duplicate native dependencies and uncompressed assets.',
        'Relational joins could not efficiently traverse multi-degree sports networking connections between players and scouts.'
      ]
    },
    architecture: {
      overview: 'Migrated monolithic EC2 workloads to an auto-scaling Kubernetes cluster backed by Amazon Neptune graph databases for athlete connections and OpenSearch for instant talent scouting.',
      steps: [
        {
          title: 'Graph Database Networking (Amazon Neptune)',
          description: 'Modeled athletes, scouts, clubs, and tournament fixtures as nodes and edges in Amazon Neptune, enabling sub-10ms relationship queries.',
          tech: 'AWS Neptune (Gremlin)'
        },
        {
          title: 'Talent Discovery Search (OpenSearch)',
          description: 'Indexed athlete statistics, athletic metrics, and video transcripts into OpenSearch for sub-20ms multi-attribute talent discovery.',
          tech: 'AWS OpenSearch Service'
        },
        {
          title: 'Kubernetes Autoscaling Mesh (AWS EKS)',
          description: 'Deployed containerized microservices on AWS EKS utilizing Kubernetes Event-driven Autoscaling (KEDA) to scale pods dynamically based on traffic spikes.',
          tech: 'AWS EKS / KEDA / Terraform'
        },
        {
          title: 'Mobile Performance & Bundle Optimization',
          description: 'Re-engineered the mobile build pipeline with the Hermes JavaScript engine and dynamic asset loading, reducing app size from 120MB to 24MB (-80%).',
          tech: 'React Native / Hermes / CI/CD'
        }
      ]
    },
    metrics: [
      { label: 'Mobile App Size Cut', value: '-80%', detail: 'Shrunk from 120MB to 24MB for fast downloads on cellular networks' },
      { label: 'Cloud Cost Savings', value: '60%', detail: 'Eliminated over-provisioned static instances via Kubernetes autoscaling' },
      { label: 'Search Query Latency', value: '<18ms', detail: 'OpenSearch cluster handling complex multi-attribute scout queries' },
      { label: 'Deployment Frequency', value: '+300%', detail: 'Automated CI/CD pipelines enabling daily zero-downtime releases' }
    ],
    nextProject: { slug: 'mitochondria', title: 'MITOCHONDRIA' },
    prevProject: { slug: 'roost', title: 'ROOST' }
  }
};

