import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projectsData';

interface ProjectCaseStudyViewProps {
  onOpenPhoneCall: () => void;
}

export const ProjectCaseStudyView: React.FC<ProjectCaseStudyViewProps> = ({ onOpenPhoneCall }) => {
  const { slug } = useParams<{ slug: string }>();
  const [simActive, setSimActive] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string>('Ready for simulation test.');

  const project = slug ? PROJECTS_DATA[slug] : null;

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const runSimulation = () => {
    setSimActive(true);
    setSimOutput(`[INIT] Booting isolated test environment for ${project.title}...`);

    setTimeout(() => {
      if (project.id === 'zenith' || project.id === 'mitochondria') {
        setSimOutput(`[ZENITH CLUSTER] Sandboxed MT5 Wine Oracle active • Charnia NATS db.query RPC verified • Per-account equity floor check PASSED • Order executed in <0.7ms • Zero exposed DB ports!`);
      } else if (project.id === 'meeseeks') {
        setSimOutput(`[SUPERVISOR] Task graph generated (4 subagents) • AST diff pruning applied (-71.4% tokens) • Playwright headless check passed • Master verified!`);
      } else if (project.id === 'roost') {
        setSimOutput(`[GO ENGINE] Escrow lease acquired • Debit: $15,000 -> Credit: Escrow_Hold • Double-entry check verified • PostgreSQL transaction committed in 2.1ms!`);
      } else {
        setSimOutput(`[K8S] EKS cluster received canary traffic: 5% -> 25% -> 100% • 85MB alpine image pulled in 1.4s • Zero downtime rollout confirmed!`);
      }
      setSimActive(false);
    }, 700);
  };

  return (
    <article className="case-study-page">
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
      <nav className="case-study-breadcrumb" aria-label="Breadcrumb">
        <Link to="/" className="breadcrumb-back-link">
          ← All Work
        </Link>
        <span className="breadcrumb-separator">•</span>
        <span className="breadcrumb-current-index">PROJECT {project.number} / 04</span>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="case-study-hero">
        <div className="hero-category-badge">{project.category}</div>
        <h1 className="hero-title">{project.title}</h1>
        <p className="hero-hook-question">"{project.hookQuestion}"</p>

        {/* Shelby Kho-style Metadata Strip */}
        <div className="hero-metadata-grid">
          <div className="meta-box">
            <span className="meta-k">Role</span>
            <span className="meta-v">{project.role}</span>
          </div>
          <div className="meta-box">
            <span className="meta-k">Timeline</span>
            <span className="meta-v">{project.timeline}</span>
          </div>
          <div className="meta-box">
            <span className="meta-k">Organization</span>
            {project.companyUrl ? (
              <a
                href={project.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-v-company-link"
              >
                {project.companyLogo && (
                  <img src={project.companyLogo} alt={project.organization} className="meta-v-company-logo" />
                )}
                <span>{project.organization} ↗</span>
              </a>
            ) : (
              <span className="meta-v">{project.organization}</span>
            )}
          </div>
          <div className="meta-box">
            <span className="meta-k">Core Benchmark</span>
            <span className="meta-v highlight">{project.keyMetric}</span>
          </div>
        </div>
      </header>

      {/* 3. EXECUTIVE SUMMARY & TECH STACK TAGS */}
      <section className="case-study-section">
        <h2 className="section-heading">01 // The Executive Context</h2>
        <p className="section-body-text">{project.summary}</p>
        <div className="tech-tags-list">
          {project.tags.map((tag) => (
            <span key={tag} className="tech-tag-pill">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* 4. THE TECHNICAL CHALLENGE & BOTTLENECK */}
      <section className="case-study-section">
        <h2 className="section-heading">02 // The Technical Challenge</h2>
        <div className="challenge-card">
          <p className="challenge-context"><b>Context:</b> {project.challenge.context}</p>
          <p className="challenge-bottleneck"><b>The Critical Bottleneck:</b> {project.challenge.bottleneck}</p>

          <div className="failed-reasons-box">
            <span className="failed-title">Why Off-The-Shelf Solutions Broke:</span>
            <ul className="failed-list">
              {project.challenge.whyExistingFailed.map((reason, idx) => (
                <li key={idx}>{reason}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURAL BREAKDOWN & SYSTEM STEPS */}
      <section className="case-study-section">
        <h2 className="section-heading">03 // The Architectural Solution</h2>
        <p className="section-body-text">{project.architecture.overview}</p>

        <div className="architecture-steps-stack">
          {project.architecture.steps.map((step, idx) => (
            <div key={idx} className="architecture-step-card">
              <div className="step-num-col">
                <span className="step-num">0{idx + 1}</span>
              </div>
              <div className="step-content-col">
                <div className="step-header">
                  <h3 className="step-title">{step.title}</h3>
                  <span className="step-tech-badge">{step.tech}</span>
                </div>
                <p className="step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE IN-PAGE HARNESS SIMULATOR */}
      <section className="case-study-section">
        <h2 className="section-heading">04 // Live System Harness Test</h2>
        <p className="section-body-text">
          Execute a simulated real-time pipeline workload to observe the architecture's benchmarked response:
        </p>
        
        <div className="interactive-harness-box">
          <div className="harness-header">
            <span>TERMINAL // {project.id.toUpperCase()}_TEST_RUNNER</span>
            <button
              type="button"
              className="harness-run-btn"
              onClick={runSimulation}
              disabled={simActive}
            >
              {simActive ? 'RUNNING BENCHMARK...' : '⚡ EXECUTE PIPELINE TEST'}
            </button>
          </div>
          <div className="harness-screen">
            <span className="harness-prompt">&gt;</span>
            <span className="harness-output">{simOutput}</span>
          </div>
        </div>
      </section>

      {/* 7. QUANTIFIED ENGINEERING IMPACT */}
      <section className="case-study-section">
        <h2 className="section-heading">05 // Quantified Engineering Impact</h2>
        <div className="metrics-summary-grid">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="metric-card">
              <span className="metric-val">{m.value}</span>
              <span className="metric-label">{m.label}</span>
              <span className="metric-detail">{m.detail}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 8. NEXT PROJECT NAVIGATOR & CALL TO ACTION */}
      <footer className="case-study-footer">
        <div className="project-nav-row">
          <Link to={`/work/${project.prevProject.slug}`} className="nav-proj-btn prev">
            <span className="nav-arrow">←</span>
            <div>
              <small>PREVIOUS CASE STUDY</small>
              <b>{project.prevProject.title}</b>
            </div>
          </Link>

          <Link to={`/work/${project.nextProject.slug}`} className="nav-proj-btn next">
            <div>
              <small>NEXT CASE STUDY</small>
              <b>{project.nextProject.title}</b>
            </div>
            <span className="nav-arrow">→</span>
          </Link>
        </div>

        <div className="case-study-cta-box">
          <h3>Want to discuss this architecture in depth?</h3>
          <p>Sahil is actively available for Senior Software Engineer and AI Systems Architect roles.</p>
          <div className="cta-actions-row">
            <button type="button" className="cta-call-btn" onClick={onOpenPhoneCall}>
              📞 Direct Call with Sahil (+91 9625213480)
            </button>
            <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-resume-btn">
              ⬇ Download Complete Resume PDF
            </a>
          </div>
        </div>
      </footer>
    </article>
  );
};
