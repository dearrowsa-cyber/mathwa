import React, { useState, useEffect } from 'react'
import { Container, Card, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../utils/imageUrl'

const News = () => {
  const lang = localStorage.getItem('language') || 'en'
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Format date to readable format (e.g., "Thursday, 5 February 2026")
  const formatDate = (dateString) => {
    if (!dateString) return ''
    try {
      const date = new Date(dateString + 'T00:00:00Z')
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', options)
    } catch (e) {
      return dateString
    }
  }

  const t = {
    en: {
      title: 'News & Announcements',
      subtitle: 'Stay updated with our latest news and announcements',
      home: 'Home',
      news_menu: 'News',
      read_more: 'Read More',
      loading: 'Loading news...',
      error: 'Failed to load news. Please try again later.',
      no_news: 'No news available at the moment.'
    },
    ar: {
      title: 'الأخبار والإعلانات',
      subtitle: 'ابق على اطلاع بآخر أخبارنا والإعلانات',
      home: 'الرئيسية',
      news_menu: 'الأخبار',
      read_more: 'اقرأ المزيد',
      loading: 'جاري تحميل الأخبار...',
      error: 'فشل في تحميل الأخبار. يرجى المحاولة لاحقاً.',
      no_news: 'لا توجد أخبار متاحة في الوقت الحالي.'
    },
  }[lang]

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Try multiple endpoints in order of preference
        const endpoints = [
          `${BACKEND_URL}/api/get_news.php`,
          `${BACKEND_URL}/api/news_simple.php`,
          `${BACKEND_URL}/api/get_news_simple.php`,
          `${BACKEND_URL}/api/news.php`,
          `/api/get_news.php`
        ]
        
        let newsData = []
        let lastError = null
        
        for (const endpoint of endpoints) {
          try {
            console.log('Trying endpoint:', endpoint)
            const response = await fetch(endpoint)
            
            if (!response.ok) {
              console.warn(`Endpoint ${endpoint} returned status ${response.status}`)
              continue
            }
            
            const text = await response.text()
            let data
            
            try {
              data = JSON.parse(text)
            } catch (e) {
              console.warn(`Endpoint ${endpoint} returned non-JSON`)
              lastError = e
              continue
            }
            
            // Extract news from different response structures
            if (data.success && data.data) {
              // Structure: { success: true, data: { news: [...] } }
              newsData = data.data.news || data.data
            } else if (data.success && Array.isArray(data.news)) {
              // Structure: { success: true, news: [...] }
              newsData = data.news
            } else if (Array.isArray(data.data)) {
              // Structure: { data: [...] }
              newsData = data.data
            } else if (Array.isArray(data)) {
              // Direct array response
              newsData = data
            }
            
            // Ensure newsData is an array
            if (!Array.isArray(newsData)) {
              newsData = []
            }
            
            if (newsData.length > 0) {
              console.log(`✓ Got ${newsData.length} news from:`, endpoint)
              break // Success!
            }
          } catch (err) {
            lastError = err
            console.warn(`Endpoint ${endpoint} error:`, err.message)
          }
        }
        
        if (newsData.length > 0) {
          // Sort by date (newest first)
          newsData.sort((a, b) => {
            const dateA = new Date(b.created_at || b.date || b.published_date || 0)
            const dateB = new Date(a.created_at || a.date || a.published_date || 0)
            return dateA - dateB
          })
          setNews(newsData)
          setError(null)
          console.log('News loaded successfully')
        } else {
          setError('No news available')
          setNews([])
          console.warn('No news data found from any endpoint')
        }
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Unable to connect to the server')
        setNews([])
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [BACKEND_URL])

  const breadcrumbs = [
    { label: t.home, to: '/' },
    { label: t.news_menu }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 text-sm sm:text-base">{t.loading}</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-center">
              <p className="text-red-600 text-sm sm:text-base">{t.error}</p>
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-gray-600 text-sm sm:text-base">{t.no_news}</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
              {news.map((item) => (
                <Card
                  key={item.id}
                  className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row"
                >
                  {(item.image || item.featured_image || item.photo) && (
                    <div className="md:w-1/3 h-48 sm:h-56 md:h-auto overflow-hidden flex-shrink-0 bg-gray-300">
                      <img
                        src={getImageUrl(item.image || item.featured_image || item.photo)}
                        alt={item.title || item.title_en || 'News'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%220.3em%22 fill=%22%23999%22 font-family=%22sans-serif%22 font-size=%2216%22%3ENo Image%3C/text%3E%3C/svg%3E';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt size={14} className="sm:w-4 sm:h-4 text-[#C89B3C]" />
                        {formatDate(item.published_date || item.date || item.created_at)}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 line-clamp-2" style={{ color: '#0E4B33' }}>
                      {lang === 'ar' ? (item.title_ar || item.title_en || item.title || 'News') : (item.title_en || item.title_ar || item.title || 'News')}
                    </h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 flex-1 line-clamp-2 sm:line-clamp-3 text-sm sm:text-base">
                      {lang === 'ar' ? (item.description_ar || item.description_en || item.description || '') : (item.description_en || item.description_ar || item.description || '')}
                    </p>
                    <Link
                      to={`/news/${item.id}`}
                      className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 w-fit text-sm sm:text-base"
                      style={{ backgroundColor: '#C89B3C' }}
                    >
                      {t.read_more}
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default News
