import React, { useState } from 'react';

interface AboutCapabilitiesSectionProps {
  onOpenPhoneCall: () => void;
  onOpenSayHi: () => void;
}

export const AboutCapabilitiesSection: React.FC<AboutCapabilitiesSectionProps> = ({
  onOpenPhoneCall,
  onOpenSayHi,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [stampFeedback, setStampFeedback] = useState<string | null>(null);
  const email = 'rttss.sahil@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const triggerStamp = (type: string) => {
    if (type === 'shelby') {
      setStampFeedback('✨ "A crush on art: ~90 hours of drawing for this site"');
    } else if (type === 'born') {
      setStampFeedback('📅 "Born in 2002: Computer Science Graduate, DDUC Delhi University"');
    } else {
      setStampFeedback('⚡ "Architecture: Go, C++, Python, HFT RingBuffers, Kubernetes & Agentic Swarms"');
    }
    setTimeout(() => setStampFeedback(null), 3000);
  };

  return (
    <section className="about-capabilities-block">
      {/* 1. HUYML-STYLE BIRTH YEAR 2002 & AVATAR HEAD STAGE */}
      <div className="birthyear-2002-stage">
        {/* Giant "20" watermark on top */}
        <div className="year-number top">20</div>

        {/* Central Illustrated Portrait with Speech Bubble */}
        <div className="avatar-speech-center">
          <div className="speech-bubble-box">
            <span className="speech-bubble-text">
              EVER WONDERED WHAT'S GOING ON INSIDE MY HEAD?
            </span>
            <div className="speech-bubble-tail" />
          </div>

          <div className="avatar-portrait-wrap">
            <img src="/sahil.png" alt="Sahil Rathee" className="avatar-portrait-img" />
            <span className="avatar-online-dot" title="Available for Staff / Senior roles" />
          </div>

          <div className="bio-under-portrait">
            <span className="bio-name">SAHIL RATHEE</span>
            <span className="bio-role">SENIOR SOFTWARE ENGINEER & DISTRIBUTED SYSTEMS ARCHITECT</span>
            <p className="bio-copy">
              Born in 2002 in New Delhi, India. Building high-throughput distributed backends,
              lock-free algorithmic memory structures, and autonomous multi-agent AI frameworks.
            </p>
          </div>
        </div>

        {/* Giant "02" watermark on bottom */}
        <div className="year-number bottom">02</div>
      </div>

      {/* 2. REAL COMPANIES & PROVEN PRODUCTION TRACK RECORD */}
      <div className="real-companies-section">
        <div className="section-title-strip">
          <span className="section-kicker">PROVEN AT PRODUCTION SCALE</span>
          <h2 className="section-title-large">Companies & Commercial Deployments</h2>
          <p className="section-desc">
            Direct production contributions, scalable cloud infrastructure, and core backend architecture for tier-1 enterprises.
          </p>
        </div>

        <div className="companies-cards-grid">
          {/* Company 1: Gym Wise */}
          <a
            href="https://gymwise.in"
            target="_blank"
            rel="noopener noreferrer"
            className="company-card-anchor"
          >
            <div className="company-logo-slot">
              <img src="/companies/gymwise.svg" alt="GymWise India" className="company-logo-img" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">Gym Wise India Private Limited</span>
                <span className="company-ext-icon">↗</span>
              </div>
              <span className="company-role-meta">Solution Architect • 2024–2025</span>
              <p className="company-impact-text">
                Global fitness operations SaaS serving <b>300+ gyms across Delhi NCR, Australia, and Singapore</b>.
                Containerized microservices & Terraform IaC with <b>99.99% high availability</b>.
              </p>
              <div className="company-pill-row">
                <span className="company-tech-tag">Kubernetes</span>
                <span className="company-tech-tag">AWS</span>
                <span className="company-tech-tag">Terraform</span>
                <span className="company-tech-tag">Golang</span>
              </div>
            </div>
          </a>

          {/* Company 2: BigHit */}
          <a
            href="https://bighit.pro"
            target="_blank"
            rel="noopener noreferrer"
            className="company-card-anchor"
          >
            <div className="company-logo-slot">
              <img src="/companies/bighit.svg" alt="BigHit Sportz" className="company-logo-img" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">BigHit Pvt Ltd (BigHit Sportz)</span>
                <span className="company-ext-icon">↗</span>
              </div>
              <span className="company-role-meta">Full Stack Engineer & DevOps Lead • 2022–2024</span>
              <p className="company-impact-text">
                Multi-sport platform & youth scouting app (partnered with <b>FC Bayern Youth Cup</b> & <b>Bundesliga Dream</b>).
                Cut app bundle size by <b>80%</b> and server costs by <b>60%</b>.
              </p>
              <div className="company-pill-row">
                <span className="company-tech-tag">AWS Neptune Graph</span>
                <span className="company-tech-tag">OpenSearch</span>
                <span className="company-tech-tag">React Native</span>
                <span className="company-tech-tag">EKS</span>
              </div>
            </div>
          </a>

          {/* Company 3: Roost / Rent1st */}
          <a
            href="https://rent1st.in"
            target="_blank"
            rel="noopener noreferrer"
            className="company-card-anchor"
          >
            <div className="company-logo-slot">
              <img src="/companies/rent1st.png" alt="Rent1st / Roost" className="company-logo-img square" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">Roost / Rent1st Escrow</span>
                <span className="company-ext-icon">↗</span>
              </div>
              <span className="company-role-meta">Principal Backend Architect • 2023–2025</span>
              <p className="company-impact-text">
                Multi-tenant property management platform with automated escrow reconciliation.
                Engineered Go microservices with strict <b>ACID double-entry ledger bookkeeping</b>.
              </p>
              <div className="company-pill-row">
                <span className="company-tech-tag">Go (Golang)</span>
                <span className="company-tech-tag">PostgreSQL ACID</span>
                <span className="company-tech-tag">Redis</span>
                <span className="company-tech-tag">Flutter</span>
              </div>
            </div>
          </a>

          {/* Company 4: Gamix Labs */}
          <a
            href="https://gamixlabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="company-card-anchor"
          >
            <div className="company-logo-slot">
              <img src="/companies/gamixlabs.webp" alt="Gamix Labs" className="company-logo-img square" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">Gamix Labs</span>
                <span className="company-ext-icon">↗</span>
              </div>
              <span className="company-role-meta">Full Stack Developer • 2022</span>
              <p className="company-impact-text">
                Engineered online game backends and HTML5/PWA gaming titles for tier-1 clients (<b>OneFC, Bombay Play</b>)
                using Cocos Creator engine and high-throughput Node.js streaming.
              </p>
              <div className="company-pill-row">
                <span className="company-tech-tag">TypeScript</span>
                <span className="company-tech-tag">Cocos Creator</span>
                <span className="company-tech-tag">Node.js</span>
                <span className="company-tech-tag">Redis / MongoDB</span>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* 3. CAPABILITIES & KEY ENGINEERING MILESTONES (Huyml style) */}
      <div className="capabilities-editorial-section">
        <div className="editorial-columns-grid">
          {/* Col 1: Core Capabilities */}
          <div className="editorial-col">
            <h3 className="col-heading">Capabilities</h3>
            <ul className="editorial-list">
              <li>Distributed Systems Architecture</li>
              <li>High-Frequency Quantitative Trading Systems</li>
              <li>Lock-Free In-Memory Data Structures (RingBuffers)</li>
              <li>Autonomous Multi-Agent AI Swarms & MCP</li>
              <li>High-Availability Kubernetes & Terraform IaC</li>
              <li>ACID Double-Entry Financial Ledgers & Escrow</li>
              <li>Real-Time Event Streaming (NATS JetStream, Redis)</li>
              <li>Vector Search Clustering (Qdrant, OpenSearch)</li>
              <li>Cross-Platform Workstations (Flutter, React Native)</li>
              <li>Graph Databases (Amazon Neptune, Gremlin)</li>
            </ul>
          </div>

          {/* Col 2: Engineering Milestones */}
          <div className="editorial-col">
            <h3 className="col-heading">Milestones & Benchmarks</h3>
            <ul className="editorial-list">
              <li><b>99.99% Uptime:</b> Across 300+ gyms in Delhi NCR, Australia & Singapore</li>
              <li><b>&lt;0.7ms Execution:</b> Lock-Free RingBuffer tick ingestion (Mitochondria)</li>
              <li><b>-70% Token Spend:</b> Context AST pruning for autonomous agent swarms</li>
              <li><b>-80% Bundle Size Cut:</b> React Native Hermes overhaul for BigHit Sportz</li>
              <li><b>+60% Cloud Cost Cut:</b> Kubernetes KEDA autoscaling migration</li>
              <li><b>Zero Double-Charge Errors:</b> PostgreSQL advisory locks on Rent1st escrow</li>
              <li><b>B.Sc. in Computer Science:</b> DDUC, University of Delhi (2018–2021)</li>
            </ul>
          </div>

          {/* Col 3: Open-Source & Architecture Initiatives */}
          <div className="editorial-col">
            <h3 className="col-heading">Initiatives & Swarms</h3>
            <ul className="editorial-list">
              <li>
                <a href="https://github.com/InforttsOrg" target="_blank" rel="noopener noreferrer">
                  <b>Infortts Autonomous Swarm ↗</b>
                </a>
                <small>Distributed multi-agent orchestration & real-time telemetry</small>
              </li>
              <li>
                <b>Mitochondria HFT Engine</b>
                <small>Sub-microsecond memory ring buffer & MT5 terminal IPC</small>
              </li>
              <li>
                <b>Meeseeks Agent Framework</b>
                <small>Compiler-verified code refactoring with Model Context Protocol</small>
              </li>
              <li>
                <b>Orealfit Sports & Wellness Ecosystem</b>
                <small>Monorepo architecture with sub-50ms billing pipelines</small>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. COPY EMAIL & FOOTER LINKS (Shelby Kho aesthetic) */}
      <div className="copy-email-footer-block">
        <p className="tap-circles-hint">tap the circles for a surprise!</p>

        {/* 3 Circular Stamps */}
        <div className="stamps-row">
          <button
            type="button"
            className="stamp-circle-btn stamp-cyan"
            onClick={() => triggerStamp('shelby')}
            title="Click for surprise"
          >
            <span>SAHIL</span>
            <small>↗</small>
          </button>
          <button
            type="button"
            className="stamp-circle-btn stamp-yellow"
            onClick={() => triggerStamp('born')}
            title="Birth Year 2002"
          >
            <span>2002</span>
            <small>★</small>
          </button>
          <button
            type="button"
            className="stamp-circle-btn stamp-violet"
            onClick={() => triggerStamp('architect')}
            title="Architecture"
          >
            <span>ARCHITECT</span>
            <small>⚡</small>
          </button>
        </div>

        {/* Surprise Toast */}
        {stampFeedback && (
          <div className="stamp-feedback-pill">
            {stampFeedback}
          </div>
        )}

        {/* Big Display Email */}
        <div className="display-email-wrapper">
          <a href={`mailto:${email}`} className="display-email-text">
            {email}
          </a>
          <button
            type="button"
            className={`copy-email-prominent-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopyEmail}
          >
            {copied ? '✓ Email Copied to Clipboard!' : 'Copy Email ❐'}
          </button>
        </div>

        {/* Floating "Come Say Hi" trigger */}
        <div className="say-hi-trigger-strip">
          <button type="button" className="say-hi-pill-btn" onClick={onOpenSayHi}>
            👋 COME SAY HI (Chat, Call & Socials) ↗
          </button>
        </div>

        {/* Bottom Navigation Links Bar */}
        <div className="shelby-bottom-nav-bar">
          <a href={`mailto:${email}`} className="bottom-link">
            ✉ Email
          </a>
          <a href="https://linkedin.com/in/rttss-sahil" target="_blank" rel="noopener noreferrer" className="bottom-link">
            💼 LinkedIn
          </a>
          <button type="button" className="bottom-link-btn" onClick={onOpenPhoneCall}>
            📞 +91 9625213480
          </button>
          <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer" className="bottom-link">
            ⬇ Resume
          </a>
          <button
            type="button"
            className="bottom-link-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Back to top ↑
          </button>
        </div>

        <div className="footer-copyright-statement">
          Crafted in Agave Nerd Font • Infortts Architecture • New Delhi, India
        </div>
      </div>
    </section>
  );
};
