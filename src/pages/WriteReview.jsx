import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HeroSection, Container, Card, Section } from '../components/Common'
import { FaStar, FaUpload, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const WriteReview = () => {
  const { t } = useTranslation('contact')
  const lang = localStorage.getItem('language') || 'en'
  const breadcrumb = { 
    en: { home: 'Home', current: 'Write Review' }, 
    ar: { home: 'الرئيسية', current: 'اكتب تقييم' } 
  }[lang]

  const [formData, setFormData] = useState({
    name: '',
    position: '',
    organization: '',
    message: '',
    rating: 5,
    image: null
  })
  
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value === 'rating' ? parseInt(value) : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSubmitMessage({ 
          type: 'error', 
          text: lang === 'ar' ? 'الرجاء اختيار صورة فقط' : 'Please select an image file only'
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5242880) {
        setSubmitMessage({ 
          type: 'error', 
          text: lang === 'ar' ? 'حجم الصورة كبير جداً (الحد الأقصى 5MB)' : 'Image size is too large (Max 5MB)'
        })
        return
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }))

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
      setSubmitMessage({ type: '', text: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.position.trim() || !formData.message.trim()) {
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
      
      // Create FormData for multipart upload (if image is selected)
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('position', formData.position)
      submitData.append('organization', formData.organization)
      submitData.append('message', formData.message)
      submitData.append('rating', formData.rating)
      
      if (formData.image) {
        submitData.append('image', formData.image)
      }

      const response = await fetch(`${BACKEND_URL}/api/submit-testimonial.php`, {
        method: 'POST',
        body: submitData
      })

      const data = await response.json()

      if (data.success) {
        // Store the new testimonial in sessionStorage for immediate display
        if (data.data) {
          sessionStorage.setItem('newTestimonial', JSON.stringify(data.data))
        }
        
        setSubmitMessage({ 
          type: 'success', 
          text: data.message || (lang === 'ar' ? 'شكراً لتقييمك! سيظهر الآن.' : 'Thank you for your review! It will appear now.')
        })
        
        // Redirect to home after 2 seconds to show the new testimonial
        setTimeout(() => {
          window.location.href = '/'
        }, 2000)
        
        setFormData({ name: '', position: '', organization: '', message: '', rating: 5, image: null })
        setImagePreview(null)
      } else {
        setSubmitMessage({ 
          type: 'error', 
          text: data.message || (lang === 'ar' ? 'حدث خطأ' : 'Error occurred') 
        })
      }
    } catch (error) {
      setSubmitMessage({ 
        type: 'error', 
        text: lang === 'ar' ? 'خطأ في الاتصال' : 'Connection error' 
      })
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeroSection 
        title={lang === 'ar' ? 'اكتب تقييمك' : 'Write Your Review'}
        subtitle={lang === 'ar' ? 'شارك تجربتك معنا' : 'Share your experience with us'}
      />
      <div className="bg-gray-100 py-2">
        <Container>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0E4B33]">{breadcrumb.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{breadcrumb.current}</span>
          </nav>
        </Container>
      </div>

      <Section>
        <Container>
          <div className="max-w-2xl mx-auto">
            <Card className="!p-8">
              <h2 className="text-3xl font-bold mb-2" style={{ color: '#0E4B33' }}>
                {lang === 'ar' ? 'اكتب تقييمك' : 'Write Your Review'}
              </h2>
              <p className="text-gray-600 mb-8">
                {lang === 'ar' 
                  ? 'يرجى مشاركة تجربتك معنا. ستساعد تقييمات العملاء الآخرين على فهم جودة خدماتنا.' 
                  : 'Share your experience with us. Your feedback helps other customers understand the quality of our services.'}
              </p>

              {submitMessage.text && (
                <div className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                  submitMessage.type === 'success' 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  {submitMessage.type === 'success' ? (
                    <FaCheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <FaExclamationCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className={submitMessage.type === 'success' ? 'text-green-700' : 'text-red-700'}>
                    {submitMessage.text}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'ar' ? 'الاسم' : 'Name'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={lang === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent"
                    required
                  />
                </div>

                {/* Position */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'ar' ? 'الموقع/المسمى الوظيفي' : 'Position/Title'} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder={lang === 'ar' ? 'مثل: مدير عام، الرئيس التنفيذي' : 'e.g., CEO, Manager'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent"
                    required
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'ar' ? 'المنظمة/الشركة' : 'Organization/Company'}
                  </label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    placeholder={lang === 'ar' ? 'اسم المنظمة أو الشركة' : 'Organization or company name'}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    {lang === 'ar' ? 'التقييم' : 'Rating'} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="transition-all"
                      >
                        <FaStar
                          size={32}
                          className={`transition-all ${
                            star <= formData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {lang === 'ar' ? `تقييم: ${formData.rating} من 5 نجوم` : `Rating: ${formData.rating} out of 5 stars`}
                  </p>
                </div>

                {/* Message/Review */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'ar' ? 'تقييمك' : 'Your Review'} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === 'ar' ? 'شارك تجربتك معنا...' : 'Share your experience...'}
                    rows="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent resize-none"
                    required
                  ></textarea>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {lang === 'ar' ? 'صورتك (اختياري)' : 'Your Photo (Optional)'}
                  </label>
                  <div className="relative">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-[#0E4B33] transition-colors">
                        {imagePreview ? (
                          <div>
                            <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto mb-2 rounded" />
                            <p className="text-sm text-[#0E4B33] font-semibold">
                              {lang === 'ar' ? 'اضغط لتغيير الصورة' : 'Click to change image'}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <FaUpload size={32} className="mx-auto mb-2 text-gray-400" />
                            <p className="text-sm font-semibold text-gray-700">
                              {lang === 'ar' ? 'اضغط لاختيار صورة' : 'Click to select an image'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {lang === 'ar' ? 'أو اسحب الصورة هنا (الحد الأقصى 5MB)' : 'or drag and drop (Max 5MB)'}
                            </p>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 bg-[#0E4B33] text-white font-bold rounded-lg hover:bg-[#0a3526] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    lang === 'ar' ? 'جاري الإرسال...' : 'Submitting...'
                  ) : (
                    lang === 'ar' ? 'إرسال التقييم' : 'Submit Review'
                  )}
                </button>
              </form>
            </Card>

            {/* Information Box */}
            <Card className="mt-8 bg-blue-50 border border-blue-200 !p-6">
              <h3 className="font-bold text-blue-900 mb-3">
                {lang === 'ar' ? 'معلومات مهمة' : 'Important Information'}
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    {lang === 'ar' 
                      ? 'سيتم مراجعة تقييمك من قبل فريقنا قبل نشره' 
                      : 'Your review will be reviewed by our team before publication'}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    {lang === 'ar' 
                      ? 'يجب أن يكون التقييم صادقاً وبناءً' 
                      : 'Your review should be honest and constructive'}
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">•</span>
                  <span>
                    {lang === 'ar' 
                      ? 'شكراً لدعمك ولمساهمتك في تحسين خدماتنا' 
                      : 'Thank you for your support and contribution to improving our services'}
                  </span>
                </li>
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default WriteReview
