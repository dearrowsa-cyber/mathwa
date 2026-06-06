import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, Video } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../utils/imageUrl'

const translations = {
  en: {
    video_albums_management: 'Video Albums Management',
    add_album: 'Add Album',
    loading_albums: 'Loading albums...',
    no_albums: 'No video albums yet',
    create_first_album: 'Create First Album',
    videos: 'videos',
    edit: 'Edit',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this album with all its videos?',
    delete_failed: 'Failed to delete album:',
    delete_error: 'Error deleting album:',
    failed_fetch: 'Failed to fetch albums'
  },
  ar: {
    video_albums_management: 'إدارة ألبومات الفيديو',
    add_album: 'إضافة ألبوم',
    loading_albums: 'جاري تحميل الألبومات...',
    no_albums: 'لا توجد ألبومات فيديو حتى الآن',
    create_first_album: 'إنشاء أول ألبوم',
    videos: 'فيديوهات',
    edit: 'تعديل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذا الألبوم مع جميع فيديوهاته؟',
    delete_failed: 'فشل حذف الألبوم:',
    delete_error: 'خطأ في حذف الألبوم:',
    failed_fetch: 'فشل في جلب الألبومات'
  }
}

const VideoAlbumsManagement = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
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
    fetchAlbums()
  }, [])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/api/video-albums.php?lang=en&admin=1`)
      const data = await response.json()
      
      if (data.success) {
        const items = data.data.map((a) => ({
          id: a.id,
          title: a.title ?? a.title_en ?? '',
          description: a.description ?? a.description_en ?? '',
          thumbnail: a.thumbnail,
          video_count: a.video_count ?? 0,
          _raw: a,
        }))
        setAlbums(items)
        setError(null)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError(t.failed_fetch)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(t.delete_confirmation)) return

    try {
      const response = await fetch(`${BACKEND_URL}/api/video-albums.php?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setAlbums(albums.filter(item => item.id !== id))
      } else {
        alert(t.delete_failed + ' ' + data.message)
      }
    } catch (err) {
      alert(t.delete_error + ' ' + err.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>{t.video_albums_management}</h1>
        <Link
          to="/admin/news/video-albums/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> {t.add_album}
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
          <p className="text-gray-600 mt-4">{t.loading_albums}</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      ) : albums.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <Video size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">{t.no_albums}</p>
          <Link
            to="/admin/news/video-albums/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.create_first_album}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div key={album.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              {album.thumbnail ? (
                <img src={getImageUrl(album.thumbnail)} alt={album.title} className="w-full h-48 object-cover" onError={(e) => e.target.src = '/images/placeholder.jpg'} />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Video size={48} className="text-gray-400" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1" style={{ color: '#0E4B33' }}>{album.title}</h3>
                <p className="text-gray-600 text-sm mb-3 truncate">{album.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{album.video_count || 0} {t.videos}</span>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/news/video-albums/edit/${album.id}`}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded text-white text-sm transition-opacity hover:opacity-90"
                      style={{ backgroundColor: '#C89B3C' }}
                    >
                      <Edit2 size={16} /> {t.edit}
                    </Link>
                    <button
                      onClick={() => handleDelete(album.id)}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white text-sm transition-opacity hover:opacity-90"
                    >
                      <Trash2 size={16} /> {t.delete}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default VideoAlbumsManagement
