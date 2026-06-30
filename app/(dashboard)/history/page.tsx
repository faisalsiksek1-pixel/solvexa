"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { History, ChevronRight, BookOpen, Search, Trash2 } from "lucide-react";
import { cn } from "@/utils/cn";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type SolvedProblem = {
  id: string;
  problem: string;
  topic: string;
  difficulty: string;
  final_answer: string;
  steps: any[];
  created_at: string;
};

const difficultyColors: Record<string, string> = {
  foundation: "bg-emerald-50 text-emerald-700",
  standard: "bg-blue-50 text-blue-700",
  advanced: "bg-amber-50 text-amber-700",
  extension: "bg-rose-50 text-rose-700",
};

export default function HistoryPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const userId = (session?.user as any)?.id ?? session?.user?.email ?? "";

  const [problems, setProblems] = useState<SolvedProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("solved_problems")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setProblems(data);
        setLoading(false);
      });
  }, [userId]);

  async function deleteProblem(id: string) {
    setDeleting(id);
    await supabase.from("solved_problems").delete().eq("id", id);
    setProblems((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  function formatDate(ts: string) {
    return new Date(ts).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
  }

  function formatTime(ts: string) {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  const filtered = problems.filter(
    (p) =>
      p.problem.toLowerCase().includes(search.toLowerCase()) ||
      p.topic?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Problem History</h1>
          <p className="text-sm text-slate-500 mt-1">
            {problems.length} problem{problems.length !== 1 ? "s" : ""} solved
          </p>
        </div>
        <button
          onClick={() => router.push("/solve")}
          className="flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition">
          <BookOpen className="h-4 w-4" /> Solve new
        </button>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search problems or topics…"
          className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 transition"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-20 rounded-2xl bg-slate-100 animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <History className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-sm font-medium text-slate-600">
            {search ? "No matching problems" : "No problems solved yet"}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            {search ? "Try a different search" : "Head to Solvexa AI to get started"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-2xl border border-slate-200 px-5 py-4 flex items-center gap-4 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => router.push(`/history/${p.id}`)}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{p.problem}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  {p.topic && (
                    <span className="text-xs text-slate-500 bg-slate-100 rounded-lg px-2 py-0.5">{p.topic}</span>
                  )}
                  {p.difficulty && (
                    <span className={cn("text-xs rounded-lg px-2 py-0.5 capitalize", difficultyColors[p.difficulty] ?? "bg-slate-100 text-slate-600")}>
                      {p.difficulty}
                    </span>
                  )}
                  <span className="text-xs text-slate-400">{formatDate(p.created_at)} · {formatTime(p.created_at)}</span>
                </div>
                {p.final_answer && (
                  <p className="text-xs text-slate-500 mt-1 truncate">Answer: {p.final_answer}</p>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); deleteProblem(p.id); }}
                  disabled={deleting === p.id}
                  className="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition opacity-0 group-hover:opacity-100">
                  <Trash2 className="h-4 w-4" />
                </button>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
