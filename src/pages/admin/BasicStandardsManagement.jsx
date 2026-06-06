import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, X, Save, Upload, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const translations = {
  en: {
    basic_standards: 'Basic Standards',
    add_standard: 'Add Standard',
    loading_standards: 'Loading standards...',
    failed_fetch: 'Failed to fetch standards',
    add_new_standard: 'Add New Standard',
    edit_standard: 'Edit Standard',
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
    click_to_upload_pdf: 'Click to upload PDF file',
    max_10mb: 'Max 10MB',
    change_pdf: 'Change PDF',
    cancel: 'Cancel',
    save: 'Save',
    update_standard: 'Update Standard',
    add_standard_button: 'Add Standard',
    saving: 'Saving...',
    no_standards_yet: 'No standards added yet',
    add_first_standard: 'Add First Standard',
    category_label: 'Category:',
    download_pdf: 'Download PDF',
    edit: 'Edit',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this standard?',
    delete_success: 'Standard deleted successfully',
    delete_failed: 'Failed to delete:',
    error_deleting: 'Error deleting standard:',
    save_success_updated: 'Standard updated successfully',
    save_success_standard: 'Standard created successfully',
    error_label: 'Error:',
    enter_title: 'Please enter a title (English)',
    error_saving: 'Error saving standard:'
  },
  ar: {
    basic_standards: 'المعايير الأساسية',
    add_standard: 'إضافة معيار',
    loading_standards: 'جاري تحميل المعايير...',
    failed_fetch: 'فشل في جلب المعايير',
    add_new_standard: 'إضافة معيار جديد',
    edit_standard: 'تعديل المعيار',
    title_english: 'العنوان (الإنجليزية)*',
    title_arabic: 'العنوان (العربية)',
    category: 'الفئة',
    general: 'عام',
    governance: 'الحوكمة',
    code_of_conduct: 'آداب السلوك',
    policies: 'السياسات',
    procedures: 'الإجراءات',
    content_english: 'المحتوى (الإنجليزية)',
    content_arabic: 'المحتوى (العربية)',
    upload_pdf: 'تحميل ملف PDF',
    click_to_upload_pdf: 'انقر لتحميل ملف PDF',
    max_10mb: 'الحد الأقصى 10 ميجابايت',
    change_pdf: 'تغيير PDF',
    cancel: 'إلغاء',
    save: 'حفظ',
    update_standard: 'تحديث المعيار',
    add_standard_button: 'إضافة معيار',
    saving: 'جاري الحفظ...',
    no_standards_yet: 'لم تتم إضافة معايير بعد',
    add_first_standard: 'إضافة أول معيار',
    category_label: 'الفئة:',
    download_pdf: 'تحميل PDF',
    edit: 'تعديل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذا المعيار؟',
    delete_success: 'تم حذف المعيار بنجاح',
    delete_failed: 'فشل الحذف:',
    error_deleting: 'خطأ في حذف المعيار:',
    save_success_updated: 'تم تحديث المعيار بنجاح',
    save_success_standard: 'تم إنشاء المعيار بنجاح',
    error_label: 'خطأ:',
    enter_title: 'يرجى إدخال عنوان (الإنجليزية)',
    error_saving: 'خطأ في حفظ المعيار:'
  }
}

const BasicStandardsManagement = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [standards, setStandards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [pdfFile, setPdfFile] = useState(null)
  const [pdfFileName, setPdfFileName] = useState('')
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]
  
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
      // Validate PDF file
      if (file.type !== 'application/pdf') {
        alert('Please select a valid PDF file')
        return
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('PDF file is too large (max 10MB)')
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title_en.trim()) {
      alert(t.enter_title)
      return
    }

    try {
      setSaving(true)
      
      const method = editingId ? 'PUT' : 'POST'
      const baseUrl = import.meta.env.DEV 
        ? `/api/basic-standards.php`
        : `${BACKEND_URL}/api/basic-standards.php`
      const url = editingId ? `${baseUrl}?id=${editingId}` : baseUrl

      // Create FormData for file upload
      const form = new FormData()
      form.append('title_en', formData.title_en)
      form.append('title_ar', formData.title_ar)
      form.append('content_en', formData.content_en)
      form.append('content_ar', formData.content_ar)
      form.append('category', formData.category)
      
      // Add PDF file if selected
      if (pdfFile) {
        form.append('pdf_file', pdfFile)
      } else if (formData.pdf_file && !pdfFile) {
        // Keep existing PDF if no new file selected
        form.append('pdf_file', formData.pdf_file)
      }

      const response = await fetch(url, {
        method,
        body: form,
      })

      const data = await response.json()
      
      if (data.success) {
        setShowForm(false)
        resetForm()
        fetchStandards()
        alert(editingId ? t.save_success_updated : t.save_success_standard)
      } else {
        alert(t.error_label + ' ' + (data.message || t.failed_fetch))
      }
    } catch (err) {
      alert(t.error_saving + ' ' + err.message)
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (standard) => {
    setFormData({
      title_en: standard.title || '',
      title_ar: standard.title_ar || '',
      content_en: standard.content || '',
      content_ar: standard.content_ar || '',
      category: standard.category || 'general',
      pdf_file: standard.pdf_file || '',
    })
    setPdfFileName(standard.pdf_file ? standard.pdf_file.split('/').pop() : '')
    setPdfFile(null)
    setEditingId(standard.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm(t.delete_confirmation)) return

    try {
      const baseUrl = import.meta.env.DEV 
        ? `/api/basic-standards.php`
        : `${BACKEND_URL}/api/basic-standards.php`
      const response = await fetch(`${baseUrl}?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setStandards(standards.filter(s => s.id !== id))
        alert(t.delete_success)
      } else {
        alert(t.delete_failed + ' ' + data.message)
      }
    } catch (err) {
      alert(t.error_deleting + ' ' + err.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>{t.basic_standards}</h1>
        <button
          onClick={() => {
            resetForm()
            setShowForm(!showForm)
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> {t.add_standard}
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold" style={{ color: '#0E4B33' }}>
              {editingId ? t.edit_standard : t.add_new_standard}
            </h2>
            <button
              onClick={() => {
                setShowForm(false)
                resetForm()
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.title_english}</label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  placeholder="e.g., code of conduct"
                  className="w-full border rounded px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.title_arabic}</label>
                <input
                  type="text"
                  value={formData.title_ar}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  placeholder="عنوان بالعربية"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.category}</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="general">{t.general}</option>
                  <option value="governance">{t.governance}</option>
                  <option value="code-of-conduct">{t.code_of_conduct}</option>
                  <option value="policies">{t.policies}</option>
                  <option value="procedures">{t.procedures}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.content_english}</label>
              <textarea
                value={formData.content_en}
                onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                placeholder="Enter content in English..."
                className="w-full border rounded px-3 py-2"
                rows={5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.content_arabic}</label>
              <textarea
                value={formData.content_ar}
                onChange={(e) => setFormData({ ...formData, content_ar: e.target.value })}
                placeholder="أدخل المحتوى بالعربية..."
                className="w-full border rounded px-3 py-2"
                rows={5}
              />
            </div>

            {/* PDF Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.upload_pdf}</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                {pdfFileName ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText size={32} style={{ color: '#C89B3C' }} />
                    <div>
                      <p className="font-semibold text-gray-700">{pdfFileName}</p>
                      <label
                        htmlFor="pdf_upload"
                        className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer underline"
                      >
                        {t.change_pdf}
                      </label>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="pdf_upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Upload size={32} style={{ color: '#C89B3C' }} />
                      <span className="text-gray-600">{t.click_to_upload_pdf}</span>
                      <span className="text-xs text-gray-500">{t.max_10mb}</span>
                    </div>
                  </label>
                )}
                <input
                  id="pdf_upload"
                  type="file"
                  accept=".pdf"
                  onChange={handlePdfChange}
                  className="hidden"
                />
              </div>
              {formData.pdf_file && !pdfFile && (
                <p className="text-xs text-gray-500 mt-2">Current: {formData.pdf_file.split('/').pop()}</p>
              )}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  resetForm()
                }}
                className="px-4 py-2 rounded border text-gray-700 hover:border-gray-400"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#0E4B33' }}
              >
                <Save size={18} />
                {saving ? t.saving : editingId ? t.update_standard : t.add_standard_button}
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
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      ) : standards.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">{t.no_standards_yet}</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.add_first_standard}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {standards.map((standard) => (
            <div key={standard.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg" style={{ color: '#0E4B33' }}>
                    {standard.title}
                  </h3>
                  {standard.category && (
                    <p className="text-sm text-gray-500 mt-1">{t.category_label} {standard.category}</p>
                  )}
                  {standard.content && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">{standard.content}</p>
                  )}
                  {standard.pdf_file && (
                    <a
                      href={`https://mathwaa.org.sa//${standard.pdf_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm mt-2"
                    >
                      <FileText size={16} /> {t.download_pdf}
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => handleEdit(standard)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded bg-blue-500 text-white text-sm transition-opacity hover:opacity-90"
                >
                  <Edit2 size={16} /> {t.edit}
                </button>
                <button
                  onClick={() => handleDelete(standard.id)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded bg-red-500 text-white text-sm transition-opacity hover:opacity-90"
                >
                  <Trash2 size={16} /> {t.delete}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BasicStandardsManagement
