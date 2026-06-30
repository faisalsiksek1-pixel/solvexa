import * as React from "react";
import { cn } from "@/utils/cn";

interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  xs: "h-6 w-6 text-xs",
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
  xl: "h-16 w-16 text-xl",
};

const colors = [
  "bg-slate-600",
  "bg-indigo-600",
  "bg-teal-600",
  "bg-rose-600",
  "bg-violet-600",
];

function getColor(name: string): string {
  const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
  return colors[code % colors.length];
}

export function Avatar({ src, name = "?", size = "md", className }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const color = getColor(name);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={cn("rounded-full object-cover", sizeMap[size], className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-semibold text-white select-none shrink-0",
        color,
        sizeMap[size],
        className
      )}
      aria-label={name}
    >
      {initial}
    </div>
  );
}
