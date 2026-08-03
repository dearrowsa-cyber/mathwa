import React, { useState, useEffect } from 'react'
import { Section, Container } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaAward, FaCheckCircle, FaDownload, FaFileAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OrganizationCertificate = () => {
  const lang = localStorage.getItem('language') || 'en'
  const handleDownload = (type) => {
    const fileUrl = type === 'decision' 
      ? '/docs/Registration-Decision.pdf'
      : '/docs/Registration-Certificate-Info.pdf';
    
    const fileName = type === 'decision'
      ? 'Registration-Decision.pdf'
      : 'Registration-Certificate-Info.pdf';

    const link = document.createElement('a')
    link.href = fileUrl
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const t = {
    en: {
      title: 'Organization Certificate & Registration',
      subtitle: 'Association Registration Certificate and Decision',
      doc_title: 'Registration Certificate',
      doc_subtitle: 'Official registration certificate of Mathwaa Charitable Association',
      decision_title: 'Registration Decision',
      decision_subtitle: 'Official registration decision from the National Center',
      doc_available: 'The document is available for download',
      download_btn: 'Download',
      home: 'Home',
      about: 'About Us',
    },
    ar: {
      title: 'شهادة وقرار تسجيل الجمعية',
      subtitle: 'شهادة وقرار تسجيل الجمعية الأهلية',
      doc_title: 'شهادة التسجيل',
      doc_subtitle: 'الشهادة الرسمية لتسجيل جمعية مثوى الأهلية',
      decision_title: 'قرار التسجيل',
      decision_subtitle: 'القرار الرسمي بتسجيل الجمعية من المركز الوطني',
      doc_available: 'الوثيقة متاحة للتحميل',
      download_btn: 'تحميل',
      home: 'الرئيسية',
      about: 'عن الجمعية',
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
              <FaAward size={64} className="mx-auto mb-6" style={{ color: '#0E4B33' }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t.doc_title}</h2>
              <p className="text-gray-600 mb-6">{t.doc_subtitle}</p>
              <div className="flex items-center justify-center gap-2 text-gray-700 mb-8">
                <FaCheckCircle size={22} style={{ color: '#0E4B33' }} />
                <span>{t.doc_available}</span>
              </div>
              <button
                onClick={() => handleDownload('cert')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#C89B3C' }}
              >
                <FaDownload size={22} />
                {t.download_btn}
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
              <FaFileAlt size={64} className="mx-auto mb-6" style={{ color: '#0E4B33' }} />
              <h2 className="text-2xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t.decision_title}</h2>
              <p className="text-gray-600 mb-6">{t.decision_subtitle}</p>
              <div className="flex items-center justify-center gap-2 text-gray-700 mb-8">
                <FaCheckCircle size={22} style={{ color: '#0E4B33' }} />
                <span>{t.doc_available}</span>
              </div>
              <button
                onClick={() => handleDownload('decision')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#C89B3C' }}
              >
                <FaDownload size={22} />
                {t.download_btn}
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default OrganizationCertificate
