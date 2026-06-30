"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useState, useRef, useEffect } from "react";
import { Mail, Instagram, X } from "lucide-react";

function ContactMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
      >
        Contact
      </button>

      {open && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-56 rounded-2xl border border-slate-100 bg-white shadow-xl p-3 space-y-1 z-50">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 pb-1">Get in touch</p>

          <a href="mailto:solvexa.math@gmail.com"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
            <Mail className="h-4 w-4 text-slate-400 shrink-0" />
            solvexa.math@gmail.com
          </a>

          <div className="border-t border-slate-100 my-1" />
          <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 px-2 pb-1">Instagram</p>

          <a href="https://www.instagram.com/solvexamath/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
            <Instagram className="h-4 w-4 text-slate-400 shrink-0" />
            @solvexamath
          </a>
          <a href="https://www.instagram.com/solvexamath.france/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
            <Instagram className="h-4 w-4 text-slate-400 shrink-0" />
            @solvexamath.france
          </a>
          <a href="https://www.instagram.com/solvexamath.brasil/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
            <Instagram className="h-4 w-4 text-slate-400 shrink-0" />
            @solvexamath.brasil
          </a>
        </div>
      )}
    </div>
  );
}

const links = [
  { label: "Privacy Policy", href: "/privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Logo />
          <div className="flex items-center gap-6">
            <ContactMenu />
            {links.map((link) => (
              <Link key={link.label} href={link.href}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Solvexa. All rights reserved.</p>
          <p className="text-sm text-slate-400">For students, by students.</p>
        </div>
      </div>
    </footer>
  );
}
