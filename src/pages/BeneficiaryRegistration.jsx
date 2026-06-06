import React, { useState } from 'react'
import { HeroSection, Section, Container } from '../components/Common'
import { Link } from 'react-router-dom'
import { FaPaperPlane, FaUser, FaPhone, FaHome, FaHeart, FaUserPlus, FaFileAlt } from 'react-icons/fa'

const BeneficiaryRegistration = () => {
  const lang = localStorage.getItem('language') || 'en'
  const [formData, setFormData] = useState({
    full_name_ar: '',
    full_name_en: '',
    national_id: '',
    date_of_birth: '',
    gender: '',
    marital_status: '',
    mobile: '',
    email: '',
    city: '',
    address: '',
    family_members: '',
    monthly_income: '',
    employment_status: '',
    has_social_security: '',
    health_status: '',
    special_needs: '',
    emergency_contact_name: '',
    emergency_contact_mobile: '',
    emergency_contact_relationship: '',
    additional_notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })
  const t = {
    en: {
      title: 'Beneficiary Registration',
      subtitle: 'Register your data to benefit from the services of the association',
      form_title: 'Beneficiary Registration Form',
      form_note: 'Please fill in the following data accurately. All information is confidential and will only be used for providing services.',
      personal: 'Personal Information',
      full_name_ar: 'Full name in Arabic',
      national_id: 'National ID / Residency Number',
      full_name_en: 'Full name in English',
      dob: 'Date of Birth',
      gender: 'Gender',
      male: 'Male',
      female: 'Female',
      marital: 'Marital Status',
      contact: 'Contact Information',
      mobile: 'Mobile Number',
      mobile_placeholder: '05xxxxxxxxx',
      email: 'Email Address',
      city: 'City',
      address: 'Full Address',
      address_placeholder: 'Please write the address in detail',
      family: 'Family and Financial Information',
      family_members: 'Number of Family Members',
      monthly_income: 'Monthly Income (SAR)',
      employment: 'Employment Status',
      social_security: 'Do you have social security?',
      yes: 'Yes',
      no: 'No',
      health: 'Health Status and Special Needs',
      health_status: 'Health Status',
      health_placeholder: 'Please mention any chronic diseases or special health conditions',
      special_needs: 'Special Needs',
      special_needs_placeholder: 'Please mention any special needs or disabilities',
      emergency: 'Emergency Contact Person',
      emergency_name: 'Full Name',
      emergency_mobile: 'Mobile Number',
      relationship: 'Relationship',
      relationship_placeholder: 'e.g. brother, son, friend',
      notes: 'Additional Notes',
      notes_placeholder: 'Any other information you would like to add',
      submit: 'Submit Request',
      home: 'Home',
      beneficiary_services: 'Beneficiary Services',
    },
    ar: {
      title: 'تسجيل المستفيدين',
      subtitle: 'سجل بياناتك للاستفادة من خدمات الجمعية',
      form_title: 'نموذج تسجيل المستفيدين',
      form_note: 'الرجاء تعبئة البيانات التالية بدقة. جميع المعلومات سرية ولا تستخدم إلا لأغراض تقديم الخدمات.',
      personal: 'المعلومات الشخصية',
      full_name_ar: 'الاسم الكامل بالعربي',
      national_id: 'رقم الهوية الوطنية / الإقامة',
      full_name_en: 'الاسم الكامل بالانجليزي',
      dob: 'تاريخ الميلاد',
      gender: 'الجنس',
      male: 'ذكر',
      female: 'أنثى',
      marital: 'الحالة الاجتماعية',
      contact: 'معلومات الاتصال',
      mobile: 'رقم الجوال',
      mobile_placeholder: '05xxxxxxxxx',
      email: 'البريد الإلكتروني',
      city: 'المدينة',
      address: 'العنوان الكامل',
      address_placeholder: 'الرجاء كتابة العنوان بالتفصيل',
      family: 'المعلومات العائلية والمالية',
      family_members: 'عدد أفراد الأسرة',
      monthly_income: 'الدخل الشهري (ريال)',
      employment: 'الحالة الوظيفية',
      social_security: 'هل لديك ضمان اجتماعي؟',
      yes: 'نعم',
      no: 'لا',
      health: 'الحالة الصحية والاحتياجات الخاصة',
      health_status: 'الحالة الصحية',
      health_placeholder: 'يرجى ذكر أي أمراض مزمنة أو حالات صحية خاصة',
      special_needs: 'الاحتياجات الخاصة',
      special_needs_placeholder: 'يرجى ذكر أي احتياجات خاصة أو إعاقات',
      emergency: 'جهة الاتصال في حالات الطوارئ',
      emergency_name: 'الاسم الكامل',
      emergency_mobile: 'رقم الجوال',
      relationship: 'صلة القرابة',
      relationship_placeholder: 'مثال: أخ، ابن، صديق',
      notes: 'ملاحظات إضافية',
      notes_placeholder: 'أي معلومات أخرى تود إضافتها',
      submit: 'إرسال الطلب',
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
    
    if (!formData.full_name_ar.trim() || !formData.mobile.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء ملء الحقول المطلوبة' : 'Please fill required fields' })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      
      const response = await fetch(`${BACKEND_URL}/api/submit-beneficiary-registration.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || (lang === 'ar' ? 'تم استقبال طلبك بنجاح' : 'Registration submitted successfully') })
        setFormData({
          full_name_ar: '',
          full_name_en: '',
          national_id: '',
          date_of_birth: '',
          gender: '',
          marital_status: '',
          mobile: '',
          email: '',
          city: '',
          address: '',
          family_members: '',
          monthly_income: '',
          employment_status: '',
          has_social_security: '',
          health_status: '',
          special_needs: '',
          emergency_contact_name: '',
          emergency_contact_mobile: '',
          emergency_contact_relationship: '',
          additional_notes: ''
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
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(59,130,246,0.15)' }}>
                <FaUser size={24} style={{ color: '#2563eb' }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>{t.form_title}</h2>
            </div>
            <p className="text-gray-600 mb-8">{t.form_note}</p>

            {submitMessage.text && (
              <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitMessage.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <FaUser size={22} style={{ color: '#2563eb' }} />
                  <h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.personal}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">{t.full_name_ar}</label><input type="text" name="full_name_ar" value={formData.full_name_ar} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.national_id}</label><input type="text" name="national_id" value={formData.national_id} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.full_name_en}</label><input type="text" name="full_name_en" value={formData.full_name_en} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.dob}</label><input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">{t.gender}</label><div className="flex gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange} className="text-[#C89B3C]" /> {t.male}</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange} className="text-[#C89B3C]" /> {t.female}</label></div></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.marital}</label><select name="marital_status" value={formData.marital_status} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"><option value="">Select Status</option><option value="single">Single</option><option value="married">Married</option><option value="widowed">Widowed</option><option value="divorced">Divorced</option></select></div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6"><FaPhone size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.contact}</h3></div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.mobile}</label><input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder={t.mobile_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.city}</label><input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.address}</label><textarea rows={3} name="address" value={formData.address} onChange={handleInputChange} placeholder={t.address_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6"><Home size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.family}</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.family_members}</label><input type="number" name="family_members" value={formData.family_members} onChange={handleInputChange} min={0} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.monthly_income}</label><input type="number" name="monthly_income" value={formData.monthly_income} onChange={handleInputChange} min={0} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.employment}</label><select name="employment_status" value={formData.employment_status} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"><option value="">Select Status</option><option value="employed">Employed</option><option value="unemployed">Unemployed</option><option value="retired">Retired</option><option value="student">Student</option></select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-2">{t.social_security}</label><div className="flex gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="has_social_security" value="yes" checked={formData.has_social_security === 'yes'} onChange={handleInputChange} className="text-[#C89B3C]" /> {t.yes}</label><label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="has_social_security" value="no" checked={formData.has_social_security === 'no'} onChange={handleInputChange} className="text-[#C89B3C]" /> {t.no}</label></div></div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6"><FaHeart size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.health}</h3></div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.health_status}</label><textarea rows={3} name="health_status" value={formData.health_status} onChange={handleInputChange} placeholder={t.health_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.special_needs}</label><textarea rows={3} name="special_needs" value={formData.special_needs} onChange={handleInputChange} placeholder={t.special_needs_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6"><FaUserPlus size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.emergency}</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.emergency_name}</label><input type="text" name="emergency_contact_name" value={formData.emergency_contact_name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.emergency_mobile}</label><input type="tel" name="emergency_contact_mobile" value={formData.emergency_contact_mobile} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                  <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">{t.relationship}</label><input type="text" name="emergency_contact_relationship" value={formData.emergency_contact_relationship} onChange={handleInputChange} placeholder={t.relationship_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" /></div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4"><FaFileAlt size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.notes}</h3></div>
                <textarea rows={4} name="additional_notes" value={formData.additional_notes} onChange={handleInputChange} placeholder={t.notes_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" />
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

export default BeneficiaryRegistration
