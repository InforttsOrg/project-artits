import React, { useState, useEffect, useRef, useCallback } from 'react';

interface JantarMantarGameProps {
  onOpenPhoneCall: () => void;
  onOpenPortfolio: () => void;
  inforttsFeedsCount?: number;
}

interface KafilaMember {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  sloganTimer: number;
}

interface Citizen {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isRecruited: boolean;
}

interface SloganWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  text: string;
  alpha: number;
}

const TECH_SLOGANS = [
  "Sub-millisecond in-memory ring buffers! 🚀",
  "Zero-loss NATS JetStream telemetry! ⚡",
  "Autonomous Agentic AI Swarms! 🤖",
  "High-Throughput Algorithmic Forensics! 📈",
  "Resilient multi-tenant cloud ecosystems! ☁️",
  "Open Source Sovereignty! ✊"
];

const MUDDAS = [
  { id: 'throughput', label: '#High-Throughput', color: '#ff7f11' },
  { id: 'forensics', label: '#Forensics-Trading', color: '#1f4e9c' },
  { id: 'agents', label: '#Autonomous-AI-Agents', color: '#138808' },
  { id: 'zerodowntime', label: '#Zero-Downtime-K8s', color: '#c0392b' },
  { id: 'resilient', label: '#Clean-Architecture', color: '#8a4b2a' }
];

export const JantarMantarGame: React.FC<JantarMantarGameProps> = ({
  onOpenPhoneCall,
  onOpenPortfolio,
  inforttsFeedsCount = 40,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Menu State
  const [inMenu, setInMenu] = useState<boolean>(true);
  const [playerName, setPlayerName] = useState<string>('Sahil');
  const [selectedRole, setSelectedRole] = useState<'P' | 'C'>('P'); // P = Andolankari, C = Police/Guardian
  const [selectedMuddas, setSelectedMuddas] = useState<string[]>(['throughput', 'agents']);
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);

  // Score & Game State
  const [kafilaCount, setKafilaCount] = useState<number>(1);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const local = localStorage.getItem('artits_jantar_highscore');
      return local ? parseInt(local, 10) : 42;
    } catch {
      return 42;
    }
  });
  const [statusMsg, setStatusMsg] = useState<string>('Connected to Infortts Edge Gateway • All Systems Active');
  const [activeSlogan, setActiveSlogan] = useState<string | null>(null);

  // Refs for 60fps Loop
  const characterRef = useRef({
    x: 400,
    y: 500,
    vx: 0,
    vy: 0,
    speed: 3.8,
    isDashing: false,
    dashTimer: 0,
    heading: 0,
  });

  const mousePosRef = useRef({ x: 400, y: 500, isDown: false, isRightDown: false });
  const keysRef = useRef<{ [key: string]: boolean }>({});

  const citizensRef = useRef<Citizen[]>([]);
  const kafilaRef = useRef<KafilaMember[]>([]);
  const sloganWavesRef = useRef<SloganWave[]>([]);

  // Landmarks & Black Hole Project Hazards
  const landmarksRef = useRef({
    // Jantar Mantar Observatory at the top
    jantarMantar: { x: 400, y: 150, width: 140, height: 110 },
    // Phone Booth inside Jantar Mantar
    phoneBooth: { x: 400, y: 140, radius: 28 },
    // 4 Project Black Holes with Event Horizons
    blackHoles: [
      { id: 'mitochondria', name: 'Zenith & Mitochondria', x: 180, y: 320, radius: 55, pull: 0.8, color: '#ff7f11' },
      { id: 'meeseeks', name: 'Meeseeks Agent Swarm', x: 620, y: 320, radius: 50, pull: 0.75, color: '#1f4e9c' },
      { id: 'roost', name: 'Roost Multi-Tenant SaaS', x: 200, y: 640, radius: 48, pull: 0.7, color: '#138808' },
      { id: 'bighit', name: 'BigHit Cloud Infrastructure', x: 600, y: 640, radius: 52, pull: 0.85, color: '#c0392b' },
    ],
  });

  // Sound Engine
  const playSloganSound = useCallback(() => {
    if (isSoundMuted) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch {}
  }, [isSoundMuted]);

  // Sync highscore
  const syncScore = useCallback((newCount: number) => {
    setHighScore((prev) => {
      if (newCount > prev) {
        try {
          localStorage.setItem('artits_jantar_highscore', newCount.toString());
        } catch {}
        fetch('/api/highscore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: playerName || 'Andolankari',
            score: newCount * 100,
            multiplier: newCount,
            missionId: 'jantar_mantar_chalo',
            game: 'jantar_mantar',
          }),
        }).catch(() => {});
        return newCount;
      }
      return prev;
    });
  }, [playerName]);

  // Shout Naara / Slogan
  const triggerNaara = useCallback(() => {
    const char = characterRef.current;
    const slogan = TECH_SLOGANS[Math.floor(Math.random() * TECH_SLOGANS.length)];
    setActiveSlogan(slogan);
    playSloganSound();

    sloganWavesRef.current.push({
      x: char.x,
      y: char.y,
      radius: 10,
      maxRadius: 180,
      text: slogan,
      alpha: 1.0,
    });

    // Slogan converts nearby neutral citizens into Kafila!
    citizensRef.current.forEach((c) => {
      if (!c.isRecruited) {
        const d = Math.hypot(c.x - char.x, c.y - char.y);
        if (d < 160) {
          c.isRecruited = true;
          kafilaRef.current.push({
            x: c.x,
            y: c.y,
            targetX: char.x,
            targetY: char.y,
            color: selectedRole === 'P' ? '#ff9933' : '#1f4e9c',
            sloganTimer: Math.random() * 60,
          });
          const nextCount = kafilaRef.current.length + 1;
          setKafilaCount(nextCount);
          syncScore(nextCount);
        }
      }
    });

    setTimeout(() => setActiveSlogan(null), 2500);
  }, [playSloganSound, selectedRole, syncScore]);

  // Initialize Map Citizens & Followers
  const resetGame = useCallback(() => {
    characterRef.current.x = 400;
    characterRef.current.y = 520;
    characterRef.current.vx = 0;
    characterRef.current.vy = 0;

    // Spawn 70 neutral citizens wandering Delhi
    const newCitizens: Citizen[] = [];
    for (let i = 0; i < 70; i++) {
      newCitizens.push({
        x: 80 + Math.random() * 640,
        y: 200 + Math.random() * 550,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        isRecruited: false,
      });
    }
    citizensRef.current = newCitizens;
    kafilaRef.current = [];
    sloganWavesRef.current = [];
    setKafilaCount(1);
    setInMenu(false);
  }, []);

  // Keyboard Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ' || e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        triggerNaara();
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
  }, [triggerNaara, onOpenPortfolio]);

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

      // 2. BLACK HOLE GRAVITATIONAL PULL
      landmarksRef.current.blackHoles.forEach((bh) => {
        const dx = bh.x - char.x;
        const dy = bh.y - char.y;
        const dist = Math.hypot(dx, dy);

        // Gravitational pull towards project deadline
        if (dist < bh.radius * 2.8 && dist > bh.radius * 0.6) {
          const force = (bh.pull * 60) / Math.max(30, dist);
          char.vx += (dx / dist) * force * dt;
          char.vy += (dy / dist) * force * dt;
        }

        // Caught in project horizon: respawn
        if (dist <= bh.radius * 0.5) {
          char.x = width / 2;
          char.y = height - 120;
          char.vx = 0;
          char.vy = 0;
          setStatusMsg(`⚠️ Trapped in ${bh.name} sprint! Escaped to Connaught Place.`);
        }
      });

      // 3. PHONE BOOTH AT JANTAR MANTAR CHECK
      const phone = landmarksRef.current.phoneBooth;
      const distToPhone = Math.hypot(phone.x - char.x, phone.y - char.y);
      if (distToPhone <= phone.radius + 15) {
        onOpenPhoneCall();
        char.y += 40; // Push back slightly
      }

      // 4. KAFILA FLOCKING BEHIND PLAYER
      const kafila = kafilaRef.current;
      kafila.forEach((k, idx) => {
        const target = idx === 0 ? char : kafila[idx - 1];
        const dx = target.x - k.x;
        const dy = target.y - k.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 22) {
          k.x += (dx / dist) * currentSpeed * 0.85;
          k.y += (dy / dist) * currentSpeed * 0.85;
        }
      });

      // 5. DRAW CANVAS (Delhi Green & Parchment Roads)
      // Ground: Delhi Lawn Green
      ctx.fillStyle = '#8fae63';
      ctx.fillRect(0, 0, width, height);

      // Paved Roads & Pathways (Connaught Place to Jantar Mantar)
      ctx.fillStyle = '#d8c7a8';
      // Main central promenade (Janpath / Parliament St towards Jantar Mantar)
      ctx.fillRect(width / 2 - 80, 80, 160, height);
      // Connaught Place outer circle ring
      ctx.strokeStyle = '#e2d3b6';
      ctx.lineWidth = 40;
      ctx.beginPath();
      ctx.arc(width / 2, height - 180, 180, 0, Math.PI * 2);
      ctx.stroke();

      // Road markings
      ctx.strokeStyle = '#f6eedd';
      ctx.lineWidth = 3;
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(width / 2, 80);
      ctx.lineTo(width / 2, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // 6. RENDER 4 PROJECT BLACK HOLES
      landmarksRef.current.blackHoles.forEach((bh) => {
        // Accretion Disk swirl
        const grad = ctx.createRadialGradient(bh.x, bh.y, bh.radius * 0.3, bh.x, bh.y, bh.radius * 1.5);
        grad.addColorStop(0, '#1d1a16');
        grad.addColorStop(0.5, bh.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, bh.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Swirling photon ring
        ctx.save();
        ctx.translate(bh.x, bh.y);
        ctx.rotate(now * 0.002);
        ctx.strokeStyle = bh.color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, 0, bh.radius * 0.9, bh.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Singularity Void
        ctx.fillStyle = '#1d1a16';
        ctx.beginPath();
        ctx.arc(bh.x, bh.y, bh.radius * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.fillStyle = '#1d1a16';
        ctx.font = 'bold 12px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(bh.name, bh.x, bh.y + bh.radius + 18);
        ctx.font = '10px "Segoe UI", sans-serif';
        ctx.fillStyle = '#5b4a3a';
        ctx.fillText('Project Event Horizon 🌀', bh.x, bh.y + bh.radius + 30);
      });

      // 7. RENDER JANTAR MANTAR OBSERVATORY (Samrat Yantra)
      const jm = landmarksRef.current.jantarMantar;
      // Terracotta monument base
      ctx.fillStyle = '#c0392b';
      ctx.beginPath();
      ctx.moveTo(jm.x, jm.y - 50); // Peak
      ctx.lineTo(jm.x + 80, jm.y + 40);
      ctx.lineTo(jm.x - 80, jm.y + 40);
      ctx.closePath();
      ctx.fill();

      // Shadow side
      ctx.fillStyle = '#962d22';
      ctx.beginPath();
      ctx.moveTo(jm.x, jm.y - 50);
      ctx.lineTo(jm.x, jm.y + 40);
      ctx.lineTo(jm.x - 80, jm.y + 40);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#1d1a16';
      ctx.font = 'bold 14px "Segoe UI", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🏛️ JANTAR MANTAR', jm.x, jm.y - 60);

      // 8. RENDER PHONE BOOTH AT JANTAR MANTAR
      const pb = landmarksRef.current.phoneBooth;
      // Glowing green halo
      const ringSize = pb.radius + (Math.sin(now * 0.006) + 1) * 6;
      ctx.strokeStyle = 'rgba(19, 136, 8, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pb.x, pb.y, ringSize, 0, Math.PI * 2);
      ctx.stroke();

      // Booth circular pad
      ctx.fillStyle = '#f6eedd';
      ctx.strokeStyle = '#138808';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(pb.x, pb.y, pb.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.font = '20px serif';
      ctx.textBaseline = 'middle';
      ctx.fillText('📞', pb.x, pb.y);
      ctx.font = 'bold 11px "Segoe UI", sans-serif';
      ctx.fillStyle = '#138808';
      ctx.fillText('CALL SAHIL', pb.x, pb.y + pb.radius + 14);

      // 9. RENDER NEUTRAL CITIZENS (To be recruited)
      citizensRef.current.forEach((c) => {
        if (!c.isRecruited) {
          c.x += c.vx;
          c.y += c.vy;
          if (c.x < 50 || c.x > width - 50) c.vx *= -1;
          if (c.y < 120 || c.y > height - 50) c.vy *= -1;

          // Citizen avatar (white kurti / neutral dot)
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#5b4a3a';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(c.x, c.y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      });

      // 10. RENDER KAFILA FOLLOWERS
      kafila.forEach((k) => {
        ctx.fillStyle = k.color;
        ctx.strokeStyle = '#1d1a16';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(k.x, k.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Little flag / placards
        ctx.strokeStyle = '#1d1a16';
        ctx.beginPath();
        ctx.moveTo(k.x + 3, k.y - 4);
        ctx.lineTo(k.x + 10, k.y - 12);
        ctx.stroke();
        ctx.fillStyle = '#ff9933';
        ctx.fillRect(k.x + 10, k.y - 16, 8, 6);
      });

      // 11. RENDER PLAYER AVATAR
      ctx.fillStyle = selectedRole === 'P' ? '#ff7f11' : '#1f4e9c';
      ctx.strokeStyle = '#1d1a16';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(char.x, char.y, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Heading arrow / baton
      ctx.strokeStyle = '#1d1a16';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(char.x, char.y);
      ctx.lineTo(char.x + Math.cos(char.heading) * 18, char.y + Math.sin(char.heading) * 18);
      ctx.stroke();

      // Player Name label
      ctx.fillStyle = '#1d1a16';
      ctx.font = 'bold 12px "Segoe UI", sans-serif';
      ctx.fillText(`${selectedRole === 'P' ? '✊' : '👮'} ${playerName || 'Sahil'}`, char.x, char.y - 20);

      // 12. RENDER SLOGAN WAVES
      for (let i = sloganWavesRef.current.length - 1; i >= 0; i--) {
        const sw = sloganWavesRef.current[i];
        sw.radius += dt * 260;
        sw.alpha -= dt * 0.65;

        if (sw.alpha <= 0) {
          sloganWavesRef.current.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `rgba(255, 153, 51, ${sw.alpha})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(29, 26, 22, ${sw.alpha})`;
        ctx.font = 'bold 14px "Segoe UI", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(sw.text, sw.x, sw.y - sw.radius - 8);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [selectedRole, playerName, onOpenPhoneCall]);

  return (
    <div className="jantar-mantar-container">
      {/* Full-Viewport Delhi Canvas */}
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
            <span className="metric-label">KAFILA CROWD</span>
            <span className="metric-val">👥 {kafilaCount}</span>
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

      {/* Mobile Touch Action Buttons (Inspired by #mob in mantarjantar.com) */}
      {!inMenu && (
        <div id="mob" className="on">
          <button type="button" className="mb" onClick={triggerNaara}>
            NAARA
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

      {/* Iconic Jantar Mantar Menu Card Overlay (#menu in mantarjantar.com) */}
      {inMenu && (
        <div id="menu">
          {/* Top Infortts Shared Backend Header Banner */}
          <div id="getapp" className="on" role="region" aria-label="Infortts Fleet Gateway">
            <img src="/sahil.png" alt="Sahil Rathee" width="44" height="44" />
            <div className="t">
              <b>Sahil Rathee • Senior Software Engineer & AI Architect</b>
              <small>Infortts Core • {inforttsFeedsCount}+ Feeds Online • New Delhi, India</small>
            </div>
            <a href="/Sahil-Rathee-Resume.pdf" target="_blank" rel="noopener noreferrer">
              ⬇ Download Resume PDF
            </a>
          </div>

          <div className="card">
            <h1>
              JANTAR MANTAR <span>CHALO</span>
            </h1>
            <div className="hi">जंतर मंतर चलो! ✊🚧👮 · Tech Edition</div>
            <p className="tag">
              Build a tech kafila, dodge the project black holes, reach <b>Jantar Mantar</b> and hold the tech dharna. 
              Step into the phone booth to call Sahil!
            </p>

            {/* Player Name Input */}
            <input
              id="name"
              maxLength={24}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Your name (e.g. Bunty from Burari / Tech Architect)"
            />

            {/* Role Selection Grid */}
            <div className="roles">
              {/* Andolankari */}
              <div
                className={`role ${selectedRole === 'P' ? 'sel' : ''}`}
                onClick={() => setSelectedRole('P')}
              >
                <div className="ic">✊</div>
                <b>Tech Andolankari</b>
                <p>Walk into developers to build your tech kafila. Reach Jantar Mantar and push back legacy code.</p>
                <div className="keys">
                  <span>🖱️ Point to walk · <kbd>Space</kbd> to shout NAARA<br />Hold <kbd>Shift</kbd> to run/dash with your kafila</span>
                </div>
              </div>

              {/* Dilli Police / System Guardian */}
              <div
                className={`role ${selectedRole === 'C' ? 'sel' : ''}`}
                data-r="C"
                onClick={() => setSelectedRole('C')}
              >
                <div className="ic">👮</div>
                <b>System Guardian / Bureaucrat</b>
                <p>Deploy enterprise governance, defend against bugs, and ensure 99.999% uptime.</p>
                <div className="keys">
                  <span>🖱️ Point to patrol · <kbd>Space</kbd> for governance blast<br />Hold <kbd>Shift</kbd> to sprint across Delhi</span>
                </div>
              </div>
            </div>

            {/* Mudda Selection Chips */}
            <div className="muddas">
              <span className="mlab">Choose your Tech Muddas (Issues):</span>
              {MUDDAS.map((m) => {
                const isSel = selectedMuddas.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    className={`mchip ${isSel ? 'sel' : ''}`}
                    style={{ '--mc': m.color } as React.CSSProperties}
                    onClick={() => {
                      setSelectedMuddas((prev) =>
                        isSel ? prev.filter((id) => id !== m.id) : [...prev, m.id]
                      );
                    }}
                  >
                    {m.label}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="btns">
              <button type="button" className="btn" id="play" onClick={resetGame}>
                PLAY ONLINE ▶
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
                🏛️ Explore Systems
              </button>
            </div>

            <div id="status">
              <b>{statusMsg}</b>
            </div>

            <div className="help">
              <kbd>Space</kbd> naara blast · <kbd>Shift</kbd> dash · <kbd>M</kbd> mute · <kbd>P</kbd> portfolio · <kbd>Esc</kbd> menu
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
