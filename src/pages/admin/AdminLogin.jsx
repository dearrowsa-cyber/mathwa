import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import { LogIn, Lock, Mail, AlertCircle } from 'lucide-react'

const translations = {
  en: {
    admin_login: 'Admin Login',
    mathwaa_admin: 'Mathwaa Association — Content Management',
    email: 'Email',
    email_placeholder: 'admin@mathwaa.org',
    password: 'Password',
    password_placeholder: '••••••••',
    signing_in: 'Signing in...',
    sign_in: 'Sign in',
    email_password_required: 'Please enter email and password.',
    invalid_credentials: 'Invalid email or password. Please check your credentials.',
    unexpected_error: 'An unexpected error occurred. Please try again.',
    credentials_info: 'Enter admin credentials. Email must be registered in the database.',
    back_to_website: '← Back to website'
  },
  ar: {
    admin_login: 'تسجيل دخول الإدارة',
    mathwaa_admin: 'جمعية مثوى — إدارة المحتوى',
    email: 'البريد الإلكتروني',
    email_placeholder: 'admin@mathwaa.org',
    password: 'كلمة المرور',
    password_placeholder: '••••••••',
    signing_in: 'جاري الدخول...',
    sign_in: 'دخول',
    email_password_required: 'يرجى إدخال البريد الإلكتروني وكلمة المرور.',
    invalid_credentials: 'بريد إلكتروني أو كلمة مرور غير صحيحة. تحقق من بيانات اعتمادك.',
    unexpected_error: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
    credentials_info: 'أدخل بيانات اعتماد المسؤول. يجب تسجيل البريد الإلكتروني في قاعدة البيانات.',
    back_to_website: '← العودة إلى الموقع'
  }
}

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const { login } = useAdminAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/admin/dashboard'
  const t = translations[language]

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    
    if (!email.trim() || !password) {
      setError(t.email_password_required)
      setSubmitting(false)
      return
    }
    
    try {
      const success = await login(email.trim(), password)
      if (success) {
        const target = from && from.startsWith('/admin') ? from : '/admin/dashboard'
        setTimeout(() => navigate(target, { replace: true }), 0)
      } else {
        setError(t.invalid_credentials)
      }
    } catch (err) {
      setError(t.unexpected_error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#0E4B33' }}>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(200,155,60,0.1)' }}>
              <LogIn size={32} style={{ color: '#C89B3C' }} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{t.admin_login}</h1>
            <p className="text-gray-500 mt-1">{t.mathwaa_admin}</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg text-sm text-red-700 bg-red-50 border border-red-100">
                <AlertCircle size={18} />
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.email}</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent"
                  placeholder={t.email_placeholder}
                  autoComplete="email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.password}</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent"
                  placeholder={t.password_placeholder}
                  autoComplete="current-password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ backgroundColor: '#C89B3C' }}
            >
              <LogIn size={18} />
              {submitting ? t.signing_in : t.sign_in}
            </button>
          </form>
          <p className="text-center text-gray-400 text-sm mt-6">
            {t.credentials_info}
          </p>
        </div>
        <p className="text-center text-white/80 text-sm mt-6">
          <Link to="/" className="hover:underline">{t.back_to_website}</Link>
        </p>
      </div>
    </div>
  )
}
