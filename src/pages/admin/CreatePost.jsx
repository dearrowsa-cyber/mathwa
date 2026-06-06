import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader, ArrowLeft, Edit2, Trash2 } from 'lucide-react'
import { getImageUrl } from '../../utils/imageUrl'

const translations = {
  en: {
    back_to_news: 'Back to News',
    create_new_post: 'Create New Post',
    edit_draft_post: 'Edit Draft Post',
    add_new_article: 'Add a new news article or announcement',
    update_draft: 'Update your draft post',
    draft_saved: 'Draft saved',
    draft_updated: 'Draft updated',
    title_english: 'Title (English)',
    title_urdu: 'Title (اردو)',
    description_english: 'Description (English)',
    description_urdu: 'Description (اردو)',
    date: 'Date',
    post_image: 'Post Image',
    enter_title_english: 'Enter post title in English',
    enter_title_urdu: 'اردو میں عنوان درج کریں',
    enter_description_english: 'Enter post description in English',
    enter_description_urdu: 'اردو میں تفصیل درج کریں',
    upload_from_device: 'Upload from device',
    or_paste_url: 'Or paste image URL',
    image_url_placeholder: 'http://example.com/image.jpg',
    selected: 'Selected:',
    url_disabled: '(URL field disabled because you selected a file to upload)',
    cancel_edit: 'Cancel Edit',
    cancel: 'Cancel',
    update_post: 'Update Post',
    add_post: 'Add Post',
    updating: 'Updating...',
    adding: 'Adding...',
    saved_drafts: 'Saved Drafts',
    loading_drafts: 'Loading drafts...',
    no_saved_drafts: 'No saved drafts yet. Create one using the form above!',
    delete_confirmation: 'Are you sure you want to delete this draft?',
    delete_failed: 'Failed to delete draft:',
    delete_error: 'Error deleting draft:'
  },
  ar: {
    back_to_news: 'العودة إلى الأخبار',
    create_new_post: 'إنشاء منشور جديد',
    edit_draft_post: 'تحرير منشور المسودة',
    add_new_article: 'إضافة مقالة أخبار جديدة أو إعلان',
    update_draft: 'تحديث منشور المسودة الخاص بك',
    draft_saved: 'تم حفظ المسودة',
    draft_updated: 'تم تحديث المسودة',
    title_english: 'العنوان (الإنجليزية)',
    title_urdu: 'العنوان (اردو)',
    description_english: 'الوصف (الإنجليزية)',
    description_urdu: 'الوصف (اردو)',
    date: 'التاريخ',
    post_image: 'صورة المنشور',
    enter_title_english: 'أدخل عنوان المنشور بالإنجليزية',
    enter_title_urdu: 'اردو میں عنوان درج کریں',
    enter_description_english: 'أدخل وصف المنشور بالإنجليزية',
    enter_description_urdu: 'اردو میں تفصیل درج کریں',
    upload_from_device: 'التحميل من الجهاز',
    or_paste_url: 'أو لصق عنوان URL للصورة',
    image_url_placeholder: 'http://example.com/image.jpg',
    selected: 'محدد:',
    url_disabled: '(حقل URL معطل لأنك حددت ملف للتحميل)',
    cancel_edit: 'إلغاء التحرير',
    cancel: 'إلغاء',
    update_post: 'تحديث المنشور',
    add_post: 'إضافة منشور',
    updating: 'جاري التحديث...',
    adding: 'جاري الإضافة...',
    saved_drafts: 'المسودات المحفوظة',
    loading_drafts: 'جاري تحميل المسودات...',
    no_saved_drafts: 'لا توجد مسودات محفوظة حتى الآن. قم بإنشاء واحدة باستخدام النموذج أعلاه!',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذه المسودة؟',
    delete_failed: 'فشل حذف المسودة:',
    delete_error: 'خطأ في حذف المسودة:'
  }
}

export default function CreatePost() {
  const navigate = useNavigate()
  const [titleEn, setTitleEn] = useState('')
  const [titleAr, setTitleAr] = useState('')
  const [descEn, setDescEn] = useState('')
  const [descAr, setDescAr] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [image, setImage] = useState('')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [drafts, setDrafts] = useState([])
  const [loadingDrafts, setLoadingDrafts] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  // Fetch all drafts on mount
  useEffect(() => {
    fetchDrafts()
  }, [])

  async function fetchDrafts() {
    setLoadingDrafts(true)
    try {
      const response = await fetch('https://mathwaa.org.sa/Backend/api/create-post.php')
      const data = await response.json()
      if (data.success) {
        setDrafts(data.data || [])
      } else {
        console.error('Error fetching drafts:', data.message)
      }
    } catch (err) {
      console.error('Error fetching drafts:', err)
    } finally {
      setLoadingDrafts(false)
    }
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      // Clear the URL input when a file is selected
      setImage('')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validation
    if (!titleEn.trim()) {
      setError(t.title_english + ' is required')
      return
    }

    if (!descEn.trim()) {
      setError(t.description_english + ' is required')
      return
    }

    if (!date) {
      setError(t.date + ' is required')
      return
    }

    setSaving(true)
    try {
      let imageUrl = image || null

      // If a local file was selected, upload it first
      if (file) {
        const fd = new FormData()
        fd.append('file', file)
        const up = await fetch('https://mathwaa.org.sa/Backend/api/upload.php', { method: 'POST', body: fd })
        const upJson = await up.json()
        if (!upJson.success) {
          setError(upJson.message || 'Image upload failed')
          setSaving(false)
          return
        }
        imageUrl = upJson.url
      }

      const payload = {
        title_en: titleEn,
        title_ar: titleAr,
        description_en: descEn,
        description_ar: descAr,
        date: date,
        image: imageUrl,
      }

      const url = editingId 
        ? `https://mathwaa.org.sa/Backend/api/create-post.php?id=${editingId}` 
        : 'https://mathwaa.org.sa/Backend/api/create-post.php'
      const method = editingId ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (json.success) {
        setSuccess(true)
        // Reset form
        setTitleEn('')
        setTitleAr('')
        setDescEn('')
        setDescAr('')
        setDate(new Date().toISOString().split('T')[0])
        setImage('')
        setFile(null)
        setEditingId(null)
        
        // Refresh drafts list
        await fetchDrafts()
        
        // Clear success message after 2 seconds
        setTimeout(() => {
          setSuccess(false)
        }, 2000)
      } else {
        setError(json.message || 'Failed to save post')
      }
    } catch (err) {
      console.error(err)
      setError('Save failed: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  async function handleEdit(draft) {
    setTitleEn(draft.title_en || '')
    setTitleAr(draft.title_ar || '')
    setDescEn(draft.description_en || '')
    setDescAr(draft.description_ar || '')
    setDate(draft.date || '')
    setImage(draft.image || '')
    setFile(null)
    setEditingId(draft.id)
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(id) {
    if (!confirm(t.delete_confirmation)) return

    try {
      const response = await fetch(`https://mathwaa.org.sa/Backend/api/create-post.php?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (data.success) {
        setDrafts(drafts.filter(d => d.id !== id))
      } else {
        alert(t.delete_failed + ' ' + data.message)
      }
    } catch (err) {
      alert(t.delete_error + ' ' + err.message)
    }
  }

  function handleCancelEdit() {
    setEditingId(null)
    setTitleEn('')
    setTitleAr('')
    setDescEn('')
    setDescAr('')
    setDate(new Date().toISOString().split('T')[0])
    setImage('')
    setFile(null)
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/admin/news/articles')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          {t.back_to_news}
        </button>
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>
          {editingId ? t.edit_draft_post : t.create_new_post}
        </h1>
        <p className="text-gray-500 mt-2">
          {editingId 
            ? t.update_draft
            : t.add_new_article
          }
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600 font-medium">✓ {editingId ? t.draft_updated : t.draft_saved} successfully!</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          {/* English Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.title_english} *
            </label>
            <input
              type="text"
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
              placeholder={t.enter_title_english}
              required
            />
          </div>

          {/* Urdu/Arabic Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.title_urdu}
            </label>
            <input
              type="text"
              value={titleAr}
              onChange={(e) => setTitleAr(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent text-right"
              placeholder={t.enter_title_urdu}
              dir="rtl"
            />
          </div>

          {/* English Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.description_english} *
            </label>
            <textarea
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
              rows={6}
              placeholder={t.enter_description_english}
              required
            />
          </div>

          {/* Urdu/Arabic Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.description_urdu}
            </label>
            <textarea
              value={descAr}
              onChange={(e) => setDescAr(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent text-right"
              rows={6}
              placeholder={t.enter_description_urdu}
              dir="rtl"
            />
          </div>

          {/* Date */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {t.date} *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">{t.post_image}</h3>

            {/* Option 1: Upload from device */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.upload_from_device}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#C89B3C] file:text-white hover:file:opacity-90"
              />
              {file && (
                <p className="mt-2 text-sm text-green-600">
                  ✓ {t.selected} {file.name}
                </p>
              )}
            </div>

            {/* Option 2: Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                {t.or_paste_url}
              </label>
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder={t.image_url_placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
                disabled={!!file}
              />
              {file && (
                <p className="mt-2 text-xs text-gray-500">
                  {t.url_disabled}
                </p>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={editingId ? handleCancelEdit : () => navigate('/admin/news/articles')}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              {editingId ? t.cancel_edit : t.cancel}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition flex items-center justify-center gap-2"
              style={{ backgroundColor: '#C89B3C', opacity: saving ? 0.7 : 1 }}
            >
              {saving && <Loader size={20} className="animate-spin" />}
              {saving ? (editingId ? t.updating : t.adding) : (editingId ? t.update_post : t.add_post)}
            </button>
          </div>
        </form>
      </div>

      {/* Saved Drafts Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#0E4B33' }}>{t.saved_drafts}</h2>
        
        {loadingDrafts ? (
          <div className="text-center py-12">
            <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
            <p className="text-gray-600 mt-4">{t.loading_drafts}</p>
          </div>
        ) : drafts.length === 0 ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-600">{t.no_saved_drafts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {drafts.map((draft) => (
              <div key={draft.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  {draft.image && (
                    <img
                      src={getImageUrl(draft.image)}
                      alt={draft.title_en}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{draft.title_en}</h3>
                    {draft.title_ar && (
                      <p className="text-sm text-gray-500 text-right truncate">{draft.title_ar}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{draft.description_en}</p>
                    <div className="flex gap-4 mt-3 text-xs text-gray-500">
                      {draft.date && (
                        <span>📅 {new Date(draft.date).toLocaleDateString()}</span>
                      )}
                      <span>📝 Created: {new Date(draft.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(draft)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(draft.id)}
                      className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

