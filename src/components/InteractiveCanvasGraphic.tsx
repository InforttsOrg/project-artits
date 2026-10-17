import React, { useRef, useEffect, useState } from 'react';

export const InteractiveCanvasGraphic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeBadge, setActiveBadge] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseX = (e.clientX - rect.left) * scaleX;
      mouseY = (e.clientY - rect.top) * scaleY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      if (isPlaying) {
        t += 0.035;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 10;

      // Draw stylized kinetic architectural figure with organic flowing ribbons / garment contours
      ctx.save();

      // Ambient glow
      const grad = ctx.createRadialGradient(cx, cy, 30, cx, cy, 180);
      grad.addColorStop(0, 'rgba(0, 210, 255, 0.12)');
      grad.addColorStop(0.6, 'rgba(99, 102, 241, 0.05)');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      // Head / Hair contour (minimalist hand-drawn style like Shelby Kho)
      const headBob = Math.sin(t * 1.5) * 4;
      const hx = cx - 5 + (mouseX - cx) * 0.04;
      const hy = cy - 110 + headBob;

      // Head silhouette
      ctx.strokeStyle = '#00d2ff';
      ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(hx, hy + 20, 22, 28, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Hair strands flowing
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(hx - 22, hy + 10);
      ctx.quadraticCurveTo(hx - 15, hy - 25, hx + 10, hy - 22);
      ctx.quadraticCurveTo(hx + 30, hy - 10, hx + 35, hy + 28);
      ctx.quadraticCurveTo(hx + 20, hy + 18, hx + 12, hy + 2);
      ctx.quadraticCurveTo(hx - 5, hy - 5, hx - 22, hy + 10);
      ctx.fill();

      // Streaming hair ribbons
      for (let i = 0; i < 5; i++) {
        const offset = i * 6;
        const wave = Math.sin(t * 2 + i * 0.8) * 8;
        ctx.strokeStyle = i % 2 === 0 ? '#00d2ff' : '#818cf8';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(hx + 15 + offset, hy - 5 + i * 4);
        ctx.quadraticCurveTo(
          hx + 35 + offset + wave,
          hy + 15 + i * 5,
          hx + 50 + wave * 1.5,
          hy + 35 + i * 7
        );
        ctx.stroke();
      }

      // Flowing Garment / Body (Yellow / Cyber Lime tone with hand-drawn hatching)
      const sway = Math.sin(t) * 12;
      const garmentTopY = hy + 45;
      const garmentBottomY = cy + 140;

      // Base coat fill
      ctx.fillStyle = '#eab308'; // Shelby Kho signature warm yellow garment
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(hx - 16, garmentTopY);
      // Left contour with dynamic wind sway
      ctx.bezierCurveTo(
        cx - 70 + sway * 0.5,
        cy - 20,
        cx - 60 - sway * 0.8,
        cy + 70,
        cx - 55 + sway,
        garmentBottomY
      );
      // Bottom folds
      ctx.quadraticCurveTo(cx - 20, garmentBottomY - 10 + sway * 0.3, cx + 10, garmentBottomY + 5);
      ctx.quadraticCurveTo(cx + 40, garmentBottomY - 8, cx + 65 + sway * 0.4, garmentBottomY - 2);
      // Right contour
      ctx.bezierCurveTo(
        cx + 50 + sway * 0.3,
        cy + 60,
        cx + 40 - sway * 0.4,
        cy - 10,
        hx + 16,
        garmentTopY
      );
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Hand-drawn crosshatching texture inside garment (characteristic of Shelby Kho's art style)
      ctx.strokeStyle = 'rgba(2, 6, 23, 0.4)';
      ctx.lineWidth = 1.2;
      for (let y = garmentTopY + 15; y < garmentBottomY - 10; y += 7) {
        const progress = (y - garmentTopY) / (garmentBottomY - garmentTopY);
        const wLeft = (cx - 40) - progress * 25 + sway * (0.2 + progress * 0.5);
        const wRight = (cx + 25) + progress * 35;
        const lineOffset = Math.sin(t * 1.5 + y * 0.05) * 3;

        ctx.beginPath();
        ctx.moveTo(wLeft + 8, y + lineOffset);
        ctx.lineTo(wLeft + 28, y - 6 + lineOffset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(wRight - 28, y + lineOffset);
        ctx.lineTo(wRight - 10, y - 5 + lineOffset);
        ctx.stroke();
      }

      // Sleeve / draped arm fold
      ctx.strokeStyle = '#020617';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx - 25, cy - 20);
      ctx.quadraticCurveTo(cx - 45 + sway * 0.5, cy + 15, cx - 15, cy + 40);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 25, cy - 10);
      ctx.quadraticCurveTo(cx + 48 + sway * 0.3, cy + 25, cx + 18, cy + 45);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  return (
    <div className="shelby-canvas-hero-card">
      <div className="canvas-header-strip">
        <span className="canvas-label-tag">HAND-CRAFTED KINETIC GRAPHIC // 2002</span>
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
        </div>
      </div>

      {/* Interactive canvas */}
      <div className="canvas-display-wrap">
        <canvas
          ref={canvasRef}
          width={420}
          height={380}
          className="shelby-interactive-canvas"
        />

        {/* Floating play / pause button */}
        <button
          type="button"
          className="canvas-pause-btn"
          onClick={() => setIsPlaying(!isPlaying)}
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
          </div>
        )}
      </div>
    </div>
  );
};
