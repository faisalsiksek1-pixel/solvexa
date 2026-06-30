"use client";

import Link from "next/link";
import { Users, MessageSquare, Timer } from "lucide-react";
import { useSession } from "next-auth/react";
import { SolvexaAILogo } from "@/components/ui/Logo";

const cards = [
  {
    label: "Solvexa AI",
    description: "Get step-by-step solutions to any math problem.",
    href: "/solve",
    icon: null,
    gradient: "",
  },
  {
    label: "Tutors",
    description: "Book a session with a verified math tutor.",
    href: "/tutors",
    icon: Users,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    label: "Community",
    description: "Ask questions and help others in the forum.",
    href: "/community",
    icon: MessageSquare,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    label: "Pomodoro",
    description: "Stay focused with timed study sessions.",
    href: "/pomodoro",
    icon: Timer,
    gradient: "from-rose-500 to-pink-600",
  },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const name = session?.user?.name?.split(" ")[0] ?? "";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10">
        <p className="text-sm text-slate-500 mb-1">{greeting}</p>
        <h1 className="text-2xl font-bold text-slate-900">{name}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-2xl bg-white border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
            >
              {card.href === "/solve" ? (
                <SolvexaAILogo className="text-[1.5rem] mb-3 block" />
              ) : (
                <>
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-1">{card.label}</h3>
                </>
              )}
              <p className="text-sm text-slate-500">{card.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
