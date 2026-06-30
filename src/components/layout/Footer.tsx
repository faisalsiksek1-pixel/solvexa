import React from 'react'
import { Link } from 'react-router-dom'

const footerLinks = {
  Product: [
    { label: 'Features', href: '/features' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
}

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0f1e] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight mb-4">
              <span className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center text-white text-sm font-bold">
                ∑
              </span>
              Solvexa
            </Link>
            <p className="text-[#94a3b8] text-sm leading-relaxed max-w-xs">
              Master Mathematics with AI. Learn faster, think smarter, and unlock your full potential in math.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/signup"
                className="bg-[#2563eb] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors"
              >
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-[#64748b] uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-[#94a3b8] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1e293b] mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#475569]">
            &copy; {new Date().getFullYear()} Solvexa. All rights reserved.
          </p>
          <p className="text-sm text-[#475569]">
            Built for learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  )
}
