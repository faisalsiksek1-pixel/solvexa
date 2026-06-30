import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { TopicProgress } from "@/types";
import { Progress } from "@/components/ui/Progress";

interface TopicProgressProps {
  topics: TopicProgress[];
}

const colorToProgressColor: Record<string, "brand" | "emerald" | "amber" | "violet" | "rose"> = {
  indigo: "brand",
  emerald: "emerald",
  amber: "amber",
  violet: "violet",
  rose: "rose",
  cyan: "brand",
  teal: "emerald",
  fuchsia: "violet",
};

const colorToBg: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  violet: "bg-violet-50 text-violet-700",
  rose: "bg-rose-50 text-rose-700",
  cyan: "bg-cyan-50 text-cyan-700",
};

export function TopicProgressList({ topics }: TopicProgressProps) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Topic Progress</h3>
        <Link
          href="/topics"
          className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="p-6 space-y-5">
        {topics.map((topic) => {
          const pct = Math.round((topic.solved / topic.total) * 100);
          const progressColor = colorToProgressColor[topic.color] ?? "brand";
          const bgColor = colorToBg[topic.color] ?? "bg-brand-50 text-brand-700";

          return (
            <div key={topic.topicId}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${bgColor}`}>
                    {topic.topicName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">
                    {topic.solved}/{topic.total}
                  </span>
                  <span className="text-emerald-600 font-medium">{topic.accuracy}% acc.</span>
                </div>
              </div>
              <Progress value={pct} color={progressColor} size="sm" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
