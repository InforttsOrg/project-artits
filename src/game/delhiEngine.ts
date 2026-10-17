// ============================================================================
// Reverse-Engineered Deterministic Delhi World Engine & Spatial Physics
// Adapted for Infortts Systems Architecture & Electric Obsidian / Cyan Theme
// ============================================================================

export const TAU = Math.PI * 2;

export const clamp = (v: number, a: number, b: number): number =>
  v < a ? a : v > b ? b : v;

export const hypot = (x: number, y: number): number => Math.sqrt(x * x + y * y);

export const dist = (ax: number, ay: number, bx: number, by: number): number =>
  hypot(ax - bx, ay - by);

export const d2 = (ax: number, ay: number, bx: number, by: number): number => {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
};

export const angDiff = (a: number, b: number): number => {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
};

export function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number): number {
  const dx = bx - ax;
  const dy = by - ay;
  const l = dx * dx + dy * dy;
  let t = l ? ((px - ax) * dx + (py - ay) * dy) / l : 0;
  t = clamp(t, 0, 1);
  return hypot(px - (ax + dx * t), py - (ay + dy * t));
}

// 6000 × 6000 WORLD CONSTANTS (1KM × 1KM GEOMETRY)
export const WORLD = 6000;
export const CP = { x: 3000, y: 2000 };
export const JM = { x: 3300, y: 2950, r: 150 };
export const ZONE = { x: 3300, y: 2950, R: 340 };

export interface RoadDef {
  n: string;
  w: number;
  p: [number, number][];
  spoke?: number;
  L: number[];
  len: number;
  bb: [number, number, number, number];
}

export interface RingDef {
  x: number;
  y: number;
  r: number;
  w: number;
}

export interface ParkDef {
  t: 'c' | 'r';
  x: number;
  y: number;
  r?: number;
  w?: number;
  h?: number;
  n?: string;
  forest?: number;
  ground?: number;
}

export interface BuildingDef {
  x: number;
  y: number;
  w: number;
  h: number;
  H: number;
  c: string;
  roof: string;
  wall: string;
  seed: number;
}

// REAL DELHI ROAD NETWORK (REVERSE-ENGINEERED)
const RAW_ROADS: Array<{ n: string; w: number; p: [number, number][]; spoke?: number }> = [
  { n: 'Sansad Marg', w: 56, p: [[3060, 2556], [3110, 2900], [3220, 3340]] },
  { n: 'Janpath', w: 58, p: [[2905, 2552], [2860, 3200], [2860, 3900]] },
  { n: 'Jantar Mantar Rd', w: 48, p: [[2877, 2950], [4024, 2950]] },
  { n: 'Kartavya Path', w: 84, p: [[1650, 3900], [4040, 3900]] },
  { n: 'Barakhamba Rd', w: 52, p: [[3507, 2237], [3720, 2357]] },
  { n: 'Tilak Marg', w: 52, p: [[3838, 2483], [4300, 3640]] },
  { n: 'ITO Rd', w: 52, p: [[3888, 2420], [4600, 2650]] },
  { n: 'Vikas Marg', w: 60, p: [[4600, 2650], [5200, 2650], [6000, 2650]] },
  { n: 'Minto Rd', w: 56, p: [[3000, 1440], [3000, 1000], [3400, 700], [4300, 620]] },
  { n: 'Pusa Rd', w: 56, p: [[2440, 2000], [1500, 1700], [500, 1600]] },
  { n: 'Lodhi Rd', w: 50, p: [[2860, 4500], [5200, 4500]] },
  { n: 'Aurobindo Marg', w: 54, p: [[2860, 3900], [2860, 4500], [2500, 5400], [2420, 5700]] },
  { n: 'Mathura Rd', w: 56, p: [[4470, 4100], [4800, 4500], [5200, 5000]] },
  { n: 'Ring Road', w: 72, p: [[500, 500], [5200, 500], [5200, 5400], [500, 5400], [500, 500]] },
  { n: 'GT Karnal Rd', w: 56, p: [[3000, 1000], [2000, 500], [1800, 0]] },
  { n: 'Rohtak Rd', w: 56, p: [[1500, 1700], [500, 1100], [0, 950]] },
  { n: 'Dhaula Kuan Rd', w: 56, p: [[1650, 3900], [1000, 4400], [500, 4600]] },
  { n: 'Gurgaon Rd', w: 56, p: [[1000, 4400], [300, 6000]] },
  { n: 'Ashoka Rd', w: 44, p: [[2860, 3250], [3230, 3420]] },
  { n: 'Baba Kharak Singh Marg', w: 48, p: [[2540, 2420], [2905, 2552]] },
  { n: 'JLN Marg', w: 44, p: [[3330, 1560], [3560, 1420]] },
  { n: 'Noida Link', w: 56, p: [[5200, 4000], [6000, 4000]] },
  { n: 'Asaf Ali Rd', w: 44, p: [[3000, 1250], [4000, 1050], [4600, 1100]] },
  { n: 'Outer Ring Rd', w: 56, p: [[1500, 1700], [1500, 5000], [4500, 5400]] },
];

// CP Radial Spokes
for (let k = 0; k < 8; k++) {
  const a = ((k + 0.5) * TAU) / 8;
  RAW_ROADS.push({
    n: '',
    w: 30,
    spoke: 1,
    p: [
      [CP.x + Math.cos(a) * 225, CP.y + Math.sin(a) * 225],
      [CP.x + Math.cos(a) * 560, CP.y + Math.sin(a) * 560],
    ],
  });
}

export const ROADS: RoadDef[] = RAW_ROADS.map((r) => {
  const L: number[] = [];
  let len = 0;
  let x0 = 1e9,
    y0 = 1e9,
    x1 = -1e9,
    y1 = -1e9;
  r.p.forEach(([x, y], i) => {
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
    if (i > 0) {
      const [px, py] = r.p[i - 1];
      const l = hypot(x - px, y - py);
      L.push(l);
      len += l;
    }
  });
  return {
    ...r,
    L,
    len,
    bb: [x0 - r.w, y0 - r.w, x1 + r.w, y1 + r.w],
  };
});

export const RINGS: RingDef[] = [
  { x: 3000, y: 2000, r: 225, w: 40 },
  { x: 3000, y: 2000, r: 385, w: 46 },
  { x: 3000, y: 2000, r: 560, w: 60 },
  { x: 4300, y: 3900, r: 260, w: 50 },
  { x: 3800, y: 2400, r: 90, w: 44 },
];

export const riverL = (y: number): number =>
  5420 + 70 * Math.sin(y / 520) + 40 * Math.sin(y / 170 + 1);

export const onBridge = (y: number): boolean =>
  Math.abs(y - 2650) < 36 || Math.abs(y - 4000) < 36;

export const inRiver = (x: number, y: number): boolean => {
  const rl = riverL(y);
  return x > rl && x < rl + 300 && !onBridge(y);
};

export const PARKS: ParkDef[] = [
  { t: 'c', x: 3000, y: 2000, r: 205 },
  { t: 'r', x: 1650, y: 3770, w: 2390, h: 80 },
  { t: 'r', x: 1650, y: 3950, w: 2390, h: 80 },
  { t: 'c', x: 4300, y: 3900, r: 235 },
  { t: 'r', x: 3400, y: 4620, w: 620, h: 380, n: 'LODHI GARDEN' },
  { t: 'r', x: 1700, y: 2200, w: 700, h: 1100, forest: 1, n: 'DELHI RIDGE' },
  { t: 'r', x: 3380, y: 1180, w: 360, h: 230, ground: 1, n: 'RAMLILA MAIDAN' },
  { t: 'c', x: 3800, y: 2400, r: 68 },
  { t: 'r', x: 4800, y: 950, w: 330, h: 450, n: 'RAJ GHAT' },
  { t: 'r', x: 2000, y: 4650, w: 420, h: 300 },
  { t: 'r', x: 2150, y: 520, w: 420, h: 260, n: 'DU NORTH CAMPUS' },
  { t: 'r', x: 1300, y: 4950, w: 420, h: 330, n: 'JNU' },
];

// Collision Blocked Test for Procedural Building Placement
export function isAreaBlocked(x: number, y: number, rad: number): boolean {
  const rl = riverL(y);
  if (x + rad > rl - 30 && x - rad < rl + 330) return true;
  if (x > rl + 300) return false;

  for (const r of ROADS) {
    for (let i = 0; i < r.L.length; i++) {
      const [a, b] = r.p[i];
      const [c, d] = r.p[i + 1];
      if (segDist(x, y, a, b, c, d) < r.w / 2 + rad + 16) return true;
    }
  }

  for (const g of RINGS) {
    const d = hypot(x - g.x, y - g.y);
    if (Math.abs(d - g.r) < g.w / 2 + rad + 16 || d < g.r) return true;
  }

  if (hypot(x - CP.x, y - CP.y) < 600 + rad) return true;

  for (const p of PARKS) {
    if (p.t === 'c' && p.r) {
      if (hypot(x - p.x, y - p.y) < p.r + rad) return true;
    } else if (p.w && p.h) {
      if (x + rad > p.x && x - rad < p.x + p.w && y + rad > p.y && y - rad < p.y + p.h) return true;
    }
  }

  if (hypot(x - ZONE.x, y - ZONE.y) < ZONE.R + 90 + rad) return true;
  return false;
}

// PROCEDURAL SEEDED BUILDINGS GENERATION (INFORTTS THEME)
export const BUILD: BuildingDef[] = [];
export const BG = 200;
export const BIDX = new Map<number, BuildingDef[]>();

(function generateBuildings() {
  const R = mulberry32(1947);
  const occ = new Set<string>();

  // Infortts Cybernetic Obsidian / Slate Palette
  const cyberPal = [
    '#0f172a', '#1e293b', '#0b1120', '#111827',
    '#090d16', '#141d2f', '#0d1527', '#1a2234'
  ];

  for (let k = 0; k < 8000 && BUILD.length < 1800; k++) {
    const w = 54 + R() * 70;
    const h = 44 + R() * 56;
    const x = R() * WORLD;
    const y = R() * WORLD;
    const cx = x + w / 2;
    const cy = y + h / 2;
    const rad = Math.max(w, h) / 2;

    const key = `${(cx / 110) | 0},${(cy / 110) | 0}`;
    if (occ.has(key)) continue;
    if (isAreaBlocked(cx, cy, rad)) continue;
    if (BUILD.some((b) => x < b.x + b.w + 30 && x + w + 30 > b.x && y < b.y + b.h + 30 && y + h + 30 > b.y)) {
      continue;
    }

    occ.add(key);
    const floors = 2 + ((R() * 4) | 0);
    const c = cyberPal[(R() * cyberPal.length) | 0];

    BUILD.push({
      x,
      y,
      w,
      h,
      H: floors * 15 + 8,
      c,
      roof: '#0b1120',
      wall: '#060a12',
      seed: (R() * 1e9) | 0,
    });
  }

  // Populate Spatial Hash Grid BIDX
  for (const b of BUILD) {
    for (let cx = (b.x / BG) | 0; cx <= (((b.x + b.w) / BG) | 0); cx++) {
      for (let cy = (b.y / BG) | 0; cy <= (((b.y + b.h) / BG) | 0); cy++) {
        const k = cx * 100 + cy;
        let list = BIDX.get(k);
        if (!list) {
          list = [];
          BIDX.set(k, list);
        }
        list.push(b);
      }
    }
  }
})();

// SPATIAL BUILDING COLLISION PHYSICS
function collideList(p: { x: number; y: number; r: number }, L: BuildingDef[]) {
  for (let i = 0; i < L.length; i++) {
    const b = L[i];
    const nx = clamp(p.x, b.x, b.x + b.w);
    const ny = clamp(p.y, b.y, b.y + b.h);
    const dx = p.x - nx;
    const dy = p.y - ny;
    const dd = dx * dx + dy * dy;

    if (dd < p.r * p.r) {
      if (dd > 1e-6) {
        const d = Math.sqrt(dd);
        p.x += (dx / d) * (p.r - d);
        p.y += (dy / d) * (p.r - d);
      } else {
        const l = p.x - b.x;
        const r = b.x + b.w - p.x;
        const t = p.y - b.y;
        const bo = b.y + b.h - p.y;
        const m = Math.min(l, r, t, bo);
        if (m === l) p.x = b.x - p.r;
        else if (m === r) p.x = b.x + b.w + p.r;
        else if (m === t) p.y = b.y - p.r;
        else p.y = b.y + b.h + p.r;
      }
    }
  }
}

export function collideBuildings(p: { x: number; y: number; r: number }) {
  const cx = (p.x / BG) | 0;
  const cy = (p.y / BG) | 0;
  const fx = p.x - cx * BG;
  const fy = p.y - cy * BG;
  const a = BIDX.get(cx * 100 + cy);

  const l = fx < p.r ? BIDX.get((cx - 1) * 100 + cy) : null;
  const r = fx > BG - p.r ? BIDX.get((cx + 1) * 100 + cy) : null;
  const t = fy < p.r ? BIDX.get(cx * 100 + cy - 1) : null;
  const bo = fy > BG - p.r ? BIDX.get(cx * 100 + cy + 1) : null;

  if (a) collideList(p, a);
  if (l) collideList(p, l);
  if (r) collideList(p, r);
  if (t) collideList(p, t);
  if (bo) collideList(p, bo);
}
