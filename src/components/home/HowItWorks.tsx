import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Tell us your level',
    description:
      'From algebra to advanced calculus — set your current level so Solvexa personalizes everything for you from day one.',
  },
  {
    number: '02',
    title: 'Learn with AI',
    description:
      'Get crystal-clear explanations, solve practice problems, and ask questions anytime. The AI tutor is always available.',
  },
  {
    number: '03',
    title: 'Track & improve',
    description:
      'Watch your progress on visual dashboards. See exactly which concepts you have mastered and where to focus next.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export const HowItWorks: React.FC = () => {
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
          <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">How It Works</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0a0f1e] tracking-tight">
            Up and running in minutes
          </h2>
          <p className="mt-4 text-[#64748b] max-w-xl mx-auto text-base leading-relaxed">
            No setup headaches. Just tell us where you are and start learning with AI guidance immediately.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-[#e2e8f0] mx-28" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                variants={fadeUp}
                initial="initial"
                animate={inView ? 'animate' : 'initial'}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12 }}
                className="relative flex flex-col items-center text-center md:items-center"
              >
                <div className="relative z-10 w-16 h-16 rounded-full bg-white border-2 border-[#2563eb] flex items-center justify-center mb-6 shadow-sm">
                  <span className="text-lg font-extrabold text-[#2563eb]">{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-[#0a0f1e] mb-3">{step.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed max-w-xs">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ duration: 0.4, delay: 0.55 }}
          className="text-center mt-14"
        >
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm"
          >
            Get started for free
          </a>
        </motion.div>
      </div>
    </section>
  )
}
