import React, { useState, useEffect } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'
import AddEditNews from './AddEditNews'
import { getImageUrl } from '../../../utils/imageUrl'

export default function NewsArticlesManage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const columns = [
    {
      key: 'image',
      label: 'Image',
      render: (val, row) => {
        const src = val ? (val.startsWith('http') ? val : `https://mathwaa.org.sa/${val}`) : null
        return (
          <div className="w-20 h-12">
            {src ? (
              // eslint-disable-next-line jsx-a11y/img-redundant-alt
              <img src={src} alt={row.title || 'image'} className="object-cover w-full h-full rounded" />
            ) : (
              <div className="bg-gray-100 w-full h-full flex items-center justify-center text-xs text-gray-400">No image</div>
            )}
          </div>
        )
      },
    },
    { key: 'title', label: 'Title' },
    { key: 'date', label: 'Date' },
    { key: 'created_at', label: 'Created' },
  ]

  async function fetchNews() {
    setLoading(true)
    setFetchError(null)
    try {
      const url = 'https://mathwaa.org.sa/Backend/api/news.php'
      console.log('Fetching from:', url)
      
      const res = await fetch(url)
      console.log('Response status:', res.status, res.statusText)
      
      if (!res.ok) {
        const txt = await res.text()
        console.error('Non-200 response:', txt)
        setFetchError(`Server error ${res.status}: ${txt.substring(0, 200)}`)
        setData([])
        return
      }

      let json = null
      try {
        const txt = await res.text()
        console.log('Raw response:', txt.substring(0, 500))
        json = txt ? JSON.parse(txt) : null
      } catch (e) {
        console.error('JSON parse error:', e.message)
        setFetchError(`Invalid JSON from server: ${e.message}`)
        setData([])
        return
      }

      console.log('Parsed JSON:', json)
      
      if (json && json.success && Array.isArray(json.data)) {
        const items = json.data.map((it) => {
          return {
            id: it.id,
            title: it.title ?? it.title_en ?? it.slug ?? it.excerpt_en ?? '',
            description: it.description ?? it.description_en ?? it.excerpt_en ?? it.content_en ?? '',
            image: it.image ?? it.image_url ?? it.image_path ?? null,
            date: it.date ?? it.created_at ?? null,
            created_at: it.created_at ?? null,
            _raw: it,
          }
        })
        console.log('Normalized items:', items)
        setData(items)
        setFetchError(null)
      } else {
        console.warn('Unexpected API response format:', json)
        setFetchError(json?.message ?? 'API returned unexpected format')
        setData([])
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setFetchError(`Network error: ${err.message}`)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const [fetchError, setFetchError] = useState(null)

  useEffect(() => {
    fetchNews()
  }, [])

  const handleAdd = () => {
    setEditing(null)
    setShowForm(true)
  }

  const handleEdit = (row) => {
    setEditing(row)
    setShowForm(true)
  }

  const handleDelete = async (row) => {
    if (!window.confirm('Delete this article?')) return
    try {
      const res = await fetch(`https://mathwaa.org.sa/Backend/api/news.php?id=${row.id}`, { method: 'DELETE' })
      const json = await res.json()
      if (json.success) fetchNews()
      else alert(json.message || 'Delete failed')
    } catch (err) {
      console.error(err)
      alert('Delete failed')
    }
  }

  const handleSaved = () => {
    setShowForm(false)
    setEditing(null)
    fetchNews()
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">News & Announcements</h1>
            <p className="text-gray-500 mt-1">Manage news articles and announcements for the website.</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white"
            style={{ backgroundColor: '#C89B3C' }}
          >
            + Add article
          </button>
        </div>

        {fetchError && (
          <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-100 text-sm">{fetchError}</div>
        )}

        {loading && <p className="text-gray-500">Loading news...</p>}
        {!loading && data.length === 0 && <p className="text-gray-500">No news articles found. Create one to get started.</p>}

        {!loading && data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item) => {
              const imgSrc = getImageUrl(item.image)
              return (
                <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {imgSrc && (
                    <div className="aspect-video overflow-hidden bg-gray-100">
                      <img src={imgSrc} alt={item.title} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none' }} />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{item.title || 'Untitled'}</h3>
                    {item.description && <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description}</p>}
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <span>{item.date ? new Date(item.date).toLocaleDateString() : 'No date'}</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(item)} className="px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200">Edit</button>
                        <button onClick={() => handleDelete(item)} className="px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showForm && (
        <AddEditNews
          item={editing}
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  )
}
