import Link from "next/link";
import { Search } from "lucide-react";
import type { Metadata } from "next";
import { TOPICS } from "@/lib/math-topics";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { MOCK_TOPIC_PROGRESS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Topics",
};

const progressMap = Object.fromEntries(
  MOCK_TOPIC_PROGRESS.map((p) => [p.topicId, p])
);

const colorGradients: Record<string, string> = {
  indigo: "from-indigo-50 to-indigo-100/50 border-indigo-100",
  emerald: "from-emerald-50 to-emerald-100/50 border-emerald-100",
  violet: "from-violet-50 to-violet-100/50 border-violet-100",
  amber: "from-amber-50 to-amber-100/50 border-amber-100",
  rose: "from-rose-50 to-rose-100/50 border-rose-100",
  cyan: "from-cyan-50 to-cyan-100/50 border-cyan-100",
  teal: "from-teal-50 to-teal-100/50 border-teal-100",
  fuchsia: "from-fuchsia-50 to-fuchsia-100/50 border-fuchsia-100",
};

const colorText: Record<string, string> = {
  indigo: "text-indigo-700",
  emerald: "text-emerald-700",
  violet: "text-violet-700",
  amber: "text-amber-700",
  rose: "text-rose-700",
  cyan: "text-cyan-700",
  teal: "text-teal-700",
  fuchsia: "text-fuchsia-700",
};

const colorProgress: Record<string, "brand" | "emerald" | "amber" | "violet" | "rose"> = {
  indigo: "brand",
  emerald: "emerald",
  violet: "violet",
  amber: "amber",
  rose: "rose",
  cyan: "brand",
  teal: "emerald",
  fuchsia: "violet",
};

export default function TopicsPage() {
  return (
    <div className="page-transition p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Topics</h1>
          <p className="text-sm text-slate-500">
            Browse all curriculum-aligned topics and practice problems.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics…"
            className="input-base pl-9 w-56"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All Topics"].map(
          (tab, i) => (
            <button
              key={tab}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                i === 0
                  ? "bg-brand-600 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Topics grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {TOPICS.map((topic) => {
          const progress = progressMap[topic.id];
          const pct = progress
            ? Math.round((progress.solved / progress.total) * 100)
            : 0;
          const gradientClass = colorGradients[topic.color] ?? colorGradients.indigo;
          const textClass = colorText[topic.color] ?? "text-indigo-700";
          const progressColor = colorProgress[topic.color] ?? "brand";

          return (
            <Link
              key={topic.id}
              href={`/topics/${topic.slug}`}
              className={`group rounded-2xl border bg-gradient-to-br p-5 transition-all duration-200 hover:shadow-card-hover hover:-translate-y-0.5 ${gradientClass}`}
            >
              {/* Icon + badges */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl">{topic.icon}</span>
                <div className="flex gap-1.5">
                  <DifficultyBadge difficulty={topic.difficulty} />
                </div>
              </div>

              {/* Name + description */}
              <h3 className={`text-base font-bold mb-1 ${textClass}`}>{topic.name}</h3>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                {topic.description}
              </p>

              {/* Progress or problem count */}
              {progress ? (
                <div>
                  <Progress
                    value={pct}
                    color={progressColor}
                    size="sm"
                  />
                  <div className="mt-2 flex justify-between text-xs text-slate-500">
                    <span>{progress.solved}/{progress.total} solved</span>
                    <span className="font-medium text-slate-700">{pct}%</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">{topic.problemCount} problems</span>
                  <span className={`font-semibold ${textClass} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Start →
                  </span>
                </div>
              )}

            </Link>
          );
        })}
      </div>
    </div>
  );
}
