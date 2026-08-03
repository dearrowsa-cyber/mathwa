import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaYoutube, FaExternalLinkAlt, FaPlay } from 'react-icons/fa';

// Placeholder - replace CHANNEL_ID with the actual YouTube channel ID
const YOUTUBE_CHANNEL_ID = 'UCxxxxxxxxxxxxxxxxxxxxxx'; // TODO: Replace with real channel ID
const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/@mathwaah`; // Update with actual handle

const YouTubeFeed = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  const isPlaceholder = YOUTUBE_CHANNEL_ID.includes('xxxx');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center gap-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2 w-full max-w-2xl">
        <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg">
          <FaYoutube className="text-white" size={20} />
        </div>
        <div className={`text-${isAr ? 'right' : 'left'}`}>
          <p className="font-bold text-gray-900 text-lg">
            {isAr ? 'قناة مثوى على يوتيوب' : 'Mathwaa YouTube Channel'}
          </p>
          <p className="text-gray-500 text-sm">
            {isAr ? 'شاهد أحدث الفيديوهات' : 'Watch our latest videos'}
          </p>
        </div>
        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all shadow"
        >
          <FaYoutube size={14} />
          {isAr ? 'اشترك' : 'Subscribe'}
          <FaExternalLinkAlt size={11} className="opacity-70" />
        </a>
      </div>

      {isPlaceholder ? (
        /* Placeholder State */
        <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border-2 border-dashed border-red-200 bg-red-50 flex flex-col items-center justify-center p-16 gap-4">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
            <FaYoutube className="text-red-500" size={40} />
          </div>
          <h3 className="font-bold text-gray-700 text-xl">
            {isAr ? 'قناة يوتيوب قادمة قريباً' : 'YouTube Channel Coming Soon'}
          </h3>
          <p className="text-gray-500 text-center text-sm max-w-xs">
            {isAr
              ? 'سيتم ربط قناتنا على يوتيوب قريباً لعرض أحدث الفيديوهات والفعاليات'
              : 'Our YouTube channel will be connected soon to show our latest videos and events'}
          </p>
          <a
            href={YOUTUBE_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition-all text-sm shadow-lg"
          >
            <FaPlay size={12} />
            {isAr ? 'زيارة القناة' : 'Visit Channel'}
          </a>
        </div>
      ) : (
        /* Actual YouTube embed when channel ID is available */
        <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          <iframe
            src={`https://www.youtube.com/embed?listType=user_uploads&list=${YOUTUBE_CHANNEL_ID}&autoplay=0`}
            title="Mathwaa YouTube Channel"
            width="100%"
            height="500"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: 'block' }}
          />
        </div>
      )}

      {/* Visit Link */}
      <a
        href={YOUTUBE_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-red-600 text-red-600 font-bold hover:bg-red-600 hover:text-white transition-all text-sm"
      >
        <FaYoutube size={16} />
        {isAr ? 'عرض القناة كاملة على يوتيوب' : 'View full channel on YouTube'}
        <FaExternalLinkAlt size={12} />
      </a>
    </motion.div>
  );
};

export default YouTubeFeed;
