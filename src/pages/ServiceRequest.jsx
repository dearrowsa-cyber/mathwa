import React, { useState } from 'react'
import { HeroSection, Section, Container } from '../components/Common'
import { Link } from 'react-router-dom'
import { FaPaperPlane, FaInfoCircle } from 'react-icons/fa'

const ServiceRequest = () => {
  const lang = localStorage.getItem('language') || 'en'
  const [formData, setFormData] = useState({
    requester_name_ar: '',
    requester_name_en: '',
    national_id: '',
    mobile: '',
    email: '',
    city: '',
    service_type: '',
    service_category: '',
    request_description: '',
    urgency_level: 'normal',
    preferred_contact_method: 'phone',
    preferred_contact_time: '',
    family_situation: '',
    financial_situation: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const t = {
    en: {
      title: 'Service Request',
      subtitle: 'Submit your request and we will contact you as soon as possible',
      note: 'You must be registered as a beneficiary first. If you are not registered, register here.',
      national_id: 'National ID / Residency Number *',
      beneficiary_number: 'Registered number in the beneficiary system',
      request_title: 'Request Title *',
      request_title_placeholder: 'e.g. Request for preparing a deceased',
      service_type: 'Type of requested service *',
      service_type_placeholder: 'Select service type...',
      request_description: 'Describe the request in detail *',
      request_description_placeholder: 'Please describe your need in detail',
      priority: 'Priority Level *',
      priority_medium: 'Medium',
      priority_high: 'High',
      priority_low: 'Low',
      submit: 'Submit Request',
      register_here: 'Register here',
      home: 'Home',
      beneficiary_services: 'Beneficiary Services',
    },
    ar: {
      title: 'طلب خدمة',
      subtitle: 'قدم طلبك وسنتواصل معك في أقرب وقت',
      note: 'يجب أن تكون مسجلاً كمستفيد أولاً. إذا لم تكن مسجلاً، سجل هنا',
      national_id: 'رقم الهوية الوطنية / الإقامة *',
      beneficiary_number: 'الرقم المسجل في نظام المستفيدين',
      request_title: 'عنوان الطلب *',
      request_title_placeholder: 'مثال: طلب تجهيز متوفى',
      service_type: 'نوع الخدمة المطلوبة *',
      service_type_placeholder: 'اختر نوع الخدمة...',
      request_description: 'وصف الطلب بالتفصيل *',
      request_description_placeholder: 'الرجاء وصف احتياجك بالتفصيل',
      priority: 'مستوى الأولوية *',
      priority_medium: 'متوسطة',
      priority_high: 'عالية',
      priority_low: 'منخفضة',
      submit: 'إرسال الطلب',
      register_here: 'سجل هنا',
      home: 'الرئيسية',
      beneficiary_services: 'خدمات المستفيدين',
    },
  }[lang]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.requester_name_ar.trim() || !formData.mobile.trim() || !formData.service_type.trim() || !formData.request_description.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields' })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      
      const response = await fetch(`${BACKEND_URL}/api/submit-service-request.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || (lang === 'ar' ? 'تم استقبال طلبك بنجاح' : 'Service request submitted successfully') })
        setFormData({
          requester_name_ar: '',
          requester_name_en: '',
          national_id: '',
          mobile: '',
          email: '',
          city: '',
          service_type: '',
          service_category: '',
          request_description: '',
          urgency_level: 'normal',
          preferred_contact_method: 'phone',
          preferred_contact_time: '',
          family_situation: '',
          financial_situation: ''
        })
      } else {
        setSubmitMessage({ type: 'error', text: data.message || (lang === 'ar' ? 'حدث خطأ' : 'Error occurred') })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'خطأ في الاتصال' : 'Connection error' })
      console.error('Error:', error)
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
            <Link to="/beneficiary-services" className="hover:text-[#0E4B33]">{t.beneficiary_services}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{t.title}</span>
          </nav>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-start gap-3 p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
              <FaInfoCircle size={22} style={{ color: '#2563eb', flexShrink: 0 }} />
              <p className="text-gray-700 text-sm">
                {t.note} <Link to="/beneficiary-register" className="font-semibold hover:underline" style={{ color: '#0E4B33' }}>{t.register_here}</Link>
              </p>
            </div>
            {submitMessage.text && (
              <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitMessage.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'الاسم بالعربية *' : 'Name in Arabic *'}</label>
                <input type="text" name="requester_name_ar" value={formData.requester_name_ar} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'الاسم بالإنجليزية' : 'Name in English'}</label>
                <input type="text" name="requester_name_en" value={formData.requester_name_en} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.national_id}</label>
                <input type="text" name="national_id" value={formData.national_id} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'رقم الجوال *' : 'Mobile Number *'}</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'المدينة' : 'City'}</label>
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.service_type}</label>
                <select name="service_type" value={formData.service_type} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent" required>
                  <option value="">{t.service_type_placeholder}</option>
                  <option value="deceased_preparation">Deceased Preparation</option>
                  <option value="transport">Transport</option>
                  <option value="burial">Burial</option>
                  <option value="psychological_support">Psychological Support</option>
                  <option value="financial_aid">Financial Aid</option>
                  <option value="medical_services">Medical Services</option>
                  <option value="food_assistance">Food Assistance</option>
                  <option value="housing_assistance">Housing Assistance</option>
                  <option value="educational_support">Educational Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.request_description}</label>
                <textarea rows={4} name="request_description" value={formData.request_description} onChange={handleInputChange} placeholder={t.request_description_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.priority}</label>
                <select name="urgency_level" value={formData.urgency_level} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent">
                  <option value="normal">{t.priority_medium}</option>
                  <option value="urgent">{t.priority_high}</option>
                  <option value="very_urgent">{lang === 'ar' ? 'فوري جداً' : 'Very Urgent'}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'طريقة التواصل المفضلة' : 'Preferred Contact Method'}</label>
                <select name="preferred_contact_method" value={formData.preferred_contact_method} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent">
                  <option value="phone">{lang === 'ar' ? 'الهاتف' : 'Phone'}</option>
                  <option value="email">{lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}</option>
                  <option value="whatsapp">WhatsApp</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'الوقت المفضل للتواصل' : 'Preferred Contact Time'}</label>
                <input type="text" name="preferred_contact_time" value={formData.preferred_contact_time} onChange={handleInputChange} placeholder={lang === 'ar' ? 'مثال: صباحاً من 9-12' : 'e.g. Morning 9-12'} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'الوضع العائلي' : 'Family Situation'}</label>
                <textarea rows={3} name="family_situation" value={formData.family_situation} onChange={handleInputChange} placeholder={lang === 'ar' ? 'وصف وضعك العائلي' : 'Describe your family situation'} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{lang === 'ar' ? 'الوضع المالي' : 'Financial Situation'}</label>
                <textarea rows={3} name="financial_situation" value={formData.financial_situation} onChange={handleInputChange} placeholder={lang === 'ar' ? 'وصف وضعك المالي' : 'Describe your financial situation'} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent" />
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:opacity-50" style={{ backgroundColor: '#C89B3C' }}>
                <FaPaperPlane size={20} />
                {loading ? (lang === 'ar' ? 'جاري...' : 'Submitting...') : t.submit}
              </button>
            </form>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default ServiceRequest
