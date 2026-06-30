import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    monthlyPrice: '$0',
    yearlyPrice: '$0',
    period: '/month',
    description: 'Great for exploring Solvexa with no commitment.',
    features: [
      '10 AI questions per day',
      'Basic practice problems',
      'Core topic coverage',
      'Progress snapshot',
      'Community support',
    ],
    notIncluded: [
      'Unlimited AI questions',
      'Progress tracking',
      'Personalized learning path',
    ],
    cta: 'Start for Free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    monthlyPrice: '$12',
    yearlyPrice: '$9',
    period: '/month',
    description: 'For serious learners who want to master math.',
    features: [
      'Unlimited AI questions',
      'Full practice suite',
      'Detailed progress tracking',
      'All difficulty levels',
      'Personalized learning path',
      'Download solutions as PDF',
      'Priority support',
    ],
    notIncluded: [],
    cta: 'Start Pro Trial',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Team',
    monthlyPrice: '$8',
    yearlyPrice: '$6',
    period: '/student/month',
    description: 'For educators, tutors, and school programs.',
    features: [
      'Everything in Pro',
      'Class management tools',
      'Teacher dashboard',
      'Bulk student invites',
      'Assignment creation',
      'Progress reports by student',
      'Dedicated account manager',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
]

const faqs = [
  { q: 'Is there a free trial for Pro?', a: 'The Free plan gives you access to core features indefinitely. We also offer a 7-day full Pro trial — no credit card required.' },
  { q: 'Can I change plans anytime?', a: 'Yes, upgrade or downgrade at any time. Changes take effect at the start of your next billing period.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards and debit cards via Stripe. Bank transfers available for Team plans.' },
  { q: 'How does the Team plan work?', a: 'You pay per student seat. Add or remove students at any time and only pay for active users in the current billing period.' },
]

const PricingPage: React.FC = () => {
  const [yearly, setYearly] = useState(false)

  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-16 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">Pricing</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-[#0a0f1e] tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="mt-5 text-lg text-[#64748b] max-w-xl mx-auto">
              No hidden fees. No long-term contracts. Pay monthly or save with yearly billing.
            </p>
            {/* Toggle */}
            <div className="mt-8 inline-flex items-center bg-white border border-[#e2e8f0] rounded-xl p-1 gap-1">
              <button
                onClick={() => setYearly(false)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${!yearly ? 'bg-[#0a0f1e] text-white' : 'text-[#64748b] hover:text-[#0a0f1e]'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setYearly(true)}
                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${yearly ? 'bg-[#0a0f1e] text-white' : 'text-[#64748b] hover:text-[#0a0f1e]'}`}
              >
                Yearly
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">Save 25%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  tier.highlighted
                    ? 'bg-[#0a0f1e] text-white shadow-2xl ring-1 ring-[#2563eb] md:-mt-4 md:mb-4'
                    : 'bg-white border border-[#e2e8f0]'
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#2563eb] text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${tier.highlighted ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    {tier.name}
                  </h3>
                  <div className="flex items-end gap-1 mb-2">
                    <motion.span
                      key={yearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-4xl font-extrabold ${tier.highlighted ? 'text-white' : 'text-[#0a0f1e]'}`}
                    >
                      {yearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </motion.span>
                    <span className={`text-sm mb-1.5 ${tier.highlighted ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                      {tier.period}
                    </span>
                  </div>
                  <p className={`text-sm ${tier.highlighted ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${tier.highlighted ? 'bg-[#2563eb]' : 'bg-blue-50'}`}>
                        <Check size={10} className={tier.highlighted ? 'text-white' : 'text-[#2563eb]'} strokeWidth={3} />
                      </div>
                      <span className={tier.highlighted ? 'text-[#cbd5e1]' : 'text-[#475569]'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={tier.href}
                  className={`w-full text-center text-sm font-semibold px-5 py-3 rounded-lg transition-all duration-200 ${
                    tier.highlighted
                      ? 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]'
                      : 'bg-[#f1f5f9] text-[#0a0f1e] hover:bg-[#e2e8f0]'
                  }`}
                >
                  {tier.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-bold text-[#0a0f1e] text-center mb-10">Pricing FAQs</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <h3 className="text-sm font-semibold text-[#0a0f1e] mb-2">{faq.q}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default PricingPage
