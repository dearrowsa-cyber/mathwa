import React, { useState, useEffect } from 'react'
import { Section, Container, SectionTitle } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaFileAlt, FaUniversity, FaInfoCircle, FaDownload, FaExclamationCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BasicStandards = () => {
  const lang = localStorage.getItem('language') || 'en'
  const isAr = lang === 'ar'
  const [standard, setStandard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const t = {
    en: {
      title: 'Basic Standards',
      subtitle: 'Basic Standards for Mathwaa Association',
      section_title: 'Basic Standards',
      approved: 'Basic Standards approved by the National Center for Non-Profit Sector Development',
      authorities: 'Official Authorities',
      supervising: 'Supervising Authority: Ministry of Municipal, Rural Affairs and Housing',
      classification: 'Classification: Group Six - Development and Housing',
      license_info: 'License Information',
      license_no: 'License No.: 1000827300',
      license_date: 'License Date: 1447/06/05 AH',
      headquarters: 'Headquarters: Al-Ahsa Governorate',
      governance_note: 'To view the details of the Basic Standards, please visit the Governance and Transparency page.',
      download_btn: 'Download Basic Standards (PDF)',
      home: 'Home',
      about: 'About Us',
      governance: 'Governance',
      loading: 'Loading...',
      error: 'Error loading standards',
    },
    ar: {
      title: 'اللائحة الأساسية',
      subtitle: 'اللائحة الأساسية لجمعية مثوى الأهلية',
      section_title: 'اللائحة الأساسية',
      approved: 'اللائحة الأساسية المعتمدة من المركز الوطني لتنمية القطاع غير الربحي',
      authorities: 'الجهات الرسمية',
      supervising: 'الجهة المشرفة: وزارة الشؤون البلدية والقروية والإسكان',
      classification: 'التصنيف: المجموعة السادسة - التنمية والإسكان',
      license_info: 'معلومات الترخيص',
      license_no: 'رقم الترخيص: 1000827300',
      license_date: 'تاريخ الترخيص: 1447/06/05هـ',
      headquarters: 'المقر: محافظة الأحساء',
      governance_note: 'للاطلاع على تفاصيل اللائحة الأساسية، يرجى زيارة صفحة الحوكمة والشفافية',
      download_btn: 'تحميل اللائحة الأساسية (PDF)',
      home: 'الرئيسية',
      about: 'عن الجمعية',
      governance: 'الحوكمة',
      loading: 'جاري التحميل...',
      error: 'خطأ في تحميل اللائحة',
    },
  }[lang]

  useEffect(() => {
    const fetchStandard = async () => {
      try {
        setLoading(true)
        const apiUrl = import.meta.env.DEV
          ? '/api/basic-standards.php'
          : `${import.meta.env.VITE_BACKEND_URL}/Backend/api/basic-standards.php`
        
        const response = await fetch(`${apiUrl}?lang=${lang}`)
        const result = await response.json()
        
        if (result.success && result.data && result.data.length > 0) {
          setStandard(result.data[0])
          setError(null)
        } else if (result.success && result.data) {
          setStandard(result.data)
          setError(null)
        } else {
          setError('Standards not found')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchStandard()
  }, [lang])

  const handleDownload = () => {
    if (standard && standard.pdf_file) {
      // Construct proper file path
      const pdfPath = standard.pdf_file.startsWith('/')
        ? standard.pdf_file
        : `/${standard.pdf_file}`
      
      // In dev mode, use full localhost URL; in prod, use VITE_BACKEND_URL
      const fileUrl = import.meta.env.DEV
        ? `https://mathwaa.org.sa/${pdfPath}`
        : `${import.meta.env.VITE_BACKEND_URL}${pdfPath}`
      
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = 'basic-standards.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.about, to: '/about' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          {loading ? (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10 text-center">
              <p className="text-gray-600">{t.loading}</p>
            </div>
          ) : error ? (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
              <div className="flex items-center gap-3">
                <FaExclamationCircle size={24} style={{ color: '#dc2626' }} />
                <p className="text-red-600">{t.error}</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-10">
              <div className="flex items-center gap-2 mb-6">
                <FaFileAlt size={28} style={{ color: '#0E4B33' }} />
                <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>{t.section_title}</h2>
              </div>
              <p className="text-gray-700 mb-8">{t.approved}</p>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FaUniversity size={22} style={{ color: '#0E4B33' }} />
                  <h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.authorities}</h3>
                </div>
                <p className="text-gray-700">{t.supervising}</p>
                <p className="text-gray-700">{t.classification}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FaFileAlt size={22} style={{ color: '#0E4B33' }} />
                  <h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.license_info}</h3>
                </div>
                <p className="text-gray-700">{t.license_no}</p>
                <p className="text-gray-700">{t.license_date}</p>
                <p className="text-gray-700">{t.headquarters}</p>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg mb-8" style={{ backgroundColor: 'rgba(14,75,51,0.06)' }}>
                <FaInfoCircle size={24} style={{ color: '#0E4B33', flexShrink: 0 }} />
                <p className="text-gray-700 text-sm">
                  {t.governance_note}{' '}
                  <Link to="/governance" className="font-semibold hover:underline" style={{ color: '#0E4B33' }}>{t.governance}</Link>
                </p>
              </div>

              <button
                onClick={handleDownload}
                disabled={!standard || !standard.pdf_file}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#0E4B33' }}
              >
                <FaDownload size={20} />
                {t.download_btn}
              </button>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default BasicStandards
