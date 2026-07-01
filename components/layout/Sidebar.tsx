"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Timer,
  ChevronRight,
  GraduationCap,
  Inbox,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Avatar } from "@/components/ui/Avatar";
import { Logo, SolvexaAILogo } from "@/components/ui/Logo";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const navItems: { label: string; href: string; icon: LucideIcon | null; custom: boolean }[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, custom: false },
  { label: "Solvexa AI", href: "/solve", icon: null, custom: true },
  { label: "Tutors", href: "/tutors", icon: Users, custom: false },
  { label: "Messages", href: "/messages", icon: Inbox, custom: false },
  { label: "Community", href: "/community", icon: MessageSquare, custom: false },
  { label: "Pomodoro", href: "/pomodoro", icon: Timer, custom: false },
];

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const name = session?.user?.name ?? "";
  const [isTutor, setIsTutor] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/me").then((r) => r.json()).then((d) => {
      setIsTutor(d.role === "tutor");
      setAvatarUrl(d.avatar_url ?? null);
    });
  }, []);

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-100 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-5 border-b border-slate-100">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (pathname?.startsWith(item.href + "/") ?? false);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "sidebar-item",
                isActive ? "sidebar-item-active" : "sidebar-item-inactive"
              )}
            >
              {item.custom ? (
                <SolvexaAILogo className="text-[1rem]" />
              ) : (
                <>
                  {item.icon && <item.icon className={cn("h-4 w-4 shrink-0", isActive ? "text-brand-600" : "text-slate-500")} />}
                  <span className="flex-1">{item.label}</span>
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Tutor dashboard link */}
      {isTutor && (
        <div className="px-3 pb-2">
          <Link
            href="/tutor"
            className={cn(
              "sidebar-item",
              pathname === "/tutor" ? "sidebar-item-active" : "sidebar-item-inactive"
            )}
          >
            <GraduationCap className={cn("h-4 w-4 shrink-0", pathname === "/tutor" ? "text-brand-600" : "text-slate-500")} />
            <span className="flex-1">Tutor Dashboard</span>
          </Link>
        </div>
      )}

      {/* User profile */}
      <div className="border-t border-slate-100 p-3">
        <Link href="/profile" className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer group">
          <Avatar name={name} size="sm" src={avatarUrl} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{name}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </Link>
      </div>
    </aside>
  );
}
