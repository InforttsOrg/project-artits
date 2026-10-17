import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projectsData';
import { ArrowLeft, ArrowRight, Terminal, CheckCircle2, ShieldAlert, Cpu, ExternalLink, Download, Mail } from 'lucide-react';

interface ProjectCaseStudyViewProps {
  onOpenPhoneCall?: () => void;
}

export const ProjectCaseStudyView: React.FC<ProjectCaseStudyViewProps> = () => {
  const { slug } = useParams<{ slug: string }>();
  const [simActive, setSimActive] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string>('System idle. Click "Run Verification Benchmark" to simulate production workload.');

  const project = slug ? PROJECTS_DATA[slug] : null;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const runSimulation = () => {
    setSimActive(true);
    setSimOutput(`[INITIALIZING] Running system verification benchmark for ${project.title}...`);

    setTimeout(() => {
      if (project.id === 'zenith' || project.id === 'mitochondria') {
        setSimOutput(`[SYSTEM OK] Containerized MT5 engine active • Internal NATS messaging verified • Pre-trade risk policy passed (drawdown: OK, max lot: OK) • Order processed in 0.68ms • Private network isolation active (0 public DB ports).`);
      } else if (project.id === 'meeseeks') {
        setSimOutput(`[ORCHESTRATOR OK] Task graph generated (4 subagents) • AST context pruning applied (-71.4% tokens) • Docker sandbox static analysis & tests passed • Zero-regression PR generated.`);
      } else if (project.id === 'roost') {
        setSimOutput(`[LEDGER ENGINE OK] Idempotency key verified • Balanced entry (Debit: Rent_Clearing -> Credit: Escrow_Hold) • Advisory lock released • PostgreSQL transaction committed in 2.1ms.`);
      } else {
        setSimOutput(`[KUBERNETES EKS OK] Traffic spike absorbed via KEDA autoscaling (5 pods -> 18 pods) • OpenSearch talent query completed in 14ms • Zero downtime verified.`);
      }
      setSimActive(false);
    }, 600);
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col gap-16">
      {/* 1. TOP BREADCRUMB */}
      <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Case Studies</span>
        </Link>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-500 uppercase">PROJECT {project.number} OF 04</span>
      </nav>

      {/* 2. HERO HEADER */}
      <header className="flex flex-col gap-6 border-b border-zinc-800 pb-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium tracking-wide bg-zinc-900 border border-zinc-800 text-emerald-400">
            {project.category}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          {project.title}
        </h1>

        <p className="text-lg sm:text-xl text-zinc-300 font-medium leading-relaxed">
          "{project.hookQuestion}"
        </p>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col gap-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase">Role</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-200">{project.role}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col gap-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase">Timeline</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-200">{project.timeline}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col gap-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase">Organization</span>
            <span className="text-xs sm:text-sm font-medium text-zinc-200">{project.organization}</span>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex flex-col gap-1">
            <span className="text-[11px] font-mono text-zinc-500 uppercase">Core Benchmark</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-emerald-400">{project.keyMetric}</span>
          </div>
        </div>
      </header>

      {/* 3. EXECUTIVE SUMMARY & TECH STACK */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-xl text-white tracking-tight flex items-center gap-2">
          <span>01. Executive Overview</span>
        </h2>
        <p className="text-base text-zinc-300 leading-relaxed">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md text-xs font-mono text-zinc-300 bg-zinc-900 border border-zinc-800"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 4. THE TECHNICAL CHALLENGE & CONSTRAINTS */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-xl text-white tracking-tight">
          02. The Engineering Challenge & Bottlenecks
        </h2>
        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 flex flex-col gap-4">
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            <strong className="text-white">Context: </strong> {project.challenge.context}
          </p>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            <strong className="text-white">Critical Bottleneck: </strong> {project.challenge.bottleneck}
          </p>

          <div className="mt-2 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex flex-col gap-2.5">
            <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" />
              Why Standard Commercial Setups Failed:
            </span>
            <ul className="text-xs sm:text-sm text-zinc-400 space-y-1.5 list-disc list-inside">
              {project.challenge.whyExistingFailed.map((reason, idx) => (
                <li key={idx} className="leading-relaxed">{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURAL BREAKDOWN */}
      <section className="flex flex-col gap-6">
        <h2 className="font-display font-bold text-xl text-white tracking-tight">
          03. System Architecture & Decisions
        </h2>
        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
          {project.architecture.overview}
        </p>

        <div className="grid grid-cols-1 gap-4 pt-2">
          {project.architecture.steps.map((step, idx) => (
            <div
              key={step.title}
              className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-emerald-400 shrink-0">
                0{idx + 1}
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-display font-bold text-base text-white">
                    {step.title}
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-500 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800">
                    {step.tech}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE HARNESS BENCHMARK */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display font-bold text-xl text-white tracking-tight">
          04. Interactive Invariant Verification
        </h2>
        <p className="text-sm text-zinc-400">
          Simulate production telemetry and verify that latency, invariants, and network isolations hold under load:
        </p>

        <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-xs shadow-xl">
          <div className="px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 flex items-center justify-between">
            <span className="text-zinc-400 text-[11px] flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              BENCHMARK_RUNNER // {project.title.toUpperCase()}
            </span>
            <button
              onClick={runSimulation}
              disabled={simActive}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono transition-colors disabled:opacity-50 cursor-pointer"
            >
              {simActive ? 'RUNNING TEST...' : '▶ RUN BENCHMARK'}
            </button>
          </div>
          <div className="p-4 text-emerald-400/90 leading-relaxed min-h-[70px] flex items-start gap-2">
            <span className="text-zinc-500 select-none">&gt;</span>
            <span className="font-mono text-xs">{simOutput}</span>
          </div>
        </div>
      </section>

      {/* 7. QUANTIFIED IMPACT METRICS */}
      <section className="flex flex-col gap-5">
        <h2 className="font-display font-bold text-xl text-white tracking-tight">
          05. Quantified Engineering & Business Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="p-5 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col gap-1.5"
            >
              <span className="font-mono text-2xl font-bold text-white tracking-tight">
                {m.value}
              </span>
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wide">
                {m.label}
              </span>
              <span className="text-xs text-zinc-500 leading-relaxed pt-1">
                {m.detail}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEXT / PREV NAVIGATION */}
      <footer className="pt-8 border-t border-zinc-800 flex flex-col gap-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            to={`/work/${project.prevProject.slug}`}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev: {project.prevProject.title}</span>
          </Link>

          <Link
            to={`/work/${project.nextProject.slug}`}
            className="flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          >
            <span>Next: {project.nextProject.title}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Contact CTA */}
        <div className="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-display font-bold text-lg text-white">
              Interested in this architecture?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Sahil is available for Senior / Staff Backend & Infrastructure roles.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="mailto:sahil.artits.rathee@gmail.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-medium text-xs transition-colors cursor-pointer"
            >
              <Mail className="w-3.5 h-3.5" />
              Email Sahil
            </a>
            <a
              href="/Sahil-Rathee-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-medium text-xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Resume PDF
            </a>
          </div>
        </div>
      </footer>
    </article>
  );
};
