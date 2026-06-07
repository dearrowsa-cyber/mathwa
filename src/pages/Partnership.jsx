import React, { useState, useEffect } from 'react'
import { Container, Card, Grid, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaUniversity, FaExternalLinkAlt, FaHandsHelping } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Partnership = () => {
  const lang = localStorage.getItem('language') || 'en'
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [partners, setPartners] = useState([])
  const [loadingPartners, setLoadingPartners] = useState(true)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    organization_name: '',
    contact_person_name: '',
    email: '',
    phone: '',
    organization_type: '',
    partnership_interest: '',
    proposed_collaboration: ''
  })
  const [loadingForm, setLoadingForm] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })
  
  const t = {
    en: {
      title: 'Partnership',
      subtitle: 'Collaborate with us for greater impact',
      our_partners: 'Our Partners',
      visit_site: 'Visit Site',
      opportunities: 'Partnership Opportunities',
      community: 'Community Partnerships',
      institutional: 'Institutional Partnerships',
      contact_cta: 'Contact Us',
      home: 'Home',
      loading: 'Loading partners...',
      error: 'Failed to load partners. Please try again later.',
    },
    ar: {
      title: 'الشراكة',
      subtitle: 'تعاون معنا من أجل تأثير أكبر',
      our_partners: 'شركاؤنا',
      visit_site: 'زيارة الموقع',
      opportunities: 'فرص الشراكة',
      community: 'شراكات مجتمعية',
      institutional: 'شراكات مؤسسية',
      contact_cta: 'تواصل معنا',
      home: 'الرئيسية',
      loading: 'جاري تحميل الشركاء...',
      error: 'حدث خطأ في تحميل الشركاء. يرجى المحاولة لاحقاً.',
    },
  }[lang]

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoadingPartners(true)
        const response = await fetch(`${BACKEND_URL}/api/partnerships.php?lang=${lang}`)
        const data = await response.json()
        
        if (data.success) {
          setPartners(data.data)
          setError(null)
        } else {
          setError(data.message || 'Failed to load partners')
        }
      } catch (err) {
        setError('Unable to connect to the server')
        console.error('Error fetching partners:', err)
      } finally {
        setLoadingPartners(false)
      }
    }

    fetchPartners()
  }, [lang, BACKEND_URL])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.organization_name.trim() || !formData.contact_person_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء ملء الحقول المطلوبة' : 'Please fill required fields' })
      return
    }

    setLoadingForm(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const response = await fetch(`${BACKEND_URL}/api/submit-partnership-inquiry.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || (lang === 'ar' ? 'تم استقبال استفسارك بنجاح' : 'Inquiry submitted successfully') })
        setFormData({
          organization_name: '',
          contact_person_name: '',
          email: '',
          phone: '',
          organization_type: '',
          partnership_interest: '',
          proposed_collaboration: ''
        })
      } else {
        setSubmitMessage({ type: 'error', text: data.message || (lang === 'ar' ? 'حدث خطأ' : 'Error occurred') })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'خطأ في الاتصال' : 'Connection error' })
      console.error('Error:', error)
    } finally {
      setLoadingForm(false)
    }
  }

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          <h2 className="text-2xl font-bold mb-8" style={{ color: '#0E4B33' }}>{t.our_partners}</h2>
          <Grid cols={2}>
            {loadingPartners ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">{t.loading}</p>
              </div>
            ) : error ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-red-600">{t.error}</p>
              </div>
            ) : partners.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">No partners available at the moment.</p>
              </div>
            ) : (
              partners.map((partner, idx) => (
                <Card key={idx} className="border border-gray-200 p-6 flex flex-col">
                  <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: 'rgba(14,75,51,0.1)' }}>
                    <FaUniversity size={32} style={{ color: '#0E4B33' }} />
                  </div>
                  <h3 className="text-lg font-bold mb-1" style={{ color: '#0E4B33' }}>{partner.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-1">{partner.description}</p>
                  <a href={partner.website} className="inline-flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: '#0E4B33' }}>
                    {t.visit_site}
                    <FaExternalLinkAlt size={14} />
                  </a>
                </Card>
              ))
            )}
          </Grid>
          <div className="mt-16 p-8 rounded-2xl border border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3 mb-6">
              <FaHandsHelping size={32} style={{ color: '#0E4B33' }} />
              <h2 className="text-xl font-bold" style={{ color: '#0E4B33' }}>{lang === 'ar' ? 'استفسر عن الشراكة' : 'Partnership Inquiry Form'}</h2>
            </div>
            
            {submitMessage.text && (
              <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'اسم المنظمة' : 'Organization Name'}</label>
                <input 
                  type="text" 
                  name="organization_name"
                  value={formData.organization_name}
                  onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'أدخل اسم منظمتك' : 'Enter organization name'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'نوع المنظمة' : 'Organization Type'}</label>
                <select 
                  name="organization_type"
                  value={formData.organization_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                >
                  <option value="">{lang === 'ar' ? 'اختر نوعاً' : 'Select type'}</option>
                  <option value="government">{lang === 'ar' ? 'حكومية' : 'Government'}</option>
                  <option value="private_sector">{lang === 'ar' ? 'قطاع خاص' : 'Private Sector'}</option>
                  <option value="ngo">{lang === 'ar' ? 'جمعية أهلية' : 'NGO'}</option>
                  <option value="educational">{lang === 'ar' ? 'تعليمية' : 'Educational'}</option>
                  <option value="healthcare">{lang === 'ar' ? 'صحية' : 'Healthcare'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'اسم جهة الاتصال' : 'Contact Person Name'}</label>
                <input 
                  type="text" 
                  name="contact_person_name"
                  value={formData.contact_person_name}
                  onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'رقم الجوال' : 'Phone'}</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'رقم الجوال' : 'Phone number'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'نوع الشراكة المهتم بها' : 'Partnership Type of Interest'}</label>
                <textarea 
                  name="partnership_interest"
                  value={formData.partnership_interest}
                  onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'اشرح نوع الشراكة التي تهتم بها' : 'Describe the partnership type you are interested in'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'التعاون المقترح' : 'Proposed Collaboration'}</label>
                <textarea 
                  name="proposed_collaboration"
                  value={formData.proposed_collaboration}
                  onChange={handleInputChange}
                  placeholder={lang === 'ar' ? 'اشرح رؤيتك للتعاون' : 'Describe your collaboration vision'}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  rows={3}
                />
              </div>
              <button 
                type="submit" 
                disabled={loadingForm}
                className="w-full py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#C89B3C' }}
              >
                {loadingForm ? (lang === 'ar' ? 'جاري...' : 'Submitting...') : (lang === 'ar' ? 'إرسال الاستفسار' : 'Submit Inquiry')}
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Partnership
