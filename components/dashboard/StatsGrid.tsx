import { Flame, Target, BookCheck, Clock } from "lucide-react";
import type { UserStats } from "@/types";
import { Progress } from "@/components/ui/Progress";

interface StatsGridProps {
  stats: UserStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const xpPercent = Math.round((stats.xp / stats.xpToNextLevel) * 100);

  const cards = [
    {
      label: "Problems Solved",
      value: stats.problemsSolved.toLocaleString(),
      subtext: `+12 this week`,
      icon: BookCheck,
      color: "bg-brand-50 text-brand-600",
      trend: "up",
    },
    {
      label: "Current Streak",
      value: `${stats.currentStreak} days`,
      subtext: `Best: ${stats.longestStreak} days`,
      icon: Flame,
      color: "bg-amber-50 text-amber-500",
      trend: "up",
    },
    {
      label: "Accuracy",
      value: `${stats.accuracy}%`,
      subtext: `+3% vs last week`,
      icon: Target,
      color: "bg-emerald-50 text-emerald-600",
      trend: "up",
    },
    {
      label: "Time Practiced",
      value: `${Math.floor(stats.totalMinutes / 60)}h ${stats.totalMinutes % 60}m`,
      subtext: `~${Math.round(stats.totalMinutes / 30)} sessions`,
      icon: Clock,
      color: "bg-violet-50 text-violet-600",
      trend: "neutral",
    },
  ];

  return (
    <div className="space-y-4">
      {/* Level + XP card */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-600 to-violet-700 p-6 text-white">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-medium text-white/70 uppercase tracking-wider mb-1">
              Your Level
            </p>
            <p className="text-3xl font-bold">Level {stats.level}</p>
          </div>
          <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <span className="text-2xl font-bold">{stats.level}</span>
          </div>
        </div>
        <Progress
          value={xpPercent}
          color="brand"
          size="md"
          className="bg-white/20"
        />
        <div className="mt-2 flex justify-between text-xs text-white/70">
          <span>{stats.xp.toLocaleString()} XP</span>
          <span>{stats.xpToNextLevel.toLocaleString()} XP</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="stat-card">
              <div className={`mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl ${card.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <p className="text-2xl font-bold text-slate-900">{card.value}</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">{card.label}</p>
              <p className="mt-1 text-xs text-emerald-600">{card.subtext}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
