import React, { useState, useEffect } from 'react'
import { HeroSection, SectionTitle, Container, Grid, Section } from '../components/Common'
import { Link } from 'react-router-dom'
import { FaImage, FaCalendarAlt, FaEye, FaArrowRight } from 'react-icons/fa'
import { getImageUrl } from '../utils/imageUrl'

const PRIMARY_COLOR = '#0E4B33'
const ACCENT_COLOR = '#C89B3C'

const PhotoAlbums = () => {
  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const isAr = language === 'ar'
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const t = {
    en: {
      title: 'Photo Albums',
      subtitle: 'Gallery of photos of the association\'s activities and events',
      gallery_title: 'Photo Gallery',
      view_album: 'View Album',
      home: 'Home',
    },
    ar: {
      title: 'ألبومات الصور',
      subtitle: 'معرض صور أنشطة وفعاليات الجمعية',
      gallery_title: 'معرض الصور',
      view_album: 'عرض الألبوم',
      home: 'الرئيسية',
    },
  }[language]

  useEffect(() => {
    fetchAlbums()
  }, [language])

  const fetchAlbums = async () => {
    try {
      setLoading(true)
      setError('')
      
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      const response = await fetch(`${apiUrl}/api/photo-albums.php?lang=${language}`)
      
      if (!response.ok) throw new Error('Failed to fetch albums')
      
      const result = await response.json()
      if (result.success) {
        // Process albums and use getImageUrl utility for proper URL handling
        const processedAlbums = (result.data || []).map(album => {
          return {
            ...album,
            // Use language-specific title and description
            title: isAr ? album.title_ar : album.title_en,
            description: isAr ? album.description_ar : album.description_en,
            cover_image: getImageUrl(album.cover_image),
            event_date: album.event_date,
            display_order: album.display_order,
            status: album.status
          }
        })
        // Sort by display_order if available
        processedAlbums.sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
        setAlbums(processedAlbums)
      } else {
        setError(result.message || 'Failed to load albums')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching albums:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeroSection title={t.title} subtitle={t.subtitle} />
      <div className="bg-gray-100 py-2">
        <Container>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0E4B33]">{t.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{t.title}</span>
          </nav>
        </Container>
      </div>
      <Section className="py-16">
        <Container>
          <SectionTitle title={t.gallery_title} centered={false} />
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-[#0E4B33] rounded-full"></div>
              <p className="text-gray-500 mt-4">Loading albums...</p>
            </div>
          )}

          {!loading && albums.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <Link key={album.id} to={`/photo-albums/${album.id}`}>
                  <div className="group relative h-[340px] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105">
                    {/* Image Background */}
                    <div className="absolute inset-0 bg-gray-300">
                      {album.cover_image ? (
                        <img
                          src={album.cover_image}
                          alt={album.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          onLoad={() => console.log('✓ Album image loaded:', album.cover_image)}
                          onError={(e) => {
                            console.error('✗ Album image failed:', album.cover_image)
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <ImageIcon size={64} style={{ color: PRIMARY_COLOR, opacity: 0.3 }} />
                        </div>
                      )}
                    </div>

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-all duration-500 group-hover:from-black/85"></div>

                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-4 text-white">
                      {/* Count Badge */}
                      {album.photo_count > 0 && (
                        <div className="mb-3 inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full w-fit">
                          <span className="text-xs font-semibold text-white/90">
                            📸 {album.photo_count} {language === 'ar' ? 'صورة' : 'photos'}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-amber-300 transition-colors duration-300">
                        {album.title}
                      </h3>

                      {/* Description */}
                      <p className="text-white/80 text-xs mb-3 line-clamp-1 group-hover:text-white/90 transition-colors duration-300">
                        {album.description}
                      </p>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-white/80 text-xs mb-3">
                        <FaCalendarAlt size={14} />
                        {new Date(album.created_at).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>

                      {/* View Button */}
                      <button
                        className="inline-flex items-center gap-2 mt-auto w-fit px-4 py-1.5 rounded-full text-white text-sm font-semibold transition-all duration-300 border-2 border-white/40 hover:border-white hover:bg-white/20 hover:backdrop-blur-md"
                        onClick={(e) => e.preventDefault()}
                      >
                        <FaEye size={16} />
                        {t.view_album}
                        <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>

                    {/* Corner Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-transparent rounded-full -mr-12 -mt-12 pointer-events-none"></div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && albums.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500">{language === 'ar' ? 'لا توجد ألبومات' : 'No albums found'}</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default PhotoAlbums
