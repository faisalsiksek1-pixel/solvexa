"use client";

import { useEffect, useRef } from "react";

interface FunctionGraphProps {
  expression: string;
  xMin?: number;
  xMax?: number;
}

export function FunctionGraph({ expression, xMin = -10, xMax = 10 }: FunctionGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const padding = 40;

    // Build safe evaluator
    let fn: (x: number) => number;
    try {
      // eslint-disable-next-line no-new-func
      fn = new Function("x", `"use strict"; return (${expression});`) as (x: number) => number;
      fn(0); // test it
    } catch {
      return;
    }

    // Sample y values to auto-scale
    const samples = 400;
    const yValues: number[] = [];
    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i / samples) * (xMax - xMin);
      try {
        const y = fn(x);
        if (isFinite(y)) yValues.push(y);
      } catch {}
    }

    if (yValues.length === 0) return;

    let yMin = Math.min(...yValues);
    let yMax = Math.max(...yValues);
    const yPad = (yMax - yMin) * 0.1 || 1;
    yMin -= yPad;
    yMax += yPad;

    const toCanvasX = (x: number) =>
      padding + ((x - xMin) / (xMax - xMin)) * (W - 2 * padding);
    const toCanvasY = (y: number) =>
      H - padding - ((y - yMin) / (yMax - yMin)) * (H - 2 * padding);

    ctx.clearRect(0, 0, W, H);

    // Background
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = "#e2e8f0";
    ctx.lineWidth = 1;
    const xTicks = 10;
    const yTicks = 8;
    for (let i = 0; i <= xTicks; i++) {
      const x = xMin + (i / xTicks) * (xMax - xMin);
      const cx = toCanvasX(x);
      ctx.beginPath();
      ctx.moveTo(cx, padding);
      ctx.lineTo(cx, H - padding);
      ctx.stroke();
    }
    for (let i = 0; i <= yTicks; i++) {
      const y = yMin + (i / yTicks) * (yMax - yMin);
      const cy = toCanvasY(y);
      ctx.beginPath();
      ctx.moveTo(padding, cy);
      ctx.lineTo(W - padding, cy);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = "#94a3b8";
    ctx.lineWidth = 1.5;
    // x-axis
    const cy0 = toCanvasY(0);
    if (cy0 >= padding && cy0 <= H - padding) {
      ctx.beginPath();
      ctx.moveTo(padding, cy0);
      ctx.lineTo(W - padding, cy0);
      ctx.stroke();
    }
    // y-axis
    const cx0 = toCanvasX(0);
    if (cx0 >= padding && cx0 <= W - padding) {
      ctx.beginPath();
      ctx.moveTo(cx0, padding);
      ctx.lineTo(cx0, H - padding);
      ctx.stroke();
    }

    // Axis labels
    ctx.fillStyle = "#94a3b8";
    ctx.font = "11px ui-monospace, monospace";
    ctx.textAlign = "center";
    for (let i = 0; i <= xTicks; i++) {
      const x = xMin + (i / xTicks) * (xMax - xMin);
      if (Math.abs(x) < 0.01) continue;
      const cx = toCanvasX(x);
      ctx.fillText(x % 1 === 0 ? x.toString() : x.toFixed(1), cx, H - padding + 14);
    }
    ctx.textAlign = "right";
    for (let i = 0; i <= yTicks; i++) {
      const y = yMin + (i / yTicks) * (yMax - yMin);
      if (Math.abs(y) < 0.01) continue;
      const cy = toCanvasY(y);
      ctx.fillText(y % 1 === 0 ? y.toString() : y.toFixed(1), padding - 6, cy + 4);
    }

    // Plot curve
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.beginPath();
    let started = false;
    for (let i = 0; i <= samples; i++) {
      const x = xMin + (i / samples) * (xMax - xMin);
      let y: number;
      try {
        y = fn(x);
      } catch {
        started = false;
        continue;
      }
      if (!isFinite(y) || y < yMin - (yMax - yMin) || y > yMax + (yMax - yMin)) {
        started = false;
        continue;
      }
      const cx = toCanvasX(x);
      const cy = toCanvasY(y);
      if (!started) {
        ctx.moveTo(cx, cy);
        started = true;
      } else {
        ctx.lineTo(cx, cy);
      }
    }
    ctx.stroke();
  }, [expression, xMin, xMax]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={300}
      className="w-full rounded-xl"
      style={{ height: "280px" }}
    />
  );
}
