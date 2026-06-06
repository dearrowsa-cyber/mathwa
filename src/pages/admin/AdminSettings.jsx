import React, { useState, useEffect } from 'react'

const translations = {
  en: {
    settings: 'Settings',
    site_wide_settings: 'Site-wide settings. Connect backend to save.',
    site_name: 'Site name',
    contact_email: 'Contact email',
    contact_phone: 'Contact phone',
    save_button: 'Save (connect backend)',
    mathwaa_association: 'Mathwaa Association',
    info_email: 'info@mathwaa.org',
    info_phone: '+966 53 962 6662'
  },
  ar: {
    settings: 'الإعدادات',
    site_wide_settings: 'إعدادات الموقع. تحتاج إلى توصيل الواجهة الخلفية للحفظ.',
    site_name: 'اسم الموقع',
    contact_email: 'البريد الإلكتروني للتواصل',
    contact_phone: 'رقم الهاتف للتواصل',
    save_button: 'حفظ (توصيل الواجهة الخلفية)',
    mathwaa_association: 'جمعية مثوى',
    info_email: 'info@mathwaa.org',
    info_phone: '+966 53 962 6662'
  }
}

export default function AdminSettings() {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{t.settings}</h1>
      <p className="text-gray-500 mb-6">{t.site_wide_settings}</p>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.site_name}</label>
          <input type="text" defaultValue={t.mathwaa_association} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact_email}</label>
          <input type="email" defaultValue={t.info_email} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact_phone}</label>
          <input type="tel" defaultValue={t.info_phone} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" />
        </div>
        <button type="button" className="px-4 py-2 rounded-lg font-medium text-white" style={{ backgroundColor: '#C89B3C' }}>
          {t.save_button}
        </button>
      </div>
    </div>
  )
}
