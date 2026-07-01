"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { SolvexaLogo } from "@/components/ui/SolvexaLogo";

const navLinks = [
  { label: "Features", href: "#features" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4 rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <SolvexaLogo variant="mark" theme="light" className="h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-150 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-150 text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-500 transition-colors shadow-sm"
            >
              Join Solvexa
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl transition-colors hover:bg-slate-100 text-slate-700"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 px-5 py-4 space-y-1 animate-slide-down">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-slate-100 mt-2">
              <Link
                href="/login"
                className="block text-center px-4 py-2.5 text-sm font-medium rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="block text-center px-4 py-2.5 text-sm font-semibold rounded-xl bg-brand-600 text-white hover:bg-brand-500 transition-colors"
              >
                Join Solvexa Free
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
