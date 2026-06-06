import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, File, Download, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const translations = {
  en: {
    organization_certificate: 'Organization Certificate',
    upload_certificate: 'Upload Certificate',
    loading_certificates: 'Loading certificates...',
    failed_fetch: 'Failed to fetch certificates',
    edit_certificate: 'Edit Certificate',
    upload_certificate_title: 'Upload Certificate',
    title_english: 'Title (English)*',
    title_arabic: 'Title (Arabic)',
    description_english: 'Description (English)',
    description_arabic: 'Description (Arabic)',
    certificate_type: 'Certificate Type',
    standard: 'Standard',
    iso: 'ISO Certification',
    award: 'Award/Recognition',
    compliance: 'Compliance',
    other: 'Other',
    issuing_authority: 'Issuing Authority',
    authority_placeholder: 'e.g., Ministry, Organization Name',
    issue_date: 'Issue Date',
    expiry_date: 'Expiry Date (Optional)',
    upload_file: 'Upload File',
    required_asterisk: '*',
    allowed_formats: 'Allowed: PDF, JPG, PNG (Max 10MB)',
    selected: 'Selected:',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving...',
    update_certificate: 'Update Certificate',
    upload_certificate_button: 'Upload Certificate',
    loading: 'Loading...',
    no_certificates_yet: 'No certificates uploaded yet',
    upload_first_certificate: 'Upload First Certificate',
    type_label: 'Type:',
    authority_label: 'Authority:',
    issued_label: 'Issued:',
    expires_label: 'Expires:',
    download: 'Download',
    edit: 'Edit',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this certificate?',
    delete_failed: 'Failed to delete:',
    error_deleting: 'Error deleting certificate:'
  },
  ar: {
    organization_certificate: 'شهادة المنظمة',
    upload_certificate: 'تحميل الشهادة',
    loading_certificates: 'جاري تحميل الشهادات...',
    failed_fetch: 'فشل في جلب الشهادات',
    edit_certificate: 'تعديل الشهادة',
    upload_certificate_title: 'تحميل الشهادة',
    title_english: 'العنوان (الإنجليزية)*',
    title_arabic: 'العنوان (العربية)',
    description_english: 'الوصف (الإنجليزية)',
    description_arabic: 'الوصف (العربية)',
    certificate_type: 'نوع الشهادة',
    standard: 'قياسي',
    iso: 'شهادة ISO',
    award: 'جائزة/اعتراف',
    compliance: 'الامتثال',
    other: 'أخرى',
    issuing_authority: 'جهة الإصدار',
    authority_placeholder: 'مثل وزارة، اسم المنظمة',
    issue_date: 'تاريخ الإصدار',
    expiry_date: 'تاريخ انتهاء الصلاحية (اختياري)',
    upload_file: 'تحميل الملف',
    required_asterisk: '*',
    allowed_formats: 'المسموح: PDF، JPG، PNG (الحد الأقصى 10 ميجابايت)',
    selected: 'المختار:',
    cancel: 'إلغاء',
    save: 'حفظ',
    saving: 'جاري الحفظ...',
    update_certificate: 'تحديث الشهادة',
    upload_certificate_button: 'تحميل الشهادة',
    loading: 'جاري التحميل...',
    no_certificates_yet: 'لم يتم تحميل أي شهادات حتى الآن',
    upload_first_certificate: 'تحميل أول شهادة',
    type_label: 'النوع:',
    authority_label: 'الجهة:',
    issued_label: 'تاريخ الإصدار:',
    expires_label: 'تاريخ الانتهاء:',
    download: 'تحميل',
    edit: 'تعديل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذه الشهادة؟',
    delete_failed: 'فشل الحذف:',
    error_deleting: 'خطأ في حذف الشهادة:'
  }
}

const OrganizationCertificateManagement = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const SITE_BASE = BACKEND_URL.replace(/\/Backend$/, '')
  
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]
  
  const [formData, setFormData] = useState({
    title_en: '',
    title_ar: '',
    description_en: '',
    description_ar: '',
    certificate_type: 'standard',
    issue_date: '',
    expiry_date: '',
    issuing_authority: '',
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
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/api/organization-certificates.php?lang=en&admin=1`)
      const data = await response.json()
      
      if (data.success) {
        setCertificates(data.data || [])
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

  const resetForm = () => {
    setFormData({
      title_en: '',
      title_ar: '',
      description_en: '',
      description_ar: '',
      certificate_type: 'standard',
      issue_date: '',
      expiry_date: '',
      issuing_authority: '',
      file: null,
    })
    setEditingId(null)
  }

  const handleFileUpload = async (e) => {
    e.preventDefault()
    if (!formData.file && !editingId) {
      alert('Please select a file')
      return
    }

    try {
      setUploading(true)
      const uploadFormData = new FormData()
      
      if (formData.file) {
        uploadFormData.append('file', formData.file)
      }
      uploadFormData.append('title_en', formData.title_en)
      uploadFormData.append('title_ar', formData.title_ar)
      uploadFormData.append('description_en', formData.description_en)
      uploadFormData.append('description_ar', formData.description_ar)
      uploadFormData.append('certificate_type', formData.certificate_type)
      uploadFormData.append('issue_date', formData.issue_date)
      uploadFormData.append('expiry_date', formData.expiry_date)
      uploadFormData.append('issuing_authority', formData.issuing_authority)

      let response
      if (editingId) {
        // For editing, send as JSON for metadata update
        const updateData = {
          title_en: formData.title_en,
          title_ar: formData.title_ar,
          description_en: formData.description_en,
          description_ar: formData.description_ar,
          certificate_type: formData.certificate_type,
          issue_date: formData.issue_date,
          expiry_date: formData.expiry_date,
          issuing_authority: formData.issuing_authority,
        }
        response = await fetch(`${BACKEND_URL}/api/organization-certificates.php?id=${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData),
        })
      } else {
        response = await fetch(`${BACKEND_URL}/api/organization-certificates.php`, {
          method: 'POST',
          body: uploadFormData,
        })
      }

      const data = await response.json()
      
      if (data.success) {
        setShowUploadForm(false)
        resetForm()
        fetchCertificates()
        alert(editingId ? 'Certificate updated successfully' : 'Certificate uploaded successfully')
      } else {
        alert('Error: ' + (data.message || 'Failed to save certificate'))
      }
    } catch (err) {
      alert('Error uploading certificate: ' + err.message)
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (cert) => {
    setFormData({
      title_en: cert.title || '',
      title_ar: cert.title_ar || '',
      description_en: cert.description || '',
      description_ar: cert.description_ar || '',
      certificate_type: cert.certificate_type || 'standard',
      issue_date: cert.issue_date || '',
      expiry_date: cert.expiry_date || '',
      issuing_authority: cert.issuing_authority || '',
      file: null,
    })
    setEditingId(cert.id)
    setShowUploadForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm(t.delete_confirmation)) return

    try {
      const response = await fetch(`${BACKEND_URL}/api/organization-certificates.php?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setCertificates(certificates.filter(cert => cert.id !== id))
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
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>{t.organization_certificate}</h1>
        <button
          onClick={() => {
            resetForm()
            setShowUploadForm(!showUploadForm)
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> {t.upload_certificate}
        </button>
      </div>

      {showUploadForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold" style={{ color: '#0E4B33' }}>
              {editingId ? t.edit_certificate : t.upload_certificate_title}
            </h2>
            <button
              onClick={() => {
                setShowUploadForm(false)
                resetForm()
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleFileUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.title_english}</label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  placeholder="Organization Certificate"
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
                  placeholder="شهادة المنظمة"
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.description_english}</label>
                <textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  placeholder="Certificate description..."
                  className="w-full border rounded px-3 py-2"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.description_arabic}</label>
                <textarea
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  placeholder="وصف الشهادة..."
                  className="w-full border rounded px-3 py-2"
                  rows={2}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.certificate_type}</label>
                <select
                  value={formData.certificate_type}
                  onChange={(e) => setFormData({ ...formData, certificate_type: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                >
                  <option value="standard">{t.standard}</option>
                  <option value="iso">{t.iso}</option>
                  <option value="award">{t.award}</option>
                  <option value="compliance">{t.compliance}</option>
                  <option value="other">{t.other}</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.issuing_authority}</label>
                <input
                  type="text"
                  value={formData.issuing_authority}
                  onChange={(e) => setFormData({ ...formData, issuing_authority: e.target.value })}
                  placeholder={t.authority_placeholder}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.issue_date}</label>
                <input
                  type="date"
                  value={formData.issue_date}
                  onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">{t.expiry_date}</label>
                <input
                  type="date"
                  value={formData.expiry_date}
                  onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.upload_file} {!editingId && t.required_asterisk}
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] ?? null })}
                className="w-full"
                required={!editingId}
              />
              <p className="text-xs text-gray-500 mt-2">{t.allowed_formats}</p>
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
                  resetForm()
                }}
                className="px-4 py-2 rounded border text-gray-700 hover:border-gray-400"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-4 py-2 rounded text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: '#0E4B33' }}
              >
                {uploading ? t.saving : editingId ? t.update_certificate : t.upload_certificate_button}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
          <p className="text-gray-600 mt-4">{t.loading_certificates}</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      ) : certificates.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <File size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">{t.no_certificates_yet}</p>
          <button
            onClick={() => setShowUploadForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.upload_first_certificate}
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4 flex-1">
                  <File size={32} style={{ color: '#0E4B33' }} className="mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg" style={{ color: '#0E4B33' }}>
                      {cert.title}
                    </h3>
                    {cert.description && (
                      <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                    )}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2 text-xs">
                      {cert.certificate_type && (
                        <div>
                          <span className="font-medium text-gray-700">{t.type_label}</span>
                          <p className="text-gray-600">{cert.certificate_type}</p>
                        </div>
                      )}
                      {cert.issuing_authority && (
                        <div>
                          <span className="font-medium text-gray-700">{t.authority_label}</span>
                          <p className="text-gray-600">{cert.issuing_authority}</p>
                        </div>
                      )}
                      {cert.issue_date && (
                        <div>
                          <span className="font-medium text-gray-700">{t.issued_label}</span>
                          <p className="text-gray-600">{new Date(cert.issue_date).toLocaleDateString()}</p>
                        </div>
                      )}
                      {cert.expiry_date && (
                        <div>
                          <span className="font-medium text-gray-700">{t.expires_label}</span>
                          <p className="text-gray-600">{new Date(cert.expiry_date).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      {cert.file_name} • {formatFileSize(cert.file_size)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 justify-end ml-0">
                <a
                  href={cert.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded text-white text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#0E4B33' }}
                >
                    <Download size={16} /> {t.download}
                </a>
                <button
                  onClick={() => handleEdit(cert)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded bg-blue-500 text-white text-sm transition-opacity hover:opacity-90"
                >
                  <Edit2 size={16} /> {t.edit}
                </button>
                <button
                  onClick={() => handleDelete(cert.id)}
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

export default OrganizationCertificateManagement
