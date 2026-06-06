import { useMemo, useEffect, useState } from "react";
import { getImageUrl } from "../utils/imageUrl";

const NewsCardsSliders = ({ loading, isArabic, t }) => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(loading ?? true);

  // Fetch news from MySQL database
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend';
        const response = await fetch(`${BACKEND_URL}/api/news.php?lang=${isArabic ? 'ar' : 'en'}`);
        const data = await response.json();
        
        if (data.success && Array.isArray(data.data)) {
          setNews(data.data);
        } else {
          console.error('Failed to fetch news:', data.message);
          setNews([]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setNews([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [isArabic]);

  // ✅ Sort latest news first
  const sortedNews = useMemo(() => {
    return [...news]
      .filter(item => item.image || item.featured_image || item.photo) // Only show with images
      .sort(
        (a, b) => new Date(b.created_at || b.date || 0) - new Date(a.created_at || a.date || 0)
      );
  }, [news]);

  if (isLoading) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t?.("loading") || "Loading"}...
      </div>
    );
  }

  if (!sortedNews.length) return null;

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Responsive Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {sortedNews.map((item, i) => (
            <div
              key={item.id || i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 border-2 border-transparent hover:border-[#C89B3C] hover:shadow-2xl hover:shadow-[#C89B3C]/30 hover:-translate-y-2 group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative group">
                <img
                  src={getImageUrl(item.image || item.featured_image || item.photo)}
                  alt={isArabic ? (item.title_ar || item.title_en || item.title || 'News') : (item.title_en || item.title_ar || item.title || 'News')}
                  className="w-full h-60 object-cover bg-gray-300"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />

                {/* Hover Read More */}
                <div className="absolute inset-0 bg-[#0E4B33]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-[#C89B3C] text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                    {isArabic ? "اقرأ المزيد" : "Read More"}
                  </button>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4 text-center">
                <h3 className="text-base font-semibold text-gray-800 line-clamp-2">
                  {isArabic ? (item.title_ar || item.title_en || item.title || 'News') : (item.title_en || item.title_ar || item.title || 'News')}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {new Date(item.created_at || item.date || Date.now()).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default NewsCardsSliders;
