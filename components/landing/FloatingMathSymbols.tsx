interface Symbol {
  sym: string;
  top: string;
  left: string;
  size: string;
  delay: string;
  duration: string;
}

interface FloatingMathSymbolsProps {
  symbols: Symbol[];
  theme?: "light" | "dark";
}

export function FloatingMathSymbols({ symbols, theme = "light" }: FloatingMathSymbolsProps) {
  const color = theme === "dark" ? "text-white/20" : "text-slate-300";

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block overflow-hidden">
      {symbols.map((f, i) => (
        <span
          key={i}
          className={`absolute italic select-none animate-float ${color} ${f.size}`}
          style={{
            top: f.top,
            left: f.left,
            fontFamily: "var(--font-cormorant), serif",
            animationDelay: f.delay,
            animationDuration: f.duration,
          }}
        >
          {f.sym}
        </span>
      ))}
    </div>
  );
}

/* Stratified scatter: the section is divided into a 3x3 grid so every region
   gets exactly one symbol (no big empty gaps), but each symbol is jittered to
   a pseudo-random spot inside its cell so the layout doesn't look like a grid.
   The jitter is a deterministic hash (not Math.random()) so server and client
   render the same positions and hydration doesn't mismatch. */
const SIZES = ["text-3xl", "text-4xl", "text-5xl"];

function hash(seed: number) {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

function seedFromChars(chars: string[]) {
  return chars.reduce((h, ch, i) => h + ch.charCodeAt(0) * (i + 1) * 17, 0);
}

// Quincunx: the 4 corners of the 3x3 grid plus the center. Fewer symbols than
// a full grid, but still one per quadrant plus the middle, so nothing goes empty.
const CELLS: [number, number][] = [
  [0, 0],
  [0, 2],
  [1, 1],
  [2, 0],
  [2, 2],
];

export function buildEvenSymbols(chars: string[]): Symbol[] {
  const rows = 3;
  const cols = 3;
  const cellH = 100 / rows;
  const cellW = 100 / cols;
  const pad = 0.32;
  const seedOffset = seedFromChars(chars);

  return CELLS.map(([r, c], idx) => {
    const cellSeed = seedOffset + (r * cols + c + 1) * 41;
    const top = r * cellH + cellH * (pad + hash(cellSeed * 1.7) * (1 - 2 * pad));
    const left = c * cellW + cellW * (pad + hash(cellSeed * 3.3) * (1 - 2 * pad));
    const size = SIZES[Math.floor(hash(cellSeed * 5.1) * SIZES.length)];
    const delay = (hash(cellSeed * 7.9) * 2.5).toFixed(1);
    const duration = (6 + hash(cellSeed * 2.3) * 2.5).toFixed(1);

    return {
      sym: chars[idx % chars.length],
      top: `${top.toFixed(1)}%`,
      left: `${left.toFixed(1)}%`,
      size,
      delay: `${delay}s`,
      duration: `${duration}s`,
    };
  });
}
