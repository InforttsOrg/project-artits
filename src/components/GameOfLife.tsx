import React, { useState, useEffect, useCallback } from 'react';

const ROWS = 30;
const COLS = 60;

const GameOfLife: React.FC = () => {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
      rows.push(Array.from(Array(COLS), () => Math.random() > 0.7 ? 1 : 0));
    }
    return rows;
  });

  const running = true;

  const runSimulation = useCallback(() => {
    setGrid((currentGrid) => {
      const nextGrid = currentGrid.map((row, i) => {
        return row.map((cell, j) => {
          let neighbors = 0;
          const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1],
          ];

          directions.forEach(([x, y]) => {
            const newI = i + x;
            const newJ = j + y;
            if (newI >= 0 && newI < ROWS && newJ >= 0 && newJ < COLS) {
              neighbors += currentGrid[newI][newJ];
            }
          });

          if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
          if (cell === 0 && neighbors === 3) return 1;
          return cell;
        });
      });
      return nextGrid;
    });
  }, []);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(runSimulation, 100);
    return () => clearInterval(interval);
  }, [running, runSimulation]);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${COLS}, 4px)`,
      gap: '1px',
      backgroundColor: '#222',
      padding: '10px',
      borderRadius: '4px',
      width: 'fit-content',
      margin: '0 auto',
      boxShadow: '0 0 20px rgba(0,0,0,0.5)'
    }}>
      {grid.map((row, i) =>
        row.map((cell, j) => (
          <div
            key={`${i}-${j}`}
            style={{
              width: '4px',
              height: '4px',
              backgroundColor: cell ? 'var(--active, #00ff00)' : 'transparent',
              transition: 'background-color 0.2s'
            }}
          />
        ))
      )}
    </div>
  );
};

export default GameOfLife;
