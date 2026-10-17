import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  WORLD,
  CP,
  JM,
  ZONE,
  ROADS,
  RINGS,
  PARKS,
  BUILD,
  riverL,
  inRiver,
  collideBuildings,
  hypot,
  dist,
  clamp,
} from '../game/delhiEngine';

interface ArchitectRunnerGameProps {
  onOpenPhoneCall: () => void;
  onOpenPortfolio: () => void;
  inforttsFeedsCount?: number;
}

interface PipelineAgent {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  label: string;
}

interface DataPacket {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isCollected: boolean;
  type: string;
  district: string;
}

interface GlitchAnomaly {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: string;
  size: number;
  isPurged: boolean;
}

interface TelemetryPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  text: string;
  alpha: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

const ARCHITECT_PULSES = [
  "⚡ Sub-millisecond ring buffers synchronized",
  "🚀 NATS JetStream zero-loss streaming active",
  "🤖 Multi-agent autonomous AI swarm coordinated",
  "📈 Forensic MT5 market execution pipeline online",
  "☁️ High-availability zero-downtime Kubernetes stable",
  "🛡️ Infortts Core security invariants locked"
];

const CORE_STACK_CHIPS = [
  { id: 'distributed', label: '#Distributed-Systems-NATS', color: '#00d2ff' },
  { id: 'forensics', label: '#Forensic-Trading-MT5', color: '#f59e0b' },
  { id: 'ai', label: '#Autonomous-AI-Swarms', color: '#8b5cf6' },
  { id: 'k8s', label: '#Kubernetes-Zero-Downtime', color: '#0ea5e9' },
  { id: 'lowlatency', label: '#Sub-Millisecond-Execution', color: '#10b981' }
];

export const ArchitectRunnerGame: React.FC<ArchitectRunnerGameProps> = ({
  onOpenPhoneCall,
  onOpenPortfolio,
  inforttsFeedsCount = 40,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const radarCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const miniCanvasCacheRef = useRef<HTMLCanvasElement | null>(null);

  // Menu & Modal State
  const [inMenu, setInMenu] = useState<boolean>(true);
  const [guestName, setGuestName] = useState<string>('Guest Engineer');
  const [selectedRole, setSelectedRole] = useState<'systems' | 'agentic'>('systems');
  const [selectedChips, setSelectedChips] = useState<string[]>(['distributed', 'ai']);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  // HUD Gameplay Stats
  const [signalIntegrity, setSignalIntegrity] = useState<number>(100);
  const [stamina, setStamina] = useState<number>(100);
  const [gpsCoords, setGpsCoords] = useState<{ x: number; y: number; district: string }>({
    x: 0,
    y: 0,
    district: 'Central Infortts Spire (CP)',
  });
  const [pipelineCount, setPipelineCount] = useState<number>(1);
  const [currentScore, setCurrentScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const local = localStorage.getItem('artits_architect_highscore');
      return local ? parseInt(local, 10) : 480;
    } catch {
      return 480;
    }
  });

  // Active Objective / Quest Tracker
  const [activeQuest, setActiveQuest] = useState<{ id: string; title: string; progress: string }>({
    id: 'phone',
    title: '📞 Reach the Phone Terminal at Connaught Place to connect with Sahil',
    progress: 'Navigating...',
  });
  const [isNearPhoneTerminal, setIsNearPhoneTerminal] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>(
    'Infortts Core Edge Gateway Online • 40+ Market Feeds Live • High-Throughput Cluster Stable'
  );

  // Touch Joystick State
  const [joystickActive, setJoystickActive] = useState<boolean>(false);
  const [joystickBasePos, setJoystickBasePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [joystickThumbPos, setJoystickThumbPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const joystickVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Game Engine World Refs
  const characterRef = useRef({
    x: CP.x,
    y: CP.y + 120,
    vx: 0,
    vy: 0,
    r: 14,
    heading: -Math.PI / 2,
    baseSpeed: 5.5,
    isDashing: false,
    dashMultiplier: 1.85,
    onHighway: false,
  });

  const cameraRef = useRef({
    x: CP.x - window.innerWidth / 2,
    y: CP.y + 120 - window.innerHeight / 2,
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const mousePosRef = useRef({ x: 0, y: 0, isDown: false, isRightDown: false });

  const dataPacketsRef = useRef<DataPacket[]>([]);
  const glitchesRef = useRef<GlitchAnomaly[]>([]);
  const pipelineRef = useRef<PipelineAgent[]>([]);
  const telemetryPulsesRef = useRef<TelemetryPulse[]>([]);
  const sparksRef = useRef<SparkParticle[]>([]);

  // Infortts Production Systems mapped to Delhi Hubs
  const worldLandmarksRef = useRef({
    commandHQ: { x: CP.x, y: CP.y - 120, radius: 140, name: 'INFORTTS CENTRAL SPIRE' },
    phoneTerminal: { x: CP.x, y: CP.y + 40, radius: 36, name: 'DIRECT CALL TERMINAL' },
    districts: [
      {
        id: 'mitochondria',
        name: 'ZENITH & MITOCHONDRIA',
        subtitle: 'Forensics Workstation @ Jantar Mantar',
        x: JM.x,
        y: JM.y,
        radius: 120,
        pullRadius: 360,
        pullStrength: 1.4,
        color: '#f59e0b',
      },
      {
        id: 'meeseeks',
        name: 'MEESEEKS AI SWARMS',
        subtitle: 'Autonomous AI Swarm @ Mandi House',
        x: 3700,
        y: 2500,
        radius: 110,
        pullRadius: 340,
        pullStrength: 1.25,
        color: '#8b5cf6',
      },
      {
        id: 'roost',
        name: 'ROOST SAAS CITADEL',
        subtitle: 'Multi-Tenant Escrow @ Lodhi Garden',
        x: 3400,
        y: 4620,
        radius: 115,
        pullRadius: 350,
        pullStrength: 1.2,
        color: '#10b981',
      },
      {
        id: 'bighit',
        name: 'BIGHIT CLOUD FOUNDRY',
        subtitle: 'Kubernetes Foundry @ Ramlila Maidan',
        x: 3380,
        y: 1180,
        radius: 115,
        pullRadius: 350,
        pullStrength: 1.35,
        color: '#0ea5e9',
      },
    ],
  });

  // Sound Engine
  const playSynthSound = useCallback((type: 'pulse' | 'collect' | 'zap' | 'ring' | 'thrust') => {
    if (isSoundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      if (type === 'pulse') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.28);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'collect') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'zap') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'ring') {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.frequency.setValueAtTime(440, now);
        osc2.frequency.setValueAtTime(480, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.4);
        osc2.stop(now + 0.4);
      }
    } catch {}
  }, [isSoundMuted]);

  // High score sync
  const syncScore = useCallback((scoreInc: number) => {
    setCurrentScore((prevScore) => {
      const nextScore = prevScore + scoreInc;
      setHighScore((prevHigh) => {
        if (nextScore > prevHigh) {
          try {
            localStorage.setItem('artits_architect_highscore', nextScore.toString());
          } catch {}
          fetch('/api/highscore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: guestName || 'Architect Explorer',
              score: nextScore,
              multiplier: pipelineRef.current.length + 1,
              missionId: 'architect_delhi_engine',
              game: 'architect_delhi_engine',
            }),
          }).catch(() => {});
          return nextScore;
        }
        return prevHigh;
      });
      return nextScore;
    });
  }, [guestName]);

  // Telemetry Sonic Pulse
  const triggerTelemetryPulse = useCallback(() => {
    const char = characterRef.current;
    const pulseText = ARCHITECT_PULSES[Math.floor(Math.random() * ARCHITECT_PULSES.length)];
    playSynthSound('pulse');

    telemetryPulsesRef.current.push({
      x: char.x,
      y: char.y,
      radius: 16,
      maxRadius: 260,
      text: pulseText,
      alpha: 1.0,
    });

    // 1. Collect all microservices in range into pipeline swarm
    let collectedCount = 0;
    dataPacketsRef.current.forEach((p) => {
      if (!p.isCollected) {
        const d = hypot(p.x - char.x, p.y - char.y);
        if (d < 250) {
          p.isCollected = true;
          collectedCount++;
          pipelineRef.current.push({
            x: p.x,
            y: p.y,
            vx: 0,
            vy: 0,
            color: selectedRole === 'systems' ? '#00d2ff' : '#8b5cf6',
            label: p.type,
          });

          // Spark burst on collect
          for (let s = 0; s < 5; s++) {
            sparksRef.current.push({
              x: p.x,
              y: p.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              alpha: 1.0,
              color: '#00d2ff',
              size: 3 + Math.random() * 3,
            });
          }
        }
      }
    });

    if (collectedCount > 0) {
      playSynthSound('collect');
      const nextCount = pipelineRef.current.length + 1;
      setPipelineCount(nextCount);
      syncScore(collectedCount * 120 * nextCount);
      setStatusMsg(`⚡ Recruited ${collectedCount} microservices! Swarm capacity: ${nextCount}`);
    }

    // 2. Purge system glitch anomalies within range
    let purgedCount = 0;
    glitchesRef.current.forEach((g) => {
      if (!g.isPurged) {
        const d = hypot(g.x - char.x, g.y - char.y);
        if (d < 250) {
          g.isPurged = true;
          purgedCount++;

          for (let s = 0; s < 12; s++) {
            sparksRef.current.push({
              x: g.x,
              y: g.y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              alpha: 1.0,
              color: '#00d2ff',
              size: 4 + Math.random() * 4,
            });
          }
        }
      }
    });

    if (purgedCount > 0) {
      playSynthSound('zap');
      syncScore(purgedCount * 250);
      setSignalIntegrity((prev) => Math.min(100, prev + purgedCount * 5));
      setStatusMsg(`🛡️ Purged ${purgedCount} system glitch anomalies! +${purgedCount * 250} Architecture Score.`);
    }
  }, [playSynthSound, selectedRole, syncScore]);

  // Pre-render Vector Minimap Cache
  const buildMiniCache = useCallback(() => {
    const mini = document.createElement('canvas');
    mini.width = 300;
    mini.height = 300;
    const g = mini.getContext('2d');
    if (!g) return;

    const scale = 300 / WORLD;
    g.scale(scale, scale);

    // Deep space ground
    g.fillStyle = '#050811';
    g.fillRect(0, 0, WORLD, WORLD);

    // Parks in cyber emerald
    for (const p of PARKS) {
      g.fillStyle = 'rgba(16, 185, 129, 0.18)';
      if (p.t === 'c' && p.r) {
        g.beginPath();
        g.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        g.fill();
      } else if (p.w && p.h) {
        g.fillRect(p.x, p.y, p.w, p.h);
      }
    }

    // River Yamuna
    g.fillStyle = 'rgba(3, 105, 161, 0.4)';
    g.beginPath();
    for (let y = 0; y <= WORLD; y += 60) g.lineTo(riverL(y), y);
    for (let y = WORLD; y >= 0; y -= 60) g.lineTo(riverL(y) + 300, y);
    g.fill();

    // Roads in dark slate with cyan borders
    g.strokeStyle = 'rgba(15, 23, 42, 0.9)';
    g.lineCap = 'round';
    g.lineJoin = 'round';
    for (const r of ROADS) {
      g.lineWidth = Math.max(r.w, 30);
      g.beginPath();
      r.p.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
      g.stroke();
    }

    // Concentric Rings
    for (const c of RINGS) {
      g.lineWidth = Math.max(c.w, 35);
      g.beginPath();
      g.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      g.stroke();
    }

    // Centerlines in neon cyan
    g.strokeStyle = '#00d2ff';
    g.lineWidth = 12;
    for (const r of ROADS) {
      if (r.spoke) continue;
      g.beginPath();
      r.p.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y)));
      g.stroke();
    }

    // Zone Perimeter
    g.strokeStyle = '#10b981';
    g.lineWidth = 20;
    g.beginPath();
    g.arc(ZONE.x, ZONE.y, ZONE.R, 0, Math.PI * 2);
    g.stroke();

    miniCanvasCacheRef.current = mini;
  }, []);

  // Initialize Game World
  const initializeWorld = useCallback(() => {
    buildMiniCache();

    // 1. Spawn 260 Microservice Data Packets along Delhi Roads & Hubs
    const newPackets: DataPacket[] = [];
    const packetTypes = [
      'NATS', 'RingBuffer', 'MT5', 'Qdrant', 'FastAPI', 'Agent', 
      'Escrow', 'Go-Worker', 'K8s', 'Docker', 'Terraform', 'WebSockets'
    ];
    for (let i = 0; i < 260; i++) {
      const road = ROADS[Math.floor(Math.random() * ROADS.length)];
      const ptIdx = Math.floor(Math.random() * (road.p.length - 1));
      const [ax, ay] = road.p[ptIdx];
      const [bx, by] = road.p[ptIdx + 1];
      const t = Math.random();
      const rx = ax + (bx - ax) * t + (Math.random() - 0.5) * road.w;
      const ry = ay + (by - ay) * t + (Math.random() - 0.5) * road.w;

      newPackets.push({
        id: i,
        x: clamp(rx, 100, WORLD - 100),
        y: clamp(ry, 100, WORLD - 100),
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        isCollected: false,
        type: packetTypes[Math.floor(Math.random() * packetTypes.length)],
        district: rx < 3000 ? (ry < 3000 ? 'Forensics' : 'Escrow') : (ry < 3000 ? 'AI Swarms' : 'Kubernetes'),
      });
    }
    dataPacketsRef.current = newPackets;

    // 2. Spawn 45 Roaming Glitch Anomalies
    const newGlitches: GlitchAnomaly[] = [];
    const bugTypes = ['MemoryLeak', 'NullPointer', 'Deadlock', '504GatewayTimeout', 'DDoSAnomaly'];
    for (let i = 0; i < 45; i++) {
      newGlitches.push({
        id: i,
        x: 600 + Math.random() * (WORLD - 1200),
        y: 600 + Math.random() * (WORLD - 1200),
        vx: (Math.random() - 0.5) * 2.2,
        vy: (Math.random() - 0.5) * 2.2,
        type: bugTypes[Math.floor(Math.random() * bugTypes.length)],
        size: 16 + Math.random() * 12,
        isPurged: false,
      });
    }
    glitchesRef.current = newGlitches;

    pipelineRef.current = [];
    telemetryPulsesRef.current = [];
    sparksRef.current = [];
    setPipelineCount(1);
    setSignalIntegrity(100);
    setStamina(100);
    setCurrentScore(0);
    characterRef.current.x = CP.x;
    characterRef.current.y = CP.y + 120;
    characterRef.current.vx = 0;
    characterRef.current.vy = 0;
    setInMenu(false);
  }, [buildMiniCache]);

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        if (isNearPhoneTerminal) {
          onOpenPhoneCall();
        } else {
          triggerTelemetryPulse();
        }
      } else if (e.key === 'Shift') {
        characterRef.current.isDashing = true;
      } else if (e.key === 'Escape') {
        setInMenu((prev) => !prev);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsSoundMuted((m) => !m);
      } else if (e.key === 'p' || e.key === 'P') {
        onOpenPortfolio();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
      if (e.key === 'Shift') {
        characterRef.current.isDashing = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [triggerTelemetryPulse, onOpenPhoneCall, onOpenPortfolio, isNearPhoneTerminal]);

  // Touch Virtual Joystick Handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    setJoystickActive(true);
    setJoystickBasePos({ x: touch.clientX, y: touch.clientY });
    setJoystickThumbPos({ x: touch.clientX, y: touch.clientY });
    joystickVectorRef.current = { x: 0, y: 0 };
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!joystickActive) return;
    const touch = e.touches[0];
    const dx = touch.clientX - joystickBasePos.x;
    const dy = touch.clientY - joystickBasePos.y;
    const d = hypot(dx, dy);
    const maxRadius = 45;

    if (d > maxRadius) {
      const angle = Math.atan2(dy, dx);
      setJoystickThumbPos({
        x: joystickBasePos.x + Math.cos(angle) * maxRadius,
        y: joystickBasePos.y + Math.sin(angle) * maxRadius,
      });
      joystickVectorRef.current = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
    } else {
      setJoystickThumbPos({ x: touch.clientX, y: touch.clientY });
      joystickVectorRef.current = {
        x: d === 0 ? 0 : dx / maxRadius,
        y: d === 0 ? 0 : dy / maxRadius,
      };
    }
  };

  const handleTouchEnd = () => {
    setJoystickActive(false);
    joystickVectorRef.current = { x: 0, y: 0 };
  };

  // Main 60 FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const radarCanvas = radarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const radarCtx = radarCanvas ? radarCanvas.getContext('2d') : null;
    if (!ctx) return;

    let animId: number;
    let lastTick = performance.now();
    let ringBellCooldown = 0;

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - lastTick) / 1000);
      lastTick = now;

      const screenWidth = (canvas.width = window.innerWidth);
      const screenHeight = (canvas.height = window.innerHeight);

      const char = characterRef.current;
      const keys = keysRef.current;
      const jv = joystickVectorRef.current;

      // 1. MOVEMENT & INPUT HANDLING
      let mx = 0;
      let my = 0;

      if (keys['w'] || keys['arrowup']) my -= 1;
      if (keys['s'] || keys['arrowdown']) my += 1;
      if (keys['a'] || keys['arrowleft']) mx -= 1;
      if (keys['d'] || keys['arrowright']) mx += 1;

      if (jv.x !== 0 || jv.y !== 0) {
        mx = jv.x;
        my = jv.y;
      }

      if (mousePosRef.current.isDown && !joystickActive) {
        const worldMouseX = cameraRef.current.x + mousePosRef.current.x;
        const worldMouseY = cameraRef.current.y + mousePosRef.current.y;
        const dx = worldMouseX - char.x;
        const dy = worldMouseY - char.y;
        const d = hypot(dx, dy);
        if (d > 20) {
          mx = dx / d;
          my = dy / d;
        }
      }

      // Dashing & Stamina
      const isSprinting = (keys['shift'] || char.isDashing || mousePosRef.current.isRightDown) && stamina > 5;
      if (isSprinting && (mx !== 0 || my !== 0)) {
        setStamina((prev) => Math.max(0, prev - 24 * dt));
      } else {
        setStamina((prev) => Math.min(100, prev + 18 * dt));
      }

      const currentSpeed = char.baseSpeed * (isSprinting ? char.dashMultiplier : 1.0);

      if (mx !== 0 || my !== 0) {
        const len = hypot(mx, my);
        char.vx += (mx / len) * currentSpeed * 0.28;
        char.vy += (my / len) * currentSpeed * 0.28;
        char.heading = Math.atan2(my, mx);

        if (Math.random() < 0.4) {
          sparksRef.current.push({
            x: char.x - Math.cos(char.heading) * 14,
            y: char.y - Math.sin(char.heading) * 14,
            vx: -Math.cos(char.heading) * (2 + Math.random() * 2),
            vy: -Math.sin(char.heading) * (2 + Math.random() * 2),
            alpha: 0.8,
            color: '#00d2ff',
            size: 2.5 + Math.random() * 2.5,
          });
        }
      }

      // Apply Velocity
      char.vx *= 0.86;
      char.vy *= 0.86;
      char.x += char.vx;
      char.y += char.vy;

      // REAL BUILDING COLLISION DETECTION (From reverse-engineered world.js)
      collideBuildings(char);

      // Clamp character to world edges
      char.x = clamp(char.x, 40, WORLD - 40);
      char.y = clamp(char.y, 40, WORLD - 40);

      // 2. CAMERA TRACKING & SMOOTH LERP
      const camTargetX = char.x - screenWidth / 2;
      const camTargetY = char.y - screenHeight / 2;
      cameraRef.current.x += (camTargetX - cameraRef.current.x) * 0.12;
      cameraRef.current.y += (camTargetY - cameraRef.current.y) * 0.12;

      const camX = clamp(cameraRef.current.x, 0, WORLD - screenWidth);
      const camY = clamp(cameraRef.current.y, 0, WORLD - screenHeight);
      cameraRef.current.x = camX;
      cameraRef.current.y = camY;

      // 3. GPS & DISTRICT TELEMETRY
      const meterX = Math.round((char.x - CP.x) / 6);
      const meterY = Math.round((char.y - CP.y) / 6);
      let districtName = 'Connaught Place Central Hub';
      if (char.x < 3000 && char.y < 3000) districtName = 'Zenith Forensics Hub';
      else if (char.x >= 3000 && char.y < 3000) districtName = 'Meeseeks AI Swarms';
      else if (char.x < 3000 && char.y >= 3000) districtName = 'Roost Escrow Citadel';
      else districtName = 'BigHit K8s Foundry';

      setGpsCoords({ x: meterX, y: meterY, district: districtName });

      // 4. PHONE TERMINAL PROXIMITY & CADENCE RING
      const phone = worldLandmarksRef.current.phoneTerminal;
      const distToPhone = hypot(phone.x - char.x, phone.y - char.y);
      const isNear = distToPhone < 85;
      setIsNearPhoneTerminal(isNear);

      if (isNear) {
        ringBellCooldown -= dt;
        if (ringBellCooldown <= 0) {
          playSynthSound('ring');
          ringBellCooldown = 2.4;
        }
      }

      // 5. PROJECT ACCRETION DISK GRAVITATIONAL FORCES
      worldLandmarksRef.current.districts.forEach((st) => {
        const dx = st.x - char.x;
        const dy = st.y - char.y;
        const d = hypot(dx, dy);

        if (d < st.pullRadius && d > st.radius * 0.5) {
          const force = (st.pullStrength * 160) / Math.max(40, d);
          char.vx += (dx / d) * force * dt;
          char.vy += (dy / d) * force * dt;
        }

        if (d <= st.radius * 0.5) {
          char.x = CP.x;
          char.y = CP.y + 120;
          char.vx = 0;
          char.vy = 0;
          setSignalIntegrity((prev) => Math.max(20, prev - 20));
          setStatusMsg(`🌀 Caught in ${st.name} Singularity! Emergency warp protocol engaged.`);
        }
      });

      // 6. ROAMING GLITCH ANOMALIES
      glitchesRef.current.forEach((g) => {
        if (!g.isPurged) {
          g.x += g.vx;
          g.y += g.vy;

          if (g.x < 300 || g.x > WORLD - 300) g.vx *= -1;
          if (g.y < 300 || g.y > WORLD - 300) g.vy *= -1;

          const distToPlayer = hypot(g.x - char.x, g.y - char.y);
          if (distToPlayer < g.size + 16) {
            setSignalIntegrity((prev) => {
              const next = Math.max(0, prev - 12);
              if (next <= 0) {
                char.x = CP.x;
                char.y = CP.y + 120;
                setStatusMsg('⚠️ Signal Integrity Critical! Emergency reboot at Infortts Spire.');
                return 100;
              }
              return next;
            });
            char.vx = -Math.cos(char.heading) * 8;
            char.vy = -Math.sin(char.heading) * 8;
            g.vx *= -1;
            g.vy *= -1;
          }
        }
      });

      // 7. MULTI-AGENT SWARM FLOCKING WITH SEPARATION PHYSICS
      const pipeline = pipelineRef.current;
      for (let i = 0; i < pipeline.length; i++) {
        const p = pipeline[i];
        const target = i === 0 ? char : pipeline[i - 1];
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const d = hypot(dx, dy);

        if (d > 26) {
          p.x += (dx / d) * currentSpeed * 0.88;
          p.y += (dy / d) * currentSpeed * 0.88;
        }

        // Separation from other swarm members
        for (let j = i + 1; j < pipeline.length; j++) {
          const o = pipeline[j];
          const ox = o.x - p.x;
          const oy = o.y - p.y;
          const od = hypot(ox, oy);
          if (od < 20 && od > 0.01) {
            const push = (20 - od) * 0.3;
            p.x -= (ox / od) * push;
            p.y -= (oy / od) * push;
            o.x += (ox / od) * push;
            o.y += (oy / od) * push;
          }
        }
      }

      // 8. UPDATE ACTIVE QUEST
      if (pipeline.length >= 15) {
        setActiveQuest({
          id: 'master',
          title: '👑 Master Architect: Explore all 4 District Cores and maintain 100% Integrity',
          progress: 'Active',
        });
      } else if (distToPhone < 120) {
        setActiveQuest({
          id: 'phone',
          title: '📞 Direct Connection: Press [E] or Click [CALL NOW] to connect with Sahil',
          progress: 'IN RANGE',
        });
      } else {
        setActiveQuest({
          id: 'swarm',
          title: `⚡ Assemble Scalable Pipeline: Collect 15 Microservices (${pipeline.length}/15)`,
          progress: `${pipeline.length}/15`,
        });
      }

      // ==========================================
      // 9. RENDER WORLD TO CANVAS (INFORTTS THEME)
      // ==========================================
      ctx.clearRect(0, 0, screenWidth, screenHeight);

      ctx.save();
      ctx.translate(-camX, -camY);

      // A. Ground Canvas
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, WORLD, WORLD);

      // Cyber Matrix Grid Lines (every 50m / 300px)
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= WORLD; x += 300) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, WORLD);
      }
      for (let y = 0; y <= WORLD; y += 300) {
        ctx.moveTo(0, y);
        ctx.lineTo(WORLD, y);
      }
      ctx.stroke();

      // B. Parks in Cyber Emerald
      for (const p of PARKS) {
        ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
        ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.lineWidth = 2;
        if (p.t === 'c' && p.r) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        } else if (p.w && p.h) {
          ctx.fillRect(p.x, p.y, p.w, p.h);
          ctx.strokeRect(p.x, p.y, p.w, p.h);
        }
      }

      // C. River Yamuna (Glowing Telemetry Conduit)
      ctx.fillStyle = 'rgba(3, 105, 161, 0.35)';
      ctx.beginPath();
      for (let y = 0; y <= WORLD; y += 60) ctx.lineTo(riverL(y), y);
      for (let y = WORLD; y >= 0; y -= 60) ctx.lineTo(riverL(y) + 300, y);
      ctx.fill();

      // D. Real Delhi Road Network (Obsidian Asphalt with Electric Cyan Fiber Lines)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.25)';
      ctx.lineWidth = 2;

      for (const r of ROADS) {
        // Draw asphalt body
        ctx.save();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.lineWidth = r.w;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        r.p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();

        // Draw cyan fiber centerlines
        ctx.strokeStyle = '#00d2ff';
        ctx.lineWidth = 2.5;
        ctx.setLineDash([25, 20]);
        ctx.beginPath();
        r.p.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
        ctx.restore();
      }

      // E. Concentric Rings (Connaught Place & India Gate)
      for (const c of RINGS) {
        ctx.save();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.lineWidth = c.w;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();
      }

      // F. Real Delhi Buildings with Viewport Frustum Culling
      for (const b of BUILD) {
        if (
          b.x + b.w < camX - 100 ||
          b.x > camX + screenWidth + 100 ||
          b.y + b.h < camY - 100 ||
          b.y > camY + screenHeight + 100
        ) {
          continue;
        }

        // Building Drop Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(b.x + 4, b.y + 4, b.w, b.h);

        // Building Obsidian Walls & Roof
        ctx.fillStyle = b.roof;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(b.x, b.y, b.w, b.h);

        // Server Matrix / Neon Window Grid
        ctx.fillStyle = 'rgba(0, 210, 255, 0.25)';
        for (let wx = b.x + 8; wx < b.x + b.w - 8; wx += 16) {
          for (let wy = b.y + 8; wy < b.y + b.h - 8; wy += 14) {
            ctx.fillRect(wx, wy, 6, 4);
          }
        }
      }

      // G. 4 Project District Accretion Cores
      worldLandmarksRef.current.districts.forEach((st) => {
        const grad = ctx.createRadialGradient(st.x, st.y, st.radius * 0.3, st.x, st.y, st.pullRadius);
        grad.addColorStop(0, '#050811');
        grad.addColorStop(0.35, st.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.pullRadius, 0, Math.PI * 2);
        ctx.fill();

        // Swirling photon ring
        ctx.save();
        ctx.translate(st.x, st.y);
        ctx.rotate(now * 0.0015);
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, st.radius * 1.4, st.radius * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Singularity core
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 18px "Outfit", "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(st.name, st.x, st.y + st.radius + 36);
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`${st.subtitle} 🌀`, st.x, st.y + st.radius + 56);
      });

      // H. Infortts Central Spire (CP)
      const hq = worldLandmarksRef.current.commandHQ;
      ctx.fillStyle = '#0b1120';
      ctx.beginPath();
      ctx.arc(hq.x, hq.y, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00d2ff';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Spinning satellite dish
      ctx.save();
      ctx.translate(hq.x, hq.y);
      ctx.rotate(now * 0.001);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI);
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 20px "Outfit", "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏛️ INFORTTS CORE HQ', hq.x, hq.y - 95);

      // I. Telecom Phone Booth Terminal
      ctx.save();
      ctx.translate(phone.x, phone.y);
      const ringPulse = (now % 1000) / 1000;
      ctx.strokeStyle = `rgba(16, 185, 129, ${1 - ringPulse})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 36 + ringPulse * 50, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(11, 17, 32, 0.95)';
      ctx.fillRect(-22, -30, 44, 60);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.strokeRect(-22, -30, 44, 60);

      ctx.fillStyle = '#55efc4';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📞', 0, 0);

      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#55efc4';
      ctx.fillText('DIRECT CALL TERMINAL', 0, 48);
      ctx.restore();

      // J. Microservice Data Packets
      dataPacketsRef.current.forEach((p) => {
        if (!p.isCollected) {
          ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
          ctx.strokeStyle = '#00d2ff';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(p.x - 24, p.y - 12, 48, 24, [6]);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#f8fafc';
          ctx.font = 'bold 9.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.type, p.x, p.y);
        }
      });

      // K. Roaming Glitch Anomalies (Bugs)
      glitchesRef.current.forEach((g) => {
        if (!g.isPurged) {
          ctx.save();
          ctx.translate(g.x, g.y);
          ctx.rotate(now * 0.004);

          ctx.fillStyle = 'rgba(239, 68, 68, 0.85)';
          ctx.strokeStyle = '#f87171';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.moveTo(-g.size, -g.size);
          ctx.lineTo(g.size + (Math.random() - 0.5) * 4, -g.size);
          ctx.lineTo(g.size, g.size);
          ctx.lineTo(-g.size + (Math.random() - 0.5) * 4, g.size);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#fff';
          ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('BUG', 0, 0);
          ctx.restore();
        }
      });

      // L. Sparks & Particle Systems
      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const s = sparksRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.03;
        if (s.alpha <= 0) {
          sparksRef.current.splice(i, 1);
        } else {
          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.alpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      // M. Telemetry Pulses
      for (let i = telemetryPulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = telemetryPulsesRef.current[i];
        pulse.radius += 10;
        pulse.alpha -= 0.035;

        if (pulse.alpha <= 0 || pulse.radius >= pulse.maxRadius) {
          telemetryPulsesRef.current.splice(i, 1);
        } else {
          ctx.strokeStyle = `rgba(0, 210, 255, ${pulse.alpha})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.stroke();

          ctx.fillStyle = `rgba(56, 189, 248, ${pulse.alpha})`;
          ctx.font = 'bold 12px "Outfit", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(pulse.text, pulse.x, pulse.y - pulse.radius - 8);
        }
      }

      // N. Trailing Multi-Agent Pipeline Swarm
      pipeline.forEach((p, idx) => {
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.fillStyle = '#38bdf8';
        ctx.font = 'bold 8.5px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(p.label, p.x, p.y - 12);

        const lead = idx === 0 ? char : pipeline[idx - 1];
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(lead.x, lead.y);
        ctx.stroke();
      });

      // O. Architect Character (Player)
      ctx.save();
      ctx.translate(char.x, char.y);
      ctx.rotate(char.heading);

      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = selectedRole === 'systems' ? '#00d2ff' : '#8b5cf6';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.fillRect(4, -6, 12, 12);

      ctx.fillStyle = '#0b1120';
      ctx.fillRect(-14, -8, 6, 16);
      ctx.restore();

      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(guestName || 'Sahil Rathee', char.x, char.y - 24);

      ctx.restore(); // Restore camera translation

      // ==========================================
      // 10. RENDER TACTICAL RADAR (MINIMAP)
      // ==========================================
      if (radarCtx && radarCanvas) {
        const rW = (radarCanvas.width = 150);
        const rH = (radarCanvas.height = 150);
        const scaleX = rW / WORLD;
        const scaleY = rH / WORLD;

        // Draw pre-cached vector minimap
        if (miniCanvasCacheRef.current) {
          radarCtx.drawImage(miniCanvasCacheRef.current, 0, 0, rW, rH);
        } else {
          radarCtx.fillStyle = '#020617';
          radarCtx.fillRect(0, 0, rW, rH);
        }

        // Project District Cores
        worldLandmarksRef.current.districts.forEach((st) => {
          radarCtx.fillStyle = st.color;
          radarCtx.beginPath();
          radarCtx.arc(st.x * scaleX, st.y * scaleY, 4, 0, Math.PI * 2);
          radarCtx.fill();
        });

        // Phone Terminal & HQ
        radarCtx.fillStyle = '#10b981';
        radarCtx.beginPath();
        radarCtx.arc(phone.x * scaleX, phone.y * scaleY, 5, 0, Math.PI * 2);
        radarCtx.fill();

        // Roaming Glitches
        radarCtx.fillStyle = '#ef4444';
        glitchesRef.current.forEach((g) => {
          if (!g.isPurged) {
            radarCtx.fillRect(g.x * scaleX - 1, g.y * scaleY - 1, 2, 2);
          }
        });

        // Camera Frustum
        radarCtx.strokeStyle = 'rgba(0, 210, 255, 0.6)';
        radarCtx.lineWidth = 1;
        radarCtx.strokeRect(camX * scaleX, camY * scaleY, screenWidth * scaleX, screenHeight * scaleY);

        // Player Blip
        radarCtx.fillStyle = '#ffffff';
        radarCtx.beginPath();
        radarCtx.arc(char.x * scaleX, char.y * scaleY, 3.5, 0, Math.PI * 2);
        radarCtx.fill();

        // Radar Sweep Arm
        const sweepAngle = (now * 0.003) % (Math.PI * 2);
        radarCtx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
        radarCtx.beginPath();
        radarCtx.moveTo(char.x * scaleX, char.y * scaleY);
        radarCtx.lineTo(
          char.x * scaleX + Math.cos(sweepAngle) * 35,
          char.y * scaleY + Math.sin(sweepAngle) * 35
        );
        radarCtx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [
    stamina,
    joystickActive,
    guestName,
    selectedRole,
    isNearPhoneTerminal,
    playSynthSound,
  ]);

  return (
    <div className="jantar-mantar-container">
      {/* 6000 × 6000 REVERSE-ENGINEERED OPEN WORLD CANVAS */}
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          if (e.button === 0) mousePosRef.current.isDown = true;
          if (e.button === 2) mousePosRef.current.isRightDown = true;
          mousePosRef.current.x = e.clientX;
          mousePosRef.current.y = e.clientY;
        }}
        onMouseMove={(e) => {
          mousePosRef.current.x = e.clientX;
          mousePosRef.current.y = e.clientY;
        }}
        onMouseUp={(e) => {
          if (e.button === 0) mousePosRef.current.isDown = false;
          if (e.button === 2) mousePosRef.current.isRightDown = false;
        }}
        onContextMenu={(e) => e.preventDefault()}
      />

      {/* TACTICAL STATUS & HEALTH HUD (TOP-LEFT) */}
      {!inMenu && (
        <div className="game-tactical-status">
          <div className="game-stat-card">
            <div className="game-stat-row">
              <span className="game-stat-label">SIGNAL INTEGRITY</span>
              <span className="game-stat-val">{Math.round(signalIntegrity)}%</span>
            </div>
            <div className="game-bar-track">
              <div
                className={`game-bar-fill integrity ${
                  signalIntegrity < 30 ? 'danger' : signalIntegrity < 60 ? 'warning' : ''
                }`}
                style={{ width: `${signalIntegrity}%` }}
              />
            </div>

            <div className="game-stat-row">
              <span className="game-stat-label">THRUST STAMINA</span>
              <span className="game-stat-val">{Math.round(stamina)}%</span>
            </div>
            <div className="game-bar-track">
              <div className="game-bar-fill stamina" style={{ width: `${stamina}%` }} />
            </div>

            <div className="game-gps-telemetry">
              <span>GPS DELHI ENGINE</span>
              <span className="game-gps-coord">
                X:{gpsCoords.x >= 0 ? `+${gpsCoords.x}` : gpsCoords.x}m · Y:{gpsCoords.y >= 0 ? `+${gpsCoords.y}` : gpsCoords.y}m
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE OBJECTIVE / QUEST TRACKER (TOP-CENTER) */}
      {!inMenu && (
        <div className="game-quest-tracker">
          <span className="game-quest-badge">{activeQuest.progress}</span>
          <span>{activeQuest.title}</span>
        </div>
      )}

      {/* TACTICAL RADAR MINIMAP (TOP-RIGHT) */}
      {!inMenu && (
        <div className="game-radar-box">
          <div className="game-radar-header">
            <span className="game-radar-title">1KM RADAR</span>
            <span className="game-radar-scale">1:40 SCALE</span>
          </div>
          <canvas ref={radarCanvasRef} className="game-radar-canvas" />
          <div className="game-radar-legend">
            <span className="legend-item"><span className="legend-dot hq" /> Spire</span>
            <span className="legend-item"><span className="legend-dot project" /> Core</span>
            <span className="legend-item"><span className="legend-dot anomaly" /> Bug</span>
          </div>
        </div>
      )}

      {/* PROXIMITY INTERACTIVE CALL PROMPT */}
      {!inMenu && isNearPhoneTerminal && (
        <div className="game-interaction-prompt" onClick={onOpenPhoneCall}>
          <span>📞</span>
          <span>PRESS [E] OR CLICK HERE TO CALL SAHIL (+91 9625213480)</span>
        </div>
      )}

      {/* MOBILE TOUCH VIRTUAL JOYSTICK */}
      {!inMenu && (
        <div
          className="virtual-joystick-touchzone"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {joystickActive && (
            <div
              className="virtual-joystick-base"
              style={{ left: `${joystickBasePos.x}px`, top: `${joystickBasePos.y}px` }}
            >
              <div
                className="virtual-joystick-thumb"
                style={{
                  left: `${joystickThumbPos.x - joystickBasePos.x + 24}px`,
                  top: `${joystickThumbPos.y - joystickBasePos.y + 24}px`,
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* MOBILE ACTION BUTTONS (#mob) */}
      {!inMenu && (
        <div id="mob" className="on">
          <button type="button" className="mb" onClick={triggerTelemetryPulse}>
            PULSE
          </button>
          <button
            type="button"
            className="mb b4"
            onMouseDown={() => (characterRef.current.isDashing = true)}
            onMouseUp={() => (characterRef.current.isDashing = false)}
            onTouchStart={() => (characterRef.current.isDashing = true)}
            onTouchEnd={() => (characterRef.current.isDashing = false)}
          >
            DASH
          </button>
          <button type="button" className="mb b2" onClick={onOpenPhoneCall}>
            CALL
          </button>
          <button type="button" className="mb mini" onClick={() => setInMenu(true)}>
            ☰
          </button>
        </div>
      )}

      {/* SAHIL RATHEE ARCHITECTURAL MENU CARD OVERLAY */}
      {inMenu && (
        <div id="menu">
          {/* Top Profile Banner */}
          <div id="getapp" className="on" role="region" aria-label="Sahil Rathee Profile Banner">
            <img src="/sahil.png" alt="Sahil Rathee" width="44" height="44" />
            <div className="t">
              <b>Sahil Rathee • Senior Software Engineer & AI Systems Architect</b>
              <small>Infortts Core • {inforttsFeedsCount}+ Telemetry Feeds Online • New Delhi, India</small>
            </div>
            <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer">
              ⬇ Download Resume PDF
            </a>
          </div>

          <div className="card">
            <h1>
              SAHIL RATHEE <span>// ARCHITECT</span>
            </h1>
            <div className="hi">High-Throughput Distributed Infrastructure & Autonomous AI Swarms</div>
            <p className="tag">
              Explore the full reverse-engineered 6000×6000 Delhi simulation map. Navigate across 4 massive district cores, 
              gather microservices into your trailing pipeline swarm with real flocking collision physics, 
              purge system anomalies with Telemetry Pulse, and reach the Infortts Telecom Spire at Connaught Place to directly call Sahil!
            </p>

            {/* Recruiter / Guest Input */}
            <input
              id="name"
              maxLength={28}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your Name (e.g. Hiring Lead, Staff Engineer)"
            />

            {/* Role Select Mode */}
            <div className="roles">
              {/* Distributed Systems Mode */}
              <div
                className={`role ${selectedRole === 'systems' ? 'sel' : ''}`}
                data-r="B"
                onClick={() => setSelectedRole('systems')}
              >
                <div className="ic">⚡</div>
                <b>Distributed Systems Engineer</b>
                <p>Low-latency telemetry streaming (NATS JetStream), in-memory execution engines, and sub-millisecond ring buffers.</p>
                <div className="keys">
                  <span>🕹️ WASD / Touch Joystick to Navigate · <kbd>Space</kbd> for Telemetry Pulse<br />Hold <kbd>Shift</kbd> to Sprint / Dash</span>
                </div>
              </div>

              {/* Agentic AI Swarms Mode */}
              <div
                className={`role ${selectedRole === 'agentic' ? 'sel' : ''}`}
                data-r="C"
                onClick={() => setSelectedRole('agentic')}
              >
                <div className="ic">🤖</div>
                <b>Autonomous Agentic Architect</b>
                <p>Self-evolving multi-agent orchestration, LLM tool dispatch, and automated task planning with 70% reduced overhead.</p>
                <div className="keys">
                  <span>🕹️ WASD / Touch Joystick to Navigate · <kbd>Space</kbd> for Agent Dispatch<br />Hold <kbd>Shift</kbd> to Sprint / Dash</span>
                </div>
              </div>
            </div>

            {/* Core Competencies & Stack Chips */}
            <div className="muddas">
              <span className="mlab">Core Competencies & Stack:</span>
              {CORE_STACK_CHIPS.map((c) => {
                const isSel = selectedChips.includes(c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`mchip ${isSel ? 'sel' : ''}`}
                    style={{ '--mc': c.color } as React.CSSProperties}
                    onClick={() => {
                      setSelectedChips((prev) =>
                        isSel ? prev.filter((id) => id !== c.id) : [...prev, c.id]
                      );
                    }}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="btns">
              <button type="button" className="btn" id="play" onClick={initializeWorld}>
                EXPLORE 1KM WORLD ▶
              </button>
              <button
                type="button"
                className="btn"
                id="practice"
                onClick={() => {
                  setInMenu(false);
                  onOpenPortfolio();
                }}
              >
                🏛️ View Architecture
              </button>
            </div>

            <div id="status">
              <b>{statusMsg}</b>
            </div>

            <div className="help">
              <kbd>WASD</kbd> / Touch move · <kbd>Space</kbd> pulse & purge bugs · <kbd>Shift</kbd> dash · <kbd>P</kbd> portfolio · <kbd>Esc</kbd> menu
            </div>

            {/* Call Sahil Direct Trigger */}
            <button
              type="button"
              id="support"
              onClick={onOpenPhoneCall}
            >
              <span className="h">📞</span> Direct Call with Sahil (+91 9625213480)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
