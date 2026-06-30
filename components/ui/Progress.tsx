"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/utils/cn";

interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number;
  color?: "brand" | "emerald" | "amber" | "violet" | "rose";
  size?: "sm" | "md" | "lg";
  label?: string;
  showValue?: boolean;
}

const colorStyles = {
  brand: "bg-gradient-to-r from-brand-500 to-brand-600",
  emerald: "bg-gradient-to-r from-emerald-400 to-emerald-500",
  amber: "bg-gradient-to-r from-amber-400 to-amber-500",
  violet: "bg-gradient-to-r from-violet-500 to-violet-600",
  rose: "bg-gradient-to-r from-rose-400 to-rose-500",
};

const sizeStyles = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

export function Progress({
  className,
  value = 0,
  color = "brand",
  size = "md",
  label,
  showValue = false,
  ...props
}: ProgressProps) {
  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="mb-1.5 flex items-center justify-between">
          {label && <span className="text-xs font-medium text-slate-600">{label}</span>}
          {showValue && (
            <span className="text-xs font-semibold text-slate-900">{Math.round(value)}%</span>
          )}
        </div>
      )}
      <ProgressPrimitive.Root
        className={cn(
          "relative overflow-hidden rounded-full bg-slate-100",
          sizeStyles[size],
          className
        )}
        {...props}
        value={value}
      >
        <ProgressPrimitive.Indicator
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorStyles[color])}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
