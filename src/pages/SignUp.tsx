import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Check } from 'lucide-react'

const SignUp: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const passwordStrength = (pw: string) => {
    let score = 0
    if (pw.length >= 8) score++
    if (/[A-Z]/.test(pw)) score++
    if (/[0-9]/.test(pw)) score++
    if (/[^A-Za-z0-9]/.test(pw)) score++
    return score
  }

  const strength = passwordStrength(form.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColor = ['', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e'][strength]

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setErrors({})
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitting(false)
    setDone(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      <header className="h-16 border-b border-[#e2e8f0] bg-white flex items-center px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-[#0a0f1e] font-extrabold text-xl tracking-tight">
          <span className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center text-white text-sm font-bold">∑</span>
          Solvexa
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold text-[#0a0f1e] tracking-tight">Create your account</h1>
            <p className="text-sm text-[#64748b] mt-2">Start learning math with AI — free forever, no credit card required</p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
            {done ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={24} className="text-green-600" strokeWidth={2.5} />
                </div>
                <h3 className="text-lg font-bold text-[#0a0f1e] mb-2">Account created!</h3>
                <p className="text-sm text-[#64748b] mb-6">Welcome to Solvexa, {form.name.split(' ')[0]}. You're all set.</p>
                <Link
                  to="/signin"
                  className="inline-block bg-[#2563eb] text-white text-sm font-semibold px-7 py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors"
                >
                  Sign in to your account
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Full name</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    autoComplete="name"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 ${errors.name ? 'border-red-400 bg-red-50' : 'border-[#e2e8f0]'}`}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Email address</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 ${errors.email ? 'border-red-400 bg-red-50' : 'border-[#e2e8f0]'}`}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#374151] mb-1.5">Password</label>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Create a password"
                      autoComplete="new-password"
                      className={`w-full px-4 py-2.5 pr-11 text-sm border rounded-lg outline-none transition-colors focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100 ${errors.password ? 'border-red-400 bg-red-50' : 'border-[#e2e8f0]'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-[#64748b]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                  {form.password && (
                    <div className="mt-2 space-y-1">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4].map((n) => (
                          <div
                            key={n}
                            className="h-1 flex-1 rounded-full transition-colors"
                            style={{ backgroundColor: n <= strength ? strengthColor : '#e2e8f0' }}
                          />
                        ))}
                      </div>
                      {strengthLabel && (
                        <p className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel} password</p>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#2563eb] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                >
                  {submitting ? 'Creating account...' : 'Create Free Account'}
                </button>

                <p className="text-xs text-center text-[#94a3b8]">
                  By signing up you agree to our{' '}
                  <a href="#" className="text-[#64748b] hover:text-[#0a0f1e] underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-[#64748b] hover:text-[#0a0f1e] underline">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>

          <p className="text-center text-sm text-[#64748b] mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-[#2563eb] font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SignUp
