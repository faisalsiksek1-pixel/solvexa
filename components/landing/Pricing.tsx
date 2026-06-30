"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/lib/mock-data";
import Link from "next/link";

type Market = "uae" | "brazil";

export function Pricing() {
  const [market, setMarket] = useState<Market>("uae");

  return (
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* Header — split layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Pricing
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple,<br />honest pricing.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-end gap-4">
            <p className="text-sm text-slate-500 max-w-xs">
              One plan for every student. Cancel anytime. No hidden fees.
            </p>
            {/* Market toggle */}
            <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 gap-1 shrink-0">
              {(["uae", "brazil"] as Market[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMarket(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
                    market === m
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {m === "uae" ? "UAE" : "Brazil"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-4 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-7 flex flex-col ${
                plan.highlighted
                  ? "bg-slate-900 shadow-elevated md:-my-4 md:py-11"
                  : "bg-white border border-slate-200"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-white">
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-base font-bold mb-1 ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                  {plan.name}
                </h3>
                <p className={`text-xs leading-relaxed ${plan.highlighted ? "text-white/50" : "text-slate-400"}`}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-7">
                <div className="flex items-baseline gap-1.5">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-slate-900"}`}>
                    {plan.price[market] === 0 ? "Free" : plan.price[market]}
                  </span>
                  {plan.price[market] > 0 && (
                    <span className={`text-sm ${plan.highlighted ? "text-white/40" : "text-slate-400"}`}>
                      {plan.currency[market]} / {plan.period}
                    </span>
                  )}
                </div>
                {plan.price[market] > 0 && (
                  <p className={`text-xs mt-1 ${plan.highlighted ? "text-white/40" : "text-slate-400"}`}>
                    7-day free trial
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${plan.highlighted ? "text-brand-400" : "text-emerald-500"}`} />
                    <span className={`text-sm ${plan.highlighted ? "text-white/70" : "text-slate-600"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/signup"
                className={`block w-full text-center rounded-xl py-3 text-sm font-semibold transition-all duration-150 active:scale-[0.98] ${
                  plan.highlighted
                    ? "bg-brand-600 text-white hover:bg-brand-500 shadow-sm"
                    : plan.id === "free"
                    ? "border border-slate-200 text-slate-700 hover:bg-slate-50"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Prices shown in {market === "uae" ? "UAE Dirhams (AED)" : "Brazilian Reais (BRL)"}.
        </p>
      </div>
    </section>
  );
}
