import React, { useState, useEffect, useRef } from 'react';

interface ArchitectPortfolioViewProps {
  onOpenPhoneCall: () => void;
  inforttsFeedsCount?: number;
}

interface SystemNode {
  id: string;
  systemId: string;
  label: string;
  role: string;
  x: number;
  y: number;
  tech: string;
  metric: string;
  status: 'active' | 'syncing' | 'healthy';
}

interface SystemConnection {
  from: string;
  to: string;
  protocol: string;
  bandwidth: string;
}

const TOPOLOGY_NODES: SystemNode[] = [
  // Zenith System (Distributed Trading)
  { id: 'mt5', systemId: 'zenith', label: 'MT5 Feed Gateway', role: 'Tick ingestion', x: 120, y: 80, tech: 'C++ / MT5 API', metric: '40+ Asset Streams', status: 'active' },
  { id: 'ringbuf', systemId: 'zenith', label: 'RingBuffer Core', role: 'In-memory queue', x: 280, y: 80, tech: 'Lock-Free Memory', metric: '<0.4ms Latency', status: 'healthy' },
  { id: 'nats', systemId: 'zenith', label: 'NATS JetStream', role: 'Zero-loss streaming', x: 440, y: 80, tech: 'NATS / Go', metric: '100k msg/sec', status: 'active' },
  { id: 'qdrant', systemId: 'zenith', label: 'Qdrant Vector DB', role: 'Market pattern search', x: 600, y: 80, tech: 'Rust / Vector Index', metric: '1536-dim Cosine', status: 'healthy' },

  // Meeseeks System (Autonomous AI)
  { id: 'supervisor', systemId: 'meeseeks', label: 'Supervisor LLM', role: 'Task decomposition', x: 120, y: 190, tech: 'LangChain / Python', metric: 'AST Verification', status: 'active' },
  { id: 'router', systemId: 'meeseeks', label: 'Tool Dispatcher', role: 'Subagent orchestration', x: 280, y: 190, tech: 'FastAPI / MCP', metric: '-70% Token Cut', status: 'healthy' },
  { id: 'agents', systemId: 'meeseeks', label: 'Agent Swarm', role: 'Parallel execution', x: 440, y: 190, tech: 'Python / Playwright', metric: 'Autonomous CI/CD', status: 'active' },
  { id: 'verifier', systemId: 'meeseeks', label: 'Eval Engine', role: 'Self-healing validation', x: 600, y: 190, tech: 'PyTest / Sandbox', metric: '100% Deterministic', status: 'healthy' },

  // Roost System (Multi-Tenant Escrow)
  { id: 'client', systemId: 'roost', label: 'Mobile Client', role: 'Tenant app', x: 120, y: 300, tech: 'Flutter / Dart', metric: 'iOS / Android', status: 'healthy' },
  { id: 'go_api', systemId: 'roost', label: 'Go Escrow Core', role: 'Business invariants', x: 280, y: 300, tech: 'Go (Golang)', metric: 'High-Concurrency', status: 'active' },
  { id: 'postgres', systemId: 'roost', label: 'Double Ledger', role: 'ACID transaction store', x: 440, y: 300, tech: 'PostgreSQL / SQL', metric: '99.99% Reliability', status: 'healthy' },
  { id: 'redis', systemId: 'roost', label: 'Redis Cache', role: 'Session & state cache', x: 600, y: 300, tech: 'In-Memory Key/Val', metric: '<1ms Cache Hit', status: 'active' },

  // BigHit Cloud (K8s Modernization)
  { id: 'edge', systemId: 'bighit', label: 'Edge Gateway', role: 'TLS termination & WAF', x: 120, y: 410, tech: 'Cloudflare / NGINX', metric: 'DDoS Shielded', status: 'active' },
  { id: 'eks', systemId: 'bighit', label: 'AWS EKS Cluster', role: 'Container orchestration', x: 280, y: 410, tech: 'Kubernetes 1.30', metric: 'Zero Downtime', status: 'healthy' },
  { id: 'terraform', systemId: 'bighit', label: 'Terraform IaC', role: 'Declarative infra', x: 440, y: 410, tech: 'HCL / AWS API', metric: '100% Automated', status: 'healthy' },
  { id: 'mon', systemId: 'bighit', label: 'Observability', role: 'Metrics & telemetry', x: 600, y: 410, tech: 'Prometheus / Grafana', metric: '-80% Footprint', status: 'active' },
];

const TOPOLOGY_CONNECTIONS: SystemConnection[] = [
  { from: 'mt5', to: 'ringbuf', protocol: 'Direct IPC', bandwidth: '<0.1ms' },
  { from: 'ringbuf', to: 'nats', protocol: 'TCP / NATS', bandwidth: '100k/s' },
  { from: 'nats', to: 'qdrant', protocol: 'gRPC / Proto3', bandwidth: 'Vector Stream' },

  { from: 'supervisor', to: 'router', protocol: 'JSON-RPC', bandwidth: 'Task Graph' },
  { from: 'router', to: 'agents', protocol: 'Async Workers', bandwidth: 'Tool Calls' },
  { from: 'agents', to: 'verifier', protocol: 'IPC / Git', bandwidth: 'Diff Audit' },

  { from: 'client', to: 'go_api', protocol: 'HTTPS / REST', bandwidth: 'TLS 1.3' },
  { from: 'go_api', to: 'postgres', protocol: 'pgx / Pool', bandwidth: 'ACID Commit' },
  { from: 'go_api', to: 'redis', protocol: 'RESP protocol', bandwidth: '<1ms Sync' },

  { from: 'edge', to: 'eks', protocol: 'ALB Ingress', bandwidth: 'Load Balanced' },
  { from: 'eks', to: 'terraform', protocol: 'GitOps / Argo', bandwidth: 'State Locked' },
  { from: 'eks', to: 'mon', protocol: 'OpenTelemetry', bandwidth: 'Real-time' },
];

export const ArchitectPortfolioView: React.FC<ArchitectPortfolioViewProps> = ({
  onOpenPhoneCall,
  inforttsFeedsCount = 40,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'zenith' | 'meeseeks' | 'roost' | 'bighit'>('all');
  const [selectedNode, setSelectedNode] = useState<SystemNode | null>(TOPOLOGY_NODES[0]);
  const [expandedSystem, setExpandedSystem] = useState<string | null>('zenith');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated packet flow on the architecture canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw connection lines
      TOPOLOGY_CONNECTIONS.forEach((conn) => {
        const fromNode = TOPOLOGY_NODES.find((n) => n.id === conn.from);
        const toNode = TOPOLOGY_NODES.find((n) => n.id === conn.to);
        if (!fromNode || !toNode) return;

        const isFiltered = activeTab !== 'all' && fromNode.systemId !== activeTab;
        const alpha = isFiltered ? 0.12 : 0.45;

        // Base line
        ctx.strokeStyle = `rgba(0, 210, 255, ${alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Pulsing data packet along the connection
        if (!isFiltered) {
          const progress = (t + Math.sin(fromNode.x)) % 1;
          const px = fromNode.x + (toNode.x - fromNode.x) * progress;
          const py = fromNode.y + (toNode.y - fromNode.y) * progress;

          ctx.fillStyle = '#00d2ff';
          ctx.shadowColor = '#00d2ff';
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(px, py, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw nodes
      TOPOLOGY_NODES.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const isFiltered = activeTab !== 'all' && node.systemId !== activeTab;
        const alpha = isFiltered ? 0.25 : 1.0;

        ctx.globalAlpha = alpha;

        // Node card background
        const w = 110;
        const h = 44;
        const nx = node.x - w / 2;
        const ny = node.y - h / 2;

        ctx.fillStyle = isSelected ? 'rgba(0, 210, 255, 0.2)' : 'rgba(15, 23, 42, 0.9)';
        ctx.strokeStyle = isSelected ? '#00d2ff' : 'rgba(0, 210, 255, 0.3)';
        ctx.lineWidth = isSelected ? 2 : 1;

        ctx.beginPath();
        ctx.roundRect(nx, ny, w, h, 6);
        ctx.fill();
        ctx.stroke();

        // Node label
        ctx.font = 'bold 9px "Agave Nerd Font", "agave", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y - 4);

        // Node metric
        ctx.font = '8px "Agave Nerd Font", "agave", monospace';
        ctx.fillStyle = '#10b981';
        ctx.fillText(node.metric, node.x, node.y + 10);

        ctx.globalAlpha = 1.0;
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, selectedNode]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;

    // Check hit test
    for (const node of TOPOLOGY_NODES) {
      if (Math.abs(clickX - node.x) < 55 && Math.abs(clickY - node.y) < 22) {
        setSelectedNode(node);
        setExpandedSystem(node.systemId);
        break;
      }
    }
  };

  return (
    <div className="portfolio-command-deck">
      {/* 1. TOP HEADER & IDENTITY STRIP */}
      <header className="deck-header">
        <div className="deck-identity">
          <img src="/sahil.png" alt="Sahil Rathee" className="deck-avatar" />
          <div className="deck-bio">
            <div className="deck-badge-row">
              <span className="live-status-dot" />
              <span className="deck-status-text">AVAILABLE FOR SENIOR / STAFF ROLES • NEW DELHI</span>
              <span className="deck-feeds-badge">{inforttsFeedsCount}+ Telemetry Feeds Active</span>
            </div>
            <h1 className="deck-name">SAHIL RATHEE</h1>
            <p className="deck-headline">Senior Software Engineer & Distributed AI Systems Architect</p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="deck-actions">
          <button type="button" className="deck-cta-btn primary" onClick={onOpenPhoneCall}>
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
          className={`deck-tab-btn ${activeTab === 'zenith' ? 'active' : ''}`}
          onClick={() => { setActiveTab('zenith'); setExpandedSystem('zenith'); }}
        >
          ⚡ Zenith (Forex Algorithmic Workstation)
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
          🏢 Roost (Escrow Ledger SaaS)
        </button>
        <button
          type="button"
          className={`deck-tab-btn ${activeTab === 'bighit' ? 'active' : ''}`}
          onClick={() => { setActiveTab('bighit'); setExpandedSystem('bighit'); }}
        >
          ☁️ BigHit Cloud (K8s Modernization)
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
            {/* SYSTEM 1: ZENITH */}
            <article 
              className={`system-spec-card ${expandedSystem === 'zenith' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'zenith' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('zenith')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">DISTRIBUTED FOREX TRADING</span>
                  <h3 className="spec-title">⚡ ZENITH & MITOCHONDRIA</h3>
                  <span className="spec-subtitle">Autonomous Forensic Trading Workstation & Live Telemetry Pipeline</span>
                </div>
                <div className="spec-metrics-pill highlight-cyan">
                  <span>&lt;1ms Execution</span>
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
                  <span className="tech-badge">MetaTrader 5 API</span>
                  <span className="tech-badge">NATS JetStream</span>
                  <span className="tech-badge">Qdrant Vector DB</span>
                  <span className="tech-badge">Lock-Free RingBuffers</span>
                  <span className="tech-badge">WebSockets</span>
                  <span className="tech-badge">Flutter Desktop</span>
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
                  <h3 className="spec-title">🤖 MEESEEKS</h3>
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
              </div>
            </article>

            {/* SYSTEM 3: ROOST */}
            <article 
              className={`system-spec-card ${expandedSystem === 'roost' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'roost' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('roost')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">HIGH-CONCURRENCY FINTECH SAAS</span>
                  <h3 className="spec-title">🏢 ROOST ESCROW PLATFORM</h3>
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
              </div>
            </article>

            {/* SYSTEM 4: BIGHIT CLOUD */}
            <article 
              className={`system-spec-card ${expandedSystem === 'bighit' ? 'expanded' : ''} ${activeTab !== 'all' && activeTab !== 'bighit' ? 'dimmed' : ''}`}
              onClick={() => setExpandedSystem('bighit')}
            >
              <div className="spec-card-header">
                <div className="spec-title-group">
                  <span className="spec-category-tag">CLOUD INFRASTRUCTURE MODERNIZATION</span>
                  <h3 className="spec-title">☁️ BIGHIT CLOUD FOUNDRY</h3>
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
              </div>
            </article>
          </div>
        </section>

        {/* Right Column: Interactive Architecture Topology & Node Inspector */}
        <aside className="topology-sidebar-section">
          <div className="section-header-row">
            <h2 className="deck-section-title">Live Architecture Topology</h2>
            <span className="deck-section-hint">Click any node to inspect telemetry</span>
          </div>

          <div className="topology-canvas-container">
            <canvas
              ref={canvasRef}
              width={720}
              height={480}
              className="topology-canvas"
              onClick={handleCanvasClick}
            />
          </div>

          {/* Selected Node Technical Telemetry Box */}
          {selectedNode && (
            <div className="node-telemetry-box">
              <div className="node-telemetry-header">
                <div>
                  <span className="node-sys-id">{selectedNode.systemId.toUpperCase()} ARCHITECTURE NODE</span>
                  <h4 className="node-title">{selectedNode.label}</h4>
                </div>
                <span className="node-status-pill">{selectedNode.status.toUpperCase()}</span>
              </div>
              <div className="node-meta-grid">
                <div className="node-meta-item">
                  <span className="meta-label">Primary Tech:</span>
                  <span className="meta-val">{selectedNode.tech}</span>
                </div>
                <div className="node-meta-item">
                  <span className="meta-label">Operational Role:</span>
                  <span className="meta-val">{selectedNode.role}</span>
                </div>
                <div className="node-meta-item">
                  <span className="meta-label">Benchmark:</span>
                  <span className="meta-val highlight">{selectedNode.metric}</span>
                </div>
                <div className="node-meta-item">
                  <span className="meta-label">Protocol:</span>
                  <span className="meta-val">Lock-free / gRPC / TCP</span>
                </div>
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

      {/* 4. FOOTER STATUS BAR */}
      <footer className="deck-footer-bar">
        <div className="footer-status-left">
          <span>⚡ Infortts Production Cluster Online</span>
          <span>•</span>
          <span>Architect: Sahil Rathee (+91 9625213480)</span>
          <span>•</span>
          <span>Typography: Agave Nerd Font</span>
        </div>
        <div className="footer-links-right">
          <button type="button" className="footer-call-trigger" onClick={onOpenPhoneCall}>
            📞 Direct Call with Sahil
          </button>
        </div>
      </footer>
    </div>
  );
};
