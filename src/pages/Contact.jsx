import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container, Card, Grid, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'
import { FaSnapchat, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaFacebook, FaInstagram, FaYoutube, FaClock, FaCommentDots, FaCheckCircle } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'


const Contact = () => {
  const { t } = useTranslation('contact')
  const lang = localStorage.getItem('language') || 'en'
  const breadcrumb = { en: { home: 'Home', current: 'Contact Us' }, ar: { home: 'الرئيسية', current: 'اتصل بنا' } }[lang]
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setSubmitMessage({ 
        type: 'error', 
        text: lang === 'ar' ? 'الرجاء ملء جميع الحقول المطلوبة' : 'Please fill all required fields' 
      })
      return
    }

    setLoading(true)
    setSubmitMessage({ type: '', text: '' })

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      
      const response = await fetch(`${BACKEND_URL}/api/submit-contact-message.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        setSubmitMessage({ type: 'success', text: data.message })
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
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
    { label: breadcrumb.home, to: '/' },
    { label: breadcrumb.current }
  ]

  return (
    <>
      <PageHeader 
        title={breadcrumb.current} 
        description={lang === 'ar' ? 'فريق مثوى متواجد دائماً للرد على استفساراتك واقتراحاتك.' : 'Mathwaa team is always here to answer your inquiries and suggestions.'}
        breadcrumbs={breadcrumbs} 
      />

      {/* Quick Contact Cards */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Email Card */}
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: 'rgba(200,155,60,0.15)' }}>
                <FaEnvelope size={32} style={{ color: '#C89B3C' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t('email')}</h3>
              <p className="text-gray-600 text-sm mb-4">{lang === 'ar' ? 'تواصل معنا عبر البريد الإلكتروني' : 'Reach us via email'}</p>
              <a href={`mailto:${t('email_value')}`} className="text-lg font-bold" style={{ color: '#C89B3C' }}>{t('email_value')}</a>
            </Card>

            {/* Phone Card */}
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: 'rgba(14,75,51,0.15)' }}>
                <FaPhoneAlt size={32} style={{ color: '#0E4B33' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t('phone')}</h3>
              <p className="text-gray-600 text-sm mb-4">{lang === 'ar' ? 'اتصل بنا مباشرة' : 'Call us directly'}</p>
              <a href={`tel:${t('phone_value')}`} className="text-lg font-bold" style={{ color: '#C89B3C' }}>{t('phone_value')}</a>
            </Card>

            {/* Location Card */}
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center" style={{ backgroundColor: 'rgba(200,155,60,0.15)' }}>
                <FaMapMarkerAlt size={32} style={{ color: '#C89B3C' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#0E4B33' }}>{t('address')}</h3>
              <p className="text-gray-600 text-sm mb-4">{lang === 'ar' ? 'زرنا في مقرنا' : 'Visit us'}</p>
              <p className="text-gray-700 font-semibold">{t('address_value')}</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Main Contact Section */}
      <Section bg="light">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="!p-0 border-0 shadow-2xl overflow-hidden">
                {/* Form Header */}
                <div className="p-8" style={{ backgroundColor: '#0E4B33' }}>
                  <h2 className="text-3xl font-bold text-white mb-2">{lang === 'ar' ? 'يسعدنا تواصلك معنا' : 'We would love to hear from you'}</h2>
                  <p className="text-[#C89B3C] font-medium text-lg leading-relaxed">{lang === 'ar' ? 'فريق مثوى متواجد دائماً للرد على استفساراتك واقتراحاتك.' : 'Mathwaa team is always here to answer your inquiries.'}</p>
                </div>

                {/* Form Body */}
                <div className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">{t('your_name')} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        className="input-modern"
                      />
                    </div>

                    {/* Email and Phone Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">{t('your_email')} <span className="text-red-500">*</span></label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder={lang === 'ar' ? 'البريد الإلكتروني' : 'your@email.com'}
                          className="input-modern"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">{t('your_phone')} <span className="text-gray-500 text-xs">({t('optional')})</span></label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+966 5X XXX XXXX"
                          className="input-modern"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">{t('subject')} <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder={lang === 'ar' ? 'موضوع الرسالة' : 'What is this about?'}
                        className="input-modern"
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">{t('message')} <span className="text-red-500">*</span></label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Type your message here...'}
                        className="input-modern resize-none"
                      ></textarea>
                    </div>

                    {/* Status Messages */}
                    {submitMessage.text && (
                      <div className={`p-4 rounded-lg flex items-center gap-3 ${
                        submitMessage.type === 'success' 
                          ? 'bg-green-50 border border-green-200' 
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <FaCheckCircle size={20} className={submitMessage.type === 'success' ? 'text-green-600' : 'text-red-600'} />
                        <span className={submitMessage.type === 'success' ? 'text-green-800' : 'text-red-800'}>
                          {submitMessage.text}
                        </span>
                      </div>
                    )}

                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full py-4 mt-4 rounded-xl font-bold text-white flex items-center justify-center gap-3 hover:shadow-xl disabled:opacity-50 hover:-translate-y-1 transition-all btn-glow"
                      style={{ backgroundColor: '#C89B3C' }}
                    >
                      <FaPaperPlane size={20} className={loading ? 'animate-pulse' : ''} />
                      {loading ? (lang === 'ar' ? 'جاري الإرسال...' : 'Sending...') : (lang === 'ar' ? 'إرسال رسالتك الآن' : 'Send Message Now')}
                    </button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Contact Information Sidebar */}
            <div className="space-y-6">
             

              {/* Direct Contact Card */}
              <Card className="p-6 border-0 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(200,155,60,0.15)' }}>
                    <FaCommentDots size={24} style={{ color: '#C89B3C' }} />
                  </div>
                  <h3 className="text-lg font-bold" style={{ color: '#0E4B33' }}>{t('social_media_title')}</h3>
                </div>
                <div className="space-y-3 ml-12">
                  <p className="text-sm text-gray-600 mb-4">{lang === 'ar' ? 'تابعنا على وسائل التواصل الاجتماعي' : 'Follow us on social media'}</p>
                  <div className="flex gap-3 flex-wrap">
                    <a href="https://www.snapchat.com/add/mathwaah?share_id=QezIcEMU5aM&locale=en-US" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all hover:scale-110" title="Facebook">
                      <FaSnapchat size={20} />
                    </a>
                    <a href="https://www.instagram.com/mathwaah?igsh=MWU2c2t4N3hiMjVleQ==" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition-all hover:scale-110" title="Instagram">
                      <FaInstagram size={20} />
                    </a>
                    <a href="https://x.com/mathwaah?s=21" target="_blank" rel="noopener noreferrer" className="p-3 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200 transition-all hover:scale-110" title="X (Twitter)">
                      <FaXTwitter size={20} />
                    </a>
                  </div>
                </div>
              </Card>

              {/* Support Card */}
              <Card className="p-6 border-0 shadow-lg" style={{ backgroundColor: 'rgba(14,75,51,0.05)', borderLeft: '4px solid #0E4B33' }}>
                <h3 className="font-bold text-gray-800 mb-3">{lang === 'ar' ? 'هل تحتاج مساعدة؟' : 'Need Help?'}</h3>
                <p className="text-sm text-gray-700 mb-4">
                  {lang === 'ar' ? 'فريقنا جاهز دائماً للإجابة على جميع أسئلتك والمساعدة فيما تحتاجه.' : 'Our team is always ready to answer your questions and assist you.'}
                </p>
                <a 
                  href={`tel:${t('phone_value')}`}
                  className="inline-block px-6 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
                  style={{ backgroundColor: '#0E4B33' }}
                >
                  {t('call_now')}
                </a>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Map Section */}
     

      {/* FAQ Section */}
    
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#0E4B33' }}>
              {t('faq_title')}
            </h2>
            <p className="text-gray-600 text-lg">{t('faq_subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* FAQ Item 1 */}
            <Card className="p-6 border-l-4" style={{ borderColor: '#C89B3C' }}>
              <h4 className="font-bold text-gray-800 mb-2" style={{ color: '#0E4B33' }}>
                {lang === 'ar' ? 'كيف يمكنني التواصل معكم؟' : 'How can I contact you?'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'ar' ? 'يمكنك التواصل معنا عبر البريد الإلكتروني أو الهاتف أو ملء النموذج أعلاه.' : 'You can contact us via email, phone, or by filling out the form above.'}
              </p>
            </Card>

            {/* FAQ Item 2 */}
            <Card className="p-6 border-l-4" style={{ borderColor: '#C89B3C' }}>
              <h4 className="font-bold text-gray-800 mb-2" style={{ color: '#0E4B33' }}>
                {lang === 'ar' ? 'ما وقت الرد على الرسائل؟' : 'How long does it take to respond?'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'ar' ? 'نحاول الرد على جميع الرسائل خلال 24 ساعة خلال ساعات العمل.' : 'We try to respond to all messages within 24 hours during business hours.'}
              </p>
            </Card>

            {/* FAQ Item 3 */}
            <Card className="p-6 border-l-4" style={{ borderColor: '#C89B3C' }}>
              <h4 className="font-bold text-gray-800 mb-2" style={{ color: '#0E4B33' }}>
                {lang === 'ar' ? 'هل يمكنني الاستفسار عن الخدمات؟' : 'Can I inquire about services?'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'ar' ? 'بالتأكيد! نرحب باستفسارات الخدمات والشراكات والتطوع.' : 'Absolutely! We welcome inquiries about services, partnerships, and volunteering.'}
              </p>
            </Card>

            {/* FAQ Item 4 */}
            <Card className="p-6 border-l-4" style={{ borderColor: '#C89B3C' }}>
              <h4 className="font-bold text-gray-800 mb-2" style={{ color: '#0E4B33' }}>
                {lang === 'ar' ? 'هل تقبلون الشكاوى والاقتراحات؟' : 'Do you accept complaints and suggestions?'}
              </h4>
              <p className="text-gray-600 text-sm">
                {lang === 'ar' ? 'نعم، آراءك مهمة لنا جداً ونرحب باقتراحاتك وملاحظاتك.' : 'Yes! Your feedback is important to us. We welcome all suggestions.'}
              </p>
            </Card>
          </div>

          <div className="text-center mt-10">
            <a 
              href="#faq"
              className="inline-block px-8 py-3 rounded-lg font-bold text-white transition-all hover:shadow-lg hover:scale-105"
              style={{ backgroundColor: '#0E4B33' }}
            >
              {t('view_all_faq')}
            </a>
          </div>
        </Container>
    
    </>
  )
}

export default Contact
