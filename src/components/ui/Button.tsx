import React from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'outline' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  as?: 'button' | 'a'
  href?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  as: Tag = 'button',
  href,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'

  const variants = {
    primary:
      'bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:bg-[#1e40af] shadow-sm hover:shadow-md',
    ghost:
      'bg-transparent text-[#0a0f1e] hover:bg-[#f1f5f9] border border-transparent',
    outline:
      'bg-transparent text-[#2563eb] border border-[#2563eb] hover:bg-[#eff6ff]',
    secondary:
      'bg-[#f1f5f9] text-[#0a0f1e] hover:bg-[#e2e8f0]',
  }

  const sizes = {
    sm: 'text-sm px-4 py-2',
    md: 'text-sm px-5 py-2.5',
    lg: 'text-base px-7 py-3.5',
  }

  if (Tag === 'a') {
    return (
      <a
        href={href}
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
