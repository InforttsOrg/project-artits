import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ArchitectRunnerGameProps {
  onOpenPhoneCall: () => void;
  onOpenPortfolio: () => void;
  inforttsFeedsCount?: number;
}

interface PipelineAgent {
  x: number;
  y: number;
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

// 1KM × 1KM OPEN WORLD CONSTANTS (1000m × 1000m scaled at 6px / meter)
const WORLD_WIDTH = 6000;
const WORLD_HEIGHT = 6000;
const METER_SCALE = 6; // 6 pixels = 1 meter

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
    district: 'Central Infortts Spire',
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
    title: '📞 Reach the Phone Terminal at Infortts HQ to connect with Sahil',
    progress: 'Navigating...',
  });
  const [isNearPhoneTerminal, setIsNearPhoneTerminal] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>(
    'Infortts Core Edge Gateway Online • 40+ Market Feeds Live • High-Throughput Cluster Stable'
  );

  // Virtual Joystick State for Mobile Touch
  const [joystickActive, setJoystickActive] = useState<boolean>(false);
  const [joystickBasePos, setJoystickBasePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [joystickThumbPos, setJoystickThumbPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const joystickVectorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Game Engine World Refs
  const characterRef = useRef({
    x: 3000,
    y: 3100,
    vx: 0,
    vy: 0,
    heading: -Math.PI / 2,
    baseSpeed: 5.5,
    isDashing: false,
    dashMultiplier: 1.85,
    onHighway: false,
  });

  const cameraRef = useRef({
    x: 3000 - window.innerWidth / 2,
    y: 3100 - window.innerHeight / 2,
  });

  const keysRef = useRef<{ [key: string]: boolean }>({});
  const mousePosRef = useRef({ x: 0, y: 0, isDown: false, isRightDown: false });

  const dataPacketsRef = useRef<DataPacket[]>([]);
  const glitchesRef = useRef<GlitchAnomaly[]>([]);
  const pipelineRef = useRef<PipelineAgent[]>([]);
  const telemetryPulsesRef = useRef<TelemetryPulse[]>([]);
  const sparksRef = useRef<SparkParticle[]>([]);

  // 1km × 1km Landmark Cores across 4 Quadrants
  const worldLandmarksRef = useRef({
    commandHQ: { x: 3000, y: 2600, radius: 140, name: 'INFORTTS CENTRAL HQ' },
    phoneTerminal: { x: 3000, y: 2780, radius: 36, name: 'DIRECT CALL TERMINAL' },
    districts: [
      {
        id: 'mitochondria',
        name: 'ZENITH & MITOCHONDRIA',
        subtitle: 'High-Frequency Forensics Hub',
        x: 1500,
        y: 1500,
        radius: 120,
        pullRadius: 420,
        pullStrength: 1.4,
        color: '#f59e0b',
      },
      {
        id: 'meeseeks',
        name: 'MEESEEKS',
        subtitle: 'Autonomous AI Swarm Lab',
        x: 4500,
        y: 1500,
        radius: 110,
        pullRadius: 380,
        pullStrength: 1.25,
        color: '#8b5cf6',
      },
      {
        id: 'roost',
        name: 'ROOST SAAS',
        subtitle: 'Multi-Tenant Escrow Citadel',
        x: 1500,
        y: 4500,
        radius: 105,
        pullRadius: 360,
        pullStrength: 1.2,
        color: '#10b981',
      },
      {
        id: 'bighit',
        name: 'BIGHIT CLOUD',
        subtitle: 'Zero-Downtime K8s Foundry',
        x: 4500,
        y: 4500,
        radius: 115,
        pullRadius: 400,
        pullStrength: 1.35,
        color: '#0ea5e9',
      },
    ],
  });

  // Procedural Web Audio Synthesizer
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

  // Sync highscore to Infortts API
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
              missionId: 'architect_1km_canvas',
              game: 'architect_1km_canvas',
            }),
          }).catch(() => {});
          return nextScore;
        }
        return prevHigh;
      });
      return nextScore;
    });
  }, [guestName]);

  // Telemetry Sonic Pulse (<kbd>Space</kbd> or on-screen button)
  const triggerTelemetryPulse = useCallback(() => {
    const char = characterRef.current;
    const pulseText = ARCHITECT_PULSES[Math.floor(Math.random() * ARCHITECT_PULSES.length)];
    playSynthSound('pulse');

    telemetryPulsesRef.current.push({
      x: char.x,
      y: char.y,
      radius: 16,
      maxRadius: 240,
      text: pulseText,
      alpha: 1.0,
    });

    // 1. Collect all microservices in range into pipeline swarm
    let collectedCount = 0;
    dataPacketsRef.current.forEach((p) => {
      if (!p.isCollected) {
        const d = Math.hypot(p.x - char.x, p.y - char.y);
        if (d < 230) {
          p.isCollected = true;
          collectedCount++;
          pipelineRef.current.push({
            x: p.x,
            y: p.y,
            color: selectedRole === 'systems' ? '#ff7f11' : '#138808',
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
              color: '#2ecc71',
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
      setStatusMsg(`⚡ Collected ${collectedCount} microservices! Swarm capacity: ${nextCount}`);
    }

    // 2. Purge system glitch anomalies within range
    let purgedCount = 0;
    glitchesRef.current.forEach((g) => {
      if (!g.isPurged) {
        const d = Math.hypot(g.x - char.x, g.y - char.y);
        if (d < 230) {
          g.isPurged = true;
          purgedCount++;

          // Explosion sparks
          for (let s = 0; s < 12; s++) {
            sparksRef.current.push({
              x: g.x,
              y: g.y,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              alpha: 1.0,
              color: '#ff9933',
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

  // Initialize 1km × 1km Open World Map Data
  const initializeWorld = useCallback(() => {
    // 1. Spawn 260 Microservice Data Packets across all 1km territory
    const newPackets: DataPacket[] = [];
    const packetTypes = [
      'NATS', 'RingBuffer', 'MT5', 'Qdrant', 'FastAPI', 'Agent', 
      'Escrow', 'Go-Worker', 'K8s', 'Docker', 'Terraform', 'WebSockets'
    ];
    for (let i = 0; i < 260; i++) {
      const rx = 400 + Math.random() * (WORLD_WIDTH - 800);
      const ry = 400 + Math.random() * (WORLD_HEIGHT - 800);
      newPackets.push({
        id: i,
        x: rx,
        y: ry,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        isCollected: false,
        type: packetTypes[Math.floor(Math.random() * packetTypes.length)],
        district: rx < 3000 ? (ry < 3000 ? 'Forensics' : 'Escrow') : (ry < 3000 ? 'AI Swarms' : 'Kubernetes'),
      });
    }
    dataPacketsRef.current = newPackets;

    // 2. Spawn 45 Roaming Glitch Anomalies (Bugs / Memory Leaks)
    const newGlitches: GlitchAnomaly[] = [];
    const bugTypes = ['MemoryLeak', 'NullPointer', 'Deadlock', '504GatewayTimeout', 'DDoSAnomaly'];
    for (let i = 0; i < 45; i++) {
      newGlitches.push({
        id: i,
        x: 600 + Math.random() * (WORLD_WIDTH - 1200),
        y: 600 + Math.random() * (WORLD_HEIGHT - 1200),
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
    characterRef.current.x = 3000;
    characterRef.current.y = 3100;
    characterRef.current.vx = 0;
    characterRef.current.vy = 0;
    setInMenu(false);
  }, []);

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
    const dist = Math.hypot(dx, dy);
    const maxRadius = 45;

    if (dist > maxRadius) {
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
        x: dist === 0 ? 0 : dx / maxRadius,
        y: dist === 0 ? 0 : dy / maxRadius,
      };
    }
  };

  const handleTouchEnd = () => {
    setJoystickActive(false);
    joystickVectorRef.current = { x: 0, y: 0 };
  };

  // Main 60 FPS Game Loop
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

      // Virtual Joystick on mobile
      if (jv.x !== 0 || jv.y !== 0) {
        mx = jv.x;
        my = jv.y;
      }

      // Mouse Drag Movement on Desktop
      if (mousePosRef.current.isDown && !joystickActive) {
        const worldMouseX = cameraRef.current.x + mousePosRef.current.x;
        const worldMouseY = cameraRef.current.y + mousePosRef.current.y;
        const dx = worldMouseX - char.x;
        const dy = worldMouseY - char.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 20) {
          mx = dx / dist;
          my = dy / dist;
        }
      }

      // Dashing & Stamina mechanics
      const isSprinting = (keys['shift'] || char.isDashing || mousePosRef.current.isRightDown) && stamina > 5;
      if (isSprinting && (mx !== 0 || my !== 0)) {
        setStamina((prev) => Math.max(0, prev - 24 * dt));
      } else {
        setStamina((prev) => Math.min(100, prev + 18 * dt));
      }

      // Check if player is on illuminated high-speed data boulevard
      const distFromCenter = Math.hypot(char.x - 3000, char.y - 3000);
      const onNorthSouthHighway = Math.abs(char.x - 3000) < 90;
      const onEastWestHighway = Math.abs(char.y - 3000) < 90;
      char.onHighway = (onNorthSouthHighway || onEastWestHighway) && distFromCenter < 2400;

      let currentSpeed = char.baseSpeed * (isSprinting ? char.dashMultiplier : 1.0);
      if (char.onHighway) {
        currentSpeed *= 1.35; // +35% Data Highway speed boost
      }

      if (mx !== 0 || my !== 0) {
        const len = Math.hypot(mx, my);
        char.vx += (mx / len) * currentSpeed * 0.28;
        char.vy += (my / len) * currentSpeed * 0.28;
        char.heading = Math.atan2(my, mx);

        // Footstep / engine spark trail
        if (Math.random() < 0.4) {
          sparksRef.current.push({
            x: char.x - Math.cos(char.heading) * 14,
            y: char.y - Math.sin(char.heading) * 14,
            vx: -Math.cos(char.heading) * (2 + Math.random() * 2),
            vy: -Math.sin(char.heading) * (2 + Math.random() * 2),
            alpha: 0.8,
            color: char.onHighway ? '#55efc4' : '#ff9933',
            size: 2.5 + Math.random() * 2.5,
          });
        }
      }

      // Velocity damping & application
      char.vx *= 0.86;
      char.vy *= 0.86;
      char.x += char.vx;
      char.y += char.vy;

      // Clamp character strictly to 1km × 1km world boundaries
      char.x = Math.max(40, Math.min(WORLD_WIDTH - 40, char.x));
      char.y = Math.max(40, Math.min(WORLD_HEIGHT - 40, char.y));

      // 2. CAMERA TRACKING & SMOOTH LERP
      const camTargetX = char.x - screenWidth / 2;
      const camTargetY = char.y - screenHeight / 2;
      cameraRef.current.x += (camTargetX - cameraRef.current.x) * 0.12;
      cameraRef.current.y += (camTargetY - cameraRef.current.y) * 0.12;

      // Clamp camera to world edges
      const camX = Math.max(0, Math.min(WORLD_WIDTH - screenWidth, cameraRef.current.x));
      const camY = Math.max(0, Math.min(WORLD_HEIGHT - screenHeight, cameraRef.current.y));
      cameraRef.current.x = camX;
      cameraRef.current.y = camY;

      // 3. GPS & DISTRICT TELEMETRY
      const meterX = Math.round((char.x - 3000) / METER_SCALE);
      const meterY = Math.round((char.y - 3000) / METER_SCALE);
      let districtName = 'Infortts Central Plaza';
      if (char.x < 3000 && char.y < 3000) districtName = 'Zenith Forensics Hub';
      else if (char.x >= 3000 && char.y < 3000) districtName = 'Meeseeks AI Swarms';
      else if (char.x < 3000 && char.y >= 3000) districtName = 'Roost Escrow Citadel';
      else districtName = 'BigHit K8s Foundry';

      setGpsCoords({ x: meterX, y: meterY, district: districtName });

      // 4. PHONE TERMINAL PROXIMITY & CADENCE RING
      const phone = worldLandmarksRef.current.phoneTerminal;
      const distToPhone = Math.hypot(phone.x - char.x, phone.y - char.y);
      const isNear = distToPhone < 85;
      setIsNearPhoneTerminal(isNear);

      if (isNear) {
        ringBellCooldown -= dt;
        if (ringBellCooldown <= 0) {
          playSynthSound('ring');
          ringBellCooldown = 2.4;
        }
      }

      // 5. PROJECT STATIONS (BLACK HOLES / ACCRETION DISKS) PHYSICS
      worldLandmarksRef.current.districts.forEach((st) => {
        const dx = st.x - char.x;
        const dy = st.y - char.y;
        const dist = Math.hypot(dx, dy);

        // Gravitational pull within pull radius
        if (dist < st.pullRadius && dist > st.radius * 0.5) {
          const force = (st.pullStrength * 160) / Math.max(40, dist);
          char.vx += (dx / dist) * force * dt;
          char.vy += (dy / dist) * force * dt;
        }

        // Singularity Event Horizon Breach: Warp back to Central HQ with emergency reboot
        if (dist <= st.radius * 0.5) {
          char.x = 3000;
          char.y = 3100;
          char.vx = 0;
          char.vy = 0;
          setSignalIntegrity((prev) => Math.max(20, prev - 20));
          setStatusMsg(`🌀 Caught in ${st.name} Singularity! Emergency warp protocol engaged.`);
        }
      });

      // 6. ROAMING GLITCH ANOMALIES (ENEMIES)
      glitchesRef.current.forEach((g) => {
        if (!g.isPurged) {
          g.x += g.vx;
          g.y += g.vy;

          // Bounce off bounds
          if (g.x < 300 || g.x > WORLD_WIDTH - 300) g.vx *= -1;
          if (g.y < 300 || g.y > WORLD_HEIGHT - 300) g.vy *= -1;

          // Check collision with player
          const distToPlayer = Math.hypot(g.x - char.x, g.y - char.y);
          if (distToPlayer < g.size + 16) {
            // Player takes damage
            setSignalIntegrity((prev) => {
              const next = Math.max(0, prev - 12);
              if (next <= 0) {
                // Emergency auto-backup
                char.x = 3000;
                char.y = 3100;
                setStatusMsg('⚠️ Signal Integrity Critical! Emergency reboot at Central HQ.');
                return 100;
              }
              return next;
            });
            // Knockback player
            char.vx = -Math.cos(char.heading) * 8;
            char.vy = -Math.sin(char.heading) * 8;
            g.vx *= -1;
            g.vy *= -1;
          }
        }
      });

      // 7. PIPELINE SWARM VERLET TRAILING PHYSICS
      const pipeline = pipelineRef.current;
      pipeline.forEach((p, idx) => {
        const target = idx === 0 ? char : pipeline[idx - 1];
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 26) {
          p.x += (dx / dist) * currentSpeed * 0.88;
          p.y += (dy / dist) * currentSpeed * 0.88;
        }
      });

      // 8. UPDATE ACTIVE QUEST OBJECTIVE
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
      // 9. RENDER WORLD TO CANVAS (INFORTTS OBSIDIAN & CYAN THEME)
      // ==========================================
      ctx.clearRect(0, 0, screenWidth, screenHeight);

      ctx.save();
      ctx.translate(-camX, -camY);

      // A. Ground Canvas (1km x 1km Top-Down Deep Space Cyber Grid)
      ctx.fillStyle = '#050811';
      ctx.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

      // Cyber Matrix Grid Lines (every 50m / 300px)
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x <= WORLD_WIDTH; x += 300) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, WORLD_HEIGHT);
      }
      for (let y = 0; y <= WORLD_HEIGHT; y += 300) {
        ctx.moveTo(0, y);
        ctx.lineTo(WORLD_WIDTH, y);
      }
      ctx.stroke();

      // B. High-Speed Illuminated Fiber Highways (Connecting All 4 Districts)
      ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
      // North-South Central Highway (180px wide)
      ctx.fillRect(2910, 800, 180, 4400);
      // East-West Central Highway (180px wide)
      ctx.fillRect(800, 2910, 4400, 180);

      // Outer Highway Edge Conduits
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.strokeRect(2910, 800, 180, 4400);
      ctx.strokeRect(800, 2910, 4400, 180);

      // Fiber-optic glowing centerlines
      ctx.strokeStyle = '#00d2ff';
      ctx.lineWidth = 3;
      ctx.setLineDash([30, 20]);
      ctx.beginPath();
      ctx.moveTo(3000, 800);
      ctx.lineTo(3000, 5200);
      ctx.moveTo(800, 3000);
      ctx.lineTo(5200, 3000);
      ctx.stroke();
      ctx.setLineDash([]);

      // Outer Plaza Circular Ring at Central Hub
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)';
      ctx.lineWidth = 50;
      ctx.beginPath();
      ctx.arc(3000, 3000, 600, 0, Math.PI * 2);
      ctx.stroke();

      // Inner Plaza Ring
      ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(3000, 3000, 350, 0, Math.PI * 2);
      ctx.stroke();

      // C. RENDER 4 PROJECT DISTRICT CORES (BLACK HOLES & ACCRETION DISKS)
      worldLandmarksRef.current.districts.forEach((st) => {
        // Outer Gravitational Accretion Disk
        const grad = ctx.createRadialGradient(st.x, st.y, st.radius * 0.3, st.x, st.y, st.pullRadius);
        grad.addColorStop(0, '#050811');
        grad.addColorStop(0.35, st.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.pullRadius, 0, Math.PI * 2);
        ctx.fill();

        // Swirling photon rings
        ctx.save();
        ctx.translate(st.x, st.y);
        ctx.rotate(now * 0.0015);
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, st.radius * 1.4, st.radius * 0.7, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Singularity Horizon Core
        ctx.fillStyle = '#020617';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // District Landmark Pillar & Hologram Label
        ctx.fillStyle = '#f8fafc';
        ctx.font = 'bold 18px "Outfit", "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(st.name, st.x, st.y + st.radius + 36);
        ctx.font = '13px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.fillText(`${st.subtitle} 🌀`, st.x, st.y + st.radius + 56);
      });

      // D. RENDER CENTRAL INFORTTS COMMAND HQ & TELECOM TOWER
      const hq = worldLandmarksRef.current.commandHQ;
      ctx.fillStyle = '#0b1120';
      ctx.beginPath();
      ctx.arc(hq.x, hq.y, 80, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#00d2ff';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Satellite dish spinning
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

      // E. RENDER PHONE TERMINAL (PHONE BOOTH)
      const distPhone = distToPhone;
      ctx.save();
      ctx.translate(phone.x, phone.y);

      // Pulsing beacon ring around phone
      const ringPulse = (now % 1000) / 1000;
      ctx.strokeStyle = `rgba(16, 185, 129, ${1 - ringPulse})`;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, 36 + ringPulse * 50, 0, Math.PI * 2);
      ctx.stroke();

      // Phone Booth Box
      ctx.fillStyle = 'rgba(11, 17, 32, 0.95)';
      ctx.fillRect(-22, -30, 44, 60);
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 3;
      ctx.strokeRect(-22, -30, 44, 60);

      // Dial Icon
      ctx.fillStyle = '#55efc4';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📞', 0, 0);

      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#55efc4';
      ctx.fillText('DIRECT CALL TERMINAL', 0, 48);
      ctx.restore();

      // F. RENDER MICROSERVICE DATA PACKETS
      dataPacketsRef.current.forEach((p) => {
        if (!p.isCollected) {
          // Packet floating motion
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

      // G. RENDER ROAMING GLITCH ANOMALIES (ENEMIES)
      glitchesRef.current.forEach((g) => {
        if (!g.isPurged) {
          ctx.save();
          ctx.translate(g.x, g.y);
          ctx.rotate(now * 0.004);

          // Glitch Polygonal Anomaly
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

      // H. RENDER SPARKS & PARTICLES
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

      // I. RENDER TELEMETRY PULSES
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

      // J. RENDER TRAILING PIPELINE SWARM
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

        // Draw spring connection to leading node
        const lead = idx === 0 ? char : pipeline[idx - 1];
        ctx.strokeStyle = 'rgba(0, 210, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(lead.x, lead.y);
        ctx.stroke();
      });

      // K. RENDER ARCHITECT CHARACTER (PLAYER)
      ctx.save();
      ctx.translate(char.x, char.y);
      ctx.rotate(char.heading);

      // Character Shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 18, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Architect Body
      ctx.fillStyle = selectedRole === 'systems' ? '#00d2ff' : '#8b5cf6';
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Cyber Visor / Headlamp
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(4, -6, 12, 12);

      // Architect Jetpack Nodes
      ctx.fillStyle = '#0b1120';
      ctx.fillRect(-14, -8, 6, 16);

      ctx.restore();

      // Player Label
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(guestName || 'Sahil Rathee', char.x, char.y - 24);

      ctx.restore(); // Restore camera translation

      // ==========================================
      // 10. RENDER TACTICAL RADAR MINIMAP (1:40 SCALE)
      // ==========================================
      if (radarCtx && radarCanvas) {
        const rW = (radarCanvas.width = 150);
        const rH = (radarCanvas.height = 150);
        const scaleX = rW / WORLD_WIDTH;
        const scaleY = rH / WORLD_HEIGHT;

        radarCtx.fillStyle = '#0f1710';
        radarCtx.fillRect(0, 0, rW, rH);

        // Center crosshairs
        radarCtx.strokeStyle = 'rgba(19, 136, 8, 0.3)';
        radarCtx.lineWidth = 1;
        radarCtx.beginPath();
        radarCtx.moveTo(rW / 2, 0);
        radarCtx.lineTo(rW / 2, rH);
        radarCtx.moveTo(0, rH / 2);
        radarCtx.lineTo(rW, rH / 2);
        radarCtx.stroke();

        // 4 Project Districts
        worldLandmarksRef.current.districts.forEach((st) => {
          radarCtx.fillStyle = st.color;
          radarCtx.beginPath();
          radarCtx.arc(st.x * scaleX, st.y * scaleY, 4, 0, Math.PI * 2);
          radarCtx.fill();
        });

        // Phone Terminal & HQ
        radarCtx.fillStyle = '#2ecc71';
        radarCtx.beginPath();
        radarCtx.arc(phone.x * scaleX, phone.y * scaleY, 5, 0, Math.PI * 2);
        radarCtx.fill();

        // Roaming Glitches (red dots)
        radarCtx.fillStyle = '#e74c3c';
        glitchesRef.current.forEach((g) => {
          if (!g.isPurged) {
            radarCtx.fillRect(g.x * scaleX - 1, g.y * scaleY - 1, 2, 2);
          }
        });

        // Camera Frustum Box
        radarCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        radarCtx.strokeRect(camX * scaleX, camY * scaleY, screenWidth * scaleX, screenHeight * scaleY);

        // Player Blip
        radarCtx.fillStyle = '#ffffff';
        radarCtx.beginPath();
        radarCtx.arc(char.x * scaleX, char.y * scaleY, 3.5, 0, Math.PI * 2);
        radarCtx.fill();

        // Radar sweep arm
        const sweepAngle = (now * 0.003) % (Math.PI * 2);
        radarCtx.strokeStyle = 'rgba(46, 204, 113, 0.5)';
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
      {/* 1KM × 1KM OPEN WORLD CANVAS */}
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
              <span>GPS 1KM GRID</span>
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
            <span className="legend-item"><span className="legend-dot hq" /> HQ</span>
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
              Explore the full 1km × 1km open-world engineering map. Navigate across 4 massive district cores, 
              gather microservices into your trailing pipeline swarm, purge system anomalies with Telemetry Pulse, 
              and reach the Infortts Telecom Terminal to directly call Sahil!
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
