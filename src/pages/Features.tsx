import React from 'react'
import { motion } from 'framer-motion'
import { Bot, ListChecks, Dumbbell, Zap, Target, BarChart3, BookOpen, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'

const features = [
  {
    icon: Bot,
    title: 'AI Tutor',
    description:
      'Our AI tutor is trained on millions of math problems across every level. Ask any question in plain English and receive a clear, step-by-step explanation — as many times as you need, without judgment.',
    highlight: true,
  },
  {
    icon: ListChecks,
    title: 'Step-by-Step Solutions',
    description:
      'Every solution is broken down into clear, logical steps. Each step is explained so you understand the reasoning — not just the final answer. Toggle hints on or off as you need them.',
    highlight: false,
  },
  {
    icon: Dumbbell,
    title: 'Smart Practice',
    description:
      'Problems are auto-generated and calibrated to your skill level. As you improve, the difficulty scales with you. No more wasting time on problems you already know.',
    highlight: false,
  },
  {
    icon: Zap,
    title: 'Instant Feedback',
    description:
      'Submit an answer and know immediately if you\'re right — and exactly why if you\'re not. Feedback is specific, constructive, and tied to the relevant concept.',
    highlight: false,
  },
  {
    icon: Target,
    title: 'Personalized Learning',
    description:
      'Solvexa tracks your performance across topics and difficulty levels, then creates a custom learning path that focuses your practice time where it matters most.',
    highlight: false,
  },
  {
    icon: BarChart3,
    title: 'Progress Tracking',
    description:
      'Rich dashboards show your improvement over time — streak counts, accuracy rates, topics mastered, and time spent. Stay motivated by watching your own growth.',
    highlight: false,
  },
  {
    icon: BookOpen,
    title: 'Curriculum Coverage',
    description:
      'From arithmetic to university-level calculus, linear algebra, statistics, and more. Solvexa covers the full breadth of math education with no gaps.',
    highlight: false,
  },
  {
    icon: Globe,
    title: 'Learn Anywhere',
    description:
      'Solvexa is fully responsive and works on any device. Start a problem on your laptop, continue on your phone. Your progress syncs automatically.',
    highlight: false,
  },
]

const FeaturesPage: React.FC = () => {
  return (
    <main className="pt-24">
      {/* Header */}
      <section className="py-16 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">Features</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-[#0a0f1e] tracking-tight">
              Built to help you truly learn
            </h1>
            <p className="mt-5 text-lg text-[#64748b] max-w-xl mx-auto leading-relaxed">
              Solvexa is not a calculator. It is a learning system designed to build deep understanding, one step at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`rounded-xl p-6 border group cursor-default hover:shadow-md transition-shadow duration-200 ${
                    feature.highlight
                      ? 'bg-[#0a0f1e] border-[#1e293b] text-white'
                      : 'bg-white border-[#e2e8f0]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                    feature.highlight ? 'bg-[#2563eb]' : 'bg-blue-50 group-hover:bg-blue-100 transition-colors'
                  }`}>
                    <Icon size={20} className={feature.highlight ? 'text-white' : 'text-[#2563eb]'} />
                  </div>
                  <h3 className={`text-base font-semibold mb-2 ${feature.highlight ? 'text-white' : 'text-[#0a0f1e]'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${feature.highlight ? 'text-[#94a3b8]' : 'text-[#64748b]'}`}>
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-[#0a0f1e] mb-4">Ready to start learning?</h2>
          <p className="text-[#64748b] mb-8">Join 12,000+ students already mastering math with Solvexa.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/signup"
              className="bg-[#2563eb] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#1d4ed8] transition-colors shadow-sm"
            >
              Start for Free
            </Link>
            <Link
              to="/pricing"
              className="bg-white border border-[#e2e8f0] text-[#0a0f1e] font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#f8fafc] transition-colors"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default FeaturesPage
