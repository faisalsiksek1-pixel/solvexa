import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

const links = [
  { label: "Pricing", href: "#pricing" },
  { label: "Tutors", href: "#tutors" },
  { label: "Contact", href: "mailto:hello@solvexa.app" },
  { label: "Privacy Policy", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Logo />
          <div className="flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
              >
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
