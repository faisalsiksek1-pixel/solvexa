import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    quote:
      'Solvexa helped me go from failing calculus to a B+ in one semester. The step-by-step AI explanations finally made everything click.',
    name: 'Sarah K.',
    role: 'University Student',
    initials: 'SK',
    color: '#2563eb',
  },
  {
    quote:
      'The AI tutor explains things better than my actual teacher. I can ask the same question five different ways and it never gets frustrated.',
    name: 'James T.',
    role: 'High School Junior',
    initials: 'JT',
    color: '#7c3aed',
  },
  {
    quote:
      'I use it every day for SAT prep. The personalized practice questions are incredibly well-targeted. Incredible tool.',
    name: 'Priya M.',
    role: 'Test Prep Student',
    initials: 'PM',
    color: '#059669',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export const Testimonials: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 bg-[#f8fafc]" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">Testimonials</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0a0f1e] tracking-tight">
            Students love Solvexa
          </h2>
          <p className="mt-4 text-[#64748b] max-w-lg mx-auto text-base">
            Hear from learners who have transformed their relationship with mathematics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              variants={fadeUp}
              initial="initial"
              animate={inView ? 'animate' : 'initial'}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="bg-white border border-[#e2e8f0] rounded-xl p-6 flex flex-col"
            >
              {/* Quote mark */}
              <div className="text-4xl font-serif text-[#e2e8f0] leading-none mb-3 select-none">"</div>
              <p className="text-sm text-[#334155] leading-relaxed flex-1">{t.quote}</p>
              <div className="mt-6 flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0a0f1e]">{t.name}</p>
                  <p className="text-xs text-[#64748b]">{t.role}</p>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} width="12" height="12" viewBox="0 0 12 12" fill="#f59e0b">
                      <path d="M6 1l1.4 2.8 3.1.4-2.2 2.2.5 3.1L6 8.1 3.2 9.5l.5-3.1L1.5 4.2l3.1-.4L6 1z" />
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
