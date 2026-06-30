"use client";

import { useEffect, useRef, useState } from "react";

const W = 520;
const H = 440;
const OX = 260;
const OY = 330;
const SCALE = 78;

function toSvg(x: number, y: number): [number, number] {
  return [OX + x * SCALE, OY - y * SCALE];
}

function f(x: number): number {
  return x * x;
}

function fPrime(x: number): number {
  return 2 * x;
}

function generateParabolaPath(): string {
  const pts: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const x = -2.2 + (i / 120) * 4.4;
    const y = f(x);
    const [sx, sy] = toSvg(x, y);
    pts.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(2)} ${sy.toFixed(2)}`);
  }
  return pts.join(" ");
}

const PARABOLA_PATH = generateParabolaPath();

export function HeroGraph() {
  const pathRef = useRef<SVGPathElement>(null);
  const animRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const [pathLen, setPathLen] = useState(700);
  const [drawProgress, setDrawProgress] = useState(0);
  const [pointT, setPointT] = useState(0);
  const [phase, setPhase] = useState<"drawing" | "animating">("drawing");

  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;

      if (elapsed < 1.6) {
        setDrawProgress(Math.min(elapsed / 1.6, 1));
        setPhase("drawing");
      } else {
        setPhase("animating");
        const loopT = ((elapsed - 1.6) % 5) / 5;
        setPointT(loopT);
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const dashOffset = pathLen * (1 - drawProgress);

  const pointX = -2.2 + pointT * 4.4;
  const pointY = f(pointX);
  const [px, py] = toSvg(pointX, pointY);
  const slope = fPrime(pointX);

  const tx1 = pointX - 0.75;
  const ty1 = pointY + slope * (tx1 - pointX);
  const tx2 = pointX + 0.75;
  const ty2 = pointY + slope * (tx2 - pointX);
  const [tlx1, tly1] = toSvg(tx1, ty1);
  const [tlx2, tly2] = toSvg(tx2, ty2);

  const labelX = Math.min(Math.max(px + 14, 10), W - 130);
  const labelY = Math.max(py - 20, 14);

  const showPoint = phase === "animating";
  const showLabel = drawProgress > 0.85;

  return (
    <div className="relative w-full h-full select-none">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-3xl bg-brand-600/5 blur-2xl pointer-events-none" />

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-full"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Grid */}
        <g opacity="0.07">
          {Array.from({ length: 7 }, (_, i) => i - 3).map((n) => {
            const [x] = toSvg(n, 0);
            return (
              <line
                key={`gx${n}`}
                x1={x}
                y1={toSvg(0, -1.2)[1]}
                x2={x}
                y2={toSvg(0, 4.8)[1]}
                stroke="#818cf8"
                strokeWidth="1"
              />
            );
          })}
          {Array.from({ length: 7 }, (_, i) => i - 1).map((n) => {
            const [, y] = toSvg(0, n);
            return (
              <line
                key={`gy${n}`}
                x1={toSvg(-3.2, 0)[0]}
                y1={y}
                x2={toSvg(3.2, 0)[0]}
                y2={y}
                stroke="#818cf8"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* Axes */}
        <g opacity="0.35">
          {/* X axis */}
          <line
            x1={toSvg(-3.0, 0)[0]}
            y1={OY}
            x2={toSvg(3.0, 0)[0]}
            y2={OY}
            stroke="#6366f1"
            strokeWidth="1.5"
          />
          {/* Y axis */}
          <line
            x1={OX}
            y1={toSvg(0, 4.6)[1]}
            x2={OX}
            y2={toSvg(0, -1.0)[1]}
            stroke="#6366f1"
            strokeWidth="1.5"
          />
          {/* Arrowheads */}
          <polygon
            points={`${toSvg(3.0, 0)[0]},${OY} ${toSvg(3.0, 0)[0] - 7},${OY - 3.5} ${toSvg(3.0, 0)[0] - 7},${OY + 3.5}`}
            fill="#6366f1"
          />
          <polygon
            points={`${OX},${toSvg(0, 4.6)[1]} ${OX - 3.5},${toSvg(0, 4.6)[1] + 7} ${OX + 3.5},${toSvg(0, 4.6)[1] + 7}`}
            fill="#6366f1"
          />
        </g>

        {/* Axis tick labels */}
        <g fill="#6366f1" opacity="0.35" fontSize="11" fontFamily="monospace">
          {[-2, -1, 1, 2].map((n) => {
            const [tx] = toSvg(n, 0);
            return (
              <text key={`xt${n}`} x={tx} y={OY + 17} textAnchor="middle">
                {n}
              </text>
            );
          })}
          {[1, 2, 3, 4].map((n) => {
            const [, ty] = toSvg(0, n);
            return (
              <text key={`yt${n}`} x={OX - 13} y={ty + 4} textAnchor="end">
                {n}
              </text>
            );
          })}
          <text x={toSvg(3.1, 0)[0]} y={OY + 5} fontSize="13" fontStyle="italic" opacity="0.6">
            x
          </text>
          <text x={OX + 8} y={toSvg(0, 4.7)[1] + 4} fontSize="13" fontStyle="italic" opacity="0.6">
            y
          </text>
        </g>

        {/* Parabola glow */}
        <path
          ref={pathRef}
          d={PARABOLA_PATH}
          fill="none"
          stroke="#818cf8"
          strokeWidth="10"
          opacity="0.12"
          strokeDasharray={pathLen}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />

        {/* Parabola main line */}
        <path
          d={PARABOLA_PATH}
          fill="none"
          stroke="url(#curveGrad)"
          strokeWidth="2.5"
          strokeDasharray={pathLen}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />

        {/* Gradient def */}
        <defs>
          <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>

        {/* Function label */}
        <g
          opacity={showLabel ? 1 : 0}
          style={{ transition: "opacity 0.4s ease" }}
        >
          <rect
            x={toSvg(1.55, 3.1)[0] - 6}
            y={toSvg(1.55, 3.1)[1] - 16}
            width={88}
            height={22}
            rx={5}
            fill="#1e1b4b"
            opacity={0.8}
          />
          <text
            x={toSvg(1.55, 3.1)[0]}
            y={toSvg(1.55, 3.1)[1]}
            fill="#a5b4fc"
            fontSize="12"
            fontFamily="monospace"
            fontStyle="italic"
          >
            f(x) = x²
          </text>
        </g>

        {/* Tangent line */}
        {showPoint && (
          <line
            x1={tlx1}
            y1={tly1}
            x2={tlx2}
            y2={tly2}
            stroke="#fbbf24"
            strokeWidth="1.5"
            opacity={0.65}
            strokeDasharray="5 3"
          />
        )}

        {/* Moving point */}
        {showPoint && (
          <>
            {/* Drop lines */}
            <line
              x1={px}
              y1={py}
              x2={px}
              y2={OY}
              stroke="#6366f1"
              strokeWidth="1"
              opacity={0.25}
              strokeDasharray="3 3"
            />
            <line
              x1={px}
              y1={py}
              x2={OX}
              y2={py}
              stroke="#6366f1"
              strokeWidth="1"
              opacity={0.25}
              strokeDasharray="3 3"
            />

            {/* Glow rings */}
            <circle cx={px} cy={py} r={14} fill="#6366f1" opacity={0.08} />
            <circle cx={px} cy={py} r={8} fill="#6366f1" opacity={0.18} />

            {/* Point */}
            <circle cx={px} cy={py} r={4.5} fill="#6366f1" />
            <circle cx={px} cy={py} r={2} fill="white" />

            {/* Coordinate tooltip */}
            <g transform={`translate(${labelX}, ${labelY})`}>
              <rect x={0} y={-13} width={108} height={20} rx={5} fill="#0f0c29" opacity={0.88} />
              <text x={7} y={2} fill="#a5b4fc" fontSize="11" fontFamily="monospace">
                ({pointX.toFixed(2)},&nbsp;{pointY.toFixed(2)})
              </text>
            </g>

            {/* Derivative tooltip */}
            <g
              transform={`translate(${Math.min(Math.max(px + 14, 10), W - 140)}, ${Math.min(py + 22, H - 12)})`}
            >
              <rect x={0} y={-13} width={118} height={20} rx={5} fill="#0f0c29" opacity={0.88} />
              <text x={7} y={2} fill="#fcd34d" fontSize="11" fontFamily="monospace">
                f′(x) = {slope.toFixed(2)}
              </text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
