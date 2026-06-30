"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RotateCcw, SkipForward, Volume2, VolumeX } from "lucide-react";

const THEMES = [
  { name: "Midnight", bg: "from-slate-900 to-indigo-950", ring: "#6366f1", text: "text-indigo-400", dot: "bg-indigo-500", card: "bg-white/5", border: "border-white/10" },
  { name: "Forest",   bg: "from-emerald-950 to-green-900", ring: "#10b981", text: "text-emerald-400", dot: "bg-emerald-500", card: "bg-white/5", border: "border-white/10" },
  { name: "Sunset",   bg: "from-orange-950 to-rose-900",  ring: "#f97316", text: "text-orange-400", dot: "bg-orange-500", card: "bg-white/5", border: "border-white/10" },
  { name: "Ocean",    bg: "from-cyan-950 to-blue-900",    ring: "#06b6d4", text: "text-cyan-400", dot: "bg-cyan-500", card: "bg-white/5", border: "border-white/10" },
  { name: "Rose",     bg: "from-rose-950 to-pink-900",    ring: "#f43f5e", text: "text-rose-400", dot: "bg-rose-500", card: "bg-white/5", border: "border-white/10" },
];

const DEFAULT_DURATIONS = { focus: 25, short: 5, long: 15 };

type Mode = "focus" | "short" | "long";

const MODE_LABELS: Record<Mode, string> = {
  focus: "Focus",
  short: "Short Break",
  long: "Long Break",
};

function playTone(ctx: AudioContext, freq: number, duration: number, delay = 0) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.value = freq;
  osc.type = "sine";
  gain.gain.setValueAtTime(0, ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + delay + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + duration);
}

function ringBell(ctx: AudioContext) {
  playTone(ctx, 880, 0.8, 0);
  playTone(ctx, 1100, 0.6, 0.3);
  playTone(ctx, 880, 0.8, 0.7);
}

export default function PomodoroPage() {
  const [themeIdx, setThemeIdx] = useState(0);
  const [mode, setMode] = useState<Mode>("focus");
  const [durations, setDurations] = useState(DEFAULT_DURATIONS);
  const [seconds, setSeconds] = useState(DEFAULT_DURATIONS.focus * 60);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [task, setTask] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [autoNext, setAutoNext] = useState(false);
  const [editingDuration, setEditingDuration] = useState<Mode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const theme = THEMES[themeIdx];

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  };

  const switchMode = useCallback((m: Mode, d = durations) => {
    setMode(m);
    setRunning(false);
    setSeconds(d[m] * 60);
  }, [durations]);

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(durations[mode] * 60);
  }, [durations, mode]);

  const skip = useCallback(() => {
    const next: Mode = mode === "focus"
      ? (sessions + 1) % 4 === 0 ? "long" : "short"
      : "focus";
    switchMode(next);
  }, [mode, sessions, switchMode]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          if (soundOn) ringBell(getCtx());
          if (mode === "focus") setSessions((n) => n + 1);
          if (autoNext) {
            const next: Mode = mode === "focus"
              ? (sessions + 1) % 4 === 0 ? "long" : "short"
              : "focus";
            setTimeout(() => switchMode(next), 500);
          }
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, mode, soundOn, autoNext, sessions, switchMode]);

  const total = durations[mode] * 60;
  const progress = total === 0 ? 0 : ((total - seconds) / total) * 100;
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const circumference = 2 * Math.PI * 54;

  function handleDurationEdit(m: Mode, val: string) {
    const n = Math.max(1, Math.min(99, parseInt(val) || 1));
    const next = { ...durations, [m]: n };
    setDurations(next);
    if (m === mode && !running) setSeconds(n * 60);
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} flex flex-col`}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-8 py-5">
        <span className="text-white/40 text-sm font-medium tracking-wide uppercase">Pomodoro</span>
        <div className="flex items-center gap-2">
          {THEMES.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setThemeIdx(i)}
              title={t.name}
              className={`h-5 w-5 rounded-full ${t.dot} transition-all ${themeIdx === i ? "ring-2 ring-white/60 scale-110" : "opacity-50 hover:opacity-80"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setSoundOn((s) => !s)}
          className="text-white/40 hover:text-white/80 transition-colors"
        >
          {soundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-12">

        {/* Task input */}
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What are you working on?"
          className="bg-transparent border-b border-white/20 text-white/80 placeholder-white/30 text-center text-sm outline-none w-full max-w-xs pb-1 focus:border-white/50 transition-colors"
        />

        {/* Mode tabs */}
        <div className={`flex gap-1 rounded-xl ${theme.card} border ${theme.border} p-1`}>
          {(["focus", "short", "long"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                mode === m
                  ? "bg-white/15 text-white"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Timer ring */}
        <div className="relative flex h-64 w-64 items-center justify-center">
          <svg className="-rotate-90 absolute inset-0" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke={theme.ring}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress / 100)}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="text-center">
            <span className="text-6xl font-bold text-white tabular-nums tracking-tight">
              {mins}:{secs}
            </span>
            <p className={`text-xs mt-1 ${theme.text} font-medium`}>{MODE_LABELS[mode]}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-5">
          <button
            onClick={reset}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setRunning((r) => !r)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-slate-900 shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            {running ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-0.5" />}
          </button>
          <button
            onClick={skip}
            className="flex h-11 w-11 items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/10 transition-all"
          >
            <SkipForward className="h-4 w-4" />
          </button>
        </div>

        {/* Session dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full transition-all ${
                i < sessions % 4
                  ? theme.dot
                  : "bg-white/15"
              }`}
            />
          ))}
          {sessions > 0 && (
            <span className="ml-2 text-xs text-white/40">{sessions} done</span>
          )}
        </div>

        {/* Settings row */}
        <div className={`flex items-center gap-6 rounded-2xl ${theme.card} border ${theme.border} px-6 py-4`}>
          {/* Duration editors */}
          {(["focus", "short", "long"] as Mode[]).map((m) => (
            <div key={m} className="flex flex-col items-center gap-1">
              <span className="text-xs text-white/30">{MODE_LABELS[m]}</span>
              {editingDuration === m ? (
                <input
                  type="number"
                  defaultValue={durations[m]}
                  min={1} max={99}
                  autoFocus
                  onBlur={(e) => { handleDurationEdit(m, e.target.value); setEditingDuration(null); }}
                  onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                  className="w-12 bg-white/10 text-white text-center text-sm rounded-lg py-0.5 outline-none"
                />
              ) : (
                <button
                  onClick={() => setEditingDuration(m)}
                  className={`text-sm font-semibold text-white/80 hover:${theme.text} transition-colors tabular-nums`}
                >
                  {durations[m]}m
                </button>
              )}
            </div>
          ))}

          <div className="w-px h-8 bg-white/10" />

          {/* Auto-next toggle */}
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs text-white/30">Auto-next</span>
            <button
              onClick={() => setAutoNext((a) => !a)}
              className={`relative h-5 w-9 rounded-full transition-colors ${autoNext ? theme.dot : "bg-white/15"}`}
            >
              <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${autoNext ? "left-4" : "left-0.5"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
