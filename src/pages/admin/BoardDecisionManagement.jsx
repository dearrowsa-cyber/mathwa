import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, File, Download } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const translations = {
  en: {
    board_establishment_decision: 'Board Establishment Decision',
    upload_document: 'Upload Document',
    loading_documents: 'Loading documents...',
    failed_fetch: 'Failed to fetch documents',
    upload_pdf_document: 'Upload PDF Document',
    document_title_optional: 'Document Title (Optional)',
    board_decision_document: 'Board Decision Document',
    description_optional: 'Description (Optional)',
    add_description: 'Add a description for this document',
    upload_pdf_file: 'Upload PDF File',
    selected: 'Selected:',
    cancel: 'Cancel',
    upload_button: 'Upload Document',
    uploading: 'Uploading...',
    no_documents_yet: 'No documents uploaded yet',
    upload_first_document: 'Upload First Document',
    download: 'Download',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this document?',
    delete_failed: 'Failed to delete:',
    error_deleting: 'Error deleting document:',
    select_pdf: 'Please select a PDF file'
  },
  ar: {
    board_establishment_decision: 'قرار تأسيس مجلس الإدارة',
    upload_document: 'تحميل المستند',
    loading_documents: 'جاري تحميل المستندات...',
    failed_fetch: 'فشل في جلب المستندات',
    upload_pdf_document: 'تحميل مستند PDF',
    document_title_optional: 'عنوان المستند (اختياري)',
    board_decision_document: 'مستند قرار مجلس الإدارة',
    description_optional: 'الوصف (اختياري)',
    add_description: 'أضف وصفًا لهذا المستند',
    upload_pdf_file: 'تحميل ملف PDF',
    selected: 'المختار:',
    cancel: 'إلغاء',
    upload_button: 'تحميل المستند',
    uploading: 'جاري التحميل...',
    no_documents_yet: 'لم يتم تحميل أي مستندات حتى الآن',
    upload_first_document: 'تحميل أول مستند',
    download: 'تحميل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذا المستند؟',
    delete_failed: 'فشل الحذف:',
    error_deleting: 'خطأ في حذف المستند:',
    select_pdf: 'يرجى اختيار ملف PDF'
  }
}

const BoardDecisionManagement = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const SITE_BASE = BACKEND_URL.replace(/\/Backend$/, '')
  
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  })

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    fetchDocuments()
  }, [])

  const fetchDocuments = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/api/board-decision-documents.php?lang=en&admin=1`)
      const data = await response.json()
      
      if (data.success) {
        setDocuments(data.data || [])
        setError(null)
      } else {
        setError(data.message || t.failed_fetch)
      }
    } catch (err) {
      setError(t.failed_fetch)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    if (!formData.file) {
      alert(t.select_pdf)
      return
    }

    setUploading(true)
    try {
      // Upload file
      const fd = new FormData()
      fd.append('file', formData.file)
      fd.append('target', 'documents')

      const uploadRes = await fetch(`${BACKEND_URL}/api/upload.php`, { 
        method: 'POST', 
        body: fd 
      })
      const uploadData = await uploadRes.json()

      if (!uploadData.success) {
        throw new Error(uploadData.message || 'Upload failed')
      }

      // Save to database
      const payload = {
        title: formData.title || t.board_decision_document,
        description: formData.description,
        file_path: uploadData.url,
        file_name: formData.file.name,
        file_size: formData.file.size,
      }

      const saveRes = await fetch(`${BACKEND_URL}/api/board-decision-documents.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const saveData = await saveRes.json()

      if (saveData.success) {
        setFormData({ title: '', description: '', file: null })
        setShowUploadForm(false)
        await fetchDocuments()
      } else {
        alert(saveData.message || 'Save failed')
      }
    } catch (err) {
      console.error(err)
      alert(err.message || 'Error uploading document')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(t.delete_confirmation)) return

    try {
      const response = await fetch(`${BACKEND_URL}/api/board-decision-documents.php?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setDocuments(documents.filter(doc => doc.id !== id))
      } else {
        alert(t.delete_failed + ' ' + data.message)
      }
    } catch (err) {
      alert(t.error_deleting + ' ' + err.message)
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>{t.board_establishment_decision}</h1>
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> {t.upload_document}
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#0E4B33' }}>{t.upload_pdf_document}</h2>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.document_title_optional}</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t.board_decision_document}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.description_optional}</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t.add_description}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.upload_pdf_file}</label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] ?? null })}
                className="w-full"
                required
              />
              {formData.file && (
                <p className="text-sm text-gray-600 mt-2">
                  {t.selected} {formData.file.name} ({formatFileSize(formData.file.size)})
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowUploadForm(false)
                  setFormData({ title: '', description: '', file: null })
                }}
                className="px-4 py-2 rounded border"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-4 py-2 rounded text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#0E4B33' }}
              >
                {uploading ? t.uploading : t.upload_button}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
          <p className="text-gray-600 mt-4">{t.loading_documents}</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <File size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">{t.no_documents_yet}</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.upload_first_document}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4 flex-1">
                <File size={32} style={{ color: '#0E4B33' }} />
                <div className="flex-1">
                  <h3 className="font-bold" style={{ color: '#0E4B33' }}>{doc.title}</h3>
                  {doc.description && <p className="text-sm text-gray-600">{doc.description}</p>}
                  <p className="text-xs text-gray-500 mt-1">
                    {doc.file_name} • {formatFileSize(doc.file_size)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={doc.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded text-white text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#0E4B33' }}
                >
                  <Download size={16} /> {t.download}
                </a>
                <button
                  onClick={() => handleDelete(doc.id)}
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

export default BoardDecisionManagement
