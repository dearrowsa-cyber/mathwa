import React, { useState } from 'react'
import { HeroSection, Container, Section } from '../components/Common'
import { Link } from 'react-router-dom'
import { FaPaperPlane, FaUser, FaPhone, FaBriefcase, FaAward, FaUserPlus } from 'react-icons/fa'

const VolunteerRegistration = () => {
  const lang = localStorage.getItem('language') || 'en'
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const initialState = {
    full_name_ar: '',
    full_name_en: '',
    national_id: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    education_level: '',
    field_of_study: '',
    current_occupation: '',
    skills: [],
    volunteer_interests: '',
    previous_experience: '',
    available_times: '',
    emergency_contact_name: '',
    emergency_contact_phone: ''
  }

  const [formData, setFormData] = useState(initialState)

  const t = {
    en: {
      title: 'Volunteer Registration',
      subtitle: 'Join the volunteer team and contribute to community service',
      form_title: 'Join the volunteer team',
      fill_form: 'Fill out the form below to join.',
      personal: 'Personal Information',
      contact: 'Contact Information',
      education: 'Education and Work',
      skills: 'Skills and Interests',
      emergency: 'Emergency Contact',
      submit: 'Register as Volunteer',
      home: 'Home',
      volunteering: 'Volunteering'
    },
    ar: {
      title: 'تسجيل المتطوعين',
      subtitle: 'انضم إلى فريق المتطوعين وساهم في خدمة المجتمع',
      form_title: 'انضم لفريق المتطوعين',
      fill_form: 'املأ النموذج أدناه للانضمام.',
      personal: 'المعلومات الشخصية',
      contact: 'معلومات الاتصال',
      education: 'التعليم والعمل',
      skills: 'المهارات والاهتمامات',
      emergency: 'جهة الاتصال في حالات الطوارئ',
      submit: 'تسجيل كمتطوع',
      home: 'الرئيسية',
      volunteering: 'التطوع'
    }
  }[lang]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.full_name_ar.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please fill required fields' })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'

      const response = await fetch(`${BACKEND_URL}/api/submit-volunteer-registration.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: 'Registration successful 🎉' })
        setFormData(initialState)
      } else {
        setSubmitMessage({ type: 'error', text: data.message || 'Error occurred' })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Connection error' })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle =
    "w-full px-4 py-3 border border-gray-300 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-[#C89B3C] transition-all duration-200 shadow-sm hover:shadow-md"

  const cardStyle =
    "bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 p-8 shadow-lg hover:shadow-2xl transition-all duration-300"

  return (
    <>
      <HeroSection title={t.title} subtitle={t.subtitle} />

      <div className="bg-gray-100 py-2">
        <Container>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0E4B33]">{t.home}</Link>
            <span className="mx-2">/</span>
            <Link to="/volunteer-opportunities" className="hover:text-[#0E4B33]">{t.volunteering}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{t.title}</span>
          </nav>
        </Container>
      </div>

      <Section className="relative bg-gradient-to-br from-[#f8fafc] via-[#eef2f7] to-[#f1f5f9] py-16">
        <Container>
          <div className="max-w-3xl mx-auto">

            {/* Emotional Header */}
            <div className="bg-[#0E4B33] text-white p-6 rounded-2xl mb-10 shadow-lg">
              <h3 className="text-xl font-semibold">
                {lang === 'ar' ? 'كن جزءاً من التغيير' : 'Be a Part of the Change'}
              </h3>
              <p className="text-sm opacity-90 mt-1">
                {lang === 'ar'
                  ? 'تطوعك يصنع فرقاً حقيقياً في المجتمع.'
                  : 'Your volunteering creates real impact in the community.'}
              </p>
            </div>

            {submitMessage.text && (
              <div className={`p-4 rounded-xl mb-8 text-sm font-medium shadow-md ${
                submitMessage.type === 'success'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Personal */}
              <div className={cardStyle}>
                <div className="flex items-center gap-3 mb-6 border-b pb-3">
                  <FaUser className="text-[#C89B3C]" size={22} />
                  <h3 className="text-lg font-bold text-[#0E4B33]">{t.personal}</h3>
                </div>

                <div className="space-y-4">
                  <input name="full_name_ar" placeholder="Full Name (Arabic)" value={formData.full_name_ar} onChange={handleInputChange} className={inputStyle} required />
                  <input name="full_name_en" placeholder="Full Name (English)" value={formData.full_name_en} onChange={handleInputChange} className={inputStyle} />
                  <input name="national_id" placeholder="National ID" value={formData.national_id} onChange={handleInputChange} className={inputStyle} />
                  <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} className={inputStyle} />
                </div>
              </div>

              {/* Contact */}
              <div className={cardStyle}>
                <div className="flex items-center gap-3 mb-6 border-b pb-3">
                  <FaPhone className="text-[#C89B3C]" size={22} />
                  <h3 className="text-lg font-bold text-[#0E4B33]">{t.contact}</h3>
                </div>

                <div className="space-y-4">
                  <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className={inputStyle} required />
                  <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className={inputStyle} required />
                  <input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} className={inputStyle} />
                  <textarea name="address" placeholder="Full Address" value={formData.address} onChange={handleInputChange} className={inputStyle} rows="3" />
                </div>
              </div>

              {/* Education */}
              <div className={cardStyle}>
                <div className="flex items-center gap-3 mb-6 border-b pb-3">
                  <FaBriefcase className="text-[#C89B3C]" size={22} />
                  <h3 className="text-lg font-bold text-[#0E4B33]">{t.education}</h3>
                </div>

                <div className="space-y-4">
                  <input name="education_level" placeholder="Education Level" value={formData.education_level} onChange={handleInputChange} className={inputStyle} />
                  <input name="field_of_study" placeholder="Field of Study" value={formData.field_of_study} onChange={handleInputChange} className={inputStyle} />
                  <input name="current_occupation" placeholder="Current Occupation" value={formData.current_occupation} onChange={handleInputChange} className={inputStyle} />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="relative w-full py-4 rounded-2xl font-semibold text-white 
                flex items-center justify-center gap-2 
                bg-gradient-to-r from-[#C89B3C] to-[#a87c2d] 
                hover:scale-[1.02] active:scale-95 
                transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
              >
                <FaPaperPlane size={20} />
                {loading ? 'Submitting...' : t.submit}
              </button>

            </form>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default VolunteerRegistration
