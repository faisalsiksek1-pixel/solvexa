import React from 'react'
import { cn } from '../../utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'blue' | 'green' | 'grey' | 'navy'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  className,
}) => {
  const variants = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    grey: 'bg-slate-100 text-slate-600 border-slate-200',
    navy: 'bg-[#1e3a8a]/10 text-[#1e3a8a] border-[#1e3a8a]/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
