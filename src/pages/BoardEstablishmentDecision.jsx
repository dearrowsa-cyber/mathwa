import React, { useState, useEffect } from 'react'
import { HeroSection, Section, Container } from '../components/Common'
import { FaFileAlt, FaCheckCircle, FaDownload, FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BoardEstablishmentDecision = () => {
  const lang = localStorage.getItem('language') || 'en'
  const BACKEND_URL = typeof import.meta !== 'undefined' && import.meta.env?.VITE_BACKEND_URL 
    ? import.meta.env.VITE_BACKEND_URL 
    : 'https://mathwaa.org.sa/Backend'

  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  const t = {
    en: {
      title: 'Board Establishment Decision',
      subtitle: 'The official document for the decision to form the Board of Directors of Mathwaa Charitable Association',
      doc_available: 'The document is available for download',
      download_btn: 'Download Decision',
      home: 'Home',
      about: 'About Us',
    },
    ar: {
      title: 'قرار تشكيل مجلس الإدارة',
      subtitle: 'الوثيقة الرسمية لقرار تشكيل مجلس إدارة جمعية مثوى الأهلية',
      doc_available: 'الوثيقة متاحة للتحميل',
      download_btn: 'تحميل القرار',
      home: 'الرئيسية',
      about: 'عن الجمعية',
    },
  }[lang]

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/board-decision-documents.php?lang=${lang}`)
      const data = await response.json()
      if (data.success) {
        setDocuments(data.data || [])
      }
    } catch (err) {
      console.error('Failed to fetch documents:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeroSection title={t.title} subtitle={t.subtitle} />
      <div className="bg-gray-100 py-2">
        <Container>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0E4B33]">{t.home}</Link>
            <span className="mx-2">/</span>
            <Link to="/about" className="hover:text-[#0E4B33]">{t.about}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{t.title}</span>
          </nav>
        </Container>
      </div>
      <Section>
        <Container>
          {loading ? (
            <div className="text-center py-12">
              <FaSpinner className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
              <p className="text-gray-600 mt-4">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
              <FaFileAlt size={64} className="mx-auto mb-6" style={{ color: '#0E4B33' }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t.title}</h2>
              <p className="text-gray-600 mb-6">{t.subtitle}</p>
              <p className="text-gray-600">No documents available at this time.</p>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-4">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12">
                  <div className="flex items-start gap-4">
                    <FaFileAlt size={48} className="flex-shrink-0 mt-2" style={{ color: '#0E4B33' }} />
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2" style={{ color: '#0E4B33' }}>{doc.title}</h2>
                      {doc.description && <p className="text-gray-600 mb-4">{doc.description}</p>}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-700">
                          <FaCheckCircle size={22} style={{ color: '#0E4B33' }} />
                          <span>{t.doc_available}</span>
                        </div>
                        <a
                          href={doc.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: '#0E4B33' }}
                        >
                          <FaDownload size={20} />
                          {t.download_btn}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default BoardEstablishmentDecision
