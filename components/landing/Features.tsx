import { ArrowRight, Users, MessageSquare, Timer } from "lucide-react";
import Link from "next/link";

/* ─── Custom SVG Icons ─── */
function AIIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full" aria-hidden="true">
      <circle cx="24" cy="24" r="20" stroke="#6366f1" strokeWidth="1.5" opacity="0.2" />
      <circle cx="24" cy="24" r="12" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
      <circle cx="24" cy="24" r="4" fill="#6366f1" />
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 24 + 16 * Math.cos(rad);
        const y = 24 + 16 * Math.sin(rad);
        return <circle key={deg} cx={x} cy={y} r="2" fill="#818cf8" opacity="0.6" />;
      })}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 24 + 8 * Math.cos(rad);
        const y1 = 24 + 8 * Math.sin(rad);
        const x2 = 24 + 14 * Math.cos(rad);
        const y2 = 24 + 14 * Math.sin(rad);
        return <line key={`l${deg}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#818cf8" strokeWidth="1" opacity="0.5" />;
      })}
    </svg>
  );
}


const secondaryFeatures = [
  {
    Icon: Users,
    bg: "bg-emerald-50",
    color: "text-emerald-600",
    title: "Real tutors",
    body: "When AI isn't enough, book a real person who actually gets it.",
  },
  {
    Icon: MessageSquare,
    bg: "bg-violet-50",
    color: "text-violet-600",
    title: "Peer community",
    body: "Ask questions and help other students. Coming soon.",
  },
  {
    Icon: Timer,
    bg: "bg-slate-100",
    color: "text-slate-600",
    title: "Pomodoro timer",
    body: "Build a study habit that actually sticks.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Learn · Get unstuck · Help others
        </p>

        {/* ── Hero feature block ── */}
        <div className="grid lg:grid-cols-5 gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Main feature — AI Solver */}
          <div className="lg:col-span-3 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-slate-950 to-indigo-950 p-6 sm:p-8 relative overflow-hidden min-h-[300px] sm:min-h-[340px] flex flex-col justify-between">
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.06]"
              viewBox="0 0 600 340"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <line key={`v${i}`} x1={i * 100} y1="0" x2={i * 100} y2="340" stroke="#818cf8" strokeWidth="1" />
              ))}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`h${i}`} x1="0" y1={i * 85} x2="600" y2={i * 85} stroke="#818cf8" strokeWidth="1" />
              ))}
              <path
                d="M0,280 C100,240 150,180 200,170 S300,120 350,90 S450,50 550,40 L600,36"
                stroke="#6366f1"
                strokeWidth="2"
                fill="none"
                opacity="0.8"
              />
            </svg>

            <div className="relative">
              <div className="mb-5 h-12 w-12">
                <AIIcon />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 max-w-xs">
                Not just the answer. The why.
              </h2>
              <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                Every step explained clearly, so you actually understand it.
              </p>
            </div>

            <div className="relative mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2.5">
              <div className="text-xs font-mono text-white/50 mb-3">
                Solve: 2x² − 7x + 3 = 0
              </div>
              {[
                { n: 1, t: "Identify a=2, b=−7, c=3" },
                { n: 2, t: "Δ = 49 − 24 = 25" },
                { n: 3, t: "x = (7 ± 5) / 4" },
              ].map((step) => (
                <div key={step.n} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600/30 text-[10px] font-bold text-brand-300">
                    {step.n}
                  </span>
                  <span className="text-xs font-mono text-white/70">{step.t}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 rounded-xl bg-brand-600/20 border border-brand-500/20 px-3 py-2 mt-1">
                <span className="text-xs font-mono font-bold text-brand-300">
                  x = 3 &nbsp;or&nbsp; x = ½
                </span>
                <span className="ml-auto text-[10px] text-brand-400 font-medium">Answer ✓</span>
              </div>
            </div>
          </div>

          {/* Right: two stacked cards */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            <div className="flex-1 rounded-2xl sm:rounded-3xl border border-slate-100 bg-slate-50 p-5 sm:p-7 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-brand-100/40 blur-3xl pointer-events-none" />
              <div className="relative">
                <svg viewBox="0 0 48 48" fill="none" className="h-11 w-11 mb-5" aria-hidden="true">
                  <path
                    d="M24 4 L38 10 L38 24 C38 33 32 40 24 44 C16 40 10 33 10 24 L10 10 Z"
                    stroke="#6366f1"
                    strokeWidth="1.5"
                    fill="#eef2ff"
                  />
                  <path
                    d="M17 24 L22 29 L31 20"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-base font-semibold text-slate-900 mb-2">Completely free.</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  No ads. Made to help.
                </p>
              </div>
            </div>

            <div className="flex-1 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 p-5 sm:p-7 relative overflow-hidden">
              <div className="absolute -bottom-6 -right-6 text-[80px] opacity-10 select-none pointer-events-none font-mono">
                ∑
              </div>
              <div className="relative">
                <h3 className="text-base font-semibold text-white mb-2">
                  Arabic, Portuguese & French
                </h3>
                <p className="text-sm text-white/70 leading-relaxed">
                  Available in multiple languages.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Secondary strip ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {secondaryFeatures.map(({ Icon, bg, color, title, body }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-5 hover:border-slate-200 hover:shadow-card-hover transition-all duration-200"
            >
              <div className={`shrink-0 h-10 w-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-1">{title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-end border-t border-slate-100 pt-8">
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Join now
            <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
