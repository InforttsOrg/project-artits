import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Download,
  Mail,
  Copy,
  Check,
  Server,
  Cpu,
  Layers,
  Database,
  ChevronRight,
  ChevronLeft,
  Calendar,
  MapPin,
  Terminal,
  Instagram,
} from 'lucide-react';
import {
  GitHubLogo,
  LinkedInLogo,
  XLogo,
  LeetCodeLogo,
  StackOverflowLogo,
  InstagramLogo,
  NaiBookingLogo,
  OrealfitLogo,
  QuantTradingLogo,
  AIAgentLogo,
} from './BrandLogos';
import { PROJECTS_DATA } from '../data/projectsData';

export const ArchitectPortfolioView: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'financial' | 'ai' | 'fintech' | 'cloud'>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>('mitochondria');
  const [activeJobIndex, setActiveJobIndex] = useState(0);

  const email = 'sahil.artits.rathee@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projectList = [
    {
      data: PROJECTS_DATA.mitochondria,
      categoryFilter: 'financial',
      badge: 'FINANCIAL SYSTEMS',
      metrics: [
        { label: 'Latency', value: '< 1ms', desc: 'Direct socket bridge' },
        { label: 'DB Ports', value: '0 Open', desc: 'Private container VPC' },
        { label: 'Risk Enforcement', value: '100%', desc: 'Pre-trade policy check' },
      ],
    },
    {
      data: PROJECTS_DATA.bighit,
      categoryFilter: 'cloud',
      badge: 'CLOUD & DEVOPS',
      metrics: [
        { label: 'API Latency', value: '-80%', desc: 'Optimized queries & caching' },
        { label: 'Server Efficiency', value: '+60%', desc: 'AWS IaC infrastructure' },
        { label: 'App Size', value: '-80%', desc: 'Redesigned core bundle' },
      ],
    },
    {
      data: PROJECTS_DATA.meeseeks,
      categoryFilter: 'ai',
      badge: 'AUTONOMOUS AI',
      metrics: [
        { label: 'Token Efficiency', value: '-71.4%', desc: 'AST context pruning' },
        { label: 'Tool Dispatch', value: 'Isolated', desc: 'Docker sandbox runtime' },
        { label: 'Regression Rate', value: '0.0%', desc: 'Automated test suite' },
      ],
    },
    {
      data: PROJECTS_DATA.roost,
      categoryFilter: 'fintech',
      badge: 'FINTECH SAAS',
      metrics: [
        { label: 'Ledger Audit', value: '100%', desc: 'Double-entry immutability' },
        { label: 'Data Isolation', value: 'Row-Level', desc: 'PostgreSQL tenant security' },
        { label: 'Reconciliation', value: 'Real-time', desc: 'Event-driven streaming' },
      ],
    },
  ];

  const experienceList = [
    {
      id: 'naibooking',
      company: 'NaiBooking',
      role: 'Software Engineer — High-Concurrency Booking Systems & Microservices',
      period: 'Aug 2026 – Present',
      location: 'Bangalore, India (Remote)',
      badge: 'Current Role',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-500/40 flex items-center justify-center p-2 shrink-0 text-emerald-400 shadow-inner">
          <NaiBookingLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Architecting high-scale booking infrastructure and distributed scheduling microservices with low-latency event synchronization.',
        'Engineering fault-tolerant transaction ledgers, PostgreSQL advisory locking, and multi-tier Redis caching to handle high-frequency appointment spikes.',
        'Automated CI/CD deployment pipelines and cloud infrastructure observability across distributed remote service nodes.',
      ],
      techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Microservices', 'REST APIs', 'CI/CD'],
      accentBorder: 'border-emerald-500/30',
      accentBg: 'bg-emerald-950/10',
    },
    {
      id: 'orealfit',
      company: 'Orealfit',
      role: 'Lead Software Engineer — Wellness Architecture & Autonomous Pipelines',
      period: 'May 2026 – Jul 2026',
      location: 'Gurugram, India',
      badge: 'Contractual',
      badgeColor: 'bg-cyan-950/50 text-cyan-300 border-cyan-800/40',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-cyan-500/40 flex items-center justify-center p-2.5 shrink-0 text-cyan-400 shadow-inner">
          <OrealfitLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Contractually architected and scaled an enterprise sports and wellness ecosystem featuring real-time scorecard streaming.',
        'Deployed autonomous agentic dev and test pipelines, speeding up release cadence and feature turnaround time.',
        'Optimized AI infrastructure and RAG telemetry, achieving a 70% reduction in monthly AI token expenditure.',
        'Engineered edge-computed billing and GST-compliance solution for SMBs with sub-50ms latency.',
      ],
      techStack: ['Flutter', 'Next.js', 'Go', 'PostgreSQL', 'Redis', 'Qdrant Vector DB', 'Docker', 'Cloudflare Workers'],
      accentBorder: 'border-cyan-500/30',
      accentBg: 'bg-cyan-950/10',
    },
    {
      id: 'quant-break',
      company: 'Career Break — Quantitative Research',
      role: 'Advanced Trading, Quantitative Research, Algorithmic Execution & HFT',
      period: 'Dec 2025 – Apr 2026',
      location: 'Self-Directed Deep-Dive',
      badge: 'Research Break',
      badgeColor: 'bg-emerald-900/50 text-emerald-300 border-emerald-800/40',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-emerald-500/50 flex items-center justify-center p-2.5 shrink-0 text-emerald-400 shadow-inner">
          <QuantTradingLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Dedicated career break focused on mastering Quantitative Research, Advanced Trading, Algorithmic Trading strategies, and High-Frequency Trading (HFT) architectures.',
        'Formulated mathematical trading models, statistical arbitrage algorithms, and tick-level backtesting engines against real-time market data.',
        'Engineered sub-millisecond in-memory ring buffers and MetaTrader 5 execution bridges streaming real-time order-book telemetry via NATS JetStream (Zenith & Mitochondria).',
        'Developed invariant-based risk management safeguards including dynamic position sizing, trailing circuit breakers, and automated drawdown enforcement.',
      ],
      techStack: ['Quantitative Research', 'Algorithmic Trading', 'HFT Systems', 'Advanced Trading', 'MetaTrader 5', 'Python', 'C++', 'Go', 'NATS JetStream'],
      accentBorder: 'border-emerald-500/40',
      accentBg: 'bg-emerald-950/20',
    },
    {
      id: 'gymwise',
      company: 'GymWise India Private Limited',
      role: 'Software Engineer — Cloud Infrastructure & Systems Architecture',
      period: 'Jul 2024 – Nov 2025',
      location: 'Gurugram, India',
      badge: 'Commercial Enterprise',
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-2 shrink-0 shadow-inner">
          <img src="/companies/gymwise.png" alt="GymWise" className="w-8 h-8 object-contain" />
        </div>
      ),
      highlights: [
        'Architected and led the development of scalable cloud infrastructure and software systems, driving technical strategy.',
        'Spearheaded the design and implementation of container orchestration solutions, optimizing system performance and reliability across 300+ gyms in Delhi NCR, Australia, and Singapore.',
        'Designed and implemented robust software infrastructure, ensuring high availability and scalability of services.',
        'Designed and optimized information systems architecture, improving data flow and cross-service integration.',
      ],
      techStack: ['Cloud Infrastructure', 'Container Orchestration', 'System Architecture', 'IT Strategy', 'AWS', 'Kubernetes', 'Terraform'],
      accentBorder: 'border-zinc-800/80',
      accentBg: 'bg-zinc-900/40',
    },
    {
      id: 'ai-break',
      company: 'Career Break — AI Research',
      role: 'Autonomous AI Agents, Multi-Agent Swarms & AST Context Compression',
      period: 'Apr 2024 – Jun 2024',
      location: 'Self-Directed Deep-Dive',
      badge: 'Research Break',
      badgeColor: 'bg-indigo-900/50 text-indigo-300 border-indigo-800/40',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-indigo-500/50 flex items-center justify-center p-2.5 shrink-0 text-indigo-400 shadow-inner">
          <AIAgentLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Dedicated career break between BigHit and GymWise to conduct comprehensive research into Autonomous AI Agents and Multi-Agent Workflows.',
        'Researched and built AST context compression algorithms, dynamic prompt caching, and isolated Docker execution environments for autonomous coding agents (Meeseeks framework).',
        'Designed hybrid agentic RAG retrieval architectures, hierarchical vector indexing strategies, and automated decision verification loops.',
      ],
      techStack: ['Autonomous AI Agents', 'Multi-Agent Swarms', 'AST Code Parsing', 'Vector Embeddings', 'LLM Orchestration', 'Python', 'Docker'],
      accentBorder: 'border-indigo-500/40',
      accentBg: 'bg-indigo-950/20',
    },
    {
      id: 'bighit',
      company: 'BigHit',
      role: 'Full Stack Engineer — Cloud Modernization & Backend',
      period: 'Nov 2022 – Mar 2024',
      location: 'Mumbai, India',
      badge: 'Scale Infrastructure',
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-2 shrink-0 shadow-inner">
          <img src="/companies/bighit.png" alt="BigHit" className="w-8 h-8 object-contain" />
        </div>
      ),
      highlights: [
        'Spearheaded the redevelopment of tech infrastructure, resulting in ~80% reduction in app size and ~60% increase in server efficiency and architecture availability.',
        'Optimized servers and database queries, reducing API latency by about 80%.',
        'Integrated AWS services including Amazon Neptune graph database, managed OpenSearch clusters, Cache, and Kafka for event streaming.',
        'Designed and developed interactive real-time features including advanced location tracking and dynamic messaging modules.',
      ],
      techStack: ['TypeScript', 'AWS Neptune', 'OpenSearch', 'Kafka', 'React Native', 'Kubernetes', 'Docker'],
      accentBorder: 'border-zinc-800/80',
      accentBg: 'bg-zinc-900/40',
    },
    {
      id: 'gamixlabs',
      company: 'Gamix Labs',
      role: 'Full Stack Developer — Real-Time Game Servers & Services',
      period: 'Mar 2022 – Oct 2022',
      location: 'Noida, India',
      badge: 'Gaming Infrastructure',
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-2 shrink-0 shadow-inner">
          <img src="/companies/gamixlabs.webp" alt="Gamix Labs" className="w-8 h-8 object-contain" />
        </div>
      ),
      highlights: [
        'Configured performance-oriented Node.js gaming servers with data-streaming services for real-time event streaming using Redis and MongoDB.',
        'Collaborated closely with clients like OneFC and Bombay Play to craft responsive gaming PWAs and HTML5 multiplayer experiences.',
        'Led development and rollout of facial/voice recognition web+native app for secure user verification.',
        'Adopted Test-Driven Development (TDD) for faster feedback loops and reliable codebases.',
      ],
      techStack: ['Node.js', 'Redis', 'RabbitMQ', 'MongoDB', 'Flutter / Dart', 'TypeScript', 'TDD'],
      accentBorder: 'border-zinc-800/80',
      accentBg: 'bg-zinc-900/40',
    },
    {
      id: 'infortts',
      company: 'Infortts Inc.',
      role: 'Founding Architect & Principal Engineer',
      period: 'Jun 2021 – Present',
      location: 'Systems & Tooling Incubator',
      badge: 'Incubator & Systems',
      badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center p-2 shrink-0 shadow-inner">
          <img src="/companies/infortts.png" alt="Infortts" className="w-8 h-8 object-contain" />
        </div>
      ),
      highlights: [
        'Architected Mitochondria: Headless containerized automated trading system with sub-millisecond execution and private network isolation.',
        'Built Meeseeks: Multi-agent autonomous workflow engine with AST context compression and Docker sandbox isolation.',
        'Engineered distributed microservices, NATS JetStream event buses, and zero-trust cloud infrastructure.',
      ],
      techStack: ['Go', 'Python', 'NATS JetStream', 'PostgreSQL', 'Docker', 'Kubernetes', 'Flutter'],
      accentBorder: 'border-zinc-800/80',
      accentBg: 'bg-zinc-900/40',
    },
  ];

  const filteredProjects = selectedFilter === 'all'
    ? projectList
    : projectList.filter((p) => p.categoryFilter === selectedFilter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col gap-24">
      {/* 1. HERO SECTION */}
      <section className="flex flex-col gap-8">
        {/* Availability Badge */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AVAILABLE FOR SENIOR & STAFF ROLES • NEW DELHI
          </span>
        </div>

        {/* Profile & Main Headline */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-white leading-none">
              Sahil Rathee
            </h1>
            <p className="font-display text-xl sm:text-2xl text-zinc-300 font-medium">
              Senior Systems & Infrastructure Engineer
            </p>
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Specializing in resilient distributed architectures, sub-millisecond execution engines, Go, Python, and Kubernetes.
              Built scalable backends, automated cloud infrastructure, and low-latency systems at{' '}
              <span className="text-zinc-200 font-medium">GymWise</span>,{' '}
              <span className="text-zinc-200 font-medium">BigHit</span>, and{' '}
              <span className="text-zinc-200 font-medium">Gamix Labs</span>.
            </p>
          </div>

          {/* Photo */}
          <div className="relative group shrink-0">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-zinc-800 bg-zinc-900 shadow-2xl transition-all duration-300 group-hover:border-zinc-700">
              <img
                src="/sahil.png"
                alt="Sahil Rathee"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 shadow-lg">
              rttss-sahil
            </div>
          </div>
        </div>

        {/* CTAs Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href="/Sahil-Rathee-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Resume PDF
          </a>

          <a
            href="mailto:sahil.artits.rathee@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-medium text-sm transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4 text-zinc-400" />
            Email Me
          </a>

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-sm font-mono transition-all cursor-pointer"
            title="Copy email to clipboard"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedEmail ? 'Copied' : email}</span>
          </button>

          <a
            href="https://github.com/rttss-sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-105 shadow-sm"
            title="GitHub Profile"
            aria-label="GitHub Profile"
          >
            <GitHubLogo className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://linkedin.com/in/rttss-sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#0A66C2] transition-all hover:scale-105 shadow-sm"
            title="LinkedIn Profile"
            aria-label="LinkedIn Profile"
          >
            <LinkedInLogo className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://x.com/rttss_sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-105 shadow-sm"
            title="X Profile"
            aria-label="X Profile"
          >
            <XLogo className="w-4 h-4" />
          </a>

          <a
            href="https://leetcode.com/u/rttss-sahil/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#FFA116] transition-all hover:scale-105 shadow-sm"
            title="LeetCode Profile"
            aria-label="LeetCode Profile"
          >
            <LeetCodeLogo className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://stackoverflow.com/users/14934835/rttss-sahil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#F48024] transition-all hover:scale-105 shadow-sm"
            title="Stack Overflow Profile"
            aria-label="Stack Overflow Profile"
          >
            <StackOverflowLogo className="w-4.5 h-4.5" />
          </a>

          <a
            href="https://www.instagram.com/rttss_sahil/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-[#E4405F] transition-all hover:scale-105 shadow-sm"
            title="Instagram Profile"
            aria-label="Instagram Profile"
          >
            <InstagramLogo className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Quantified Impact Numbers Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-800/60">
          <div className="flex flex-col gap-1 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
              &lt; 1ms
            </span>
            <span className="text-xs text-zinc-400 font-medium">Order Execution Latency</span>
            <span className="text-[11px] text-zinc-500 font-mono">Headless Linux MT5 Bridge</span>
          </div>

          <div className="flex flex-col gap-1 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
              -80%
            </span>
            <span className="text-xs text-zinc-400 font-medium">API Latency & Bundle Size</span>
            <span className="text-[11px] text-zinc-500 font-mono">BigHit Sportz Architecture</span>
          </div>

          <div className="flex flex-col gap-1 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
              +60%
            </span>
            <span className="text-xs text-zinc-400 font-medium">Server Infrastructure Efficiency</span>
            <span className="text-[11px] text-zinc-500 font-mono">AWS Neptune & OpenSearch</span>
          </div>

          <div className="flex flex-col gap-1 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60">
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white tracking-tight">
              0 Ports
            </span>
            <span className="text-xs text-zinc-400 font-medium">Public DB Exposure</span>
            <span className="text-[11px] text-zinc-500 font-mono">Isolated Container Network</span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PRODUCTION SYSTEMS */}
      <section id="systems" className="flex flex-col gap-8 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-800 pb-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
              Production Case Studies
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Featured Systems & Architecture
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl">
              Battle-tested production systems engineered for low latency, isolated data security, and automated cloud reliability.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Systems' },
              { id: 'financial', label: 'Financial' },
              { id: 'cloud', label: 'Cloud & DevOps' },
              { id: 'ai', label: 'Autonomous AI' },
              { id: 'fintech', label: 'Fintech SaaS' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-zinc-100 text-zinc-950 shadow-sm'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Systems Cards Stack */}
        <div className="grid grid-cols-1 gap-6">
          {filteredProjects.map(({ data, badge, metrics }) => {
            const isExpanded = expandedProject === data.id;

            return (
              <article
                key={data.id}
                className="rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/60 transition-all duration-200 overflow-hidden"
              >
                <div className="p-6 sm:p-8 flex flex-col gap-6">
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium tracking-wide bg-zinc-800 text-zinc-300 border border-zinc-700/60">
                        {badge}
                      </span>
                      <span className="text-xs font-mono text-zinc-500">
                        {data.timeline} • {data.organization}
                      </span>
                    </div>

                    <Link
                      to={`/work/${data.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors group cursor-pointer"
                    >
                      <span>Read Deep-Dive Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  </div>

                  {/* Title & Tagline */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-2xl text-white tracking-tight">
                      {data.title}
                    </h3>
                    <p className="text-sm sm:text-base text-zinc-300 font-medium">
                      {data.tagline}
                    </p>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-4xl">
                      {data.summary}
                    </p>
                  </div>

                  {/* Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    {metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex flex-col gap-1"
                      >
                        <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                          {m.label}
                        </span>
                        <span className="text-lg font-mono font-bold text-zinc-100">
                          {m.value}
                        </span>
                        <span className="text-xs text-zinc-400">{m.desc}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-400 bg-zinc-950/40 border border-zinc-800/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand / Collapse Architecture Preview */}
                  <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between">
                    <button
                      onClick={() => setExpandedProject(isExpanded ? null : data.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                      />
                      <span>{isExpanded ? 'Hide Architecture Blueprint' : 'Inspect Architecture Blueprint'}</span>
                    </button>

                    <Link
                      to={`/work/${data.slug}`}
                      className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                    >
                      View Full Specs →
                    </Link>
                  </div>

                  {/* Expanded Blueprint Details */}
                  {isExpanded && (
                    <div className="mt-4 p-5 rounded-xl bg-zinc-950/80 border border-zinc-800 flex flex-col gap-4 animate-fadeIn">
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>ARCHITECTURE_OVERVIEW // {data.id.toUpperCase()}</span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {data.architecture.overview}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                        {data.architecture.steps.map((step, idx) => (
                          <div
                            key={step.title}
                            className="p-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800/60 flex flex-col gap-1.5"
                          >
                            <div className="flex items-center justify-between text-xs font-mono">
                              <span className="text-zinc-300 font-semibold">0{idx + 1}. {step.title}</span>
                              <span className="text-zinc-500 text-[10px]">{step.tech}</span>
                            </div>
                            <p className="text-xs text-zinc-400 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* 3. VERIFIED PRODUCTION EXPERIENCE TIMELINE WITH ON-SCROLL PINNED STAGE */}
      <section id="experience" className="flex flex-col gap-8 scroll-mt-24">
        <div className="flex flex-col gap-1 border-b border-zinc-800 pb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
              Career Timeline
            </span>
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span>{activeJobIndex + 1} of {experienceList.length}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveJobIndex((prev) => (prev > 0 ? prev - 1 : experienceList.length - 1))}
                  className="p-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  title="Previous role"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveJobIndex((prev) => (prev < experienceList.length - 1 ? prev + 1 : 0))}
                  className="p-1 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  title="Next role"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Production Track Record
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            Commercial software engineering, infrastructure modernization, and systems architecture across high-growth startups and enterprise systems.
          </p>
        </div>

        {/* Interactive Scroll & Pinned Stage Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Timeline Scrubber / Nav Rail */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 pb-1 flex items-center justify-between">
              <span>Career Milestones</span>
              <span className="text-emerald-400/80">2021 — 2026</span>
            </div>
            {experienceList.map((job, idx) => {
              const isActive = activeJobIndex === idx;
              return (
                <button
                  key={job.id}
                  type="button"
                  onClick={() => setActiveJobIndex(idx)}
                  className={`group relative text-left p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isActive
                      ? 'border-emerald-500/50 bg-emerald-950/20 shadow-md ring-1 ring-emerald-500/20'
                      : 'border-zinc-800/80 bg-zinc-900/30 hover:bg-zinc-900/70 hover:border-zinc-700/80'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="shrink-0">{job.logo}</div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-display font-semibold text-sm truncate ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                          {job.company}
                        </span>
                        {job.badge && (
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono border shrink-0 ${job.badgeColor}`}>
                            {job.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-400 truncate font-mono">
                        {job.period}
                      </span>
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isActive ? 'text-emerald-400 translate-x-0.5' : 'text-zinc-600 group-hover:text-zinc-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Active Card Space (Transitions in the same viewport spot) */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            {(() => {
              const activeJob = experienceList[activeJobIndex];
              return (
                <div
                  key={activeJob.id}
                  className={`p-6 sm:p-8 rounded-2xl border ${activeJob.accentBorder} ${activeJob.accentBg} flex flex-col gap-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-out`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-800/80 pb-5">
                    <div className="flex items-start gap-3.5">
                      <div className="shrink-0">{activeJob.logo}</div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-display font-bold text-xl text-white">
                            {activeJob.company}
                          </h3>
                          {activeJob.badge && (
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${activeJob.badgeColor}`}>
                              {activeJob.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-emerald-400">
                          {activeJob.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex sm:flex-col sm:items-end gap-1.5 text-xs font-mono text-zinc-400 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{activeJob.period}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{activeJob.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                      Key Engineering Outcomes:
                    </span>
                    <ul className="text-sm text-zinc-300 space-y-2 list-disc list-inside leading-relaxed">
                      {activeJob.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-col gap-2 pt-2 border-t border-zinc-800/60">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-medium">
                      Technologies & Paradigms:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeJob.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded text-xs font-mono text-zinc-300 bg-zinc-950/80 border border-zinc-800 shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Scrub / Progress Bar within the Same Space */}
                  <div className="pt-2 flex items-center justify-between gap-4 text-xs font-mono text-zinc-500 border-t border-zinc-800/60">
                    <span>Milestone {activeJobIndex + 1} of {experienceList.length}</span>
                    <div className="flex-1 max-w-[140px] bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                      <div
                        className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
                        style={{ width: `${((activeJobIndex + 1) / experienceList.length) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveJobIndex((prev) => (prev > 0 ? prev - 1 : experienceList.length - 1))}
                        className="hover:text-zinc-200 transition-colors cursor-pointer"
                      >
                        Prev
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => setActiveJobIndex((prev) => (prev < experienceList.length - 1 ? prev + 1 : 0))}
                        className="hover:text-zinc-200 transition-colors cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 4. TECHNICAL RADAR & STACK */}
      <section id="radar" className="flex flex-col gap-8 scroll-mt-24">
        <div className="flex flex-col gap-1 border-b border-zinc-800 pb-5">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
            Core Competencies
          </span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Technical Stack & Architecture Radar
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl">
            Technologies and protocols chosen for performance, fault tolerance, and developer velocity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-zinc-200 font-display font-semibold">
              <Server className="w-5 h-5 text-emerald-400" />
              <span>Backend & Languages</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Go', 'Python', 'TypeScript', 'Dart', 'Kotlin', 'SQL', 'GraphQL', 'gRPC'].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-300 bg-zinc-950 border border-zinc-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-zinc-200 font-display font-semibold">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Cloud & DevOps</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP', 'Cloudflare Workers', 'Linux (Debian/Alpine)', 'CI/CD'].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-300 bg-zinc-950 border border-zinc-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-zinc-200 font-display font-semibold">
              <Layers className="w-5 h-5 text-emerald-400" />
              <span>Messaging & Streaming</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['NATS JetStream', 'Apache Kafka', 'RabbitMQ', 'Redis Pub/Sub', 'WebSockets', 'SSE', 'Event-Driven'].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-300 bg-zinc-950 border border-zinc-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-zinc-200 font-display font-semibold">
              <Database className="w-5 h-5 text-emerald-400" />
              <span>Storage & Vector DBs</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {['PostgreSQL', 'Amazon Neptune', 'Redis', 'MongoDB', 'Qdrant', 'OpenSearch', 'SQLite'].map((item) => (
                <span
                  key={item}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-300 bg-zinc-950 border border-zinc-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONTACT & COLLABORATION CALLOUT */}
      <section className="p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
              Get in touch
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
              Let's build something exceptional.
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
              I am currently open to senior engineering opportunities, distributed systems projects, and high-impact infrastructure challenges.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-sm transition-all shadow-md cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              Send an Email
            </a>

            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-medium text-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Availability & Location Callout (Socials live authoritatively in global footer directly below) */}
        <div className="pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Staff & Senior Systems roles • High-concurrency backends & agentic infrastructure</span>
          </div>
          <span className="text-zinc-500">
            Based in New Delhi • Open for Remote Worldwide
          </span>
        </div>
      </section>
    </div>
  );
};
