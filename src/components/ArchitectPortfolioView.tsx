import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { InteractiveCanvasGraphic } from './InteractiveCanvasGraphic';
import { MemoryGraph3D, GraphNode } from './MemoryGraph3D';
import { AboutCapabilitiesSection } from './AboutCapabilitiesSection';
import { ComeSayHiModal } from './ComeSayHiModal';

interface ArchitectPortfolioViewProps {
  onOpenPhoneCall: () => void;
  inforttsFeedsCount?: number;
}

export const ArchitectPortfolioView: React.FC<ArchitectPortfolioViewProps> = ({
  onOpenPhoneCall,
  inforttsFeedsCount = 40,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'mitochondria' | 'meeseeks' | 'roost' | 'bighit'>('all');
  const [selected3DNode, setSelected3DNode] = useState<GraphNode | null>(null);
  const [topologyViewMode, setTopologyViewMode] = useState<'graph' | '3d'>('graph');
  const [graphTab, setGraphTab] = useState<'stats' | 'graph'>('stats');
  const [expandedSystem, setExpandedSystem] = useState<string>('mitochondria');
  const [isSayHiOpen, setIsSayHiOpen] = useState<boolean>(false);

  return (
    <div className="portfolio-command-deck">
      {/* 1. TOP HEADER & IDENTITY STRIP */}
      <header className="deck-header">
        <div className="deck-identity">
          <img src="/sahil.png" alt="Sahil Rathee" className="deck-avatar" />
          <div className="deck-bio">
            <div className="deck-badge-row">
              <span className="live-status-dot" />
              <span className="deck-status-text">AVAILABLE FOR SENIOR / STAFF ROLES • BORN 2002 • NEW DELHI</span>
              <span className="deck-feeds-badge">4 Production Case Studies • Verified Impact</span>
            </div>
            <h1 className="deck-name">SAHIL RATHEE</h1>
            <p className="deck-headline">Senior Software Engineer | Backend, Cloud Infrastructure & Distributed Systems</p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="deck-actions">
          <button type="button" className="deck-cta-btn primary" onClick={() => setIsSayHiOpen(true)}>
            👋 Come Say Hi ↗
          </button>
          <button type="button" className="deck-cta-btn secondary" onClick={onOpenPhoneCall}>
            📞 Call Sahil (+91 9625213480)
          </button>
          <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer" className="deck-cta-btn secondary">
            ⬇ Resume PDF
          </a>
          <a href="https://linkedin.com/in/rttss-sahil" target="_blank" rel="noopener noreferrer" className="deck-icon-link" title="LinkedIn">
            💼 LinkedIn
          </a>
          <a href="https://github.com/InforttsOrg" target="_blank" rel="noopener noreferrer" className="deck-icon-link" title="GitHub">
            🐙 GitHub
          </a>
        </div>
      </header>

      {/* Hero Interactive Canvas Graphic (Shelby Kho inspiration) */}
      <section className="hero-interactive-graphic-row">
        <InteractiveCanvasGraphic />
      </section>

      {/* 2. SPECIALIZATION FILTER TABS */}
      <nav className="deck-tabs-nav" aria-label="System specialization filter">
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          🌐 All Projects (4)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'mitochondria' ? 'active' : ''}`}
          onClick={() => { setActiveTab('mitochondria'); setExpandedSystem('mitochondria'); }}
        >
          ⚡ Mitochondria (Trading Systems)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'meeseeks' ? 'active' : ''}`}
          onClick={() => { setActiveTab('meeseeks'); setExpandedSystem('meeseeks'); }}
        >
          🤖 Meeseeks (Autonomous AI)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'roost' ? 'active' : ''}`}
          onClick={() => { setActiveTab('roost'); setExpandedSystem('roost'); }}
        >
          🏢 Roost & Rent1st (Fintech SaaS)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'bighit' ? 'active' : ''}`}
          onClick={() => { setActiveTab('bighit'); setExpandedSystem('bighit'); }}
        >
          ☁️ BigHit Sportz (Cloud & DevOps)
        </button>
      </nav>

      {/* 3. MAIN COMMAND GRID: 4 SYSTEMS CARDS & INTERACTIVE TOPOLOGY */}
      <main className="deck-main-layout">
        {/* Left Column: Deep Production Systems Cards */}
        <section className="systems-stream-section">
          <div className="section-header-row">
            <h2 className="deck-section-title">Featured Projects & Case Studies</h2>
            <span className="deck-section-hint">Click any project to inspect technical architecture and metrics</span>
          </div>

          <div className="systems-cards-stack">
            {/* SYSTEM 1: MITOCHONDRIA */}
            <article 
              className={`system-spec-card ${expandedSystem === 'mitochondria' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'mitochondria' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('mitochondria')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">FINANCIAL SYSTEMS & HIGH-THROUGHPUT EXECUTION</span>
                  <h3 className="spec-title">⚡ MITOCHONDRIA</h3>
                  <span className="spec-subtitle">Automated Trading Workstation & Containerized Execution Engine</span>
                </div>
                <div className="spec-metrics-pill highlight-cyan">
                  <span>&lt;1ms Execution</span>
                  <small>0 Public DB Ports</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Engineered an automated trade execution workstation interfacing directly with MetaTrader 5 (MT5). 
                  Containerized MT5 inside headless Linux environments to eliminate Windows licensing overhead, implemented 
                  low-latency message streaming via NATS JetStream, and isolated financial databases inside a private container network.
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>⚡ Sub-Millisecond Execution:</b> Optimized socket communication and memory buffers for rapid order routing.
                  </div>
                  <div className="highlight-item">
                    <b>📡 Resilient Messaging:</b> NATS JetStream pub/sub handling peak volatility without data loss.
                  </div>
                  <div className="highlight-item">
                    <b>🧠 Vector Market Analytics:</b> Qdrant vector memory matching live price action patterns with historical embeddings.
                  </div>
                </div>

                <div className="spec-tech-tags">
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">Linux Containers</span>
                  <span className="tech-badge">MetaTrader 5 API</span>
                  <span className="tech-badge">NATS JetStream</span>
                  <span className="tech-badge">Qdrant Vector DB</span>
                  <span className="tech-badge">PostgreSQL</span>
                  <span className="tech-badge">WebSockets</span>
                  <span className="tech-badge">Flutter Desktop</span>
                </div>

                <div className="spec-card-actions">
                  <Link to="/work/mitochondria" className="spec-case-study-btn" onClick={(e) => e.stopPropagation()}>
                    Explore Case Study (Architecture & Impact) →
                  </Link>
                </div>
              </div>
            </article>

            {/* SYSTEM 2: MEESEEKS */}
            <article 
              className={`system-spec-card ${expandedSystem === 'meeseeks' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'meeseeks' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('meeseeks')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">AUTONOMOUS AI & DEVELOPER TOOLING</span>
                  <h3 className="spec-title">🤖 MEESEEKS AGENT ENGINE</h3>
                  <span className="spec-subtitle">Multi-Agent AI Framework for Automated Codebase Refactoring</span>
                </div>
                <div className="spec-metrics-pill highlight-purple">
                  <span>-70% Token Cost</span>
                  <small>Docker Sandboxed</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Architected a multi-agent AI system where an orchestrator decomposes software engineering goals into 
                  discrete subtasks, parses Abstract Syntax Trees (ASTs) to prune unnecessary prompt tokens, and validates 
                  generated code inside isolated Docker sandbox environments.
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>🎯 70% Token Cost Reduction:</b> Implemented AST-level context pruning and type-signature extraction.
                  </div>
                  <div className="highlight-item">
                    <b>🛠️ Standardized Tool Calling:</b> Dynamic Model Context Protocol (MCP) tool integration for database queries, testing, and git operations.
                  </div>
                  <div className="highlight-item">
                    <b>🛡️ Container Verification:</b> Isolated Docker evaluation loop catching compiler errors before PR submission.
                  </div>
                </div>

                <div className="spec-tech-tags">
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">FastAPI</span>
                  <span className="tech-badge">LangGraph</span>
                  <span className="tech-badge">Playwright</span>
                  <span className="tech-badge">Model Context Protocol</span>
                  <span className="tech-badge">Docker Sandboxes</span>
                </div>

                <div className="spec-card-actions">
                  <Link to="/work/meeseeks" className="spec-case-study-btn" onClick={(e) => e.stopPropagation()}>
                    Explore Case Study (Architecture & Impact) →
                  </Link>
                </div>
              </div>
            </article>

            {/* SYSTEM 3: ROOST / RENT1ST */}
            <article 
              className={`system-spec-card ${expandedSystem === 'roost' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'roost' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('roost')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">FINTECH SAAS & TRANSACTION LEDGERS</span>
                  <h3 className="spec-title">🏢 ROOST & RENT1ST</h3>
                  <span className="spec-subtitle">Multi-Tenant Property Management SaaS & Financial Escrow System</span>
                </div>
                <div className="spec-metrics-pill highlight-emerald">
                  <span>99.99% Uptime</span>
                  <small>Zero Discrepancies</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Designed and built a multi-tenant rental management and escrow platform handling high-volume payments. 
                  Engineered concurrent Go microservices with strict idempotent double-entry ledger bookkeeping, PostgreSQL 
                  advisory locks for race-condition prevention, and automated GST reconciliation.
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>💰 Double-Entry Ledger:</b> Guaranteed mathematical auditability with PostgreSQL advisory locks and serializable transactions.
                  </div>
                  <div className="highlight-item">
                    <b>🧾 Automated Invoicing:</b> Asynchronous workers generating GST-compliant tax splits and instant receipts.
                  </div>
                  <div className="highlight-item">
                    <b>📱 Cross-Platform Architecture:</b> Flutter mobile and web applications backed by Go REST and WebSocket services.
                  </div>
                </div>

                <div className="spec-tech-tags">
                  <span className="tech-badge">Go (Golang)</span>
                  <span className="tech-badge">PostgreSQL</span>
                  <span className="tech-badge">Flutter</span>
                  <span className="tech-badge">Redis</span>
                  <span className="tech-badge">Google Cloud Platform</span>
                  <span className="tech-badge">Docker</span>
                </div>

                <div className="spec-card-actions">
                  <Link to="/work/roost" className="spec-case-study-btn" onClick={(e) => e.stopPropagation()}>
                    Explore Case Study (Architecture & Impact) →
                  </Link>
                </div>
              </div>
            </article>

            {/* SYSTEM 4: BIGHIT SPORTZ */}
            <article 
              className={`system-spec-card ${expandedSystem === 'bighit' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'bighit' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('bighit')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">CLOUD INFRASTRUCTURE & SCALABLE BACKENDS</span>
                  <h3 className="spec-title">☁️ BIGHIT SPORTZ</h3>
                  <span className="spec-subtitle">Scalable Cloud Infrastructure & Mobile Optimization for Youth Sports</span>
                </div>
                <div className="spec-metrics-pill highlight-blue">
                  <span>-80% App Size</span>
                  <small>+60% Cost Efficiency</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Modernized cloud infrastructure and mobile performance for India’s premier youth sports scouting platform. 
                  Deployed an auto-scaling Kubernetes (AWS EKS) microservice mesh, integrated Amazon Neptune graph database 
                  for athlete networking, and shrunk the mobile app bundle by 80%.
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>📦 80% Mobile Bundle Size Cut:</b> Re-engineered React Native build pipelines with Hermes engine and dynamic asset loading.
                  </div>
                  <div className="highlight-item">
                    <b>🚀 60% Cloud Cost Savings:</b> Replaced over-provisioned static EC2 instances with Kubernetes event-driven autoscaling (KEDA).
                  </div>
                  <div className="highlight-item">
                    <b>🔒 Infrastructure as Code:</b> Fully reproducible AWS environments managed via Terraform and GitOps CI/CD.
                  </div>
                </div>

                <div className="spec-tech-tags">
                  <span className="tech-badge">Kubernetes (EKS)</span>
                  <span className="tech-badge">AWS (EC2, S3, RDS, Neptune)</span>
                  <span className="tech-badge">Terraform</span>
                  <span className="tech-badge">OpenSearch</span>
                  <span className="tech-badge">Docker</span>
                  <span className="tech-badge">CI/CD GitOps</span>
                </div>

                <div className="spec-card-actions">
                  <Link to="/work/bighit" className="spec-case-study-btn" onClick={(e) => e.stopPropagation()}>
                    Explore Case Study (Architecture & Impact) →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Right Column: Interactive Architecture Topology & Node Inspector */}
        <aside className="topology-sidebar-section" id="topology">
          <div className="section-header-row topology-header-row">
            <div>
              <h2 className="deck-section-title">System Architecture Topology</h2>
              <span className="deck-section-hint">
                {topologyViewMode === 'graph'
                  ? 'Visual Codebase Knowledge Graph & Real-Time Stats (graph.infortts.site)'
                  : 'Drag to rotate 3D particle sphere • Click node for details'}
              </span>
            </div>
            <div className="topology-view-toggle">
              <button
                type="button"
                className={`topology-toggle-pill ${topologyViewMode === 'graph' ? 'active' : ''}`}
                onClick={() => setTopologyViewMode('graph')}
              >
                🌐 Codebase Graph
              </button>
              <button
                type="button"
                className={`topology-toggle-pill ${topologyViewMode === '3d' ? 'active' : ''}`}
                onClick={() => setTopologyViewMode('3d')}
              >
                ❖ 3D Vector Graph
              </button>
            </div>
          </div>

          <div className="topology-canvas-container">
            {topologyViewMode === 'graph' ? (
              <div className="graph-embed-wrapper">
                <div className="graph-embed-toolbar">
                  <div className="graph-status-info">
                    <span className="live-indicator-dot" />
                    <span className="graph-url-text">graph.infortts.site/?tab={graphTab}</span>
                  </div>
                  <div className="graph-toolbar-actions">
                    <button
                      type="button"
                      className={`graph-tab-btn ${graphTab === 'stats' ? 'active' : ''}`}
                      onClick={() => setGraphTab('stats')}
                    >
                      📊 Stats Tab
                    </button>
                    <button
                      type="button"
                      className={`graph-tab-btn ${graphTab === 'graph' ? 'active' : ''}`}
                      onClick={() => setGraphTab('graph')}
                    >
                      🕸️ Node Graph
                    </button>
                    <a
                      href={`https://graph.infortts.site/?tab=${graphTab}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="graph-open-external-btn"
                    >
                      Open Full ↗
                    </a>
                  </div>
                </div>

                <div className="graph-iframe-viewport">
                  <iframe
                    src={`/api/graph-proxy?tab=${graphTab}`}
                    title="Live Codebase Memory Graph"
                    className="graph-live-iframe"
                    loading="lazy"
                    allow="fullscreen"
                  />
                </div>
              </div>
            ) : (
              <MemoryGraph3D
                onSelectNode={(node) => {
                  setSelected3DNode(node);
                  if (node.id === 'mitochondria') setExpandedSystem('mitochondria');
                  else if (node.id === 'meeseeks') setExpandedSystem('meeseeks');
                  else if (node.id === 'roost') setExpandedSystem('roost');
                  else if (node.id === 'bighit_cloud' || node.id === 'bighit') setExpandedSystem('bighit');
                }}
                activeNode={selected3DNode}
              />
            )}
          </div>

          {/* Selected Node Technical Telemetry Box (Only shown in 3D mode) */}
          {topologyViewMode === '3d' && (
            <div className="node-telemetry-box">
              <div className="node-telemetry-header">
                <div>
                  <span className="node-sys-id">
                    {selected3DNode ? (selected3DNode.type === 'project' ? 'PRODUCTION SYSTEM' : 'TECHNICAL STACK NODE') : 'SYSTEM COMPONENT'}
                  </span>
                  <h4 className="node-title">{selected3DNode ? selected3DNode.label : 'Mitochondria Trading Engine'}</h4>
                </div>
                <span className="node-status-pill">{selected3DNode?.status?.toUpperCase() || 'ACTIVE'}</span>
              </div>
              <div className="node-meta-grid">
                <div className="node-meta-item">
                  <span className="meta-label">Project Category:</span>
                  <span className="meta-val">{selected3DNode ? (selected3DNode.type === 'project' ? 'Production System' : 'Core Technology') : 'Financial Trading Infrastructure'}</span>
                </div>
                <div className="node-meta-item">
                  <span className="meta-label">Primary Function:</span>
                  <span className="meta-val">{selected3DNode ? selected3DNode.desc : 'Real-time order execution & container management'}</span>
                </div>
                <div className="node-meta-item full-width">
                  <span className="meta-label">Technical Highlights:</span>
                  <span className="meta-val highlight">{selected3DNode ? selected3DNode.details : 'Sub-millisecond execution latency, private network isolation, and automated risk enforcement.'}</span>
                </div>
                {selected3DNode?.link && (
                  <div className="node-meta-item full-width">
                    <span className="meta-label">Direct Endpoint:</span>
                    <a href={selected3DNode.link} target="_blank" rel="noopener noreferrer" className="node-link-pill">
                      {selected3DNode.link} ↗
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Technical Competencies Matrix Summary */}
          <div className="competencies-matrix-card">
            <h3 className="matrix-title">Technical Competencies & Stack</h3>
            
            <div className="matrix-group">
              <span className="matrix-group-label">Languages:</span>
              <p className="matrix-group-content">Go (Golang), Python, TypeScript / JavaScript, Dart (Flutter), SQL, C++</p>
            </div>

            <div className="matrix-group">
              <span className="matrix-group-label">Backend & Distributed Messaging:</span>
              <p className="matrix-group-content">REST APIs, gRPC, WebSockets, NATS JetStream, Redis, Event-Driven Architecture</p>
            </div>

            <div className="matrix-group">
              <span className="matrix-group-label">AI & Autonomous Systems:</span>
              <p className="matrix-group-content">Multi-Agent Orchestration, Model Context Protocol (MCP), Qdrant Vector Search, Prompt Optimization</p>
            </div>

            <div className="matrix-group">
              <span className="matrix-group-label">Cloud Infrastructure & DevOps:</span>
              <p className="matrix-group-content">Kubernetes (AWS EKS), Docker, Terraform (IaC), AWS, Google Cloud Platform, GitOps CI/CD</p>
            </div>
          </div>
        </aside>
      </main>

      {/* 4. ABOUT, BIRTH YEAR 2002, REAL COMPANIES & CAPABILITIES SECTION */}
      <AboutCapabilitiesSection
        onOpenPhoneCall={onOpenPhoneCall}
        onOpenSayHi={() => setIsSayHiOpen(true)}
      />

      {/* 5. SLIDE-UP COME SAY HI BANNER MODAL */}
      <ComeSayHiModal
        isOpen={isSayHiOpen}
        onClose={() => setIsSayHiOpen(false)}
        onOpenPhoneCall={onOpenPhoneCall}
      />
    </div>
  );
};
