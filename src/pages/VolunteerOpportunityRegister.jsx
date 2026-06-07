import React, { useState } from 'react'
import { Section, Container } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { FaPaperPlane, FaInfoCircle, FaFileAlt, FaUsers, FaCalendarAlt, FaCheckSquare } from 'react-icons/fa'

const VolunteerOpportunityRegister = () => {
  const lang = localStorage.getItem('language') || 'en'
  const [formData, setFormData] = useState({
    opportunity_name: '',
    opportunity_description: '',
    category: '',
    location: '',
    qualification: '',
    volunteer_tasks: '',
    appropriate_age: '18+',
    suitable_disabled: false,
    entity_only: false,
    city_only: false,
    requires_interview: false,
    num_volunteers: '',
    display_date: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    national_ids: '',
    volunteer_tasks_joined: '',
    goal_experience: false,
    goal_skills: false,
    goal_certificate: false,
    goal_reward: false,
    goal_belonging: false,
  })
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const t = {
    en: {
      title: 'Volunteer Opportunity Registration',
      subtitle: 'Submit opportunity details for review and publication',
      note: 'Note: Please provide accurate information. It will be reviewed and approved before publication.',
      basic_info: 'Basic Opportunity Information',
      opportunity_name: 'Opportunity Name *',
      opportunity_desc: 'Opportunity Description *',
      category: 'Category *',
      location: 'Location *',
      requirements: 'Requirements and Qualifications',
      qualification: 'Academic Qualification *',
      qualification_placeholder: 'e.g. High school and above',
      volunteer_tasks: 'Volunteer Tasks *',
      appropriate_age: 'Appropriate Age *',
      opportunity_type: 'Opportunity Type',
      suitable_disabled: 'Suitable for disabled',
      entity_only: 'For entity volunteers only',
      city_only: 'For city volunteers only',
      requires_interview: 'Requires personal interview',
      dates_times: 'Dates and Times',
      num_volunteers: 'Number of Volunteers *',
      display_date: 'Opportunity Display Date *',
      start_date: 'Opportunity Start Date *',
      start_time: 'Opportunity Start Time *',
      end_date: 'Opportunity End Date *',
      end_time: 'Opportunity End Time *',
      volunteer_details: 'Volunteer Details',
      national_ids: 'National ID Numbers of Volunteers *',
      national_ids_placeholder: 'Enter one per line',
      volunteer_tasks_joined: 'Tasks of volunteers joining the opportunity',
      goal: 'Goal of Joining the Opportunity',
      goal_experience: 'Gain experience',
      goal_skills: 'Acquire skills',
      goal_certificate: 'Volunteer certificate',
      goal_reward: 'Reward',
      goal_belonging: 'National belonging',
      submit: 'Submit Opportunity for Approval',
      home: 'Home',
      volunteering: 'Volunteering',
    },
    ar: {
      title: 'تسجيل فرصة تطوعية',
      subtitle: 'قدم تفاصيل الفرصة للمراجعة والنشر',
      note: 'ملاحظة: يرجى تقديم معلومات دقيقة. سيتم مراجعتها والموافقة عليها قبل النشر.',
      basic_info: 'معلومات الفرصة الأساسية',
      opportunity_name: 'مسمى الفرصة *',
      opportunity_desc: 'وصف الفرصة *',
      category: 'التصنيف *',
      location: 'الموقع *',
      requirements: 'المتطلبات والمؤهلات',
      qualification: 'المؤهل العلمي *',
      qualification_placeholder: 'مثال: ثانوية عامة فأعلى',
      volunteer_tasks: 'مهام المتطوع *',
      appropriate_age: 'العمر المناسب *',
      opportunity_type: 'نوع الفرصة',
      suitable_disabled: 'مناسب لذوي الإعاقة',
      entity_only: 'لمتطوعي الجهة فقط',
      city_only: 'لمتطوعي المدينة فقط',
      requires_interview: 'يتطلب مقابلة شخصية',
      dates_times: 'التواريخ والأوقات',
      num_volunteers: 'عدد المتطوعين *',
      display_date: 'تاريخ ظهور الفرصة *',
      start_date: 'تاريخ بداية الفرصة *',
      start_time: 'وقت بداية الفرصة *',
      end_date: 'تاريخ نهاية الفرصة *',
      end_time: 'وقت نهاية الفرصة *',
      volunteer_details: 'تفاصيل المتطوعين',
      national_ids: 'أرقام الهوية الوطنية للمتطوعين *',
      national_ids_placeholder: 'أدخل رقماً في كل سطر',
      volunteer_tasks_joined: 'مهام المتطوعين المنضمين للفرصة',
      goal: 'الهدف من الانضمام للفرصة',
      goal_experience: 'اكتساب خبرة',
      goal_skills: 'اكتساب مهارات',
      goal_certificate: 'شهادة تطوع',
      goal_reward: 'مكافأة',
      goal_belonging: 'الانتماء الوطني',
      submit: 'إرسال الفرصة للاعتماد',
      home: 'الرئيسية',
      volunteering: 'فرص التطوع',
    },
  }[lang]

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.opportunity_name.trim() || !formData.opportunity_description.trim() || !formData.national_ids.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields' })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      
      const response = await fetch(`${BACKEND_URL}/api/submit-volunteer-opportunity-registration.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || (lang === 'ar' ? 'تم استقبال فرصتك بنجاح' : 'Opportunity submitted successfully') })
        setFormData({
          opportunity_name: '',
          opportunity_description: '',
          category: '',
          location: '',
          qualification: '',
          volunteer_tasks: '',
          appropriate_age: '18+',
          suitable_disabled: false,
          entity_only: false,
          city_only: false,
          requires_interview: false,
          num_volunteers: '',
          display_date: '',
          start_date: '',
          start_time: '',
          end_date: '',
          end_time: '',
          national_ids: '',
          volunteer_tasks_joined: '',
          goal_experience: false,
          goal_skills: false,
          goal_certificate: false,
          goal_reward: false,
          goal_belonging: false,
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

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.volunteering, to: '/volunteer-opportunities' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-start gap-3 p-4 rounded-lg mb-8" style={{ backgroundColor: 'rgba(59,130,246,0.1)' }}>
              <FaInfoCircle size={22} style={{ color: '#2563eb', flexShrink: 0 }} />
              <p className="text-gray-700 text-sm">{t.note}</p>
            </div>
            {submitMessage.text && (
              <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {submitMessage.text}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6"><FaFileAlt size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.basic_info}</h3></div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.opportunity_name}</label><input type="text" name="opportunity_name" value={formData.opportunity_name} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.opportunity_desc}</label><textarea name="opportunity_description" value={formData.opportunity_description} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.category}</label><select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required><option value="">Select Category</option><option value="education">Education</option><option value="activities">Activities</option><option value="support">Support</option></select></div>
                    <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.location}</label><select name="location" value={formData.location} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required><option value="">Select Location</option><option value="riyadh">Riyadh</option><option value="jeddah">Jeddah</option><option value="qatif">Qatif</option><option value="dammam">Dammam</option></select></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6"><Users size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.requirements}</h3></div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.qualification}</label><input type="text" name="qualification" value={formData.qualification} onChange={handleInputChange} placeholder={t.qualification_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.volunteer_tasks}</label><textarea name="volunteer_tasks" value={formData.volunteer_tasks} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.appropriate_age}</label><select name="appropriate_age" value={formData.appropriate_age} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required><option value="18+">18+</option><option value="21+">21+</option><option value="25+">25+</option><option value="any">Any</option></select></div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4"><FaCheckSquare size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.opportunity_type}</h3></div>
                <div className="flex flex-wrap gap-6"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="suitable_disabled" checked={formData.suitable_disabled} onChange={handleInputChange} className="rounded text-[#0E4B33]" /> {t.suitable_disabled}</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="entity_only" checked={formData.entity_only} onChange={handleInputChange} className="rounded text-[#0E4B33]" /> {t.entity_only}</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="city_only" checked={formData.city_only} onChange={handleInputChange} className="rounded text-[#0E4B33]" /> {t.city_only}</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="requires_interview" checked={formData.requires_interview} onChange={handleInputChange} className="rounded text-[#0E4B33]" /> {t.requires_interview}</label></div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6"><FaCalendarAlt size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.dates_times}</h3></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.num_volunteers}</label><input type="number" name="num_volunteers" value={formData.num_volunteers} onChange={handleInputChange} min={1} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.display_date}</label><input type="date" name="display_date" value={formData.display_date} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.start_date}</label><input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.start_time}</label><input type="time" name="start_time" value={formData.start_time} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.end_date}</label><input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.end_time}</label><input type="time" name="end_time" value={formData.end_time} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]" required /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4"><Users size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.volunteer_details}</h3></div>
                <div className="space-y-4">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.national_ids}</label><textarea name="national_ids" value={formData.national_ids} onChange={handleInputChange} rows={4} placeholder={t.national_ids_placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33]" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">{t.volunteer_tasks_joined}</label><textarea name="volunteer_tasks_joined" value={formData.volunteer_tasks_joined} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33]" /></div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4"><FaCheckSquare size={22} style={{ color: '#2563eb' }} /><h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t.goal}</h3></div>
                <div className="flex flex-wrap gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="goal_experience" checked={formData.goal_experience} onChange={handleInputChange} className="rounded text-[#C89B3C]" /> {t.goal_experience}</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="goal_skills" checked={formData.goal_skills} onChange={handleInputChange} className="rounded text-[#C89B3C]" /> {t.goal_skills}</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="goal_certificate" checked={formData.goal_certificate} onChange={handleInputChange} className="rounded text-[#C89B3C]" /> {t.goal_certificate}</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="goal_reward" checked={formData.goal_reward} onChange={handleInputChange} className="rounded text-[#C89B3C]" /> {t.goal_reward}</label><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="goal_belonging" checked={formData.goal_belonging} onChange={handleInputChange} className="rounded text-[#C89B3C]" /> {t.goal_belonging}</label></div>
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
export default VolunteerOpportunityRegister
