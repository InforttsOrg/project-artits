/// Data model for the 3D memory graph.
///
/// Ported verbatim from `src/components/MemoryGraph3D.tsx` so the Flutter
/// build renders exactly the same nodes, labels, copy and edges as the React
/// original.
library;

enum GraphNodeType { project, skill }

class GraphNode {
  const GraphNode({
    required this.id,
    required this.label,
    required this.type,
    required this.desc,
    required this.details,
    this.link,
    this.localPath,
    this.status,
  });

  final String id;
  final String label;
  final GraphNodeType type;
  final String desc;
  final String details;
  final String? link;
  final String? localPath;
  final String? status;
}

class GraphLink {
  const GraphLink(this.source, this.target);

  final String source;
  final String target;
}

const List<GraphNode> initialNodes = <GraphNode>[
  // PROJECTS
  GraphNode(
    id: 'meeseeks',
    label: 'Meeseeks',
    type: GraphNodeType.project,
    desc: 'Autonomous AI Agent Swarm',
    details:
        'A self-evolving network of autonomous agents designed for complex '
        'task orchestration and deployment automation. Employs token '
        'optimization, dynamic model routing (Haiku/Sonnet/Opus), and agentic '
        'sandboxing.',
    link: 'https://meeseeks.infortts.site',
    status: 'Active',
  ),
  GraphNode(
    id: 'mitochondria',
    label: 'Mitochondria',
    type: GraphNodeType.project,
    desc: 'High-Frequency Forensics',
    details:
        'Nanosecond-latency execution pipeline providing resources (hardware, '
        'capital) to the Infortts cell. Incorporates real-time Forex, currency, '
        'and commodity backtesting at 3-minute intervals using vector-search '
        'analytics.',
    link: 'https://forensics.infortts.site',
    status: 'Active',
  ),
  GraphNode(
    id: 'kimberella',
    label: 'Kimberella',
    type: GraphNodeType.project,
    desc: 'Wealth & UPI Engine',
    details:
        'Private, encrypted transaction manager providing a holistic view of '
        'historical financial data, assets, and liabilities. Employs vector '
        'indices for semantic transaction search and a clean Flutter '
        'daily-drive interface.',
    localPath: 'projects/kimberella',
    status: 'In Progress',
  ),
  GraphNode(
    id: 'grypania',
    label: 'Grypania',
    type: GraphNodeType.project,
    desc: 'Spotify AI Recommender',
    details:
        'Edge-compute Cloudflare Worker suggesting music based on Spotify '
        'history using OpenRouter LLMs. Built with a high-performance C++ Core '
        'library for preference analysis.',
    link: 'https://grypania.infortts.site',
    status: 'Initialized',
  ),
  GraphNode(
    id: 'ediacara',
    label: 'Ediacara',
    type: GraphNodeType.project,
    desc: 'Market Sentiment Symphony',
    details:
        'Real-time market sentiment orchestrator. Cloudflare Worker generating '
        'procedural classical music driven by global ticker sentiment signals '
        'via Web Audio API.',
    link: 'https://ediacara.infortts.site',
    status: 'Initialized',
  ),
  GraphNode(
    id: 'dickinsonia',
    label: 'Dickinsonia',
    type: GraphNodeType.project,
    desc: 'Universal Volume Control',
    details:
        'Cross-device nearby Bluetooth discovery and synchronized volume '
        'controls. Features a glassmorphism device grid with active device '
        'volume sliders.',
    localPath: 'projects/dickinsonia',
    status: 'Started',
  ),
  GraphNode(
    id: 'care4u',
    label: 'Care4u (HealthFlow)',
    type: GraphNodeType.project,
    desc: 'Healthcare Operations & Escrow',
    details:
        'Event-driven, serverless healthcare booking platform. Built with Go '
        'serverless handlers, PostgreSQL, and secure escrow payment '
        'integrations.',
    link: 'https://care4u.infortts.site',
    status: 'Active',
  ),
  GraphNode(
    id: 'lexi',
    label: 'Lexi',
    type: GraphNodeType.project,
    desc: 'Salon B2B E-commerce',
    details:
        'Complex headless e-commerce ecosystem built on Next.js 14 and '
        'Medusa.js, managing dark stores, point-of-sale systems, and salon '
        'supplier inventories.',
    link: 'https://github.com/InforttsOrg/project-lexi',
    status: 'Active',
  ),
  GraphNode(
    id: 'spark',
    label: 'Spark',
    type: GraphNodeType.project,
    desc: 'Premium Dating Platform',
    details:
        'High-concurrency matching monolith utilizing Go, Kafka, WebSockets, '
        'and Flutter. Features real-time location awareness and activity maps.',
    localPath: 'projects/spark',
    status: 'Active',
  ),
  GraphNode(
    id: 'artits',
    label: 'Artits',
    type: GraphNodeType.project,
    desc: 'Portfolio & Resume Engine',
    details:
        "Sahil Rathee's personal portfolio. Serves as a dynamic, web-native "
        'resume with on-demand Playwright-based PDF print script and autonomous '
        'job application agents.',
    link: 'https://artits.infortts.site',
    status: 'Production',
  ),
  GraphNode(
    id: 'roost',
    label: 'Roost',
    type: GraphNodeType.project,
    desc: 'Property Management Ecosystem',
    details:
        'Integrated property management ecosystem with dedicated Tenant and '
        'Manager applications. High-scale multi-tenant architecture utilizing '
        'Flutter, Dart, Firebase, and Google Cloud Platform.',
    status: 'Active',
  ),
  GraphNode(
    id: 'shadow_labs',
    label: 'Shadow Labs',
    type: GraphNodeType.project,
    desc: 'Autonomous Marketing Engine',
    details:
        'Autonomous marketing engine for e-commerce. Features AI-driven asset '
        'generation and real-time inventory synchronization, built on Node.js, '
        'Docker, Glycocalyx, and AI.',
    status: 'Active',
  ),
  GraphNode(
    id: 'bighit_cloud',
    label: 'BigHit Cloud',
    type: GraphNodeType.project,
    desc: 'Cloud Infrastructure Optimization',
    details:
        'Cloud infrastructure optimization project resulting in an 80% '
        'reduction in footprint for a major sports platform. Engineered using '
        'AWS, Terraform, and Kubernetes.',
    status: 'Active',
  ),
  // SKILLS
  GraphNode(
    id: 'cpp',
    label: 'C++',
    type: GraphNodeType.skill,
    desc: 'Low-latency Core Systems',
    details:
        'The mandated backend language for all high-performance and '
        'latency-critical Infortts systems (Mitochondria, Grypania Core, '
        'Ediacara Composition).',
  ),
  GraphNode(
    id: 'go',
    label: 'Go (Golang)',
    type: GraphNodeType.skill,
    desc: 'Microservices & Orchestration',
    details:
        'Efficient concurrency programming used for service orchestrators, '
        'serverless booking (Care4u), transaction normalization (Kimberella), '
        'and scaling (Spark).',
  ),
  GraphNode(
    id: 'python',
    label: 'Python',
    type: GraphNodeType.skill,
    desc: 'AI Cores & Data Ingestion',
    details:
        'Utilized for AI workflows, heavy calculations, and RAG execution '
        '(Meeseeks agent swarm, Mitochondria Zenith backtesting, Kimberella '
        'document extraction).',
  ),
  GraphNode(
    id: 'flutter',
    label: 'Dart / Flutter',
    type: GraphNodeType.skill,
    desc: 'Native Cross-Platform UI',
    details:
        'Primary client development stack for premium fluid user interfaces '
        '(Mitochondria Zenith UI, Kimberella dashboard, Dickinsonia APK, Spark '
        'mobile client).',
  ),
  GraphNode(
    id: 'react',
    label: 'React / Vite',
    type: GraphNodeType.skill,
    desc: 'Web Dashboards',
    details:
        'Default framework for web-based control centers and management '
        'interfaces (Cardiodictyon panel, Artits portfolio).',
  ),
  GraphNode(
    id: 'cloudflare',
    label: 'Cloudflare Workers',
    type: GraphNodeType.skill,
    desc: 'Edge serverless & deployment',
    details:
        'Serverless deployment at the edge, routing gateways, and audio '
        'processors (Grypania recommender, Ediacara audio worker, Artits '
        'deployment).',
  ),
  GraphNode(
    id: 'qdrant',
    label: 'Qdrant Vector DB',
    type: GraphNodeType.skill,
    desc: 'Vector Search & AI Memory',
    details:
        'Powering semantic transaction indexing, LLM chat history embeddings, '
        'and AI agent memory storage.',
  ),
  GraphNode(
    id: 'nats',
    label: 'NATS JetStream',
    type: GraphNodeType.skill,
    desc: 'Event-Driven Messaging Bus',
    details:
        'The shared high-speed messaging backbone allowing microservices in the '
        'monorepo to communicate asynchronously and efficiently.',
  ),
  GraphNode(
    id: 'docker',
    label: 'Docker & Swarms',
    type: GraphNodeType.skill,
    desc: 'Infrastructure Isolation',
    details:
        'Container isolation to guarantee database security (no exposed host '
        'ports except through reverse proxies like Caddy or local Adminer).',
  ),
  GraphNode(
    id: 'terraform',
    label: 'Terraform IaC',
    type: GraphNodeType.skill,
    desc: 'Infrastructure as Code',
    details:
        'Automated provisioning of core infrastructure, clusters, and databases '
        'across AWS, GCP, and Postgres.',
  ),
];

const List<GraphLink> initialLinks = <GraphLink>[
  GraphLink('cpp', 'mitochondria'),
  GraphLink('cpp', 'grypania'),
  GraphLink('cpp', 'ediacara'),
  GraphLink('go', 'kimberella'),
  GraphLink('go', 'care4u'),
  GraphLink('go', 'spark'),
  GraphLink('python', 'meeseeks'),
  GraphLink('python', 'mitochondria'),
  GraphLink('python', 'kimberella'),
  GraphLink('flutter', 'mitochondria'),
  GraphLink('flutter', 'kimberella'),
  GraphLink('flutter', 'dickinsonia'),
  GraphLink('flutter', 'spark'),
  GraphLink('flutter', 'care4u'),
  GraphLink('react', 'meeseeks'),
  GraphLink('react', 'artits'),
  GraphLink('react', 'lexi'),
  GraphLink('cloudflare', 'grypania'),
  GraphLink('cloudflare', 'ediacara'),
  GraphLink('cloudflare', 'artits'),
  GraphLink('qdrant', 'meeseeks'),
  GraphLink('qdrant', 'mitochondria'),
  GraphLink('qdrant', 'kimberella'),
  GraphLink('nats', 'mitochondria'),
  GraphLink('docker', 'mitochondria'),
  GraphLink('docker', 'meeseeks'),
  GraphLink('flutter', 'roost'),
  GraphLink('react', 'shadow_labs'),
  GraphLink('docker', 'shadow_labs'),
  GraphLink('terraform', 'bighit_cloud'),
  GraphLink('docker', 'bighit_cloud'),
];

/// Project cards rendered in the PRODUCTION_SYSTEMS section.
class ProjectCard {
  const ProjectCard({
    required this.id,
    required this.title,
    required this.description,
    required this.tags,
  });

  final String id;
  final String title;
  final String description;
  final List<String> tags;
}

const List<ProjectCard> productionSystems = <ProjectCard>[
  ProjectCard(
    id: 'roost',
    title: 'ROOST',
    description:
        'Integrated property management ecosystem with dedicated Tenant and '
        'Manager applications. High-scale multi-tenant architecture.',
    tags: ['FLUTTER', 'DART', 'FIREBASE', 'GCP'],
  ),
  ProjectCard(
    id: 'shadow_labs',
    title: 'SHADOW_LABS',
    description:
        'Autonomous marketing engine for e-commerce. Features AI-driven asset '
        'generation and real-time inventory synchronization.',
    tags: ['NODE.JS', 'DOCKER', 'GLYCOCALYX', 'AI'],
  ),
  ProjectCard(
    id: 'meeseeks',
    title: 'MEESEEKS',
    description:
        'A self-evolving network of autonomous agents designed for complex task '
        'orchestration and deployment automation.',
    tags: ['PYTHON', 'PLAYWRIGHT', 'LLM'],
  ),
  ProjectCard(
    id: 'bighit_cloud',
    title: 'BIGHIT_CLOUD',
    description:
        'Cloud infrastructure optimization project resulting in an 80% '
        'reduction in footprint for a major sports platform.',
    tags: ['AWS', 'TERRAFORM', 'K8S'],
  ),
];

class SocialLink {
  const SocialLink(this.name, this.url);

  final String name;
  final String url;
}

/// `socials` from App.tsx. The first three are promoted into the top bar.
const List<SocialLink> socials = <SocialLink>[
  SocialLink('GITHUB', 'https://github.com/rttss-sahil'),
  SocialLink('X.COM', 'https://x.com/rttss_sahil'),
  SocialLink('LINKEDIN', 'https://www.linkedin.com/in/rttss-sahil'),
  SocialLink('RESUME', '/Sahil-Rathee-Resume.pdf'),
  SocialLink('FORTHJANTA', 'https://github.com/rttss-sahil/root'),
];
