import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PROJECTS_DATA } from '../data/projectsData';

interface ProjectCaseStudyViewProps {
  onOpenPhoneCall: () => void;
}

export const ProjectCaseStudyView: React.FC<ProjectCaseStudyViewProps> = ({ onOpenPhoneCall }) => {
  const { slug } = useParams<{ slug: string }>();
  const [simActive, setSimActive] = useState<boolean>(false);
  const [simOutput, setSimOutput] = useState<string>('System idle. Click "Run Verification Test" to simulate production workload.');

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

        {/* Metadata Strip */}
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
        <h2 className="section-heading">01 // Executive Overview</h2>
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
        <h2 className="section-heading">02 // The Technical Challenge & Constraints</h2>
        <div className="challenge-card">
          <p className="challenge-context"><b>Context:</b> {project.challenge.context}</p>
          <p className="challenge-bottleneck"><b>The Critical Bottleneck:</b> {project.challenge.bottleneck}</p>

          <div className="failed-reasons-box">
            <span className="failed-title">Why Off-The-Shelf Approaches Broke Down:</span>
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
        <h2 className="section-heading">03 // System Architecture & Implementation</h2>
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
        <h2 className="section-heading">04 // Interactive Architecture Verification</h2>
        <p className="section-body-text">
          Run an interactive verification test to validate latency, data integrity, and architectural invariants:
        </p>
        
        <div className="interactive-harness-box">
          <div className="harness-header">
            <span>CONSOLE // {project.title}_VERIFICATION_RUNNER</span>
            <button
              type="button"
              className="harness-run-btn"
              onClick={runSimulation}
              disabled={simActive}
            >
              {simActive ? 'RUNNING TEST...' : '▶ RUN VERIFICATION TEST'}
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
        <h2 className="section-heading">05 // Quantified Business & Engineering Impact</h2>
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
          <h3>Want to discuss this architecture or collaborate?</h3>
          <p>Sahil is open to Senior Software Engineer, Full Stack, and Cloud Infrastructure roles.</p>
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
