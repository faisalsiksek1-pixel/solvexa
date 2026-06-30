import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, Lightbulb, Shield } from 'lucide-react'

const team = [
  { name: 'Alex Rivera', role: 'CEO & Co-founder', initials: 'AR', color: '#2563eb', bio: 'Former math teacher with 10 years in EdTech. Passionate about making quality math education accessible to everyone.' },
  { name: 'Mia Chen', role: 'CTO & Co-founder', initials: 'MC', color: '#7c3aed', bio: 'AI researcher with a PhD in Machine Learning. Built the core AI tutoring engine that powers Solvexa.' },
  { name: 'Omar Hassan', role: 'Head of Product', initials: 'OH', color: '#059669', bio: 'Previously at Duolingo. Obsessed with learning psychology and UX design that drives real outcomes.' },
]

const values = [
  {
    icon: Lightbulb,
    title: 'Understanding Over Answers',
    description: 'We believe deeply in teaching the why, not just the what. Every feature we build starts with the question: does this help students understand?',
  },
  {
    icon: Heart,
    title: 'Accessible to Everyone',
    description: 'Quality math education should not be a privilege. We work hard to keep Solvexa affordable and available in multiple languages worldwide.',
  },
  {
    icon: Shield,
    title: 'Honest & Transparent',
    description: 'We don\'t sell your data. We don\'t bury pricing. We don\'t use dark patterns. Solvexa is a product you can trust.',
  },
]

const AboutPage: React.FC = () => {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="py-16 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">About Solvexa</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-[#0a0f1e] tracking-tight">
              We exist to make math<br />make sense.
            </h1>
            <p className="mt-5 text-lg text-[#64748b] max-w-2xl mx-auto leading-relaxed">
              Too many students give up on math because they never had a patient, knowledgeable tutor available when they needed one. Solvexa changes that. Our AI is available 24/7, never gets frustrated, and explains everything as many times as you need.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#0a0f1e] mb-5 tracking-tight">Our mission</h2>
              <p className="text-[#64748b] leading-relaxed mb-4">
                Solvexa was founded in 2023 by a team of educators and engineers who believed AI could fundamentally change how students learn mathematics.
              </p>
              <p className="text-[#64748b] leading-relaxed mb-4">
                We are not here to replace teachers — we are here to give every student the patient, personalized support that only a private tutor can offer, at a fraction of the cost.
              </p>
              <p className="text-[#64748b] leading-relaxed">
                Today, over 12,000 students use Solvexa to study for exams, catch up on concepts, and push ahead of their curriculum.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: 'Students', value: '12,000+' },
                { label: 'Problems solved', value: '2.4M+' },
                { label: 'Topics covered', value: '40+' },
                { label: 'Avg. accuracy gain', value: '+31%' },
              ].map((stat) => (
                <div key={stat.label} className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-5 text-center">
                  <p className="text-2xl font-extrabold text-[#0a0f1e]">{stat.value}</p>
                  <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#f8fafc] border-y border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-[#0a0f1e] text-center mb-12 tracking-tight">What we believe in</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white border border-[#e2e8f0] rounded-xl p-6"
                >
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#2563eb]" />
                  </div>
                  <h3 className="text-base font-semibold text-[#0a0f1e] mb-2">{v.title}</h3>
                  <p className="text-sm text-[#64748b] leading-relaxed">{v.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-[#0a0f1e] text-center mb-12 tracking-tight">Meet the team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-6 text-center"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <h3 className="text-base font-semibold text-[#0a0f1e] mb-1">{member.name}</h3>
                <p className="text-xs text-[#2563eb] font-medium mb-3">{member.role}</p>
                <p className="text-sm text-[#64748b] leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a0f1e]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Join us on the mission</h2>
          <p className="text-[#94a3b8] mb-8">Start learning with Solvexa today — free, no credit card required.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/signup" className="bg-[#2563eb] text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#1d4ed8] transition-colors">
              Get started free
            </Link>
            <Link to="/contact" className="bg-white/10 text-white font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-white/20 transition-colors">
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default AboutPage
