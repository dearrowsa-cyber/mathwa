import React, { useState, useEffect } from 'react'
import { Section, Container } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaAward, FaCheckCircle, FaDownload, FaExclamationCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OrganizationCertificate = () => {
  const lang = localStorage.getItem('language') || 'en'
  const [certificate, setCertificate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true)
        const apiUrl = import.meta.env.DEV
          ? '/api/organization-certificates.php'
          : `${import.meta.env.VITE_BACKEND_URL}/Backend/api/organization-certificates.php`
        
        const response = await fetch(`${apiUrl}?lang=${lang}`)
        const result = await response.json()
        
        if (result.success && result.data && result.data.length > 0) {
          setCertificate(result.data[0])
          setError(null)
        } else if (result.success && result.data) {
          setCertificate(result.data)
          setError(null)
        } else {
          setError('Certificate not found')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchCertificate()
  }, [lang])

  const handleDownload = () => {
    if (certificate && certificate.file_path) {
      // Construct proper file path
      const filePath = certificate.file_path.startsWith('/')
        ? certificate.file_path
        : `/${certificate.file_path}`
      
      // In dev mode, use full localhost URL; in prod, use VITE_BACKEND_URL
      const fileUrl = import.meta.env.DEV
        ? `https://mathwaa.org.sa/${filePath}`
        : `${import.meta.env.VITE_BACKEND_URL}${filePath}`
      
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = certificate.file_name || 'organization-certificate.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const t = {
    en: {
      title: 'Organization Certificate',
      subtitle: 'Association Registration Certificate',
      doc_title: 'Registration Certificate',
      doc_subtitle: 'Official registration certificate of Mathwaa Charitable Association',
      doc_available: 'The certificate is available for download',
      download_btn: 'Download Certificate',
      home: 'Home',
      about: 'About Us',
      loading: 'Loading...',
      error: 'Error loading certificate',
    },
    ar: {
      title: 'شهادة تسجيل الجمعية',
      subtitle: 'شهادة تسجيل الجمعية',
      doc_title: 'شهادة التسجيل',
      doc_subtitle: 'الشهادة الرسمية لتسجيل جمعية مثوى الأهلية',
      doc_available: 'الشهادة متاحة للتحميل',
      download_btn: 'تحميل الشهادة',
      home: 'الرئيسية',
      about: 'عن الجمعية',
      loading: 'جاري التحميل...',
      error: 'خطأ في تحميل الشهادة',
    },
  }[lang]

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
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            {loading ? (
              <div className="py-8">
                <FaAward size={64} className="mx-auto mb-6" style={{ color: '#0E4B33' }} />
                <p className="text-gray-600">{t.loading}</p>
              </div>
            ) : error ? (
              <div className="py-8">
                <FaExclamationCircle size={64} className="mx-auto mb-6" style={{ color: '#dc2626' }} />
                <p className="text-red-600">{t.error}</p>
              </div>
            ) : (
              <>
                <FaAward size={64} className="mx-auto mb-6" style={{ color: '#0E4B33' }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t.doc_title}</h2>
                <p className="text-gray-600 mb-6">{t.doc_subtitle}</p>
                <div className="flex items-center justify-center gap-2 text-gray-700 mb-8">
                  <FaCheckCircle size={22} style={{ color: '#0E4B33' }} />
                  <span>{t.doc_available}</span>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={!certificate || !certificate.file_path}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#C89B3C' }}
                >
                  <FaDownload size={22} />
                  {t.download_btn}
                </button>
              </>
            )}
          </div>
        </Container>
      </Section>
    </>
  )
}

export default OrganizationCertificate
