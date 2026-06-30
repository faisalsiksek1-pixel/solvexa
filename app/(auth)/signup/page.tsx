import Link from "next/link";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Logo } from "@/components/ui/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel — illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-violet-700 to-brand-600 px-16 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/5" />

        <div className="relative text-center max-w-md">
          <div className="mb-8 space-y-3">
            {["∑ Mathematics", "∫ Calculus", "θ Trigonometry", "σ Statistics"].map((s, i) => (
              <div
                key={s}
                className="rounded-2xl bg-white/10 backdrop-blur-sm px-6 py-3 text-left"
                style={{ marginLeft: `${i % 2 === 0 ? 0 : 24}px` }}
              >
                <p className="text-white font-semibold">{s}</p>
              </div>
            ))}
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Every topic. <br />
            Every step. Explained.
          </h2>
          <p className="text-white/70 leading-relaxed">
            Start for free and join thousands of students mastering mathematics.
          </p>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm">
          <Link href="/" className="inline-block mb-10">
            <Logo />
          </Link>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-sm text-slate-500 mb-8">
            Free to start — no credit card required.
          </p>

          <form className="space-y-4" action="/dashboard">
            <Input
              label="Full name"
              type="text"
              placeholder="Layla Al-Rashid"
              leftAddon={<User className="h-4 w-4" />}
              autoComplete="name"
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              leftAddon={<Mail className="h-4 w-4" />}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min. 8 characters"
              leftAddon={<Lock className="h-4 w-4" />}
              hint="Use 8+ characters with a mix of letters and numbers."
              autoComplete="new-password"
            />

            {/* Country selector */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Country
              </label>
              <select className="input-base appearance-none bg-white">
                <option value="">Select your country</option>
                <option value="other">Select your country</option>
              </select>
            </div>

            {/* Grade selector */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Grade
              </label>
              <select className="input-base appearance-none bg-white">
                <option value="">Select your grade</option>
                {[9, 10, 11, 12].map((g) => (
                  <option key={g} value={g}>Grade {g}</option>
                ))}
              </select>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to Solvexa&apos;s{" "}
                <Link href="#" className="text-brand-600 hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="#" className="text-brand-600 hover:underline">Privacy Policy</Link>.
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              Create Free Account
            </Button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-brand-600 hover:text-brand-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
