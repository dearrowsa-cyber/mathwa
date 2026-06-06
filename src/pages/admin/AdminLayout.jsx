import React, { useState } from 'react'
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'
import {
  LayoutDashboard,
  Building2,
  Newspaper,
  Image,
  Video,
  Coins,
  UserPlus,
  UserCheck,
  Heart,
  ClipboardList,
  Users,
  Hand,
  FileCheck,
  LayoutList,
  FileText,
  Scale,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'

const sidebarSections = [
  {
    label: 'about_us',
    icon: Building2,
    items: [
      { to: '/admin/about/board-members', key: 'board_members', icon: Users },
      { to: '/admin/about/organization-members', key: 'organization_members', icon: Users },
      { to: '/admin/about/board-decision', key: 'board_decision', icon: FileCheck },
      { to: '/admin/about/certificate', key: 'certificate', icon: FileText },
      { to: '/admin/about/basic-standards', key: 'basic_standards', icon: LayoutList },
    ],
  },
  {
    label: 'news_media',
    icon: Newspaper,
    items: [
      { to: '/admin/news/create-post', key: 'create_post', icon: Newspaper },
      { to: '/admin/news/articles', key: 'news_articles', icon: Newspaper },
      { to: '/admin/news/photo-albums', key: 'photo_albums', icon: Image },
      { to: '/admin/news/video-albums', key: 'video_albums', icon: Video },
    ],
  },
  {
    label: 'contribute',
    icon: Coins,
    items: [
      { to: '/admin/contribute/donations', key: 'donations', icon: Coins },
      { to: '/admin/contribute/donation-opportunities', key: 'donation_opportunities', icon: Heart },
      { to: '/admin/contribute/sponsors', key: 'sponsors', icon: UserPlus },
      { to: '/admin/contribute/volunteers', key: 'volunteers', icon: UserCheck },
      { to: '/admin/contribute/opportunities', key: 'opportunities', icon: Heart },
      { to: '/admin/contribute/opportunity-register', key: 'opportunity_register', icon: ClipboardList },
      { to: '/admin/contribute/membership', key: 'membership', icon: Users },
      { to: '/admin/contribute/partnership', key: 'partnership', icon: Hand },
    ],
  },
  {
    label: 'beneficiary_services',
    icon: UserCheck,
    items: [
      { to: '/admin/beneficiaries/registrations', key: 'beneficiary_registrations', icon: UserCheck },
      { to: '/admin/beneficiaries/services', key: 'available_services', icon: LayoutList },
      { to: '/admin/beneficiaries/service-requests', key: 'service_requests', icon: FileCheck },
    ],
  },
  {
    label: 'reports',
    icon: FileText,
    items: [
      { to: '/admin/reports/annual', key: 'annual_reports', icon: FileText },
      { to: '/admin/reports/governance', key: 'governance', icon: Scale },
    ],
  },
  {
    label: 'contact',
    icon: MessageCircle,
    items: [
      { to: '/admin/contact/messages', key: 'messages', icon: MessageCircle },
      { to: '/admin/contact/info', key: 'contact_info', icon: Settings },
    ],
  },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [openSections, setOpenSections] = useState({})
  const [mobileOpen, setMobileOpen] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const { user, logout } = useAdminAuth()
  const navigate = useNavigate()

  // Translations for admin panel
  const translations = {
    en: {
      dashboard: 'Dashboard',
      about_us: 'About Us',
      board_members: 'Board Members',
      organization_members: 'Organization Members',
      board_decision: 'Board Establishment Decision',
      certificate: 'Organization Certificate',
      basic_standards: 'Basic Standards',
      news_media: 'News & Media',
      create_post: 'Create Post',
      news_articles: 'News & Announcements',
      photo_albums: 'Photo Albums',
      video_albums: 'Video Albums',
      contribute: 'Contribute',
      donations: 'Donations',
      donation_opportunities: 'Donation Opportunities',
      sponsors: 'Sponsor Registration',
      volunteers: 'Volunteer Registration',
      opportunities: 'Volunteer Opportunities',
      opportunity_register: 'Opportunity Registration',
      membership: 'Membership',
      partnership: 'Partnership',
      beneficiary_services: 'Beneficiary Services',
      beneficiary_registrations: 'Beneficiary Registrations',
      available_services: 'Available Services',
      service_requests: 'Service Requests',
      reports: 'Reports',
      annual_reports: 'Annual Reports',
      governance: 'Governance',
      contact: 'Contact',
      messages: 'Contact Messages',
      contact_info: 'Contact Info',
      settings: 'Settings',
      view_site: 'View site',
      logout: 'Logout',
      mathwaa_admin: 'Mathwaa Admin',
    },
    ar: {
      dashboard: 'لوحة التحكم',
      about_us: 'عنا',
      board_members: 'أعضاء مجلس الإدارة',
      organization_members: 'أعضاء الجمعية',
      board_decision: 'قرار تشكيل المجلس',
      certificate: 'شهادة تسجيل الجمعية',
      basic_standards: 'المعايير الأساسية',
      news_media: 'الأخبار والوسائط',
      create_post: 'إنشاء منشور',
      news_articles: 'الأخبار والإعلانات',
      photo_albums: 'ألبوم الصور',
      video_albums: 'ألبوم الفيديو',
      contribute: 'ساهم معنا',
      donations: 'التبرعات',
      donation_opportunities: 'فرص التبرع',
      sponsors: 'تسجيل المحسنين',
      volunteers: 'تسجيل المتطوعين',
      opportunities: 'فرص التطوع',
      opportunity_register: 'تسجيل فرصة تطوع',
      membership: 'العضوية',
      partnership: 'الشراكة',
      beneficiary_services: 'خدمات المستفيدين',
      beneficiary_registrations: 'تسجيل المستفيدين',
      available_services: 'الخدمات المتوفرة',
      service_requests: 'طلبات الخدمة',
      reports: 'التقارير',
      annual_reports: 'التقارير السنوية',
      governance: 'الحوكمة',
      contact: 'اتصل',
      messages: 'رسائل التواصل',
      contact_info: 'معلومات الاتصال',
      settings: 'الإعدادات',
      view_site: 'عرض الموقع',
      logout: 'تسجيل الخروج',
      mathwaa_admin: 'إدارة ماثوا',
    }
  }

  const t = translations[language]

  // Listen for language changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en'
      setLanguage(newLanguage)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('languageChanged', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('languageChanged', handleStorageChange)
    }
  }, [])

  // Update document direction and language based on current language
  React.useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.body.dir = language === 'ar' ? 'rtl' : 'ltr'
  }, [language])

  // Function to switch language
  const switchLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
    window.dispatchEvent(new Event('languageChanged'))
  }

  const toggleSection = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }))
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col border-r border-gray-200 bg-white transform transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 flex-shrink-0">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#C89B3C' }}>
              <LayoutDashboard size={20} className="text-white" />
            </div>
            <span className="font-bold text-gray-900">{t.mathwaa_admin}</span>
          </Link>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <NavLink
            to="/admin/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mb-2 font-medium text-gray-700 hover:bg-gray-100"
            style={({ isActive }) => (isActive ? { backgroundColor: 'rgba(200,155,60,0.1)', color: '#C89B3C' } : {})}
          >
            <LayoutDashboard size={20} style={{ color: '#C89B3C' }} />
            {t.dashboard}
          </NavLink>
          {sidebarSections.map((section) => {
            const isOpen = openSections[section.label] !== false
            const Icon = section.icon
            return (
              <div key={section.label} className="mb-1">
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left font-medium text-gray-700 hover:bg-gray-100"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={18} style={{ color: '#C89B3C' }} />
                    {t[section.label]}
                  </span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="ml-4 mt-1 space-y-0.5 border-l border-gray-200 pl-2">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                          style={({ isActive }) => (isActive ? { backgroundColor: 'rgba(200,155,60,0.08)', color: '#C89B3C', fontWeight: 600 } : {})}
                        >
                          <ItemIcon size={16} />
                          {t[item.key]}
                        </NavLink>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
          <NavLink
            to="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg mt-2 font-medium text-gray-700 hover:bg-gray-100"
            style={({ isActive }) => (isActive ? { backgroundColor: 'rgba(200,155,60,0.1)', color: '#C89B3C' } : {})}
          >
            <Settings size={20} style={{ color: '#C89B3C' }} />
            {t.settings}
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <Menu size={24} className="text-gray-600" />
          </button>
          <div className="flex-1 lg:flex-none" />
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border-r border-gray-200 pr-3 lg:pr-4">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2 lg:px-3 py-1.5 rounded text-xs lg:text-sm font-semibold transition-all ${
                  language === 'en'
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('ar')}
                className={`px-2 lg:px-3 py-1.5 rounded text-xs lg:text-sm font-semibold transition-all ${
                  language === 'ar'
                    ? 'bg-amber-100 text-amber-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                AR
              </button>
            </div>

            {/* Email */}
            <span className="text-xs lg:text-sm text-gray-500 hidden sm:inline">{user?.email}</span>

            {/* User Profile Menu */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-2 lg:px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-700">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold" style={{ backgroundColor: '#C89B3C' }}>
                  {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <ChevronDown size={16} />
              </button>
              <div className="absolute right-0 mt-1 w-48 py-1 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <Link to="/" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t.view_site}</Link>
                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut size={16} />
                  {t.logout}
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-gray-100">
          <Outlet />
        </main>
      </div>
      {mobileOpen && <div className="fixed inset-0 bg-black/30 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}
    </div>
  )
}
