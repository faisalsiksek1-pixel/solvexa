"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#07061a] overflow-hidden flex flex-col">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-brand-600/10 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-y-1/3 rounded-full bg-violet-700/8 blur-[100px]" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #818cf8 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-6 max-w-7xl mx-auto w-full">
        <p className="text-white font-semibold text-sm tracking-wide">Solvexa</p>
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-xs text-white/50 hover:text-white transition">Sign in</Link>
          <Link href="/signup" className="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-xs font-medium text-white hover:bg-white/15 transition">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pb-24 pt-12">

        {/* Location tag */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
          <span className="text-xs text-white/40 tracking-wide">🇦🇪 UAE &nbsp;·&nbsp; 🇧🇷 Brazil</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.02] max-w-3xl">
          Study together.<br />
          <span className="text-white/30">Get unstuck.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-sm sm:text-base text-white/40 max-w-md leading-relaxed">
          A space for maths students to solve problems, find tutors, and learn with each other — not alone.
        </p>

        {/* CTA */}
        <div className="mt-10 flex items-center gap-3">
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-900/40 hover:bg-brand-500 transition-all hover:-translate-y-0.5"
          >
            Join for free
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Two feature cards */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl w-full">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-left backdrop-blur-sm hover:bg-white/[0.05] transition">
            <div className="h-8 w-8 rounded-xl bg-brand-600/20 flex items-center justify-center mb-4">
              <span className="text-brand-400 text-sm">∑</span>
            </div>
            <p className="text-sm font-semibold text-white mb-1.5">Solve any problem</p>
            <p className="text-xs text-white/35 leading-relaxed">
              Type or photo a question. Get a full step-by-step breakdown — not just the answer.
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 text-left backdrop-blur-sm hover:bg-white/[0.05] transition">
            <div className="h-8 w-8 rounded-xl bg-violet-600/20 flex items-center justify-center mb-4">
              <span className="text-violet-400 text-sm">#</span>
            </div>
            <p className="text-sm font-semibold text-white mb-1.5">Find your people</p>
            <p className="text-xs text-white/35 leading-relaxed">
              Join communities, message tutors, and study with students from the UAE and Brazil.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
