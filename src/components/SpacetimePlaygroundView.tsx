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
  X,
  ExternalLink,
  Terminal,
  Activity,
  Cpu,
  Shield,
  Layers,
  ArrowRight,
  Zap,
  Server,
  Database,
  Radio,
  Eye,
  Minimize2,
  Maximize2,
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

interface SkillTileData {
  id: string;
  name: string;
  category: string;
  metric: string;
  detail: string;
  x?: number;
  y?: number;
}

interface CompanyLifeSeed {
  id: string;
  name: string;
  role: string;
  tenure: string;
  patternType: 'acorn' | 'pulsar' | 'glider_gun' | 'swarm';
  metrics: string[];
  description: string;
  stack: string[];
  color: string;
}

// ---------------------------------------------------------------------------
// Skill tiles pool in vibrant TRON Electric Orange
// ---------------------------------------------------------------------------
const SKILL_TILES_DATA: SkillTileData[] = [
  {
    id: 'go',
    name: 'GO // LOW-LATENCY IPC',
    category: 'SYSTEMS',
    metric: '< 0.8ms p99',
    detail: 'High-frequency socket bridge, zero-allocation memory pools, micro-engine pipelines.',
  },
  {
    id: 'k8s',
    name: 'KUBERNETES // ORCHESTRATION',
    category: 'INFRASTRUCTURE',
    metric: '99.99% SLA',
    detail: 'Declarative state controllers, zero-downtime rolling deploys, resource guardrails.',
  },
  {
    id: 'dist',
    name: 'DISTRIBUTED BACKENDS',
    category: 'ARCHITECTURE',
    metric: 'Zero State Leak',
    detail: 'Event-driven microservices, CQRS pattern, idempotent workers, distributed locks.',
  },
  {
    id: 'python',
    name: 'PYTHON // ASYNCIO CORE',
    category: 'ENGINES',
    metric: '25k req/sec',
    detail: 'FastAPI async network engines, algorithmic daemons, sub-second telemetry aggregation.',
  },
  {
    id: 'linux',
    name: 'LINUX KERNEL & EBPF',
    category: 'LOW LEVEL',
    metric: 'Sub-ms Syscalls',
    detail: 'Process namespace isolation, raw socket captures, memory-mapped rings, kernel tuning.',
  },
  {
    id: 'terraform',
    name: 'TERRAFORM // ZERO-COST IAC',
    category: 'DEVOPS',
    metric: '$0.00 Spend Guard',
    detail: 'Declarative cloud infrastructure, multi-domain routing, zero-cost OCI cloud compliance.',
  },
  {
    id: 'docker',
    name: 'DOCKER // MICROSERVICE MESH',
    category: 'CONTAINERS',
    metric: '18 Containers Live',
    detail: 'Isolated bridge networks, multi-stage minimal builds, strict container security.',
  },
  {
    id: 'postgres',
    name: 'POSTGRESQL // QUERY TUNING',
    category: 'DATA',
    metric: 'EXPLAIN < 3ms',
    detail: 'Partitioned time-series tables, connection pooling, zero exposed database ports.',
  },
  {
    id: 'redis',
    name: 'REDIS // HIGH-IOPS IN-MEMORY',
    category: 'CACHING',
    metric: '> 120k ops/sec',
    detail: 'Distributed locking, pub/sub telemetry streams, low-latency leaderboard state.',
  },
  {
    id: 'kafka',
    name: 'KAFKA // EVENT STREAMING',
    category: 'PIPELINES',
    metric: 'Zero Loss Replay',
    detail: 'Partitioned event topics, compaction strategies, resilient consumer groups.',
  },
  {
    id: 'networking',
    name: 'HIGH-CONCURRENCY SOCKETS',
    category: 'NETWORKING',
    metric: '100k Concurrency',
    detail: 'WebSocket multiplexing, TLS termination, TCP keep-alive, zero buffer bloat.',
  },
  {
    id: 'hft',
    name: 'HFT ALGORITHMIC TERMINAL',
    category: 'FINTECH',
    metric: '19.8ms Global Ping',
    detail: 'Market volatility arbiters, order flow imbalance detectors, automated risk guards.',
  },
];

// ---------------------------------------------------------------------------
// Starting Life of Companies (Interactive Cellular Life Seeds)
// ---------------------------------------------------------------------------
const COMPANY_LIFE_SEEDS: CompanyLifeSeed[] = [
  {
    id: 'gymwise',
    name: 'GYMWISE',
    role: 'Lead Systems Architect & Full-Stack',
    tenure: 'Production Ecosystem',
    patternType: 'acorn',
    metrics: ['99.99% Uptime', 'Multi-Tenant DB', 'Real-Time Telemetry'],
    description:
      'Engineered scalable fitness & facility platform with distributed booking engine, real-time access telemetry, and isolated multi-tenant PostgreSQL schema.',
    stack: ['Go', 'PostgreSQL', 'Docker', 'Redis', 'WebSockets'],
    color: '#ff7700', // Tron Orange
  },
  {
    id: 'bighit',
    name: 'BIGHIT',
    role: 'Senior Backend Systems Engineer',
    tenure: 'High-Throughput Production',
    patternType: 'pulsar',
    metrics: ['100k+ Flash Traffic', '< 50ms Response', 'Zero Oversell'],
    description:
      'Architected high-concurrency event ticketing backend handling massive flash surges during national releases with Redis distributed locking and queue compaction.',
    stack: ['Go', 'Kafka', 'Kubernetes', 'Redis', 'AWS'],
    color: '#00f0ff', // Tron Cyan
  },
  {
    id: 'gamix',
    name: 'GAMIX LABS',
    role: 'Game Systems & Network Engine Engineer',
    tenure: 'Real-Time Multiplayer',
    patternType: 'glider_gun',
    metrics: ['UDP Reconciliation', '60Hz Engine Clock', 'Spatial Sharding'],
    description:
      'Developed custom multiplayer UDP protocols, client-side prediction, entity interpolation, and low-jitter physics synchronization for interactive titles.',
    stack: ['C++', 'Python', 'UDP/TCP', 'Docker', 'Linux Sockets'],
    color: '#c084fc', // Neon Purple
  },
  {
    id: 'infortts',
    name: 'INFORTTS SWARM',
    role: 'Founder & Autonomous Systems Architect',
    tenure: 'Live Sovereign Fleet',
    patternType: 'swarm',
    metrics: ['$0.00 OCI Free Guard', '18 Active Microservices', 'Sub-1ms IPC'],
    description:
      'Architected complete sovereign autonomous cloud mesh, high-frequency market intelligence engine, multi-terminal MT5 bridge, and private zero-trust container fabric.',
    stack: ['Go', 'Flutter', 'Python', 'Docker', 'Terraform', 'WireGuard'],
    color: '#e6b450', // Ayu Cyber Gold
  },
];

export const SpacetimePlaygroundView: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Experience Mode: Tron Matrix vs Simple Mode
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [showInitialPrompt, setShowInitialPrompt] = useState<boolean>(true);

  // Simulation State
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [generation, setGeneration] = useState<number>(0);
  const [population, setPopulation] = useState<number>(0);
  const [fps, setFps] = useState<number>(60);
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Interactive In-Game HUD Elements
  const [activeCompany, setActiveCompany] = useState<CompanyLifeSeed | null>(null);
  const [activeSkillTiles, setActiveSkillTiles] = useState<SkillTileData[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<SkillTileData | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [brushMode, setBrushMode] = useState<'cluster' | 'glider' | 'pulsar' | 'acorn' | 'gun'>('cluster');

  const email = 'sahil.artits.rathee@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Mutable refs for 60fps Tron animation loop
  const simRef = useRef({
    grid: new Uint8Array(0),
    nextGrid: new Uint8Array(0),
    ageGrid: new Uint16Array(0),
    colorGrid: new Uint8Array(0), // 0: Cyan, 1: Orange, 2: Purple, 3: Gold
    cols: 0,
    rows: 0,
    cellSize: 10,
    isPaused: false,
    speed: 1,
    generation: 0,
    shockwaves: [] as { x: number; y: number; radius: number; maxRadius: number; color: string }[],
    skillSpawnIdx: 0,
  });

  useEffect(() => {
    simRef.current.isPaused = isPaused;
    simRef.current.speed = speed;
  }, [isPaused, speed]);

  // Global Ctrl+P / Cmd+P listener to toggle Simple Mode seamlessly with escape route
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        setIsSimpleMode(prev => !prev);
        setShowInitialPrompt(false);
      }
      if (e.key === 'Escape') {
        if (activeCompany) setActiveCompany(null);
        if (hoveredSkill) setHoveredSkill(null);
        setShowInitialPrompt(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCompany, hoveredSkill]);

  // Dismiss gentle prompt automatically after 8 seconds if untouched
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialPrompt(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  // ---------------------------------------------------------------------------
  // Conway Life Engine with Tron Life Seeds
  // ---------------------------------------------------------------------------
  const injectPattern = useCallback(
    (centerR: number, centerC: number, pattern: string, colorType = 0) => {
      const { rows, cols, grid, ageGrid, colorGrid } = simRef.current;
      if (rows === 0 || cols === 0) return;

      const setCell = (dr: number, dc: number) => {
        const r = (centerR + dr + rows) % rows;
        const c = (centerC + dc + cols) % cols;
        const idx = r * cols + c;
        grid[idx] = 1;
        ageGrid[idx] = 1;
        colorGrid[idx] = colorType;
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
      } else if (pattern === 'acorn') {
        // Methuselah acorn: grows for thousands of generations
        const acorn = [
          [0, 1],
          [1, 3],
          [2, 0],
          [2, 1],
          [2, 4],
          [2, 5],
          [2, 6],
        ];
        acorn.forEach(([dr, dc]) => setCell(dr - 1, dc - 3));
      } else if (pattern === 'glider_gun' || pattern === 'gun') {
        // Gosper Glider Gun
        const gun = [
          [5, 1], [5, 2], [6, 1], [6, 2],
          [5, 11], [6, 11], [7, 11], [4, 12], [8, 12], [3, 13], [9, 13], [3, 14], [9, 14],
          [6, 15], [4, 16], [8, 16], [5, 17], [6, 17], [7, 17], [6, 18],
          [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22], [2, 23], [6, 23],
          [1, 25], [2, 25], [6, 25], [7, 25],
          [3, 35], [4, 35], [3, 36], [4, 36]
        ];
        gun.forEach(([dr, dc]) => setCell(dr - 5, dc - 18));
      } else if (pattern === 'swarm') {
        // Sovereign Swarm (Triple Pentadecathlon + Glider Ring)
        for (let offset = -8; offset <= 8; offset += 8) {
          const penta = [
            [-4, offset], [-3, offset], [-2, offset - 1], [-2, offset + 1],
            [-1, offset], [0, offset], [1, offset], [2, offset],
            [3, offset - 1], [3, offset + 1], [4, offset], [5, offset]
          ];
          penta.forEach(([dr, dc]) => setCell(dr, dc));
        }
      } else {
        // Cluster
        for (let dr = -2; dr <= 2; dr++) {
          for (let dc = -2; dc <= 2; dc++) {
            if (Math.random() > 0.35) {
              setCell(dr, dc);
            }
          }
        }
      }
    },
    []
  );

  // Spawn company-specific living seed onto canvas
  const handleSpawnCompanySeed = (company: CompanyLifeSeed) => {
    setActiveCompany(company);
    const { rows, cols } = simRef.current;
    if (rows === 0 || cols === 0) return;

    // Clear slight ambient noise and place company seed dead-center
    const centerR = Math.floor(rows / 2);
    const centerC = Math.floor(cols / 2);

    let colorType = 0;
    if (company.id === 'gymwise') colorType = 1; // Orange
    if (company.id === 'bighit') colorType = 0; // Cyan
    if (company.id === 'gamix') colorType = 2; // Purple
    if (company.id === 'infortts') colorType = 3; // Gold

    injectPattern(centerR, centerC, company.patternType, colorType);

    // Shockwave pulse
    simRef.current.shockwaves.push({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      radius: 10,
      maxRadius: Math.max(window.innerWidth, window.innerHeight) * 0.75,
      color: company.color,
    });
  };

  // Spawn an Orange Skill Tile on canvas click
  const triggerSkillTileSpawn = (clientX: number, clientY: number) => {
    const nextSkill = SKILL_TILES_DATA[simRef.current.skillSpawnIdx % SKILL_TILES_DATA.length];
    simRef.current.skillSpawnIdx++;

    const newTile: SkillTileData = {
      ...nextSkill,
      x: clientX,
      y: clientY,
    };

    setActiveSkillTiles(prev => {
      // Keep up to 6 tiles on screen, adding newest
      const updated = [newTile, ...prev.filter(t => t.id !== newTile.id)];
      return updated.slice(0, 5);
    });

    setHoveredSkill(newTile);

    // Add bright orange shockwave
    simRef.current.shockwaves.push({
      x: clientX,
      y: clientY,
      radius: 4,
      maxRadius: 180,
      color: '#ff7700',
    });
  };

  const randomizeGrid = useCallback((density = 0.07) => {
    const { rows, cols, grid, ageGrid, colorGrid } = simRef.current;
    let pop = 0;
    for (let i = 0; i < grid.length; i++) {
      const alive = Math.random() < density ? 1 : 0;
      grid[i] = alive;
      ageGrid[i] = alive ? 1 : 0;
      colorGrid[i] = Math.random() > 0.7 ? 1 : 0; // Mix cyan and orange
      if (alive) pop++;
    }
    setPopulation(pop);
    setGeneration(0);
    simRef.current.generation = 0;
  }, []);

  const clearGrid = useCallback(() => {
    const { grid, ageGrid, colorGrid } = simRef.current;
    grid.fill(0);
    ageGrid.fill(0);
    colorGrid.fill(0);
    setPopulation(0);
    setGeneration(0);
    simRef.current.generation = 0;
  }, []);

  // ---------------------------------------------------------------------------
  // Tron Canvas Lifecycle & Render Loop
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (isSimpleMode) return;

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
      simRef.current.colorGrid = new Uint8Array(rows * cols);

      randomizeGrid(0.06);
    };

    resize();
    window.addEventListener('resize', resize);

    // Pointer events on canvas
    const handlePointerSpawn = (clientX: number, clientY: number, isClick = false) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      setPointerPos({ x: Math.round(x), y: Math.round(y) });

      const c = Math.floor(x / cellSize);
      const r = Math.floor(y / cellSize);

      if (isClick) {
        // Clicking explicitly gives Orange Skill Tiles + Infuses life
        injectPattern(r, c, brushMode, 1);
        triggerSkillTileSpawn(clientX, clientY);
      } else {
        // Dragging subtly infuses life
        if (Math.random() > 0.45) {
          injectPattern(r, c, 'cluster', 0);
        }
      }
    };

    let isMouseDown = false;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      handlePointerSpawn(e.clientX, e.clientY, true);
    };

    const onMouseMove = (e: MouseEvent) => {
      handlePointerSpawn(e.clientX, e.clientY, false);
      if (isMouseDown) {
        handlePointerSpawn(e.clientX, e.clientY, false);
      }
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
        handlePointerSpawn(t.clientX, t.clientY, false);
      }
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    // Step the Cellular Automata
    const stepSimulation = () => {
      const { rows, cols, grid, nextGrid, ageGrid, colorGrid } = simRef.current;
      if (rows === 0 || cols === 0) return 0;

      let living = 0;

      for (let r = 0; r < rows; r++) {
        const rPrev = (r - 1 + rows) % rows;
        const rNext = (r + 1) % rows;
        const rowOffset = r * cols;
        const rowPrevOffset = rPrev * cols;
        const rowNextOffset = rNext * cols;

        for (let c = 0; c < cols; c++) {
          const cPrev = (c - 1 + cols) % cols;
          const cNext = (c + 1) % cols;

          const neighbors =
            grid[rowPrevOffset + cPrev] +
            grid[rowPrevOffset + c] +
            grid[rowPrevOffset + cNext] +
            grid[rowOffset + cPrev] +
            grid[rowOffset + cNext] +
            grid[rowNextOffset + cPrev] +
            grid[rowNextOffset + c] +
            grid[rowNextOffset + cNext];

          const idx = rowOffset + c;
          const state = grid[idx];

          if (state === 1) {
            if (neighbors === 2 || neighbors === 3) {
              nextGrid[idx] = 1;
              ageGrid[idx] = Math.min(ageGrid[idx] + 1, 255);
              living++;
            } else {
              nextGrid[idx] = 0;
              ageGrid[idx] = 0;
            }
          } else {
            if (neighbors === 3) {
              nextGrid[idx] = 1;
              ageGrid[idx] = 1;
              // Inherit neighbor color
              const parentColor = colorGrid[rowPrevOffset + c] || colorGrid[rowOffset + cPrev] || 0;
              colorGrid[idx] = parentColor;
              living++;
            } else {
              nextGrid[idx] = 0;
            }
          }
        }
      }

      grid.set(nextGrid);
      simRef.current.generation++;
      return living;
    };

    // Render loop with Tron glow & vectors
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = performance.now();

    const loop = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      frameCount++;
      if (now - fpsTimer >= 500) {
        setFps(Math.round((frameCount * 1000) / (now - fpsTimer)));
        frameCount = 0;
        fpsTimer = now;
      }

      if (!simRef.current.isPaused) {
        const pop = stepSimulation();
        setPopulation(pop);
        setGeneration(simRef.current.generation);
      }

      // ── Draw Tron Canvas ──
      const w = window.innerWidth;
      const h = window.innerHeight;
      const { rows, cols, grid, ageGrid, colorGrid, cellSize, shockwaves } = simRef.current;

      // Deep void background
      ctx.fillStyle = '#04060d';
      ctx.fillRect(0, 0, w, h);

      // Subtle Tron vector grid lines
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += cellSize * 3) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += cellSize * 3) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw Cells with Tron Neon Bloom
      for (let r = 0; r < rows; r++) {
        const rowOffset = r * cols;
        const py = r * cellSize;

        for (let c = 0; c < cols; c++) {
          const idx = rowOffset + c;
          if (grid[idx] === 1) {
            const age = ageGrid[idx];
            const colorType = colorGrid[idx];
            const px = c * cellSize;

            // Pick Tron color palette
            if (colorType === 1) {
              // Vibrant Tron Electric Orange
              ctx.fillStyle = age === 1 ? '#ff9900' : age < 8 ? '#ff7700' : '#cc5500';
              ctx.shadowColor = '#ff7700';
            } else if (colorType === 2) {
              // Neon Purple
              ctx.fillStyle = age === 1 ? '#e9d5ff' : '#c084fc';
              ctx.shadowColor = '#c084fc';
            } else if (colorType === 3) {
              // Cyber Gold
              ctx.fillStyle = age === 1 ? '#fef08a' : '#e6b450';
              ctx.shadowColor = '#e6b450';
            } else {
              // Default Tron Electric Cyan
              ctx.fillStyle = age === 1 ? '#67e8f9' : age < 8 ? '#00f0ff' : '#0891b2';
              ctx.shadowColor = '#00f0ff';
            }

            ctx.shadowBlur = age < 5 ? 8 : 4;
            ctx.fillRect(px + 1, py + 1, cellSize - 2, cellSize - 2);
          }
        }
      }

      // Reset shadow blur for clean vector overlays
      ctx.shadowBlur = 0;

      // Draw interactive shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 6;
        const alpha = Math.max(0, 1 - sw.radius / sw.maxRadius);

        ctx.strokeStyle = sw.color;
        ctx.globalAlpha = alpha * 0.7;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = 1.0;

        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
    };
  }, [isSimpleMode, brushMode, randomizeGrid, injectPattern]);

  // ---------------------------------------------------------------------------
  // View 1: Simple Mode (Clean Portfolio & Resume view, toggled via Ctrl+P)
  // ---------------------------------------------------------------------------
  if (isSimpleMode) {
    return (
      <div className="w-screen h-screen overflow-y-auto bg-[#07090e] text-zinc-100 font-mono select-text">
        {/* Top Tron Navigation Bar with Escape Route */}
        <header className="sticky top-0 z-50 bg-[#07090e]/95 backdrop-blur-md border-b border-cyan-500/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00f0ff]" />
            <span className="text-[12px] font-bold tracking-widest text-white uppercase">
              SAHIL RATHEE // SIMPLE PORTFOLIO
            </span>
            <span className="text-[9px] px-2 py-0.5 rounded bg-orange-950/60 border border-orange-500/40 text-orange-400 font-bold">
              CLEAN MODE
            </span>
          </div>

          <button
            onClick={() => setIsSimpleMode(false)}
            className="flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/60 text-[10px] text-cyan-300 font-bold tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_12px_rgba(0,240,255,0.25)]"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>RETURN TO MATRIX GAME (Ctrl+P)</span>
          </button>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-10 space-y-12">
          {/* Hero Section */}
          <section className="space-y-4 border-b border-zinc-800 pb-8">
            <div className="flex items-center gap-2 text-cyan-400 text-[10px] tracking-widest">
              <span>SENIOR SYSTEMS & INFRASTRUCTURE ENGINEER</span>
              <span>•</span>
              <span>LOW-LATENCY BACKENDS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sahil Rathee
            </h1>
            <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">
              Specializing in resilient distributed architectures, sub-millisecond execution engines,
              Go, Python, and Kubernetes. Built scalable backends, automated cloud infrastructure, and
              high-throughput systems at <strong className="text-orange-400">GymWise</strong>,{' '}
              <strong className="text-cyan-400">BigHit</strong>, and{' '}
              <strong className="text-purple-400">Gamix Labs</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-2 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs text-zinc-200 transition-all active:scale-95"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedEmail ? 'EMAIL COPIED' : email}</span>
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-xs text-cyan-300 font-bold transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>DOWNLOAD RESUME PDF</span>
              </a>

              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/SahilRathee"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <GitHubLogo className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://linkedin.com/in/sahil-rathee"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <LinkedInLogo className="w-4 h-4 fill-current" />
                </a>
              </div>
            </div>
          </section>

          {/* Technical Skills Grid (In Tron Orange & Cyan) */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-orange-400 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>CORE TECHNICAL EXPERTISE (TRON TILES)</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SKILL_TILES_DATA.map(skill => (
                <div
                  key={skill.id}
                  className="p-3.5 rounded-lg bg-zinc-950/80 border border-orange-500/30 hover:border-orange-400 transition-all shadow-[0_0_15px_rgba(255,119,0,0.06)]"
                >
                  <div className="flex items-center justify-between text-[10px] text-zinc-400 pb-1">
                    <span className="text-orange-400 font-bold">{skill.category}</span>
                    <span className="text-emerald-400 font-bold">{skill.metric}</span>
                  </div>
                  <h3 className="text-xs font-bold text-white tracking-wide">{skill.name}</h3>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{skill.detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Company Chronology Experience */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
              <Radio className="w-4 h-4" />
              <span>COMPANY CHRONOLOGY & PRODUCTION IMPACT</span>
            </h2>

            <div className="space-y-4">
              {COMPANY_LIFE_SEEDS.map(company => (
                <div
                  key={company.id}
                  className="p-5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-extrabold text-white tracking-wide">
                      {company.name}
                    </h3>
                    <span className="text-xs text-cyan-400 font-bold">{company.tenure}</span>
                  </div>
                  <div className="text-xs text-orange-400 font-semibold mt-0.5">{company.role}</div>

                  <p className="text-xs text-zinc-300 mt-3 leading-relaxed">{company.description}</p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {company.metrics.map(m => (
                      <span
                        key={m}
                        className="text-[10px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-emerald-300 font-bold"
                      >
                        {m}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-zinc-800/60">
                    {company.stack.map(st => (
                      <span
                        key={st}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950/40 text-cyan-300 font-semibold"
                      >
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Escape Button */}
          <div className="pt-8 text-center border-t border-zinc-800">
            <button
              onClick={() => setIsSimpleMode(false)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 text-black font-extrabold text-xs tracking-widest hover:bg-cyan-400 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_#00f0ff]"
            >
              <Maximize2 className="w-4 h-4" />
              <span>LAUNCH TRON MATRIX GAME OF LIFE</span>
            </button>
            <p className="text-[10px] text-zinc-500 mt-2">Press Ctrl+P at any time to return</p>
          </div>
        </main>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // View 2: Tron Spacetime Matrix Engine (The Game Itself)
  // ---------------------------------------------------------------------------
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#04060d] text-zinc-100 font-mono select-none">
      {/* 1. Underlying 60fps Tron Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 block cursor-crosshair" />

      {/* 2. Gentle Initial Startup Dialog (Asking gently with immediate choices) */}
      {showInitialPrompt && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="p-4 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-cyan-500/50 shadow-[0_0_30px_rgba(0,240,255,0.25)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[11px] font-bold text-white tracking-widest uppercase">
                  CHOOSE EXPERIENCE
                </span>
              </div>
              <button
                onClick={() => setShowInitialPrompt(false)}
                className="p-1 rounded text-zinc-400 hover:text-white"
                title="Dismiss (Esc)"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-zinc-300 leading-relaxed">
              Explore Sahil&apos;s systems engineering portfolio through the{' '}
              <strong className="text-cyan-400">Tron Game of Life</strong> or enter{' '}
              <strong className="text-orange-400">Simple Portfolio Mode</strong>.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => setShowInitialPrompt(false)}
                className="flex-1 py-1.5 rounded bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400 text-[10px] text-cyan-300 font-bold tracking-wider transition-all"
              >
                STAY IN MATRIX
              </button>
              <button
                onClick={() => {
                  setShowInitialPrompt(false);
                  setIsSimpleMode(true);
                }}
                className="flex-1 py-1.5 rounded bg-orange-950/80 hover:bg-orange-900 border border-orange-500 text-[10px] text-orange-300 font-bold tracking-wider transition-all"
              >
                SIMPLE MODE (Ctrl+P)
              </button>
            </div>
            <div className="text-[8.5px] text-zinc-500 text-center">
              Toggle anytime with Ctrl+P (or ⌘P). Always an instant escape.
            </div>
          </div>
        </div>
      )}

      {/* 3. Top Cybernetic Tron HUD Header */}
      <header className="absolute top-0 inset-x-0 z-20 pointer-events-none p-3 sm:p-4 flex items-center justify-between">
        {/* Brand identity */}
        <div className="pointer-events-auto flex items-center gap-3 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400 shadow-[0_0_8px_#00f0ff] animate-pulse" />
          <div>
            <div className="text-[11px] font-extrabold text-white tracking-widest uppercase flex items-center gap-2">
              <span>SAHIL RATHEE</span>
              <span className="text-[8px] px-1 rounded bg-emerald-950 border border-emerald-500/50 text-emerald-400">
                LIVE
              </span>
            </div>
            <div className="text-[8.5px] text-cyan-400/80 tracking-wider">
              SYSTEMS ARCHITECT // SUB-MS // K8S
            </div>
          </div>
        </div>

        {/* Global Controls & Ever-Present Escape to Simple Mode */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Simple Mode Toggle (Always a way out!) */}
          <button
            onClick={() => setIsSimpleMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-950/80 hover:bg-orange-900 border border-orange-500/60 text-[9.5px] text-orange-300 font-bold tracking-wider transition-all hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,119,0,0.25)]"
            title="Switch to Clean Developer Portfolio (Ctrl+P / ⌘P)"
          >
            <FileText className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline">SIMPLE MODE</span>
            <span className="text-[8px] px-1 py-0.2 rounded bg-black/40 text-orange-300 font-mono">
              Ctrl+P
            </span>
          </button>

          {/* Play/Pause & Reset */}
          <div className="flex items-center bg-zinc-950/80 backdrop-blur-md rounded-lg border border-zinc-800 p-0.5">
            <button
              onClick={() => setIsPaused(p => !p)}
              className="p-1.5 rounded text-zinc-300 hover:text-cyan-300 hover:bg-zinc-900 transition-all"
              title={isPaused ? 'Resume Life' : 'Pause Life'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={() => randomizeGrid(0.07)}
              className="p-1.5 rounded text-zinc-300 hover:text-cyan-300 hover:bg-zinc-900 transition-all"
              title="Randomize Matrix"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 4. Company Starting Life Seeds Selector (Tron HUD Bar) */}
      <div className="absolute top-16 inset-x-0 z-20 pointer-events-none flex justify-center px-4">
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-1.5 bg-zinc-950/85 backdrop-blur-md px-3 py-2 rounded-xl border border-cyan-500/30 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest pr-2 hidden sm:inline">
            COMPANY LIFE SEEDS:
          </span>

          {COMPANY_LIFE_SEEDS.map(company => {
            const isSelected = activeCompany?.id === company.id;
            return (
              <button
                key={company.id}
                onClick={() => handleSpawnCompanySeed(company)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider transition-all hover:scale-105 active:scale-95 ${
                  isSelected
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                    : 'bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60'
                }`}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: company.color }}
                />
                <span>{company.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Active Company Holographic HUD Card (When a Company Seed is Spawned) */}
      {activeCompany && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4 pointer-events-auto">
          <div
            className="p-4 rounded-xl bg-zinc-950/95 backdrop-blur-lg border shadow-[0_0_35px_rgba(0,0,0,0.9)] space-y-2.5 text-zinc-200"
            style={{ borderColor: activeCompany.color }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: activeCompany.color }}
                  />
                  <h2 className="text-xs sm:text-sm font-extrabold text-white tracking-widest uppercase">
                    {activeCompany.name} // {activeCompany.role}
                  </h2>
                </div>
                <p className="text-[9px] text-zinc-400 mt-0.5">{activeCompany.tenure}</p>
              </div>

              <button
                onClick={() => setActiveCompany(null)}
                className="p-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-zinc-300 leading-relaxed">
              {activeCompany.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeCompany.metrics.map(m => (
                <span
                  key={m}
                  className="text-[8.5px] px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-emerald-300 font-bold"
                >
                  {m}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80 text-[8px] text-zinc-500">
              <span>SEED LIFE PATTERN ACTIVE ON GRID</span>
              <span className="text-cyan-400 font-mono">CLICK ANYWHERE TO SPAWN SKILL TILES</span>
            </div>
          </div>
        </div>
      )}

      {/* 6. Active Orange Skill Tile Floating HUD (Spawned on Canvas Clicks!) */}
      {activeSkillTiles.length > 0 && (
        <div className="absolute bottom-16 inset-x-0 z-20 pointer-events-none flex justify-center px-4">
          <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-2 max-w-4xl">
            {activeSkillTiles.map(tile => {
              const isHovered = hoveredSkill?.id === tile.id;
              return (
                <div
                  key={tile.id}
                  onClick={() => setHoveredSkill(tile)}
                  className={`cursor-pointer p-2.5 rounded-lg bg-zinc-950/90 backdrop-blur-md border transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(255,119,0,0.35)] ${
                    isHovered
                      ? 'border-orange-400 bg-orange-950/40 text-white'
                      : 'border-orange-500/50 text-zinc-200'
                  }`}
                  style={{
                    boxShadow: '0 0 15px rgba(255, 119, 0, 0.3)',
                  }}
                >
                  <div className="flex items-center justify-between gap-3 text-[8.5px]">
                    <span className="text-orange-400 font-bold tracking-wider">{tile.category}</span>
                    <span className="text-emerald-300 font-bold">{tile.metric}</span>
                  </div>
                  <div className="text-[10.5px] font-extrabold text-white tracking-wide mt-0.5">
                    {tile.name}
                  </div>
                  {isHovered && (
                    <div className="text-[9px] text-zinc-400 mt-1 max-w-xs leading-snug">
                      {tile.detail}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7. Center Ambient Cue (Fades gracefully) */}
      {activeSkillTiles.length === 0 && !activeCompany && (
        <div className="absolute inset-0 z-10 pointer-events-none flex flex-col items-center justify-center p-4">
          <div className="text-center space-y-2 max-w-md bg-zinc-950/60 backdrop-blur-[2px] p-4 rounded-xl border border-cyan-500/20 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <p className="text-[11px] font-extrabold tracking-[0.25em] text-cyan-300">
              CLICK ANYWHERE TO REVEAL ORANGE SKILL TILES
            </p>
            <p className="text-[9px] tracking-widest text-zinc-400">
              OR SPAWN COMPANY LIFE SEEDS ABOVE // PRESS CTRL+P FOR SIMPLE MODE
            </p>
          </div>
        </div>
      )}

      {/* 8. Bottom Tron Telemetry Status Bar */}
      <footer className="absolute bottom-0 inset-x-0 z-20 pointer-events-none p-3 flex items-center justify-between text-[8px] sm:text-[9px] tracking-widest text-zinc-400">
        <div className="pointer-events-auto flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800">
          <span>GEN: {generation}</span>
          <span>•</span>
          <span>CELLS: {population}</span>
          <span>•</span>
          <span>{fps} FPS</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-zinc-800">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300"
          >
            {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedEmail ? 'COPIED' : 'SAHIL.ARTITS.RATHEE@GMAIL.COM'}</span>
          </button>
          <span>•</span>
          <button
            onClick={() => setIsSimpleMode(true)}
            className="text-orange-400 hover:text-orange-300 font-bold"
          >
            [Ctrl+P: SIMPLE MODE]
          </button>
        </div>
      </footer>
    </div>
  );
};
