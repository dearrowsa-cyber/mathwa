import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

const translations = {
  en: {
    edit_board_member: 'Edit Board Member',
    add_board_member: 'Add Board Member',
    profile_image: 'Profile Image',
    name_english: 'Name (English)',
    name_arabic: 'Name (Arabic)',
    role_english: 'Role (English)',
    role_arabic: 'Role (Arabic)',
    select_role: '-- Select a role --',
    email: 'Email',
    bio_english: 'Bio (English)',
    bio_arabic: 'Bio (Arabic)',
    saving: 'Saving...',
    update_member: 'Update Member',
    add_member: 'Add Member',
    cancel: 'Cancel',
    click_to_upload: 'Click to upload image',
    change_image: 'Change Image',
    loading: 'Loading...',
    failed_to_load: 'Failed to load member details',
    error_fetching_member: 'Error fetching member:',
    member_updated: 'Board member updated successfully!',
    member_added: 'Board member added successfully!',
    failed_to_save: 'Failed to save member',
    name_english_required: 'Name (English) is required',
    name_arabic_required: 'Name (Arabic) is required',
    role_english_required: 'Role (English) is required',
    role_arabic_required: 'Role (Arabic) is required',
    error_saving_member: 'Error saving member:',
    select_role_arabic: '-- اختر دورا --',
    role_required: 'Role is required',
    role_required_ar: 'الدور مطلوب'
  },
  ar: {
    edit_board_member: 'تعديل عضو المجلس',
    add_board_member: 'إضافة عضو المجلس',
    profile_image: 'صورة الملف الشخصي',
    name_english: 'الاسم (الإنجليزية)',
    name_arabic: 'الاسم (العربية)',
    role_english: 'الدور (الإنجليزية)',
    role_arabic: 'الدور (العربية)',
    select_role: '-- اختر دورا --',
    email: 'البريد الإلكتروني',
    bio_english: 'السيرة الذاتية (الإنجليزية)',
    bio_arabic: 'السيرة الذاتية (العربية)',
    saving: 'جاري الحفظ...',
    update_member: 'تحديث العضو',
    add_member: 'إضافة عضو',
    cancel: 'إلغاء',
    click_to_upload: 'انقر لتحميل الصورة',
    change_image: 'تغيير الصورة',
    loading: 'جاري التحميل...',
    failed_to_load: 'فشل تحميل تفاصيل العضو',
    error_fetching_member: 'خطأ في جلب العضو:',
    member_updated: 'تم تحديث عضو المجلس بنجاح!',
    member_added: 'تم إضافة عضو المجلس بنجاح!',
    failed_to_save: 'فشل حفظ العضو',
    name_english_required: 'الاسم (الإنجليزية) مطلوب',
    name_arabic_required: 'الاسم (العربية) مطلوب',
    role_english_required: 'الدور (الإنجليزية) مطلوب',
    role_arabic_required: 'الدور (العربية) مطلوب',
    error_saving_member: 'خطأ في حفظ العضو:',
    select_role_arabic: '-- اختر دورا --',
    role_required: 'الدور مطلوب',
    role_required_ar: 'الدور مطلوب'
  }
}

const AddEditBoardMember = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    role_en: '',
    role_ar: '',
    bio_en: '',
    bio_ar: '',
    email: '',
    image: ''
  })

  // Common roles
  const commonRoles = [
    { en: 'Chairperson', ar: 'الرئيس' },
    { en: 'Vice Chairperson', ar: 'نائب الرئيس' },
    { en: 'Treasurer', ar: 'أمين الصندوق' },
    { en: 'Secretary', ar: 'الأمين العام' },
    { en: 'Board Member', ar: 'عضو مجلس الإدارة' },
    { en: 'Director', ar: 'المدير' },
    { en: 'Executive Director', ar: 'المدير التنفيذي' },
  ]

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    if (id) {
      fetchMember(id)
    }
  }, [id])

  const fetchMember = async (memberId) => {
    try {
      const apiUrl = import.meta.env.DEV 
        ? `/api/board-members.php?id=${memberId}&lang=en`
        : `${BACKEND_URL}/api/board-members.php?id=${memberId}&lang=en`
      const response = await fetch(apiUrl)
      const data = await response.json()
      
      if (data.success) {
        setFormData({
          name_en: data.data.name_en || data.data.name || '',
          name_ar: data.data.name_ar || '',
          role_en: data.data.role_en || data.data.role || '',
          role_ar: data.data.role_ar || '',
          bio_en: data.data.bio_en || data.data.bio || '',
          bio_ar: data.data.bio_ar || '',
          email: data.data.email || '',
          image: data.data.image || ''
        })
        if (data.data.image) {
          setImagePreview(data.data.image)
        }
      } else {
        setError(t.failed_to_load)
      }
    } catch (err) {
      setError(t.error_fetching_member + ' ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
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

    // Validation
    if (!formData.name_en.trim()) {
      setError(t.name_english_required)
      setSaving(false)
      return
    }
    if (!formData.name_ar.trim()) {
      setError(t.name_arabic_required)
      setSaving(false)
      return
    }
    if (!formData.role_en.trim()) {
      setError(t.role_english_required)
      setSaving(false)
      return
    }
    if (!formData.role_ar.trim()) {
      setError(t.role_arabic_required)
      setSaving(false)
      return
    }

    try {
      const method = id ? 'PUT' : 'POST'
      const baseUrl = import.meta.env.DEV 
        ? `/api/board-members.php`
        : `${BACKEND_URL}/api/board-members.php`
      const url = id ? `${baseUrl}?id=${id}` : baseUrl
      
      // Create FormData to handle file upload
      const form = new FormData()
      form.append('name_en', formData.name_en)
      form.append('name_ar', formData.name_ar)
      form.append('role_en', formData.role_en)
      form.append('role_ar', formData.role_ar)
      form.append('bio_en', formData.bio_en)
      form.append('bio_ar', formData.bio_ar)
      form.append('email', formData.email)
      
      // Only append image if a new file was selected
      if (imageFile) {
        form.append('image', imageFile)
      } else if (formData.image && !imageFile) {
        // Keep existing image if no new file
        form.append('image', formData.image)
      }

      const response = await fetch(url, {
        method,
        body: form
      })

      const data = await response.json()

      if (data.success) {
        alert(id ? t.member_updated : t.member_added)
        navigate('/admin/about/board-members')
      } else {
        setError(data.message || t.failed_to_save)
      }
    } catch (err) {
      setError(t.error_saving_member + ' ' + err.message)
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
          onClick={() => navigate('/admin/about/board-members')}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={24} style={{ color: '#0E4B33' }} />
        </button>
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>
          {id ? t.edit_board_member : t.add_board_member}
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
            {t.profile_image}
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

        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              {t.name_english}
            </label>
            <input
              type="text"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              {t.name_arabic}
            </label>
            <input
              type="text"
              name="name_ar"
              value={formData.name_ar}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              dir="rtl"
            />
          </div>
        </div>

        {/* Role Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              {t.role_english}
            </label>
            <select
              name="role_en"
              value={formData.role_en}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="">{t.select_role}</option>
              {commonRoles.map((role, idx) => (
                <option key={idx} value={role.en}>{role.en}</option>
              ))}
            </select>
            {formData.role_en === '' && error?.includes(t.role_english_required) && (
              <p className="text-red-500 text-xs mt-1">{t.role_required}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              {t.role_arabic}
            </label>
            <select
              name="role_ar"
              value={formData.role_ar}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              dir="rtl"
            >
              <option value="">{t.select_role_arabic}</option>
              {commonRoles.map((role, idx) => (
                <option key={idx} value={role.ar}>{role.ar}</option>
              ))}
            </select>
            {formData.role_ar === '' && error?.includes(t.role_arabic_required) && (
              <p className="text-red-500 text-xs mt-1">{t.role_required_ar}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
            {t.email}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
            onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
          />
        </div>

        {/* Bio Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              {t.bio_english}
            </label>
            <textarea
              name="bio_en"
              value={formData.bio_en}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              {t.bio_arabic}
            </label>
            <textarea
              name="bio_ar"
              value={formData.bio_ar}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              dir="rtl"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{ backgroundColor: '#C89B3C' }}
          >
            {saving ? t.saving : id ? t.update_member : t.add_member}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/about/board-members')}
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

export default AddEditBoardMember
