import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for exploring Solvexa',
    features: [
      '10 AI questions per day',
      'Basic practice problems',
      'Core topic coverage',
      'Progress snapshot',
    ],
    cta: 'Start for Free',
    href: '/signup',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/month',
    description: 'Everything you need to excel',
    features: [
      'Unlimited AI questions',
      'Full practice suite',
      'Detailed progress tracking',
      'All difficulty levels',
      'Personalized learning path',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: '/signup',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$8',
    period: '/student/month',
    description: 'For teachers and classrooms',
    features: [
      'Everything in Pro',
      'Class management tools',
      'Teacher dashboard',
      'Batch progress reports',
      'Student assignments',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    highlighted: false,
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export const PricingPreview: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">Pricing</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0a0f1e] tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-[#64748b] max-w-lg mx-auto text-base">
            No surprises. No contracts. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              variants={fadeUp}
              initial="initial"
              animate={inView ? 'animate' : 'initial'}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                tier.highlighted
                  ? 'bg-[#0a0f1e] text-white shadow-2xl ring-1 ring-[#2563eb] md:-mt-4 md:mb-4'
                  : 'bg-white border border-[#e2e8f0]'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#2563eb] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${tier.highlighted ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                  {tier.name}
                </h3>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-extrabold ${tier.highlighted ? 'text-white' : 'text-[#0a0f1e]'}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm mb-1.5 ${tier.highlighted ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    {tier.period}
                  </span>
                </div>
                <p className={`text-sm ${tier.highlighted ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                  {tier.description}
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm">
                    <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${tier.highlighted ? 'bg-[#2563eb]' : 'bg-blue-50'}`}>
                      <Check size={10} className={tier.highlighted ? 'text-white' : 'text-[#2563eb]'} strokeWidth={3} />
                    </div>
                    <span className={tier.highlighted ? 'text-[#cbd5e1]' : 'text-[#475569]'}>
                      {feature}
                    </span>
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
  )
}
