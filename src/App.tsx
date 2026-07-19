import React, { useState, useRef, useEffect } from 'react';
import GameOfLife from './components/GameOfLife';
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
      document.getElementById('memory-graph-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [messages, setMessages] = useState<{ sender: 'user' | 'system', text: string, time: string }[]>([
    { sender: 'system', text: 'ARTITS AI Terminal Initialized. Ready for authorization handshake.', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
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
    
    // Add user message
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
          text: data.reply || "Hi Me", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsTyping(false);
      }, 600);
    } catch (err) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          sender: 'system', 
          text: "Hi Me", 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        }]);
        setIsTyping(false);
      }, 600);
    }
  };

  const socials = [
    { name: 'GITHUB', url: 'https://github.com/rttss-sahil' },
    { name: 'X.COM', url: 'https://x.com/rttss_sahil' },
    { name: 'LINKEDIN', url: 'https://www.linkedin.com/in/rttss-sahil' },
    { name: 'LEETCODE', url: 'https://leetcode.com/rttss-sahil' },
    { name: 'STACKOVERFLOW', url: 'https://stackoverflow.com/users/rttss-sahil' }
  ];

  return (
    <>
      <div className="graph-paper"></div>
      <div className="manifest-container">
        <div className="sys-info">
          <div className="status">
            <div className="pulse"></div>
            SYSTEM_OPERATIONAL // SAHIL_RATHEE // @rttss-sahil
          </div>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {socials.slice(0, 3).map(s => (
              <a key={s.name} href={s.url} style={{ color: 'inherit', textDecoration: 'none' }}>{s.name}</a>
            ))}
          </div>
        </div>

        <section className="component">
          <div className="label">IDENTITY_MANIFEST</div>
          <h1>SAHIL<br />RATHEE<span style={{ fontSize: '1rem', verticalAlign: 'top', marginLeft: '1rem', color: 'var(--active)' }}>PROD_READY</span></h1>
          <p style={{ maxWidth: '700px', fontSize: '1.2rem', marginTop: '2rem', color: '#444' }}>
            Full-stack Software Architect specializing in autonomous systems,
            high-availability cloud fabrics, and production-scale automation.
            Known across the stack as <strong>rttss-sahil</strong>.
          </p>
          <p style={{ maxWidth: '700px', fontSize: '1.0rem', marginTop: '1rem', color: '#666', lineHeight: '1.6' }}>
            <strong>Artits</strong> is the second brain of Sahil Rathee, the owner of this laptop and the Director of Infortts (registered under MSME since 2024). 
            This agent is available 24/7, actively connected to Sahil's paired <strong>Samsung S24 Ultra</strong> and rooted <strong>Redmi Note 10 Pro</strong> via <strong>infortts.com</strong>.
          </p>
        </section>

        <section className="component">
          <div className="label">CELLULAR_AUTOMATA // CONWAY_GOL</div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
            <GameOfLife />
          </div>
        </section>

        <section className="component">
          <div className="label">PRODUCTION_SYSTEMS (LIVE)</div>
          <div className="node-grid">
            <div className="node" style={{ cursor: 'pointer' }} onClick={() => handleSelectNodeById('roost')}>
              <div>
                <div className="node-title">ROOST</div>
                <p className="node-desc">Integrated property management ecosystem with dedicated Tenant and Manager applications. High-scale multi-tenant architecture.</p>
              </div>
              <div className="node-tags">
                <span className="tag">FLUTTER</span>
                <span className="tag">DART</span>
                <span className="tag">FIREBASE</span>
                <span className="tag">GCP</span>
              </div>
            </div>
            <div className="node" style={{ cursor: 'pointer' }} onClick={() => handleSelectNodeById('shadow_labs')}>
              <div>
                <div className="node-title">SHADOW_LABS</div>
                <p className="node-desc">Autonomous marketing engine for e-commerce. Features AI-driven asset generation and real-time inventory synchronization.</p>
              </div>
              <div className="node-tags">
                <span className="tag">NODE.JS</span>
                <span className="tag">DOCKER</span>
                <span className="tag">SUPABASE</span>
                <span className="tag">AI</span>
              </div>
            </div>
            <div className="node" style={{ cursor: 'pointer' }} onClick={() => handleSelectNodeById('meeseeks')}>
              <div>
                <div className="node-title">MEESEEKS</div>
                <p className="node-desc">A self-evolving network of autonomous agents designed for complex task orchestration and deployment automation.</p>
              </div>
              <div className="node-tags">
                <span className="tag">PYTHON</span>
                <span className="tag">PLAYWRIGHT</span>
                <span className="tag">LLM</span>
              </div>
            </div>
            <div className="node" style={{ cursor: 'pointer' }} onClick={() => handleSelectNodeById('bighit_cloud')}>
              <div>
                <div className="node-title">BIGHIT_CLOUD</div>
                <p className="node-desc">Cloud infrastructure optimization project resulting in an 80% reduction in footprint for a major sports platform.</p>
              </div>
              <div className="node-tags">
                <span className="tag">AWS</span>
                <span className="tag">TERRAFORM</span>
                <span className="tag">K8S</span>
              </div>
            </div>
          </div>
        </section>

        <section className="component" id="memory-graph-section">
          <div className="label">MEMORY_GRAPH_3D // SKILLS_AND_PROJECTS</div>
          <div className="graph-3d-layout">
            <div className="graph-3d-panel">
              <MemoryGraph3D onSelectNode={setSelectedNode} activeNode={selectedNode} />
            </div>
            <div className="graph-3d-details">
              {selectedNode ? (
                <>
                  <div className="details-header">
                    <div className="details-subtitle">{selectedNode.type === 'project' ? 'PROJECT_DOCUMENTATION' : 'SKILL_METRICS'}</div>
                    <div className="details-title" style={{ color: selectedNode.type === 'project' ? 'var(--fg)' : 'var(--active)' }}>
                      {selectedNode.label}
                    </div>
                    {selectedNode.status && (
                      <span className="details-badge">STATUS: {selectedNode.status}</span>
                    )}
                  </div>
                  <div className="details-body">
                    <p style={{ fontWeight: 700, marginBottom: '1.2rem', fontSize: '11px' }}>{selectedNode.desc}</p>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>{selectedNode.details}</p>
                    
                    {selectedNode.link && (
                      <a 
                        href={selectedNode.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="details-link"
                      >
                        ACCESS LIVE PLATFORM &rarr;
                      </a>
                    )}
                    {selectedNode.localPath && (
                      <div style={{ marginTop: '1.5rem', fontSize: '9px', color: '#888', fontFamily: 'monospace' }}>
                        MONOREPO TARGET: <span style={{ color: '#444' }}>./{selectedNode.localPath}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div style={{ margin: 'auto', textAlign: 'center', color: '#888', fontSize: '10px', fontFamily: 'monospace' }}>
                  [SELECT_NODE_IN_3D_GRAPH_TO_QUERY_DOCUMENTATION]
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="component">
          <div className="label">GLOBAL_CONNECTIVITY</div>
          <div className="node-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {socials.map(s => (
              <a key={s.name} href={s.url} className="node" style={{ minHeight: '100px', alignItems: 'center', justifyContent: 'center', textDecoration: 'none' }}>
                <div style={{ fontWeight: 700, fontSize: '10px' }}>{s.name}</div>
              </a>
            ))}
          </div>
        </section>

        <footer>
          <div>@rttss-sahil // SYSTEM_9.2_PRODUCTION_STABLE</div>
          <div>EST. 2018 // BASED_IN_NEW_DELHI</div>
        </footer>
      </div>

      {/* Floating AI Terminal */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 1000,
        fontFamily: "'JetBrains Mono', monospace"
      }}>
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            style={{
              background: 'var(--fg)',
              color: 'var(--bg)',
              border: '1px solid var(--fg)',
              padding: '0.75rem 1.5rem',
              fontSize: '10px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            }}
          >
            <span className="pulse" style={{ width: '6px', height: '6px', background: 'var(--active)', borderRadius: '50%', display: 'inline-block' }}></span>
            ARTITS_AI_v1.0
          </button>
        ) : (
          <div style={{
            width: '380px',
            height: '450px',
            background: '#090d16',
            border: '1px solid rgba(56, 189, 248, 0.15)',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
            borderRadius: '2px',
            position: 'relative'
          }}>
            {/* Header */}
            <div style={{
              background: '#121b2d',
              borderBottom: '1px solid rgba(56, 189, 248, 0.1)',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="pulse" style={{ width: '6px', height: '6px', background: 'var(--active)', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#e2e8f0' }}>ARTITS_SECURE_COMMS</span>
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#f1f5f9'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#64748b'}
              >
                [X]
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              fontSize: '11px',
              color: '#94a3b8'
            }}>
              {messages.map((msg, idx) => (
                <div key={idx} style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%'
                }}>
                  <div style={{
                    background: msg.sender === 'user' ? '#1e293b' : '#0f172a',
                    color: msg.sender === 'user' ? '#f1f5f9' : '#38bdf8',
                    border: msg.sender === 'user' ? '1px solid #334155' : '1px solid rgba(56, 189, 248, 0.1)',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '2px',
                    whiteSpace: 'pre-wrap',
                    lineHeight: '1.4'
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    fontSize: '8px',
                    color: '#475569',
                    marginTop: '0.25rem',
                    textAlign: msg.sender === 'user' ? 'right' : 'left'
                  }}>
                    {msg.time}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', color: '#38bdf8', fontSize: '10px' }}>
                  System compiling response...
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} style={{
              borderTop: '1px solid rgba(56, 189, 248, 0.1)',
              padding: '0.75rem',
              display: 'flex',
              gap: '0.5rem',
              background: '#090d16'
            }}>
              <input 
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type a secure message..."
                style={{
                  flex: 1,
                  background: '#0f172a',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  color: '#f1f5f9',
                  padding: '0.5rem 0.75rem',
                  fontSize: '11px',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.15)'}
              />
              <button 
                type="submit"
                style={{
                  background: '#38bdf8',
                  color: '#090d16',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  fontSize: '10px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                SEND
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
