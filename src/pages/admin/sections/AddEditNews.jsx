import React, { useState } from 'react'

export default function AddEditNews({ item = null, onClose, onSaved }) {
  const [titleEn, setTitleEn] = useState(item?.title ?? '')
  const [titleAr, setTitleAr] = useState(item?.title_ar ?? '')
  const [descEn, setDescEn] = useState(item?.description ?? '')
  const [descAr, setDescAr] = useState(item?.description_ar ?? '')
  const [date, setDate] = useState(item?.date ? item.date.split(' ')[0] : '')
  const [image, setImage] = useState(item?.image ?? '')
  const [file, setFile] = useState(null)
  const [saving, setSaving] = useState(false)

  const isEdit = Boolean(item && item.id)

  async function handleSubmit(e) {
    e.preventDefault()
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
          alert(upJson.message || 'Image upload failed')
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

      const url = isEdit ? `https://mathwaa.org.sa/Backend/api/news.php?id=${item.id}` : 'https://mathwaa.org.sa/Backend/api/news.php'
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()
      if (json.success) {
        onSaved && onSaved(json)
      } else {
        alert(json.message || 'Failed to save')
      }
    } catch (err) {
      console.error(err)
      alert('Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{isEdit ? 'Edit Article' : 'Add Article'}</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (EN)</label>
            <input value={titleEn} onChange={(e) => setTitleEn(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Title (AR)</label>
            <input value={titleAr} onChange={(e) => setTitleAr(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
            <textarea value={descEn} onChange={(e) => setDescEn(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description (AR)</label>
            <textarea value={descAr} onChange={(e) => setDescAr(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input value={image} onChange={(e) => setImage(e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" placeholder="http://... or leave empty" />
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700">Or upload from device</label>
                <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="mt-1" />
                {file && <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded text-white" style={{ backgroundColor: '#C89B3C' }} disabled={saving}>
              {saving ? 'Saving...' : isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
