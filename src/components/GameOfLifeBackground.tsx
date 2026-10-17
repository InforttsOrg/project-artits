import React, { useEffect, useRef, useState } from 'react';

export const GameOfLifeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Accessibility Controls
  const [opacity, setOpacity] = useState<number>(0.14); // Default subtle opacity for 100% text readability
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1); // 0.5x, 1x, 2x
  const [showControls, setShowControls] = useState<boolean>(false);

  const stateRef = useRef({
    opacity: 0.14,
    isPaused: false,
    speed: 1,
  });

  useEffect(() => {
    stateRef.current = { opacity, isPaused, speed };
  }, [opacity, isPaused, speed]);

  useEffect(() => {
    // Check user's OS preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setIsPaused(true);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const cellSize = 16;
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);

    // Create and seed grid
    let grid = createGrid(rows, cols, 0.12);
    let nextGrid = new Uint8Array(rows * cols);
    let ageGrid = new Uint8Array(rows * cols);

    function createGrid(r: number, c: number, density: number): Uint8Array {
      const g = new Uint8Array(r * c);
      for (let i = 0; i < g.length; i++) {
        g[i] = Math.random() < density ? 1 : 0;
      }
      return g;
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.floor(width / cellSize);
      rows = Math.floor(height / cellSize);
      grid = createGrid(rows, cols, 0.12);
      nextGrid = new Uint8Array(rows * cols);
      ageGrid = new Uint8Array(rows * cols);
    };

    window.addEventListener('resize', handleResize);

    // Interactive pointer spawning
    const spawnAt = (clientX: number, clientY: number) => {
      if (stateRef.current.isPaused) return;
      const col = Math.floor(clientX / cellSize);
      const row = Math.floor(clientY / cellSize);
      const radius = 2;

      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const r = (row + dr + rows) % rows;
          const c = (col + dc + cols) % cols;
          if (Math.random() > 0.4) {
            const idx = r * cols + c;
            grid[idx] = 1;
            ageGrid[idx] = 1;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => spawnAt(e.clientX, e.clientY);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        spawnAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let lastTick = performance.now();

    const render = (time: number) => {
      const { isPaused, speed, opacity: curOpacity } = stateRef.current;
      const tickInterval = Math.max(50, 120 / speed);

      if (!isPaused && time - lastTick >= tickInterval) {
        lastTick = time;

        for (let r = 0; r < rows; r++) {
          const rAbove = (r - 1 + rows) % rows;
          const rBelow = (r + 1) % rows;
          const rRow = r * cols;
          const rAboveRow = rAbove * cols;
          const rBelowRow = rBelow * cols;

          for (let c = 0; c < cols; c++) {
            const cLeft = (c - 1 + cols) % cols;
            const cRight = (c + 1) % cols;

            const neighbors =
              grid[rAboveRow + cLeft] +
              grid[rAboveRow + c] +
              grid[rAboveRow + cRight] +
              grid[rRow + cLeft] +
              grid[rRow + cRight] +
              grid[rBelowRow + cLeft] +
              grid[rBelowRow + c] +
              grid[rBelowRow + cRight];

            const idx = rRow + c;
            const state = grid[idx];

            if (state === 1 && (neighbors === 2 || neighbors === 3)) {
              nextGrid[idx] = 1;
              ageGrid[idx] = Math.min(255, ageGrid[idx] + 1);
            } else if (state === 0 && neighbors === 3) {
              nextGrid[idx] = 1;
              ageGrid[idx] = 1;
            } else {
              nextGrid[idx] = 0;
              ageGrid[idx] = 0;
            }
          }
        }

        const temp = grid;
        grid = nextGrid;
        nextGrid = temp;
      }

      ctx.clearRect(0, 0, width, height);

      // Only draw if opacity > 0
      if (curOpacity > 0.01) {
        // Subtle coordinate points
        ctx.fillStyle = `rgba(0, 210, 255, ${curOpacity * 0.25})`;
        for (let r = 0; r < rows; r += 2) {
          for (let c = 0; c < cols; c += 2) {
            ctx.fillRect(c * cellSize + 7, r * cellSize + 7, 1.5, 1.5);
          }
        }

        // Bioluminescent Infortts Sonar Cyan & Emerald cells
        const innerSize = cellSize - 3;
        for (let r = 0; r < rows; r++) {
          const rRow = r * cols;
          const y = r * cellSize + 1.5;
          for (let c = 0; c < cols; c++) {
            const idx = rRow + c;
            if (grid[idx] === 1) {
              const x = c * cellSize + 1.5;
              const age = ageGrid[idx];

              if (age > 4) {
                ctx.fillStyle = `rgba(0, 225, 255, ${curOpacity})`;
              } else if (age > 2) {
                ctx.fillStyle = `rgba(0, 255, 170, ${curOpacity * 0.9})`;
              } else {
                ctx.fillStyle = `rgba(0, 180, 255, ${curOpacity * 0.8})`;
              }

              ctx.fillRect(x, y, innerSize, innerSize);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <>
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        role="presentation"
        className="fixed inset-0 pointer-events-none"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Floating Accessibility & Background Controller Widget */}
      <div 
        className="fixed bottom-4 left-4 z-40 flex flex-col gap-2 font-mono text-xs select-none"
        role="region" 
        aria-label="Conway Background Accessibility Controls"
      >
        {showControls ? (
          <div className="bg-slate-900/95 border border-cyan-500/30 p-3 rounded-xl shadow-2xl backdrop-blur-md flex flex-col gap-2.5 text-slate-200 w-64">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span className="font-semibold text-cyan-400 flex items-center gap-1.5">
                <span>🧬</span> Game of Life Ambient
              </span>
              <button
                type="button"
                onClick={() => setShowControls(false)}
                className="text-slate-400 hover:text-white px-1"
                aria-label="Close controls"
              >
                ✕
              </button>
            </div>

            {/* Opacity Control Slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Contrast / Opacity</span>
                <span>{Math.round(opacity * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="0.5"
                step="0.02"
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                aria-label="Background cellular opacity slider"
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Pause & Speed Toggles */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className={`flex-1 py-1 px-2 rounded border text-center transition-colors ${
                  isPaused 
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300' 
                    : 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-300'
                }`}
                aria-pressed={isPaused}
              >
                {isPaused ? '▶ Resume' : '⏸ Pause'}
              </button>

              <button
                type="button"
                onClick={() => setSpeed(speed === 1 ? 2 : speed === 2 ? 0.5 : 1)}
                className="py-1 px-2 rounded border border-slate-700 bg-slate-800 hover:border-slate-600 text-slate-300 transition-colors"
                aria-label={`Toggle simulation speed. Current: ${speed}x`}
              >
                ⚡ {speed}x
              </button>
            </div>

            {/* Quick jump to Co-Op Game section */}
            <a
              href="#conway-coop-section"
              className="text-center py-1 px-2 rounded bg-cyan-950/60 border border-cyan-500/40 hover:bg-cyan-900/60 text-cyan-300 font-semibold text-[11px] transition-colors mt-0.5"
            >
              🎮 Enter Co-Op Defense Game ↗
            </a>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowControls(true)}
            className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800/90 border border-cyan-500/30 text-cyan-400 py-1.5 px-3 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105"
            aria-label="Open Game of Life background accessibility settings"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[11px] font-semibold">🧬 Ambient Life ({Math.round(opacity * 100)}%)</span>
          </button>
        )}
      </div>
    </>
  );
};
