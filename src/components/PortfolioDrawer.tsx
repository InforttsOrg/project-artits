import React from 'react';

interface PortfolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPhoneCall: () => void;
}

const FEATURED_PROJECTS = [
  {
    id: 'mitochondria',
    title: 'MITOCHONDRIA',
    subtitle: 'Automated Trading Workstation & Execution Engine',
    desc: 'Automated execution infrastructure containerizing MetaTrader 5 inside headless Linux environments. Features low-latency NATS messaging, private container network isolation, and pre-trade risk controls.',
    tags: ['Python', 'MetaTrader 5', 'NATS', 'Qdrant', 'WebSockets', 'Flutter'],
    metrics: '<1ms Execution • 0 Public DB Ports',
  },
  {
    id: 'meeseeks',
    title: 'MEESEEKS',
    subtitle: 'Multi-Agent AI Framework for Code Refactoring',
    desc: 'Multi-agent orchestration framework for automated repository refactoring, AST context optimization (-70% token costs), and isolated Docker test verification.',
    tags: ['Python', 'FastAPI', 'LangGraph', 'Playwright', 'MCP', 'Docker'],
    metrics: '-70% Token Costs • Docker Verified',
  },
  {
    id: 'roost',
    title: 'ROOST / RENT1ST',
    subtitle: 'Multi-Tenant Property Management SaaS & Escrow',
    desc: 'Multi-tenant rental management and escrow platform with double-entry accounting ledgers, PostgreSQL advisory locking, and automated GST reconciliation.',
    tags: ['Flutter', 'Go', 'PostgreSQL', 'GCP', 'Redis', 'Docker'],
    metrics: 'Automated Escrow • 99.99% Uptime',
  },
  {
    id: 'bighit',
    title: 'BIGHIT SPORTZ',
    subtitle: 'Scalable Cloud Infrastructure & Mobile Optimization',
    desc: 'Auto-scaling Kubernetes (AWS EKS) infrastructure with Amazon Neptune graph database and OpenSearch scouting, reducing mobile bundle size by 80%.',
    tags: ['AWS', 'Kubernetes', 'Terraform', 'Neptune', 'OpenSearch', 'React Native'],
    metrics: '-80% Mobile Bundle • +60% Cost Savings',
  },
];

export const PortfolioDrawer: React.FC<PortfolioDrawerProps> = ({
  isOpen,
  onClose,
  onOpenPhoneCall,
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="portfolio-drawer-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      onClick={onClose}
    >
      <div 
        className="portfolio-drawer-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-identity">
            <img src="/sahil.png" alt="Sahil Rathee" className="drawer-avatar" />
            <div>
              <span className="drawer-label">ARCHITECTURAL PORTFOLIO</span>
              <h2 id="drawer-title" className="drawer-name">Sahil Rathee</h2>
              <span className="drawer-sub">Senior Software Engineer & AI Systems Architect • New Delhi</span>
            </div>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close portfolio">
            ✕
          </button>
        </div>

        {/* Action Header Strip */}
        <div className="drawer-action-strip">
          <button type="button" className="call-sahil-btn" onClick={() => { onClose(); onOpenPhoneCall(); }}>
            📞 Direct Call with Sahil
          </button>
          <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-download-btn">
            ⬇ Download Resume PDF
          </a>
          <a href="https://docs.google.com/document/d/1X5Z2x5z6ZzZzZzZ" target="_blank" rel="noopener noreferrer" className="doc-link-btn">
            Google Doc ↗
          </a>
        </div>

        {/* Featured Production Work */}
        <div className="drawer-content">
          <h3 className="section-title">Production Systems & Architecture</h3>
          <p className="section-sub">
            High-throughput distributed systems, algorithmic trading telemetry, and autonomous multi-agent swarms architected by Sahil.
          </p>

          <div className="drawer-projects-grid">
            {FEATURED_PROJECTS.map((proj) => (
              <div key={proj.id} className="drawer-project-card">
                <div className="proj-card-top">
                  <div>
                    <h4 className="proj-title">{proj.title}</h4>
                    <span className="proj-subtitle">{proj.subtitle}</span>
                  </div>
                  <span className="proj-metrics">{proj.metrics}</span>
                </div>
                <p className="proj-desc">{proj.desc}</p>
                <div className="proj-tags">
                  {proj.tags.map((t) => (
                    <span key={t} className="proj-tag">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Details */}
          <div className="drawer-contact-card">
            <h4>Get in Touch</h4>
            <p>Available for Senior & Staff Software Engineer and AI Architect roles.</p>
            <div className="contact-links-row">
              <a href="tel:+919625213480" className="contact-pill">📱 +91 9625213480</a>
              <a href="mailto:contact@infortts.site" className="contact-pill">✉️ contact@infortts.site</a>
              <a href="https://linkedin.com/in/rttss-sahil" target="_blank" rel="noopener noreferrer" className="contact-pill">💼 LinkedIn</a>
              <a href="https://x.com/rttss_sahil" target="_blank" rel="noopener noreferrer" className="contact-pill">💬 X / Twitter</a>
              <a href="https://github.com/InforttsOrg" target="_blank" rel="noopener noreferrer" className="contact-pill">🐙 GitHub Organization</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
