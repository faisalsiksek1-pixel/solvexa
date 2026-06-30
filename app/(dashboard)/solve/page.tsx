"use client";

import { useState, useEffect } from "react";
import { ProblemInput } from "@/components/solve/ProblemInput";
import { SolutionSteps } from "@/components/solve/SolutionSteps";
import { useSolver } from "@/hooks/useSolver";
import { SolvexaAILogo } from "@/components/ui/Logo";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/cn";
import { History, ChevronRight } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const difficultyColors: Record<string, string> = {
  foundation: "bg-emerald-50 text-emerald-700",
  standard: "bg-blue-50 text-blue-700",
  advanced: "bg-amber-50 text-amber-700",
  extension: "bg-rose-50 text-rose-700",
};

type HistoryItem = {
  id: string;
  problem: string;
  topic: string;
  difficulty: string;
  final_answer: string;
  created_at: string;
};

export default function SolvePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = (session?.user as any)?.id ?? session?.user?.email ?? undefined;
  const { solution, isLoading, error, solve, reset } = useSolver(userId);

  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("solved_problems")
      .select("id, problem, topic, difficulty, final_answer, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20)
      .then(({ data }) => { if (data) setHistory(data); });
  }, [userId, solution]);

  function formatDate(ts: string) {
    const d = new Date(ts);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return d.toLocaleDateString([], { month: "short", day: "numeric" });
  }

  return (
    <div className="flex h-full" style={{ minHeight: "calc(100vh - 64px)" }}>
      {/* History sidebar */}
      <div className={cn(
        "shrink-0 border-r border-slate-100 bg-white flex flex-col transition-all duration-200 overflow-hidden",
        showHistory ? "w-72" : "w-0"
      )}>
        <div className="px-4 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent solves</p>
          <button onClick={() => router.push("/history")} className="text-xs text-brand-600 hover:underline">See all</button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {history.length === 0 ? (
            <p className="text-xs text-slate-400 text-center py-8 px-4">No history yet. Solve a problem to get started.</p>
          ) : (
            <div className="p-2 space-y-1">
              {history.map((h) => (
                <button
                  key={h.id}
                  onClick={() => router.push(`/history/${h.id}`)}
                  className="w-full text-left rounded-xl px-3 py-2.5 hover:bg-slate-50 transition group"
                >
                  <p className="text-xs font-medium text-slate-800 truncate leading-snug">{h.problem}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    {h.topic && <span className="text-xs text-slate-400">{h.topic}</span>}
                    {h.difficulty && (
                      <span className={cn("text-xs rounded px-1.5 py-0.5 capitalize", difficultyColors[h.difficulty] ?? "bg-slate-100 text-slate-500")}>
                        {h.difficulty}
                      </span>
                    )}
                    <span className="text-xs text-slate-300 ml-auto">{formatDate(h.created_at)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main solve area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-3xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <SolvexaAILogo className="text-[2rem]" />
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={cn(
                "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition",
                showHistory
                  ? "border-brand-400 bg-brand-50 text-brand-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              )}
            >
              <History className="h-3.5 w-3.5" />
              History
              {history.length > 0 && (
                <span className={cn("rounded-full px-1.5 py-0.5 text-xs font-bold",
                  showHistory ? "bg-brand-100 text-brand-700" : "bg-slate-100 text-slate-600")}>
                  {history.length}
                </span>
              )}
            </button>
          </div>

          <ProblemInput
            onSolve={solve}
            isLoading={isLoading}
            onReset={reset}
            hasSolution={!!solution}
          />

          {error && (
            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {isLoading && (
            <div className="mt-6 space-y-4 animate-pulse">
              <div className="rounded-2xl bg-white border border-slate-100 p-6 space-y-3">
                <div className="skeleton h-4 w-1/3 rounded-lg" />
                <div className="skeleton h-4 w-2/3 rounded-lg" />
                <div className="skeleton h-12 w-full rounded-xl" />
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-xl bg-white border border-slate-100 p-4 flex gap-3">
                  <div className="skeleton h-7 w-7 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="skeleton h-3 w-1/4 rounded" />
                    <div className="skeleton h-3 w-3/4 rounded" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {solution && !isLoading && (
            <div className="mt-6">
              <SolutionSteps solution={solution} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
