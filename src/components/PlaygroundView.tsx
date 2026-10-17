import React, { useState, useEffect, useRef } from 'react';

interface PlaygroundViewProps {
  onOpenPhoneCall: () => void;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = ({ onOpenPhoneCall }) => {
  const [activeTab, setActiveTab] = useState<'ringbuf' | 'agent' | 'particles'>('ringbuf');

  // Module 1: Ring Buffer Benchmark State
  const [benchmarkRunning, setBenchmarkRunning] = useState<boolean>(false);
  const [ringBufferLatency, setRingBufferLatency] = useState<number>(0.38);
  const [traditionalLatency, setTraditionalLatency] = useState<number>(42.5);
  const [packetsProcessed, setPacketsProcessed] = useState<number>(10000);

  // Module 2: Agent Swarm Sandbox State
  const [agentGoal, setAgentGoal] = useState<string>('Refactor legacy payment service to idempotent double-entry ledger');
  const [agentLogs, setAgentLogs] = useState<string[]>([
    '[SYSTEM READY] Meeseeks Automated Refactoring Planner initialized.',
    'Enter a software engineering task and click "Run Planning Simulation" to observe task decomposition.'
  ]);
  const [isDispatching, setIsDispatching] = useState<boolean>(false);

  // Module 3: Particle Ripple Canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const runBenchmark = () => {
    setBenchmarkRunning(true);
    let count = 0;
    const interval = setInterval(() => {
      count += 2000;
      setPacketsProcessed(count);
      setRingBufferLatency(Number((0.32 + Math.random() * 0.12).toFixed(2)));
      setTraditionalLatency(Number((38 + Math.random() * 12).toFixed(1)));
      if (count >= 50000) {
        clearInterval(interval);
        setBenchmarkRunning(false);
      }
    }, 60);
  };

  const dispatchAgentSwarm = () => {
    setIsDispatching(true);
    setAgentLogs([
      `[TASK RECEIVED] "${agentGoal}"`,
      '[PLANNER] Decomposed objective into 4 sequential subtasks (DAG)',
      '[AST PARSER] Parsed codebase AST and pruned unreferenced symbols (-72% prompt context)',
      '[TOOL CLIENT] Retrieved database schema and existing unit tests via MCP',
      '[TEST SUITE] Executed automated test suite inside isolated Docker container...',
      '[VERIFICATION] All 48 unit tests passed (0 regressions). Pull request ready for review.'
    ]);
    setTimeout(() => {
      setIsDispatching(false);
    }, 1200);
  };

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; color: string }[] = [];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        r: Math.random() * 2.5 + 1.5,
        color: Math.random() > 0.5 ? '#00d2ff' : '#10b981',
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 85) {
            ctx.strokeStyle = `rgba(0, 210, 255, ${1 - dist / 85})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="playground-page">
      <header className="playground-header">
        <span className="playground-tag">INTERACTIVE ENGINEERING DEMOS</span>
        <h1 className="playground-title">Interactive Engineering Demos</h1>
        <p className="playground-subtitle">
          Hands-on simulations demonstrating latency optimization, autonomous task planning, and distributed networking.
        </p>
      </header>

      {/* Tabs */}
      <nav className="playground-tabs-row" aria-label="Playground experiments">
        <button
          type="button"
          className={`playground-tab ${activeTab === 'ringbuf' ? 'active' : ''}`}
          onClick={() => setActiveTab('ringbuf')}
        >
          ⚡ Memory vs Network Latency
        </button>
        <button
          type="button"
          className={`playground-tab ${activeTab === 'agent' ? 'active' : ''}`}
          onClick={() => setActiveTab('agent')}
        >
          🤖 Automated Task Planning Demo
        </button>
        <button
          type="button"
          className={`playground-tab ${activeTab === 'particles' ? 'active' : ''}`}
          onClick={() => setActiveTab('particles')}
        >
          🌐 Network Topology Visualizer
        </button>
      </nav>

      {/* Content Panes */}
      <main className="playground-pane-container">
        {activeTab === 'ringbuf' && (
          <div className="playground-experiment-card">
            <div className="experiment-header">
              <div>
                <span className="exp-label">BENCHMARK SIMULATION</span>
                <h3 className="exp-title">In-Memory Lock-Free Buffer vs Network Message Broker</h3>
              </div>
              <button
                type="button"
                className="exp-cta-btn"
                onClick={runBenchmark}
                disabled={benchmarkRunning}
              >
                {benchmarkRunning ? `PROCESSING ${packetsProcessed} PACKETS...` : '▶ RUN 50,000 PACKET BURST'}
              </button>
            </div>

            <p className="exp-desc">
              Compares packet enqueue/dequeue latency between a cache-aligned in-memory ring buffer versus a standard message broker queue over TCP.
            </p>

            <div className="benchmark-race-grid">
              {/* Ring Buffer Box */}
              <div className="race-box highlight">
                <span className="race-tag">IN-MEMORY RING BUFFER (OPTIMIZED)</span>
                <span className="race-speed">{ringBufferLatency} µs</span>
                <span className="race-meta">Sub-microsecond memory IPC • Zero allocations</span>
                <div className="race-bar-track">
                  <div className="race-bar-fill fast" style={{ width: '96%' }} />
                </div>
              </div>

              {/* Traditional Broker Box */}
              <div className="race-box">
                <span className="race-tag">NETWORK MESSAGE BROKER</span>
                <span className="race-speed">{traditionalLatency} ms</span>
                <span className="race-meta">Network hops, TCP handshake & serialization</span>
                <div className="race-bar-track">
                  <div className="race-bar-fill slow" style={{ width: '18%' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agent' && (
          <div className="playground-experiment-card">
            <div className="experiment-header">
              <div>
                <span className="exp-label">TASK PLANNING DEMO</span>
                <h3 className="exp-title">Meeseeks Automated Code Refactoring Planner</h3>
              </div>
              <button
                type="button"
                className="exp-cta-btn"
                onClick={dispatchAgentSwarm}
                disabled={isDispatching}
              >
                {isDispatching ? 'PLANNING IN PROGRESS...' : '▶ RUN PLANNING SIMULATION'}
              </button>
            </div>

            <p className="exp-desc">
              Demonstrates how Meeseeks analyzes requirements, optimizes prompt context via AST pruning, and executes isolated container verification.
            </p>

            <input
              type="text"
              className="agent-goal-input"
              value={agentGoal}
              onChange={(e) => setAgentGoal(e.target.value)}
              placeholder="Enter engineering task (e.g. Refactor payment service)..."
            />

            <div className="agent-terminal-screen">
              {agentLogs.map((log, i) => (
                <div key={i} className="agent-log-line">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'particles' && (
          <div className="playground-experiment-card">
            <div className="experiment-header">
              <div>
                <span className="exp-label">DISTRIBUTED TOPOLOGY</span>
                <h3 className="exp-title">Dynamic Service Mesh & Packet Routing Canvas</h3>
              </div>
              <button
                type="button"
                className="exp-cta-btn"
                onClick={onOpenPhoneCall}
              >
                📞 Direct Call with Sahil
              </button>
            </div>

            <p className="exp-desc">
              Interactive visualization demonstrating service mesh node connectivity and low-latency packet routing.
            </p>

            <div className="particles-canvas-wrap">
              <canvas ref={canvasRef} width={800} height={360} className="particles-canvas" />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
