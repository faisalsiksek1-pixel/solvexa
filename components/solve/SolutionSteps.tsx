"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown, Copy } from "lucide-react";
import type { Solution } from "@/types";
import { DifficultyBadge } from "@/components/ui/Badge";
import { cn } from "@/utils/cn";
import { MathRenderer } from "@/components/ui/MathRenderer";
import { FunctionGraph } from "@/components/solve/FunctionGraph";

interface SolutionStepsProps {
  solution: Solution;
}

function MathBlock({ math }: { math: string }) {
  return (
    <div className="mt-3 rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 overflow-x-auto text-center">
      <MathRenderer latex={math} display />
    </div>
  );
}

export function SolutionSteps({ solution }: SolutionStepsProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(
    new Set(solution.steps.map((s) => s.id))
  );
  const [copied, setCopied] = useState(false);

  function toggleStep(id: string) {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function copyProblem() {
    navigator.clipboard.writeText(solution.statement).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const hasGraph = !!solution.graphFunction;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Problem
              </span>
              <DifficultyBadge difficulty={solution.difficulty} />
              <span className="text-xs text-slate-400">{solution.topic}</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">{solution.statement}</p>
          </div>
          <button
            onClick={copyProblem}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600 shrink-0"
            title="Copy problem"
          >
            {copied ? (
              <CheckCircle className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Final answer */}
        <div className="mt-4 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-2">
            Answer
          </p>
          <p className="font-mono text-sm font-bold text-brand-800">{solution.finalAnswer}</p>
        </div>
      </div>

      {/* Graph visualization */}
      {hasGraph && (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-card p-6">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Graph</h3>
          <FunctionGraph
            expression={solution.graphFunction!}
            xMin={solution.graphXMin ?? -10}
            xMax={solution.graphXMax ?? 10}
          />
          <p className="mt-2 text-xs text-slate-400 text-center font-mono">
            f(x) = {solution.graphFunction}
          </p>
        </div>
      )}

      {/* Steps */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900">
            Solution — {solution.steps.length} steps
          </h3>
          <button
            onClick={() => {
              if (expandedSteps.size === solution.steps.length) {
                setExpandedSteps(new Set());
              } else {
                setExpandedSteps(new Set(solution.steps.map((s) => s.id)));
              }
            }}
            className="text-xs text-brand-600 hover:text-brand-700 transition-colors font-medium"
          >
            {expandedSteps.size === solution.steps.length ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div className="divide-y divide-slate-50">
          {solution.steps.map((step, index) => {
            const isExpanded = expandedSteps.has(step.id);
            const isLast = index === solution.steps.length - 1;

            return (
              <div key={step.id} className={cn(isLast && "border-b-0")}>
                <button
                  onClick={() => toggleStep(step.id)}
                  className="w-full flex items-start gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      isExpanded
                        ? "bg-brand-600 text-white"
                        : isLast
                        ? "bg-emerald-500 text-white"
                        : "bg-slate-100 text-slate-500"
                    )}
                  >
                    {isLast ? <CheckCircle className="h-3.5 w-3.5" /> : index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                  </div>

                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5 ml-11 animate-slide-down">
                    <p className="text-sm text-slate-600 leading-relaxed">{step.explanation}</p>
                    {step.math && <MathBlock math={step.math} />}
                    {step.hint && (
                      <div className="mt-3 rounded-xl border border-amber-100 bg-amber-50 px-4 py-2.5">
                        <p className="text-xs font-semibold text-amber-700 mb-1">Hint</p>
                        <p className="text-xs text-amber-600">{step.hint}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
