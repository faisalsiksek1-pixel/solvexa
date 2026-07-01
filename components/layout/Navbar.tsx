"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/cn";
import { SolvexaLogo } from "@/components/ui/SolvexaLogo";

const navLinks = [
  { label: "Features", href: "#features" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className={cn(
          "mx-4 mt-4 rounded-2xl border transition-all duration-300",
          scrolled
            ? "border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm"
            : "border-white/10 bg-white/5 backdrop-blur-md"
        )}
      >
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <SolvexaLogo
              variant="mark"
              theme={scrolled ? "light" : "dark"}
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-150",
                  scrolled
                    ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              href="/login"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-xl transition-all duration-150",
                scrolled
                  ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
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
            className={cn(
              "md:hidden p-2 rounded-xl transition-colors",
              scrolled ? "hover:bg-slate-100 text-slate-700" : "hover:bg-white/10 text-white"
            )}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className={cn(
            "md:hidden border-t px-5 py-4 space-y-1 animate-slide-down",
            scrolled ? "border-slate-100" : "border-white/10"
          )}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                  scrolled
                    ? "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-white/10 mt-2">
              <Link
                href="/login"
                className="block text-center px-4 py-2.5 text-sm font-medium rounded-xl border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
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
