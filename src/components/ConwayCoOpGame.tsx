import React, { useState, useEffect, useRef, useCallback } from 'react';

// WebAudio Sound Synthesizer for Conway Co-Op
class ConwayAudioEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playBirth(isP1: boolean = true) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    // P1 (Cyan) plays higher crystalline harmonics; P2 (Amber) plays warm mid tones
    const freq = isP1 ? 523.25 + Math.random() * 200 : 392.0 + Math.random() * 150;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.08);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  playEntropySpawn() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.35);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playWaveCleared() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const chords = [523.25, 659.25, 783.99, 1046.50]; // C Major triad + octave
    chords.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.06, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.4);
    });
  }

  playGameOver() {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.6);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
  }
}

const audio = new ConwayAudioEngine();

// Grid Cell Constants
// 0 = Dead, 1 = Player 1 (Cyan), 2 = Player 2 / AI (Amber), 3 = Core Beacon (Green), 4 = Entropy Anti-Cell (Crimson)
type CellType = 0 | 1 | 2 | 3 | 4;

interface PatternDefinition {
  id: string;
  name: string;
  key: string;
  cost: number;
  matrix: number[][];
}

const PATTERNS: PatternDefinition[] = [
  {
    id: 'glider',
    name: 'Glider',
    key: '1',
    cost: 5,
    matrix: [
      [0, 1, 0],
      [0, 0, 1],
      [1, 1, 1],
    ],
  },
  {
    id: 'block',
    name: 'Defense Wall',
    key: '2',
    cost: 4,
    matrix: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    id: 'blinker',
    name: 'Oscillator Pulsar',
    key: '3',
    cost: 3,
    matrix: [
      [1, 1, 1],
    ],
  },
  {
    id: 'beacon',
    name: 'Energy Beacon',
    key: '4',
    cost: 6,
    matrix: [
      [1, 1, 0, 0],
      [1, 1, 0, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 1],
    ],
  },
];

export const ConwayCoOpGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High Scores & Game State
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const local = localStorage.getItem('artits_conway_coop_highscore');
      return local ? parseInt(local, 10) : 62800;
    } catch {
      return 62800;
    }
  });
  const [multiplier, setMultiplier] = useState<number>(1);
  const [wave, setWave] = useState<number>(1);
  const [waveProgress, setWaveProgress] = useState<number>(0); // 0 to 100%
  const [vitality, setVitality] = useState<number>(100);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activePattern, setActivePattern] = useState<PatternDefinition>(PATTERNS[0]);
  const [coOpMode, setCoOpMode] = useState<'ai_copilot' | 'hotseat'>('ai_copilot');
  const [p1Energy, setP1Energy] = useState<number>(50);
  const [p2Energy, setP2Energy] = useState<number>(50);
  const [activePlayer, setActivePlayer] = useState<1 | 2>(1); // For hotseat mode
  const [notification, setNotification] = useState<string>('Wave 1: Defend the core beacons! Click grid to deploy Gliders.');

  // Ref tracking grid state for 60fps loop without stale closures
  const gridStateRef = useRef<{
    cols: number;
    rows: number;
    grid: Uint8Array;
    nextGrid: Uint8Array;
    beacons: { r: number; c: number; health: number }[];
    entropyCellsLeft: number;
    waveTimer: number;
    survivalTimer: number;
    score: number;
    multiplier: number;
    p1Energy: number;
    p2Energy: number;
  }>({
    cols: 64,
    rows: 40,
    grid: new Uint8Array(64 * 40),
    nextGrid: new Uint8Array(64 * 40),
    beacons: [],
    entropyCellsLeft: 0,
    waveTimer: 0,
    survivalTimer: 0,
    score: 0,
    multiplier: 1,
    p1Energy: 50,
    p2Energy: 50,
  });

  // Fetch Global Edge Highscore
  useEffect(() => {
    fetch('/api/highscore?game=conway_coop')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.highScore && typeof data.highScore.score === 'number') {
          setHighScore((prev) => Math.max(prev, data.highScore.score));
        }
      })
      .catch(() => {});
  }, []);

  // Save High Score on Game Over or New Record
  const syncHighScore = useCallback((newScore: number, peakMultiplier: number, currentWave: number) => {
    setHighScore((prev) => {
      if (newScore > prev) {
        try {
          localStorage.setItem('artits_conway_coop_highscore', newScore.toString());
        } catch {}
        const payload = {
          name: 'Sahil & Co-Pilot',
          score: newScore,
          multiplier: peakMultiplier,
          missionId: `entropy_wave_${currentWave}`,
          game: 'conway_coop',
        };

        fetch('/api/highscore', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});

        fetch('/api/infortts?action=submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }).catch(() => {});

        return newScore;
      }
      return prev;
    });
  }, []);

  // Initialize Core Grid & Beacons
  const initGame = useCallback(() => {
    const state = gridStateRef.current;
    const { cols, rows } = state;
    state.grid.fill(0);
    state.nextGrid.fill(0);

    // Place 3 Core Beacons in the center
    const centerR = Math.floor(rows / 2);
    const centerC = Math.floor(cols / 2);
    state.beacons = [
      { r: centerR, c: centerC - 10, health: 100 },
      { r: centerR, c: centerC, health: 100 },
      { r: centerR, c: centerC + 10, health: 100 },
    ];

    // Seed defense structures around each beacon
    state.beacons.forEach((b) => {
      // Beacon cell
      state.grid[b.r * cols + b.c] = 3;
      // Surrounding friendly cells
      state.grid[(b.r - 1) * cols + b.c] = 1;
      state.grid[(b.r + 1) * cols + b.c] = 1;
      state.grid[b.r * cols + (b.c - 1)] = 2;
      state.grid[b.r * cols + (b.c + 1)] = 2;
    });

    // Reset scores & timers
    state.score = 0;
    state.multiplier = 1;
    state.waveTimer = 0;
    state.survivalTimer = 0;
    state.p1Energy = 50;
    state.p2Energy = 50;
    state.entropyCellsLeft = 12;

    setScore(0);
    setMultiplier(1);
    setWave(1);
    setVitality(100);
    setIsGameOver(false);
    setIsPaused(false);
    setP1Energy(50);
    setP2Energy(50);
    setNotification('Co-Op Colony initialized. Defend the 3 Core Beacons against incoming entropy waves!');
  }, []);

  // Initial setup
  useEffect(() => {
    initGame();
  }, [initGame]);

  // Handle sound toggle
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audio.enabled = next;
  };

  // Deploy Pattern to Grid
  const deployPattern = (col: number, row: number, playerType: 1 | 2) => {
    const state = gridStateRef.current;
    const energy = playerType === 1 ? state.p1Energy : state.p2Energy;

    if (energy < activePattern.cost) {
      setNotification(`Insufficient Energy for ${activePattern.name}! Required: ${activePattern.cost}`);
      return;
    }

    // Deduct Energy
    if (playerType === 1) {
      state.p1Energy -= activePattern.cost;
      setP1Energy(state.p1Energy);
    } else {
      state.p2Energy -= activePattern.cost;
      setP2Energy(state.p2Energy);
    }

    const { cols, rows } = state;
    const pat = activePattern.matrix;
    const patH = pat.length;
    const patW = pat[0].length;
    const startR = row - Math.floor(patH / 2);
    const startC = col - Math.floor(patW / 2);

    let placedCount = 0;
    for (let r = 0; r < patH; r++) {
      for (let c = 0; c < patW; c++) {
        if (pat[r][c] === 1) {
          const targetR = (startR + r + rows) % rows;
          const targetC = (startC + c + cols) % cols;
          const idx = targetR * cols + targetC;
          // Cannot overwrite core beacons
          if (state.grid[idx] !== 3) {
            state.grid[idx] = playerType;
            placedCount++;
          }
        }
      }
    }

    audio.playBirth(playerType === 1);
    state.score += placedCount * 15 * state.multiplier;
    setScore(state.score);
  };

  // Canvas Mouse Click handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isGameOver) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const state = gridStateRef.current;
    const cellW = canvas.width / state.cols;
    const cellH = canvas.height / state.rows;
    const col = Math.floor(x / cellW);
    const row = Math.floor(y / cellH);

    deployPattern(col, row, activePlayer);

    // In hotseat mode, toggle turn
    if (coOpMode === 'hotseat') {
      setActivePlayer((prev) => (prev === 1 ? 2 : 1));
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      } else if (e.key === '1') {
        setActivePattern(PATTERNS[0]);
      } else if (e.key === '2') {
        setActivePattern(PATTERNS[1]);
      } else if (e.key === '3') {
        setActivePattern(PATTERNS[2]);
      } else if (e.key === '4') {
        setActivePattern(PATTERNS[3]);
      } else if (e.key === 'r' || e.key === 'R') {
        initGame();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleSound();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [initGame, soundEnabled]);

  // Main Simulation & Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastStepTime = performance.now();
    let lastSecondTime = performance.now();

    const render = (now: number) => {
      const state = gridStateRef.current;
      const { cols, rows } = state;
      const cellW = canvas.width / cols;
      const cellH = canvas.height / rows;

      // Energy regeneration & survival tick every 1000ms
      if (now - lastSecondTime >= 1000) {
        lastSecondTime = now;
        if (!isPaused && !isGameOver) {
          // Regenerate energy
          state.p1Energy = Math.min(100, state.p1Energy + 4);
          state.p2Energy = Math.min(100, state.p2Energy + 4);
          setP1Energy(state.p1Energy);
          setP2Energy(state.p2Energy);

          // Survival timer & multipliers
          state.survivalTimer++;
          if (state.survivalTimer % 12 === 0 && state.multiplier < 5) {
            state.multiplier++;
            setMultiplier(state.multiplier);
            setNotification(`Colony Synergy Extended! Multiplier Streak increased to ${state.multiplier}x!`);
          }

          // Periodic score bonus
          state.score += 20 * state.multiplier;
          setScore(state.score);

          // AI Co-Pilot Automation Logic
          if (coOpMode === 'ai_copilot' && state.p2Energy >= 5) {
            // Find beacon with lowest surrounding density or approaching entropy
            const targetBeacon = state.beacons[Math.floor(Math.random() * state.beacons.length)];
            if (targetBeacon) {
              const offsetC = (Math.random() > 0.5 ? 4 : -4);
              const offsetR = Math.floor((Math.random() - 0.5) * 6);
              const targetC = (targetBeacon.c + offsetC + cols) % cols;
              const targetR = (targetBeacon.r + offsetR + rows) % rows;

              // Place an amber glider or stabilizer
              state.grid[targetR * cols + targetC] = 2;
              state.grid[((targetR + 1) % rows) * cols + ((targetC + 1) % cols)] = 2;
              state.grid[((targetR + 1) % rows) * cols + ((targetC + 2) % cols)] = 2;
              state.p2Energy -= 4;
              setP2Energy(state.p2Energy);
            }
          }
        }
      }

      // Step Cellular Automaton simulation every 110ms
      const stepInterval = 110;
      if (!isPaused && !isGameOver && now - lastStepTime >= stepInterval) {
        lastStepTime = now;
        state.waveTimer += 0.11;

        // Spawn Entropy Anti-Cells at grid edges
        if (Math.random() < 0.18 + wave * 0.04) {
          const edgeCol = Math.random() < 0.5 ? 1 : cols - 2;
          const edgeRow = Math.floor(Math.random() * rows);
          state.grid[edgeRow * cols + edgeCol] = 4; // Crimson Entropy
          audio.playEntropySpawn();
        }

        // Conway Immigrant Life + Entropy Annihilation Rules
        let liveFriendlyCount = 0;
        let entropyCount = 0;

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
              state.grid[rAboveRow + cLeft],
              state.grid[rAboveRow + c],
              state.grid[rAboveRow + cRight],
              state.grid[rRow + cLeft],
              state.grid[rRow + cRight],
              state.grid[rBelowRow + cLeft],
              state.grid[rBelowRow + c],
              state.grid[rBelowRow + cRight],
            ];

            let p1Neighbors = 0;
            let p2Neighbors = 0;
            let entropyNeighbors = 0;

            for (let i = 0; i < 8; i++) {
              const n = neighbors[i];
              if (n === 1) p1Neighbors++;
              else if (n === 2) p2Neighbors++;
              else if (n === 4) entropyNeighbors++;
            }

            const friendlyNeighbors = p1Neighbors + p2Neighbors;
            const totalNeighbors = friendlyNeighbors + entropyNeighbors;
            const currentCell = state.grid[rRow + c];

            let nextCell: CellType = 0;

            // Core Beacons persist unless invaded by entropy
            if (currentCell === 3) {
              if (entropyNeighbors > 2) {
                nextCell = 4; // Beacon corrupted!
              } else {
                nextCell = 3;
                liveFriendlyCount += 2;
              }
            } else if (currentCell === 4) {
              // Entropy Anti-Cell evolution: expands into friendly cells, but suffocates if surrounded
              if (friendlyNeighbors >= 3) {
                // Annihilation! Friendly cells sacrifice to neutralize entropy
                nextCell = 0;
                state.score += 80 * state.multiplier;
              } else if (totalNeighbors === 2 || totalNeighbors === 3) {
                nextCell = 4;
                entropyCount++;
              } else {
                nextCell = 0;
              }
            } else if (currentCell === 1 || currentCell === 2) {
              // Friendly living cell
              if (entropyNeighbors > 0) {
                // Entropy infection / destruction
                nextCell = 0;
              } else if (friendlyNeighbors === 2 || friendlyNeighbors === 3) {
                nextCell = currentCell;
                liveFriendlyCount++;
              } else {
                nextCell = 0;
              }
            } else {
              // Dead cell: Birth rule
              if (entropyNeighbors === 3) {
                nextCell = 4; // Entropy expands
                entropyCount++;
              } else if (friendlyNeighbors === 3) {
                // Majority faction inheritance
                nextCell = p1Neighbors >= p2Neighbors ? 1 : 2;
                liveFriendlyCount++;
              } else {
                nextCell = 0;
              }
            }

            state.nextGrid[rRow + c] = nextCell;
          }
        }

        // Swap grids
        const temp = state.grid;
        state.grid = state.nextGrid;
        state.nextGrid = temp;

        // Check Wave Progression
        const waveTarget = 30 + wave * 10;
        const progress = Math.min(100, Math.floor((state.waveTimer / waveTarget) * 100));
        setWaveProgress(progress);

        if (state.waveTimer >= waveTarget) {
          // Wave Cleared!
          state.waveTimer = 0;
          state.score += 1500 * state.multiplier;
          const nextWave = wave + 1;
          setWave(nextWave);
          audio.playWaveCleared();
          setNotification(`🌟 Wave ${wave} Cleared! Colony survived cosmic entropy surge! +${1500 * state.multiplier} pts`);
          syncHighScore(state.score, state.multiplier, nextWave);
        }

        // Calculate Vitality based on beacons and friendly biomass
        let activeBeacons = 0;
        state.beacons.forEach((b) => {
          if (state.grid[b.r * cols + b.c] === 3) activeBeacons++;
        });

        const computedVitality = Math.min(100, Math.floor((activeBeacons / 3) * 60 + Math.min(40, liveFriendlyCount * 0.8)));
        setVitality(computedVitality);

        // Game Over condition
        if (activeBeacons === 0 || computedVitality <= 0) {
          setIsGameOver(true);
          audio.playGameOver();
          setNotification('Colony Collapse: All core beacons were consumed by cosmic entropy.');
          syncHighScore(state.score, state.multiplier, wave);
        }
      }

      // DRAW CANVAS (3Blue1Brown chalkboard dark aesthetic)
      ctx.fillStyle = '#070B14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Coordinate grid lines
      ctx.strokeStyle = 'rgba(88, 196, 221, 0.04)';
      ctx.lineWidth = 1;
      for (let c = 0; c < cols; c += 4) {
        ctx.beginPath();
        ctx.moveTo(c * cellW, 0);
        ctx.lineTo(c * cellW, canvas.height);
        ctx.stroke();
      }
      for (let r = 0; r < rows; r += 4) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellH);
        ctx.lineTo(canvas.width, r * cellH);
        ctx.stroke();
      }

      // Render Cells
      const cellPad = 1;
      for (let r = 0; r < rows; r++) {
        const rRow = r * cols;
        const y = r * cellH + cellPad;
        const h = cellH - cellPad * 2;

        for (let c = 0; c < cols; c++) {
          const val = state.grid[rRow + c];
          if (val === 0) continue;

          const x = c * cellW + cellPad;
          const w = cellW - cellPad * 2;

          if (val === 1) {
            // Player 1: 3B1B Electric Cyan
            ctx.fillStyle = '#00D2FF';
            ctx.shadowColor = '#00D2FF';
            ctx.shadowBlur = 6;
            ctx.fillRect(x, y, w, h);
          } else if (val === 2) {
            // Player 2 / AI Co-Pilot: Solar Amber
            ctx.fillStyle = '#F59E0B';
            ctx.shadowColor = '#F59E0B';
            ctx.shadowBlur = 6;
            ctx.fillRect(x, y, w, h);
          } else if (val === 3) {
            // Core Colony Beacon: Harmonic Emerald with pulsing outer ring
            ctx.fillStyle = '#10B981';
            ctx.shadowColor = '#10B981';
            ctx.shadowBlur = 12;
            ctx.fillRect(x, y, w, h);

            // Pulse ring
            const pulse = (Math.sin(now * 0.005) + 1) * 3;
            ctx.strokeStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.strokeRect(x - pulse, y - pulse, w + pulse * 2, h + pulse * 2);
          } else if (val === 4) {
            // Entropy Anti-Cell: Crimson Sawtooth
            ctx.fillStyle = '#EF4444';
            ctx.shadowColor = '#EF4444';
            ctx.shadowBlur = 8;
            ctx.fillRect(x, y, w, h);
          }
        }
      }
      ctx.shadowBlur = 0; // Reset shadow

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPaused, isGameOver, wave, coOpMode, syncHighScore]);

  return (
    <div className="conway-coop-card" aria-label="Conway Co-Op Cellular Entropy Defense Simulator">
      {/* Top Banner & High Score Leaderboard */}
      <div className="game-hud-header">
        <div>
          <div className="game-badge-row">
            <span className="badge-3b1b">Conway 2-Player Co-Op</span>
            <span className="badge-shared-backend">🌐 Infortts Shared Core API</span>
            <span className="badge-wave">Wave {wave}</span>
            <span className={`badge-mode ${coOpMode === 'ai_copilot' ? 'ai' : 'hotseat'}`}>
              {coOpMode === 'ai_copilot' ? '🤖 AI Co-Pilot Active' : '👥 2-Player Hotseat'}
            </span>
          </div>
          <h3 className="game-title">CELLULAR ENTROPY DEFENSE</h3>
          <p className="game-subtitle">
            Collaborate to defend the 3 Core Beacons against encroaching cosmic entropy waves. Deploy gliders, pulse barriers, and oscillators.
          </p>
        </div>

        {/* Global Record Score Counter */}
        <div className="game-scores-panel">
          <div className="score-box highlight">
            <span className="score-label">ALL-TIME RECORD</span>
            <span className="score-val">🏆 {highScore.toLocaleString()}</span>
          </div>
          <div className="score-box">
            <span className="score-label">COLONY SCORE</span>
            <span className="score-val">{score.toLocaleString()}</span>
          </div>
          <div className="score-box">
            <span className="score-label">STREAK MULTIPLIER</span>
            <span className="score-val streak">⚡ {multiplier}x</span>
          </div>
        </div>
      </div>

      {/* Vitality & Wave Progress Bars */}
      <div className="vitality-bar-container">
        <div className="vitality-meta">
          <span className="vitality-label">
            Colony Vitality: <strong>{vitality}%</strong>
          </span>
          <span className="wave-progress-label">
            Wave {wave} Containment: <strong>{waveProgress}%</strong>
          </span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={vitality} aria-valuemin={0} aria-valuemax={100}>
          <div
            className={`progress-fill ${vitality < 30 ? 'critical' : vitality < 60 ? 'warning' : 'healthy'}`}
            style={{ width: `${vitality}%` }}
          />
        </div>
      </div>

      {/* Main Game Canvas */}
      <div className="game-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={768}
          height={480}
          onClick={handleCanvasClick}
          className="conway-coop-canvas"
          role="img"
          aria-label="Conway's Game of Life Co-Op grid. Click to deploy cellular defense patterns."
        />

        {/* Game Over Overlay */}
        {isGameOver && (
          <div className="canvas-overlay game-over" role="alert">
            <h4 className="overlay-title">COLONY EXTINCTION</h4>
            <p className="overlay-desc">Cosmic entropy broke through the defense lines. Final Score: {score.toLocaleString()} (Wave {wave})</p>
            <button type="button" className="action-btn primary" onClick={initGame}>
              ↺ Re-Initialize Colony [R]
            </button>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && !isGameOver && (
          <div className="canvas-overlay paused">
            <h4 className="overlay-title">SIMULATION PAUSED</h4>
            <p className="overlay-desc">Press Space to resume cellular propagation</p>
          </div>
        )}
      </div>

      {/* Live Notification Bar */}
      <div className="game-status-ticker" role="status" aria-live="polite">
        <span className="ticker-icon">📡</span>
        <span className="ticker-text">{notification}</span>
      </div>

      {/* Co-Op Control Deck */}
      <div className="game-controls-deck">
        {/* Pattern Selectors */}
        <div className="pattern-group" role="group" aria-label="Cellular Defense Patterns">
          <span className="control-label">Pattern Hotbar (Keys 1-4):</span>
          <div className="pattern-buttons">
            {PATTERNS.map((pat) => (
              <button
                key={pat.id}
                type="button"
                className={`pattern-btn ${activePattern.id === pat.id ? 'active' : ''}`}
                onClick={() => setActivePattern(pat)}
              >
                <span className="key-badge">{pat.key}</span>
                <span className="pat-name">{pat.name}</span>
                <span className="pat-cost">⚡{pat.cost}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy Meters & Co-Op Mode Toggle */}
        <div className="coop-status-group">
          <div className="energy-pill p1">
            <span className="player-indicator p1-dot">●</span>
            <span>P1 (Cyan): <strong>{p1Energy}⚡</strong></span>
          </div>

          <div className="energy-pill p2">
            <span className="player-indicator p2-dot">●</span>
            <span>{coOpMode === 'ai_copilot' ? 'AI Co-Pilot' : 'P2 (Amber)'}: <strong>{p2Energy}⚡</strong></span>
          </div>

          <div className="mode-switch-group">
            <button
              type="button"
              className={`mode-btn ${coOpMode === 'ai_copilot' ? 'active' : ''}`}
              onClick={() => setCoOpMode('ai_copilot')}
            >
              🤖 AI Co-Pilot
            </button>
            <button
              type="button"
              className={`mode-btn ${coOpMode === 'hotseat' ? 'active' : ''}`}
              onClick={() => setCoOpMode('hotseat')}
            >
              👥 2P Hotseat
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="action-buttons-group">
          <button
            type="button"
            className="action-btn"
            onClick={() => setIsPaused((p) => !p)}
            aria-pressed={isPaused}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'} <kbd>Space</kbd>
          </button>

          <button type="button" className="action-btn" onClick={initGame}>
            ↺ Reset <kbd>R</kbd>
          </button>

          <button
            type="button"
            className={`action-btn ${soundEnabled ? 'active' : ''}`}
            onClick={toggleSound}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? '🔊 Audio On' : '🔇 Audio Muted'} <kbd>M</kbd>
          </button>
        </div>
      </div>
    </div>
  );
};
