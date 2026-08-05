'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, UserRole } from '@/context/auth-context'
import Link from 'next/link'
import { BookOpen, Mail, Lock, AlertCircle, GraduationCap, BookOpenCheck, Users, Briefcase, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole>('student')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const roles: { value: UserRole; label: string; Icon: any; description: string }[] = [
    {
      value: 'student',
      label: 'Student',
      Icon: GraduationCap,
      description: 'View courses & grades',
    },
    {
      value: 'teacher',
      label: 'Teacher',
      Icon: BookOpenCheck,
      description: 'Manage classes',
    },
    {
      value: 'parent',
      label: 'Parent',
      Icon: Users,
      description: 'Monitor child',
    },
    {
      value: 'principal',
      label: 'Principal',
      Icon: Briefcase,
      description: 'View all data',
    },
  ]

  const demoCredentials: Record<UserRole, { email: string; password: string }> = {
    student: { email: 'student@school.com', password: 'password' },
    teacher: { email: 'teacher@school.com', password: 'password' },
    parent: { email: 'parent@school.com', password: 'password' },
    principal: { email: 'principal@school.com', password: 'password' },
    admin: { email: 'admin@school.com', password: 'password' },
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email || demoCredentials[selectedRole].email, password || demoCredentials[selectedRole].password, selectedRole)
      router.push(`/${selectedRole}-portal`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async () => {
    setError('')
    setIsLoading(true)
    setEmail('')
    setPassword('')

    try {
      const creds = demoCredentials[selectedRole]
      await login(creds.email, creds.password, selectedRole)
      router.push(`/${selectedRole}-portal`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center px-4 py-12">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20"></div>
        <div className="absolute -bottom-8 right-10 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-20" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-3 rounded-lg">
                <BookOpen size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">EduPro</h1>
                <p className="text-blue-100 text-sm">Admin Portal</p>
              </div>
            </div>
            <p className="text-blue-100">Sign in to your account</p>
          </div>

          <div className="px-8 py-8">
            {/* Role Selection */}
            <div className="mb-8">
              <label className="block text-slate-700 font-bold text-sm mb-4">Select Your Role</label>
              <div className="grid grid-cols-2 gap-3">
{roles.map((role) => {
                  const Icon = role.Icon
                  return (
                    <button
                      key={role.value}
                      onClick={() => setSelectedRole(role.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-center ${
                        selectedRole === role.value
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <Icon size={32} className="mx-auto mb-2 text-blue-600" />
                      <div className="font-bold text-slate-900">{role.label}</div>
                      <div className="text-xs text-slate-600">{role.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={demoCredentials[selectedRole].email}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold text-sm mb-2">Password</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2.5 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Demo Login Button */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">or</span>
              </div>
            </div>

            <button
              onClick={handleDemoLogin}
              disabled={isLoading}
              className="w-full bg-slate-100 text-slate-700 py-2.5 rounded-lg font-bold hover:bg-slate-200 transition-all border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Demo Login'}
            </button>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-slate-600 mb-2">
                <span className="font-bold">Demo Credentials:</span>
              </p>
              <p className="text-xs text-slate-600">
                Email: {demoCredentials[selectedRole].email}
                <br />
                Password: {demoCredentials[selectedRole].password}
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
<Link href="/" className="inline-flex items-center gap-2 text-white hover:text-blue-200 text-sm font-medium">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
