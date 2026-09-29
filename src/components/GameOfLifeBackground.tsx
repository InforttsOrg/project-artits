import React, { useEffect, useRef } from 'react';

export const GameOfLifeBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const cellSize = 14;
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);

    // Create and seed grid with balanced density
    let grid = createGrid(rows, cols, 0.14);
    let nextGrid = createEmptyGrid(rows, cols);
    let ageGrid = new Uint8Array(rows * cols); // Tracks cell age for radiant bloom gradient

    function createEmptyGrid(r: number, c: number): Uint8Array {
      return new Uint8Array(r * c);
    }

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
      grid = createGrid(rows, cols, 0.14);
      nextGrid = createEmptyGrid(rows, cols);
      ageGrid = new Uint8Array(rows * cols);
    };

    window.addEventListener('resize', handleResize);

    // Interactive pointer spawning with radius
    const spawnAt = (clientX: number, clientY: number) => {
      const col = Math.floor(clientX / cellSize);
      const row = Math.floor(clientY / cellSize);
      const radius = 2;

      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const r = (row + dr + rows) % rows;
          const c = (col + dc + cols) % cols;
          if (Math.random() > 0.3) {
            const idx = r * cols + c;
            grid[idx] = 1;
            ageGrid[idx] = 1;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      spawnAt(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        spawnAt(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    let lastTick = performance.now();
    const tickInterval = 110; // Cellular evolution step

    const render = (time: number) => {
      if (time - lastTick >= tickInterval) {
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

      // 1. Subtle acoustic matrix guide points
      ctx.fillStyle = 'rgba(0, 210, 255, 0.05)';
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          ctx.fillRect(c * cellSize + 6, r * cellSize + 6, 1.5, 1.5);
        }
      }

      // 2. Glowing Infortts Sonar Cyan / Emerald bioluminescent cells
      const innerSize = cellSize - 3;
      for (let r = 0; r < rows; r++) {
        const rRow = r * cols;
        const y = r * cellSize + 1.5;
        for (let c = 0; c < cols; c++) {
          const idx = rRow + c;
          if (grid[idx] === 1) {
            const x = c * cellSize + 1.5;
            const age = ageGrid[idx];

            // Color gradient based on cluster age / energy
            if (age > 4) {
              // Vibrant Electric Sonar Cyan
              ctx.fillStyle = 'rgba(0, 225, 255, 0.45)';
              ctx.shadowColor = '#00D2FF';
              ctx.shadowBlur = 6;
            } else if (age > 2) {
              // Acoustic Emerald Glow
              ctx.fillStyle = 'rgba(0, 255, 170, 0.4)';
              ctx.shadowColor = '#00FF9D';
              ctx.shadowBlur = 4;
            } else {
              // Freshly spawned Sonar Blue
              ctx.fillStyle = 'rgba(0, 180, 255, 0.35)';
              ctx.shadowColor = '#0066FF';
              ctx.shadowBlur = 2;
            }

            ctx.fillRect(x, y, innerSize, innerSize);
          }
        }
      }

      // Reset shadow for performance
      ctx.shadowBlur = 0;

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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.95
      }}
    />
  );
};
