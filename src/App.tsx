import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GameOfLifeBackground } from './components/GameOfLifeBackground';
import { QuantumSpacetimeMap } from './components/QuantumSpacetimeMap';
import { PhoneCallModal } from './components/PhoneCallModal';
import { ConwayCoOpGame } from './components/ConwayCoOpGame';
import { ThreeB1BOrbitalGame } from './components/ThreeB1BOrbitalGame';
import { MemoryGraph3D, GraphNode, INITIAL_NODES } from './components/MemoryGraph3D';

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [graphViewMode, setGraphViewMode] = useState<'3d' | 'list'>('3d');
  const [activeFilter, setActiveFilter] = useState<'all' | 'project' | 'skill'>('all');
  const [inforttsHealth, setInforttsHealth] = useState<{ activeFeedsCount: number; status: string } | null>(null);

  useEffect(() => {
    fetch('/api/infortts?action=health')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.telemetry && Array.isArray(data.telemetry.m5_loaded)) {
          setInforttsHealth({
            activeFeedsCount: data.telemetry.m5_loaded.length,
            status: 'Operational'
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleSelectNodeById = useCallback((id: string) => {
    const node = INITIAL_NODES.find(n => n.id === id);
    if (node) {
      setSelectedNode({
        ...node,
        x: 0, y: 0, z: 0
      } as GraphNode);
      document.getElementById('knowledge-graph-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const [messages, setMessages] = useState<{ sender: 'user' | 'system', text: string, time: string }[]>([
    { 
      sender: 'system', 
      text: "Hi, I am Sahil's AI assistant. Ask me about his architecture work, financial engineering, distributed cloud infrastructure, or agentic AI workflows.", 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input when chat modal opens & support Escape key
  useEffect(() => {
    if (chatOpen) {
      setTimeout(() => chatInputRef.current?.focus(), 150);
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setChatOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [chatOpen]);

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg = queryText.trim();
    setInputVal('');
    
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setIsTyping(true);

    const clientNow = new Date();
    const fullTimeStr = clientNow.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg,
          clientTime: fullTimeStr,
          timeZone: userTimeZone
        })
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'system', 
          text: data.reply || "Sahil is a Senior Software Engineer & AI Architect with 4+ years of experience across Financial Systems Engineering, Scalable Cloud Infrastructure, and Agentic AI workflows.", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsTyping(false);
      }, 400);
    } catch {
      setTimeout(() => {
        const lower = userMsg.toLowerCase();
        let fallbackReply = "Sahil is a Senior Software Engineer & AI Architect specializing in Financial Systems, Distributed Cloud Infrastructure, and Agentic AI workflows. Feel free to explore the interactive 3D architecture graph, play the 3Blue1Brown orbital simulator, or download his resume above!";
        
        if (lower.includes("time") || lower.includes("date") || lower.includes("clock")) {
          fallbackReply = `The current time is ${fullTimeStr} (${userTimeZone}). How can I help you explore Sahil's systems architecture or background?`;
        } else if (lower.includes("contact") || lower.includes("hire") || lower.includes("email") || lower.includes("phone")) {
          fallbackReply = "You can reach Sahil directly via email at sahil.artits.rathee@gmail.com or by phone at +91 9625213480.";
        } else if (lower.includes("resume") || lower.includes("cv")) {
          fallbackReply = "You can download Sahil's ATS-optimized resume directly using the 'Download Resume PDF' button in the header.";
        } else if (lower.includes("zenith") || lower.includes("mitochondria") || lower.includes("trading")) {
          fallbackReply = "Zenith & Mitochondria is Sahil's algorithmic trading pipeline featuring MetaTrader 5 integration, sub-millisecond in-memory ring buffers, vector market analytics, and NATS JetStream telemetry.";
        } else if (lower.includes("agent") || lower.includes("meeseeks") || lower.includes("swarm")) {
          fallbackReply = "Meeseeks is an autonomous AI agent swarm handling task planning, automated code refactoring, tool dispatch, and live deployments with 70% reduced RAG token overhead.";
        } else if (lower.includes("game") || lower.includes("3b1b") || lower.includes("orbital")) {
          fallbackReply = "The 3Blue1Brown orbital mechanics simulator above demonstrates real Newtonian n-body gravitation, slingshot vectors, and trajectory prediction! You can drag to set launch velocity and use Spacebar for thruster impulses.";
        }

        setMessages(prev => [...prev, { 
          sender: 'system', 
          text: fallbackReply, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsTyping(false);
      }, 400);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(inputVal);
  };

  const socials = [
    { name: 'GitHub', url: 'https://github.com/rttss-sahil', label: 'GitHub Profile (opens in new tab)' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rttss-sahil', label: 'LinkedIn Profile (opens in new tab)' },
    { name: 'X / Twitter', url: 'https://x.com/rttss_sahil', label: 'X / Twitter Profile (opens in new tab)' },
    { name: 'Organization', url: 'https://github.com/InforttsOrg', label: 'Infortts Organization on GitHub (opens in new tab)' },
  ];

  const featuredProjects = [
    {
      id: 'mitochondria',
      title: 'ZENITH & MITOCHONDRIA',
      subtitle: 'Autonomous Forensic Trading Workstation',
      desc: 'High-frequency algorithmic execution pipeline integrated with MetaTrader 5, NATS JetStream telemetry, real-time vector market analytics, and sub-millisecond in-memory ring buffers.',
      tags: ['Python', 'MetaTrader 5', 'NATS', 'Qdrant', 'WebSockets', 'Flutter']
    },
    {
      id: 'meeseeks',
      title: 'MEESEEKS',
      subtitle: 'Autonomous AI Agent Swarm',
      desc: 'Self-evolving multi-agent orchestration engine handling autonomous task planning, codebase refactoring, tool dispatch, and live deployments with 70% reduced RAG token overhead.',
      tags: ['Python', 'FastAPI', 'Playwright', 'LLMs', 'LangChain', 'Docker']
    },
    {
      id: 'roost',
      title: 'ROOST',
      subtitle: 'Multi-Tenant Property Management SaaS',
      desc: 'High-scale property & tenant management platform with automated payment escrow, GST-compliant financial ledger, and real-time transaction reconciliation.',
      tags: ['Flutter', 'Go', 'PostgreSQL', 'GCP', 'Redis', 'Docker']
    },
    {
      id: 'bighit_cloud',
      title: 'BIGHIT CLOUD',
      subtitle: 'Cloud Infrastructure Modernization',
      desc: 'High-availability Kubernetes and AWS IaC architecture that reduced application bundle footprint by 80% and increased server efficiency by 60% with zero downtime.',
      tags: ['AWS', 'Kubernetes', 'Terraform', 'Neptune', 'OpenSearch', 'NATS']
    }
  ];

  const skillsList = [
    'Go', 'Python', 'TypeScript', 'Dart / Flutter', 'Node.js', 'Next.js', 'Kubernetes', 
    'Terraform', 'Ansible', 'Jenkins', 'Podman / Docker', 'AWS / Serverless', 'PostgreSQL', 
    'MongoDB', 'Redis', 'Qdrant', 'NATS JetStream', 'Cocos Creator', 'GIS Systems'
  ];

  const quickPrompts = [
    "Architecture overview",
    "3B1B Orbital Game",
    "Zenith & Forensics",
    "Meeseeks Agent Swarm",
    "Contact & Availability"
  ];

  const resumeDocUrl = "https://docs.google.com/document/d/1cH4O32ABivQJ9m8zq35eX5fmPF60pcQVI9gA2JWdcEk/edit?usp=sharing";

  const filteredNodes = INITIAL_NODES.filter(n => {
    if (activeFilter === 'all') return true;
    return n.type === activeFilter;
  });

  return (
    <div className="portfolio-wrapper">
      {/* Living Accessible Cellular Background */}
      <GameOfLifeBackground />

      {/* Accessible Skip Link for Keyboard / Screen Reader Users */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="content-container">
        {/* Top Header Navigation */}
        <header role="banner" className="top-nav">
          <div className="status-indicator">
            <span className="live-dot" aria-hidden="true"></span>
            <span className="status-text">
              Sahil Rathee <span className="text-slate-500" aria-hidden="true">•</span>{' '}
              <span className="status-sub">Available for Senior & Staff Roles</span>
            </span>
            {inforttsHealth && (
              <span className="infortts-backend-badge" title="Live Shared Infortts Forensics Backend Telemetry">
                <span className="live-dot-cyan" aria-hidden="true"></span>
                <span>Infortts Shared API: <strong>{inforttsHealth.activeFeedsCount} Feeds Online</strong></span>
              </span>
            )}
          </div>

          <nav aria-label="Main Navigation" className="nav-links">
            <a href="#quantum-map-section" className="nav-link">
              Cosmic Map 🗺️
            </a>
            <a href="#featured-work-heading" className="nav-link">
              Systems
            </a>
            <a href="#conway-coop-section" className="nav-link">
              Conway Co-Op 🧬
            </a>
            <a href="#physics-game-section" className="nav-link">
              3B1B Game 🚀
            </a>
            <button
              type="button"
              onClick={() => setIsPhoneModalOpen(true)}
              className="schedule-call-nav-btn"
              aria-label="Open Schedule a Call with Sahil modal"
            >
              📞 Call Sahil
            </button>
            <a href="#knowledge-graph-section" className="nav-link">
              3D Graph ❖
            </a>
            {socials.map(s => (
              <a 
                key={s.name} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nav-link"
                aria-label={s.label}
              >
                {s.name}
              </a>
            ))}
            <a 
              href={resumeDocUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link"
              aria-label="Google Doc Resume (opens in new tab)"
            >
              Google Doc ↗
            </a>
            <a 
              href="/Sahil-Rathee-Resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="resume-btn"
              aria-label="Download Sahil Rathee Resume PDF (opens in new tab)"
            >
              Download Resume PDF ↗
            </a>
          </nav>
        </header>

        {/* Main Content Landmark */}
        <main id="main-content">
          {/* Hero Section with Prominent Portrait Showcase */}
          <section className="hero-section" aria-labelledby="hero-name-heading">
            <div className="hero-grid">
              {/* Left Column: Bio, Titles, Key Metrics */}
              <div className="hero-content-col">
                <div className="hero-heading-group">
                  <h1 id="hero-name-heading" className="hero-name">
                    SAHIL RATHEE
                  </h1>
                  <div className="badge-open" role="status" aria-label="Status: Open to Work">
                    <span className="badge-dot" aria-hidden="true"></span>
                    Open to Work
                  </div>
                </div>

                <p className="hero-role-title">
                  Senior Software Engineer & AI Architect
                </p>

                <p className="hero-bio">
                  Architecting resilient <strong>Financial Systems</strong>, high-throughput{' '}
                  <strong>Distributed Infrastructure</strong>, and autonomous <strong>Agentic AI Workflows</strong>. 
                  Specializing in low-latency event telemetry, in-memory execution engines, and multi-tenant cloud ecosystems.
                </p>

                {/* Quantitative Impact Highlights */}
                <div className="hero-stats-row" role="region" aria-label="Career Highlights">
                  <div className="stat-card">
                    <span className="stat-value">4+</span>
                    <span className="stat-label">Years Engineering</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">10+</span>
                    <span className="stat-label">Production Systems</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">80%</span>
                    <span className="stat-label">Bundle Footprint Cut</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">&lt; 1ms</span>
                    <span className="stat-label">In-Memory Buffers</span>
                  </div>
                </div>

                {/* Primary CTA Row */}
                <div className="hero-cta-row">
                  <a 
                    href="/Sahil-Rathee-Resume.pdf" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hero-primary-btn"
                    aria-label="Download ATS Resume PDF (opens in new tab)"
                  >
                    <span>Download Resume PDF</span>
                    <span aria-hidden="true">↗</span>
                  </a>

                  <a 
                    href="#physics-game-section" 
                    className="hero-secondary-btn"
                    aria-label="Play the 3Blue1Brown Orbital Mechanics Game"
                  >
                    <span>Play 3B1B Game</span>
                    <span aria-hidden="true">🚀</span>
                  </a>

                  <a 
                    href="#knowledge-graph-section" 
                    className="hero-tertiary-btn"
                    aria-label="Explore 3D Architecture and Skill Graph"
                  >
                    <span>Explore 3D Graph</span>
                    <span aria-hidden="true">❖</span>
                  </a>
                </div>

                {/* Skills Pill Row */}
                <div className="skills-container" aria-label="Key Technologies">
                  <span className="skills-heading">Core Stack:</span>
                  <div className="skills-pill-row">
                    {skillsList.map(skill => (
                      <span key={skill} className="skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Architectural Profile Card featuring Sahil's Picture */}
              <div className="hero-portrait-col">
                <div className="portrait-showcase-card">
                  {/* Glowing Ambient Halo */}
                  <div className="portrait-halo" aria-hidden="true"></div>
                  
                  {/* Image Frame with gradient stroke */}
                  <div className="portrait-frame">
                    <img 
                      src="/sahil.png" 
                      alt="Portrait of Sahil Rathee, Senior Software Engineer and AI Systems Architect" 
                      className="portrait-image"
                      loading="eager"
                      width="380"
                      height="380"
                    />
                    <div className="portrait-bottom-fade" aria-hidden="true"></div>
                  </div>

                  {/* Verified Meta Badge Card */}
                  <div className="portrait-badge-panel">
                    <div className="portrait-identity-row">
                      <div className="portrait-name-info">
                        <span className="portrait-name">Sahil Rathee</span>
                        <span className="portrait-tagline">Architect • Infortts Core Systems</span>
                      </div>
                      <span className="portrait-verified-check" title="Verified Architect" aria-label="Verified Profile">
                        ✓
                      </span>
                    </div>

                    <div className="portrait-meta-chips">
                      <span className="meta-chip">
                        <span className="meta-dot"></span> New Delhi, India
                      </span>
                      <span className="meta-chip">
                        <span className="meta-dot"></span> Staff / Senior Role
                      </span>
                      <span className="meta-chip">
                        <span className="meta-dot"></span> Full-Stack & AI
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Explorable Quantum Spacetime Cosmic Map */}
          <section className="section-block" id="quantum-map-section" aria-labelledby="quantum-map-heading">
            <div className="section-header">
              <span className="section-label">Interactive Quantum World Map</span>
              <h2 id="quantum-map-heading" className="section-title">Cosmic Map: Event Horizon Survival & Direct Connection</h2>
              <p className="section-desc">
                An interactive map of Sahil's engineering universe. Navigate your character across 3D quantum spacetime fluctuations, 
                evade project black hole event horizons (the more time you stay away is your highscore), and run to the Phone Booth to schedule a direct call with Sahil!
              </p>
            </div>

            <QuantumSpacetimeMap onOpenPhoneCall={() => setIsPhoneModalOpen(true)} />
          </section>

          {/* Featured Production Systems */}
          <section className="section-block" aria-labelledby="featured-work-heading">
            <div className="section-header">
              <span className="section-label">Selected Work</span>
              <h2 id="featured-work-heading" className="section-title">Production Systems & Architecture</h2>
              <p className="section-desc">
                High-scale engineering initiatives architected across algorithmic financial engineering, 
                real-time telemetry streaming, and autonomous multi-agent swarms.
              </p>
            </div>

            <div className="cards-grid">
              {featuredProjects.map(proj => (
                <div 
                  key={proj.id} 
                  className="project-card"
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectNodeById(proj.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectNodeById(proj.id);
                    }
                  }}
                  aria-label={`Explore ${proj.title} architecture details in the 3D topology`}
                >
                  <div className="card-top">
                    <div>
                      <h3 className="card-title">{proj.title}</h3>
                      <p className="card-subtitle">{proj.subtitle}</p>
                    </div>
                    <span className="card-explore-hint" aria-hidden="true">Explore ↗</span>
                  </div>
                  <p className="card-desc">{proj.desc}</p>
                  <div className="tags-row" aria-label="Technologies used">
                    {proj.tags.map(t => (
                      <span key={t} className="tag-chip">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conway Co-Op: Cellular Entropy Defense Simulator */}
          <section className="section-block" id="conway-coop-section" aria-labelledby="conway-coop-heading">
            <div className="section-header">
              <span className="section-label">Accessible Cellular Automata & Multi-Agent Defense</span>
              <h2 id="conway-coop-heading" className="section-title">Conway Co-Op: Cellular Entropy Defense</h2>
              <p className="section-desc">
                A collaborative multiplayer cellular automaton survival simulator. Team up in real-time with an adaptive AI Co-Pilot 
                or in 2-player hotseat to defend the endangered Core Colony Beacons from encroaching cosmic entropy waves.
              </p>
            </div>

            <ConwayCoOpGame />
          </section>

          {/* 3Blue1Brown Real-World Orbital Physics Game */}
          <section className="section-block" id="physics-game-section" aria-labelledby="physics-game-heading">
            <div className="section-header">
              <span className="section-label">3Blue1Brown Mathematical Physics</span>
              <h2 id="physics-game-heading" className="section-title">Orbital Mechanics: Real-World Slingshot Simulator</h2>
              <p className="section-desc">
                An interactive celestial mechanics game rendered with 3Blue1Brown open-source mathematical aesthetics. 
                Utilize real Newtonian gravity, trajectory prediction, and planetary slingshot maneuvers to dock probes across deep space.
              </p>
            </div>

            <ThreeB1BOrbitalGame />
          </section>

          {/* Interactive Knowledge & Skill Graph */}
          <section className="section-block" id="knowledge-graph-section" aria-labelledby="graph-section-heading">
            <div className="section-header flex-header">
              <div>
                <span className="section-label">System Architecture</span>
                <h2 id="graph-section-heading" className="section-title">Interactive Knowledge & Skill Graph</h2>
                <p className="section-desc">
                  Explore architecture modules, codebase paths, and live metrics in 3D or through the accessible directory view.
                </p>
              </div>

              {/* View Toggle Bar (3D Canvas vs Accessible Directory) */}
              <div className="view-toggle-bar" role="group" aria-label="Graph Display Modes">
                <button 
                  type="button"
                  className={`toggle-view-btn ${graphViewMode === '3d' ? 'active' : ''}`}
                  onClick={() => setGraphViewMode('3d')}
                  aria-pressed={graphViewMode === '3d'}
                >
                  <span aria-hidden="true">❖</span> 3D Spatial Topology
                </button>
                <button 
                  type="button"
                  className={`toggle-view-btn ${graphViewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setGraphViewMode('list')}
                  aria-pressed={graphViewMode === 'list'}
                >
                  <span aria-hidden="true">☰</span> Accessible Directory
                </button>
              </div>
            </div>

            {/* Filter pills for directory and graph */}
            <div className="filter-pill-bar" role="tablist" aria-label="Filter Nodes by Category">
              <button 
                type="button"
                role="tab"
                aria-selected={activeFilter === 'all'}
                className={`filter-pill ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >
                All Entities ({INITIAL_NODES.length})
              </button>
              <button 
                type="button"
                role="tab"
                aria-selected={activeFilter === 'project'}
                className={`filter-pill ${activeFilter === 'project' ? 'active' : ''}`}
                onClick={() => setActiveFilter('project')}
              >
                Systems & Platforms ({INITIAL_NODES.filter(n => n.type === 'project').length})
              </button>
              <button 
                type="button"
                role="tab"
                aria-selected={activeFilter === 'skill'}
                className={`filter-pill ${activeFilter === 'skill' ? 'active' : ''}`}
                onClick={() => setActiveFilter('skill')}
              >
                Skill Vectors ({INITIAL_NODES.filter(n => n.type === 'skill').length})
              </button>
            </div>

            {graphViewMode === '3d' ? (
              <div className="graph-container">
                <div className="graph-3d-panel">
                  <MemoryGraph3D onSelectNode={setSelectedNode} activeNode={selectedNode} />
                </div>

                <div className="graph-details-panel" tabIndex={0} aria-label="Selected Architecture Module Details">
                  {selectedNode ? (
                    <article className="details-content">
                      <div className="details-header">
                        <span className="details-type-pill">
                          {selectedNode.type === 'project' ? 'System Module' : 'Skill Metric'}
                        </span>
                        <h3 className="details-title">{selectedNode.label}</h3>
                        {selectedNode.status && (
                          <span className="details-status-badge">● {selectedNode.status}</span>
                        )}
                      </div>
                      
                      <p className="details-headline">{selectedNode.desc}</p>
                      <p className="details-body-text">{selectedNode.details}</p>

                      {selectedNode.link && (
                        <a 
                          href={selectedNode.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="details-link-btn"
                          aria-label={`Visit live platform for ${selectedNode.label} (opens in new tab)`}
                        >
                          Visit Platform ↗
                        </a>
                      )}

                      {selectedNode.localPath && (
                        <div className="details-code-path">
                          Target Path: <code>{selectedNode.localPath}</code>
                        </div>
                      )}
                    </article>
                  ) : (
                    <div className="details-empty-state">
                      <div className="empty-state-icon" aria-hidden="true">❖</div>
                      <p className="empty-state-title">Select a node in the 3D topology</p>
                      <p className="empty-state-subtitle">
                        Rotate and click any system or skill node to inspect live architecture specifications and telemetry.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Accessible Directory List View */
              <div className="accessible-directory-grid" role="region" aria-label="Accessible Systems and Skills Directory">
                {filteredNodes.map(node => (
                  <article 
                    key={node.id} 
                    className={`directory-node-card ${selectedNode?.id === node.id ? 'active-selection' : ''}`}
                  >
                    <div className="node-card-top">
                      <span className={`node-type-badge ${node.type}`}>
                        {node.type === 'project' ? 'System' : 'Skill'}
                      </span>
                      {node.status && (
                        <span className="node-status-tag">● {node.status}</span>
                      )}
                    </div>

                    <h3 className="node-card-title">{node.label}</h3>
                    <p className="node-card-headline">{node.desc}</p>
                    <p className="node-card-details">{node.details}</p>

                    <div className="node-card-footer">
                      {node.link && (
                        <a 
                          href={node.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="node-action-btn"
                          aria-label={`Visit live platform for ${node.label} (opens in new tab)`}
                        >
                          Live Platform ↗
                        </a>
                      )}
                      {node.localPath && (
                        <span className="node-code-tag">
                          <code>{node.localPath}</code>
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Connect & Socials */}
          <section className="section-block" aria-labelledby="contact-heading">
            <div className="section-header">
              <span className="section-label">Connect</span>
              <h2 id="contact-heading" className="section-title">Get In Touch</h2>
              <p className="section-desc">Open for Staff, Lead, and Senior Software Engineering positions worldwide.</p>
            </div>

            <div className="connect-grid">
              {socials.map(s => (
                <a 
                  key={s.name} 
                  href={s.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="connect-card"
                  aria-label={s.label}
                >
                  <span className="connect-name">{s.name}</span>
                  <span className="connect-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
              <a 
                href="mailto:sahil.artits.rathee@gmail.com" 
                className="connect-card"
                aria-label="Send direct email to sahil.artits.rathee@gmail.com"
              >
                <span className="connect-name">Email (Direct)</span>
                <span className="connect-arrow" aria-hidden="true">✉</span>
              </a>
            </div>
          </section>
        </main>

        {/* Semantic Accessible Footer */}
        <footer role="contentinfo" className="footer-bar">
          <div>
            © {new Date().getFullYear()} Sahil Rathee • Senior Software Engineer & AI Systems Architect
          </div>
          <div>New Delhi, India • Open for Senior Roles</div>
        </footer>
      </div>

      {/* Floating AI Assistant (Accessible Dialog) */}
      <div className="ai-chat-wrapper">
        {!chatOpen ? (
          <button 
            type="button"
            onClick={() => setChatOpen(true)}
            className="ai-chat-trigger"
            aria-haspopup="dialog"
            aria-expanded={chatOpen}
            aria-label="Open Sahil's AI Assistant to ask questions about projects and stack"
          >
            <span className="live-dot" aria-hidden="true"></span>
            Ask AI Assistant
          </button>
        ) : (
          <div 
            className="ai-chat-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-chat-title"
          >
            {/* Header */}
            <div className="chat-header">
              <div className="chat-title" id="ai-chat-title">
                <span className="live-dot" aria-hidden="true"></span>
                <span>Sahil AI Assistant</span>
              </div>
              <button 
                type="button"
                onClick={() => setChatOpen(false)}
                className="chat-close-btn"
                aria-label="Close AI Assistant dialog (or press Escape)"
              >
                ✕
              </button>
            </div>

            {/* Quick Prompts */}
            <div className="chat-prompts-row" role="group" aria-label="Suggested Questions">
              {quickPrompts.map(prompt => (
                <button
                  key={prompt}
                  type="button"
                  className="chat-prompt-chip"
                  onClick={() => sendQuery(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Messages Feed with Polite Screen Reader Announcement */}
            <div 
              className="chat-messages-area" 
              role="log" 
              aria-live="polite" 
              aria-atomic="false"
              aria-label="Chat Message History"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'system-bubble'}`}
                >
                  <p>{msg.text}</p>
                  <span className="chat-time">{msg.time}</span>
                </div>
              ))}
              {isTyping && (
                <div className="chat-typing" role="status">
                  AI is analyzing systems...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form with Accessible Label */}
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <label htmlFor="ai-chat-input" className="sr-only">
                Ask a question about Sahil's systems, architecture, or skills
              </label>
              <input 
                id="ai-chat-input"
                ref={chatInputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about systems, stack, or experience..."
                className="chat-input"
              />
              <button 
                type="submit"
                className="chat-send-btn"
                aria-label="Send message to AI assistant"
              >
                Send
              </button>
            </form>
          </div>
        )}
        {/* Quantum Phone Call Modal */}
        <PhoneCallModal 
          isOpen={isPhoneModalOpen} 
          onClose={() => setIsPhoneModalOpen(false)} 
        />
      </div>
    </div>
  );
};

export default App;
