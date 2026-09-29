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

    const cellSize = 14; // Size of each cell in pixels
    let cols = Math.floor(width / cellSize);
    let rows = Math.floor(height / cellSize);

    // Create and seed grid
    let grid = createGrid(rows, cols, 0.12);
    let nextGrid = createEmptyGrid(rows, cols);

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

    // Handle window resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.floor(width / cellSize);
      rows = Math.floor(height / cellSize);
      grid = createGrid(rows, cols, 0.12);
      nextGrid = createEmptyGrid(rows, cols);
    };

    window.addEventListener('resize', handleResize);

    // Mouse / Touch interaction: Spawn living cells on movement
    const spawnAt = (clientX: number, clientY: number) => {
      const col = Math.floor(clientX / cellSize);
      const row = Math.floor(clientY / cellSize);
      const radius = 2;

      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const r = (row + dr + rows) % rows;
          const c = (col + dc + cols) % cols;
          if (Math.random() > 0.4) {
            grid[r * cols + c] = 1;
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
    const tickInterval = 120; // Cellular simulation step every 120ms (smooth evolution)

    const render = (time: number) => {
      // Step simulation if interval passed
      if (time - lastTick >= tickInterval) {
        lastTick = time;

        // Conway's Game of Life logic with toroidal wrapping
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
            } else if (state === 0 && neighbors === 3) {
              nextGrid[idx] = 1;
            } else {
              nextGrid[idx] = 0;
            }
          }
        }

        // Swap grids
        const temp = grid;
        grid = nextGrid;
        nextGrid = temp;
      }

      // Draw canvas
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient grid dots
      ctx.fillStyle = 'rgba(56, 189, 248, 0.03)';
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          ctx.fillRect(c * cellSize + 6, r * cellSize + 6, 2, 2);
        }
      }

      // Live cells with subtle glowing emerald/cyan phosphor color
      ctx.fillStyle = 'rgba(16, 185, 129, 0.22)';
      const liveCellInner = cellSize - 3;

      for (let r = 0; r < rows; r++) {
        const rRow = r * cols;
        const y = r * cellSize + 1.5;
        for (let c = 0; c < cols; c++) {
          if (grid[rRow + c] === 1) {
            const x = c * cellSize + 1.5;
            ctx.fillRect(x, y, liveCellInner, liveCellInner);
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
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85
      }}
    />
  );
};
