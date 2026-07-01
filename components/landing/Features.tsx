import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SolvexaAILogo } from "@/components/ui/Logo";
import { FloatingMathSymbols, buildEvenSymbols } from "./FloatingMathSymbols";

const floatingSymbols = buildEvenSymbols(["∫", "θ", "π", "∑", "√", "∞", "Δ", "±"]);

const features = [
  {
    title: "Solvexa AI",
    body: "Every problem broken down step by step, so you understand the why.",
    logo: true,
  },
  {
    title: "Real tutors",
    body: "Book a real tutor when you need one.",
  },
  {
    title: "Peer community",
    body: "Join subject groups, ask questions, help each other out.",
  },
  {
    title: "Pomodoro timer",
    body: "Track your studying with a built in timer.",
  },
  {
    title: "Multilingual",
    body: "Available in Arabic, Portuguese and French.",
  },
  {
    title: "Free",
    body: "No ads. No cost.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative bg-white py-14 sm:py-20 overflow-hidden">
      <FloatingMathSymbols symbols={floatingSymbols} theme="light" />

      <div className="relative mx-auto max-w-3xl px-5 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-4">
          Learn · Get unstuck · Help others
        </p>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-10 max-w-lg">
          Everything you need in one place
        </h2>

        <div className="border-t border-slate-100">
          {features.map(({ title, body, logo }) => (
            <div
              key={title}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 border-b border-slate-100"
            >
              {logo ? (
                <SolvexaAILogo className="text-xl sm:w-40 shrink-0 text-slate-900" />
              ) : (
                <h3 className="text-base font-semibold text-slate-900 sm:w-40 shrink-0">
                  {title}
                </h3>
              )}
              <p className="text-sm text-slate-500">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-end">
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
