import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: 'What math topics does Solvexa cover?',
    answer:
      'Solvexa covers everything from basic arithmetic through university-level mathematics — including algebra, geometry, trigonometry, calculus (differential and integral), linear algebra, statistics, and probability.',
  },
  {
    question: 'Is Solvexa suitable for all ages?',
    answer:
      'Yes. Solvexa is designed for middle school students, high school learners, university students, and adults looking to refresh or deepen their math skills. The platform adapts to your level automatically.',
  },
  {
    question: 'How is Solvexa different from other math apps?',
    answer:
      'Most apps give you the answer. Solvexa teaches you the reasoning behind every step. Our AI doesn\'t just solve problems — it explains the concepts, answers follow-up questions, and adapts to the way you learn.',
  },
  {
    question: 'Can I cancel anytime?',
    answer:
      'Absolutely. There are no contracts or lock-in periods. You can cancel your subscription at any time directly from your account settings, and you\'ll retain access until the end of your billing period.',
  },
  {
    question: 'Is there a free trial?',
    answer:
      'Yes. Our Free plan gives you full access to core features with daily limits — no credit card required. Upgrade to Pro whenever you\'re ready to unlock unlimited access.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export const FAQ: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-24 bg-[#f8fafc]" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">FAQ</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0a0f1e] tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-[#64748b] text-base">
            Everything you need to know about Solvexa.
          </p>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="initial"
              animate={inView ? 'animate' : 'initial'}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
              className="bg-white border border-[#e2e8f0] rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-sm font-semibold text-[#0a0f1e]">{faq.question}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f1f5f9] flex items-center justify-center text-[#64748b]">
                  {openIndex === i ? <Minus size={12} /> : <Plus size={12} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-5">
                      <p className="text-sm text-[#64748b] leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-[#64748b]">
            Still have questions?{' '}
            <a href="/contact" className="text-[#2563eb] font-medium hover:underline">
              Contact us
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
