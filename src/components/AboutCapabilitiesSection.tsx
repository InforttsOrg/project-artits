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
  const email = 'sahil.artits.rathee@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const triggerStamp = (type: string) => {
    if (type === 'sahil') {
      setStampFeedback('⚡ "Sahil Rathee: Full stack & backend engineer specializing in Go, Python, TypeScript, and cloud infrastructure."');
    } else if (type === 'born') {
      setStampFeedback('📅 "Born in 2002 in New Delhi: B.Sc. in Computer Science, DDUC, University of Delhi (2018–2021)."');
    } else {
      setStampFeedback('🛠️ "Architecture: High-availability cloud systems, resilient microservices, and automated CI/CD pipelines."');
    }
    setTimeout(() => setStampFeedback(null), 3500);
  };

  return (
    <section className="about-capabilities-block">
      {/* 1. BIRTH YEAR 2002 & ARCHITECTURAL MOTTO STAGE */}
      <div className="birthyear-2002-stage">
        {/* Giant "20" watermark on top */}
        <div className="year-number top">20</div>

        {/* Central Illustrated Portrait with Authentic Speech Bubble */}
        <div className="avatar-speech-center">
          <div className="speech-bubble-box">
            <span className="speech-bubble-text">
              "BUILDING RELIABLE, HIGH-SCALE SYSTEMS THAT SOLVE REAL BUSINESS PROBLEMS."
            </span>
            <div className="speech-bubble-tail" />
          </div>

          <div className="avatar-portrait-wrap">
            <img src="/sahil.png" alt="Sahil Rathee" className="avatar-portrait-img" />
            <span className="avatar-online-dot" title="Available for Staff / Senior roles" />
          </div>

          <div className="bio-under-portrait">
            <span className="bio-name">SAHIL RATHEE</span>
            <span className="bio-role">SENIOR SOFTWARE ENGINEER | FULL STACK & DISTRIBUTED SYSTEMS</span>
            <p className="bio-copy">
              Born in 2002 in New Delhi, India. Software engineer specializing in scalable backend architectures,
              cloud infrastructure, and practical AI systems. Experienced in taking projects from zero to production at scale.
            </p>
          </div>
        </div>

        {/* Giant "02" watermark on bottom */}
        <div className="year-number bottom">02</div>
      </div>

      {/* 2. REAL COMPANIES & VERIFIED PRODUCTION TRACK RECORD */}
      <div className="real-companies-section">
        <div className="section-title-strip">
          <span className="section-kicker">VERIFIED COMMERCIAL SCALE</span>
          <h2 className="section-title-large">Companies & Enterprise Deployments</h2>
          <p className="section-desc">
            Direct production contributions, scalable cloud infrastructure, and core backend architecture for verified commercial enterprises.
          </p>
        </div>

        <div className="companies-cards-grid">
          {/* Company 0: Infortts Inc (Parent Organization) */}
          <div className="company-card-anchor flagship-org">
            <div className="company-logo-slot">
              <img src="/companies/infortts.png" alt="Infortts Inc" className="company-logo-img square infortts-orb" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">Infortts Inc. (Infortts India)</span>
                <span className="company-badge-pill highlight-cyan">Founding Entity • 2021</span>
              </div>
              <span className="company-role-meta">Founding Architect & Principal Engineer • Jun 2021 – Present</span>
              <p className="company-impact-text">
                Technology company & software incubator. Meta Business Verified Portfolio (ID: <b>1160500881122893</b>).
                Architected automated trading software (Mitochondria), developer productivity frameworks (Meeseeks), and scalable cloud infrastructure.
              </p>
              
              {/* Direct Real Links */}
              <div className="company-links-row">
                <a
                  href="https://www.linkedin.com/company/infortts-inc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link highlight"
                >
                  💼 Infortts LinkedIn ↗
                </a>
                <a
                  href="https://infortts.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link"
                >
                  🌐 infortts.site ↗
                </a>
                <span className="company-direct-link meta-badge">
                  🏢 Meta ID: 1160500881122893
                </span>
              </div>

              <div className="company-pill-row">
                <span className="company-tech-tag">Distributed Systems</span>
                <span className="company-tech-tag">NATS Messaging</span>
                <span className="company-tech-tag">Python / C++</span>
                <span className="company-tech-tag">Autonomous AI</span>
                <span className="company-tech-tag">Vector Search</span>
              </div>
            </div>
          </div>

          {/* Company 1: Gym Wise India */}
          <div className="company-card-anchor">
            <div className="company-logo-slot">
              <img src="/companies/gymwise.png" alt="Gym Wise India" className="company-logo-img square" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">Gym Wise India Private Limited</span>
                <span className="company-badge-pill">290+ Followers</span>
              </div>
              <span className="company-role-meta">Solution Architect • Jul 2024 – Nov 2025 • Gurugram, India</span>
              <p className="company-impact-text">
                Enterprise fitness ERP platform serving <b>300+ gyms across Delhi NCR, Australia, and Singapore</b>.
                Architected Kubernetes clusters & Terraform IaC with <b>99.99% high availability</b>.
              </p>
              
              {/* Direct Real Links */}
              <div className="company-links-row">
                <a
                  href="https://play.google.com/store/apps/details?id=com.gymwise.android"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link highlight"
                >
                  ▶ Google Play App ↗
                </a>
                <a
                  href="https://www.linkedin.com/company/gym-wise/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link"
                >
                  💼 LinkedIn (gym-wise) ↗
                </a>
                <a
                  href="https://gymwise.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link"
                >
                  🌐 gymwise.in ↗
                </a>
              </div>

              <div className="company-pill-row">
                <span className="company-tech-tag">Kubernetes</span>
                <span className="company-tech-tag">AWS</span>
                <span className="company-tech-tag">Terraform</span>
                <span className="company-tech-tag">Golang</span>
              </div>
            </div>
          </div>

          {/* Company 2: BigHit Sportz */}
          <div className="company-card-anchor">
            <div className="company-logo-slot">
              <img src="/companies/bighit.png" alt="BigHit Sportz" className="company-logo-img square" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">BigHit Sportz: Sports for All</span>
                <span className="company-badge-pill gold">⭐ 4.0 (128)</span>
              </div>
              <span className="company-role-meta">Full Stack Engineer & DevOps Lead • Nov 2022 – Mar 2024 • Mumbai, India</span>
              <p className="company-impact-text">
                Multi-sport platform & youth scouting app (official partner <b>FC Bayern Youth Cup</b> & <b>Bundesliga Dream</b>).
                Achieved <b>-80% app bundle size reduction</b> and <b>+60% server efficiency</b> with Amazon Neptune graph DB & OpenSearch.
              </p>

              {/* Direct Real Links */}
              <div className="company-links-row">
                <a
                  href="https://play.google.com/store/apps/details?id=com.bighit.sports"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link highlight"
                >
                  ▶ Google Play (4.0★) ↗
                </a>
                <a
                  href="https://www.linkedin.com/company/bighitsports/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link"
                >
                  💼 LinkedIn (bighitsports) ↗
                </a>
                <a
                  href="https://bighit.pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link"
                >
                  🌐 bighit.pro ↗
                </a>
              </div>

              <div className="company-pill-row">
                <span className="company-tech-tag">AWS Neptune</span>
                <span className="company-tech-tag">OpenSearch</span>
                <span className="company-tech-tag">React Native</span>
                <span className="company-tech-tag">AWS EKS</span>
              </div>
            </div>
          </div>

          {/* Company 3: Roost / Rent1st Escrow */}
          <div className="company-card-anchor">
            <div className="company-logo-slot">
              <img src="/companies/rent1st.png" alt="Rent1st / Roost" className="company-logo-img square" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">Roost / Rent1st Escrow Platform</span>
                <span className="company-badge-pill green">99.99% Uptime</span>
              </div>
              <span className="company-role-meta">Principal Backend Architect • 2023–2025</span>
              <p className="company-impact-text">
                Multi-tenant property management platform with automated escrow reconciliation.
                Engineered concurrent Go microservices with strict <b>ACID double-entry ledger bookkeeping</b> and zero double-charge errors.
              </p>

              {/* Direct Real Links */}
              <div className="company-links-row">
                <a
                  href="https://rent1st.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link highlight"
                >
                  🌐 rent1st.in ↗
                </a>
                <span className="company-direct-link disabled">
                  🏢 Roost Property SaaS
                </span>
              </div>

              <div className="company-pill-row">
                <span className="company-tech-tag">Go (Golang)</span>
                <span className="company-tech-tag">PostgreSQL ACID</span>
                <span className="company-tech-tag">Redis</span>
                <span className="company-tech-tag">Flutter</span>
              </div>
            </div>
          </div>

          {/* Company 4: Gamix Labs */}
          <div className="company-card-anchor">
            <div className="company-logo-slot">
              <img src="/companies/gamixlabs.webp" alt="Gamix Labs" className="company-logo-img square" />
            </div>
            <div className="company-info-slot">
              <div className="company-header-row">
                <span className="company-name">Gamix Labs</span>
                <span className="company-badge-pill blue">Tier-1 Studio</span>
              </div>
              <span className="company-role-meta">Full Stack Developer • Mar 2022 – Oct 2022</span>
              <p className="company-impact-text">
                Engineered online game backends and HTML5/PWA gaming titles for tier-1 international clients (<b>OneFC, Bombay Play</b>)
                utilizing Cocos Creator engine and high-throughput Node.js/Redis streaming.
              </p>

              {/* Direct Real Links */}
              <div className="company-links-row">
                <a
                  href="https://gamixlabs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link highlight"
                >
                  🌐 gamixlabs.com ↗
                </a>
                <a
                  href="https://www.linkedin.com/company/gamixlabs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-direct-link"
                >
                  💼 LinkedIn ↗
                </a>
              </div>

              <div className="company-pill-row">
                <span className="company-tech-tag">TypeScript</span>
                <span className="company-tech-tag">Cocos Creator</span>
                <span className="company-tech-tag">Node.js</span>
                <span className="company-tech-tag">Redis / MongoDB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CAPABILITIES & KEY ENGINEERING MILESTONES */}
      <div className="capabilities-editorial-section">
        <div className="editorial-columns-grid">
          {/* Col 1: Core Capabilities */}
          <div className="editorial-col">
            <h3 className="col-heading">Capabilities</h3>
            <ul className="editorial-list">
              <li>Distributed Backend Architecture</li>
              <li>Cloud Infrastructure & Kubernetes (AWS EKS)</li>
              <li>Infrastructure as Code (Terraform)</li>
              <li>Financial Systems & Transaction Ledgers</li>
              <li>Multi-Agent AI Workflows & Tool Integration</li>
              <li>Database Engineering (PostgreSQL, Redis, Graph DBs)</li>
              <li>Cross-Platform App Development (Flutter, React Native)</li>
              <li>API Design (REST, gRPC, WebSockets)</li>
              <li>Performance Optimization & System Reliability</li>
              <li>CI/CD Automation & DevOps</li>
            </ul>
          </div>

          {/* Col 2: Engineering Milestones */}
          <div className="editorial-col">
            <h3 className="col-heading">Milestones & Benchmarks</h3>
            <ul className="editorial-list">
              <li><b>99.99% Uptime:</b> Across 300+ gyms in Delhi NCR, Australia & Singapore</li>
              <li><b>&lt;1ms Execution:</b> Sub-millisecond trade execution in financial engine</li>
              <li><b>-70% Token Costs:</b> AST context optimization for autonomous code agents</li>
              <li><b>-80% Bundle Size Cut:</b> Mobile build overhaul for BigHit Sportz</li>
              <li><b>+60% Cloud Cost Savings:</b> Kubernetes KEDA autoscaling migration</li>
              <li><b>Zero Double-Charge Errors:</b> PostgreSQL advisory locks on Rent1st escrow</li>
              <li><b>B.Sc. in Computer Science:</b> DDUC, University of Delhi (2018–2021)</li>
            </ul>
          </div>

          {/* Col 3: Open-Source & Architecture Projects */}
          <div className="editorial-col">
            <h3 className="col-heading">Open-Source & Projects</h3>
            <ul className="editorial-list">
              <li>
                <a href="https://github.com/InforttsOrg" target="_blank" rel="noopener noreferrer">
                  <b>Infortts Open Source ↗</b>
                </a>
                <small>Distributed systems, backend services & developer tooling</small>
              </li>
              <li>
                <b>Mitochondria Trading Engine</b>
                <small>Headless containerized MT5 execution & risk management system</small>
              </li>
              <li>
                <b>Meeseeks Agent Framework</b>
                <small>Automated codebase refactoring with Model Context Protocol (MCP)</small>
              </li>
              <li>
                <b>Orealfit Wellness Platform</b>
                <small>High-availability backend with sub-50ms billing pipelines</small>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 4. COPY EMAIL & SHELBY KHO STAMPS FOOTER BLOCK */}
      <div className="copy-email-footer-block">
        <p className="tap-circles-hint">tap the circles for a surprise!</p>

        {/* 3 Circular Stamps */}
        <div className="stamps-row">
          <button
            type="button"
            className="stamp-circle-btn stamp-cyan"
            onClick={() => triggerStamp('sahil')}
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
