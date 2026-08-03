import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaImages, FaVideo, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Photosview from './photos';
import VideosView from './video';
import InstaPostSlider from './instapost';
import XTwitterFeed from './XTwitterFeed';
import YouTubeFeed from './YouTubeFeed';
import { Container, AnimatedSection } from '../components/Common';

const MediaCenter = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('photos');

  // Load Twitter widget script dynamically
  useEffect(() => {
    if (activeTab === 'twitter') {
      const existing = document.getElementById('twitter-widget-js');
      if (!existing) {
        const script = document.createElement('script');
        script.id = 'twitter-widget-js';
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        script.charset = 'utf-8';
        document.body.appendChild(script);
      } else if (window.twttr) {
        // Re-render existing widgets
        window.twttr.widgets.load();
      }
    }
  }, [activeTab]);

  const tabs = [
    {
      id: 'photos',
      label: isAr ? 'الصور' : 'Photos',
      icon: <FaImages />,
      color: '#0E4B33',
    },
    {
      id: 'videos',
      label: isAr ? 'الفيديوهات' : 'Videos',
      icon: <FaVideo />,
      color: '#0E4B33',
    },
    {
      id: 'instagram',
      label: isAr ? 'إنستجرام' : 'Instagram',
      icon: <FaInstagram />,
      color: '#E1306C',
    },
    {
      id: 'twitter',
      label: isAr ? 'تويتر / X' : 'X (Twitter)',
      icon: <FaTwitter />,
      color: '#000000',
    },
    {
      id: 'youtube',
      label: isAr ? 'يوتيوب' : 'YouTube',
      icon: <FaYoutube />,
      color: '#FF0000',
    },
  ];

  const getTabStyle = (tab) => {
    const isActive = activeTab === tab.id;
    if (!isActive) return 'bg-white text-gray-500 hover:bg-gray-50 hover:text-[#0E4B33] border border-gray-200';

    const colorMap = {
      instagram: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-lg border-transparent',
      twitter: 'bg-black text-white shadow-lg border-transparent',
      youtube: 'bg-red-600 text-white shadow-lg border-transparent',
      photos: 'bg-[#0E4B33] text-white shadow-[0_10px_30px_rgba(14,75,51,0.2)] border-transparent',
      videos: 'bg-[#0E4B33] text-white shadow-[0_10px_30px_rgba(14,75,51,0.2)] border-transparent',
    };
    return (colorMap[tab.id] || 'bg-[#0E4B33] text-white border-transparent') + ' scale-105';
  };

  return (
    <section className="py-20 sm:py-28 bg-[#fdfcf9] relative overflow-hidden text-center">
      <AnimatedSection direction="up" delay={0.1}>
        <Container>
          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0E4B33]/5 text-[#0E4B33] font-bold text-sm border border-[#0E4B33]/10 mb-6">
              <FaImages className="inline text-[#C89B3C] text-lg" />
              {isAr ? 'المركز الإعلامي' : 'Media Center'}
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E4B33] tracking-tight mb-4"
              style={{ fontFamily: 'Alexandria, sans-serif' }}
            >
              {isAr ? 'تغطياتنا الإعلامية' : 'Our Media Coverage'}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {isAr
                ? 'تابع أحدث إنجازاتنا وفعالياتنا من خلال الصور والفيديوهات وحساباتنا على التواصل الاجتماعي.'
                : 'Follow our latest achievements and events through photos, videos, and our social media accounts.'}
            </p>
          </div>

          {/* Tabs — scrollable on mobile */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-4 rounded-2xl font-bold text-sm sm:text-base transition-all duration-300 ${getTabStyle(tab)}`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-[2rem] shadow-xl p-4 sm:p-6 lg:p-10 border border-gray-100 min-h-[400px] flex justify-center items-center">
            <AnimatePresence mode="wait">
              {activeTab === 'photos' && (
                <motion.div
                  key="photos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <Photosview />
                </motion.div>
              )}
              {activeTab === 'videos' && (
                <motion.div
                  key="videos"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <VideosView />
                </motion.div>
              )}
              {activeTab === 'instagram' && (
                <motion.div
                  key="instagram"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <InstaPostSlider />
                </motion.div>
              )}
              {activeTab === 'twitter' && (
                <motion.div
                  key="twitter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <XTwitterFeed />
                </motion.div>
              )}
              {activeTab === 'youtube' && (
                <motion.div
                  key="youtube"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <YouTubeFeed />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Social Media Quick Links */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://x.com/mathwaah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white text-sm font-bold hover:bg-gray-800 transition-all shadow-md"
            >
              <FaTwitter /> X (Twitter)
            </a>
            <a
              href="https://www.youtube.com/@mathwaah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all shadow-md"
            >
              <FaYoutube /> YouTube
            </a>
            <a
              href="https://www.instagram.com/mathwaah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-bold hover:opacity-90 transition-all shadow-md"
              style={{ background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)' }}
            >
              <FaInstagram /> Instagram
            </a>
          </div>
        </Container>
      </AnimatedSection>
    </section>
  );
};

export default MediaCenter;
