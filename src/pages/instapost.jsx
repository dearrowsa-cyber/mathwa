import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaComment, FaPaperPlane, FaBookmark, FaSpinner } from "react-icons/fa";
import { getImageUrl } from "../utils/imageUrl";
import Logo from "../assets/images/MATHWA LOGO [Recovered].png";

const InstaPostSlider = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const [language] = useState(() => localStorage.getItem('language') || 'en');
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
  // Fetch posts from create_post table
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://mathwaa.org.sa/Backend/api/create-post.php');
      const data = await response.json();
      
      if (data.success && Array.isArray(data.data)) {
        // Map database fields to component structure
        const mappedPosts = data.data.map((post, idx) => ({
          id: post.id,
          username: isAr ? (post.title_ar || post.title_en || 'منشور ماثوا') : (post.title_en || post.title_ar || "Mathwaa Post"),
          image: getImageUrl(post.image),
          imageicon: Logo,
          likes: Math.floor(Math.random() * 3000) + 500 + (isAr ? ' إعجاب' : " likes"),
          caption: isAr ? (post.description_ar?.substring(0, 100) || post.description_en?.substring(0, 100) || "تحقق من هذا!") : (post.description_en?.substring(0, 100) || post.description_ar?.substring(0, 100) || "Check this out!"),
        }));
          let displayArr = [...mappedPosts];
          while (displayArr.length > 0 && displayArr.length < 4) {
            displayArr = [...displayArr, ...mappedPosts];
          }
          setPosts(displayArr);
        setError(null);
      } else {
        setError(data.message || "Failed to fetch posts");
        setPosts([]);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to load Instagram posts");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -350, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 350, behavior: "smooth" });
  };

  const PRIMARY_COLOR = '#0E4B33';

  return (
    <div className="w-full relative py-4 text-left">

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <FaSpinner size={40} className="animate-spin" style={{ color: PRIMARY_COLOR }} />
          <span className="ml-4 text-gray-600">{isAr ? 'جاري تحميل المنشورات...' : 'Loading posts...'}</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-600 mb-4">
          {error}
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-gray-600 mb-4">
          {isAr ? 'لا توجد منشورات حتى الآن. قم بإنشاء بعض المنشورات من لوحة الإدارة!' : 'No posts available yet. Create some posts in the admin panel!'}
        </div>
      ) : (
        <>
          {/* ARROWS */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:scale-110 transition border border-gray-100 hidden sm:block"
          >
            <FaChevronLeft size={20} className="text-[#0E4B33]" />
          </button>

          {/* SLIDER */}
          <div className="overflow-hidden p-2 sm:p-4">
            <div
              ref={sliderRef}
              className="flex gap-4 md:gap-6 overflow-x-auto scroll-smooth hide-scrollbar px-2 sm:px-6"
            >
              {posts.map((post, i) => (
                <div
                  key={post.id + "-" + i}
                  className="min-w-[85vw] sm:min-w-[320px] lg:min-w-[350px] bg-white rounded-2xl shadow-xl overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-[#C89B3C] hover:shadow-2xl hover:shadow-[#C89B3C]/30 transition-all duration-300 z-0 hover:z-10 group"
                >
                  {/* TOP BAR */}
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded-full">
                        <img
                          src={post.imageicon}
                          alt="icon"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <span className="font-semibold text-sm truncate">
                        {isAr ? 'جمعية ماثوا' : 'Mathwaa Association'}
                      </span>
                    </div>
                    <span className="text-gray-500">•••</span>
                  </div>

                  {/* IMAGE */}
                  <div className="h-[260px] bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.username}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* ICONS */}
                  <div className="p-3">
                    <div className="flex justify-between mb-2">
                      <div className="flex gap-4">
                        <FaHeart className="cursor-pointer hover:text-red-500 transition" href=""/>
                        <FaComment className="cursor-pointer hover:text-blue-500 transition" />
                        <FaPaperPlane className="cursor-pointer hover:text-blue-500 transition" />
                      </div>
                      <FaBookmark className="cursor-pointer hover:text-yellow-500 transition" />
                    </div>

                    <p className="font-semibold text-sm">{post.likes}</p>
                    <p className="text-sm mt-1 line-clamp-2">
                      <span className="font-semibold">{post.username}</span> {post.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollRight}
            className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-3 z-10 hover:scale-110 transition border border-gray-100 hidden sm:block"
          >
            <FaChevronRight size={20} className="text-[#0E4B33]" />
          </button>
        </>
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
    </div>
  );
};

export default InstaPostSlider;