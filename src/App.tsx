import React, { useState, useRef, useEffect } from 'react';
import { GameOfLifeBackground } from './components/GameOfLifeBackground';
import { MemoryGraph3D, GraphNode, INITIAL_NODES } from './components/MemoryGraph3D';

const App: React.FC = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const handleSelectNodeById = (id: string) => {
    const node = INITIAL_NODES.find(n => n.id === id);
    if (node) {
      setSelectedNode({
        ...node,
        x: 0, y: 0, z: 0
      } as GraphNode);
      document.getElementById('knowledge-graph-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [messages, setMessages] = useState<{ sender: 'user' | 'system', text: string, time: string }[]>([
    { sender: 'system', text: 'Hi, I am Sahil\'s AI assistant. Ask me about his architecture work, financial engineering, or agentic AI workflows.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    setInputVal('');
    
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: 'user', text: userMsg, time: now }]);
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await response.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'system', 
          text: data.reply || "Sahil is a Senior Software Engineer & AI Architect with 4+ years of experience across Financial Systems Engineering, Scalable Cloud Infrastructure, and Agentic AI workflows.", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsTyping(false);
      }, 500);
    } catch {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'system', 
          text: "Sahil specializes in Go, Python, TypeScript, Cocos, Node/Next/Angular, React Native, Kubernetes, Ansible/Jenkins, OpenSearch, GIS, MySQL/MongoDB, and Agentic AI workflows (70% RAG cost optimization). Check out his featured production systems above!", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsTyping(false);
      }, 500);
    }
  };

  const socials = [
    { name: 'GitHub', url: 'https://github.com/rttss-sahil' },
    { name: 'X / Twitter', url: 'https://x.com/rttss_sahil' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rttss-sahil' },
    { name: 'Organization', url: 'https://github.com/InforttsOrg' },
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
      id: 'roost',
      title: 'ROOST',
      subtitle: 'Multi-Tenant Property Management SaaS',
      desc: 'High-scale property & tenant management platform with automated payment escrow, GST-compliant financial ledger, and real-time transaction reconciliation.',
      tags: ['Flutter', 'Go', 'PostgreSQL', 'GCP', 'Redis', 'Docker']
    },
    {
      id: 'meeseeks',
      title: 'MEESEEKS',
      subtitle: 'Autonomous AI Agent Swarm',
      desc: 'Self-evolving multi-agent orchestration engine handling autonomous task planning, codebase refactoring, tool dispatch, and live deployments with 70% reduced RAG token overhead.',
      tags: ['Python', 'FastAPI', 'Playwright', 'LLMs', 'LangChain', 'Docker']
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
    'Go', 'Python', 'TypeScript', 'Dart / Flutter', 'Cocos', 'Node.js', 'Next.js', 'Angular', 'React Native', 'Kotlin', 'Kubernetes', 'Terraform', 'Ansible', 'Jenkins', 'Podman / Docker', 'AWS Lambda / Serverless', 'OpenSearch / Elastic', 'GIS', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Qdrant', 'NATS'
  ];

  const resumeDocUrl = "https://docs.google.com/document/d/1cH4O32ABivQJ9m8zq35eX5fmPF60pcQVI9gA2JWdcEk/edit?usp=sharing";

  return (
    <div className="portfolio-wrapper">
      {/* Dynamic Ambient Fullscreen Game of Life Background */}
      <GameOfLifeBackground />

      <div className="content-container">
        {/* Top Header Navigation */}
        <header className="top-nav">
          <div className="status-indicator">
            <span className="live-dot"></span>
            <span className="status-text">Sahil Rathee <span className="text-slate-500">•</span> <span className="status-sub">Available for Senior & Staff Roles</span></span>
          </div>
          <nav className="nav-links">
            {socials.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="nav-link">
                {s.name}
              </a>
            ))}
            <a href={resumeDocUrl} target="_blank" rel="noopener noreferrer" className="nav-link">
              Google Doc ↗
            </a>
            <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer" className="resume-btn">
              Download Resume PDF ↗
            </a>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-heading-group">
            <h1 className="hero-name">
              SAHIL RATHEE
            </h1>
            <div className="badge-open">
              <span className="badge-dot"></span>
              Open to Work
            </div>
          </div>

          <p className="hero-bio">
            Senior Software Engineer & AI Architect with <strong>4+ years of experience</strong> at the intersection of 
            <strong> Financial Systems Engineering</strong>, <strong>Distributed Cloud Infrastructure</strong>, and <strong>Agentic AI Workflows</strong>.
          </p>

          <div className="skills-pill-row">
            {skillsList.map(skill => (
              <span key={skill} className="skill-pill">
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Featured Production Systems */}
        <section className="section-block">
          <div className="section-header">
            <span className="section-label">Selected Work</span>
            <h2 className="section-title">Production Systems & Architecture</h2>
            <p className="section-desc">Key engineering initiatives architected and scaled across financial engineering, real-time distributed streaming, and autonomous multi-agent swarms.</p>
          </div>

          <div className="cards-grid">
            {featuredProjects.map(proj => (
              <div 
                key={proj.id} 
                className="project-card"
                onClick={() => handleSelectNodeById(proj.id)}
              >
                <div className="card-top">
                  <div>
                    <h3 className="card-title">{proj.title}</h3>
                    <p className="card-subtitle">{proj.subtitle}</p>
                  </div>
                  <span className="card-explore-hint">Explore ↗</span>
                </div>
                <p className="card-desc">{proj.desc}</p>
                <div className="tags-row">
                  {proj.tags.map(t => (
                    <span key={t} className="tag-chip">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3D Knowledge Graph */}
        <section className="section-block" id="knowledge-graph-section">
          <div className="section-header">
            <span className="section-label">System Architecture</span>
            <h2 className="section-title">Interactive Knowledge & Skill Graph</h2>
            <p className="section-desc">Rotate, zoom, and click any node in the 3D topology to inspect real-time architecture, codebase paths, and module metrics.</p>
          </div>

          <div className="graph-container">
            <div className="graph-3d-panel">
              <MemoryGraph3D onSelectNode={setSelectedNode} activeNode={selectedNode} />
            </div>

            <div className="graph-details-panel">
              {selectedNode ? (
                <div className="details-content">
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
                    >
                      Visit Platform ↗
                    </a>
                  )}

                  {selectedNode.localPath && (
                    <div className="details-code-path">
                      Target: <code>{selectedNode.localPath}</code>
                    </div>
                  )}
                </div>
              ) : (
                <div className="details-empty-state">
                  <div className="empty-state-icon">❖</div>
                  <p className="empty-state-title">Select a node in the 3D graph</p>
                  <p className="empty-state-subtitle">Click any project or skill node on the canvas to inspect documentation and live telemetry.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Connect & Socials */}
        <section className="section-block">
          <div className="section-header">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Get In Touch</h2>
          </div>

          <div className="connect-grid">
            {socials.map(s => (
              <a 
                key={s.name} 
                href={s.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="connect-card"
              >
                <span className="connect-name">{s.name}</span>
                <span className="connect-arrow">↗</span>
              </a>
            ))}
            <a 
              href="mailto:sahil.artits.rathee@gmail.com" 
              className="connect-card"
            >
              <span className="connect-name">Email (sahil.artits.rathee@gmail.com)</span>
              <span className="connect-arrow">↗</span>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-bar">
          <div>© {new Date().getFullYear()} Sahil Rathee • Senior Software Engineer & AI Architect</div>
          <div>New Delhi, India</div>
        </footer>
      </div>

      {/* Floating AI Assistant */}
      <div className="ai-chat-wrapper">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="ai-chat-trigger"
          >
            <span className="live-dot"></span>
            Ask AI Assistant
          </button>
        ) : (
          <div className="ai-chat-modal">
            {/* Header */}
            <div className="chat-header">
              <div className="chat-title">
                <span className="live-dot"></span>
                <span>Sahil AI Assistant</span>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                className="chat-close-btn"
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="chat-messages-area">
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
                <div className="chat-typing">
                  AI is thinking...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input 
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask about systems, skills, or stack..."
                className="chat-input"
              />
              <button 
                type="submit"
                className="chat-send-btn"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
