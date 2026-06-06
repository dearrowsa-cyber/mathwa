import React, { useState, useEffect } from 'react'
import { HeroSection, SectionTitle, Container, Grid, Section } from '../components/Common'
import { getImageUrl } from '../utils/imageUrl'

const VideoAlbums = () => {
  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAlbum, setSelectedAlbum] = useState(null)
  const [albumVideos, setAlbumVideos] = useState([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [loadingAlbum, setLoadingAlbum] = useState(false)

  const t = language === 'en' 
    ? { title: 'Video Albums', subtitle: 'Watch our video gallery', ourVideos: 'Our Videos' } 
    : { title: 'ألبومات الفيديو', subtitle: 'شاهد معرض الفيديو', ourVideos: 'مقاطعنا' }

  useEffect(() => {
    fetchVideos()
  }, [language])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError('')
      
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      const response = await fetch(`${apiUrl}/api/video-albums.php?lang=${language}`)
      
      if (!response.ok) throw new Error('Failed to fetch videos')
      
      const result = await response.json()
      if (result.success) {
        setVideos(result.data || [])
      } else {
        setError(result.message || 'Failed to load videos')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching videos:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAlbumDetails = async (albumId) => {
    try {
      setLoadingAlbum(true)
      const apiUrl = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
      const response = await fetch(`${apiUrl}/api/video-albums.php?id=${albumId}&lang=${language}`)
      
      if (!response.ok) throw new Error('Failed to fetch album')
      
      const result = await response.json()
      if (result.success && result.data) {
        const albumData = result.data
        setSelectedAlbum(albumData)
        setAlbumVideos(albumData.videos || [])
        setCurrentVideoIndex(0)
        
        if (!albumData.videos || albumData.videos.length === 0) {
          console.warn('No videos in this album')
        }
      } else {
        throw new Error(result.message || 'Failed to load album details')
      }
    } catch (err) {
      console.error('Error fetching album:', err)
      alert('Failed to load album: ' + err.message)
    } finally {
      setLoadingAlbum(false)
    }
  }

  return (
    <>
      <HeroSection title={t.title} subtitle={t.subtitle} />
      <Section>
        <Container>
          <SectionTitle title={t.ourVideos} />
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-[#0E4B33] rounded-full"></div>
              <p className="text-gray-500 mt-4">Loading videos...</p>
            </div>
          )}

          {!loading && videos.length > 0 && (
            <>
              <Grid cols={3}>
                {videos.map((album) => (
                  <div 
                    key={album.id} 
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => fetchAlbumDetails(album.id)}
                  >
                    <div className="h-48 bg-gradient-to-br from-secondary to-accent group-hover:scale-105 transition-transform duration-300 flex items-center justify-center" style={{ backgroundImage: album.thumbnail ? `url(${getImageUrl(album.thumbnail)})` : 'linear-gradient(to bottom right, #0E4B33, #C89B3C)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100">
                        <svg className="w-8 h-8 text-secondary ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all flex items-end p-4">
                      <div>
                        <h3 className="text-lg font-bold text-white line-clamp-2">{album.title}</h3>
                        <p className="text-gray-300 text-sm">{album.video_count || 0} {language === 'ar' ? 'فيديو' : 'videos'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </Grid>

              {/* Video Player Modal */}
              {selectedAlbum && albumVideos.length > 0 && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedAlbum(null)}>
                  <div className="bg-black rounded-lg overflow-hidden max-w-6xl w-full max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 bg-gray-900 sticky top-0">
                      <div>
                        <h3 className="text-white text-xl font-semibold">{selectedAlbum.title}</h3>
                        <p className="text-gray-400 text-sm">{albumVideos.length} {language === 'ar' ? 'فيديو' : 'videos'}</p>
                      </div>
                      <button 
                        onClick={() => setSelectedAlbum(null)}
                        className="text-gray-400 hover:text-white text-2xl"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Video Player */}
                    <div className="bg-black aspect-video flex items-center justify-center relative">
                      {loadingAlbum ? (
                        <div className="text-white text-center">
                          <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-white rounded-full mb-2"></div>
                          <p>Loading video...</p>
                        </div>
                      ) : albumVideos[currentVideoIndex]?.video_url ? (
                        <video 
                          key={albumVideos[currentVideoIndex]?.id}
                          src={getImageUrl(albumVideos[currentVideoIndex].video_url)}
                          controls 
                          controlsList="nodownload"
                          autoPlay
                          className="w-full h-full"
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                          onError={(e) => {
                            console.error('Video error:', e)
                            console.log('Attempted URL:', getImageUrl(albumVideos[currentVideoIndex].video_url))
                          }}
                        />
                      ) : (
                        <div className="text-white text-center">
                          <p className="text-lg mb-2">❌ Video URL not available</p>
                          <p className="text-sm text-gray-400">Video file might not be uploaded yet</p>
                        </div>
                      )}
                    </div>

                    {/* Current Video Info */}
                    {albumVideos[currentVideoIndex] && (
                      <div className="p-4 bg-gray-900 border-t border-gray-700">
                        <h4 className="text-white font-semibold mb-2">{albumVideos[currentVideoIndex].title}</h4>
                        {albumVideos[currentVideoIndex].description && (
                          <p className="text-gray-300 text-sm">{albumVideos[currentVideoIndex].description}</p>
                        )}
                      </div>
                    )}

                    {/* Video List */}
                    {albumVideos.length > 1 && (
                      <div className="bg-gray-900 border-t border-gray-700 p-4 max-h-48 overflow-y-auto">
                        <h4 className="text-white font-semibold mb-3">{language === 'ar' ? 'الفيديوهات' : 'Videos in this Album'}</h4>
                        <div className="space-y-2">
                          {albumVideos.map((video, idx) => (
                            <div 
                              key={video.id || idx}
                              onClick={() => setCurrentVideoIndex(idx)}
                              className={`p-3 rounded cursor-pointer transition-colors ${
                                idx === currentVideoIndex 
                                  ? 'bg-green-600 text-white' 
                                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              <p className="text-sm font-medium">{video.title || `Video ${idx + 1}`}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* No Videos in Album Alert */}
              {selectedAlbum && albumVideos.length === 0 && !loadingAlbum && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedAlbum(null)}>
                  <div className="bg-black rounded-lg p-8 max-w-md w-full text-center" onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-white text-xl font-semibold mb-2">{selectedAlbum.title}</h3>
                    <p className="text-gray-300 mb-4">❌ No videos in this album yet</p>
                    <button 
                      onClick={() => setSelectedAlbum(null)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {!loading && videos.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-gray-500">{language === 'ar' ? 'لا توجد مقاطع فيديو' : 'No videos found'}</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}

export default VideoAlbums
