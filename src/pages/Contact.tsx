import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageSquare, Clock } from 'lucide-react'

const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <main className="pt-24">
      <section className="py-16 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-xs font-semibold text-[#2563eb] uppercase tracking-widest">Contact</span>
            <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold text-[#0a0f1e] tracking-tight">
              Get in touch
            </h1>
            <p className="mt-5 text-lg text-[#64748b] max-w-xl mx-auto">
              Have a question, feedback, or interested in the Team plan? We would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-12">
            {/* Info */}
            <div className="md:col-span-2">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <h2 className="text-xl font-bold text-[#0a0f1e] mb-6">How can we help?</h2>
                <div className="space-y-6">
                  {[
                    { icon: Mail, title: 'Email us', desc: 'hello@solvexa.io', sub: 'For general inquiries' },
                    { icon: MessageSquare, title: 'Sales & Team plans', desc: 'sales@solvexa.io', sub: 'For schools and organizations' },
                    { icon: Clock, title: 'Response time', desc: 'Within 24 hours', sub: 'Monday through Friday' },
                  ].map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.title} className="flex gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon size={18} className="text-[#2563eb]" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#0a0f1e]">{item.title}</p>
                          <p className="text-sm text-[#2563eb]">{item.desc}</p>
                          <p className="text-xs text-[#94a3b8]">{item.sub}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-[#e2e8f0] rounded-2xl p-8"
              >
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold text-[#0a0f1e] mb-2">Message sent!</h3>
                    <p className="text-sm text-[#64748b]">Thanks for reaching out. We will get back to you within 24 hours.</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                      className="mt-6 text-sm text-[#2563eb] font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#374151] mb-1.5">Name</label>
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 ${errors.name ? 'border-red-400 bg-red-50' : 'border-[#e2e8f0] bg-white'}`}
                        />
                        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#374151] mb-1.5">Email</label>
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 ${errors.email ? 'border-red-400 bg-red-50' : 'border-[#e2e8f0] bg-white'}`}
                        />
                        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">Subject</label>
                      <select
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm border border-[#e2e8f0] rounded-lg outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 bg-white"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General inquiry</option>
                        <option value="billing">Billing & pricing</option>
                        <option value="team">Team plan inquiry</option>
                        <option value="technical">Technical support</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#374151] mb-1.5">Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 resize-none ${errors.message ? 'border-red-400 bg-red-50' : 'border-[#e2e8f0] bg-white'}`}
                      />
                      {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#2563eb] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default ContactPage
