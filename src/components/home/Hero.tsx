import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden pt-20">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e2e8f0 1px, transparent 1px),
            linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 40%, transparent 100%)',
          opacity: 0.5,
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            >
              <Sparkles size={12} />
              AI-Powered Math Learning
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0a0f1e] leading-tight tracking-tight"
            >
              Master Mathematics
              <br />
              <span className="text-[#2563eb]">with AI.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-5 text-lg text-[#64748b] leading-relaxed max-w-md"
            >
              Learn Faster. Think Smarter. Solvexa's AI tutor explains every step, adapts to your level, and helps you truly understand math — not just memorize it.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-[#2563eb] text-white font-semibold text-sm px-6 py-3.5 rounded-lg hover:bg-[#1d4ed8] transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Start for Free
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 bg-transparent text-[#0a0f1e] font-semibold text-sm px-6 py-3.5 rounded-lg border border-[#e2e8f0] hover:bg-[#f8fafc] transition-all duration-200"
              >
                See How It Works
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {['SK', 'JT', 'PM', 'AR'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      backgroundColor: ['#2563eb', '#7c3aed', '#059669', '#dc2626'][i],
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-sm text-[#64748b]">
                Trusted by <span className="font-semibold text-[#0a0f1e]">12,000+</span> students worldwide
              </p>
            </motion.div>
          </div>

          {/* Right: Math illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative hidden md:flex justify-center items-center"
          >
            <MathIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const MathIllustration: React.FC = () => (
  <div className="relative w-full max-w-md">
    {/* Main card */}
    <div className="bg-white border border-[#e2e8f0] rounded-2xl shadow-xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
        <span className="ml-2 text-xs text-[#94a3b8] font-mono">AI Tutor</span>
      </div>

      <div className="space-y-4">
        {/* User message */}
        <div className="flex justify-end">
          <div className="bg-[#2563eb] text-white text-sm px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[80%]">
            Solve: ∫ x² dx
          </div>
        </div>

        {/* AI response */}
        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl rounded-tl-sm p-4 space-y-3">
          <p className="text-xs font-semibold text-[#2563eb]">Step-by-step solution:</p>
          <div className="space-y-2 text-sm font-mono text-[#0a0f1e]">
            <div className="flex gap-2">
              <span className="text-[#94a3b8] text-xs mt-0.5">1</span>
              <span>Apply the power rule: ∫ xⁿ dx = xⁿ⁺¹/(n+1)</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#94a3b8] text-xs mt-0.5">2</span>
              <span>n = 2, so n+1 = 3</span>
            </div>
            <div className="flex gap-2">
              <span className="text-[#94a3b8] text-xs mt-0.5">3</span>
              <span className="text-[#2563eb] font-semibold">∫ x² dx = x³/3 + C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div className="mt-4 flex items-center gap-2 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-2.5">
        <span className="text-sm text-[#94a3b8] flex-1">Ask another question...</span>
        <div className="w-7 h-7 bg-[#2563eb] rounded-lg flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6h10M6 1l5 5-5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>

    {/* Floating mini-cards */}
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="absolute -top-4 -right-4 bg-white border border-[#e2e8f0] rounded-xl shadow-md px-3 py-2"
    >
      <p className="text-xs text-[#64748b]">Accuracy</p>
      <p className="text-lg font-bold text-[#0a0f1e]">94%</p>
    </motion.div>

    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      className="absolute -bottom-4 -left-4 bg-white border border-[#e2e8f0] rounded-xl shadow-md px-3 py-2"
    >
      <p className="text-xs text-[#64748b]">Problems solved</p>
      <p className="text-lg font-bold text-[#0a0f1e]">1,247</p>
    </motion.div>
  </div>
)
