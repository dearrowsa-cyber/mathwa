import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaTwitter, FaExternalLinkAlt } from 'react-icons/fa';

const XTwitterFeed = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col items-center gap-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-lg">
          <FaTwitter className="text-white" size={20} />
        </div>
        <div className={`text-${isAr ? 'right' : 'left'}`}>
          <p className="font-bold text-gray-900 text-lg">@mathwaah</p>
          <p className="text-gray-500 text-sm">
            {isAr ? 'تابعنا على تويتر' : 'Follow us on X (Twitter)'}
          </p>
        </div>
        <a
          href="https://x.com/mathwaah"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow"
        >
          <FaTwitter size={14} />
          {isAr ? 'تابع' : 'Follow'}
          <FaExternalLinkAlt size={11} className="opacity-70" />
        </a>
      </div>

      {/* Twitter Timeline Embed */}
      <div className="w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl border border-gray-100">
        <a
          className="twitter-timeline"
          data-lang={isAr ? 'ar' : 'en'}
          data-height="600"
          data-theme="light"
          data-chrome="noheader nofooter noborders"
          href="https://twitter.com/mathwaah?ref_src=twsrc%5Etfw"
        >
          Tweets by @mathwaah
        </a>
        {/* Load Twitter widget script */}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charSet="utf-8"
        />
      </div>

      {/* Visit Link */}
      <a
        href="https://x.com/mathwaah"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-black text-black font-bold hover:bg-black hover:text-white transition-all text-sm"
      >
        <FaTwitter size={16} />
        {isAr ? 'عرض كل التغريدات على X' : 'View all posts on X'}
        <FaExternalLinkAlt size={12} />
      </a>
    </motion.div>
  );
};

export default XTwitterFeed;
