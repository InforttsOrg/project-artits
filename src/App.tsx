import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { 
  Terminal, 
  Cpu, 
  Shield, 
  Globe, 
  Zap, 
  ArrowRight,
  Activity,
  History,
  Command,
  Unlock
} from 'lucide-react';

// --- Terminal Logic & Data ---
const SYSTEM_PREFIX = "sahil@infortts:~$ ";
const BOOT_LOG = [
  "INITIALIZING ARTITS LINK...",
  "CONNECTING TO INFORTTS ORCHESTRATOR [OK]",
  "SYNCHRONIZING SWARM NODES (8 ACTIVE)...",
  "DECRYPTING SAHIL_RATHEE_ARCHIVE... [100%]",
  "ACCESS GRANTED: WELCOME TO THE FACTORY."
];

const PROJECTS = [
  { id: "forensics", title: "FORENSICS", desc: "Institutional-grade trade telemetry. 2s latency.", link: "https://forensics.infortts.com" },
  { id: "meeseek", title: "MEESEEK", desc: "AI Agent swarm intelligence. Multi-agent RAG.", link: "#" },
  { id: "lexi", title: "LEXI", desc: "B2B Salon Commerce ecosystem.", link: "#" },
];

const App = () => {
  const [log, setLog] = useState<string[]>([]);
  const [isBooting, setIsBooting] = useState(true);
  const [currentTyped, setCurrentTyped] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriter Helper
  const typeText = async (text: string, speed = 30) => {
    let current = "";
    for (const char of text) {
      current += char;
      setCurrentTyped(current);
      await new Promise(r => setTimeout(r, speed));
    }
    setCurrentTyped("");
  };

  const addLog = useCallback((line: string) => {
    setLog(prev => [...prev, line]);
  }, []);

  // Boot Sequence
  useEffect(() => {
    const runBoot = async () => {
      for (const line of BOOT_LOG) {
        addLog(`>> ${line}`);
        await new Promise(r => setTimeout(r, 600));
      }
      setIsBooting(false);
      addLog(`${SYSTEM_PREFIX} help`);
      await typeText("Displaying available system commands...", 20);
    };
    runBoot();
  }, [addLog]);

  // Command Handlers
  const handleCommand = async (cmd: string) => {
    if (isBooting) return;
    addLog(`${SYSTEM_PREFIX} ${cmd.toLowerCase()}`);
    
    switch(cmd.toLowerCase()) {
      case 'whoami':
        await typeText("Sahil Rathee: System Architect. Building the AI OS.");
        addLog("ARCHITECT BIO: Focused on decentralized agent swarms and hft-grade financial systems.");
        break;
      case 'ls':
        await typeText("Listings active swarm nodes...");
        PROJECTS.forEach(p => addLog(`[NODE] ${p.title} - ${p.desc}`));
        break;
      case 'clear':
        setLog([]);
        break;
      case 'swarm':
        addLog("SWARM STATUS: 12 Nodes operational. 2.1M Neural Events handled today.");
        break;
      default:
        addLog(`ERR: COMMAND NOT FOUND: ${cmd}`);
    }
  };

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#020617] text-cyan-500 font-mono overflow-hidden flex flex-col p-6 md:p-12 terminal-flicker">
      {/* Background Ambience */}
      <div className="fixed inset-0 crt-overlay opacity-30 z-50 pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
      <div className="scanline"></div>

      {/* Terminal Header */}
      <header className="flex items-center justify-between border-b border-cyan-500/30 pb-6 mb-8 text-xs tracking-[0.2em] font-bold">
        <div className="flex items-center gap-4">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>ARTITS_CORE :: STATUS_ACTIVE</span>
        </div>
        <div className="hidden md:block">
          LOCATION :: 28.6139°N, 77.2090°E
        </div>
        <div className="flex items-center gap-2 text-cyan-400 capitalize">
          Sahil_Rathee_Session
        </div>
      </header>

      {/* Terminal Output */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-2 mb-8 selection:bg-cyan-500 selection:text-slate-900 scroll-smooth pr-4"
      >
        {log.map((line, i) => (
          <div key={i} className={`reveal ${line.startsWith(SYSTEM_PREFIX) ? 'text-white font-bold' : ''}`}>
            {line}
          </div>
        ))}
        {currentTyped && (
          <div className="text-white">
            {SYSTEM_PREFIX}{currentTyped}<span className="terminal-cursor"></span>
          </div>
        )}
        {!currentTyped && !isBooting && (
          <div className="text-white">
            {SYSTEM_PREFIX}<span className="terminal-cursor"></span>
          </div>
        )}
      </div>

      {/* Terminal Input / Command Chips */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-cyan-500/30">
        <button 
          onClick={() => handleCommand('WHOAMI')}
          className="group flex items-center justify-center gap-2 p-4 bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <Unlock className="w-4 h-4 group-hover:scale-110 transition-transform" /> WHOAMI
        </button>
        <button 
          onClick={() => handleCommand('LS')}
          className="group flex items-center justify-center gap-2 p-4 bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <History className="w-4 h-4 group-hover:scale-110 transition-transform" /> SWARM_NODES
        </button>
        <button 
          onClick={() => handleCommand('SWARM')}
          className="group flex items-center justify-center gap-2 p-4 bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" /> TELEMETRY
        </button>
        <button 
          onClick={() => handleCommand('CLEAR')}
          className="group flex items-center justify-center gap-2 p-4 bg-cyan-500/5 border border-cyan-500/20 hover:bg-cyan-500/10 hover:border-cyan-500 transition-all text-xs font-bold uppercase tracking-widest"
        >
          <Terminal className="w-4 h-4 group-hover:scale-110 transition-transform" /> CLEAR_LOG
        </button>
      </div>

      {/* Footer Branded Bar */}
      <div className="mt-8 flex justify-between items-center text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold">
        <span>© 2026 INFORTTS_FACTORY</span>
        <span className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          SECURE_CONNECTION_STABLE
        </span>
      </div>
    </div>
  );
};

export default App;
