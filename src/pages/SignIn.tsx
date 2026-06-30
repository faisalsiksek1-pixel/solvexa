import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'

const SignIn: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return }
    setErrors({})
    setServerError('')
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSubmitting(false)
    setServerError('Invalid email or password. Please try again.')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col">
      {/* Minimal header */}
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
            <h1 className="text-2xl font-extrabold text-[#0a0f1e] tracking-tight">Welcome back</h1>
            <p className="text-sm text-[#64748b] mt-2">Sign in to continue learning with Solvexa</p>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8 shadow-sm">
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-5">
                {serverError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#374151]">Password</label>
                  <a href="#" className="text-xs text-[#2563eb] hover:underline font-medium">Forgot password?</a>
                </div>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
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
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#2563eb] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#1d4ed8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {submitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#e2e8f0]" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-3 text-xs text-[#94a3b8]">or continue with</span>
              </div>
            </div>

            <button className="w-full flex items-center justify-center gap-3 border border-[#e2e8f0] rounded-lg py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f8fafc] transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="text-center text-sm text-[#64748b] mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#2563eb] font-semibold hover:underline">
              Sign up for free
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SignIn
