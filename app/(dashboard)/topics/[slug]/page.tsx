import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import { getTopicBySlug, TOPICS } from "@/lib/math-topics";
import { DifficultyBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { MOCK_TOPIC_PROGRESS } from "@/lib/mock-data";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopicBySlug(params.slug);
  if (!topic) return { title: "Topic not found" };
  return { title: topic.name };
}

const sampleProblems: Record<string, { statement: string; difficulty: string }[]> = {
  algebra: [
    { statement: "Solve for x: 3x + 5 = 20", difficulty: "foundation" },
    { statement: "Factor completely: x² - 5x + 6", difficulty: "standard" },
    { statement: "Solve the system: 2x + y = 7, x - 3y = -1", difficulty: "standard" },
    { statement: "Find all roots of 2x³ - 3x² - 11x + 6 = 0", difficulty: "advanced" },
  ],
  calculus: [
    { statement: "Find d/dx [x³ + 4x² - 7x + 2]", difficulty: "foundation" },
    { statement: "Find the derivative of f(x) = x²sin(x)", difficulty: "standard" },
    { statement: "Evaluate ∫₀² (3x² - 2x + 1) dx", difficulty: "standard" },
    { statement: "Use L'Hôpital's rule to find lim_{x→0} sin(x)/x", difficulty: "advanced" },
  ],
  trigonometry: [
    { statement: "If sin(θ) = 3/5, find cos(θ) and tan(θ)", difficulty: "foundation" },
    { statement: "Prove: sin²(x) + cos²(x) = 1", difficulty: "standard" },
    { statement: "Solve: 2sin²(x) - sin(x) - 1 = 0 for 0 ≤ x < 2π", difficulty: "advanced" },
  ],
  geometry: [
    { statement: "Find the area of a triangle with sides 5, 12, and 13 cm", difficulty: "foundation" },
    { statement: "Prove that the diagonals of a parallelogram bisect each other", difficulty: "standard" },
    { statement: "A circle has centre O. Prove that the angle at the centre is twice the angle at the circumference", difficulty: "advanced" },
  ],
};

export default function TopicDetailPage({ params }: Props) {
  const topic = getTopicBySlug(params.slug);
  if (!topic) notFound();

  const progress = MOCK_TOPIC_PROGRESS.find((p) => p.topicId === topic.id);
  const pct = progress ? Math.round((progress.solved / progress.total) * 100) : 0;
  const problems = sampleProblems[topic.slug] ?? sampleProblems.algebra;

  return (
    <div className="page-transition p-8 max-w-5xl mx-auto">
      {/* Back */}
      <Link
        href="/topics"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        All Topics
      </Link>

      {/* Topic header */}
      <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 p-8 text-white mb-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">{topic.icon}</span>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold">{topic.name}</h1>
                  <DifficultyBadge difficulty={topic.difficulty} />
                </div>
                <div className="flex gap-1.5">
                  {topic.curriculum.map((c) => (
                    <span key={c} className="text-xs text-white/70">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed max-w-2xl text-sm">
              {topic.description}
            </p>
          </div>

          <div className="hidden sm:block text-right">
            <p className="text-3xl font-bold">{topic.problemCount}</p>
            <p className="text-xs text-white/60">problems</p>
          </div>
        </div>

        {/* Progress */}
        {progress && (
          <div className="mt-6">
            <div className="flex justify-between text-xs text-white/70 mb-2">
              <span>Your progress</span>
              <span>{progress.solved}/{progress.total} solved</span>
            </div>
            <Progress value={pct} color="brand" size="md" className="bg-white/20" />
          </div>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Subtopics */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">Subtopics</h2>
          {topic.subtopics.map((sub) => (
            <div
              key={sub.id}
              className="rounded-xl border border-slate-100 bg-white p-4 hover:border-brand-200 hover:shadow-card-hover transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900 mb-1">{sub.name}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{sub.description}</p>
                  <p className="mt-2 text-xs text-slate-400">{sub.problemCount} problems</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-500 transition-colors shrink-0 mt-0.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Practice problems */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-900">Practice Problems</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/solve">Solve with AI</Link>
            </Button>
          </div>

          <div className="space-y-3">
            {problems.map((problem, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-100 bg-white p-5 hover:border-brand-200 hover:shadow-card-hover transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-600 group-hover:bg-brand-50 group-hover:text-brand-700 transition-colors">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-sm text-slate-800 leading-relaxed mb-2">
                      {problem.statement}
                    </p>
                    <div className="flex items-center gap-2">
                      <DifficultyBadge difficulty={problem.difficulty} />
                      <span className="text-xs text-slate-400">{topic.name}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/solve?q=${encodeURIComponent(problem.statement)}`}>
                        Solve
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <Button variant="outline" size="md">
              Load More Problems
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
