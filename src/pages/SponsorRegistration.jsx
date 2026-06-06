import React, { useState } from 'react'
import { HeroSection, Section, Container } from '../components/Common'
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

const SponsorRegistration = () => {
  const lang = localStorage.getItem('language') || 'en'
  const [type, setType] = useState('individual')
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    email: '',
    id_number: '',
    phone: '',
    city: '',
    donation_type: 'one_time',
    expected_donation_amount: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const t = {
    en: {
      title: 'Sponsor Registration',
      subtitle: 'Register as a Sponsor',
      form_title: 'Benefactor Registration Form',
      individual: 'Individual',
      company: 'Company / Institution',
      name_ar: 'Name in Arabic',
      name_en: 'Name in English',
      email: 'Email',
      id_number: 'ID / Residency number',
      mobile: 'Mobile Number',
      city: 'City',
      donation_type: 'Preferred Donation Type',
      donation_amount: 'Expected Donation Amount',
      notes: 'Additional Notes',
      submit: 'Register',
      home: 'Home',
      contribute: 'Contribute with Us',
      monthly: 'Monthly',
      one_time: 'One Time',
    },
    ar: {
      title: 'تسجيل المحسنين',
      subtitle: 'تسجيل المحسنين',
      form_title: 'نموذج تسجيل المحسنين',
      individual: 'فرد',
      company: 'شركة / مؤسسة',
      name_ar: 'الاسم بالعربية',
      name_en: 'الاسم بالإنجليزية',
      email: 'البريد الإلكتروني',
      id_number: 'رقم الهوية / الإقامة',
      mobile: 'رقم الجوال',
      city: 'المدينة',
      donation_type: 'نوع التبرع المفضل',
      donation_amount: 'مبلغ التبرع المتوقع',
      notes: 'ملاحظات إضافية',
      submit: 'تسجيل',
      home: 'الرئيسية',
      contribute: 'ساهم معنا',
      monthly: 'شهري',
      one_time: 'مرة واحدة',
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
    
    if (!formData.name_ar.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء إدخال الاسم' : 'Please enter name' })
      return
    }
    if (!formData.email.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter email' })
      return
    }
    if (!formData.id_number.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء إدخال رقم الهوية' : 'Please enter ID number' })
      return
    }
    if (!formData.phone.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء إدخال رقم الجوال' : 'Please enter phone' })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      
      const response = await fetch(`${BACKEND_URL}/api/submit-sponsor-registration.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sponsor_type: type
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || (lang === 'ar' ? 'تم تسجيلك بنجاح' : 'Registration successful') })
        setFormData({
          name_ar: '',
          name_en: '',
          email: '',
          id_number: '',
          phone: '',
          city: '',
          donation_type: 'one_time',
          expected_donation_amount: '',
          notes: ''
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

    <Section>
      <Container>
        <div className="relative max-w-4xl mx-auto">

          {/* Decorative Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E4B33]/20 to-[#C89B3C]/20 blur-3xl rounded-3xl"></div>

          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-10">

            <h2 className="text-2xl font-bold text-center text-[#0E4B33] mb-2">
              {t.form_title}
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#0E4B33] to-[#C89B3C] mx-auto mb-8 rounded-full"></div>

            {submitMessage.text && (
              <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitMessage.text}
              </div>
            )}

            {/* Sponsor Type Toggle */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
              {['individual', 'company'].map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setType(option)}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    type === option
                      ? 'bg-gradient-to-r from-[#0E4B33] to-[#C89B3C] text-white shadow-md'
                      : 'text-gray-600 hover:text-[#0E4B33]'
                  }`}
                >
                  {option === 'individual' ? t.individual : t.company}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

              {/* Name Arabic */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.name_ar}</label>
                <input
                  type="text"
                  name="name_ar"
                  value={formData.name_ar}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* Name English */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.name_en}</label>
                <input
                  type="text"
                  name="name_en"
                  value={formData.name_en}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* ID */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.id_number}</label>
                <input
                  type="text"
                  name="id_number"
                  value={formData.id_number}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.mobile}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* City */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.city}</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* Donation Type */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.donation_type}</label>
                <select
                  name="donation_type"
                  value={formData.donation_type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                >
                  <option value="one_time">{t.one_time}</option>
                  <option value="monthly">{t.monthly}</option>
                </select>
              </div>

              {/* Donation Amount */}
              <div>
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.donation_amount}</label>
                <input
                  type="number"
                  name="expected_donation_amount"
                  value={formData.expected_donation_amount}
                  onChange={handleInputChange}
                  placeholder="100"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-1 block">{t.notes}</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] outline-none transition"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl font-semibold text-white text-lg bg-gradient-to-r from-[#0E4B33] to-[#C89B3C] shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (lang === 'ar' ? 'جاري...' : 'Submitting...') : t.submit}
                  {!loading && <FaArrowRight size={20} />}
                </button>
              </div>

            </form>

          </div>
        </div>
      </Container>
    </Section>
  </>
)

}

export default SponsorRegistration
