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
  x: number;
  y: number;
  vx: number;
  vy: number;
  isCollected: boolean;
  type: string;
}

interface TelemetryPulse {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  text: string;
  alpha: number;
}

const ARCHITECT_PULSES = [
  "⚡ Sub-millisecond in-memory ring buffers active",
  "🚀 NATS JetStream zero-loss telemetry streaming",
  "🤖 Multi-agent autonomous AI swarm coordinated",
  "📈 Real-time forensic market execution pipeline online",
  "☁️ High-availability zero-downtime Kubernetes architecture",
  "🛡️ Infortts Core security & cryptographic invariants locked"
];

const CORE_STACK_CHIPS = [
  { id: 'distributed', label: '#Distributed-Systems-NATS', color: '#ff7f11' },
  { id: 'forensics', label: '#Forensic-Trading-MT5', color: '#1f4e9c' },
  { id: 'ai', label: '#Autonomous-AI-Swarms', color: '#138808' },
  { id: 'k8s', label: '#Kubernetes-Zero-Downtime', color: '#c0392b' },
  { id: 'lowlatency', label: '#Sub-Millisecond-Execution', color: '#8a4b2a' }
];

export const ArchitectRunnerGame: React.FC<ArchitectRunnerGameProps> = ({
  onOpenPhoneCall,
  onOpenPortfolio,
  inforttsFeedsCount = 40,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Menu State
  const [inMenu, setInMenu] = useState<boolean>(true);
  const [guestName, setGuestName] = useState<string>('Guest Engineer');
  const [selectedRole, setSelectedRole] = useState<'systems' | 'agentic'>('systems');
  const [selectedChips, setSelectedChips] = useState<string[]>(['distributed', 'ai']);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  // Score & Game State
  const [pipelineCount, setPipelineCount] = useState<number>(1);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const local = localStorage.getItem('artits_architect_highscore');
      return local ? parseInt(local, 10) : 48;
    } catch {
      return 48;
    }
  });
  const [statusMsg, setStatusMsg] = useState<string>(
    'Infortts Core Edge Gateway Online • 40+ Market Feeds Live • High-Throughput Cluster Stable'
  );

  // Refs for 60fps Loop
  const characterRef = useRef({
    x: 400,
    y: 520,
    vx: 0,
    vy: 0,
    speed: 3.8,
    isDashing: false,
    heading: 0,
  });

  const mousePosRef = useRef({ x: 400, y: 520, isDown: false, isRightDown: false });
  const keysRef = useRef<{ [key: string]: boolean }>({});

  const dataPacketsRef = useRef<DataPacket[]>([]);
  const pipelineRef = useRef<PipelineAgent[]>([]);
  const telemetryPulsesRef = useRef<TelemetryPulse[]>([]);

  // Landmarks & Black Hole Project Hazards
  const landmarksRef = useRef({
    // Command HQ / Phone Booth at the Top
    commandHQ: { x: 400, y: 150, width: 140, height: 110 },
    phoneTerminal: { x: 400, y: 140, radius: 28 },
    // 4 Project Stations with Gravitational Fields
    stations: [
      { id: 'mitochondria', name: 'ZENITH & MITOCHONDRIA', subtitle: 'Trading Forensics Workstation', x: 200, y: 320, radius: 55, pull: 0.8, color: '#ff7f11' },
      { id: 'meeseeks', name: 'MEESEEKS', subtitle: 'Autonomous AI Swarm', x: 600, y: 320, radius: 50, pull: 0.75, color: '#1f4e9c' },
      { id: 'roost', name: 'ROOST SAAS', subtitle: 'Multi-Tenant Escrow Platform', x: 220, y: 640, radius: 48, pull: 0.7, color: '#138808' },
      { id: 'bighit', name: 'BIGHIT CLOUD', subtitle: 'Kubernetes Infrastructure', x: 580, y: 640, radius: 52, pull: 0.85, color: '#c0392b' },
    ],
  });

  // Sound Engine
  const playPulseSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.16);

        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.22);
      }
    } catch {}
  }, [isSoundMuted]);

  // Sync highscore
  const syncScore = useCallback((newCount: number) => {
    setHighScore((prev) => {
      if (newCount > prev) {
        try {
          localStorage.setItem('artits_architect_highscore', newCount.toString());
        } catch {}
        fetch('/api/highscore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: guestName || 'Architect Explorer',
            score: newCount * 100,
            multiplier: newCount,
            missionId: 'architect_runner',
            game: 'architect_runner',
          }),
        }).catch(() => {});
        return newCount;
      }
      return prev;
    });
  }, [guestName]);

  // Trigger Telemetry Broadcast / Slogan Pulse
  const triggerTelemetryPulse = useCallback(() => {
    const char = characterRef.current;
    const pulseText = ARCHITECT_PULSES[Math.floor(Math.random() * ARCHITECT_PULSES.length)];
    playPulseSound();

    telemetryPulsesRef.current.push({
      x: char.x,
      y: char.y,
      radius: 12,
      maxRadius: 190,
      text: pulseText,
      alpha: 1.0,
    });

    // Telemetry Pulse collects nearby microservice packets
    dataPacketsRef.current.forEach((p) => {
      if (!p.isCollected) {
        const d = Math.hypot(p.x - char.x, p.y - char.y);
        if (d < 170) {
          p.isCollected = true;
          pipelineRef.current.push({
            x: p.x,
            y: p.y,
            color: selectedRole === 'systems' ? '#ff7f11' : '#138808',
            label: p.type,
          });
          const nextCount = pipelineRef.current.length + 1;
          setPipelineCount(nextCount);
          syncScore(nextCount);
        }
      }
    });
  }, [playPulseSound, selectedRole, syncScore]);

  // Start / Reset Game
  const resetGame = useCallback(() => {
    characterRef.current.x = 400;
    characterRef.current.y = 520;
    characterRef.current.vx = 0;
    characterRef.current.vy = 0;

    // Spawn 70 microservice data packets across the map
    const newPackets: DataPacket[] = [];
    const packetTypes = ['NATS', 'RingBuffer', 'MT5', 'Agent', 'Qdrant', 'K8s', 'Escrow', 'Telemetry'];
    for (let i = 0; i < 70; i++) {
      newPackets.push({
        x: 80 + Math.random() * 640,
        y: 200 + Math.random() * 550,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        isCollected: false,
        type: packetTypes[Math.floor(Math.random() * packetTypes.length)],
      });
    }
    dataPacketsRef.current = newPackets;
    pipelineRef.current = [];
    telemetryPulsesRef.current = [];
    setPipelineCount(1);
    setInMenu(false);
  }, []);

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        triggerTelemetryPulse();
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
  }, [triggerTelemetryPulse, onOpenPortfolio]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTick = performance.now();

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - lastTick) / 1000);
      lastTick = now;

      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      const char = characterRef.current;
      const keys = keysRef.current;

      // 1. CHARACTER MOVEMENT & CONTROLS
      let mx = 0;
      let my = 0;

      if (keys['w'] || keys['arrowup']) my -= 1;
      if (keys['s'] || keys['arrowdown']) my += 1;
      if (keys['a'] || keys['arrowleft']) mx -= 1;
      if (keys['d'] || keys['arrowright']) mx += 1;

      // Mouse drag movement
      if (mousePosRef.current.isDown) {
        const dx = mousePosRef.current.x - char.x;
        const dy = mousePosRef.current.y - char.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 15) {
          mx = dx / dist;
          my = dy / dist;
        }
      }

      const isRunning = keys['shift'] || char.isDashing || mousePosRef.current.isRightDown;
      const currentSpeed = char.speed * (isRunning ? 1.75 : 1.0);

      if (mx !== 0 || my !== 0) {
        const len = Math.hypot(mx, my);
        char.vx += (mx / len) * currentSpeed * 0.25;
        char.vy += (my / len) * currentSpeed * 0.25;
        char.heading = Math.atan2(my, mx);
      }

      char.vx *= 0.88;
      char.vy *= 0.88;
      char.x += char.vx;
      char.y += char.vy;

      // Keep inside bounds
      char.x = Math.max(30, Math.min(width - 30, char.x));
      char.y = Math.max(30, Math.min(height - 30, char.y));

      // 2. PROJECT STATIONS GRAVITATIONAL FIELDS
      landmarksRef.current.stations.forEach((st) => {
        const dx = st.x - char.x;
        const dy = st.y - char.y;
        const dist = Math.hypot(dx, dy);

        // Gravitational attraction towards project station
        if (dist < st.radius * 2.8 && dist > st.radius * 0.6) {
          const force = (st.pull * 60) / Math.max(30, dist);
          char.vx += (dx / dist) * force * dt;
          char.vy += (dy / dist) * force * dt;
        }

        // Caught in project horizon: warp back
        if (dist <= st.radius * 0.5) {
          char.x = width / 2;
          char.y = height - 120;
          char.vx = 0;
          char.vy = 0;
          setStatusMsg(`⚡ Explored ${st.name}! Resumed system exploration.`);
        }
      });

      // 3. PHONE TERMINAL AT COMMAND HQ CHECK
      const phone = landmarksRef.current.phoneTerminal;
      const distToPhone = Math.hypot(phone.x - char.x, phone.y - char.y);
      if (distToPhone <= phone.radius + 15) {
        onOpenPhoneCall();
        char.y += 40; // Push back slightly
      }

      // 4. PIPELINE AGENTS TRAILING BEHIND PLAYER
      const pipeline = pipelineRef.current;
      pipeline.forEach((p, idx) => {
        const target = idx === 0 ? char : pipeline[idx - 1];
        const dx = target.x - p.x;
        const dy = target.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 22) {
          p.x += (dx / dist) * currentSpeed * 0.85;
          p.y += (dy / dist) * currentSpeed * 0.85;
        }
      });

      // 5. DRAW CANVAS (Engineering Blueprint Ground & Parchment Grid)
      ctx.fillStyle = '#8fae63'; // Signature warm lawn green from mantarjantar.com
      ctx.fillRect(0, 0, width, height);

      // System Bus Pathways & Central Boulevard
      ctx.fillStyle = '#d8c7a8';
      ctx.fillRect(width / 2 - 80, 80, 160, height);
      // Connaught Place outer circular architecture ring
      ctx.strokeStyle = '#e2d3b6';
      ctx.lineWidth = 40;
      ctx.beginPath();
      ctx.arc(width / 2, height - 180, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Bus line dashes
      ctx.strokeStyle = '#f6eedd';
      ctx.lineWidth = 3;
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 80);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // 6. RENDER 4 PRODUCTION PROJECT STATIONS (BLACK HOLES)
      landmarksRef.current.stations.forEach((st) => {
        // Accretion Disk swirl
        const grad = ctx.createRadialGradient(st.x, st.y, st.radius * 0.3, st.x, st.y, st.radius * 1.5);
        grad.addColorStop(0, '#1d1a16');
        grad.addColorStop(0.5, st.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Swirling photon ring
        ctx.save();
        ctx.translate(st.x, st.y);
        ctx.rotate(now * 0.002);
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, 0, st.radius * 0.9, st.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Singularity Core
        ctx.fillStyle = '#1d1a16';
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#1d1a16';
        ctx.font = 'bold 12px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(st.name, st.x, st.y + st.radius + 18);
        ctx.font = '10px "Segoe UI", sans-serif';
        ctx.fillStyle = '#5b4a3a';
        ctx.fillText(`${st.subtitle} 🌀`, st.x, st.y + st.radius + 30);
      });

      // 7. RENDER COMMAND HQ (Terracotta Pavilion)
      const hq = landmarksRef.current.commandHQ;
      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.moveTo(hq.x, hq.y - 50);
      ctx.lineTo(hq.x + 80, hq.y + 40);
      ctx.lineTo(hq.x - 80, hq.y + 40);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#962d22';
      ctx.beginPath();
      ctx.moveTo(hq.x, hq.y - 50);
      ctx.lineTo(hq.x, hq.y + 40);
      ctx.lineTo(hq.x - 80, hq.y + 40);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#1d1a16';
      ctx.font = 'bold 14px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏛️ INFORTTS CORE HQ', hq.x, hq.y - 60);

      // 8. RENDER PHONE TERMINAL AT COMMAND HQ
      const pt = landmarksRef.current.phoneTerminal;
      const ringSize = pt.radius + (Math.sin(now * 0.006) + 1) * 6;
      ctx.strokeStyle = 'rgba(19, 136, 8, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, ringSize, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#f6eedd';
      ctx.strokeStyle = '#138808';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '20px serif';
      ctx.textBaseline = 'middle';
      ctx.fillText('📞', pt.x, pt.y);
      ctx.font = 'bold 11px "Segoe UI", sans-serif';
      ctx.fillStyle = '#138808';
      ctx.fillText('CALL SAHIL', pt.x, pt.y + pt.radius + 14);

      // 9. RENDER DATA PACKETS
      dataPacketsRef.current.forEach((p) => {
        if (!p.isCollected) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 50 || p.x > width - 50) p.vx *= -1;
          if (p.y < 120 || p.y > height - 50) p.vy *= -1;

          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#5b4a3a';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#1d1a16';
          ctx.font = '8px "JetBrains Mono", monospace';
          ctx.fillText(p.type, p.x, p.y - 9);
        }
      });

      // 10. RENDER PIPELINE AGENTS
      pipeline.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.strokeStyle = '#1d1a16';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.strokeStyle = '#1d1a16';
        ctx.beginPath();
        ctx.moveTo(p.x + 3, p.y - 4);
        ctx.lineTo(p.x + 10, p.y - 12);
        ctx.stroke();
        ctx.fillStyle = '#ff9933';
        ctx.fillRect(p.x + 10, p.y - 16, 8, 6);
      });

      // 11. RENDER PLAYER AVATAR (SAHIL RATHEE / ARCHITECT)
      ctx.fillStyle = selectedRole === 'systems' ? '#ff7f11' : '#138808';
      ctx.strokeStyle = '#1d1a16';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(char.x, char.y, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.strokeStyle = '#1d1a16';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(char.x, char.y);
      ctx.lineTo(char.x + Math.cos(char.heading) * 18, char.y + Math.sin(char.heading) * 18);
      ctx.stroke();

      ctx.fillStyle = '#1d1a16';
      ctx.font = 'bold 12px "Segoe UI", sans-serif';
      ctx.fillText(`⚡ Sahil (${selectedRole === 'systems' ? 'Systems' : 'AI'})`, char.x, char.y - 20);

      // 12. RENDER TELEMETRY PULSES
      for (let i = telemetryPulsesRef.current.length - 1; i >= 0; i--) {
        const pulse = telemetryPulsesRef.current[i];
        pulse.radius += dt * 260;
        pulse.alpha -= dt * 0.65;

        if (pulse.alpha <= 0) {
          telemetryPulsesRef.current.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(255, 153, 51, ${pulse.alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(29, 26, 22, ${pulse.alpha})`;
        ctx.font = 'bold 13px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(pulse.text, pulse.x, pulse.y - pulse.radius - 8);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [selectedRole, onOpenPhoneCall]);

  return (
    <div className="jantar-mantar-container">
      {/* Full-Viewport Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={(e) => {
          mousePosRef.current = { x: e.clientX, y: e.clientY, isDown: e.button === 0, isRightDown: e.button === 2 };
        }}
        onMouseMove={(e) => {
          if (mousePosRef.current.isDown || mousePosRef.current.isRightDown) {
            mousePosRef.current.x = e.clientX;
            mousePosRef.current.y = e.clientY;
          }
        }}
        onMouseUp={() => {
          mousePosRef.current.isDown = false;
          mousePosRef.current.isRightDown = false;
        }}
        onContextMenu={(e) => e.preventDefault()}
        onTouchStart={(e) => {
          if (e.touches.length > 0) {
            mousePosRef.current.x = e.touches[0].clientX;
            mousePosRef.current.y = e.touches[0].clientY;
            mousePosRef.current.isDown = true;
          }
        }}
        onTouchMove={(e) => {
          if (e.touches.length > 0) {
            mousePosRef.current.x = e.touches[0].clientX;
            mousePosRef.current.y = e.touches[0].clientY;
          }
        }}
        onTouchEnd={() => {
          mousePosRef.current.isDown = false;
        }}
      />

      {/* Floating HUD Bar on Canvas */}
      {!inMenu && (
        <div className="jantar-game-hud">
          <div className="hud-metric">
            <span className="metric-label">PIPELINE NODES</span>
            <span className="metric-val">👥 {pipelineCount}</span>
          </div>
          <div className="hud-metric highlight">
            <span className="metric-label">BEST RECORD</span>
            <span className="metric-val">🏆 {highScore}</span>
          </div>
          <div className="hud-metric">
            <span className="metric-label">INFORTS FLEET</span>
            <span className="metric-val">⚡ {inforttsFeedsCount} Feeds</span>
          </div>
          <button type="button" className="hud-menu-btn" onClick={() => setInMenu(true)}>
            ☰ Menu
          </button>
          <button type="button" className="hud-portfolio-btn" onClick={onOpenPortfolio}>
            🏛️ Systems
          </button>
        </div>
      )}

      {/* Mobile Touch Action Buttons */}
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

      {/* Sahil Rathee Architectural Menu Card Overlay */}
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
              Architecting resilient Financial Systems, algorithmic execution pipelines, and multi-tenant cloud ecosystems. 
              Run across the architecture map to collect microservices, dodge black hole hazards, and reach the Phone Terminal to connect!
            </p>

            {/* Recruiter / Guest Input */}
            <input
              id="name"
              maxLength={28}
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Your name or company (e.g. Google DeepMind / Senior Tech Lead)"
            />

            {/* Architectural Mode Selection Grid */}
            <div className="roles">
              {/* Distributed Systems Mode */}
              <div
                className={`role ${selectedRole === 'systems' ? 'sel' : ''}`}
                onClick={() => setSelectedRole('systems')}
              >
                <div className="ic">⚡</div>
                <b>Distributed Systems Engineer</b>
                <p>Low-latency telemetry streaming (NATS JetStream), in-memory execution engines, and sub-millisecond ring buffers.</p>
                <div className="keys">
                  <span>🖱️ Point to navigate · <kbd>Space</kbd> for Telemetry Pulse<br />Hold <kbd>Shift</kbd> to sprint across Delhi</span>
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
                  <span>🖱️ Point to navigate · <kbd>Space</kbd> for Agent Dispatch<br />Hold <kbd>Shift</kbd> to sprint across Delhi</span>
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
              <button type="button" className="btn" id="play" onClick={resetGame}>
                EXPLORE WORKSPACE ▶
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
              <kbd>Space</kbd> pulse telemetry · <kbd>Shift</kbd> dash · <kbd>P</kbd> portfolio · <kbd>M</kbd> mute · <kbd>Esc</kbd> menu
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
