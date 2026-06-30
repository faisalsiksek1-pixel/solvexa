"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Logo } from "@/components/ui/Logo";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-violet-700 to-brand-600 px-16 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />
        <div className="relative text-center max-w-md">
          <div className="mb-8 space-y-3">
            {["∑ Mathematics", "∫ Calculus", "θ Trigonometry", "σ Statistics"].map((s, i) => (
              <div key={s} className="rounded-2xl bg-white/10 backdrop-blur-sm px-6 py-3 text-left" style={{ marginLeft: `${i % 2 === 0 ? 0 : 24}px` }}>
                <p className="text-white font-semibold">{s}</p>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Every topic. <br />Every step. Explained.</h2>
          <p className="text-white/70 leading-relaxed">Start for free and join thousands of students mastering mathematics.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="inline-block mb-10">
            <Logo />
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-sm text-slate-500 mb-8">Free to start — no credit card required.</p>

          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <GoogleIcon />
            Sign up with Google
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}
