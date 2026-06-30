import { TESTIMONIALS } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/Avatar";

const stats = [
  { value: "12,000+", label: "Active students" },
  { value: "2.4M+", label: "Problems solved" },
  { value: "4.9 / 5", label: "Average rating" },
  { value: "Global", label: "Community" },
];

export function Testimonials() {
  const [featured, ...rest] = TESTIMONIALS;

  return (
    <section id="testimonials" className="bg-[#07061a] py-20 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-3">
              Student stories
            </p>
            <h2 className="text-4xl font-bold text-white sm:text-5xl">
              Real results.
            </h2>
          </div>
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="h-5 w-5 fill-amber-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* ── Featured pull-quote ── */}
        <div className="relative mb-10">
          {/* Giant quotation mark */}
          <span
            className="absolute -top-8 -left-4 text-[140px] leading-none text-brand-900/60 select-none font-serif"
            aria-hidden="true"
          >
            "
          </span>

          <div className="relative rounded-3xl border border-white/8 bg-white/[0.03] p-8 sm:p-10">
            <blockquote className="text-xl sm:text-2xl font-medium leading-relaxed text-white/90 max-w-3xl mb-8">
              {featured.quote}
            </blockquote>
            <div className="flex items-center gap-4">
              <Avatar name={featured.name} size="md" className="ring-2 ring-white/10" />
              <div>
                <p className="text-sm font-semibold text-white">{featured.name}</p>
                <p className="text-sm text-white/40">{featured.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Supporting quotes: 3-col on desktop ── */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          {rest.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors duration-200"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <svg key={j} className="h-3.5 w-3.5 fill-amber-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm text-white/70 leading-relaxed mb-5">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <Avatar name={t.name} size="xs" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white/80 truncate">{t.name}</p>
                  <p className="text-[11px] text-white/40 truncate">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-5 text-center ${i < stats.length - 1 ? "border-r border-white/8" : ""} bg-white/[0.02]`}
            >
              <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-xs text-white/40">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
