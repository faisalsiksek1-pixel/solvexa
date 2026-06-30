import { BookCheck, Flame, Trophy, Star, CheckCircle } from "lucide-react";
import type { ActivityEntry } from "@/types";
import { DifficultyBadge } from "@/components/ui/Badge";
import { formatTimeAgo } from "@/lib/mock-data";

interface ActivityFeedProps {
  activities: ActivityEntry[];
}

const activityIcons: Record<ActivityEntry["type"], React.ReactNode> = {
  solved: <BookCheck className="h-4 w-4 text-brand-600" />,
  practiced: <CheckCircle className="h-4 w-4 text-emerald-600" />,
  streak: <Flame className="h-4 w-4 text-amber-500" />,
  milestone: <Trophy className="h-4 w-4 text-violet-600" />,
  topic_complete: <Star className="h-4 w-4 text-amber-500" />,
};

const activityColors: Record<ActivityEntry["type"], string> = {
  solved: "bg-brand-50",
  practiced: "bg-emerald-50",
  streak: "bg-amber-50",
  milestone: "bg-violet-50",
  topic_complete: "bg-amber-50",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="rounded-2xl bg-white border border-slate-100 shadow-card">
      <div className="px-6 py-4 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-slate-50">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 px-6 py-4">
            <div
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${activityColors[activity.type]}`}
            >
              {activityIcons[activity.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-700 leading-snug">{activity.description}</p>
              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                {activity.topic && (
                  <span className="text-xs text-slate-500">{activity.topic}</span>
                )}
                {activity.difficulty && (
                  <DifficultyBadge difficulty={activity.difficulty} />
                )}
                {activity.xpEarned && (
                  <span className="text-xs font-semibold text-emerald-600">
                    +{activity.xpEarned} XP
                  </span>
                )}
              </div>
            </div>
            <span className="shrink-0 text-xs text-slate-400">
              {formatTimeAgo(activity.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
