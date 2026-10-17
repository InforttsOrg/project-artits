import React, { useRef, useEffect, useState, useCallback } from 'react';

// ==========================================
// 1. Web Audio Procedural Sound Engine
// ==========================================
class WebSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  constructor() {
    // Loaded lazily on first user gesture to comply with browser autoplay policies
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Slingshot stretch / release whoosh
  playSlingshot() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(480, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch {
      // Audio fallback silent
    }
  }

  // Thruster burn rumble
  playThruster() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(65, now);
      osc.frequency.linearRampToValueAtTime(85, now + 0.12);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {
      // Silent
    }
  }

  // Gravity assist flyby boost
  playGravityBoost() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Silent
    }
  }

  // Collect scientific data beacon
  playBeaconCollect() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [880, 1174, 1567].forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.18, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } catch {
      // Silent
    }
  }

  // Triumphant orbital docking victory chord
  playVictory() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Major Triad)
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.22, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.65);
      });
    } catch {
      // Silent
    }
  }

  // Collision crash sound
  playCrash() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.3);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Silent
    }
  }
}

const soundEngine = new WebSoundEngine();

// ==========================================
// 2. Normalized Data Structures
// ==========================================
interface NormalizedBody {
  id: string;
  name: string;
  nx: number; // 0.0 to 1.0 (relative canvas width)
  ny: number; // 0.0 to 1.0 (relative canvas height)
  mass: number;
  radiusNorm: number; // relative size
  color: string;
  glowColor: string;
  orbitCenter?: { nx: number; ny: number };
  orbitRadiusNorm?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
}

interface Beacon {
  id: string;
  nx: number;
  ny: number;
  points: number;
  collected: boolean;
}

interface NormalizedMission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  launchPad: { nx: number; ny: number; defaultAngle: number; defaultPower: number };
  bodies: NormalizedBody[];
  beacons: Beacon[];
  target: {
    nx: number;
    ny: number;
    radiusNorm: number;
    name: string;
    minSpeed: number;
    maxSpeed: number;
  };
}

const MISSIONS: NormalizedMission[] = [
  {
    id: 'lunar_slingshot',
    title: 'Mission 1: Lunar Slingshot & Capture',
    subtitle: 'Apollo-Style Free-Return Trajectory',
    description: 'Pull back from Earth to slingshot around the Moon. Collect orbital data beacons and enter Gateway Station orbit.',
    launchPad: { nx: 0.12, ny: 0.72, defaultAngle: -0.68, defaultPower: 3.6 },
    bodies: [
      {
        id: 'earth',
        name: 'Earth',
        nx: 0.12,
        ny: 0.72,
        mass: 380,
        radiusNorm: 0.042,
        color: '#58C4DD', // 3B1B Blue
        glowColor: 'rgba(88, 196, 221, 0.4)'
      },
      {
        id: 'moon',
        name: 'Moon',
        nx: 0.52,
        ny: 0.42,
        mass: 140,
        radiusNorm: 0.026,
        color: '#E2E8F0',
        glowColor: 'rgba(226, 232, 240, 0.35)',
        orbitCenter: { nx: 0.48, ny: 0.46 },
        orbitRadiusNorm: 0.11,
        orbitSpeed: 0.007,
        orbitAngle: 0
      }
    ],
    beacons: [
      { id: 'b1', nx: 0.34, ny: 0.55, points: 500, collected: false },
      { id: 'b2', nx: 0.58, ny: 0.28, points: 750, collected: false },
      { id: 'b3', nx: 0.72, ny: 0.36, points: 1000, collected: false }
    ],
    target: {
      nx: 0.86,
      ny: 0.28,
      radiusNorm: 0.052,
      name: 'Lunar Gateway Station',
      minSpeed: 0.8,
      maxSpeed: 5.2
    }
  },
  {
    id: 'lagrange_saddle',
    title: 'Mission 2: Lagrange L1 Equilibrium',
    subtitle: 'Gravitational Three-Body Saddle Point',
    description: 'Thread the gravitational sweet spot between two heavy bodies to reach the deep Lagrange observatory.',
    launchPad: { nx: 0.10, ny: 0.50, defaultAngle: -0.15, defaultPower: 3.9 },
    bodies: [
      {
        id: 'primary',
        name: 'Alpha Core',
        nx: 0.18,
        ny: 0.50,
        mass: 340,
        radiusNorm: 0.038,
        color: '#58C4DD',
        glowColor: 'rgba(88, 196, 221, 0.4)'
      },
      {
        id: 'secondary',
        name: 'Beta Core',
        nx: 0.82,
        ny: 0.50,
        mass: 310,
        radiusNorm: 0.036,
        color: '#9A72AC', // 3B1B Purple
        glowColor: 'rgba(154, 114, 172, 0.4)'
      }
    ],
    beacons: [
      { id: 'b1', nx: 0.35, ny: 0.38, points: 800, collected: false },
      { id: 'b2', nx: 0.50, ny: 0.50, points: 1500, collected: false },
      { id: 'b3', nx: 0.65, ny: 0.62, points: 800, collected: false }
    ],
    target: {
      nx: 0.50,
      ny: 0.50,
      radiusNorm: 0.048,
      name: 'L1 Lagrange Observatory',
      minSpeed: 0.3,
      maxSpeed: 3.4
    }
  },
  {
    id: 'voyager_jupiter',
    title: 'Mission 3: Voyager Deep Space Slingshot',
    subtitle: 'High-Velocity Gas Giant Oberth Maneuver',
    description: 'Use the intense gravitational well of a massive gas giant to fling your craft toward the interstellar relay beacon.',
    launchPad: { nx: 0.08, ny: 0.78, defaultAngle: -0.85, defaultPower: 4.4 },
    bodies: [
      {
        id: 'terrestrial',
        name: 'Terrestrial Core',
        nx: 0.08,
        ny: 0.78,
        mass: 220,
        radiusNorm: 0.032,
        color: '#58C4DD',
        glowColor: 'rgba(88, 196, 221, 0.3)'
      },
      {
        id: 'gas_giant',
        name: 'Jupiter Analogue',
        nx: 0.48,
        ny: 0.42,
        mass: 750,
        radiusNorm: 0.058,
        color: '#FC6255', // 3B1B Coral
        glowColor: 'rgba(252, 98, 85, 0.45)'
      }
    ],
    beacons: [
      { id: 'b1', nx: 0.28, ny: 0.48, points: 600, collected: false },
      { id: 'b2', nx: 0.52, ny: 0.24, points: 1200, collected: false },
      { id: 'b3', nx: 0.76, ny: 0.18, points: 2000, collected: false }
    ],
    target: {
      nx: 0.90,
      ny: 0.15,
      radiusNorm: 0.055,
      name: 'Interstellar Deep Relay',
      minSpeed: 2.2,
      maxSpeed: 8.8
    }
  }
];

const G_SCALE = 1400; // Gravitational constant scale for smooth 60fps dynamics

export const ThreeB1BOrbitalGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Highscore and Persistence State
  const [highScore, setHighScore] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('artits_3b1b_highscore');
      return saved ? parseInt(saved, 10) : 18500;
    }
    return 18500;
  });

  const [maxMultiplierRecord, setMaxMultiplierRecord] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('artits_3b1b_max_multiplier');
      return saved ? parseInt(saved, 10) : 3;
    }
    return 3;
  });

  const [currentScore, setCurrentScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [comboBanner, setComboBanner] = useState<string | null>(null);

  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const currentMission = MISSIONS[activeMissionIdx];

  const [gameState, setGameState] = useState<'idle' | 'aiming' | 'flying' | 'success' | 'crashed'>('idle');
  const [fuel, setFuel] = useState(100);
  const [soundMuted, setSoundMuted] = useState(false);
  const [showVectors, setShowVectors] = useState(true);
  const [warpGrid, setWarpGrid] = useState(true);
  const [telemetry, setTelemetry] = useState({ speed: 0, force: 0, distance: 0 });
  const [announcement, setAnnouncement] = useState('Pull back from Earth to aim your slingshot trajectory.');

  // Aiming vector in relative normalized velocity
  const [aimVector, setAimVector] = useState({
    vx: Math.cos(currentMission.launchPad.defaultAngle) * currentMission.launchPad.defaultPower,
    vy: Math.sin(currentMission.launchPad.defaultAngle) * currentMission.launchPad.defaultPower
  });

  const isDraggingAimRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Spacecraft state in animation ref for smooth 60 FPS execution
  const craftRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    trail: [] as { x: number; y: number; alpha: number }[],
    angle: 0,
    slingshotBonusAwarded: false
  });

  const bodiesRef = useRef<NormalizedBody[]>([]);
  const beaconsRef = useRef<Beacon[]>([]);
  const dimensionsRef = useRef({ width: 800, height: 480 });

  // Sync Audio Setting
  const toggleSound = () => {
    setSoundMuted(prev => {
      const next = !prev;
      soundEngine.enabled = !next;
      return next;
    });
  };

  // Sync Highscore to Edge Backend
  const syncHighscoreToEdge = useCallback(async (newScore: number, mult: number) => {
    try {
      await fetch('/api/highscore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Player',
          score: newScore,
          multiplier: mult,
          missionId: currentMission.id
        })
      });
    } catch {
      // Offline-first graceful fallback: saved in localStorage
    }
  }, [currentMission.id]);

  // Load highscore from Edge Backend on mount
  useEffect(() => {
    fetch('/api/highscore')
      .then(res => res.json())
      .then(data => {
        if (data && data.highScore && data.highScore.score > highScore) {
          setHighScore(data.highScore.score);
          localStorage.setItem('artits_3b1b_highscore', data.highScore.score.toString());
        }
      })
      .catch(() => {
        // Safe fallback
      });
  }, [highScore]);

  // Reset Mission & Dimensions
  const resetMission = useCallback((missionIdx: number = activeMissionIdx) => {
    const mission = MISSIONS[missionIdx];
    bodiesRef.current = JSON.parse(JSON.stringify(mission.bodies));
    beaconsRef.current = JSON.parse(JSON.stringify(mission.beacons));

    const { width, height } = dimensionsRef.current;
    const startX = mission.launchPad.nx * width;
    const startY = mission.launchPad.ny * height;
    const defaultVx = Math.cos(mission.launchPad.defaultAngle) * mission.launchPad.defaultPower;
    const defaultVy = Math.sin(mission.launchPad.defaultAngle) * mission.launchPad.defaultPower;

    craftRef.current = {
      x: startX,
      y: startY,
      vx: defaultVx,
      vy: defaultVy,
      trail: [],
      angle: Math.atan2(defaultVy, defaultVx),
      slingshotBonusAwarded: false
    };

    setAimVector({ vx: defaultVx, vy: defaultVy });
    setGameState('idle');
    setFuel(100);
    setMultiplier(1);
    setCurrentScore(0);
    setComboBanner(null);
    setTelemetry({ speed: 0, force: 0, distance: 0 });
    setAnnouncement(`Mission ready: ${mission.title}. Pull back or adjust aim and release.`);
  }, [activeMissionIdx]);

  useEffect(() => {
    resetMission(activeMissionIdx);
  }, [activeMissionIdx, resetMission]);

  // Resize Observer for Canvas (Strictly decoupled from RAF render loop)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const containerWidth = containerRef.current?.clientWidth || 800;
      const targetWidth = Math.min(1140, Math.max(340, containerWidth));
      const targetHeight = Math.min(520, Math.max(380, targetWidth * 0.52));

      dimensionsRef.current = { width: targetWidth, height: targetHeight };
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      if (gameState === 'idle') {
        const mission = MISSIONS[activeMissionIdx];
        craftRef.current.x = mission.launchPad.nx * targetWidth;
        craftRef.current.y = mission.launchPad.ny * targetHeight;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [gameState, activeMissionIdx]);

  // Launch probe
  const launchProbe = () => {
    if (gameState === 'flying') return;
    const { width, height } = dimensionsRef.current;
    craftRef.current.x = currentMission.launchPad.nx * width;
    craftRef.current.y = currentMission.launchPad.ny * height;
    craftRef.current.vx = aimVector.vx;
    craftRef.current.vy = aimVector.vy;
    craftRef.current.trail = [];
    craftRef.current.angle = Math.atan2(aimVector.vy, aimVector.vx);
    craftRef.current.slingshotBonusAwarded = false;

    soundEngine.playSlingshot();
    setGameState('flying');
    setAnnouncement('Spacecraft launched! Orbiting under real Newtonian gravitation.');
  };

  // Thruster Impulse
  const fireThruster = (multiplierVal: number = 1) => {
    if (gameState !== 'flying' || fuel <= 0) return;
    const craft = craftRef.current;
    const speed = Math.hypot(craft.vx, craft.vy) || 1;
    const forwardX = craft.vx / speed;
    const forwardY = craft.vy / speed;

    craft.vx += forwardX * 0.65 * multiplierVal;
    craft.vy += forwardY * 0.65 * multiplierVal;
    setFuel(prev => Math.max(0, prev - 7));
    soundEngine.playThruster();
  };

  // RK4 Forward Trajectory Predictor
  const computePredictionPath = (startX: number, startY: number, startVx: number, startVy: number, steps: number = 130) => {
    const { width, height } = dimensionsRef.current;
    const path: { x: number; y: number }[] = [{ x: startX, y: startY }];
    let px = startX;
    let py = startY;
    let pvx = startVx;
    let pvy = startVy;
    const dt = 0.55;

    for (let i = 0; i < steps; i++) {
      let ax = 0;
      let ay = 0;

      for (const b of bodiesRef.current) {
        const bx = b.nx * width;
        const by = b.ny * height;
        const radius = b.radiusNorm * width;

        const dx = bx - px;
        const dy = by - py;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < radius) return path;

        const force = (G_SCALE * b.mass) / (distSq + 220);
        ax += force * (dx / dist);
        ay += force * (dy / dist);
      }

      pvx += ax * dt;
      pvy += ay * dt;
      px += pvx * dt;
      py += pvy * dt;

      if (i % 2 === 0) path.push({ x: px, y: py });
    }
    return path;
  };

  // Main 60 FPS Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const { width, height } = dimensionsRef.current;

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // --- 1. 3Blue1Brown Chalkboard Background ---
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, width, height);

      // --- 2. Dynamic Space-Time Gravitational Curvature Grid ---
      const gridStep = 44;
      ctx.lineWidth = 1;

      for (let x = 0; x <= width; x += gridStep) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 12) {
          let warpedX = x;
          let warpedY = y;

          if (warpGrid) {
            // Apply Einstein/Newton space-time gravitational dip toward heavy bodies
            for (const b of bodiesRef.current) {
              const bx = b.nx * width;
              const by = b.ny * height;
              const dx = bx - x;
              const dy = by - y;
              const dist = Math.hypot(dx, dy) + 40;
              const dip = (b.mass * 8) / (dist * dist);
              warpedX += dx * dip;
              warpedY += dy * dip;
            }
          }

          if (y === 0) ctx.moveTo(warpedX, warpedY);
          else ctx.lineTo(warpedX, warpedY);
        }
        ctx.strokeStyle = 'rgba(88, 196, 221, 0.04)';
        ctx.stroke();
      }

      for (let y = 0; y <= height; y += gridStep) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          let warpedX = x;
          let warpedY = y;

          if (warpGrid) {
            for (const b of bodiesRef.current) {
              const bx = b.nx * width;
              const by = b.ny * height;
              const dx = bx - x;
              const dy = by - y;
              const dist = Math.hypot(dx, dy) + 40;
              const dip = (b.mass * 8) / (dist * dist);
              warpedX += dx * dip;
              warpedY += dy * dip;
            }
          }

          if (x === 0) ctx.moveTo(warpedX, warpedY);
          else ctx.lineTo(warpedX, warpedY);
        }
        ctx.strokeStyle = 'rgba(88, 196, 221, 0.04)';
        ctx.stroke();
      }

      // Major Cartesian Axes (3B1B Manim Style)
      const originX = width * 0.5;
      const originY = height * 0.5;
      ctx.strokeStyle = 'rgba(88, 196, 221, 0.14)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.45)';
      ctx.fillText('(0, 0)', originX + 6, originY - 6);
      ctx.fillText('+x', width - 24, originY - 6);
      ctx.fillText('+y', originX + 6, 16);

      // --- 3. Dynamic Celestial Bodies & Equipotential Well Contours ---
      bodiesRef.current.forEach(b => {
        if (b.orbitCenter && b.orbitRadiusNorm && b.orbitSpeed !== undefined && b.orbitAngle !== undefined) {
          b.orbitAngle += b.orbitSpeed;
          b.nx = b.orbitCenter.nx + Math.cos(b.orbitAngle) * b.orbitRadiusNorm;
          b.ny = b.orbitCenter.ny + Math.sin(b.orbitAngle) * b.orbitRadiusNorm;
        }

        const bx = b.nx * width;
        const by = b.ny * height;
        const radius = b.radiusNorm * width;

        // Equipotential gravitational contours (Manim potential lines)
        for (let ring = 1; ring <= 3; ring++) {
          const r = radius + ring * 28;
          ctx.beginPath();
          ctx.arc(bx, by, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(88, 196, 221, ${0.12 / ring})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([3, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Ambient Planet Halo
        const glow = ctx.createRadialGradient(bx, by, radius * 0.3, bx, by, radius * 2.2);
        glow.addColorStop(0, b.glowColor);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(bx, by, radius * 2.2, 0, Math.PI * 2);
        ctx.fill();

        // Planet Body
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(bx, by, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#CBD5E1';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(b.name, bx, by + radius + 14);
      });

      // --- 4. Scientific Orbital Data Beacons (Collectibles for Multiplier) ---
      beaconsRef.current.forEach(beacon => {
        if (beacon.collected) return;
        const beaconX = beacon.nx * width;
        const beaconY = beacon.ny * height;

        const pulse = Math.sin(Date.now() / 200 + beaconX) * 3;
        ctx.beginPath();
        ctx.arc(beaconX, beaconY, 8 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(244, 208, 63, 0.25)';
        ctx.fill();

        // Diamond Icon
        ctx.save();
        ctx.translate(beaconX, beaconY);
        ctx.rotate(Date.now() / 600);
        ctx.fillStyle = '#F4D03F'; // 3B1B Gold
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.lineTo(6, 0);
        ctx.lineTo(0, 6);
        ctx.lineTo(-6, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#F4D03F';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(`+${beacon.points}✦`, beaconX, beaconY - 12);
      });

      // --- 5. Target Gateway Docking Zone ---
      const target = currentMission.target;
      const targetX = target.nx * width;
      const targetY = target.ny * height;
      const targetRadius = target.radiusNorm * width;

      ctx.beginPath();
      ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2);
      ctx.strokeStyle = '#83C167'; // 3B1B Green
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      const targetPulse = Math.sin(Date.now() / 260) * 5;
      ctx.beginPath();
      ctx.arc(targetX, targetY, targetRadius + targetPulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(131, 193, 103, 0.3)';
      ctx.stroke();

      ctx.fillStyle = '#83C167';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`⌖ ${target.name}`, targetX, targetY - targetRadius - 8);
      ctx.fillText(`[${target.minSpeed} - ${target.maxSpeed} km/s]`, targetX, targetY + targetRadius + 14);

      // --- 6. Trajectory Prediction Line ---
      const launchX = currentMission.launchPad.nx * width;
      const launchY = currentMission.launchPad.ny * height;
      const currentCraftX = gameState === 'flying' ? craftRef.current.x : launchX;
      const currentCraftY = gameState === 'flying' ? craftRef.current.y : launchY;
      const currentCraftVx = gameState === 'flying' ? craftRef.current.vx : aimVector.vx;
      const currentCraftVy = gameState === 'flying' ? craftRef.current.vy : aimVector.vy;

      const pred = computePredictionPath(currentCraftX, currentCraftY, currentCraftVx, currentCraftVy, 130);

      if (pred.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pred[0].x, pred[0].y);
        for (let i = 1; i < pred.length; i++) {
          ctx.lineTo(pred[i].x, pred[i].y);
        }
        ctx.strokeStyle = gameState === 'flying' ? 'rgba(88, 196, 221, 0.4)' : 'rgba(244, 208, 63, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // --- 7. Spacecraft Physics Update & Collision Detection ---
      const craft = craftRef.current;

      if (gameState === 'flying') {
        let totalAx = 0;
        let totalAy = 0;
        let crashed = false;

        // Planetary Gravitation
        for (const b of bodiesRef.current) {
          const bx = b.nx * width;
          const by = b.ny * height;
          const radius = b.radiusNorm * width;

          const dx = bx - craft.x;
          const dy = by - craft.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          // Collision detection
          if (dist < radius + 4) {
            crashed = true;
            soundEngine.playCrash();
            setGameState('crashed');
            setMultiplier(1);
            setAnnouncement(`Impact with ${b.name}! Multiplier reset. Press R to recalibrate trajectory.`);
            break;
          }

          // Close Gravitational Flyby Detection (Gravity Assist Slingshot Combo!)
          if (!craft.slingshotBonusAwarded && b.id !== 'earth' && b.id !== 'terrestrial') {
            if (dist < radius * 2.1) {
              craft.slingshotBonusAwarded = true;
              soundEngine.playGravityBoost();
              setMultiplier(m => {
                const newMult = Math.min(5, m + 1);
                setMaxMultiplierRecord(prev => Math.max(prev, newMult));
                return newMult;
              });
              setComboBanner(`🔥 GRAVITY ASSIST COMBO! MULTIPLIER ${multiplier + 1}x!`);
              setTimeout(() => setComboBanner(null), 2500);
            }
          }

          const force = (G_SCALE * b.mass) / (distSq + 220);
          totalAx += force * (dx / dist);
          totalAy += force * (dy / dist);
        }

        if (!crashed) {
          const dt = 0.55;
          craft.vx += totalAx * dt;
          craft.vy += totalAy * dt;
          craft.x += craft.vx * dt;
          craft.y += craft.vy * dt;
          craft.angle = Math.atan2(craft.vy, craft.vx);

          // Add to vapor trail
          craft.trail.push({ x: craft.x, y: craft.y, alpha: 1.0 });
          if (craft.trail.length > 80) craft.trail.shift();

          const currentSpeed = Math.hypot(craft.vx, craft.vy);
          const currentForce = Math.hypot(totalAx, totalAy);
          const distToTarget = Math.hypot(targetX - craft.x, targetY - craft.y);

          // Continuous flight score points
          setCurrentScore(s => s + Math.round(currentSpeed * multiplier));

          // Scientific Beacon collection detection
          beaconsRef.current.forEach(beacon => {
            if (beacon.collected) return;
            const bx = beacon.nx * width;
            const by = beacon.ny * height;
            if (Math.hypot(bx - craft.x, by - craft.y) < 22) {
              beacon.collected = true;
              soundEngine.playBeaconCollect();
              const pointsEarned = beacon.points * multiplier;
              setCurrentScore(s => s + pointsEarned);
              setComboBanner(`✦ DATA BEACON: +${pointsEarned} PTS!`);
              setTimeout(() => setComboBanner(null), 2000);
            }
          });

          setTelemetry({
            speed: parseFloat(currentSpeed.toFixed(2)),
            force: parseFloat(currentForce.toFixed(2)),
            distance: Math.round(distToTarget)
          });

          // Target Docking / Arrival Detection
          if (distToTarget < targetRadius) {
            if (currentSpeed >= target.minSpeed && currentSpeed <= target.maxSpeed) {
              soundEngine.playVictory();
              setGameState('success');

              // Final Victory Score Calculation with Fuel Bonus
              const finalRunScore = currentScore + (fuel * 80) + (multiplier * 2500);
              setCurrentScore(finalRunScore);

              if (finalRunScore > highScore) {
                setHighScore(finalRunScore);
                localStorage.setItem('artits_3b1b_highscore', finalRunScore.toString());
                syncHighscoreToEdge(finalRunScore, multiplier);
              }

              setAnnouncement(`Orbital Docking Confirmed! Final Score: ${finalRunScore.toLocaleString()}`);
            } else if (currentSpeed > target.maxSpeed) {
              soundEngine.playCrash();
              setGameState('crashed');
              setMultiplier(1);
              setAnnouncement(`Approach velocity too high (${currentSpeed.toFixed(1)} km/s). Escaped capture orbit.`);
            }
          }

          // Off-screen boundary check
          if (craft.x < -80 || craft.x > width + 80 || craft.y < -80 || craft.y > height + 80) {
            soundEngine.playCrash();
            setGameState('crashed');
            setMultiplier(1);
            setAnnouncement('Spacecraft escaped into deep space void. Press R to restart.');
          }
        }
      }

      // Draw Vapor Trail
      for (let i = 0; i < craft.trail.length - 1; i++) {
        const pt1 = craft.trail[i];
        const pt2 = craft.trail[i + 1];
        const ratio = i / craft.trail.length;

        ctx.beginPath();
        ctx.moveTo(pt1.x, pt1.y);
        ctx.lineTo(pt2.x, pt2.y);
        ctx.strokeStyle = `rgba(244, 208, 63, ${ratio * 0.75})`;
        ctx.lineWidth = ratio * 3.5;
        ctx.stroke();
      }

      // Draw Spacecraft Probe
      const shipX = gameState === 'flying' ? craft.x : launchX;
      const shipY = gameState === 'flying' ? craft.y : launchY;
      const shipAngle = gameState === 'flying' ? craft.angle : Math.atan2(aimVector.vy, aimVector.vx);

      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(shipAngle);

      // Probe Geometry
      ctx.fillStyle = '#F4D03F'; // 3B1B Gold
      ctx.beginPath();
      ctx.moveTo(11, 0);
      ctx.lineTo(-7, -6);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-7, 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Thruster flame
      if (gameState === 'flying') {
        ctx.fillStyle = '#FC6255';
        ctx.beginPath();
        ctx.moveTo(-5, -3);
        ctx.lineTo(-13 - Math.random() * 6, 0);
        ctx.lineTo(-5, 3);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();

      // --- 8. Slingshot Elastic Pull-Back Band (Aiming Phase) ---
      if (gameState === 'idle' || isDraggingAimRef.current) {
        ctx.beginPath();
        ctx.moveTo(shipX, shipY);
        ctx.lineTo(shipX + aimVector.vx * 26, shipY + aimVector.vy * 26);
        ctx.strokeStyle = '#F4D03F';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Slingshot Arrowhead
        const arrowAngle = Math.atan2(aimVector.vy, aimVector.vx);
        ctx.save();
        ctx.translate(shipX + aimVector.vx * 26, shipY + aimVector.vy * 26);
        ctx.rotate(arrowAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-8, -4);
        ctx.lineTo(-8, 4);
        ctx.closePath();
        ctx.fillStyle = '#F4D03F';
        ctx.fill();
        ctx.restore();

        const launchSpeed = Math.hypot(aimVector.vx, aimVector.vy);
        ctx.fillStyle = '#F4D03F';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(`v₀ = ${launchSpeed.toFixed(1)} km/s`, shipX + aimVector.vx * 26 + 10, shipY + aimVector.vy * 26);
      }

      // --- 9. Mathematical Vector Overlays (Velocity & Force) ---
      if (showVectors && gameState === 'flying') {
        const vScale = 14;
        // Velocity Vector (Cyan)
        ctx.beginPath();
        ctx.moveTo(shipX, shipY);
        ctx.lineTo(shipX + craft.vx * vScale, shipY + craft.vy * vScale);
        ctx.strokeStyle = '#58C4DD';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#58C4DD';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText('v⃗', shipX + craft.vx * vScale + 6, shipY + craft.vy * vScale);

        // Net Gravitational Force Vector (Pink)
        let fNetX = 0;
        let fNetY = 0;
        for (const b of bodiesRef.current) {
          const bx = b.nx * width;
          const by = b.ny * height;
          const dx = bx - shipX;
          const dy = by - shipY;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          const f = (G_SCALE * b.mass) / (distSq + 220);
          fNetX += f * (dx / dist);
          fNetY += f * (dy / dist);
        }

        ctx.beginPath();
        ctx.moveTo(shipX, shipY);
        ctx.lineTo(shipX + fNetX * 22, shipY + fNetY * 22);
        ctx.strokeStyle = '#FC6255';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#FC6255';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText('F⃗_g', shipX + fNetX * 22 + 6, shipY + fNetY * 22);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [gameState, aimVector, currentMission, showVectors, warpGrid, multiplier, highScore, currentScore, fuel, syncHighscoreToEdge]);

  // Pointer Aiming Interaction (Slingshot pull-back or drag forward)
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState === 'flying') return;
    isDraggingAimRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    updateAimFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingAimRef.current) return;
    updateAimFromPointer(e);
  };

  const handlePointerUp = () => {
    if (isDraggingAimRef.current) {
      isDraggingAimRef.current = false;
    }
  };

  const updateAimFromPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const { width, height } = dimensionsRef.current;
    const launchX = currentMission.launchPad.nx * width;
    const launchY = currentMission.launchPad.ny * height;

    const dx = clickX - launchX;
    const dy = clickY - launchY;

    // Scale speed smoothly between 1.5 and 6.8 km/s
    const speed = Math.min(6.8, Math.max(1.5, Math.hypot(dx, dy) / 24));
    const angle = Math.atan2(dy, dx);

    setAimVector({
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    });
  };

  // Keyboard Shortcuts (Space, R, Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'idle') {
          launchProbe();
        } else if (gameState === 'flying') {
          fireThruster(1);
        }
      } else if (e.key === 'r' || e.key === 'R') {
        resetMission();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      } else if (e.key === 'ArrowUp') {
        setAimVector(v => ({ vx: v.vx * 1.08, vy: v.vy * 1.08 }));
      } else if (e.key === 'ArrowDown') {
        setAimVector(v => ({ vx: v.vx * 0.92, vy: v.vy * 0.92 }));
      } else if (e.key === 'ArrowLeft') {
        const curAngle = Math.atan2(aimVector.vy, aimVector.vx) - 0.08;
        const speed = Math.hypot(aimVector.vx, aimVector.vy);
        setAimVector({ vx: Math.cos(curAngle) * speed, vy: Math.sin(curAngle) * speed });
      } else if (e.key === 'ArrowRight') {
        const curAngle = Math.atan2(aimVector.vy, aimVector.vx) + 0.08;
        const speed = Math.hypot(aimVector.vx, aimVector.vy);
        setAimVector({ vx: Math.cos(curAngle) * speed, vy: Math.sin(curAngle) * speed });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, aimVector, resetMission]);

  return (
    <div className="threeb1b-game-container" ref={containerRef} aria-label="3Blue1Brown Orbital Mechanics Game">
      {/* Top Header Bar */}
      <div className="game-header-bar">
        <div className="game-title-group">
          <div className="game-badge">
            <span className="b1b-symbol">3B1B</span>
            <span>Mathematical Physics & Space-Time Simulator</span>
          </div>
          <h3 className="game-headline">GRAVITY ASSIST: VOYAGER ODYSSEY</h3>
          <p className="game-subtext">{currentMission.description}</p>
        </div>

        {/* Highscore & Multiplier Badge */}
        <div className="highscore-badge-card">
          <div className="score-stat-col">
            <span className="score-stat-label">ALL-TIME HIGHSCORE</span>
            <span className="score-stat-val b1b-yellow">🏆 {highScore.toLocaleString()}</span>
          </div>
          <div className="score-stat-col">
            <span className="score-stat-label">RECORD COMBO</span>
            <span className="score-stat-val b1b-pink">⚡ {maxMultiplierRecord}x</span>
          </div>
        </div>
      </div>

      {/* Mission Tabs */}
      <div className="mission-tabs-strip" role="tablist" aria-label="Available Missions">
        {MISSIONS.map((m, idx) => (
          <button
            key={m.id}
            role="tab"
            aria-selected={activeMissionIdx === idx}
            className={`mission-tab-btn ${activeMissionIdx === idx ? 'active' : ''}`}
            onClick={() => setActiveMissionIdx(idx)}
          >
            {`0${idx + 1}. ${m.title.split(':')[1] || m.title}`}
          </button>
        ))}
      </div>

      {/* Live Telemetry & Combo HUD */}
      <div className="game-hud-bar" role="region" aria-label="Live Orbital Telemetry">
        <div className="hud-metric">
          <span className="hud-label">CURRENT SCORE</span>
          <span className="hud-value b1b-yellow">{currentScore.toLocaleString()}</span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">STREAK MULTIPLIER</span>
          <span className="hud-value b1b-pink">🔥 {multiplier}x</span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">VELOCITY (v⃗)</span>
          <span className="hud-value b1b-cyan">
            {telemetry.speed || Math.hypot(aimVector.vx, aimVector.vy).toFixed(1)} km/s
          </span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">FUEL RESERVES</span>
          <div className="fuel-bar-track">
            <div className="fuel-bar-fill" style={{ width: `${fuel}%` }}></div>
          </div>
        </div>
        <div className="hud-metric status-metric">
          <span className="hud-label">MISSION STATUS</span>
          <span className={`status-pill ${gameState}`}>
            {gameState.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Simulation Canvas with In-flight Alerts */}
      <div className="game-canvas-wrapper">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="img"
          aria-label={`Interactive 3Blue1Brown orbital simulation canvas for ${currentMission.title}. Drag to aim and release.`}
          className="threeb1b-canvas"
        />

        {/* Combo Multiplier Banner Floating Alert */}
        {comboBanner && (
          <div className="combo-floating-badge" role="status">
            {comboBanner}
          </div>
        )}

        {/* Mission Result Overlay */}
        {gameState === 'success' && (
          <div className="mission-alert success-alert" role="alert">
            <div className="alert-icon">✨</div>
            <div className="alert-content">
              <h4>ORBITAL CAPTURE CONFIRMED!</h4>
              <p>
                Flawless trajectory! Docked with {currentMission.target.name}. Run Score: {currentScore.toLocaleString()} (Combo: {multiplier}x).
              </p>
            </div>
            <button type="button" onClick={() => resetMission()} className="alert-btn">
              Next Mission / Replay
            </button>
          </div>
        )}

        {gameState === 'crashed' && (
          <div className="mission-alert crash-alert" role="alert">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <h4>TRAJECTORY TERMINATED</h4>
              <p>{announcement}</p>
            </div>
            <button type="button" onClick={() => resetMission()} className="alert-btn">
              Recalculate & Retry
            </button>
          </div>
        )}

        {/* Bottom Instruction Tag */}
        <div className="canvas-instruction-tag">
          {gameState === 'idle' ? 'DRAG SLINGSHOT TO AIM // SPACE TO LAUNCH' : 'PRESS SPACE FOR RCS BURN // R TO RESET'}
        </div>
      </div>

      {/* Control Actions & Audio Strip */}
      <div className="game-controls-bar">
        <div className="primary-actions">
          {gameState === 'idle' ? (
            <button
              type="button"
              className="game-btn launch-btn"
              onClick={launchProbe}
              aria-label="Launch Spacecraft on calculated trajectory"
            >
              <span>🚀 Launch Slingshot</span>
              <span className="key-hint">SPACE</span>
            </button>
          ) : (
            <button
              type="button"
              className="game-btn thruster-btn"
              onClick={() => fireThruster(1)}
              disabled={gameState !== 'flying' || fuel <= 0}
              aria-label="Fire spacecraft RCS thrusters"
            >
              <span>🔥 Fire RCS Thrusters</span>
              <span className="key-hint">SPACE</span>
            </button>
          )}

          <button
            type="button"
            className="game-btn reset-btn"
            onClick={() => resetMission()}
            aria-label="Reset simulation to initial launchpad"
          >
            <span>↺ Reset</span>
            <span className="key-hint">R</span>
          </button>

          <button
            type="button"
            className="game-btn audio-btn"
            onClick={toggleSound}
            aria-label={soundMuted ? 'Unmute procedural sound effects' : 'Mute procedural sound effects'}
          >
            <span>{soundMuted ? '🔇 Audio Off' : '🔊 WebAudio On'}</span>
          </button>
        </div>

        {/* Toggles */}
        <div className="secondary-actions">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showVectors}
              onChange={(e) => setShowVectors(e.target.checked)}
            />
            <span>3B1B Vectors (v⃗, F⃗_g)</span>
          </label>

          <label className="toggle-label">
            <input
              type="checkbox"
              checked={warpGrid}
              onChange={(e) => setWarpGrid(e.target.checked)}
            />
            <span>Relativity Grid Warp</span>
          </label>
        </div>
      </div>

      {/* Screen Reader Live Region */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
};
