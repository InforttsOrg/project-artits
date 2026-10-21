import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Mail,
  FileText,
  Copy,
  Check,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Info,
  X,
  ExternalLink,
  Terminal,
  Activity,
  Cpu,
  Shield,
  Layers,
  Compass
} from 'lucide-react';
import {
  GitHubLogo,
  LinkedInLogo,
  XLogo,
  LeetCodeLogo,
  StackOverflowLogo,
  InstagramLogo
} from './BrandLogos';

interface CellPoint {
  r: number;
  c: number;
}

export const SpacetimePlaygroundView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Simulation State
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [generation, setGeneration] = useState<number>(0);
  const [population, setPopulation] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Story & "Tell About Me" HUD overlay state
  const [showAboutMe, setShowAboutMe] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'about' | 'metrics' | 'experience' | 'stack'>('about');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [brushMode, setBrushMode] = useState<'glider' | 'pulsar' | 'cluster' | 'single'>('cluster');

  const email = 'sahil.artits.rathee@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Mutable refs for high-frequency animation loop
  const simRef = useRef({
    grid: new Uint8Array(0),
    nextGrid: new Uint8Array(0),
    ageGrid: new Uint16Array(0),
    cols: 0,
    rows: 0,
    cellSize: 10,
    isPaused: false,
    speed: 1,
    generation: 0,
    brushMode: 'cluster' as 'glider' | 'pulsar' | 'cluster' | 'single',
    spawnQueue: [] as CellPoint[],
  });

  useEffect(() => {
    simRef.current.isPaused = isPaused;
    simRef.current.speed = speed;
    simRef.current.brushMode = brushMode;
  }, [isPaused, speed, brushMode]);

  // Inject known Conway Life Patterns
  const injectPattern = useCallback((centerR: number, centerC: number, pattern: string) => {
    const { rows, cols, grid, ageGrid } = simRef.current;
    if (rows === 0 || cols === 0) return;

    const setCell = (dr: number, dc: number) => {
      const r = (centerR + dr + rows) % rows;
      const c = (centerC + dc + cols) % cols;
      const idx = r * cols + c;
      grid[idx] = 1;
      ageGrid[idx] = 1;
    };

    if (pattern === 'glider') {
      const glider = [
        [0, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ];
      glider.forEach(([dr, dc]) => setCell(dr - 1, dc - 1));
    } else if (pattern === 'pulsar') {
      const coords = [
        [-6, -4], [-6, -3], [-6, -2], [-6, 2], [-6, 3], [-6, 4],
        [-4, -6], [-4, -1], [-4, 1], [-4, 6],
        [-3, -6], [-3, -1], [-3, 1], [-3, 6],
        [-2, -6], [-2, -1], [-2, 1], [-2, 6],
        [-1, -4], [-1, -3], [-1, -2], [-1, 2], [-1, 3], [-1, 4],
        [1, -4], [1, -3], [1, -2], [1, 2], [1, 3], [1, 4],
        [2, -6], [2, -1], [2, 1], [2, 6],
        [3, -6], [3, -1], [3, 1], [3, 6],
        [4, -6], [4, -1], [4, 1], [4, 6],
        [6, -4], [6, -3], [6, -2], [6, 2], [6, 3], [6, 4],
      ];
      coords.forEach(([dr, dc]) => setCell(dr, dc));
    } else if (pattern === 'cluster') {
      for (let dr = -2; dr <= 2; dr++) {
        for (let dc = -2; dc <= 2; dc++) {
          if (Math.random() > 0.35) {
            setCell(dr, dc);
          }
        }
      }
    } else {
      setCell(0, 0);
    }
  }, []);

  const randomizeGrid = useCallback((density = 0.08) => {
    const { rows, cols, grid, ageGrid } = simRef.current;
    let pop = 0;
    for (let i = 0; i < grid.length; i++) {
      const alive = Math.random() < density ? 1 : 0;
      grid[i] = alive;
      ageGrid[i] = alive ? 1 : 0;
      if (alive) pop++;
    }
    setPopulation(pop);
    setGeneration(0);
    simRef.current.generation = 0;
  }, []);

  const clearGrid = useCallback(() => {
    const { grid, ageGrid } = simRef.current;
    grid.fill(0);
    ageGrid.fill(0);
    setPopulation(0);
    setGeneration(0);
    simRef.current.generation = 0;
  }, []);

  // Canvas & Simulation Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId: number;
    const cellSize = 10;
    simRef.current.cellSize = cellSize;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);

      const cols = Math.floor(w / cellSize);
      const rows = Math.floor(h / cellSize);

      simRef.current.cols = cols;
      simRef.current.rows = rows;
      simRef.current.grid = new Uint8Array(rows * cols);
      simRef.current.nextGrid = new Uint8Array(rows * cols);
      simRef.current.ageGrid = new Uint16Array(rows * cols);

      randomizeGrid(0.06);
    };

    resize();
    window.addEventListener('resize', resize);

    // Pointer events on canvas
    const handlePointerSpawn = (clientX: number, clientY: number, forceSpawn = false) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      setPointerPos({ x: Math.round(x), y: Math.round(y) });

      const c = Math.floor(x / cellSize);
      const r = Math.floor(y / cellSize);

      if (forceSpawn) {
        injectPattern(r, c, simRef.current.brushMode);
      } else {
        // Subtle drift on hover
        if (Math.random() > 0.6) {
          injectPattern(r, c, 'single');
        }
      }
    };

    let isMouseDown = false;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      handlePointerSpawn(e.clientX, e.clientY, true);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerSpawn(e.clientX, e.clientY, isMouseDown);
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        handlePointerSpawn(t.clientX, t.clientY, true);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0];
        handlePointerSpawn(t.clientX, t.clientY, true);
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPaused(p => !p);
      } else if (e.key === 'c' || e.key === 'C') {
        clearGrid();
      } else if (e.key === 'r' || e.key === 'R') {
        randomizeGrid(0.08);
      } else if (e.key === 't' || e.key === 'T') {
        setShowAboutMe(s => !s);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Main Game of Life Loop with Phosphor Trails
    let lastTick = performance.now();
    let frameCount = 0;
    let lastFpsCalc = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);

      frameCount++;
      if (now - lastFpsCalc >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastFpsCalc = now;
      }

      const { isPaused, speed, cols, rows, grid, nextGrid, ageGrid, cellSize } = simRef.current;
      if (cols === 0 || rows === 0) return;

      const stepInterval = Math.max(30, 90 / speed);

      // Deep void background with motion trail fade
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.fillStyle = 'rgba(5, 5, 8, 0.28)';
      ctx.fillRect(0, 0, w, h);

      // Evolve grid when active
      if (!isPaused && now - lastTick >= stepInterval) {
        lastTick = now;
        simRef.current.generation++;
        setGeneration(simRef.current.generation);

        let liveCount = 0;

        for (let r = 0; r < rows; r++) {
          const rAbove = (r - 1 + rows) % rows;
          const rBelow = (r + 1) % rows;
          const rRow = r * cols;
          const rAboveRow = rAbove * cols;
          const rBelowRow = rBelow * cols;

          for (let c = 0; c < cols; c++) {
            const cLeft = (c - 1 + cols) % cols;
            const cRight = (c + 1) % cols;

            const neighbors =
              grid[rAboveRow + cLeft] +
              grid[rAboveRow + c] +
              grid[rAboveRow + cRight] +
              grid[rRow + cLeft] +
              grid[rRow + cRight] +
              grid[rBelowRow + cLeft] +
              grid[rBelowRow + c] +
              grid[rBelowRow + cRight];

            const idx = rRow + c;
            const alive = grid[idx];

            if (alive === 1 && (neighbors === 2 || neighbors === 3)) {
              nextGrid[idx] = 1;
              ageGrid[idx] = Math.min(100, ageGrid[idx] + 1);
              liveCount++;
            } else if (alive === 0 && neighbors === 3) {
              nextGrid[idx] = 1;
              ageGrid[idx] = 1;
              liveCount++;
            } else {
              nextGrid[idx] = 0;
              // Diminish age for phosphor decay trail
              if (ageGrid[idx] > 0) {
                ageGrid[idx] = Math.max(0, ageGrid[idx] - 2);
              }
            }
          }
        }

        // Swap buffers
        grid.set(nextGrid);
        setPopulation(liveCount);
      }

      // Render Living Cells with Spectral Colors
      for (let r = 0; r < rows; r++) {
        const rRow = r * cols;
        for (let c = 0; c < cols; c++) {
          const idx = rRow + c;
          const alive = grid[idx];
          const age = ageGrid[idx];

          if (alive === 1) {
            // New cells glow electric cyan; mature cells transition into emerald and stardust amber
            if (age <= 2) {
              ctx.fillStyle = '#00e5ff'; // Radiant Cyan
            } else if (age < 15) {
              ctx.fillStyle = '#10b981'; // Emerald
            } else if (age < 40) {
              ctx.fillStyle = '#a855f7'; // Cosmic Violet
            } else {
              ctx.fillStyle = '#fbbf24'; // Amber Pulsar
            }
            ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
          } else if (age > 0) {
            // Ghost Phosphor Trail
            const alpha = (age / 100) * 0.18;
            ctx.fillStyle = `rgba(0, 229, 255, ${alpha.toFixed(3)})`;
            ctx.fillRect(c * cellSize + 2, r * cellSize + 2, cellSize - 4, cellSize - 4);
          }
        }
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [clearGrid, injectPattern, randomizeGrid]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050508] text-zinc-300 font-mono select-none">
      {/* 1. Full-Screen Living Spacetime Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 cursor-crosshair block"
      />

      {/* 2. Micro-HUD Top Bar (Strict 8px - 10px Typography) */}
      <header className="absolute top-0 inset-x-0 z-20 pointer-events-none p-3 sm:p-4 flex items-center justify-between text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-400 bg-gradient-to-b from-black/80 via-black/30 to-transparent">
        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-950/80 border border-emerald-500/30 text-emerald-400 shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>SAHIL RATHEE // SYSTEMS & INFRA</span>
          </div>

          <div className="hidden md:flex items-center gap-2 px-2 py-1 rounded bg-zinc-950/60 border border-zinc-800/80 text-zinc-400 backdrop-blur-md">
            <span>SPACETIME: GAME_OF_LIFE</span>
            <span className="text-zinc-600">•</span>
            <span className="text-cyan-400">GEN: {generation}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-emerald-400">POP: {population}</span>
            <span className="text-zinc-600">•</span>
            <span>{fps} FPS</span>
          </div>
        </div>

        {/* Action Controls & Tell About Me Trigger */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setShowAboutMe(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 transition-all shadow-sm active:scale-95"
            title="Tell About Me"
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span className="font-bold">TELL ABOUT ME</span>
          </button>

          <button
            onClick={() => setIsPaused(p => !p)}
            className="p-1 sm:px-2 sm:py-1 rounded bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 transition-all"
            title={isPaused ? 'Resume Life (Space)' : 'Pause Life (Space)'}
          >
            {isPaused ? <Play className="w-2.5 h-2.5 text-emerald-400" /> : <Pause className="w-2.5 h-2.5 text-amber-400" />}
          </button>

          <button
            onClick={() => randomizeGrid(0.08)}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 transition-all"
            title="Randomize Spacetime (R)"
          >
            <RotateCcw className="w-2.5 h-2.5 text-cyan-400" />
            <span>SEED</span>
          </button>

          <button
            onClick={clearGrid}
            className="p-1 sm:px-2 sm:py-1 rounded bg-zinc-950/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-red-400 transition-all"
            title="Empty Space (C)"
          >
            <X className="w-2.5 h-2.5" />
          </button>
        </div>
      </header>

      {/* 3. Center Atmospheric Cue (Fades out when engaged) */}
      {!showAboutMe && (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-2 max-w-lg bg-zinc-950/30 backdrop-blur-[2px] p-4 rounded-xl border border-white/[0.04]">
            <p className="text-[10px] sm:text-[11px] font-semibold tracking-[0.25em] text-zinc-200">
              CLICK OR DRAG ANYWHERE TO INFUSE LIFE IN SPACE
            </p>
            <p className="text-[8px] sm:text-[9px] tracking-widest text-zinc-400">
              CELLULAR AUTOMATA ENGINE // GO · PYTHON · KUBERNETES // SUB-MS INFRASTRUCTURE
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowAboutMe(true)}
                className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-[9px] text-cyan-300 font-bold tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,229,255,0.15)]"
              >
                <Info className="w-3 h-3" />
                <span>CLICK TO TELL ABOUT ME</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. "Tell About Me" Spacetime Modal Overlay (Strict Micro-Type 8px to 10px) */}
      {showAboutMe && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md">
          <div className="w-full max-w-3xl max-h-[92vh] overflow-y-auto bg-zinc-950 border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] p-4 sm:p-6 flex flex-col gap-4 text-zinc-300">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <h1 className="text-[12px] sm:text-[13px] font-bold text-white tracking-widest uppercase">
                    Sahil Rathee
                  </h1>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 font-bold">
                    AVAILABLE FOR ROLES
                  </span>
                </div>
                <p className="text-[9px] text-cyan-400 tracking-wider mt-0.5">
                  Senior Systems & Infrastructure Engineer • Distributed Backends & Low-Latency
                </p>
              </div>

              <button
                onClick={() => setShowAboutMe(false)}
                className="p-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                title="Return to Playground (Esc/T)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Micro Tab Selector */}
            <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-2 text-[8px] sm:text-[9px] uppercase tracking-widest">
              {(['about', 'metrics', 'experience', 'stack'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-2.5 py-1 rounded transition-all ${
                    activeTab === tab
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 font-bold'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            {activeTab === 'about' && (
              <div className="space-y-3 text-[9px] leading-relaxed text-zinc-300">
                <p className="text-zinc-200">
                  Specializing in resilient distributed architectures, sub-millisecond execution engines, Go, Python, and Kubernetes. Built scalable backends, automated cloud infrastructure, and low-latency systems at <strong className="text-cyan-300 font-semibold">GymWise</strong>, <strong className="text-emerald-300 font-semibold">BigHit</strong>, and <strong className="text-amber-300 font-semibold">Gamix Labs</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[8px]">
                  <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                    <div className="text-cyan-400 font-bold tracking-wider flex items-center gap-1.5">
                      <Cpu className="w-3 h-3" />
                      <span>HIGH-PERFORMANCE SYSTEMS</span>
                    </div>
                    <p className="text-zinc-400">
                      Sub-millisecond socket execution bridges, IPC memory sharing, real-time telemetry processing across Linux headless kernels.
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-zinc-900/60 border border-zinc-800/80 space-y-1">
                    <div className="text-emerald-400 font-bold tracking-wider flex items-center gap-1.5">
                      <Shield className="w-3 h-3" />
                      <span>ZERO TRUST INFRASTRUCTURE</span>
                    </div>
                    <p className="text-zinc-400">
                      Isolated container networks, zero exposed public DB ports, declarative Terraform IaC, and automated CI/CD pipelines.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <a
                    href="/Sahil-Rathee-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/50 text-emerald-300 font-bold tracking-wider text-[8px] transition-all"
                  >
                    <FileText className="w-3 h-3" />
                    <span>DOWNLOAD RESUME PDF</span>
                  </a>

                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 text-cyan-300 font-bold tracking-wider text-[8px] transition-all"
                  >
                    <Mail className="w-3 h-3" />
                    <span>EMAIL ME</span>
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-[8px] transition-all"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? 'COPIED' : 'COPY EMAIL'}</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'metrics' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[8px]">
                <div className="p-3 rounded-lg bg-zinc-900/80 border border-cyan-500/20 space-y-1">
                  <div className="text-[14px] font-bold text-cyan-400">&lt; 1ms</div>
                  <div className="font-bold text-zinc-200">EXECUTION LATENCY</div>
                  <div className="text-zinc-400 text-[7px] leading-tight">Headless Linux MT5 Bridge & Direct Socket Architecture</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-emerald-500/20 space-y-1">
                  <div className="text-[14px] font-bold text-emerald-400">-80%</div>
                  <div className="font-bold text-zinc-200">API LATENCY & SIZE</div>
                  <div className="text-zinc-400 text-[7px] leading-tight">Optimized queries, caching & modular core architecture</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-amber-500/20 space-y-1">
                  <div className="text-[14px] font-bold text-amber-400">+60%</div>
                  <div className="font-bold text-zinc-200">INFRA EFFICIENCY</div>
                  <div className="text-zinc-400 text-[7px] leading-tight">AWS Neptune, OpenSearch & Terraform automation</div>
                </div>

                <div className="p-3 rounded-lg bg-zinc-900/80 border border-purple-500/20 space-y-1">
                  <div className="text-[14px] font-bold text-purple-400">0 Ports</div>
                  <div className="font-bold text-zinc-200">PUBLIC DB EXPOSURE</div>
                  <div className="text-zinc-400 text-[7px] leading-tight">Strict Zero Trust private VPC & Cloudflare Tunnels</div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className="space-y-2 text-[8px]">
                <div className="p-2.5 rounded bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center justify-between font-bold text-cyan-300">
                    <span>GAMIX LABS // LEAD SYSTEMS & MULTI-AGENT ARCHITECT</span>
                    <span className="text-zinc-400 font-normal">2024 — PRESENT</span>
                  </div>
                  <p className="text-zinc-400 mt-1 leading-relaxed">
                    Designed distributed multi-agent container mesh, AST-level token pruning runtime, and autonomous tool sandboxing.
                  </p>
                </div>

                <div className="p-2.5 rounded bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center justify-between font-bold text-emerald-300">
                    <span>BIGHIT SPORTZ // DEVOPS & DISTRIBUTED BACKEND</span>
                    <span className="text-zinc-400 font-normal">2023 — 2024</span>
                  </div>
                  <p className="text-zinc-400 mt-1 leading-relaxed">
                    Automated AWS cloud infrastructure via Terraform; cut API latency by 80% and reduced client bundle footprint by 80%.
                  </p>
                </div>

                <div className="p-2.5 rounded bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center justify-between font-bold text-amber-300">
                    <span>GYMWISE // CORE BACKEND & TELEMETRY ARCHITECT</span>
                    <span className="text-zinc-400 font-normal">2022 — 2023</span>
                  </div>
                  <p className="text-zinc-400 mt-1 leading-relaxed">
                    Engineered high-throughput booking and biometric telemetry ingestion pipelines using PostgreSQL, Redis, and Go.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'stack' && (
              <div className="space-y-2 text-[8px]">
                <div className="flex flex-wrap gap-1.5">
                  {['Go (Golang)', 'Python', 'Kubernetes', 'Docker', 'PostgreSQL 16', 'Redis', 'NATS', 'AWS', 'Oracle Cloud (OCI)', 'Terraform', 'Linux Kernel/IPC', 'Zero Trust', 'FFmpeg', 'Node.js', 'Flutter/Dart', 'Cloudflare Edge'].map(tech => (
                    <span key={tech} className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer with Direct Social Channels */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80 text-[8px]">
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/rttss-sahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                  title="GitHub"
                >
                  <GitHubLogo className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://linkedin.com/in/rttss-sahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-[#0A66C2] transition-all"
                  title="LinkedIn"
                >
                  <LinkedInLogo className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://x.com/rttss_sahil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-all"
                  title="X"
                >
                  <XLogo className="w-3 h-3" />
                </a>
                <a
                  href="https://leetcode.com/u/rttss-sahil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-[#FFA116] transition-all"
                  title="LeetCode"
                >
                  <LeetCodeLogo className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://www.instagram.com/rttss_sahil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-[#E4405F] transition-all"
                  title="Instagram"
                >
                  <InstagramLogo className="w-3.5 h-3.5" />
                </a>
              </div>

              <button
                onClick={() => setShowAboutMe(false)}
                className="px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold tracking-widest hover:text-white transition-all"
              >
                RETURN TO PLAYGROUND [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Micro-HUD Bottom Dock (Strict 8px - 10px Typography) */}
      <footer className="absolute bottom-0 inset-x-0 z-20 pointer-events-none p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 text-[8px] sm:text-[9px] uppercase tracking-widest text-zinc-500 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="text-zinc-400">POINTER: X:{pointerPos.x} Y:{pointerPos.y}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <span>BRUSH:</span>
            {(['cluster', 'glider', 'pulsar', 'single'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setBrushMode(mode)}
                className={`px-1.5 py-0.5 rounded transition-all ${
                  brushMode === mode
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto text-[8px]">
          <a
            href="/Sahil-Rathee-Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            RESUME PDF
          </a>
          <span>•</span>
          <a
            href={`mailto:${email}`}
            className="hover:text-cyan-400 transition-colors"
          >
            {email}
          </a>
          <span>•</span>
          <span className="text-zinc-600">NEW DELHI, IN</span>
        </div>
      </footer>
    </div>
  );
};
