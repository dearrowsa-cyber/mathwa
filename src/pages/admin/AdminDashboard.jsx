import React from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Building2,
  Newspaper,
  Coins,
  Users,
  FileText,
  MessageCircle,
  UserCheck,
  TrendingUp,
  ArrowRight,
} from 'lucide-react'

const translations = {
  en: {
    dashboard: 'Dashboard',
    manage_content: 'Manage your site content by category. Backend CRUD will be connected later.',
    news_articles: 'News articles',
    board_members: 'Board members',
    service_requests: 'Service requests',
    volunteers: 'Volunteers',
    backend_later: 'Backend connected later',
    quick_access: 'Quick access',
    edit_content: 'Edit content by category from the sidebar or the links below.',
    board_members_link: 'Board Members',
    news_articles_link: 'News & Articles',
    donations_link: 'Donations',
    beneficiary_registrations_link: 'Beneficiary Registrations',
    annual_reports_link: 'Annual Reports',
    contact_messages_link: 'Contact Messages',
    note: 'Note',
    note_text: 'All sections are ready for content management. Connect your backend API and replace placeholder data with real CRUD operations.',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    manage_content: 'قم بإدارة محتوى موقعك حسب الفئة. سيتم توصيل CRUD الخاص بك لاحقاً.',
    news_articles: 'مقالات الأخبار',
    board_members: 'أعضاء مجلس الإدارة',
    service_requests: 'طلبات الخدمة',
    volunteers: 'المتطوعون',
    backend_later: 'سيتم توصيل الخادم الخلفي لاحقاً',
    quick_access: 'وصول سريع',
    edit_content: 'قم بتعديل المحتوى حسب الفئة من الشريط الجانبي أو الروابط أدناه.',
    board_members_link: 'أعضاء مجلس الإدارة',
    news_articles_link: 'الأخبار والمقالات',
    donations_link: 'التبرعات',
    beneficiary_registrations_link: 'تسجيل المستفيدين',
    annual_reports_link: 'التقارير السنوية',
    contact_messages_link: 'رسائل الاتصال',
    note: 'ملاحظة',
    note_text: 'جميع الأقسام جاهزة لإدارة المحتوى. قم بتوصيل API الخاص بك واستبدل البيانات الوهمية بعمليات CRUD حقيقية.',
  }
}

const quickLinks = [
  { to: '/admin/about/board-members', key: 'board_members_link', icon: Users, color: '#C89B3C' },
  { to: '/admin/news/articles', key: 'news_articles_link', icon: Newspaper, color: '#C89B3C' },
  { to: '/admin/contribute/donations', key: 'donations_link', icon: Coins, color: '#C89B3C' },
  { to: '/admin/beneficiaries/registrations', key: 'beneficiary_registrations_link', icon: UserCheck, color: '#C89B3C' },
  { to: '/admin/reports/annual', key: 'annual_reports_link', icon: FileText, color: '#C89B3C' },
  { to: '/admin/contact/messages', key: 'contact_messages_link', icon: MessageCircle, color: '#C89B3C' },
]

const statsKeys = [
  'news_articles',
  'board_members',
  'service_requests',
  'volunteers',
]

export default function AdminDashboard() {
  const [language, setLanguage] = React.useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  React.useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en'
      setLanguage(newLanguage)
    }

    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{t.dashboard}</h1>
        <p className="text-gray-500 mt-1">{t.manage_content}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsKeys.map((key, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">{t[key]}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: '#C89B3C' }}>—</p>
            <p className="text-xs text-gray-400 mt-1">{t.backend_later}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{t.quick_access}</h2>
          <p className="text-sm text-gray-500">{t.edit_content}</p>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-[#C89B3C] hover:bg-yellow-50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(200,155,60,0.1)' }}>
                  <Icon size={24} style={{ color: link.color }} />
                </div>
                <span className="font-medium text-gray-800 group-hover:text-[#C89B3C]">{t[link.key]}</span>
                <ArrowRight size={18} className="ml-auto text-gray-400 group-hover:text-[#C89B3C]" />
              </Link>
            )
          })}
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm">
        <strong>{t.note}:</strong> {t.note_text}
      </div>
    </div>
  )
}
