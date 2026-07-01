import { FloatingMathSymbols, buildEvenSymbols } from "./FloatingMathSymbols";

const ctaSymbols = buildEvenSymbols(["∞", "×", "∑", "π", "θ"]);

export function CTA() {
  return (
    <section className="relative bg-slate-50 py-14 sm:py-24 overflow-hidden">
      <FloatingMathSymbols symbols={ctaSymbols} theme="light" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-8">
          Become part of the maths community with Solvexa
        </h2>
      </div>
    </section>
  );
}
