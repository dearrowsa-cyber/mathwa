import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getImageUrl } from '../utils/imageUrl';

const Photosview = () => {
  const sliderRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Get language preference
      const language = localStorage.getItem('language') || 'en';
      
      // Use the same API URL pattern as PhotoAlbums.jsx for consistency
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend';
      const apiUrl = `${backendUrl}/api/photo-albums.php?lang=${language}`;
      
      console.log('Fetching photo albums from:', apiUrl);
      
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      if (data.success && data.data && Array.isArray(data.data)) {
        const isAr = language === 'ar';
        
        // Map albums to photo format with cover images
        const albumPhotos = data.data
          .filter(album => album.cover_image) // Only show albums with cover images
          .map(album => ({
            id: album.id,
            image: getImageUrl(album.cover_image), // Use utility to properly resolve image URL
            caption: isAr ? album.title_ar : album.title_en,
            description: isAr ? album.description_ar : album.description_en,
            albumTitle: isAr ? album.title_ar : album.title_en,
            event_date: album.event_date,
            status: album.status
          }));
        
        console.log('Successfully loaded', albumPhotos.length, 'album covers');
        if (albumPhotos.length === 0) {
          setError('No photo albums with cover images found');
        } else {
          let displayArr = [...albumPhotos];
          while (displayArr.length > 0 && displayArr.length < 4) {
            displayArr = [...displayArr, ...albumPhotos];
          }
          setPhotos(displayArr);
        }
      } else {
        throw new Error(data.message || "Failed to fetch photo albums");
      }
    } catch (err) {
      console.error("Error fetching photo albums:", err);
      setError(err.message || "Failed to load photo albums");
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -450,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 450,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="w-full relative py-4">
          
          {/* ERROR STATE */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p>{isAr ? 'خطأ: ' : 'Error: '}{error}</p>
              <button 
                onClick={fetchPhotos}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                {isAr ? 'حاول مرة أخرى' : 'Try Again'}
              </button>
            </div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <div className="flex items-center justify-center h-[260px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
                <p className="text-gray-600">{isAr ? 'جاري تحميل الصور...' : 'Loading photos...'}</p>
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && photos.length === 0 && (
            <div className="flex items-center justify-center h-[260px] bg-white rounded-2xl">
              <p className="text-gray-600 text-lg">{isAr ? 'لا توجد صور' : 'No photos available'}</p>
            </div>
          )}

          {/* PHOTO SLIDER */}
          {!loading && !error && photos.length > 0 && (
            <>
              {/* LEFT ARROW */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:scale-110 transition border border-gray-100 hidden sm:block"
              >
                <FaChevronLeft size={20} className="text-[#0E4B33]" />
              </button>

              {/* PHOTO CARDS */}
              <div
                ref={sliderRef}
                className="flex gap-4 md:gap-8 overflow-x-auto scroll-smooth hide-scrollbar px-2 sm:px-10"
              >
                {photos.map((photo, i) => (
                  <div
                    key={photo.id + "-" + i}
                    className="min-w-[85vw] sm:min-w-[350px] lg:min-w-[420px] h-[220px] lg:h-[260px] rounded-2xl overflow-hidden shadow-lg group relative border-2 border-transparent hover:border-[#C89B3C] hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all duration-300 z-0 hover:z-10"
                    title={photo.caption || photo.albumTitle}
                  >
                    <img
                      src={photo.image}
                      alt={photo.caption || "Photo"}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='260'%3E%3Crect fill='%23ddd' width='420' height='260'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999' font-size='16'%3EImage not found%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                ))}
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
    </div>

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
    </>
  );
};

export default Photosview;