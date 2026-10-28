import React, { useState, useEffect, useRef, useCallback } from 'react';

interface QuantumSpacetimeMapProps {
  onOpenPhoneCall: () => void;
}

interface BlackHole {
  id: string;
  name: string;
  subtitle: string;
  xRatio: number; // 0.0 to 1.0
  yRatio: number; // 0.0 to 1.0
  mass: number;
  eventHorizon: number; // px radius
  accretionRadius: number; // px radius
  color: string;
}

export const QuantumSpacetimeMap: React.FC<QuantumSpacetimeMapProps> = ({ onOpenPhoneCall }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Survival Time & Highscore
  const [survivalTime, setSurvivalTime] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const local = localStorage.getItem('artits_spacetime_highscore');
      return local ? parseInt(local, 10) : 420;
    } catch {
      return 420;
    }
  });
  const [multiplier, setMultiplier] = useState<number>(1);
  const [phoneDistance, setPhoneDistance] = useState<number>(100);
  const [aiTacticalStatus, setAiTacticalStatus] = useState<string>('AI Observer Active: Monitoring spacetime curvature');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [capturedEvent, setCapturedEvent] = useState<string | null>(null);

  // Black Holes: Projects with Gravitational Event Horizons
  const blackHolesRef = useRef<BlackHole[]>([
    {
      id: 'mitochondria',
      name: 'ZENITH & MITOCHONDRIA',
      subtitle: 'High-Frequency Forensics Event Horizon',
      xRatio: 0.22,
      yRatio: 0.32,
      mass: 1400,
      eventHorizon: 34,
      accretionRadius: 85,
      color: '#00D2FF',
    },
    {
      id: 'meeseeks',
      name: 'MEESEEKS SWARM',
      subtitle: 'Autonomous Agentic Singularity',
      xRatio: 0.78,
      yRatio: 0.30,
      mass: 1250,
      eventHorizon: 32,
      accretionRadius: 80,
      color: '#A855F7',
    },
    {
      id: 'roost',
      name: 'ROOST SAAS',
      subtitle: 'Multi-Tenant Escrow Gravity Well',
      xRatio: 0.25,
      yRatio: 0.75,
      mass: 1100,
      eventHorizon: 30,
      accretionRadius: 75,
      color: '#10B981',
    },
    {
      id: 'bighit',
      name: 'BIGHIT CLOUD',
      subtitle: 'Kubernetes Cluster Accretion Disk',
      xRatio: 0.75,
      yRatio: 0.72,
      mass: 1300,
      eventHorizon: 32,
      accretionRadius: 82,
      color: '#F97316',
    },
  ]);

  // Phone Terminal Landmark
  const phoneLandmarkRef = useRef({
    xRatio: 0.50,
    yRatio: 0.90,
    radius: 40,
    ringing: true,
  });

  // Character Avatar State
  const characterRef = useRef({
    x: 0.5,
    y: 0.5,
    vx: 0,
    vy: 0,
    targetX: 0.5,
    targetY: 0.5,
    hasTarget: false,
    speed: 0.0035,
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
  });

  // 3D Quantum Game of Life Grid: 48 cols x 32 rows
  // 0 = vacuum, 1 = Team Red (User), 2 = Team Blue (AI)
  const lifeGridRef = useRef({
    cols: 48,
    rows: 32,
    grid: new Uint8Array(48 * 32),
    nextGrid: new Uint8Array(48 * 32),
    heights: new Float32Array(48 * 32), // 3D quantum height displacement
    lastStepTime: 0,
  });

  // User input keys
  const keysRef = useRef<{ [key: string]: boolean }>({});

  // Sync highscore
  const syncScore = useCallback((finalScore: number, peakMult: number) => {
    setHighScore((prev) => {
      if (finalScore > prev) {
        try {
          localStorage.setItem('artits_spacetime_highscore', finalScore.toString());
        } catch {}
        fetch('/api/highscore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Spacetime Navigator',
            score: finalScore,
            multiplier: peakMult,
            missionId: 'quantum_escape_velocity',
            game: 'quantum_map',
          }),
        }).catch(() => {});
        fetch('/api/infortts?action=submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Spacetime Navigator',
            score: finalScore,
            multiplier: peakMult,
            missionId: 'quantum_escape_velocity',
            game: 'quantum_map',
          }),
        }).catch(() => {});
        return finalScore;
      }
      return prev;
    });
  }, []);

  // Initialize Quantum Grid with seed quantum oscillations
  useEffect(() => {
    const { cols, rows, grid } = lifeGridRef.current;
    // Spawn initial quantum fluctuations (Team Red & Team Blue)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rand = Math.random();
        if (rand < 0.08) {
          grid[r * cols + c] = 1; // Team Red
        } else if (rand < 0.16) {
          grid[r * cols + c] = 2; // Team Blue
        }
      }
    }
  }, []);

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      keysRef.current[e.key.toLowerCase()] = true;
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse / Canvas Click to Move
  const handleCanvasInteraction = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const xRatio = (clientX - rect.left) / rect.width;
    const yRatio = (clientY - rect.top) / rect.height;

    characterRef.current.targetX = Math.max(0.05, Math.min(0.95, xRatio));
    characterRef.current.targetY = Math.max(0.05, Math.min(0.95, yRatio));
    characterRef.current.hasTarget = true;

    // Spawn Team Red quantum ripple under click
    const { cols, rows, grid } = lifeGridRef.current;
    const gridC = Math.floor(xRatio * cols);
    const gridR = Math.floor(yRatio * rows);
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const tr = (gridR + dr + rows) % rows;
        const tc = (gridC + dc + cols) % cols;
        grid[tr * cols + tc] = 1; // Team Red
      }
    }
  };

  // Main 60fps Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastTime = performance.now();
    let survivalTimerAccum = 0;
    let currentScore = 0;
    let currentMult = 1;

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;

      const w = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const h = (canvas.height = Math.min(650, Math.max(480, window.innerHeight * 0.65)));

      const char = characterRef.current;
      const keys = keysRef.current;
      const { cols, rows, grid, nextGrid, heights } = lifeGridRef.current;

      if (!isPaused) {
        // Survival Timer & Score accumulation
        survivalTimerAccum += dt;
        if (survivalTimerAccum >= 1.0) {
          survivalTimerAccum -= 1.0;
          setSurvivalTime((t) => {
            const nextT = t + 1;
            currentScore += 10 * currentMult;
            setScore(currentScore);
            syncScore(currentScore, currentMult);
            return nextT;
          });
        }

        // 1. CHARACTER INPUT & MOVEMENT
        let moveX = 0;
        let moveY = 0;

        if (keys['w'] || keys['arrowup']) moveY -= 1;
        if (keys['s'] || keys['arrowdown']) moveY += 1;
        if (keys['a'] || keys['arrowleft']) moveX -= 1;
        if (keys['d'] || keys['arrowright']) moveX += 1;

        if (moveX !== 0 || moveY !== 0) {
          char.hasTarget = false;
          const len = Math.hypot(moveX, moveY);
          char.vx += (moveX / len) * char.speed * dt * 60;
          char.vy += (moveY / len) * char.speed * dt * 60;

          // Spawn Team Red quantum pulse while user moves
          const cR = Math.floor(char.x * cols);
          const rR = Math.floor(char.y * rows);
          if (cR >= 0 && cR < cols && rR >= 0 && rR < rows) {
            grid[rR * cols + cR] = 1;
          }
        } else if (char.hasTarget) {
          const dx = char.targetX - char.x;
          const dy = char.targetY - char.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 0.015) {
            char.vx += (dx / dist) * char.speed * dt * 60;
            char.vy += (dy / dist) * char.speed * dt * 60;
          } else {
            char.hasTarget = false;
          }
        }

        // Apply friction
        char.vx *= 0.92;
        char.vy *= 0.92;

        // 2. BLACK HOLES GRAVITATIONAL ATTRACTION
        let closestHoleDist = 9999;
        const charPixelX = char.x * w;
        const charPixelY = char.y * h;

        blackHolesRef.current.forEach((bh) => {
          const bhPixelX = bh.xRatio * w;
          const bhPixelY = bh.yRatio * h;
          const dx = bhPixelX - charPixelX;
          const dy = bhPixelY - charPixelY;
          const dist = Math.hypot(dx, dy);

          if (dist < closestHoleDist) closestHoleDist = dist;

          // Inverse-square gravitational pull
          if (dist > bh.eventHorizon && dist < bh.accretionRadius * 2.2) {
            const pullForce = (bh.mass / Math.max(1200, dist * dist)) * dt;
            char.vx += (dx / dist) * (pullForce / w);
            char.vy += (dy / dist) * (pullForce / h);
          }

          // Caught in Event Horizon Singularity!
          if (dist <= bh.eventHorizon) {
            setCapturedEvent(`🚨 Sucked into ${bh.name}! Emergency quantum warp engaged...`);
            // Warp back to safe zone center
            char.x = 0.5;
            char.y = 0.5;
            char.vx = 0;
            char.vy = 0;
            char.hasTarget = false;
            currentMult = 1;
            setMultiplier(1);
            setTimeout(() => setCapturedEvent(null), 3000);
          }
        });

        // Near-miss flyby multiplier logic: closer to black hole = higher streak multiplier
        if (closestHoleDist < 100) {
          currentMult = 4;
        } else if (closestHoleDist < 160) {
          currentMult = 3;
        } else if (closestHoleDist < 240) {
          currentMult = 2;
        } else {
          currentMult = 1;
        }
        setMultiplier(currentMult);

        // Update position
        char.x = Math.max(0.02, Math.min(0.98, char.x + char.vx));
        char.y = Math.max(0.02, Math.min(0.98, char.y + char.vy));

        // Particle Thruster Sparks
        if (Math.hypot(char.vx, char.vy) > 0.0005) {
          char.particles.push({
            x: char.x * w,
            y: char.y * h,
            vx: -char.vx * w * 12 + (Math.random() - 0.5) * 1.5,
            vy: -char.vy * h * 12 + (Math.random() - 0.5) * 1.5,
            life: 1.0,
            color: '#00D2FF',
          });
        }

        // 3. PHONE BOOTH DISTANCE & INTERACTION
        const phone = phoneLandmarkRef.current;
        const phonePixelX = phone.xRatio * w;
        const phonePixelY = phone.yRatio * h;
        const distToPhone = Math.hypot(phonePixelX - charPixelX, phonePixelY - charPixelY);
        setPhoneDistance(Math.round(distToPhone));

        if (distToPhone <= phone.radius) {
          // Reached the phone booth! Open the schedule call modal
          onOpenPhoneCall();
          // Bounce character slightly back so it doesn't trigger in an infinite loop
          char.y -= 0.08;
          char.vy = -0.005;
        }

        // 4. REAL AI AGENT STRATEGY (Team Blue)
        // AI monitors player position and deploys counter-oscillators to balance entropy
        if (Math.random() < 0.04) {
          // Target near user's quadrant
          const targetC = Math.floor((1.0 - char.x) * cols);
          const targetR = Math.floor((1.0 - char.y) * rows);
          // Spawn Blue Glider or defense cluster
          grid[targetR * cols + targetC] = 2;
          grid[((targetR + 1) % rows) * cols + ((targetC + 1) % cols)] = 2;
          grid[((targetR + 1) % rows) * cols + ((targetC + 2) % cols)] = 2;
          setAiTacticalStatus(`AI Observer: Deploying Quantum Glider to balance spacetime quadrant (${targetC}, ${targetR})`);
        }

        // 5. 3D QUANTUM GAME OF LIFE EVOLUTION STEP (Every 110ms)
        if (now - lifeGridRef.current.lastStepTime >= 110) {
          lifeGridRef.current.lastStepTime = now;

          for (let r = 0; r < rows; r++) {
            const rAbove = (r - 1 + rows) % rows;
            const rBelow = (r + 1) % rows;
            const rRow = r * cols;
            const rAboveRow = rAbove * cols;
            const rBelowRow = rBelow * cols;

            for (let c = 0; c < cols; c++) {
              const cLeft = (c - 1 + cols) % cols;
              const cRight = (c + 1) % cols;

              const neighbors = [
                grid[rAboveRow + cLeft],
                grid[rAboveRow + c],
                grid[rAboveRow + cRight],
                grid[rRow + cLeft],
                grid[rRow + cRight],
                grid[rBelowRow + cLeft],
                grid[rBelowRow + c],
                grid[rBelowRow + cRight],
              ];

              let redCount = 0;
              let blueCount = 0;
              for (let i = 0; i < 8; i++) {
                if (neighbors[i] === 1) redCount++;
                else if (neighbors[i] === 2) blueCount++;
              }

              const total = redCount + blueCount;
              const currentVal = grid[rRow + c];
              let nextVal = 0;

              if (currentVal !== 0) {
                if (total === 2 || total === 3) nextVal = currentVal;
                else nextVal = 0;
              } else {
                if (total === 3) {
                  // Majority color inheritance
                  nextVal = redCount >= blueCount ? 1 : 2;
                }
              }
              nextGrid[rRow + c] = nextVal;
            }
          }

          // Swap grid
          lifeGridRef.current.grid.set(nextGrid);
        }
      }

      // 6. RENDER 3D QUANTUM SPACETIME FABRIC
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, w, h);

      // Perspective Space-Time Mesh with 3D Height Undulation
      ctx.lineWidth = 1;
      const cellW = w / cols;
      const cellH = h / rows;

      for (let r = 0; r < rows; r += 2) {
        ctx.beginPath();
        for (let c = 0; c < cols; c += 2) {
          const idx = r * cols + c;
          const cellVal = grid[idx];
          // Quantum wave oscillation
          const waveZ = Math.sin(now * 0.003 + c * 0.4 + r * 0.3) * 5;
          const liveZ = cellVal === 1 ? -14 : cellVal === 2 ? 14 : 0;
          heights[idx] = waveZ + liveZ;

          const px = c * cellW;
          const py = r * cellH + heights[idx];

          if (c === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(88, 196, 221, 0.05)';
        ctx.stroke();
      }

      // Draw Quantum Energy Particles (Team Red & Team Blue)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const val = grid[r * cols + c];
          if (val === 0) continue;

          const px = c * cellW;
          const py = r * cellH + heights[r * cols + c];

          if (val === 1) {
            // Team Red (User): Crimson Quantum Wave
            ctx.fillStyle = 'rgba(239, 68, 68, 0.65)';
            ctx.shadowColor = '#EF4444';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (val === 2) {
            // Team Blue (AI): Deep Cyan/Blue Wave
            ctx.fillStyle = 'rgba(59, 130, 246, 0.65)';
            ctx.shadowColor = '#3B82F6';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
      ctx.shadowBlur = 0;

      // 7. RENDER 4 PROJECT BLACK HOLES
      blackHolesRef.current.forEach((bh) => {
        const bx = bh.xRatio * w;
        const by = bh.yRatio * h;

        // Accretion disk spinning halo
        const haloGrad = ctx.createRadialGradient(bx, by, bh.eventHorizon * 0.8, bx, by, bh.accretionRadius);
        haloGrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
        haloGrad.addColorStop(0.3, bh.color + '55');
        haloGrad.addColorStop(0.7, bh.color + '22');
        haloGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(bx, by, bh.accretionRadius, 0, Math.PI * 2);
        ctx.fill();

        // Swirling photon ring
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(now * 0.0015);
        ctx.strokeStyle = bh.color;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = bh.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.ellipse(0, 0, bh.accretionRadius * 0.65, bh.accretionRadius * 0.35, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Event Horizon Singularity (Pure Void)
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(bx, by, bh.eventHorizon, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(bh.name, bx, by + bh.accretionRadius + 14);
        ctx.fillStyle = '#94A3B8';
        ctx.font = '8px "JetBrains Mono", monospace';
        ctx.fillText('⚡ Gravitational Horizon', bx, by + bh.accretionRadius + 24);
      });

      // 8. RENDER PHONE BOOTH LANDMARK ("RUN TO THE PHONE")
      const phone = phoneLandmarkRef.current;
      const phX = phone.xRatio * w;
      const phY = phone.yRatio * h;

      // Pulsing communication rings
      const pulseRadius = phone.radius + (Math.sin(now * 0.006) + 1) * 8;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(phX, phY, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Phone Booth Platform
      ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(phX, phY, phone.radius * 0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Icon & Text
      ctx.font = '18px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('📞', phX, phY);

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 10px "JetBrains Mono", monospace';
      ctx.fillText('SCHEDULE A CALL', phX, phY - phone.radius * 0.8);
      ctx.fillStyle = '#CBD5E1';
      ctx.font = '8px "JetBrains Mono", monospace';
      ctx.fillText(`Run here! (${phoneDistance}px away)`, phX, phY + phone.radius * 0.9);

      // 9. RENDER THRUSTER PARTICLES
      for (let i = char.particles.length - 1; i >= 0; i--) {
        const p = char.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= dt * 2.5;
        if (p.life <= 0) {
          char.particles.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(0, 210, 255, ${p.life * 0.8})`;
        ctx.fillRect(p.x, p.y, 2, 2);
      }

      // 10. RENDER PLAYER AVATAR (CYBER EXPLORER)
      const cx = char.x * w;
      const cy = char.y * h;

      // Energy Shield Aura
      ctx.fillStyle = 'rgba(0, 210, 255, 0.15)';
      ctx.strokeStyle = '#00D2FF';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#00D2FF';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Inner Core Avatar
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fill();

      // Directional Heading Indicator
      const headingAngle = Math.atan2(char.vy, char.vx) || -Math.PI / 2;
      ctx.strokeStyle = '#F59E0B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(headingAngle) * 20, cy + Math.sin(headingAngle) * 20);
      ctx.stroke();

      // Player Label
      ctx.fillStyle = '#00D2FF';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('YOU (TEAM RED)', cx, cy - 20);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, onOpenPhoneCall, syncScore, phoneDistance]);

  return (
    <div className="quantum-map-container" aria-label="3D Quantum Spacetime Explorable World Map">
      {/* Top Map HUD */}
      <div className="quantum-hud">
        <div className="quantum-hud-meta">
          <div className="hud-tag-row">
            <span className="badge-spacetime">3D Quantum Spacetime</span>
            <span className="badge-teams">
              <span className="team-red-pill">● You: Team Red</span>
              <span className="team-blue-pill">● AI Observer: Team Blue</span>
            </span>
            <span className="badge-mult">⚡ {multiplier}x Escape Velocity</span>
          </div>
          <h3 className="quantum-hud-title">SPACETIME MAP & EVENT HORIZON SURVIVAL</h3>
          <p className="quantum-hud-subtitle">
            Navigate your character using <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> or click/touch. Dodge project black holes trying to suck you in. 
            Run to the Phone Booth at the bottom to schedule a call with Sahil!
          </p>
        </div>

        {/* Escape Velocity Highscore Counters */}
        <div className="quantum-scores">
          <div className="score-box highlight">
            <span className="score-label">BEST ESCAPE TIME</span>
            <span className="score-val">🏆 {highScore}s</span>
          </div>
          <div className="score-box">
            <span className="score-label">SURVIVAL TIME</span>
            <span className="score-val">{survivalTime}s</span>
          </div>
          <div className="score-box">
            <span className="score-label">SCORE</span>
            <span className="score-val">{score} PTS</span>
          </div>
          <div className="score-box">
            <span className="score-label">PHONE DISTANCE</span>
            <span className="score-val">{phoneDistance}px</span>
          </div>
        </div>
      </div>

      {/* Main World Canvas */}
      <div className="quantum-canvas-wrapper">
        <canvas
          ref={canvasRef}
          onClick={(e) => handleCanvasInteraction(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              handleCanvasInteraction(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          className="quantum-canvas"
          role="img"
          aria-label="Interactive world map. Use arrow keys or click to guide your explorer avatar to the phone booth."
        />

        {/* Singularity Warp Warning */}
        {capturedEvent && (
          <div className="singularity-alert" role="alert">
            <span className="singularity-icon">🌀</span>
            <span>{capturedEvent}</span>
          </div>
        )}

        {/* Map Quick Shortcut: Run to Phone Directly */}
        <button
          type="button"
          onClick={() => {
            characterRef.current.targetX = phoneLandmarkRef.current.xRatio;
            characterRef.current.targetY = phoneLandmarkRef.current.yRatio;
            characterRef.current.hasTarget = true;
          }}
          className="run-to-phone-btn"
          aria-label="Direct character autopilot to phone booth"
        >
          🏃 Auto-Run to Phone Booth 📞
        </button>
      </div>

      {/* Bottom Live AI Observer Status Ticker */}
      <div className="quantum-footer-ticker" role="status" aria-live="polite">
        <span className="ai-pulse-dot" />
        <span className="ticker-text">{aiTacticalStatus}</span>
        <div className="hud-keyboard-legend">
          <span>Move: <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> / Touch</span>
          <span>Pause: <kbd>Space</kbd></span>
        </div>
      </div>
    </div>
  );
};
