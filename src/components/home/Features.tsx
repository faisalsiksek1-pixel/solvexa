import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Bot, ListChecks, Dumbbell, Zap, Target, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Bot,
    title: 'AI Tutor',
    description: 'Ask any math question and receive a clear, human-like explanation tailored to your current level.',
  },
  {
    icon: ListChecks,
    title: 'Step-by-Step Solutions',
    description: 'See every step of the solution process. Understand the why behind each move, not just the answer.',
  },
  {
    icon: Dumbbell,
    title: 'Smart Practice',
    description: 'Auto-generated problems calibrated to your level. More of what you need, less of what you already know.',
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description: 'Know exactly where you went wrong the moment you submit. No waiting, no guessing.',
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description: 'The platform adapts to your pace and pinpoints your weak spots to target them effectively.',
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description: 'Visual dashboards showing your improvement over time across every topic and difficulty level.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export const Features: React.FC = () => {
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
          <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">Features</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#0a0f1e] tracking-tight">
            Everything you need to master math
          </h2>
          <p className="mt-4 text-[#64748b] max-w-xl mx-auto text-base leading-relaxed">
            Solvexa combines cutting-edge AI with proven learning principles to give you the most effective math education possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="initial"
                animate={inView ? 'animate' : 'initial'}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white border border-[#e2e8f0] rounded-xl p-6 group cursor-default hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <Icon size={20} className="text-[#2563eb]" />
                </div>
                <h3 className="text-base font-semibold text-[#0a0f1e] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
