import React, { useRef, useEffect, useState } from 'react';

export const InteractiveCanvasGraphic: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  // Toggle video playback
  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Kinetic particle & aura overlay on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Ambient floating particles
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.3 - Math.random() * 0.5,
      size: 1 + Math.random() * 2,
      hue: Math.random() > 0.5 ? 185 : 260,
      alpha: 0.2 + Math.random() * 0.6,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      t += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw glowing ambient cursor follower
      const grad = ctx.createRadialGradient(mouseX, mouseY, 10, mouseX, mouseY, 90);
      grad.addColorStop(0, 'rgba(0, 210, 255, 0.12)');
      grad.addColorStop(0.5, 'rgba(168, 85, 247, 0.05)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 90, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw rising cyber particles
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t + p.y * 0.05) * 0.3;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha * (0.8 + Math.sin(t * 3 + p.x) * 0.2)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Cyber telemetry coordinate badge
      ctx.font = '9px "Agave Nerd Font", monospace';
      ctx.fillStyle = 'rgba(0, 210, 255, 0.5)';
      ctx.fillText(`KINETIC_AURA // X:${Math.round(mouseX)} Y:${Math.round(mouseY)}`, 14, canvas.height - 14);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="shelby-canvas-hero-card">
      <div className="canvas-header-strip">
        <span className="canvas-label-tag">AUTHENTIC KINETIC GRAPHIC // SHELBY KHO INSPIRATION</span>
        <div className="canvas-badges-row">
          <button
            type="button"
            className={`canvas-circle-badge badge-cyan ${activeBadge === 'sahil' ? 'active' : ''}`}
            onClick={() => setActiveBadge(activeBadge === 'sahil' ? null : 'sahil')}
            title="Sahil Rathee"
          >
            <span>SAHIL</span>
            <small>↗</small>
          </button>
          <button
            type="button"
            className={`canvas-circle-badge badge-yellow ${activeBadge === '2002' ? 'active' : ''}`}
            onClick={() => setActiveBadge(activeBadge === '2002' ? null : '2002')}
            title="Birth Year 2002"
          >
            <span>2002</span>
            <small>★</small>
          </button>
          <button
            type="button"
            className={`canvas-circle-badge badge-violet ${activeBadge === 'architect' ? 'active' : ''}`}
            onClick={() => setActiveBadge(activeBadge === 'architect' ? null : 'architect')}
            title="AI Systems Architect"
          >
            <span>ARCHITECT</span>
            <small>⚡</small>
          </button>
          <button
            type="button"
            className={`canvas-circle-badge badge-emerald ${activeBadge === 'infortts' ? 'active' : ''}`}
            onClick={() => setActiveBadge(activeBadge === 'infortts' ? null : 'infortts')}
            title="Infortts Inc."
          >
            <span>INFORTTS</span>
            <small>🌐</small>
          </button>
        </div>
      </div>

      {/* Main Interactive Stage with Authentic 60fps Video Loop & Canvas Effects */}
      <div className="canvas-display-wrap">
        <video
          ref={videoRef}
          className="shelby-character-video"
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/character-poster.png"
        >
          <source src="/assets/character-loop.webm" type="video/webm" />
          <source src="/assets/character-loop.mp4" type="video/mp4" />
        </video>

        {/* Interactive canvas overlay for particles & telemetry */}
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="shelby-interactive-canvas overlay"
        />

        {/* Floating play / pause button */}
        <button
          type="button"
          className="canvas-pause-btn"
          onClick={handleTogglePlay}
          title={isPlaying ? 'Pause Animation' : 'Play Animation'}
          aria-label={isPlaying ? 'Pause Animation' : 'Play Animation'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>

        {/* Pop-up surprise badge text */}
        {activeBadge && (
          <div className="canvas-badge-callout">
            {activeBadge === 'sahil' && (
              <span>⚡ <b>Sahil Rathee:</b> Senior Software Engineer & Distributed Systems Architect based in New Delhi.</span>
            )}
            {activeBadge === '2002' && (
              <span>📅 <b>Born in 2002:</b> Engineering low-latency engines and autonomous AI swarms since age 19.</span>
            )}
            {activeBadge === 'architect' && (
              <span>🛠️ <b>Architecture Core:</b> Go, C++, Python, MT5 In-Memory IPC, Kubernetes & Autonomous Agentic DAGs.</span>
            )}
            {activeBadge === 'infortts' && (
              <span>🌐 <b>Infortts Inc:</b> Commercial umbrella & distributed infrastructure systems founded in 2021.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
