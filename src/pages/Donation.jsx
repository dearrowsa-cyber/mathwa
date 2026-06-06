import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSection, SectionTitle, Container, Card, Grid, Section, Button } from '../components/Common'
import { FaHandHoldingHeart, FaCheckCircle, FaMoneyBillWave, FaExternalLinkAlt } from 'react-icons/fa'

const Donation = () => {
  const [selectedAmount, setSelectedAmount] = useState(100)
  const [customAmount, setCustomAmount] = useState('')
  const [donationMethod, setDonationMethod] = useState('card')
  const [donationType, setDonationType] = useState('one_time')
  
  // Form state
  const [formData, setFormData] = useState({
    full_name_ar: '',
    full_name_en: '',
    email: '',
    phone: '',
    purpose: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const translations = {
    en: {
      title: 'Make an Impact',
      subtitle: 'Be the reason someone smiles today... Your generous contribution changes lives.',
      ways_title: 'Ways to Give',
      ways_desc: 'Easily and securely donate through the Salla e-platform.',
      donate_via_salla: 'Donate via Salla',
      or_browse: 'Or browse specific giving opportunities',
      home: 'Home',
      donation_amount: 'Giving Amount (SAR)',
      custom_amount: 'Custom Amount',
      quick_donate: 'Quick Impact Amounts',
      donation_method: 'Payment Method',
      credit_card: 'Credit Card',
      bank_transfer: 'Bank Transfer',
      donate_button: 'Proceed to Spread Joy',
      donate_now_section: 'Give Hope Now',
      donate_now_sub: 'Every riyal you give directly contributes to the sustainability of our most needed community services',
      donation_impact: 'The Impact of Your Gift',
      impact_meal: 'Provides warm meals for a family',
      impact_family: 'Supports a family in need for a month',
      impact_program: 'Funds a vital community program',
      impact_equipment: 'Provides essential medical equipment',
      monthly: 'Give Monthly',
      one_time: 'Give Once',
    },
    ar: {
      title: 'اصنع الأثر',
      subtitle: 'كن سبباً في سعادتهم اليوم... عطاؤك السخي يغيّر الواقع ويبني مستقبلاً أفضل.',
      ways_title: 'كيف تصنع الفرق؟',
      ways_desc: 'يمكنك التبرع بكل يسر وأمان عبر منصة سلة الإلكترونية.',
      donate_via_salla: 'تبرع عبر سلة',
      or_browse: 'أو تصفح فرص العطاء المتاحة لدينا',
      home: 'الرئيسية',
      donation_amount: 'اختر باقة العطاء (ريال)',
      custom_amount: 'مبلغ مخصص',
      quick_donate: 'مبادرات العطاء السريعة',
      donation_method: 'طريقة الدفع',
      credit_card: 'بطاقة ائتمان',
      bank_transfer: 'تحويل بنكي',
      donate_button: 'متابعة العطاء',
      donation_impact: 'أثر عطائك',
      impact_meal: 'يؤمن وجبات دافئة لأسرة محتاجة',
      impact_family: 'يكفل الرعاية الأساسية لأسرة لمدة شهر',
      impact_program: 'يدعم التكاليف التشغيلية لبرنامج مجتمعي',
      impact_equipment: 'يوفر أجهزة طبية ومعدات أساسية',
      donate_now_section: 'تصدق الآن',
      donate_now_sub: 'كل ريال تجود به هو بذرة لخير عظيم ينمو ويستمر أثره في مجتمعنا',
      monthly: 'عطاء شهري مستدام',
      one_time: 'عطاء لمرة واحدة',
    }
  }

  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  const amounts = [50, 100, 250, 500, 1000]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.full_name_ar.trim()) {
      setSubmitMessage({ type: 'error', text: language === 'ar' ? 'الرجاء إدخال الاسم' : 'Please enter your name' })
      return
    }
    
    if (!formData.email.trim()) {
      setSubmitMessage({ type: 'error', text: language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter your email' })
      return
    }

    if (!formData.phone.trim()) {
      setSubmitMessage({ type: 'error', text: language === 'ar' ? 'الرجاء إدخال رقم الجوال' : 'Please enter your phone' })
      return
    }

    const donation_amount = customAmount ? parseFloat(customAmount) : selectedAmount
    
    if (donation_amount <= 0) {
      setSubmitMessage({ type: 'error', text: language === 'ar' ? 'الرجاء إدخال مبلغ صحيح' : 'Please enter valid amount' })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      
      const response = await fetch(`${BACKEND_URL}/api/submit-donation-form.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          donation_amount: donation_amount,
          donation_type: donationType,
          payment_method: donationMethod,
          currency: 'SAR',
          is_anonymous: false
        })
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ 
          type: 'success', 
          text: data.message || (language === 'ar' ? 'تم تقديم طلبك بنجاح' : 'Your submission was successful') 
        })
        setFormData({
          full_name_ar: '',
          full_name_en: '',
          email: '',
          phone: '',
          purpose: ''
        })
        setCustomAmount('')
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: data.message || (language === 'ar' ? 'حدث خطأ، حاول مرة أخرى' : 'An error occurred, please try again') 
        })
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: language === 'ar' ? 'خطأ في الاتصال بالخادم' : 'Connection error' 
      })
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeroSection 
        title={t.title}
        subtitle={t.subtitle}
      />
      <div className="bg-gray-100 py-2">
        <Container>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0E4B33]">{t.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{t.title}</span>
          </nav>
        </Container>
      </div>

      <Section>
        <Container>
          <SectionTitle title={t.donate_now_section} subtitle={t.donate_now_sub} />
          <div className="max-w-xl mx-auto mb-12">
            <Card className="text-center p-8">
              <FaMoneyBillWave size={56} className="mx-auto mb-4" style={{ color: '#C89B3C' }} />
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t.ways_title}</h3>
              <p className="text-gray-600 mb-6">{t.ways_desc}</p>
              <a
                href="http://salla.sa/mathwa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#C89B3C' }}
              >
                {t.donate_via_salla}
                <FaExternalLinkAlt size={18} />
              </a>
              <p className="text-sm text-gray-500 mt-4">
                <Link to="/donate" className="hover:underline" style={{ color: '#0E4B33' }}>{t.or_browse}</Link>
              </p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <Card className="!p-8">
                <h2 className="text-2xl text-center font-bold text-primary mb-8 leading-tight">{language === 'ar' ? 'حدد مسار عطائك المباشر' : 'Direct Giving Form'}</h2>

                {/* Message Display */}
                {submitMessage.text && (
                  <div className={`p-4 rounded-lg mb-6 ${submitMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitMessage.text}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Donation Type */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">{language === 'ar' ? 'نوع التبرع' : 'Donation Type'}</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setDonationType('one_time')}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${ donationType === 'one_time' ? 'bg-primary text-white' : 'border-2 border-gray-300 text-gray-700 hover:border-primary'}`}
                      >
                        {t.one_time}
                      </button>
                      <button 
                        type="button"
                        onClick={() => setDonationType('monthly')}
                        className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${ donationType === 'monthly' ? 'bg-primary text-white' : 'border-2 border-gray-300 text-gray-700 hover:border-primary'}`}
                      >
                        {t.monthly}
                      </button>
                    </div>
                  </div>

                  {/* Quick Amounts */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">{t.quick_donate}</label>
                    <div className="grid grid-cols-5 gap-3">
                      {amounts.map(amount => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount)
                            setCustomAmount('')
                          }}
                          className={`py-3 rounded-lg font-bold transition-all ${
                            selectedAmount === amount && customAmount === ''
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">{t.custom_amount}</label>
                    <input
                      type="number"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount(e.target.value ? parseInt(e.target.value) : 0)
                      }}
                      placeholder={language === 'ar' ? 'أدخل المبلغ...' : 'Enter amount...'}
                      className="input-modern"
                    />
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</label>
                    <input
                      type="text"
                      name="full_name_ar"
                      value={formData.full_name_ar}
                      onChange={handleInputChange}
                      placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                      className="input-modern"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                      className="input-modern"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ar' ? 'رقم الجوال' : 'Phone Number'}</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={language === 'ar' ? 'أدخل رقم جوالك' : 'Enter your phone number'}
                      className="input-modern"
                      required
                    />
                  </div>

                  {/* Purpose */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">{language === 'ar' ? 'الغرض من التبرع' : 'Purpose of Donation'}</label>
                    <textarea
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      placeholder={language === 'ar' ? 'اكتب الغرض من تبرعك... (اختياري)' : 'Tell us the purpose of your donation... (optional)'}
                      rows={3}
                      className="input-modern"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">{t.donation_method}</label>
                    <div className="space-y-3">
                      
                      <label className="flex items-center p-3 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-all">
                        <input
                          type="radio"
                          name="method"
                          value="bank_transfer"
                          checked={donationMethod === 'bank_transfer'}
                          onChange={(e) => setDonationMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="ml-3 font-semibold text-gray-700">{t.bank_transfer}</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-[#C89B3C] text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all btn-glow"
                  >
                    <FaHandHoldingHeart size={20} className={loading ? 'animate-pulse' : ''} />
                    {loading ? (language === 'ar' ? 'جاري الإرسال...' : 'Submitting...') : `${t.donate_button} (${customAmount || selectedAmount} SAR)`}
                  </button>
                </form>
              </Card>
            </div>

            {/* Impact Sidebar */}
            <div>
              <Card className="mb-8">
                <h3 className="text-xl font-bold text-primary mb-6">{t.donation_impact}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle size={20} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-700">50 SAR</p>
                      <p className="text-sm text-gray-600">{t.impact_meal}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle size={20} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-700">250 SAR</p>
                      <p className="text-sm text-gray-600">{t.impact_family}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle size={20} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-700">500 SAR</p>
                      <p className="text-sm text-gray-600">{t.impact_program}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaCheckCircle size={20} className="text-[#C89B3C] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-700">1000 SAR</p>
                      <p className="text-sm text-gray-600">{t.impact_equipment}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-primary text-white">
                <h3 className="font-bold mb-3">Your Support Matters</h3>
                <p className="text-sm text-gray-200">
                  Every donation, no matter the amount, helps us continue our mission to serve those in need.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Donation
