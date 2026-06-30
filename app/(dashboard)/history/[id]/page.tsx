"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SolutionSteps } from "@/components/solve/SolutionSteps";
import { cn } from "@/utils/cn";

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

export default function HistoryDetailPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const userId = (session?.user as any)?.id ?? session?.user?.email ?? "";

  const [problem, setProblem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !userId) return;
    supabase
      .from("solved_problems")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .single()
      .then(({ data }) => {
        setProblem(data);
        setLoading(false);
      });
  }, [id, userId]);

  if (loading) {
    return (
      <div className="p-8 max-w-3xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => <div key={i} className="h-24 rounded-2xl bg-slate-100 animate-pulse" />)}
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="p-8 text-center text-slate-400 text-sm">Problem not found.</div>
    );
  }

  const solution = {
    statement: problem.problem,
    topic: problem.topic,
    difficulty: problem.difficulty,
    finalAnswer: problem.final_answer,
    steps: problem.steps ?? [],
    solvedAt: new Date(problem.created_at),
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <button onClick={() => router.push("/history")}
        className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to history
      </button>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-start gap-3 flex-wrap">
          {problem.topic && (
            <span className="text-xs bg-slate-100 text-slate-600 rounded-lg px-2.5 py-1">{problem.topic}</span>
          )}
          {problem.difficulty && (
            <span className={cn("text-xs rounded-lg px-2.5 py-1 capitalize", difficultyColors[problem.difficulty] ?? "bg-slate-100 text-slate-600")}>
              {problem.difficulty}
            </span>
          )}
          <span className="text-xs text-slate-400 ml-auto">
            {new Date(problem.created_at).toLocaleDateString([], { month: "long", day: "numeric", year: "numeric" })}
          </span>
        </div>
        <p className="text-lg font-semibold text-slate-900 mt-3">{problem.problem}</p>
        {problem.final_answer && (
          <p className="text-sm text-slate-600 mt-2">Answer: <span className="font-medium text-slate-900">{problem.final_answer}</span></p>
        )}
      </div>

      <SolutionSteps solution={solution} />
    </div>
  );
}
