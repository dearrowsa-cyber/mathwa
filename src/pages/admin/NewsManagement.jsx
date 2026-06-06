import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const translations = {
  en: {
    news_management: 'News Management',
    add_news: 'Add News',
    loading_news: 'Loading news...',
    no_news_items: 'No news items yet',
    create_first_news: 'Create First News',
    image: 'Image',
    title: 'Title',
    date: 'Date',
    description: 'Description',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this news item?',
    failed_delete: 'Failed to delete news:',
    error_deleting: 'Error deleting news:',
    failed_fetch: 'Failed to fetch news'
  },
  ar: {
    news_management: 'إدارة الأخبار',
    add_news: 'إضافة خبر',
    loading_news: 'جاري تحميل الأخبار...',
    no_news_items: 'لا توجد أخبار حتى الآن',
    create_first_news: 'إنشاء أول خبر',
    image: 'الصورة',
    title: 'العنوان',
    date: 'التاريخ',
    description: 'الوصف',
    actions: 'الإجراءات',
    edit: 'تعديل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذا الخبر؟',
    failed_delete: 'فشل حذف الخبر:',
    error_deleting: 'خطأ في حذف الخبر:',
    failed_fetch: 'فشل في جلب الأخبار'
  }
}

const NewsManagement = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [news, setNews] = useState([])
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
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/api/news.php?lang=en`)
      const data = await response.json()
      
      if (data.success) {
        // Fetch all news with all language versions
        const allNewsResponse = await fetch(`${BACKEND_URL}/api/news.php?lang=en`)
        const allData = await allNewsResponse.json()
        setNews(allData.data || [])
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
      const response = await fetch(`${BACKEND_URL}/api/news.php?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setNews(news.filter(item => item.id !== id))
      } else {
        alert(t.failed_delete + ' ' + data.message)
      }
    } catch (err) {
      alert(t.error_deleting + ' ' + err.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>{t.news_management}</h1>
        <Link
          to="/admin/news/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> {t.add_news}
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
          <p className="text-gray-600 mt-4">{t.loading_news}</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      ) : news.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">{t.no_news_items}</p>
          <Link
            to="/admin/news/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.create_first_news}
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead style={{ backgroundColor: '#0E4B33' }}>
              <tr>
                <th className="px-4 py-3 text-left text-white">{t.image}</th>
                <th className="px-4 py-3 text-left text-white">{t.title}</th>
                <th className="px-4 py-3 text-left text-white">{t.date}</th>
                <th className="px-4 py-3 text-left text-white">{t.description}</th>
                <th className="px-4 py-3 text-left text-white">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item, idx) => (
                <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td className="px-4 py-3 font-semibold">{item.title}</td>
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm truncate">{item.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/news/edit/${item.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded text-white text-sm transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#C89B3C' }}
                      >
                        <Edit2 size={16} /> {t.edit}
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white text-sm transition-opacity hover:opacity-90"
                      >
                        <Trash2 size={16} /> {t.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}


export default NewsManagement
