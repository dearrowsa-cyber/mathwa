import React, { useState, useEffect, useRef } from 'react'
import { HeroSection, Container, Card, Grid, Section } from '../components/Common'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaUser, FaCrown, FaCoins, FaFileAlt, FaCreditCard, FaUniversity, FaMobileAlt, FaPaperPlane, FaBalanceScale, FaClipboardList, FaUserFriends } from 'react-icons/fa'

const Membership = () => {
  const lang = localStorage.getItem('language') || 'en'
  const formRef = useRef(null)
  const [formData, setFormData] = useState({
    name_ar: '',
    name_en: '',
    email: '',
    phone: '',
    national_id: '',
    city: '',
    address: '',
    membership_type: 'regular',
    payment_method: 'bank_transfer'
  })
  const [loading, setLoading] = useState(false)
  const [prices, setPrices] = useState([])
  const [loadingPrices, setLoadingPrices] = useState(true)
  const [pricesError, setPricesError] = useState(null)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })
  const t = {
    en: {
      title: 'Membership Subscriptions',
      subtitle: 'Join as a member and support our mission',
      definition: 'Membership Definition',
      definition_text: 'Membership in the association grants you the right to participate in general assembly meetings, vote on decisions, and stay informed about our activities.',
      active_participation: 'Active Participation',
      right_to_vote: 'Right to Vote',
      continuous_communication: 'Continuous Communication',
      types: 'Types of Membership',
      honorary: 'Honorary Membership',
      honorary_by_decision: 'By Board decision',
      supporting: 'Supporting Membership',
      supporting_amount: '500+ Donation',
      regular: 'Regular Membership',
      regular_amount: '500',
      benefit1: 'Benefit 1',
      benefit2: 'Benefit 2',
      conditions: 'Membership Conditions',
      how_to_join: 'How to Join',
      step1: 'Fill the Form',
      step2: 'Pay Subscriptions',
      step3: 'Review',
      step4: 'Approval',
      how_to_pay: 'How to Pay Membership',
      bank_transfer: 'Bank Transfer',
      electronic: 'Electronic Payment',
      direct: 'Direct Payment',
      application_form: 'Membership Application Form',
      personal_info: 'Personal Information',
      contact_info: 'Contact Information',
      membership_type: 'Membership Type',
      payment_info: 'Payment Information',
      submit_application: 'Submit Application',
      join: 'Join',
      home: 'Home',
      contribute: 'Contribute with Us',
      governance_integration: 'Governance & General Assembly',
      rights: 'Member Rights',
      duties: 'Member Duties',
      general_assembly_link: 'View General Assembly Data'
    },
    ar: {
      title: 'اشتراكات العضوية',
      subtitle: 'انضم كعضو وادعم رسالتنا',
      definition: 'تعريف العضوية',
      definition_text: 'تمنحك العضوية في الجمعية الحق في المشاركة في اجتماعات الجمعية العمومية والتصويت على القرارات والاطلاع على أنشطتنا.',
      active_participation: 'المشاركة الفعالة',
      right_to_vote: 'حق التصويت',
      continuous_communication: 'التواصل المستمر',
      types: 'أنواع العضوية',
      honorary: 'العضوية الفخرية',
      honorary_by_decision: 'بقرار مجلس الإدارة',
      supporting: 'العضوية الداعمة',
      supporting_amount: '٥٠٠ + تبرع',
      regular: 'العضوية العادية',
      regular_amount: '٥٠٠',
      benefit1: 'الفائدة ١',
      benefit2: 'الفائدة ٢',
      conditions: 'شروط العضوية',
      how_to_join: 'الية الانضمام للعضوية',
      step1: 'تعبئة النموذج',
      step2: 'سداد الاشتراكات',
      step3: 'المراجعة',
      step4: 'الموافقة',
      how_to_pay: 'كيفية سداد اشتراك العضوية',
      bank_transfer: 'التحويل البنكي',
      electronic: 'الدفع الإلكتروني',
      direct: 'الدفع المباشر',
      application_form: 'نموذج طلب العضوية',
      personal_info: 'المعلومات الشخصية',
      contact_info: 'معلومات التواصل',
      membership_type: 'نوع العضوية',
      payment_info: 'معلومات الدفع',
      submit_application: 'إرسال الطلب',
      join: 'انضم',
      home: 'الرئيسية',
      contribute: 'ساهم معنا',
      governance_integration: 'الحوكمة والجمعية العمومية',
      rights: 'حقوق العضو',
      duties: 'واجبات العضو',
      general_assembly_link: 'بيانات الجمعية العمومية'
    },
  }[lang]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const scrollToForm = (membershipType) => {
    setFormData(prev => ({
      ...prev,
      membership_type: membershipType
    }))
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name_ar.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setSubmitMessage({ type: 'error', text: lang === 'ar' ? 'الرجاء ملء الحقول المطلوبة' : 'Please fill required fields' })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      
      const response = await fetch(`${BACKEND_URL}/api/submit-membership-registration.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message || (lang === 'ar' ? 'تم استقبال طلبك بنجاح' : 'Application received successfully') })
        setFormData({
          name_ar: '',
          name_en: '',
          email: '',
          phone: '',
          national_id: '',
          city: '',
          address: '',
          membership_type: 'regular',
          payment_method: 'bank_transfer'
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
  const steps = [t.step1, t.step2, t.step3, t.step4]
  const payMethods = [t.bank_transfer, t.electronic, t.direct]
  const benefits = [t.active_participation, t.right_to_vote, t.continuous_communication]

  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
    const fetchPrices = async () => {
      try {
        setLoadingPrices(true)
        const res = await fetch(`${BACKEND_URL}/api/get_membership_prices.php?limit=10`)
        const json = await res.json()
        if (json.success) {
          setPrices(json.data.prices || [])
          setPricesError(null)
        } else {
          setPricesError(json.message || 'Failed to load')
        }
      } catch (err) {
        setPricesError('Connection error')
        console.error('Error fetching membership prices:', err)
      } finally {
        setLoadingPrices(false)
      }
    }

    fetchPrices()
  }, [])

  return (
    <>
      <HeroSection title={t.title} subtitle={t.subtitle} />
      <div className="bg-gray-100 py-2">
        <Container>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0E4B33]">{t.home}</Link>
            <span className="mx-2">/</span>
            <Link to="/donate" className="hover:text-[#0E4B33]">{t.contribute}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{t.title}</span>
          </nav>
        </Container>
      </div>
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto mb-16">
            <div className="flex items-center gap-3 mb-4">
              <FaUser size={28} style={{ color: '#C89B3C' }} />
              <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>{t.definition}</h2>
            </div>
            <p className="text-gray-600 mb-6">{t.definition_text}</p>
            <div className="flex flex-wrap gap-6">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FaCheckCircle size={20} style={{ color: '#C89B3C' }} />
                  <span className="text-gray-700">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#0E4B33' }}>{t.types}</h2>
          
          {/* Membership Types Cards */}
          <Grid cols={3}>
            {/* Honorary Membership */}
            <Card className="p-8 border-2 border-gray-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <FaCrown size={48} className="mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>
                  {lang === 'ar' ? 'العضوية الفخرية' : 'Honorary Membership'}
                </h3>
              </div>
              
              <div className="space-y-3 mb-8">
                <p className="text-sm font-semibold text-gray-600 text-center mb-4">
                  {lang === 'ar' ? 'بقرار مجلس الإدارة' : 'By Board decision'}
                </p>
                <div className="flex items-center gap-2">
                  <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                  <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ١' : 'Benefit 1'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                  <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ٢' : 'Benefit 2'}</span>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToForm('honorary')}
                disabled
                className="w-full py-2 rounded-lg font-semibold text-white bg-gray-300 cursor-not-allowed"
              >
                {lang === 'ar' ? 'برقرار من المجلس' : 'By Board decision'}
              </button>
            </Card>

            {/* Supporting Membership */}
            <Card className="p-8 border-4 hover:shadow-xl transition-all" style={{ borderColor: '#C89B3C', backgroundColor: 'rgba(200, 155, 60, 0.02)' }}>
              <div className="text-center mb-6">
                <FaCoins size={48} className="mx-auto mb-4" style={{ color: '#C89B3C' }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>
                  {lang === 'ar' ? 'العضوية الداعمة' : 'Supporting Membership'}
                </h3>
                <p className="text-lg font-bold" style={{ color: '#C89B3C' }}>
                  {lang === 'ar' ? '٥٠٠ + تبرع' : '500+ Donation'}
                </p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                  <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ١' : 'Benefit 1'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                  <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ٢' : 'Benefit 2'}</span>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToForm('supporting')}
                className="w-full py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#C89B3C' }}
              >
                {lang === 'ar' ? 'انضم' : 'Join'}
              </button>
            </Card>

            {/* Regular Membership */}
            <Card className="p-8 border-2 border-gray-200 hover:shadow-lg transition-all">
              <div className="text-center mb-6">
                <FaUser size={48} className="mx-auto mb-4" style={{ color: '#0E4B33' }} />
                <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>
                  {lang === 'ar' ? 'العضوية العادية' : 'Regular Membership'}
                </h3>
                <p className="text-lg font-bold" style={{ color: '#2563eb' }}>
                  {lang === 'ar' ? '٥٠٠' : '500'}
                </p>
              </div>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2">
                  <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                  <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ١' : 'Benefit 1'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle size={16} style={{ color: '#C89B3C' }} className="flex-shrink-0" />
                  <span className="text-sm text-gray-700">{lang === 'ar' ? 'الفائدة ٢' : 'Benefit 2'}</span>
                </div>
              </div>
              
              <button 
                onClick={() => scrollToForm('regular')}
                className="w-full py-2 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#2563eb' }}
              >
                {lang === 'ar' ? 'انضم' : 'Join'}
              </button>
            </Card>
          </Grid>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E4B33' }}>{t.how_to_join}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold" style={{ backgroundColor: '#C89B3C' }}>{i + 1}</div>
                  <p className="font-semibold text-gray-800">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E4B33' }}>{t.how_to_pay}</h2>
            <Grid cols={3}>
              <Card className="p-6 text-center border border-gray-200"><FaUniversity size={36} className="mx-auto mb-3" style={{ color: '#C89B3C' }} /><p className="font-semibold">{t.bank_transfer}</p></Card>
              <Card className="p-6 text-center border border-gray-200"><FaMobileAlt size={36} className="mx-auto mb-3" style={{ color: '#C89B3C' }} /><p className="font-semibold">{t.electronic}</p></Card>
              <Card className="p-6 text-center border border-gray-200"><FaUniversity size={36} className="mx-auto mb-3" style={{ color: '#C89B3C' }} /><p className="font-semibold">{t.direct}</p></Card>
            </Grid>
          </div>

          <div className="mt-16 mb-12 bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#0E4B33' }}>{t.governance_integration}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-[#C89B3C] flex items-center gap-2">
                  <FaBalanceScale /> {t.rights}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'الاطلاع على قرارات الجمعية العمومية.' : 'View General Assembly decisions.'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'التصويت في اجتماعات الجمعية (للأعضاء العاديين).' : 'Vote in meetings (for regular members).'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'تلقي التقارير السنوية والمالية.' : 'Receive annual and financial reports.'}</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-xl font-bold mb-4 text-[#C89B3C] flex items-center gap-2">
                  <FaClipboardList /> {t.duties}
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'الالتزام بأحكام اللائحة الأساسية للجمعية.' : 'Commit to the basic regulations.'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'دفع الاشتراك السنوي في موعده.' : 'Pay the annual subscription on time.'}</li>
                  <li className="flex items-start gap-2"><FaCheckCircle className="text-[#0E4B33] mt-1 shrink-0" /> {lang === 'ar' ? 'المساهمة في تحقيق أهداف الجمعية.' : 'Contribute to achieving the goals.'}</li>
                </ul>
              </div>
            </div>
            <div className="text-center">
              <Link to="/general-assembly" className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#0E4B33] text-white rounded-full font-bold hover:bg-[#C89B3C] transition-colors">
                <FaUserFriends /> {t.general_assembly_link}
              </Link>
            </div>
          </div>

          <div className="mt-16" ref={formRef}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E4B33' }}>{t.application_form}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <Card className="p-8 border border-gray-200">
              {submitMessage.text && (
                <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitMessage.text}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'الاسم بالعربية' : 'Name in Arabic'}</label>
                  <input 
                    type="text" 
                    name="name_ar"
                    value={formData.name_ar}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'الاسم بالإنجليزية' : 'Name in English'}</label>
                  <input 
                    type="text" 
                    name="name_en"
                    value={formData.name_en}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'أدخل اسمك بالإنجليزية' : 'Enter your name in English'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.contact_info}</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                    required
                  />
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'رقم الجوال' : 'Phone'}
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'رقم الهوية' : 'National ID'}</label>
                  <input 
                    type="text" 
                    name="national_id"
                    value={formData.national_id}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'أدخل رقم هويتك' : 'Enter your ID'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'المدينة' : 'City'}</label>
                  <input 
                    type="text" 
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'أدخل مدينتك' : 'Enter your city'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{lang === 'ar' ? 'العنوان' : 'Address'}</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={lang === 'ar' ? 'أدخل عنوانك' : 'Enter your address'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.membership_type}</label>
                  <select 
                    name="membership_type"
                    value={formData.membership_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  >
                    <option value="regular">{t.regular}</option>
                    <option value="supporting">{t.supporting}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.payment_info}</label>
                  <select 
                    name="payment_method"
                    value={formData.payment_method}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C]"
                  >
                    <option value="bank_transfer">{t.bank_transfer}</option>
                    <option value="electronic">{t.electronic}</option>
                    <option value="direct">{t.direct}</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                  style={{ backgroundColor: '#C89B3C' }}
                >
                  <FaPaperPlane size={20} />
                  {loading ? (lang === 'ar' ? 'جاري...' : 'Submitting...') : t.submit_application}
                </button>
              </form>
            </Card>
              </div>
              
              {/* Governance & Assembly Side Box */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="p-6 border border-gray-200 bg-gray-50 sticky top-24">
                  <h3 className="text-xl font-bold mb-4 text-[#0E4B33] border-b pb-3 border-gray-200 flex items-center gap-2">
                    <FaUserFriends className="text-[#C89B3C]" />
                    {lang === 'ar' ? 'الجمعية العمومية والحوكمة' : 'Governance & Assembly'}
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/governance" className="flex items-center gap-3 text-gray-700 hover:text-[#C89B3C] font-medium transition-colors p-2 hover:bg-white rounded-lg">
                        <FaBalanceScale className="text-[#C89B3C] text-lg" />
                        {lang === 'ar' ? 'حقوق العضو' : 'Member Rights'}
                      </Link>
                    </li>
                    <li>
                      <Link to="/governance" className="flex items-center gap-3 text-gray-700 hover:text-[#C89B3C] font-medium transition-colors p-2 hover:bg-white rounded-lg">
                        <FaClipboardList className="text-[#C89B3C] text-lg" />
                        {lang === 'ar' ? 'واجبات العضو' : 'Member Duties'}
                      </Link>
                    </li>
                    <li>
                      <Link to="/general-assembly" className="flex items-center gap-3 text-gray-700 hover:text-[#C89B3C] font-medium transition-colors p-2 hover:bg-white rounded-lg">
                        <FaFileAlt className="text-[#C89B3C] text-lg" />
                        {lang === 'ar' ? 'محاضر الجمعية العمومية' : 'Assembly Minutes'}
                      </Link>
                    </li>
                    <li>
                      <Link to="/contact" className="flex items-center gap-3 text-gray-700 hover:text-[#C89B3C] font-medium transition-colors p-2 hover:bg-white rounded-lg">
                        <FaCheckCircle className="text-[#C89B3C] text-lg" />
                        {lang === 'ar' ? 'الأسئلة الشائعة' : 'FAQs'}
                      </Link>
                    </li>
                  </ul>
                  <div className="mt-6 pt-4 border-t border-gray-200 text-center bg-white p-4 rounded-xl border border-gray-100">
                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                      {lang === 'ar' ? 'عضويتك تمنحك حق المشاركة في صنع القرار والاطلاع بشفافية على كافة تفاصيل الجمعية.' : 'Your membership grants you the right to participate in decision-making and transparently view all association details.'}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Membership
