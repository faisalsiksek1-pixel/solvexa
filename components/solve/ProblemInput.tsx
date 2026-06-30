"use client";

import { useState, useRef } from "react";
import { X, ChevronDown, ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import { TOPICS } from "@/lib/math-topics";

interface ProblemInputProps {
  onSolve: (problem: string, topic?: string) => void;
  isLoading: boolean;
  onReset?: () => void;
  hasSolution?: boolean;
}

const EXAMPLE_PROBLEMS = [
  "Solve: 2x² - 7x + 3 = 0",
  "Find the derivative of f(x) = x³sin(x)",
  "Prove that √2 is irrational",
  "Find the area under y = x² from x = 0 to x = 3",
  "Solve the system: 3x + 2y = 12, x - y = 1",
];

export function ProblemInput({ onSolve, isLoading, onReset, hasSolution }: ProblemInputProps) {
  const [problem, setProblem] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [showTopics, setShowTopics] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (problem.trim()) {
      onSolve(problem.trim(), selectedTopic || undefined);
    }
  }

  function handleExample(ex: string) {
    setProblem(ex);
    textareaRef.current?.focus();
  }

  function handleReset() {
    setProblem("");
    setSelectedTopic("");
    setImagePreview(null);
    setExtractError("");
    onReset?.();
    textareaRef.current?.focus();
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setExtractError("");
    setExtracting(true);

    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      setImagePreview(dataUrl);

      // Strip data:image/...;base64, prefix
      const base64 = dataUrl.split(",")[1];
      const mimeType = file.type;

      try {
        const res = await fetch("/api/extract", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageBase64: base64, mimeType }),
        });
        const data = await res.json();
        if (data.error) {
          setExtractError(data.error);
        } else {
          setProblem(data.problem);
          textareaRef.current?.focus();
        }
      } catch {
        setExtractError("Failed to read image. Please type the problem manually.");
      } finally {
        setExtracting(false);
        // Reset file input so same file can be re-uploaded
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    };
    reader.readAsDataURL(file);
  }

  const selectedTopicName = TOPICS.find((t) => t.id === selectedTopic)?.name;

  return (
    <div className="rounded-2xl bg-white border border-slate-200 shadow-card overflow-hidden">
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-slate-900">Your Problem</h2>
          {hasSolution && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
              New problem
            </button>
          )}
        </div>

        {/* Image preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img
              src={imagePreview}
              alt="Uploaded problem"
              className="h-24 rounded-xl border border-slate-200 object-contain bg-slate-50"
            />
            <button
              onClick={() => { setImagePreview(null); setExtractError(""); }}
              className="absolute -top-2 -right-2 bg-white border border-slate-200 rounded-full p-0.5 text-slate-400 hover:text-slate-700 transition-colors shadow-sm"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}

        {extractError && (
          <div className="mb-3 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
            {extractError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="Type your problem, or upload a photo of it…"
              className={cn(
                "w-full min-h-[140px] resize-none rounded-xl border bg-slate-50 px-4 py-3.5 text-sm font-mono text-slate-800 placeholder:text-slate-400 placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-400 focus:bg-white transition-all duration-150",
                "border-slate-200"
              )}
              disabled={isLoading || extracting}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleSubmit(e);
                }
              }}
            />
            {extracting && (
              <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-white/80">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Reading image…
                </div>
              </div>
            )}
          </div>

          {/* Topic selector + upload */}
          <div className="mt-3 flex items-center gap-2">
            <div className="relative flex-1">
              <button
                type="button"
                onClick={() => setShowTopics(!showTopics)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm transition-colors hover:bg-slate-50"
              >
                <span className={selectedTopicName ? "text-slate-800" : "text-slate-400"}>
                  {selectedTopicName ?? "Select topic (optional)"}
                </span>
                <ChevronDown className={cn("h-3.5 w-3.5 text-slate-400 transition-transform", showTopics && "rotate-180")} />
                {selectedTopic && (
                  <span
                    onClick={(e) => { e.stopPropagation(); setSelectedTopic(""); }}
                    className="ml-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-3.5 w-3.5" />
                  </span>
                )}
              </button>

              {showTopics && (
                <div className="absolute top-full left-0 mt-1 z-10 w-64 rounded-xl border border-slate-200 bg-white shadow-elevated overflow-hidden">
                  <div className="p-1.5 max-h-56 overflow-y-auto scrollbar-hide">
                    {TOPICS.map((topic) => (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => { setSelectedTopic(topic.id); setShowTopics(false); }}
                        className={cn(
                          "w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-left hover:bg-slate-50 transition-colors",
                          selectedTopic === topic.id && "bg-brand-50 text-brand-700"
                        )}
                      >
                        <span className="font-mono text-base w-5 text-center">{topic.icon}</span>
                        <span>{topic.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Image upload button */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || extracting}
              title="Upload a photo of your problem"
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors disabled:opacity-50"
            >
              <ImagePlus className="h-4 w-4" />
              <span className="hidden sm:inline">Upload photo</span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Button
              type="submit"
              size="lg"
              loading={isLoading}
              disabled={!problem.trim() || isLoading || extracting}
              className="flex-1"
            >
              {isLoading ? "Solving…" : "Solve with AI"}
            </Button>
          </div>

          <p className="mt-2 text-xs text-slate-400 text-center">
            Press <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono text-slate-500">⌘ Enter</kbd> to solve
          </p>
        </form>
      </div>

      {/* Example problems */}
      {!hasSolution && (
        <div className="border-t border-slate-100 px-6 py-4">
          <p className="text-xs font-medium text-slate-400 mb-2.5 uppercase tracking-wider">
            Try an example
          </p>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_PROBLEMS.map((ex) => (
              <button
                key={ex}
                onClick={() => handleExample(ex)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-all duration-150"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
