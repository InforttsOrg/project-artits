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
  FileText,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import {
  GitHubLogo,
  LinkedInLogo,
  XLogo,
  LeetCodeLogo,
  StackOverflowLogo,
  InstagramLogo,
  NaiBookingLogo,
  GrowthHikesLogo,
  OrealfitLogo,
  QuantTradingLogo,
  AIAgentLogo,
} from './BrandLogos';
import { TechRadarMarquee } from './TechRadarMarquee';
import { PROJECTS_DATA } from '../data/projectsData';

export const ArchitectPortfolioView: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'financial' | 'ai' | 'fintech' | 'cloud'>('all');
  const [expandedProject, setExpandedProject] = useState<string | null>('mitochondria');
  const [activeJobIndex, setActiveJobIndex] = useState(0);
  const [timelineViewMode, setTimelineViewMode] = useState<'stage' | 'list'>('stage');
  const [experienceCategory, setExperienceCategory] = useState<'all' | 'fulltime' | 'freelance' | 'personal'>('all');

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
    // 1. FULL-TIME POSITIONS (Strictly GymWise, BigHit, Gamix Labs)
    {
      id: 'gymwise',
      company: 'GymWise India Private Limited',
      shortName: 'GymWise',
      category: 'fulltime' as const,
      year: '2024–25',
      role: 'Software Engineer — Cloud Infrastructure & Systems Architecture',
      period: 'Jul 2024 – Nov 2025',
      location: 'Gurugram, India',
      badge: 'Full-Time Employment',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50',
      linkedinUrl: 'https://www.linkedin.com/company/gymwise/',
      icon: <img src="/companies/gymwise.png" alt="GymWise" className="w-4 h-4 object-contain rounded" />,
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
      accentBorder: 'border-emerald-500/30',
      accentBg: 'bg-emerald-950/10',
    },
    {
      id: 'bighit',
      company: 'BigHit Pvt Ltd',
      shortName: 'BigHit',
      category: 'fulltime' as const,
      year: '2022–24',
      role: 'Full Stack Engineer — Cloud Modernization & Backend',
      period: 'Nov 2022 – Mar 2024',
      location: 'Mumbai, India',
      badge: 'Full-Time Employment',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50',
      linkedinUrl: 'https://www.linkedin.com/company/bighit-sportz/',
      icon: <img src="/companies/bighit.png" alt="BigHit" className="w-4 h-4 object-contain rounded" />,
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
      accentBorder: 'border-emerald-500/30',
      accentBg: 'bg-emerald-950/10',
    },
    {
      id: 'gamixlabs',
      company: 'Gamix Labs Private Limited',
      shortName: 'Gamix Labs',
      category: 'fulltime' as const,
      year: '2022',
      role: 'Full Stack Developer — Real-Time Game Servers & Services',
      period: 'Mar 2022 – Oct 2022',
      location: 'Noida, India',
      badge: 'Full-Time Employment',
      badgeColor: 'bg-emerald-950/60 text-emerald-300 border-emerald-700/50',
      linkedinUrl: 'https://www.linkedin.com/company/gamix-labs/',
      icon: <img src="/companies/gamixlabs.webp" alt="Gamix Labs" className="w-4 h-4 object-contain rounded" />,
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
      accentBorder: 'border-emerald-500/30',
      accentBg: 'bg-emerald-950/10',
    },

    // 2. FREELANCE & CLIENT SYSTEMS (NaiBooking, GrowthHikes, Orealfit)
    {
      id: 'naibooking',
      company: 'NaiBooking',
      shortName: 'NaiBooking',
      category: 'freelance' as const,
      year: '2026',
      role: 'Software Engineer — High-Concurrency Booking Systems & Microservices',
      period: 'Aug 2026 – Present',
      location: 'Bangalore, India (Remote)',
      badge: 'Freelance & Client System',
      badgeColor: 'bg-sky-950/50 text-sky-300 border-sky-800/40',
      linkedinUrl: null,
      icon: <NaiBookingLogo className="w-4 h-4 text-sky-400" />,
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-sky-500/40 flex items-center justify-center p-2 shrink-0 text-sky-400 shadow-inner">
          <NaiBookingLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Architecting high-scale booking infrastructure and distributed scheduling microservices with low-latency event synchronization.',
        'Engineering fault-tolerant transaction ledgers, PostgreSQL advisory locking, and multi-tier Redis caching to handle high-frequency appointment spikes.',
        'Automated CI/CD deployment pipelines and cloud infrastructure observability across distributed remote service nodes.',
      ],
      techStack: ['TypeScript', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Microservices', 'REST APIs', 'CI/CD'],
      accentBorder: 'border-sky-500/30',
      accentBg: 'bg-sky-950/10',
    },
    {
      id: 'growthhikes',
      company: 'GrowthHikes',
      shortName: 'GrowthHikes',
      category: 'freelance' as const,
      year: '2026',
      role: 'Full Stack Engineer — Web Platform & Autonomous Marketing Pipelines',
      period: '2026 (Contract)',
      location: 'Remote',
      badge: 'Freelance & Client System',
      badgeColor: 'bg-sky-950/50 text-sky-300 border-sky-800/40',
      linkedinUrl: null,
      icon: <GrowthHikesLogo className="w-4 h-4 text-sky-400" />,
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-sky-500/40 flex items-center justify-center p-2.5 shrink-0 text-sky-400 shadow-inner">
          <GrowthHikesLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Engineered modern web platform and interactive client calculators deployed serverless to Cloudflare Workers with edge caching.',
        'Built automated agentic content workflows and scheduled marketing operations pipelines with real-time analytics aggregation.',
        'Delivered responsive, high-performance UI components with accessibility, instant client-side routing, and zero-runtime bundle bloat.',
      ],
      techStack: ['React', 'Next.js', 'Cloudflare Workers', 'Node.js', 'Python', 'Tailwind CSS'],
      accentBorder: 'border-sky-500/30',
      accentBg: 'bg-sky-950/10',
    },
    {
      id: 'orealfit',
      company: 'Orealfit',
      shortName: 'Orealfit',
      category: 'freelance' as const,
      year: '2026',
      role: 'Lead Software Engineer — Wellness Architecture & Autonomous Pipelines',
      period: 'May 2026 – Jul 2026',
      location: 'Gurugram, India',
      badge: 'Freelance & Client System',
      badgeColor: 'bg-sky-950/50 text-sky-300 border-sky-800/40',
      linkedinUrl: null,
      icon: <OrealfitLogo className="w-4 h-4 text-sky-400" />,
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-sky-500/40 flex items-center justify-center p-2.5 shrink-0 text-sky-400 shadow-inner">
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
      accentBorder: 'border-sky-500/30',
      accentBg: 'bg-sky-950/10',
    },

    // 3. PERSONAL OPEN-SOURCE & AUTONOMOUS RESEARCH (Mitochondria, Meeseeks)
    {
      id: 'quant-break',
      company: 'Mitochondria — Autonomous Quantitative Trading System',
      shortName: 'Mitochondria (Quant)',
      category: 'personal' as const,
      year: '2025–26',
      role: 'Quantitative Research, Algorithmic Execution & Low-Latency HFT',
      period: 'Dec 2025 – Apr 2026',
      location: 'Autonomous System & Research',
      badge: 'Personal System & Research',
      badgeColor: 'bg-purple-950/50 text-purple-300 border-purple-800/40',
      linkedinUrl: null,
      icon: <QuantTradingLogo className="w-4 h-4 text-purple-400" />,
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-purple-500/50 flex items-center justify-center p-2.5 shrink-0 text-purple-400 shadow-inner">
          <QuantTradingLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Dedicated quantitative deep-dive mastering Algorithmic Trading strategies, statistical arbitrage, and High-Frequency Trading (HFT) architectures.',
        'Formulated mathematical trading models and tick-level backtesting engines streaming real-time order-book telemetry via NATS JetStream.',
        'Engineered sub-millisecond in-memory ring buffers and MetaTrader 5 execution bridges with zero open database ports on private VPCs.',
        'Developed invariant-based risk safeguards: dynamic position sizing, trailing circuit breakers, and automated drawdown enforcement.',
      ],
      techStack: ['Quantitative Research', 'Algorithmic Trading', 'HFT Systems', 'MetaTrader 5', 'Python', 'C++', 'Go', 'NATS JetStream'],
      accentBorder: 'border-purple-500/40',
      accentBg: 'bg-purple-950/20',
    },
    {
      id: 'ai-break',
      company: 'Meeseeks — Autonomous Multi-Agent AI Framework',
      shortName: 'Meeseeks (AI Swarms)',
      category: 'personal' as const,
      year: '2024',
      role: 'Autonomous AI Agents, Multi-Agent Swarms & AST Context Compression',
      period: 'Apr 2024 – Jun 2024',
      location: 'Autonomous System & Research',
      badge: 'Personal System & Research',
      badgeColor: 'bg-purple-950/50 text-purple-300 border-purple-800/40',
      linkedinUrl: null,
      icon: <AIAgentLogo className="w-4 h-4 text-purple-400" />,
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-purple-500/50 flex items-center justify-center p-2.5 shrink-0 text-purple-400 shadow-inner">
          <AIAgentLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Researched and built AST context compression algorithms reducing LLM context window consumption by ~71.4% with dynamic prompt caching.',
        'Implemented secure Docker sandbox execution runtimes for autonomous coding agents with deterministic verification loops.',
        'Designed hybrid agentic RAG retrieval architectures, hierarchical vector indexing strategies, and automated decision verification loops.',
      ],
      techStack: ['Autonomous AI Agents', 'Multi-Agent Swarms', 'AST Code Parsing', 'Vector Embeddings', 'LLM Orchestration', 'Python', 'Docker'],
      accentBorder: 'border-purple-500/40',
      accentBg: 'bg-purple-950/20',
    },
  ];

  const filteredExperience = experienceCategory === 'all'
    ? experienceList
    : experienceList.filter((item) => item.category === experienceCategory);

  const activeJob = filteredExperience[activeJobIndex] || filteredExperience[0] || experienceList[0];

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

        {/* Modern Clean Action Hub */}
        <div className="flex flex-col gap-3.5 pt-2">
          {/* Tier 1: Core Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-white active:scale-[0.98] text-zinc-950 font-medium text-sm transition-all shadow-md cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>1-Page Resume (PDF)</span>
            </a>

            <a
              href="/Sahil-Rathee-Resume-Full.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900/90 hover:bg-zinc-800 active:scale-[0.98] border border-zinc-700/80 hover:border-zinc-500 text-zinc-200 font-medium text-sm transition-all cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Full Detailed Resume</span>
            </a>

            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 active:scale-[0.98] border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-medium text-sm transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Email</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 active:scale-[0.98] border border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono transition-all cursor-pointer"
              title="Copy email to clipboard"
            >
              {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedEmail ? 'Copied' : email}</span>
            </button>

            <Link
              to="/verify?token=verified"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 text-xs font-mono transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Track Record</span>
            </Link>
          </div>

          {/* Tier 2: Public Verified Profiles */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-zinc-400 font-mono">
            <span className="text-zinc-500 mr-1 text-[11px] uppercase tracking-wider">Profiles:</span>
            <a
              href="https://github.com/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all active:scale-[0.97]"
              title="GitHub Profile"
            >
              <GitHubLogo className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-[#0A66C2] transition-all active:scale-[0.97]"
              title="LinkedIn Profile"
            >
              <LinkedInLogo className="w-3.5 h-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href="https://x.com/rttss_sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-all active:scale-[0.97]"
              title="X Profile"
            >
              <XLogo className="w-3 h-3" />
              <span>X</span>
            </a>

            <a
              href="https://leetcode.com/u/rttss-sahil/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-[#FFA116] transition-all active:scale-[0.97]"
              title="LeetCode Profile"
            >
              <LeetCodeLogo className="w-3.5 h-3.5" />
              <span>LeetCode</span>
            </a>

            <a
              href="https://stackoverflow.com/users/14934835/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-[#F48024] transition-all active:scale-[0.97]"
              title="Stack Overflow Profile"
            >
              <StackOverflowLogo className="w-3.5 h-3.5" />
              <span>Stack Overflow</span>
            </a>
          </div>
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

      {/* 3. VERIFIED EXPERIENCE & SYSTEMS TRACK RECORD */}
      <section id="experience" className="flex flex-col gap-6 scroll-mt-24">
        {/* Section Header with Category Filter and View Mode Switcher */}
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
                Engineering Experience
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Work History & Systems Track Record
              </h2>
            </div>

            {/* View Mode Switcher */}
            <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setTimelineViewMode('stage')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timelineViewMode === 'stage'
                    ? 'bg-zinc-800 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Interactive Stage
              </button>
              <button
                type="button"
                onClick={() => setTimelineViewMode('list')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timelineViewMode === 'list'
                    ? 'bg-zinc-800 text-white font-medium shadow-sm'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                View All ({filteredExperience.length})
              </button>
            </div>
          </div>

          {/* Category Tabs: Full-Time vs Freelance vs Personal Systems */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {[
              { id: 'all', label: 'All Track Record', count: experienceList.length },
              { id: 'fulltime', label: 'Full-Time Positions', count: experienceList.filter(e => e.category === 'fulltime').length },
              { id: 'freelance', label: 'Freelance & Client Systems', count: experienceList.filter(e => e.category === 'freelance').length },
              { id: 'personal', label: 'Personal Systems & Research', count: experienceList.filter(e => e.category === 'personal').length },
            ].map((tab) => {
              const isSelected = experienceCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setExperienceCategory(tab.id as any);
                    setActiveJobIndex(0);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'border-emerald-500/60 bg-emerald-950/40 text-emerald-300 font-semibold shadow-sm'
                      : 'border-zinc-800/80 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded text-[10px] ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-200' : 'bg-zinc-800 text-zinc-500'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Strict separation between commercial full-time roles (GymWise, BigHit, Gamix Labs), client freelance systems (NaiBooking, GrowthHikes, Orealfit), and personal autonomous systems (Mitochondria, Meeseeks).
          </p>
        </div>

        {/* MODE 1: INTERACTIVE STAGE */}
        {timelineViewMode === 'stage' ? (
          <div className="flex flex-col gap-5">
            {/* Horizontal Milestone Pill Scrubber */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
              {filteredExperience.map((job, idx) => {
                const isActive = activeJobIndex === idx;
                return (
                  <button
                    key={job.id}
                    type="button"
                    onClick={() => setActiveJobIndex(idx)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all shrink-0 cursor-pointer ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-950/40 text-white font-semibold shadow-md ring-1 ring-emerald-500/30'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
                    }`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {job.icon}
                    </div>
                    <span className="font-display font-medium text-xs whitespace-nowrap">{job.shortName}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">{job.year}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Job Stage Card */}
            <div
              key={activeJob.id}
              className={`p-6 sm:p-8 rounded-2xl border ${activeJob.accentBorder} ${activeJob.accentBg} flex flex-col gap-6 shadow-xl backdrop-blur-sm transition-all duration-300 ease-out`}
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-800/80 pb-5">
                <div className="flex items-start gap-3.5">
                  <div className="shrink-0">{activeJob.logo}</div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                        {activeJob.company}
                      </h3>
                      {activeJob.badge && (
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${activeJob.badgeColor}`}>
                          {activeJob.badge}
                        </span>
                      )}
                      {activeJob.linkedinUrl && (
                        <a
                          href={activeJob.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#70b5f9] hover:text-white text-[11px] font-mono transition-all"
                          title={`View ${activeJob.company} on LinkedIn`}
                        >
                          <LinkedInLogo className="w-3 h-3" />
                          <span>LinkedIn ↗</span>
                        </a>
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
              <div className="flex flex-col gap-2.5">
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

              {/* Bottom Navigation Scrubber */}
              <div className="pt-2 flex items-center justify-between gap-4 text-xs font-mono text-zinc-500 border-t border-zinc-800/60">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-300 font-semibold">{activeJob.shortName}</span>
                  <span>•</span>
                  <span>
                    Milestone {activeJobIndex + 1} of {filteredExperience.length}
                  </span>
                </div>
                <div className="flex-1 max-w-[120px] sm:max-w-[180px] bg-zinc-900 h-1.5 rounded-full overflow-hidden border border-zinc-800">
                  <div
                    className="bg-emerald-400 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${((activeJobIndex + 1) / filteredExperience.length) * 100}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveJobIndex((prev) => (prev > 0 ? prev - 1 : filteredExperience.length - 1))}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  >
                    ← Prev
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveJobIndex((prev) => (prev < filteredExperience.length - 1 ? prev + 1 : 0))}
                    className="px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors cursor-pointer"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* MODE 2: FULL CONTINUOUS TIMELINE LIST */
          <div className="flex flex-col gap-6">
            {filteredExperience.map((job) => (
              <div
                key={job.id}
                className={`p-6 sm:p-8 rounded-2xl border ${job.accentBorder} ${job.accentBg} flex flex-col gap-5`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-zinc-800/80 pb-4">
                  <div className="flex items-start gap-3.5">
                    <div className="shrink-0">{job.logo}</div>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                          {job.company}
                        </h3>
                        {job.badge && (
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${job.badgeColor}`}>
                            {job.badge}
                          </span>
                        )}
                        {job.linkedinUrl && (
                          <a
                            href={job.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 text-[#70b5f9] hover:text-white text-[11px] font-mono transition-all"
                            title={`View ${job.company} on LinkedIn`}
                          >
                            <LinkedInLogo className="w-3 h-3" />
                            <span>LinkedIn ↗</span>
                          </a>
                        )}
                      </div>
                      <span className="text-sm font-medium text-emerald-400">
                        {job.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex sm:flex-col sm:items-end gap-1.5 text-xs font-mono text-zinc-400 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{job.period}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="text-sm text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
                  {job.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/60">
                  {job.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono text-zinc-400 bg-zinc-950/60 border border-zinc-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. TECHNICAL RADAR & STACK WITH 4-TRACK SCROLLING MARQUEE */}
      <section id="radar" className="flex flex-col gap-6 scroll-mt-24">
        <div className="flex flex-col gap-1 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Live Architecture &amp; Competency Radar
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Technical Stack &amp; Architecture Radar
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
            Continuous architecture telemetry across core runtimes, multi-cloud container orchestration, sub-millisecond streaming buses, and vector databases. Hover over any technology to inspect capabilities.
          </p>
        </div>

        {/* 4-Track Alternating Infinite Scrolling Marquee */}
        <TechRadarMarquee />
      </section>

      {/* 5. CONTACT & COLLABORATION COMMAND CENTER */}
      <section className="relative overflow-hidden p-8 sm:p-12 rounded-3xl border border-zinc-800/90 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-black shadow-2xl flex flex-col gap-8">
        
        {/* Ambient Radial Mesh Glows */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Status & SLA Bar */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available for Staff, Principal &amp; Senior Systems Roles</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Response SLA: Under 2 Hours</span>
          </div>
        </div>

        {/* Hero Headline & Value Pitch */}
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-[1.1]">
              Let's build something <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">exceptional</span>.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Open to high-impact distributed systems, real-time quant execution engines, cloud-native backend infrastructure, and autonomous agent orchestration.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-zinc-100 active:scale-[0.98] text-zinc-950 font-bold text-sm transition-all shadow-xl shadow-white/10 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-zinc-950" />
              <span>Send an Email</span>
            </a>

            <a
              href="https://linkedin.com/in/rttss-sahil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#0a66c2] hover:bg-[#004182] active:scale-[0.98] text-white font-semibold text-sm transition-all shadow-lg shadow-blue-950/40 cursor-pointer"
            >
              <LinkedInLogo className="w-4 h-4 fill-current" />
              <span>Check Sahil on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText('sahil.artits.rathee@gmail.com');
                setCopiedEmail(true);
                setTimeout(() => setCopiedEmail(false), 2000);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs transition-colors cursor-pointer"
              title="Copy direct email address"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
              <span>{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
            </button>
          </div>
        </div>

        {/* 4 Architectural Metric Chips */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-zinc-500">Commercial Tenure</span>
            <span className="text-xl font-bold font-mono text-white">4+ Years</span>
            <span className="text-[11px] text-zinc-400">High-concurrency systems</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-zinc-500">Verified BGV Remuneration</span>
            <span className="text-xl font-bold font-mono text-emerald-400">₹20.51 Lakhs</span>
            <span className="text-[11px] text-zinc-400">38 Bank verified salary credits</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-zinc-500">GymWise Lead Architect</span>
            <span className="text-xl font-bold font-mono text-sky-400">17 Credits</span>
            <span className="text-[11px] text-zinc-400">Jul 2024 &ndash; Nov 2025</span>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col gap-1">
            <span className="text-[11px] font-mono uppercase text-zinc-500">Cloud &amp; Infrastructure</span>
            <span className="text-xl font-bold font-mono text-purple-400">Multi-Cloud</span>
            <span className="text-[11px] text-zinc-400">AWS &bull; Cloudflare &bull; GCP</span>
          </div>
        </div>

        {/* Resume Download Links & Geo Coordinates */}
        <div className="relative pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-zinc-500">Official Downloads:</span>
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span>1-Page Resume (PDF)</span>
            </a>
            <a
              href="/Sahil-Rathee-Resume-Full.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Detailed CV (PDF)</span>
            </a>
          </div>

          <div className="flex items-center gap-3 text-zinc-500">
            <span>New Delhi, India</span>
            <span>&bull;</span>
            <span className="text-zinc-300">Open for Remote Worldwide</span>
          </div>
        </div>

      </section>
    </div>
  );
};
