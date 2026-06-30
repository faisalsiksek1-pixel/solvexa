"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroGraph } from "./HeroGraph";
import { SolvexaAILogo } from "@/components/ui/Logo";


export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#07061a] overflow-hidden flex items-center">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-brand-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-y-1/3 rounded-full bg-violet-700/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/20 blur-[80px]" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full mx-auto max-w-7xl px-5 sm:px-6 pt-28 pb-16 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-8 items-center w-full">

          {/* ── LEFT ── */}
          <div className="flex flex-col items-start">
            {/* Motto */}
            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              Learn · Get unstuck · Help others
            </p>

            {/* Logo as headline */}
            <SolvexaAILogo white className="text-[3rem] sm:text-[4rem] lg:text-[clamp(3rem,6vw,5rem)]" />

            {/* Subtext */}
            <p className="mt-8 text-sm sm:text-base leading-relaxed text-white/50">
              For students, by students.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <Link
                href="/signup"
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 transition-all duration-200 hover:bg-brand-500 hover:-translate-y-0.5 active:scale-[0.97]"
              >
                Join Solvexa
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                How it works
              </Link>
            </div>

          </div>

          {/* ── RIGHT: Graph — hidden on small screens ── */}
          <div className="relative hidden md:flex items-center justify-center lg:h-[560px]">
            <div className="relative w-full max-w-[520px] rounded-2xl lg:rounded-3xl border border-white/8 bg-white/[0.03] p-4 sm:p-6 backdrop-blur-sm shadow-2xl">
              {/* Card header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-brand-500" />
                  <span className="text-xs font-mono font-medium text-white/40">
                    f(x) = x² — live explorer
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
                </div>
              </div>

              {/* Graph */}
              <div className="h-[280px] sm:h-[360px]">
                <HeroGraph />
              </div>

              {/* Bottom strip */}
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[
                  { label: "Function", value: "f(x) = x²" },
                  { label: "Derivative", value: "f′(x) = 2x" },
                  { label: "Vertex", value: "(0, 0)" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl bg-white/5 border border-white/8 px-2 py-2 text-center"
                  >
                    <p className="text-[9px] sm:text-[10px] text-white/30 font-medium uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-xs font-mono font-semibold text-white/70">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
