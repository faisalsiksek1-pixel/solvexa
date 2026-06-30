import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { UserCircle, MessageSquare, TrendingUp, ChevronRight } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: UserCircle,
    title: 'Tell us your level',
    description:
      'When you sign up, you tell Solvexa where you are — from middle school basics to university calculus. You can also take a quick placement assessment to precisely calibrate your starting point.',
    detail: 'Solvexa supports: Algebra, Geometry, Pre-Calculus, Calculus I & II, Linear Algebra, Statistics, and more.',
  },
  {
    number: '02',
    icon: MessageSquare,
    title: 'Learn with AI',
    description:
      'Our AI tutor is available 24/7. Ask it to explain a concept, walk through a problem, check your work, or generate new practice problems. Every interaction teaches you something new.',
    detail: 'No judgment, no time limits. Ask the same question as many times as you need until it makes sense.',
  },
  {
    number: '03',
    icon: TrendingUp,
    title: 'Track & Improve',
    description:
      'Your personal dashboard shows exactly how you\'re progressing — accuracy by topic, problems solved, daily streaks, and mastery levels. See the improvements as they happen.',
    detail: 'Solvexa automatically adjusts your learning path based on your performance, focusing time where it counts.',
  },
]

const HowItWorksPage: React.FC = () => {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-16 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">How It Works</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-[#0a0f1e] tracking-tight">
              From zero to mastery,<br />step by step
            </h1>
            <p className="mt-5 text-lg text-[#64748b] max-w-xl mx-auto leading-relaxed">
              Solvexa is designed to take you from where you are to where you want to be — with AI as your guide every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-12">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="flex flex-col sm:flex-row gap-8 items-start"
                >
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#0a0f1e] flex items-center justify-center shadow-lg">
                      <Icon size={24} className="text-white" />
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-12 bg-[#e2e8f0] mt-4 hidden sm:block" />
                    )}
                  </div>
                  <div className="flex-1 pb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-[#2563eb] uppercase tracking-widest">{step.number}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-[#0a0f1e] mb-3">{step.title}</h2>
                    <p className="text-[#64748b] leading-relaxed mb-4">{step.description}</p>
                    <div className="flex items-start gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-4">
                      <ChevronRight size={14} className="text-[#2563eb] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#475569]">{step.detail}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0f1e]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Start your learning journey today</h2>
          <p className="text-[#94a3b8] mb-8">No credit card required. Set up your profile and start learning in under 2 minutes.</p>
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-md"
          >
            Get started for free
          </Link>
        </div>
      </section>
    </main>
  )
}

export default HowItWorksPage
