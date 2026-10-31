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
import { TechSkillBadge } from './TechSkillBadge';

export const ArchitectPortfolioView: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [experienceCategory, setExperienceCategory] = useState<'fulltime' | 'freelance' | 'personal' | 'all'>('fulltime');

  const email = 'sahil.artits.rathee@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCategoryFilter = (catId: 'fulltime' | 'freelance' | 'personal' | 'all') => {
    const currentScrollY = window.scrollY;
    setExperienceCategory(catId);
    requestAnimationFrame(() => {
      window.scrollTo({ top: currentScrollY, behavior: 'instant' as any });
    });
  };

  const experienceList = [
    // 1. FREELANCE & CLIENT SYSTEMS (2026)
    {
      id: 'naibooking',
      company: 'NaiBooking',
      shortName: 'NaiBooking',
      category: 'freelance' as const,
      isCareerBreak: false,
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
      id: 'orealfit',
      company: 'Orealfit',
      shortName: 'Orealfit',
      category: 'freelance' as const,
      isCareerBreak: false,
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
    {
      id: 'growthhikes',
      company: 'GrowthHikes',
      shortName: 'GrowthHikes',
      category: 'freelance' as const,
      isCareerBreak: false,
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

    // 2. PERSONAL SYSTEMS & PLATFORMS (Started in 2026)
    {
      id: 'meeseeks',
      company: 'Meeseeks — Autonomous Multi-Agent AI Platform',
      shortName: 'Meeseeks',
      category: 'personal' as const,
      isCareerBreak: false,
      year: '2026',
      role: 'Founder & Lead Architect — Autonomous Multi-Agent AI Framework',
      period: '2026 – Present',
      location: 'Autonomous Platform • meeseeks.infortts.site',
      badge: 'Personal System • AI Swarms',
      badgeColor: 'bg-purple-950/50 text-purple-300 border-purple-800/40',
      linkedinUrl: null,
      icon: <AIAgentLogo className="w-4 h-4 text-purple-400" />,
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-purple-500/40 flex items-center justify-center p-2.5 shrink-0 text-purple-400 shadow-inner">
          <AIAgentLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Built an autonomous multi-agent orchestration framework in Python and Go supporting tool-calling supervisor loops, vector-backed shared memory, and deterministic self-healing routines.',
        'Implemented AST-based context compression algorithms reducing LLM context window consumption by ~71.4% with dynamic prompt caching.',
        'Engineered secure Docker sandbox execution runtimes for autonomous coding agents with automated decision verification loops.',
        'Designed hybrid agentic RAG retrieval architectures and hierarchical vector indexing for long-horizon task persistence.',
      ],
      techStack: ['Autonomous AI Agents', 'Multi-Agent Swarms', 'Python', 'Go', 'Docker', 'AST Parsing', 'Vector Embeddings', 'LLM Orchestration'],
      accentBorder: 'border-purple-500/30',
      accentBg: 'bg-purple-950/10',
    },
    {
      id: 'mitochondria',
      company: 'Mitochondria — Autonomous Quantitative Trading System',
      shortName: 'Mitochondria',
      category: 'personal' as const,
      isCareerBreak: false,
      year: '2026',
      role: 'Lead Architect — Quantitative Telemetry & Execution Engine',
      period: '2026 – Present',
      location: 'Quantitative Research & Execution Engine',
      badge: 'Personal System • Quant Engine',
      badgeColor: 'bg-purple-950/50 text-purple-300 border-purple-800/40',
      linkedinUrl: null,
      icon: <QuantTradingLogo className="w-4 h-4 text-purple-400" />,
      logo: (
        <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-purple-500/40 flex items-center justify-center p-2.5 shrink-0 text-purple-400 shadow-inner">
          <QuantTradingLogo className="w-7 h-7" />
        </div>
      ),
      highlights: [
        'Architected tick-level market data streaming and simulation backtesting pipelines in Go and Python with sub-millisecond execution latency.',
        'Formulated mathematical trading models and real-time order-book telemetry streaming via NATS JetStream and in-memory ring buffers.',
        'Engineered sub-millisecond MetaTrader 5 execution bridge with zero open database ports on private isolated VPC container networks.',
        'Developed invariant-based risk safeguards: dynamic position sizing, trailing circuit breakers, and programmatic drawdown enforcement.',
      ],
      techStack: ['Quantitative Systems', 'Algorithmic Trading', 'Go', 'Python', 'C++', 'NATS JetStream', 'MetaTrader 5', 'HFT Systems'],
      accentBorder: 'border-purple-500/30',
      accentBg: 'bg-purple-950/10',
    },

    // 3. CAREER BREAK: Professional Development & Technical Upskilling (Dec 2025 – Present)
    {
      id: 'career-break-2025',
      company: 'Career Break',
      shortName: 'Career Break',
      category: 'fulltime' as const,
      isCareerBreak: true,
      year: '2025–26',
      role: 'Professional Development, Continuous Technical Upskilling & Systems Research',
      period: 'Dec 2025 – Present',
      location: 'New Delhi, India',
      badge: 'Career Break • Professional Development',
      badgeColor: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
      linkedinUrl: null,
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      logo: null,
      highlights: [
        'Dedicated period of intentional professional development, deep-dive learning, and mastering emerging software engineering architectures across multiple technical domains.',
        'Deepened theoretical and practical expertise across distributed systems primitives, memory management, high-concurrency Go and Python runtimes, and Linux kernel internals.',
        'Researched modern AI engineering paradigms: autonomous agent orchestration loops, AST code parsing, prompt caching, hierarchical vector indexing, and RAG retrieval.',
        'Researched quantitative finance architectures, tick data streaming engines, low-latency messaging with NATS JetStream, and algorithmic execution models.',
        'Studied cloud infrastructure automation, zero-trust network topologies, Kubernetes container orchestration, and compiler fundamentals through hands-on technical experiments.',
      ],
      techStack: ['Distributed Systems', 'Go', 'Python', 'Linux Internals', 'Concurrency', 'Agentic AI', 'Vector DBs', 'Kubernetes', 'System Design'],
      accentBorder: 'border-zinc-700/60',
      accentBg: 'bg-zinc-900/30',
    },

    // 4. FULL-TIME CORPORATE ROLE: GymWise (Jul 2024 – Nov 2025)
    {
      id: 'gymwise',
      company: 'GymWise India Private Limited',
      shortName: 'GymWise',
      category: 'fulltime' as const,
      isCareerBreak: false,
      year: '2024–25',
      role: 'Solution Architect & Lead Full Stack Engineer',
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
        'Singlehandedly re-engineered and rewrote the legacy PHP/Laravel backend and Kotlin native mobile application into unified cross-platform Flutter/Dart (Web + Mobile App) and high-concurrency Golang microservices.',
        'Engineered ultra-fast web page loads and architected a vectorized WebSocket API delivering sub-millisecond real-time event streaming and state synchronization across 300+ gyms.',
        'Established full-stack observability and centralized logging using Grafana, Loki, and Prometheus with automated latency alarms.',
        'Architected automated marketing workflows, customer journey automation, and CRM telemetry pipelines powered by self-hosted n8n.',
        'Spearheaded container orchestration and distributed systems reliability across multi-region deployments (India, Australia, Singapore).',
      ],
      techStack: [
        'Flutter / Dart',
        'Golang Microservices',
        'WebSockets',
        'Kubernetes',
        'Grafana',
        'Prometheus',
        'Loki',
        'n8n Workflows',
        'PHP / Laravel',
        'Kotlin',
        'Distributed Systems'
      ],
      accentBorder: 'border-emerald-500/30',
      accentBg: 'bg-emerald-950/10',
    },

    // 5. CAREER BREAK: Self-Directed Learning & Research (Apr 2024 – Jun 2024)
    {
      id: 'career-break-2024',
      company: 'Career Break',
      shortName: 'Career Break',
      category: 'fulltime' as const,
      isCareerBreak: true,
      year: '2024',
      role: 'Self-Directed Upskilling, System Design & Technical Exploration',
      period: 'Apr 2024 – Jun 2024',
      location: 'New Delhi, India',
      badge: 'Career Break • Professional Development',
      badgeColor: 'bg-zinc-800/80 text-zinc-300 border-zinc-700/60',
      linkedinUrl: null,
      icon: <Terminal className="w-4 h-4 text-emerald-400" />,
      logo: null,
      highlights: [
        'Self-directed study focusing on large-scale distributed architectures, mobile cross-platform performance (Flutter/Dart), and Go backend design patterns.',
        'Strengthened core competencies in cloud containerization (Docker, Kubernetes) and microservices before leading the rewrite at GymWise.',
      ],
      techStack: ['Go', 'Flutter / Dart', 'Distributed Systems', 'Docker', 'Kubernetes', 'System Design'],
      accentBorder: 'border-zinc-700/60',
      accentBg: 'bg-zinc-900/30',
    },

    // 6. FULL-TIME CORPORATE ROLE: BigHit (Nov 2022 – Mar 2024)
    {
      id: 'bighit',
      company: 'BigHit Pvt Ltd',
      shortName: 'BigHit',
      category: 'fulltime' as const,
      isCareerBreak: false,
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
        'Helped lead complete cloud migration from legacy Node.js monolith to event-driven Go Serverless on AWS, substantially reducing cloud infrastructure costs while improving server efficiency and runtime performance.',
        'Migrated the production mobile application from React Native to high-performance Flutter/Dart, delivering an ~80% reduction in bundle size and fluid 60fps native performance.',
        'Engineered real-time GIS spatial tracking and in-app feed updates utilizing OpenStreetMap, Google Maps API, and custom vector tiling engines.',
        'Integrated AWS infrastructure pipelines including Amazon Neptune graph database, AWS DynamoDB, OpenSearch clusters, k3s/Kubernetes, and AWS CodePipeline CI/CD.',
      ],
      techStack: [
        'Go Serverless',
        'Flutter / Dart',
        'AWS Serverless',
        'GIS & Vector Tiling',
        'OpenStreetMap',
        'Google Maps API',
        'React Native',
        'Node.js',
        'AWS DynamoDB',
        'AWS Neptune',
        'k3s',
        'AWS CodePipeline'
      ],
      accentBorder: 'border-emerald-500/30',
      accentBg: 'bg-emerald-950/10',
    },

    // 7. FULL-TIME CORPORATE ROLE: Gamix Labs (Mar 2022 – Oct 2022)
    {
      id: 'gamixlabs',
      company: 'Gamix Labs Private Limited',
      shortName: 'Gamix Labs',
      category: 'fulltime' as const,
      isCareerBreak: false,
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
      techStack: ['Angular', 'React', 'Node.js', 'RabbitMQ', 'Redis', 'Postman', 'Kubernetes', 'Docker', 'k3s'],
      accentBorder: 'border-emerald-500/30',
      accentBg: 'bg-emerald-950/10',
    },
  ];

  const filteredExperience = experienceCategory === 'fulltime'
    ? experienceList.filter((item) => item.category === 'fulltime' || item.isCareerBreak)
    : experienceCategory === 'all'
    ? experienceList
    : experienceList.filter((item) => item.category === experienceCategory);

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
              Architecting resilient distributed systems, sub-millisecond event streaming engines, and autonomous agentic AI runtimes with Go, Python, and Kubernetes.
              Engineered high-throughput cloud backends, zero-trust container networks, and mission-critical execution architectures across{' '}
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
              to="/verify"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 text-xs font-mono transition-all cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>HR Verification</span>
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

      {/* 2. VERIFIED EXPERIENCE & SYSTEMS TRACK RECORD */}
      <section id="experience" className="flex flex-col gap-6 scroll-mt-24">
        {/* Section Header with Category Filter and View Mode Switcher */}
        <div className="flex flex-col gap-4 border-b border-zinc-800 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-medium">
                Experience
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                Work Experience
              </h2>
            </div>
          </div>

          {/* Category Tabs: Full-Time (Default), Freelance, Personal, All */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {[
              { id: 'fulltime', label: 'Full-Time', count: experienceList.filter(e => e.category === 'fulltime' || e.isCareerBreak).length },
              { id: 'freelance', label: 'Freelance', count: experienceList.filter(e => e.category === 'freelance').length },
              { id: 'personal', label: 'Personal', count: experienceList.filter(e => e.category === 'personal').length },
              { id: 'all', label: 'All', count: experienceList.length },
            ].map((tab) => {
              const isSelected = experienceCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleCategoryFilter(tab.id as any)}
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
            Strict separation between commercial full-time roles (GymWise, BigHit, Gamix Labs) with career breaks, client freelance systems (NaiBooking, GrowthHikes, Orealfit), and personal platforms (Meeseeks, Mitochondria).
          </p>
        </div>

        {/* FULL CONTINUOUS TIMELINE LIST */}
        <div className="flex flex-col gap-6">
            {filteredExperience.map((job) => {
              const isCareerBreak = !!job.isCareerBreak;

              if (isCareerBreak) {
                return (
                  <div
                    key={job.id}
                    className="p-4 sm:p-5 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 hover:bg-zinc-950/70 hover:border-zinc-700/80 hover:shadow-xl hover:shadow-emerald-950/10 hover:-translate-y-0.5 transition-all duration-300 flex flex-col gap-3.5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-zinc-800/60 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-700/60 flex items-center justify-center shrink-0 text-emerald-400 shadow-inner">
                          {job.icon}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display font-bold text-base text-white">
                              {job.company}
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono border bg-zinc-800/80 text-zinc-300 border-zinc-700/60">
                              {job.badge}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-emerald-400">
                            {job.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 shrink-0 self-start sm:self-center">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                        <span>{job.period}</span>
                      </div>
                    </div>

                    <ul className="text-xs text-zinc-300 space-y-1.5 list-disc list-inside leading-relaxed">
                      {job.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-800/50">
                      {job.techStack.map((tech) => (
                        <TechSkillBadge key={tech} name={tech} />
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={job.id}
                  className={`p-6 sm:p-8 rounded-2xl border ${job.accentBorder} ${job.accentBg} flex flex-col gap-5 hover:shadow-2xl hover:shadow-emerald-950/20 hover:border-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300`}
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

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800/60">
                    {job.techStack.map((tech) => (
                      <TechSkillBadge key={tech} name={tech} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
      </section>

      {/* 3. TECHNICAL STACK WITH 100% WIDTH MARQUEE */}
      <section id="radar" className="flex flex-col gap-6 scroll-mt-24">
        <div className="flex flex-col gap-1 border-b border-zinc-800 pb-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Core Stack
            </span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
            Technical Stack
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
            Continuous architecture telemetry across core runtimes, multi-cloud container orchestration, sub-millisecond streaming buses, and vector databases. Hover over any technology to inspect capabilities.
          </p>
        </div>

        {/* 100% Full Viewport Width Marquee */}
        <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-2">
          <TechRadarMarquee />
        </div>
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

          <Link
            to="/verify"
            className="p-4 rounded-2xl bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col gap-1 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-zinc-500">BGV Remuneration</span>
              <span className="text-[10px] font-mono text-emerald-400/80 group-hover:text-emerald-400">VERIFY &rarr;</span>
            </div>
            <span className="text-xl font-bold font-mono text-emerald-400 tracking-tight">&#8377;&bull;&bull;,&bull;&bull;,&bull;&bull;&bull;</span>
            <span className="text-[11px] text-zinc-400">38 Credits &bull; Recruiter Locked</span>
          </Link>

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
