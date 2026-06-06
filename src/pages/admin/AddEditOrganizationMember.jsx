import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload } from 'lucide-react'

const translations = {
  en: {
    edit_org_member: 'Edit Organization Member',
    add_org_member: 'Add Organization Member',
    profile_image: 'Profile Image',
    name_english: 'Name (English)',
    name_arabic: 'Name (Arabic)',
    role_english: 'Role (English)',
    role_arabic: 'Role (Arabic)',
    select_role: 'Select a role',
    department_english: 'Department (English)',
    department_arabic: 'Department (Arabic)',
    select_department: 'Select a department',
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
    error_fetching: 'Error fetching member:',
    member_added: 'Organization member added successfully!',
    member_updated: 'Organization member updated successfully!',
    failed_to_save: 'Failed to save member',
    error_saving: 'Error saving member:'
  },
  ar: {
    edit_org_member: 'تعديل عضو المنظمة',
    add_org_member: 'إضافة عضو المنظمة',
    profile_image: 'صورة الملف الشخصي',
    name_english: 'الاسم (الإنجليزية)',
    name_arabic: 'الاسم (العربية)',
    role_english: 'الدور (الإنجليزية)',
    role_arabic: 'الدور (العربية)',
    select_role: 'اختر دورا',
    department_english: 'القسم (الإنجليزية)',
    department_arabic: 'القسم (العربية)',
    select_department: 'اختر قسما',
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
    error_fetching: 'خطأ في جلب العضو:',
    member_added: 'تم إضافة عضو المنظمة بنجاح!',
    member_updated: 'تم تحديث عضو المنظمة بنجاح!',
    failed_to_save: 'فشل حفظ العضو',
    error_saving: 'خطأ في حفظ العضو:'
  }
}

const AddEditOrganizationMember = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [loading, setLoading] = useState(!!id)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    name_en: '',
    name_ar: '',
    role_en: '',
    role_ar: '',
    department_en: '',
    department_ar: '',
    bio_en: '',
    bio_ar: '',
    email: '',
    image: ''
  })

  // Common roles and departments
  const commonRoles = [
    { en: 'Director', ar: 'المدير' },
    { en: 'Manager', ar: 'مدير' },
    { en: 'Coordinator', ar: 'منسق' },
    { en: 'Officer', ar: 'موظف' },
    { en: 'Consultant', ar: 'مستشار' },
    { en: 'Specialist', ar: 'متخصص' },
  ]

  const commonDepartments = [
    { en: 'Operations', ar: 'العمليات' },
    { en: 'Finance', ar: 'المالية' },
    { en: 'Human Resources', ar: 'الموارد البشرية' },
    { en: 'Programs', ar: 'البرامج' },
    { en: 'Beneficiaries', ar: 'المستفيدون' },
    { en: 'Volunteers', ar: 'المتطوعون' },
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
      const response = await fetch(`${BACKEND_URL}/api/organization-members.php?id=${memberId}&lang=en`)
      const data = await response.json()
      
      if (data.success) {
        setFormData({
          name_en: data.data.name || '',
          name_ar: '',
          role_en: data.data.role || '',
          role_ar: '',
          department_en: data.data.department || '',
          department_ar: '',
          bio_en: data.data.bio || '',
          bio_ar: '',
          email: data.data.email || '',
          image: data.data.image || ''
        })
        setImagePreview(data.data.image)
      } else {
        setError('Failed to load member details')
      }
    } catch (err) {
      setError('Error fetching member: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
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
      const url = id ? `${BACKEND_URL}/api/organization-members.php?id=${id}` : `${BACKEND_URL}/api/organization-members.php`
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        alert(id ? t.member_updated : t.member_added)
        navigate('/admin/about/organization-members')
      } else {
        setError(data.message || t.failed_to_save)
      }
    } catch (err) {
      setError(t.error_saving + ' ' + err.message)
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
          onClick={() => navigate('/admin/about/organization-members')}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft size={24} style={{ color: '#0E4B33' }} />
        </button>
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>
          {id ? t.edit_org_member : t.add_org_member}
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
              Role (English)
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
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              Role (Arabic)
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
              <option value="">اختر دورا</option>
              {commonRoles.map((role, idx) => (
                <option key={idx} value={role.ar}>{role.ar}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Department Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              Department (English)
            </label>
            <select
              name="department_en"
              value={formData.department_en}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            >
              <option value="">{t.select_department}</option>
              {commonDepartments.map((dept, idx) => (
                <option key={idx} value={dept.en}>{dept.en}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2" style={{ color: '#0E4B33' }}>
              Department (Arabic)
            </label>
            <select
              name="department_ar"
              value={formData.department_ar}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              onFocus={(e) => e.target.style.borderColor = '#C89B3C'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              dir="rtl"
            >
              <option value="">اختر قسما</option>
              {commonDepartments.map((dept, idx) => (
                <option key={idx} value={dept.ar}>{dept.ar}</option>
              ))}
            </select>
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
              Bio (English)
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
              Bio (Arabic)
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
            onClick={() => navigate('/admin/about/organization-members')}
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

export default AddEditOrganizationMember
