export function HowItWorks() {
  return (
    <section id="solvexa-ai" className="bg-slate-50 py-14 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">

        {/* Header */}
        <div className="flex items-end gap-6 mb-10 sm:mb-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-2">
              AI solver
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900"
              style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
              ∫<span style={{ color: "#2563eb" }}>θ</span>lvexa <span className="not-italic text-brand-600">AI</span>
            </h2>
          </div>
          <div className="hidden sm:block mb-1 text-[120px] font-black text-slate-100 leading-none select-none">
            2
          </div>
        </div>

        {/* ── Step 1 ── */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-6 items-center">
          <div className="relative">
            <span className="block text-[72px] sm:text-[96px] font-black leading-none text-slate-100 select-none mb-1">
              01
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 -mt-4 sm:-mt-6">
              Enter your problem
            </h3>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md">
              Type your question exactly as it appears. Equation, word problem, proof.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Algebra", "Calculus", "Geometry", "Trigonometry", "Statistics"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-brand-400" />
              <span className="text-xs font-medium text-slate-400">Problem input</span>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 sm:p-4 font-mono text-xs sm:text-sm text-slate-700">
              Find the derivative of f(x) = x³·sin(x)
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-2">
                <span className="rounded-lg bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700">
                  Calculus
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-500">
                  Derivatives
                </span>
              </div>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 shadow-sm">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── Step 2 ── */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-card lg:order-1 order-2">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-violet-400" />
              <span className="text-xs font-medium text-slate-400">Solution</span>
            </div>
            <div className="space-y-2.5 sm:space-y-3">
              {[
                { label: "Apply product rule", detail: "(uv)′ = u′v + uv′", color: "bg-slate-50" },
                { label: "u = x³,  v = sin(x)", detail: "u′ = 3x²,  v′ = cos(x)", color: "bg-slate-50" },
                { label: "Substitute", detail: "f′(x) = 3x²sin(x) + x³cos(x)", color: "bg-brand-50 border border-brand-100" },
              ].map((item, i) => (
                <div key={i} className={`flex gap-3 rounded-xl p-3 ${item.color}`}>
                  <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-500 shadow-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-slate-700">{item.label}</p>
                    <p className="text-xs font-mono text-slate-500 mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:order-2 order-1">
            <span className="block text-[72px] sm:text-[96px] font-black leading-none text-slate-100 select-none mb-1">
              02
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-3 -mt-4 sm:-mt-6">
              Get the full explanation
            </h3>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-md">
              Every step shown clearly so you understand the method, not just the answer.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
