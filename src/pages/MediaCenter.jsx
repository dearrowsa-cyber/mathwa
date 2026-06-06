import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaImages, FaVideo, FaInstagram } from 'react-icons/fa';
import Photosview from './photos';
import VideosView from './video';
import InstaPostSlider from './instapost';
import { Container, SectionTitle, AnimatedSection } from '../components/Common';

const MediaCenter = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('photos'); // 'photos', 'videos', 'instagram'

  const tabs = [
    { id: 'photos', label: isAr ? 'الصور' : 'Photos', icon: <FaImages /> },
    { id: 'videos', label: isAr ? 'الفيديوهات' : 'Videos', icon: <FaVideo /> },
    { id: 'instagram', label: isAr ? 'الانستجرام' : 'Instagram', icon: <FaInstagram /> },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#fdfcf9] relative overflow-hidden text-center">
      <AnimatedSection direction="up" delay={0.1}>
        <Container>
          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#0E4B33]/5 text-[#0E4B33] font-bold text-sm border border-[#0E4B33]/10 mb-6">
              <FaImages className="inline text-[#C89B3C] text-lg" /> {isAr ? 'المركز الإعلامي' : 'Media Center'}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0E4B33] tracking-tight mb-4" style={{ fontFamily: 'Alexandria, sans-serif' }}>
              {isAr ? 'تغطياتنا الإعلامية' : 'Our Media Coverage'}
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              {isAr ? 'تابع أحدث إنجازاتنا وفعالياتنا من خلال الصور والفيديوهات والتغطيات الحصرية.' : 'Follow our latest achievements and events through photos, videos, and exclusive coverage.'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#0E4B33] text-white shadow-[0_10px_30px_rgba(14,75,51,0.2)] scale-105 border-transparent'
                    : 'bg-white text-gray-500 hover:bg-gray-50 hover:text-[#0E4B33] border border-gray-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="bg-white rounded-[2rem] shadow-xl p-2 sm:p-6 lg:p-10 border border-gray-100 min-h-[400px] flex justify-center items-center">
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
            </AnimatePresence>
          </div>
        </Container>
      </AnimatedSection>
    </section>
  );
};

export default MediaCenter;
