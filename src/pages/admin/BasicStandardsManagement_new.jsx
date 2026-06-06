import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, X, Save, Upload, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const translations = {
  en: {
    basic_standards: 'Basic Standards',
    add_standard: 'Add Standard',
    loading_standards: 'Loading standards...',
    edit_standard: 'Edit Standard',
    add_new_standard: 'Add New Standard',
    title_english: 'Title (English)*',
    title_arabic: 'Title (Arabic)',
    category: 'Category',
    general: 'General',
    governance: 'Governance',
    code_of_conduct: 'Code of Conduct',
    policies: 'Policies',
    procedures: 'Procedures',
    content_english: 'Content (English)',
    content_arabic: 'Content (Arabic)',
    upload_pdf: 'Upload PDF File',
    cancel: 'Cancel',
    saving: 'Saving...',
    update_standard: 'Update Standard',
    add: 'Add Standard',
    no_standards: 'No standards added yet',
    add_first: 'Add First Standard',
    category_label: 'Category:',
    download_pdf: 'Download PDF',
    edit: 'Edit',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this standard?',
    deleted_success: 'Standard deleted successfully',
    failed_to_delete: 'Failed to delete:',
    error_deleting: 'Error deleting standard:',
    updated_success: 'Standard updated successfully',
    created_success: 'Standard created successfully',
    error_saving: 'Error: ',
    failed_save: 'Failed to save',
    error_save: 'Error saving standard:',
    title_required: 'Please enter a title (English)',
    failed_fetch: 'Failed to fetch standards',
    invalid_pdf: 'Please select a valid PDF file',
    pdf_too_large: 'PDF file is too large (max 10MB)',
  },
  ar: {
    basic_standards: 'المعايير الأساسية',
    add_standard: 'إضافة معيار',
    loading_standards: 'جاري تحميل المعايير...',
    edit_standard: 'تعديل المعيار',
    add_new_standard: 'إضافة معيار جديد',
    title_english: 'العنوان (إنجليزي)*',
    title_arabic: 'العنوان (عربي)',
    category: 'الفئة',
    general: 'عام',
    governance: 'الحوكمة',
    code_of_conduct: 'قواعس السلوك',
    policies: 'السياسات',
    procedures: 'الإجراءات',
    content_english: 'المحتوى (إنجليزي)',
    content_arabic: 'المحتوى (عربي)',
    upload_pdf: 'رفع ملف PDF',
    cancel: 'إلغاء',
    saving: 'جاري الحفظ...',
    update_standard: 'تحديث المعيار',
    add: 'إضافة معيار',
    no_standards: 'لم تتم إضافة معايير حتى الآن',
    add_first: 'إضافة أول معيار',
    category_label: 'الفئة:',
    download_pdf: 'تحميل PDF',
    edit: 'تعديل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذا المعيار؟',
    deleted_success: 'تم حذف المعيار بنجاح',
    failed_to_delete: 'فشل في الحذف:',
    error_deleting: 'خطأ في حذف المعيار:',
    updated_success: 'تم تحديث المعيار بنجاح',
    created_success: 'تم إنشاء المعيار بنجاح',
    error_saving: 'خطأ: ',
    failed_save: 'فشل في الحفظ',
    error_save: 'خطأ في حفظ المعيار:',
    title_required: 'يرجى إدخال عنوان (إنجليزي)',
    failed_fetch: 'فشل في جلب المعايير',
    invalid_pdf: 'يرجى تحديد ملف PDF صحيح',
    pdf_too_large: 'ملف PDF كبير جداً (الحد الأقصى 10 ميجابايت)',
  }
}

const BasicStandardsManagement = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]
  
  const [standards, setStandards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfFileName, setPdfFileName] = useState('')
  
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    content_en: '',
    content_ar: '',
    category: 'general',
    pdf_file: '',
  })

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    fetchStandards()
  }, [])

  const fetchStandards = async () => {
    try {
      setLoading(true)
      const apiUrl = import.meta.env.DEV 
        ? `/api/basic-standards.php?lang=en&admin=1`
        : `${BACKEND_URL}/api/basic-standards.php?lang=en&admin=1`
      const response = await fetch(apiUrl)
      const data = await response.json()
      
      if (data.success) {
        setStandards(data.data || [])
        setError(null)
      } else {
        setError(data.message || t.failed_fetch)
      }
    } catch (err) {
      setError(t.failed_fetch + ': ' + err.message)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePdfChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        alert(t.invalid_pdf)
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        alert(t.pdf_too_large)
        return
      }
      setPdfFile(file)
      setPdfFileName(file.name)
    }
  }

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_ar: '',
      content_en: '',
      content_ar: '',
      category: 'general',
      pdf_file: '',
    })
    setPdfFile(null)
    setPdfFileName('')
    setEditingId(null)
    setShowForm(false)
  }

  const handleEdit = (standard) => {
    setFormData({
      title_en: standard.title_en || '',
      title_ar: standard.title_ar || '',
      content_en: standard.content_en || '',
      content_ar: standard.content_ar || '',
      category: standard.category || 'general',
      pdf_file: standard.pdf_file || '',
    })
    setPdfFileName(standard.pdf_file ? standard.pdf_file.split('/').pop() : '')
    setEditingId(standard.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDelete = async (id) => {
    if (!confirm(t.delete_confirmation)) return

    try {
      const response = await fetch(`${BACKEND_URL}/api/basic-standards.php?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setStandards(standards.filter(s => s.id !== id))
        alert(t.deleted_success)
      } else {
        alert(t.failed_to_delete + ' ' + data.message)
      }
    } catch (err) {
      alert(t.error_deleting + ' ' + err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    if (!formData.title_en.trim()) {
      setError(t.title_required)
      setSaving(false)
      return
    }

    try {
      const method = editingId ? 'PUT' : 'POST'
      const url = editingId 
        ? `${BACKEND_URL}/api/basic-standards.php?id=${editingId}`
        : `${BACKEND_URL}/api/basic-standards.php`

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      if (data.success) {
        alert(editingId ? t.updated_success : t.created_success)
        resetForm()
        await fetchStandards()
      } else {
        setError(data.message || (editingId ? t.failed_save : t.failed_save))
      }
    } catch (err) {
      setError(t.error_save + ' ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>{t.basic_standards}</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> {t.add_standard}
        </button>
      </div>

      {showForm && (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{editingId ? t.edit_standard : t.add_new_standard}</h2>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{t.error_saving} {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.title_english}</label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({...formData, title_en: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.title_arabic}</label>
                <input
                  type="text"
                  value={formData.title_ar}
                  onChange={(e) => setFormData({...formData, title_ar: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                  dir="rtl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.category}</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="general">{t.general}</option>
                  <option value="governance">{t.governance}</option>
                  <option value="conduct">{t.code_of_conduct}</option>
                  <option value="policies">{t.policies}</option>
                  <option value="procedures">{t.procedures}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.content_english}</label>
                <textarea
                  value={formData.content_en}
                  onChange={(e) => setFormData({...formData, content_en: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.content_arabic}</label>
                <textarea
                  value={formData.content_ar}
                  onChange={(e) => setFormData({...formData, content_ar: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-right"
                  dir="rtl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.upload_pdf}</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handlePdfChange}
                className="block w-full text-sm text-gray-500"
              />
              {pdfFileName && <p className="mt-2 text-sm text-green-600">✓ {pdfFileName}</p>}
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-2 rounded-lg text-white font-semibold"
                style={{ backgroundColor: '#C89B3C', opacity: saving ? 0.7 : 1 }}
              >
                {saving ? t.saving : (editingId ? t.update_standard : t.add)}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
          <p className="text-gray-600 mt-4">{t.loading_standards}</p>
        </div>
      ) : standards.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <FileText size={48} className="mx-auto mb-4 text-gray-400"  />
          <p className="text-gray-600 mb-4">{t.no_standards}</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.add_first}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {standards.map((standard) => (
            <div key={standard.id} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{standard.title_en}</h3>
                  {standard.title_ar && <p className="text-sm text-gray-500 text-right">{standard.title_ar}</p>}
                  <p className="text-sm text-gray-600 mt-1">{t.category_label} {standard.category}</p>
                  {standard.pdf_file && (
                    <a href={standard.pdf_file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-2 inline-flex items-center gap-1">
                      <FileText size={16} /> {t.download_pdf}
                    </a>
                  )}
                </div>
                <div className="flex gap-2 ml-4 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(standard)}
                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(standard.id)}
                    className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
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
  )
}

export default BasicStandardsManagement
