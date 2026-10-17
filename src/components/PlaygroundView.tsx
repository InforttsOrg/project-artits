import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Terminal, Cpu, Network, Zap, Mail } from 'lucide-react';

interface PlaygroundViewProps {
  onOpenPhoneCall?: () => void;
}

export const PlaygroundView: React.FC<PlaygroundViewProps> = () => {
  const [activeTab, setActiveTab] = useState<'ringbuf' | 'agent' | 'mesh'>('ringbuf');

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

  // Module 3: Mesh Canvas
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
    }, 50);
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
    }, 900);
  };

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    for (let i = 0; i < 40; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        r: 2 + Math.random() * 2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [activeTab]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col gap-10">
      {/* Back Header */}
      <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>
        <span className="text-zinc-600">•</span>
        <span className="text-zinc-500 uppercase">ENGINEERING PLAYGROUND</span>
      </nav>

      {/* Hero */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Interactive Engineering Labs
        </h1>
        <p className="text-sm sm:text-base text-zinc-400">
          Live simulations demonstrating low-level IPC benchmarks, automated task decomposition, and topology routing.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 flex-wrap">
        <button
          onClick={() => setActiveTab('ringbuf')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
            activeTab === 'ringbuf'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          ⚡ IPC Ring Buffer vs TCP
        </button>
        <button
          onClick={() => setActiveTab('agent')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
            activeTab === 'agent'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          🤖 Automated Planning DAG
        </button>
        <button
          onClick={() => setActiveTab('mesh')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
            activeTab === 'mesh'
              ? 'bg-zinc-100 text-zinc-950 font-semibold'
              : 'bg-zinc-900 text-zinc-400 hover:text-white'
          }`}
        >
          🌐 Mesh Routing Visualizer
        </button>
      </div>

      {/* Tab 1: Ring Buffer */}
      {activeTab === 'ringbuf' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wide">
                Kernel & Memory Benchmark
              </span>
              <h2 className="font-display font-bold text-xl text-white">
                Lock-Free Ring Buffer vs Network Message Broker
              </h2>
            </div>
            <button
              onClick={runBenchmark}
              disabled={benchmarkRunning}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono font-medium transition-colors cursor-pointer shrink-0"
            >
              {benchmarkRunning ? `RUNNING (${packetsProcessed})...` : '▶ RUN 50,000 PACKET BURST'}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Compares packet enqueue/dequeue latency between a cache-aligned in-memory ring buffer versus standard message brokers over TCP network sockets.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-zinc-950 border border-emerald-500/30 flex flex-col gap-2">
              <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold">
                In-Memory Ring Buffer (Optimized)
              </span>
              <span className="font-mono text-3xl font-bold text-white">
                {ringBufferLatency} µs
              </span>
              <span className="text-xs text-zinc-400">Sub-microsecond memory IPC • Zero allocations</span>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '96%' }} />
              </div>
            </div>

            <div className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 flex flex-col gap-2">
              <span className="text-[11px] font-mono text-zinc-400 uppercase">
                Network Broker (TCP)
              </span>
              <span className="font-mono text-3xl font-bold text-zinc-300">
                {traditionalLatency} ms
              </span>
              <span className="text-xs text-zinc-500">Network hops, TCP serialization, syscalls</span>
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden mt-2">
                <div className="bg-zinc-600 h-full rounded-full" style={{ width: '22%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Agent DAG */}
      {activeTab === 'agent' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wide">
                Agent Swarm Sandbox
              </span>
              <h2 className="font-display font-bold text-xl text-white">
                Meeseeks Automated Refactoring Planner
              </h2>
            </div>
            <button
              onClick={dispatchAgentSwarm}
              disabled={isDispatching}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono font-medium transition-colors cursor-pointer shrink-0"
            >
              {isDispatching ? 'PLANNING...' : '▶ RUN PLANNING'}
            </button>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Demonstrates how Meeseeks analyzes requirements, optimizes prompt context via AST pruning, and executes isolated container verification.
          </p>

          <input
            type="text"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs sm:text-sm font-mono focus:outline-none focus:border-zinc-600"
            value={agentGoal}
            onChange={(e) => setAgentGoal(e.target.value)}
            placeholder="Enter engineering goal..."
          />

          <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 space-y-2 min-h-[160px]">
            {agentLogs.map((log, i) => (
              <div key={i} className="leading-relaxed">
                <span className="text-zinc-600 mr-2">&gt;</span>
                <span className={i === 0 ? 'text-emerald-400' : 'text-zinc-300'}>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Mesh Visualizer */}
      {activeTab === 'mesh' && (
        <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col gap-6">
          <div>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wide">
              Distributed Topology
            </span>
            <h2 className="font-display font-bold text-xl text-white">
              Dynamic Service Mesh & Packet Routing Canvas
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Visualizing microservice node health, mesh gossip protocol, and edge packet routing.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
            <canvas ref={canvasRef} width={800} height={360} className="w-full h-auto block" />
          </div>
        </div>
      )}
    </div>
  );
};
