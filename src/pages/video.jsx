import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getImageUrl } from "../utils/imageUrl";

const VideosView = () => {
  const [index, setIndex] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [albumVideos, setAlbumVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loadingAlbum, setLoadingAlbum] = useState(false);
  const sliderRef = useRef(null);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  // Listen for language changes from EN/AR buttons
  useEffect(() => {
    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem('language') || 'en';
      setLanguage(newLanguage);
    };

    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom language change event
    window.addEventListener('languageChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', handleStorageChange);
    };
  }, []);

  const visibleCards = 3;
  const PRIMARY_COLOR = "#0E4B33";

  // Check if URL is YouTube
  const isYoutubeUrl = (url) => {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Fetch video albums from MySQL
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend';
        
        const response = await fetch(`${BACKEND_URL}/api/video-albums.php?lang=${isAr ? 'ar' : 'en'}`);
        
        if (!response.ok) {
          throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Video Albums API Response:', data);

        if (data.success && data.data) {
          const dataArray = Array.isArray(data.data) ? data.data : [];
          
          if (dataArray.length === 0) {
            setError('No video albums available');
            setVideos([]);
          } else {
            let displayArr = [...dataArray];
            while (displayArr.length > 0 && displayArr.length < 4) {
              displayArr = [...displayArr, ...dataArray];
            }
            setVideos(displayArr);
            setError(null);
          }
        } else {
          setError(data.message || 'Failed to fetch videos');
          setVideos([]);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(`Error loading videos: ${err.message}`);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Fetch album details and videos
  const fetchAlbumDetails = async (albumId) => {
    try {
      setLoadingAlbum(true);
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend';
      
      const response = await fetch(`${BACKEND_URL}/api/video-albums.php?id=${albumId}&lang=en`);
      
      if (!response.ok) throw new Error('Failed to fetch album');
      
      const result = await response.json();
      if (result.success && result.data) {
        const albumData = result.data;
        
        // Check if this is a YouTube album
        if (isYoutubeUrl(albumData.video_url)) {
          // Redirect to YouTube
          window.open(albumData.video_url, '_blank');
          setLoadingAlbum(false);
          return;
        }
        
        setSelectedAlbum(albumData);
        setAlbumVideos(albumData.videos || []);
        setCurrentVideoIndex(0);
        
        if (!albumData.videos || albumData.videos.length === 0) {
          console.warn('No videos in this album');
        }
      } else {
        throw new Error(result.message || 'Failed to load album');
      }
    } catch (err) {
      console.error('Error fetching album:', err);
      alert('Failed to load album: ' + err.message);
    } finally {
      setLoadingAlbum(false);
    }
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  return (
    <div className="w-full relative py-4">
        
        {/* Loading State */}
        {loading && (
          <div className="h-[220px] flex items-center justify-center text-gray-600">
            <p>{isAr ? 'جاري تحميل الفيديوهات...' : 'Loading videos...'}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="h-[220px] flex items-center justify-center text-red-600">
            <p>{error}</p>
          </div>
        )}

        {/* Videos Carousel */}
        {!loading && !error && videos.length > 0 && (
          <>
            {/* LEFT ARROW */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:scale-110 transition border border-gray-100 hidden sm:block"
            >
              <FaChevronLeft size={20} className="text-[#0E4B33]" />
            </button>

            <div className="overflow-hidden p-2 sm:p-4">
              <div
                ref={sliderRef}
                className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth hide-scrollbar px-2 sm:px-6"
              >
                {videos.map((album, i) => (
                  <div
                    key={(album.id || i) + "-" + i}
                    className="min-w-[85vw] sm:min-w-[320px] lg:min-w-[360px] h-[220px] rounded-2xl overflow-hidden shadow-xl flex-shrink-0 bg-black cursor-pointer group relative border-2 border-transparent hover:border-[#C89B3C] hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all duration-300 z-0 hover:z-10"
                    onClick={() => fetchAlbumDetails(album.id)}
                  >
                    {/* Thumbnail */}
                    {album.thumbnail ? (
                      <img
                        src={getImageUrl(album.thumbnail)}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.backgroundColor = '#1f2937';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                        {isYoutubeUrl(album.video_url) ? (
                          <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.175c-3.674-1.425-9.27-1.425-13.142 0-4.629 1.802-5.147 5.829-5.147 7.825 0 1.996.518 6.023 5.147 7.825 3.872 1.425 9.468 1.425 13.142 0 4.629-1.802 5.147-5.829 5.147-7.825 0-1.996-.518-6.023-5.147-7.825zM9.75 15.02V8.98l5.577 3.02z"/>
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* YouTube Badge */}
                    {isYoutubeUrl(album.video_url) && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.615 3.175c-3.674-1.425-9.27-1.425-13.142 0-4.629 1.802-5.147 5.829-5.147 7.825 0 1.996.518 6.023 5.147 7.825 3.872 1.425 9.468 1.425 13.142 0 4.629-1.802 5.147-5.829 5.147-7.825 0-1.996-.518-6.023-5.147-7.825zM9.75 15.02V8.98l5.577 3.02z"/>
                        </svg>
                        YouTube
                      </div>
                    )}

                    {/* Album Info */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div>
                        <p className="text-white font-semibold text-sm">{album.title}</p>
                        <p className="text-gray-300 text-xs">{album.video_count || 0} videos</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT ARROW */}
            <button
              onClick={scrollRight}
              className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:scale-110 transition border border-gray-100 hidden sm:block"
            >
              <FaChevronRight size={20} className="text-[#0E4B33]" />
            </button>
          </>
        )}

        {/* No Videos State */}
        {!loading && !error && videos.length === 0 && (
          <div className="h-[220px] flex items-center justify-center text-gray-600">
            <p>{isAr ? 'لا توجد فيديوهات' : 'No videos available'}</p>
          </div>
        )}

      {/* Hide Scrollbar */}
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* Video Player Modal */}
      {selectedAlbum && albumVideos.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedAlbum(null)}>
          <div className="bg-black rounded-lg overflow-hidden max-w-6xl w-full max-h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gray-900 sticky top-0">
              <div>
                <h3 className="text-white text-xl font-semibold">{selectedAlbum.title}</h3>
                <p className="text-gray-400 text-sm">{albumVideos.length} videos</p>
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
              ) : isYoutubeUrl(albumVideos[currentVideoIndex]?.video_url) ? (
                <div className="text-white text-center">
                  <svg className="w-16 h-16 text-red-600 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.175c-3.674-1.425-9.27-1.425-13.142 0-4.629 1.802-5.147 5.829-5.147 7.825 0 1.996.518 6.023 5.147 7.825 3.872 1.425 9.468 1.425 13.142 0 4.629-1.802 5.147-5.829 5.147-7.825 0-1.996-.518-6.023-5.147-7.825zM9.75 15.02V8.98l5.577 3.02z"/>
                  </svg>
                  <p className="text-lg mb-4">This is a YouTube video</p>
                  <button
                    onClick={() => window.open(albumVideos[currentVideoIndex].video_url, '_blank')}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                  >
                    Open on YouTube
                  </button>
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
                    console.error('Video error:', e);
                    console.log('Attempted URL:', getImageUrl(albumVideos[currentVideoIndex].video_url));
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
                <h4 className="text-white font-semibold mb-3">Videos in this Album</h4>
                <div className="space-y-2">
                  {albumVideos.map((video, idx) => (
                    <div 
                      key={video.id || idx}
                      onClick={() => {
                        if (isYoutubeUrl(video.video_url)) {
                          window.open(video.video_url, '_blank');
                        } else {
                          setCurrentVideoIndex(idx);
                        }
                      }}
                      className={`p-3 rounded cursor-pointer transition-colors ${
                        idx === currentVideoIndex && !isYoutubeUrl(video.video_url)
                          ? 'bg-green-600 text-white' 
                          : isYoutubeUrl(video.video_url)
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{video.title || `Video ${idx + 1}`}</p>
                        {isYoutubeUrl(video.video_url) && (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.175c-3.674-1.425-9.27-1.425-13.142 0-4.629 1.802-5.147 5.829-5.147 7.825 0 1.996.518 6.023 5.147 7.825 3.872 1.425 9.468 1.425 13.142 0 4.629-1.802 5.147-5.829 5.147-7.825 0-1.996-.518-6.023-5.147-7.825zM9.75 15.02V8.98l5.577 3.02z"/>
                          </svg>
                        )}
                      </div>
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
    </div>
  );
};

export default VideosView;