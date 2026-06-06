import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const translations = {
  en: {
    add_photo_album: 'Add Photo Album',
    edit_photo_album: 'Edit Photo Album',
    title: 'Title',
    description: 'Description',
    cover_image_url: 'Cover image URL',
    or_upload_cover: 'Or upload cover image',
    cancel: 'Cancel',
    save: 'Save',
    saving: 'Saving...',
    upload_failed: 'Upload failed',
    save_failed: 'Save failed',
    error: 'Error'
  },
  ar: {
    add_photo_album: 'إضافة ألبوم صور',
    edit_photo_album: 'تعديل ألبوم صور',
    title: 'العنوان',
    description: 'الوصف',
    cover_image_url: 'رابط صورة الغلاف',
    or_upload_cover: 'أو قم بتحميل صورة الغلاف',
    cancel: 'إلغاء',
    save: 'حفظ',
    saving: 'جاري الحفظ...',
    upload_failed: 'فشل التحميل',
    save_failed: 'فشل الحفظ',
    error: 'خطأ'
  }
}

export default function AddEditPhotoAlbum() {
  const navigate = useNavigate()
  const params = useParams()
  const isEdit = Boolean(params.id)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [coverFile, setCoverFile] = useState(null)
  const [coverUrl, setCoverUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    if (isEdit) fetchAlbum()
  }, [params.id])

  async function fetchAlbum() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/photo-albums.php?id=${params.id}`)
      const j = await res.json()
      if (j.success) {
        const a = j.data
        setTitle(a.title || '')
        setDescription(a.description || '')
        setCoverUrl(a.cover_image || '')
      }
    } catch (e) { console.error(e) }
  }

  async function uploadFile(file) {
    const fd = new FormData()
    fd.append('file', file)
    const up = await fetch('https://mathwaa.org.sa/Backend/api/upload.php', { method: 'POST', body: fd })
    return await up.json()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    try {
      let cover = coverUrl
      if (coverFile) {
        const upRes = await uploadFile(coverFile)
        if (upRes.success) cover = upRes.url
        else throw new Error(upRes.message || t.upload_failed)
      }

      const payload = { title, description, cover_image: cover }
      const url = isEdit ? `${BACKEND_URL}/api/photo-albums.php?id=${params.id}` : `${BACKEND_URL}/api/photo-albums.php`
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const j = await res.json()
      if (j.success) navigate('/admin/news/photo-albums')
      else alert(j.message || t.save_failed)
    } catch (err) {
      console.error(err)
      alert(err.message || t.error)
    } finally { setSaving(false) }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#0E4B33' }}>
        {isEdit ? t.edit_photo_album : t.add_photo_album}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.title}</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.description}</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">{t.cover_image_url}</label>
          <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" placeholder="http://..." />
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">{t.or_upload_cover}</label>
            <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)} className="mt-1" />
          </div>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => navigate('/admin/news/photo-albums')} className="px-4 py-2 rounded border">{t.cancel}</button>
          <button type="submit" className="px-4 py-2 rounded text-white" style={{ backgroundColor: '#C89B3C' }} disabled={saving}>{saving ? t.saving : t.save}</button>
        </div>
      </form>
    </div>
  )
}
