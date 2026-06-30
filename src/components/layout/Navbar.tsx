import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useScrollPosition } from '../../hooks/useScrollPosition'
import { cn } from '../../utils/cn'

const navLinks = [
  { label: 'Features', href: '/features' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
]

export const Navbar: React.FC = () => {
  const scrollY = useScrollPosition()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const scrolled = scrollY > 10

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm border-b border-[#e2e8f0] shadow-sm'
          : 'bg-white/80 backdrop-blur-sm'
      )}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-[#0a0f1e] font-extrabold text-xl tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center text-white text-sm font-bold">
            ∑
          </span>
          Solvexa
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
                location.pathname === link.href
                  ? 'text-[#2563eb] bg-blue-50'
                  : 'text-[#64748b] hover:text-[#0a0f1e] hover:bg-[#f1f5f9]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/signin"
            className="text-sm font-medium text-[#64748b] hover:text-[#0a0f1e] transition-colors px-3 py-2"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-[#2563eb] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-[#64748b] hover:text-[#0a0f1e] hover:bg-[#f1f5f9] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-b border-[#e2e8f0] overflow-hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                    location.pathname === link.href
                      ? 'text-[#2563eb] bg-blue-50'
                      : 'text-[#64748b] hover:text-[#0a0f1e] hover:bg-[#f1f5f9]'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-[#e2e8f0] mt-3 pt-3 flex flex-col gap-2">
                <Link
                  to="/signin"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-[#64748b] hover:text-[#0a0f1e] hover:bg-[#f1f5f9] rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="bg-[#2563eb] text-white text-sm font-semibold px-4 py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
