import React, { useRef, useEffect, useState, useCallback } from 'react';

interface CelestialBody {
  id: string;
  name: string;
  x: number;
  y: number;
  mass: number;
  radius: number;
  color: string;
  glowColor: string;
  vx?: number;
  vy?: number;
  orbitCenter?: { x: number; y: number };
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
}

interface TargetZone {
  x: number;
  y: number;
  radius: number;
  name: string;
  minSpeed: number;
  maxSpeed: number;
}

interface Mission {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  initialLaunch: { x: number; y: number; vx: number; vy: number };
  bodies: CelestialBody[];
  target: TargetZone;
}

const G = 1200; // Gravitational constant scale for smooth canvas dynamics

const MISSIONS: Mission[] = [
  {
    id: 'lunar_freereturn',
    title: 'Mission 1: Lunar Slingshot & Capture',
    subtitle: 'Apollo-style Free Return Trajectory',
    description: 'Launch probe from Earth, slingshot around the Moon using gravity assist, and enter the Lunar Orbit Docking Zone.',
    initialLaunch: { x: 120, y: 320, vx: 2.8, vy: -2.1 },
    bodies: [
      {
        id: 'earth',
        name: 'Earth (Origin)',
        x: 120,
        y: 320,
        mass: 380,
        radius: 26,
        color: '#58C4DD', // 3B1B Blue
        glowColor: 'rgba(88, 196, 221, 0.4)'
      },
      {
        id: 'moon',
        name: 'Moon (Slingshot Body)',
        x: 480,
        y: 200,
        mass: 120,
        radius: 16,
        color: '#E2E8F0',
        glowColor: 'rgba(226, 232, 240, 0.35)',
        orbitCenter: { x: 420, y: 250 },
        orbitRadius: 75,
        orbitSpeed: 0.006,
        orbitAngle: 0
      }
    ],
    target: {
      x: 680,
      y: 160,
      radius: 36,
      name: 'Lunar Gateway Station',
      minSpeed: 0.5,
      maxSpeed: 4.8
    }
  },
  {
    id: 'lagrange_point',
    title: 'Mission 2: Lagrange L1 Equilibrium',
    subtitle: 'Three-Body Gravitational Saddle',
    description: 'Navigate through the gravitational equilibrium point between two massive celestial bodies without colliding.',
    initialLaunch: { x: 100, y: 270, vx: 3.2, vy: -0.4 },
    bodies: [
      {
        id: 'primary',
        name: 'Primary Planet',
        x: 140,
        y: 270,
        mass: 340,
        radius: 25,
        color: '#58C4DD',
        glowColor: 'rgba(88, 196, 221, 0.4)'
      },
      {
        id: 'secondary',
        name: 'Secondary Body',
        x: 620,
        y: 270,
        mass: 290,
        radius: 22,
        color: '#9A72AC', // 3B1B Purple
        glowColor: 'rgba(154, 114, 172, 0.4)'
      }
    ],
    target: {
      x: 380,
      y: 270,
      radius: 32,
      name: 'L1 Equilibrium Sensor',
      minSpeed: 0.2,
      maxSpeed: 3.2
    }
  },
  {
    id: 'voyager_interstellar',
    title: 'Mission 3: Voyager Deep Space Slingshot',
    subtitle: 'High-Velocity Planetary Oberth Maneuver',
    description: 'Use the massive gravitational pull of a gas giant to fling the probe out to deep space target beacon.',
    initialLaunch: { x: 100, y: 400, vx: 3.6, vy: -3.8 },
    bodies: [
      {
        id: 'inner_planet',
        name: 'Terrestrial Core',
        x: 100,
        y: 400,
        mass: 250,
        radius: 20,
        color: '#58C4DD',
        glowColor: 'rgba(88, 196, 221, 0.3)'
      },
      {
        id: 'gas_giant',
        name: 'Gas Giant (Jupiter analogue)',
        x: 420,
        y: 240,
        mass: 650,
        radius: 38,
        color: '#FC6255', // 3B1B Red/Pink
        glowColor: 'rgba(252, 98, 85, 0.45)'
      }
    ],
    target: {
      x: 720,
      y: 100,
      radius: 42,
      name: 'Interstellar Relay Beacon',
      minSpeed: 2.0,
      maxSpeed: 8.5
    }
  }
];

export const ThreeB1BOrbitalGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [activeMissionIdx, setActiveMissionIdx] = useState(0);
  const currentMission = MISSIONS[activeMissionIdx];

  const [gameState, setGameState] = useState<'idle' | 'aiming' | 'flying' | 'success' | 'crashed'>('idle');
  const [fuel, setFuel] = useState(100);
  const [telemetry, setTelemetry] = useState({ speed: 0, force: 0, distance: 0 });
  const [announcement, setAnnouncement] = useState('Aim probe and launch using gravity assist.');

  // Aiming vector controls
  const [aimVector, setAimVector] = useState({ vx: currentMission.initialLaunch.vx, vy: currentMission.initialLaunch.vy });
  const [isDraggingAim, setIsDraggingAim] = useState(false);
  const [showMathVectors, setShowMathVectors] = useState(true);

  // Spacecraft state in animation ref to avoid re-renders at 60fps
  const craftRef = useRef({
    x: currentMission.initialLaunch.x,
    y: currentMission.initialLaunch.y,
    vx: currentMission.initialLaunch.vx,
    vy: currentMission.initialLaunch.vy,
    trail: [] as { x: number; y: number; alpha: number }[],
    angle: 0
  });

  const bodiesRef = useRef<CelestialBody[]>(JSON.parse(JSON.stringify(currentMission.bodies)));

  // Sync bodies and reset on mission change
  const resetMission = useCallback((missionIdx: number = activeMissionIdx) => {
    const mission = MISSIONS[missionIdx];
    bodiesRef.current = JSON.parse(JSON.stringify(mission.bodies));
    craftRef.current = {
      x: mission.initialLaunch.x,
      y: mission.initialLaunch.y,
      vx: mission.initialLaunch.vx,
      vy: mission.initialLaunch.vy,
      trail: [],
      angle: Math.atan2(mission.initialLaunch.vy, mission.initialLaunch.vx)
    };
    setAimVector({ vx: mission.initialLaunch.vx, vy: mission.initialLaunch.vy });
    setGameState('idle');
    setFuel(100);
    setTelemetry({ speed: 0, force: 0, distance: 0 });
    setAnnouncement(`Mission ready: ${mission.title}. Pull back or adjust aim vector and launch.`);
  }, [activeMissionIdx]);

  useEffect(() => {
    resetMission(activeMissionIdx);
  }, [activeMissionIdx, resetMission]);

  // Launch probe
  const launchProbe = () => {
    if (gameState === 'flying') return;
    craftRef.current.x = currentMission.initialLaunch.x;
    craftRef.current.y = currentMission.initialLaunch.y;
    craftRef.current.vx = aimVector.vx;
    craftRef.current.vy = aimVector.vy;
    craftRef.current.trail = [];
    craftRef.current.angle = Math.atan2(aimVector.vy, aimVector.vx);
    setGameState('flying');
    setAnnouncement('Probe launched! Observing Newtonian orbital trajectory.');
  };

  // Thruster impulse
  const fireThruster = (multiplier: number = 1) => {
    if (gameState !== 'flying' || fuel <= 0) return;
    const craft = craftRef.current;
    const speed = Math.hypot(craft.vx, craft.vy) || 1;
    const forwardX = craft.vx / speed;
    const forwardY = craft.vy / speed;

    craft.vx += forwardX * 0.7 * multiplier;
    craft.vy += forwardY * 0.7 * multiplier;
    setFuel(prev => Math.max(0, prev - 8));
  };

  // Trajectory Prediction algorithm (Verlet forward integration in 3B1B style)
  const computePredictionPath = (startX: number, startY: number, startVx: number, startVy: number, steps: number = 140) => {
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
        const dx = b.x - px;
        const dy = b.y - py;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < b.radius) {
          // Terminate prediction if colliding
          return path;
        }

        const force = (G * b.mass) / (distSq + 220);
        ax += force * (dx / dist);
        ay += force * (dy / dist);
      }

      pvx += ax * dt;
      pvy += ay * dt;
      px += pvx * dt;
      py += pvy * dt;

      if (i % 2 === 0) {
        path.push({ x: px, y: py });
      }
    }
    return path;
  };

  // Canvas 60 FPS Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = 460);

      ctx.clearRect(0, 0, width, height);

      // --- 1. 3Blue1Brown Chalkboard Background & Coordinate Grid ---
      ctx.fillStyle = '#080D1A'; // Deep mathematical dark canvas
      ctx.fillRect(0, 0, width, height);

      // Coordinate Grid Lines (3B1B Manim aesthetic)
      const gridSize = 40;
      ctx.lineWidth = 1;

      // Minor grid
      ctx.strokeStyle = 'rgba(88, 196, 221, 0.05)';
      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Major Coordinate Axes
      const originX = width / 2;
      const originY = height / 2;
      ctx.strokeStyle = 'rgba(88, 196, 221, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, originY);
      ctx.lineTo(width, originY);
      ctx.moveTo(originX, 0);
      ctx.lineTo(originX, height);
      ctx.stroke();

      // Origin text
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.5)';
      ctx.fillText('(0, 0)', originX + 5, originY - 5);
      ctx.fillText('+x →', width - 35, originY - 5);
      ctx.fillText('↑ +y', originX + 5, 18);

      // --- 2. Update Dynamic Celestial Bodies (Orbiting bodies) ---
      bodiesRef.current.forEach(b => {
        if (b.orbitCenter && b.orbitRadius && b.orbitSpeed !== undefined && b.orbitAngle !== undefined) {
          b.orbitAngle += b.orbitSpeed;
          b.x = b.orbitCenter.x + Math.cos(b.orbitAngle) * b.orbitRadius;
          b.y = b.orbitCenter.y + Math.sin(b.orbitAngle) * b.orbitRadius;
        }

        // Draw Gravitational Equipotential Contours (3B1B potential well lines)
        for (let ring = 1; ring <= 3; ring++) {
          const r = b.radius + ring * 32;
          ctx.beginPath();
          ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(88, 196, 221, ${0.12 / ring})`;
          ctx.lineWidth = 1;
          ctx.setLineDash([4, 6]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Planet Ambient Glow
        const gradient = ctx.createRadialGradient(b.x, b.y, b.radius * 0.4, b.x, b.y, b.radius * 2);
        gradient.addColorStop(0, b.glowColor);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius * 2, 0, Math.PI * 2);
        ctx.fill();

        // Planet Body
        ctx.fillStyle = b.color;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Label
        ctx.fillStyle = '#CBD5E1';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText(b.name, b.x, b.y + b.radius + 15);
      });

      // --- 3. Target Zone Rendering ---
      const target = currentMission.target;
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius, 0, Math.PI * 2);
      ctx.strokeStyle = '#83C167'; // 3B1B Green
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      const targetPulse = Math.sin(Date.now() / 300) * 4;
      ctx.beginPath();
      ctx.arc(target.x, target.y, target.radius + targetPulse, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(131, 193, 103, 0.35)';
      ctx.stroke();

      ctx.fillStyle = '#83C167';
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`⌖ ${target.name}`, target.x, target.y - target.radius - 8);
      ctx.fillText(`[${target.minSpeed} - ${target.maxSpeed} km/s]`, target.x, target.y + target.radius + 16);

      // --- 4. Trajectory Prediction Line (Manim styled) ---
      const pred = computePredictionPath(
        gameState === 'flying' ? craftRef.current.x : currentMission.initialLaunch.x,
        gameState === 'flying' ? craftRef.current.y : currentMission.initialLaunch.y,
        gameState === 'flying' ? craftRef.current.vx : aimVector.vx,
        gameState === 'flying' ? craftRef.current.vy : aimVector.vy,
        130
      );

      if (pred.length > 1) {
        ctx.beginPath();
        ctx.moveTo(pred[0].x, pred[0].y);
        for (let i = 1; i < pred.length; i++) {
          ctx.lineTo(pred[i].x, pred[i].y);
        }
        ctx.strokeStyle = gameState === 'flying' ? 'rgba(88, 196, 221, 0.45)' : 'rgba(244, 208, 63, 0.65)'; // 3B1B Gold preview
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // --- 5. Spacecraft Dynamics & Physics Update ---
      const craft = craftRef.current;

      if (gameState === 'flying') {
        let totalAx = 0;
        let totalAy = 0;
        let collided = false;

        for (const b of bodiesRef.current) {
          const dx = b.x - craft.x;
          const dy = b.y - craft.y;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);

          if (dist < b.radius + 4) {
            collided = true;
            setGameState('crashed');
            setAnnouncement(`Impact warning! Spacecraft collided with ${b.name}. Press Reset.`);
            break;
          }

          const force = (G * b.mass) / (distSq + 220);
          totalAx += force * (dx / dist);
          totalAy += force * (dy / dist);
        }

        if (!collided) {
          const dt = 0.55;
          craft.vx += totalAx * dt;
          craft.vy += totalAy * dt;
          craft.x += craft.vx * dt;
          craft.y += craft.vy * dt;
          craft.angle = Math.atan2(craft.vy, craft.vx);

          // Add to vapor trail
          craft.trail.push({ x: craft.x, y: craft.y, alpha: 1.0 });
          if (craft.trail.length > 90) craft.trail.shift();

          const currentSpeed = Math.hypot(craft.vx, craft.vy);
          const currentForce = Math.hypot(totalAx, totalAy);
          const distToTarget = Math.hypot(target.x - craft.x, target.y - craft.y);

          setTelemetry({
            speed: parseFloat(currentSpeed.toFixed(2)),
            force: parseFloat(currentForce.toFixed(2)),
            distance: Math.round(distToTarget)
          });

          // Check Target Success
          if (distToTarget < target.radius) {
            if (currentSpeed >= target.minSpeed && currentSpeed <= target.maxSpeed) {
              setGameState('success');
              setAnnouncement(`Mission Success! Orbit established with ${target.name} at ${currentSpeed.toFixed(1)} km/s!`);
            } else if (currentSpeed > target.maxSpeed) {
              setGameState('crashed');
              setAnnouncement(`Flyby too fast (${currentSpeed.toFixed(1)} km/s). Escaped capture trajectory.`);
            }
          }

          // Out of bounds check
          if (craft.x < -100 || craft.x > width + 100 || craft.y < -100 || craft.y > height + 100) {
            setGameState('crashed');
            setAnnouncement('Probe drifted into deep space void. Press Reset to try another trajectory.');
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
        ctx.strokeStyle = `rgba(244, 208, 63, ${ratio * 0.7})`;
        ctx.lineWidth = ratio * 3;
        ctx.stroke();
      }

      // Draw Spacecraft Probe
      const shipX = gameState === 'flying' ? craft.x : currentMission.initialLaunch.x;
      const shipY = gameState === 'flying' ? craft.y : currentMission.initialLaunch.y;
      const shipAngle = gameState === 'flying' ? craft.angle : Math.atan2(aimVector.vy, aimVector.vx);

      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(shipAngle);

      // Probe Geometry (Aerodynamic triangle probe)
      ctx.fillStyle = '#F4D03F'; // 3B1B Yellow
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-7, -6);
      ctx.lineTo(-4, 0);
      ctx.lineTo(-7, 6);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1;
      ctx.stroke();

      // Thruster flame if flying
      if (gameState === 'flying') {
        ctx.fillStyle = '#FC6255';
        ctx.beginPath();
        ctx.moveTo(-5, -3);
        ctx.lineTo(-12 - Math.random() * 5, 0);
        ctx.lineTo(-5, 3);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();

      // --- 6. 3Blue1Brown Mathematical Vector Overlays ---
      if (showMathVectors && gameState === 'flying') {
        const arrowScale = 14;

        // Velocity Vector (Cyan)
        ctx.beginPath();
        ctx.moveTo(shipX, shipY);
        ctx.lineTo(shipX + craft.vx * arrowScale, shipY + craft.vy * arrowScale);
        ctx.strokeStyle = '#58C4DD';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#58C4DD';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText('v⃗', shipX + craft.vx * arrowScale + 8, shipY + craft.vy * arrowScale);

        // Net Gravitational Force Vector (Pink)
        let fNetX = 0;
        let fNetY = 0;
        for (const b of bodiesRef.current) {
          const dx = b.x - shipX;
          const dy = b.y - shipY;
          const distSq = dx * dx + dy * dy;
          const dist = Math.sqrt(distSq);
          const f = (G * b.mass) / (distSq + 220);
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
        ctx.fillText('F⃗_g', shipX + fNetX * 22 + 8, shipY + fNetY * 22);
      }

      // --- 7. Aim Slingshot Drag Vector ---
      if (gameState === 'idle' || isDraggingAim) {
        ctx.beginPath();
        ctx.moveTo(shipX, shipY);
        ctx.lineTo(shipX + aimVector.vx * 28, shipY + aimVector.vy * 28);
        ctx.strokeStyle = '#F4D03F';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Arrowhead
        const arrowHeadAngle = Math.atan2(aimVector.vy, aimVector.vx);
        ctx.save();
        ctx.translate(shipX + aimVector.vx * 28, shipY + aimVector.vy * 28);
        ctx.rotate(arrowHeadAngle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-8, -4);
        ctx.lineTo(-8, 4);
        ctx.closePath();
        ctx.fillStyle = '#F4D03F';
        ctx.fill();
        ctx.restore();

        ctx.fillStyle = '#F4D03F';
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillText(`v₀ = ${Math.hypot(aimVector.vx, aimVector.vy).toFixed(1)} km/s`, shipX + aimVector.vx * 28 + 10, shipY + aimVector.vy * 28);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [gameState, aimVector, isDraggingAim, currentMission, showMathVectors]);

  // Pointer Aiming Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState === 'flying') return;
    setIsDraggingAim(true);
    updateAimFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingAim) return;
    updateAimFromPointer(e);
  };

  const handlePointerUp = () => {
    if (isDraggingAim) {
      setIsDraggingAim(false);
    }
  };

  const updateAimFromPointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const startX = currentMission.initialLaunch.x;
    const startY = currentMission.initialLaunch.y;

    const dx = clickX - startX;
    const dy = clickY - startY;

    // Scale to appropriate launch velocity
    const speed = Math.min(6.5, Math.max(1.2, Math.hypot(dx, dy) / 25));
    const angle = Math.atan2(dy, dx);

    setAimVector({
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed
    });
  };

  // Keyboard navigation and shortcuts
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
      {/* Game Header */}
      <div className="game-header-bar">
        <div className="game-title-group">
          <div className="game-badge">
            <span className="b1b-symbol">3B1B</span>
            <span>Mathematical Physics Simulation</span>
          </div>
          <h3 className="game-headline">GRAVITY ASSIST: NEWTONIAN ORBITAL SLINGSHOT</h3>
          <p className="game-subtext">{currentMission.description}</p>
        </div>

        {/* Mission Tabs */}
        <div className="mission-selector-row" role="tablist" aria-label="Orbital Missions">
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
      </div>

      {/* Real-time Mathematical Telemetry HUD */}
      <div className="game-hud-bar" role="region" aria-label="Orbital Telemetry">
        <div className="hud-metric">
          <span className="hud-label">VELOCITY (v⃗)</span>
          <span className="hud-value b1b-cyan">{telemetry.speed || Math.hypot(aimVector.vx, aimVector.vy).toFixed(1)} km/s</span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">GRAVITY (F⃗_g)</span>
          <span className="hud-value b1b-pink">{telemetry.force || '0.00'} m/s²</span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">TARGET DIST</span>
          <span className="hud-value b1b-green">{telemetry.distance || '---'} km</span>
        </div>
        <div className="hud-metric">
          <span className="hud-label">FUEL RESERVES</span>
          <div className="fuel-bar-track">
            <div className="fuel-bar-fill" style={{ width: `${fuel}%` }}></div>
          </div>
        </div>
        <div className="hud-metric status-metric">
          <span className="hud-label">FLIGHT STATUS</span>
          <span className={`status-pill ${gameState}`}>
            {gameState.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Interactive Chalkboard Simulation Canvas */}
      <div className="game-canvas-wrapper">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="img"
          aria-label={`Interactive 3Blue1Brown orbital simulation canvas for ${currentMission.title}. Drag on canvas to set launch trajectory.`}
          className="threeb1b-canvas"
        />

        {/* Overlaid Notification / Mission Result Banner */}
        {gameState === 'success' && (
          <div className="mission-alert success-alert" role="alert">
            <div className="alert-icon">✨</div>
            <div className="alert-content">
              <h4>ORBITAL CAPTURE CONFIRMED!</h4>
              <p>Trajectory successfully utilized gravitational slingshot to dock with {currentMission.target.name}.</p>
            </div>
            <button type="button" onClick={() => resetMission()} className="alert-btn">
              Replay Mission
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

        {/* Canvas Quick Hint Badge */}
        <div className="canvas-instruction-tag">
          {gameState === 'idle' ? 'DRAG VECTOR TO AIM // SPACE TO LAUNCH' : 'PRESS SPACE FOR THRUSTER BURN // R TO RESET'}
        </div>
      </div>

      {/* Game Control Action Strip */}
      <div className="game-controls-bar">
        <div className="primary-actions">
          {gameState === 'idle' ? (
            <button
              type="button"
              className="game-btn launch-btn"
              onClick={launchProbe}
              aria-label="Launch Spacecraft on calculated trajectory"
            >
              <span>🚀 Launch Trajectory</span>
              <span className="key-hint">SPACE</span>
            </button>
          ) : (
            <button
              type="button"
              className="game-btn thruster-btn"
              onClick={() => fireThruster(1)}
              disabled={gameState !== 'flying' || fuel <= 0}
              aria-label="Fire spacecraft forward thruster impulse"
            >
              <span>🔥 Burn Thrusters</span>
              <span className="key-hint">SPACE</span>
            </button>
          )}

          <button
            type="button"
            className="game-btn reset-btn"
            onClick={() => resetMission()}
            aria-label="Reset simulation to initial launch coordinates"
          >
            <span>↺ Reset</span>
            <span className="key-hint">R</span>
          </button>
        </div>

        {/* Vector Toggle & Educational Note */}
        <div className="secondary-actions">
          <label className="toggle-label">
            <input
              type="checkbox"
              checked={showMathVectors}
              onChange={(e) => setShowMathVectors(e.target.checked)}
            />
            <span>3B1B Vectors (v⃗, F⃗_g)</span>
          </label>
        </div>
      </div>

      {/* Screen Reader Live Status */}
      <div className="sr-only" role="status" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
};
