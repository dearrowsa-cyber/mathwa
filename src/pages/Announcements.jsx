import React, { useState } from 'react';
import { Section, Container, Card, Grid } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaBullhorn, FaCalendarAlt } from 'react-icons/fa';

const Announcements = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Announcements',
      subtitle: 'Official announcements and circulars from the association',
      home: 'Home',
      mediaCenter: 'Media Center',
    },
    ar: {
      title: 'الإعلانات',
      subtitle: 'الإعلانات والتعاميم الرسمية الصادرة من الجمعية',
      home: 'الرئيسية',
      mediaCenter: 'المركز الإعلامي',
    }
  }[language];

  const announcements = [
    {
      title: isAr ? 'إعلان عن موعد اجتماع الجمعية العمومية غير العادي' : 'Announcement of the Extraordinary General Assembly Meeting',
      date: '2026-03-15',
      desc: isAr ? 'يسر مجلس الإدارة دعوة الأعضاء الكرام لحضور اجتماع الجمعية العمومية غير العادي لمناقشة الخطة الاستراتيجية.' : 'The Board of Directors is pleased to invite the honorable members to attend the Extraordinary General Assembly meeting to discuss the strategic plan.'
    },
    {
      title: isAr ? 'تحديث بيانات المستفيدين' : 'Beneficiary Data Update',
      date: '2026-02-28',
      desc: isAr ? 'نرجو من جميع المستفيدين تحديث بياناتهم عبر البوابة الإلكترونية لضمان استمرار الدعم.' : 'We kindly request all beneficiaries to update their data via the electronic portal to ensure continued support.'
    }
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.mediaCenter, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <Grid cols={2}>
            {announcements.map((item, idx) => (
              <Card key={idx} className="border border-gray-200">
                <div className="flex items-center gap-3 mb-4 text-[#C89B3C]">
                  <FaBullhorn size={24} />
                  <div className="flex items-center gap-1 text-sm text-gray-500 font-semibold">
                    <FaCalendarAlt />
                    <span>{item.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0E4B33' }}>{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
};

export default Announcements;
