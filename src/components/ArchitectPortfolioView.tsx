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
              <span className="deck-feeds-badge">{inforttsFeedsCount}+ Telemetry Feeds Active</span>
            </div>
            <h1 className="deck-name">SAHIL RATHEE</h1>
            <p className="deck-headline">Senior Software Engineer & Distributed AI Systems Architect</p>
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
          🌐 All Production Systems (4)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'mitochondria' ? 'active' : ''}`}
          onClick={() => { setActiveTab('mitochondria'); setExpandedSystem('mitochondria'); }}
        >
          ⚡ Mitochondria (Forex HFT Workstation)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'meeseeks' ? 'active' : ''}`}
          onClick={() => { setActiveTab('meeseeks'); setExpandedSystem('meeseeks'); }}
        >
          🤖 Meeseeks (Autonomous AI Swarms)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'roost' ? 'active' : ''}`}
          onClick={() => { setActiveTab('roost'); setExpandedSystem('roost'); }}
        >
          🏢 Roost & Rent1st (Escrow Ledger SaaS)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'bighit' ? 'active' : ''}`}
          onClick={() => { setActiveTab('bighit'); setExpandedSystem('bighit'); }}
        >
          ☁️ BigHit Sportz (K8s Modernization)
        </button>
      </nav>

      {/* 3. MAIN COMMAND GRID: 4 SYSTEMS CARDS & INTERACTIVE TOPOLOGY */}
      <main className="deck-main-layout">
        {/* Left Column: Deep Production Systems Cards */}
        <section className="systems-stream-section">
          <div className="section-header-row">
            <h2 className="deck-section-title">Flagship Production Systems</h2>
            <span className="deck-section-hint">Click any system to inspect technical architecture</span>
          </div>

          <div className="systems-cards-stack">
            {/* SYSTEM 1: MITOCHONDRIA */}
            <article 
              className={`system-spec-card ${expandedSystem === 'mitochondria' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'mitochondria' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('mitochondria')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">DISTRIBUTED FOREX TRADING & LOW-LATENCY IPC</span>
                  <h3 className="spec-title">⚡ MITOCHONDRIA</h3>
                  <span className="spec-subtitle">Autonomous Forensic Trading Workstation & Live Telemetry RingBuffer Pipeline</span>
                </div>
                <div className="spec-metrics-pill highlight-cyan">
                  <span>&lt;0.7ms Execution</span>
                  <small>40+ Asset Streams</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Engineered a high-frequency algorithmic trade execution workstation interfacing directly with MetaTrader 5 (MT5). 
                  Constructed custom lock-free memory ring buffers and low-latency C++/Python pipelines, broadcasting zero-loss 
                  tick streams via NATS JetStream to real-time vector analysis clusters powered by Qdrant.
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>⚡ Sub-Millisecond Execution:</b> In-memory ring buffer architecture bypassing OS thread scheduler delays for microsecond latency.
                  </div>
                  <div className="highlight-item">
                    <b>📡 NATS JetStream Telemetry:</b> Zero-loss pub/sub messaging maintaining 100k msg/sec throughput under extreme market volatility.
                  </div>
                  <div className="highlight-item">
                    <b>🧠 Vectorized Market Analytics:</b> Qdrant vector memory matching live price action patterns with 1536-dimensional historical embeddings.
                  </div>
                </div>

                <div className="spec-tech-tags">
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">C++</span>
                  <span className="tech-badge">MetaTrader 5 API</span>
                  <span className="tech-badge">NATS JetStream</span>
                  <span className="tech-badge">Qdrant Vector DB</span>
                  <span className="tech-badge">Lock-Free RingBuffers</span>
                  <span className="tech-badge">WebSockets</span>
                  <span className="tech-badge">Flutter Desktop</span>
                </div>

                <div className="spec-card-actions">
                  <Link to="/work/mitochondria" className="spec-case-study-btn" onClick={(e) => e.stopPropagation()}>
                    Explore Technical Case Study (Shelby Kho Format) →
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
                  <span className="spec-category-tag">AUTONOMOUS MULTI-AGENT SWARMS</span>
                  <h3 className="spec-title">🤖 MEESEEKS AGENT ENGINE</h3>
                  <span className="spec-subtitle">Hierarchical Autonomous Multi-Agent AI Orchestration Engine</span>
                </div>
                <div className="spec-metrics-pill highlight-purple">
                  <span>-70% RAG Cost</span>
                  <small>Autonomous CI/CD</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Architected a self-evolving multi-agent swarm framework where a supervisor LLM orchestrates specialized sub-agents 
                  equipped with domain-specific toolsets (Playwright headless browsing, AST-level codebase refactoring, and sandbox execution).
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>🎯 70% Token Cost Reduction:</b> Implemented semantic context deduplication and AST pruning before prompt injection.
                  </div>
                  <div className="highlight-item">
                    <b>🛠️ Automated Tool Calling:</b> Dynamic MCP tool protocol dispatch enabling subagents to inspect databases, run tests, and deploy builds.
                  </div>
                  <div className="highlight-item">
                    <b>🛡️ Self-Healing CI/CD:</b> Automated syntax and lint verification loops correcting errors before code is finalized.
                  </div>
                </div>

                <div className="spec-tech-tags">
                  <span className="tech-badge">Python</span>
                  <span className="tech-badge">FastAPI</span>
                  <span className="tech-badge">LangChain</span>
                  <span className="tech-badge">Playwright</span>
                  <span className="tech-badge">Model Context Protocol</span>
                  <span className="tech-badge">Docker Sandboxes</span>
                </div>

                <div className="spec-card-actions">
                  <Link to="/work/meeseeks" className="spec-case-study-btn" onClick={(e) => e.stopPropagation()}>
                    Explore Technical Case Study (Shelby Kho Format) →
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
                  <span className="spec-category-tag">HIGH-CONCURRENCY FINTECH SAAS & ESCROW</span>
                  <h3 className="spec-title">🏢 ROOST & RENT1ST ESCROW</h3>
                  <span className="spec-subtitle">Multi-Tenant Property Management SaaS & Financial Escrow Ledger</span>
                </div>
                <div className="spec-metrics-pill highlight-emerald">
                  <span>99.99% Uptime</span>
                  <small>Automated Escrow</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Designed and built a multi-tenant property management platform handling millions in automated escrow transactions. 
                  Engineered concurrent Go microservices with strict idempotent double-entry ledger bookkeeping.
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>💰 ACID Double-Entry Accounting:</b> Guaranteed financial consistency with PostgreSQL advisory locks and serializable transactions.
                  </div>
                  <div className="highlight-item">
                    <b>🧾 GST-Compliant Reconciliation:</b> Automated real-time invoice generation and bank gateway reconciliation.
                  </div>
                  <div className="highlight-item">
                    <b>📱 Cross-Platform Architecture:</b> Flutter frontend backed by high-concurrency Go REST & WebSocket microservices.
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
                    Explore Technical Case Study (Shelby Kho Format) →
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
                  <span className="spec-category-tag">CLOUD INFRASTRUCTURE & MULTI-SPORT PLATFORM</span>
                  <h3 className="spec-title">☁️ BIGHIT SPORTZ FOUNDRY</h3>
                  <span className="spec-subtitle">High-Availability Kubernetes Cluster & Declarative Infrastructure as Code</span>
                </div>
                <div className="spec-metrics-pill highlight-blue">
                  <span>-80% Footprint</span>
                  <small>Zero Downtime</small>
                </div>
              </div>

              <div className="spec-body">
                <p className="spec-summary">
                  Executed complete cloud infrastructure migration and modernization across AWS and Kubernetes. Designed modular 
                  Terraform templates, deployed containerized microservices, and instituted automated canary rollouts.
                </p>

                <div className="spec-highlights-list">
                  <div className="highlight-item">
                    <b>📦 80% Bundle Size Cut:</b> Re-architected multi-stage Docker builds and eliminated heavy legacy runtimes.
                  </div>
                  <div className="highlight-item">
                    <b>🚀 60% Server Cost Efficiency:</b> Replaced over-provisioned VMs with Kubernetes autoscaling nodes (KEDA/HPA).
                  </div>
                  <div className="highlight-item">
                    <b>🔒 Infrastructure as Code:</b> 100% reproducible AWS environments managed via Terraform and GitOps.
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
                    Explore Technical Case Study (Shelby Kho Format) →
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
              <h2 className="deck-section-title">Live Architecture Topology</h2>
              <span className="deck-section-hint">
                {topologyViewMode === 'graph'
                  ? 'Visual Codebase Knowledge Graph & Real-Time Stats (graph.infortts.site)'
                  : 'Drag to rotate 3D particle sphere • Click node for telemetry'}
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
                    {selected3DNode ? (selected3DNode.type === 'project' ? 'PRODUCTION PROJECT NODE' : 'ENGINEERING CAPABILITY NODE') : '3D SPATIAL VECTOR NODE'}
                  </span>
                  <h4 className="node-title">{selected3DNode ? selected3DNode.label : 'Mitochondria Forensics'}</h4>
                </div>
                <span className="node-status-pill">{selected3DNode?.status?.toUpperCase() || 'ACTIVE'}</span>
              </div>
              <div className="node-meta-grid">
                <div className="node-meta-item">
                  <span className="meta-label">Classification:</span>
                  <span className="meta-val">{selected3DNode ? (selected3DNode.type === 'project' ? 'Production System' : 'Core Technology') : 'Algorithmic Forex System'}</span>
                </div>
                <div className="node-meta-item">
                  <span className="meta-label">Operational Role:</span>
                  <span className="meta-val">{selected3DNode ? selected3DNode.desc : 'Forex Tick Ingestion & Lock-Free RingBuffers'}</span>
                </div>
                <div className="node-meta-item full-width">
                  <span className="meta-label">Architecture Invariants:</span>
                  <span className="meta-val highlight">{selected3DNode ? selected3DNode.details : 'Nanosecond-latency execution pipeline with zero-loss NATS JetStream and Qdrant vector memory analytics.'}</span>
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
            <h3 className="matrix-title">Core Competency Matrix</h3>
            
            <div className="matrix-group">
              <span className="matrix-group-label">Languages:</span>
              <p className="matrix-group-content">Python, Go (Golang), TypeScript / JavaScript, Dart (Flutter), SQL, C++</p>
            </div>

            <div className="matrix-group">
              <span className="matrix-group-label">Distributed Systems & Messaging:</span>
              <p className="matrix-group-content">NATS JetStream, Lock-Free RingBuffers, WebSockets, gRPC, Event-Driven Architecture</p>
            </div>

            <div className="matrix-group">
              <span className="matrix-group-label">AI & Autonomous Agents:</span>
              <p className="matrix-group-content">Multi-Agent Swarms, Model Context Protocol (MCP), Qdrant Vector Search, RAG Optimization, Tool Calling</p>
            </div>

            <div className="matrix-group">
              <span className="matrix-group-label">Cloud & Infrastructure:</span>
              <p className="matrix-group-content">Kubernetes (EKS), Docker, Terraform (IaC), AWS, Google Cloud Platform, GitOps CI/CD</p>
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
