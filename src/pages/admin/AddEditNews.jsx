import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

const translations = {
  en: {
    edit_news: 'Edit News',
    add_news: 'Add News',
    image: 'Image',
    title_english: 'Title (English)',
    title_arabic: 'Title (Arabic)',
    description_english: 'Description (English)',
    description_arabic: 'Description (Arabic)',
    date: 'Date',
    saving: 'Saving...',
    update_news: 'Update News',
    create_news: 'Create News',
    cancel: 'Cancel',
    click_to_upload: 'Click to upload image',
    change_image: 'Change Image',
    loading: 'Loading...',
    failed_to_load: 'Failed to load news details',
    error_fetching_news: 'Error fetching news:',
    news_updated: 'News updated successfully!',
    news_created: 'News created successfully!',
    failed_to_save: 'Failed to save news',
    error_saving_news: 'Error saving news:'
  },
  ar: {
    edit_news: 'تعديل الخبر',
    add_news: 'إضافة خبر',
    image: 'الصورة',
    title_english: 'العنوان (الإنجليزية)',
    title_arabic: 'العنوان (العربية)',
    description_english: 'الوصف (الإنجليزية)',
    description_arabic: 'الوصف (العربية)',
    date: 'التاريخ',
    saving: 'جاري الحفظ...',
    update_news: 'تحديث الخبر',
    create_news: 'إنشاء خبر',
    cancel: 'إلغاء',
    click_to_upload: 'انقر لتحميل الصورة',
    change_image: 'تغيير الصورة',
    loading: 'جاري التحميل...',
    failed_to_load: 'فشل تحميل تفاصيل الخبر',
    error_fetching_news: 'خطأ في جلب الخبر:',
    news_updated: 'تم تحديث الخبر بنجاح!',
    news_created: 'تم إنشاء الخبر بنجاح!',
    failed_to_save: 'فشل حفظ الخبر',
    error_saving_news: 'خطأ في حفظ الخبر:'
  }
}

const AddEditNews = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    date: new Date().toISOString().split('T')[0],
    image: ''
  })

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    if (id) {
      fetchNews(id)
    }
  }, [id])

  const fetchNews = async (newsId) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/news.php?id=${newsId}&lang=en`)
      const data = await response.json()
      
      if (data.success) {
        setFormData({
          title_en: data.data.title || '',
          title_ar: '',
          description_en: data.data.description || '',
          description_ar: '',
          date: data.data.date || new Date().toISOString().split('T')[0],
          image: data.data.image || ''
        })
        setImagePreview(data.data.image)
      } else {
        setError(t.failed_to_load)
      }
    } catch (err) {
      setError(t.error_fetching_news + ' ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        setFormData({ ...formData, image: e.target.result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const method = id ? 'PUT' : 'POST'
      const url = id ? `${BACKEND_URL}/api/news.php?id=${id}` : `${BACKEND_URL}/api/news.php`
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert(id ? t.news_updated : t.news_created)
        navigate('/admin/news')
      } else {
        setError(data.message || t.failed_to_save)
      }
    } catch (err) {
      setError(t.error_saving_news + ' ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-6 text-center">{t.loading}</div>
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate('/admin/news')}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={24} style={{ color: '#0E4B33' }} />
        </button>
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>
          {id ? t.edit_news : t.add_news}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
            {t.image}
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                <label
                  htmlFor="image"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded text-white cursor-pointer transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#C89B3C' }}
                >
                  <Upload size={16} /> {t.change_image}
                </label>
              </div>
            ) : (
              <label htmlFor="image" className="cursor-pointer">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload size={32} style={{ color: '#C89B3C' }} />
                  <span className="text-gray-600">{t.click_to_upload}</span>
                </div>
              </label>
            )}
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* English Title */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
            {t.title_english}
          </label>
          <input
            type="text"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            style={{ '--tw-ring-color': '#C89B3C' }}
            onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        {/* Arabic Title */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
            {t.title_arabic}
          </label>
          <input
            type="text"
            name="title_ar"
            value={formData.title_ar}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            style={{ '--tw-ring-color': '#C89B3C' }}
            onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            dir="rtl"
          />
        </div>

        {/* English Description */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
            {t.description_english}
          </label>
          <textarea
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            style={{ '--tw-ring-color': '#C89B3C' }}
            onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        {/* Arabic Description */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
            {t.description_arabic}
          </label>
          <textarea
            name="description_ar"
            value={formData.description_ar}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            style={{ '--tw-ring-color': '#C89B3C' }}
            onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            dir="rtl"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
            {t.date}
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            style={{ '--tw-ring-color': '#C89B3C' }}
            onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#C89B3C' }}
          >
            {saving ? t.saving : id ? t.update_news : t.create_news}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/news')}
            className="px-6 py-3 rounded-lg font-semibold border-2"
            style={{ borderColor: '#0E4B33', color: '#0E4B33' }}
          >
            {t.cancel}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddEditNews
