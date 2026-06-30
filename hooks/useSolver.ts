"use client";

import { useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import type { Solution } from "@/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface SolverState {
  solution: Solution | null;
  isLoading: boolean;
  error: string | null;
}

interface UseSolverReturn extends SolverState {
  solve: (problem: string, topic?: string) => Promise<void>;
  reset: () => void;
}

export function useSolver(userId?: string): UseSolverReturn {
  const [state, setState] = useState<SolverState>({
    solution: null,
    isLoading: false,
    error: null,
  });

  const solve = useCallback(async (problem: string, topic?: string) => {
    if (!problem.trim()) {
      setState((prev) => ({ ...prev, error: "Please enter a math problem to solve." }));
      return;
    }

    setState({ solution: null, isLoading: true, error: null });

    try {
      const res = await fetch("/api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problem, topic }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setState({ solution: null, isLoading: false, error: data.error ?? "Something went wrong." });
        return;
      }

      setState({ solution: { ...data, solvedAt: new Date(data.solvedAt) }, isLoading: false, error: null });

      if (userId) {
        supabase.from("solved_problems").insert({
          user_id: userId,
          problem: data.statement ?? problem,
          topic: data.topic,
          difficulty: data.difficulty,
          final_answer: data.finalAnswer,
          steps: data.steps,
        });
      }
    } catch {
      setState({ solution: null, isLoading: false, error: "Something went wrong. Please try again." });
    }
  }, []);

  const reset = useCallback(() => {
    setState({ solution: null, isLoading: false, error: null });
  }, []);

  return { ...state, solve, reset };
}
