import React, { useState } from 'react';
import { Section, Container, Card, Grid } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaFilePdf, FaDownload } from 'react-icons/fa';

const MediaReports = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Media Reports',
      subtitle: 'Periodic reports and media publications',
      home: 'Home',
      mediaCenter: 'Media Center',
      download: 'Download PDF',
    },
    ar: {
      title: 'التقارير الإعلامية',
      subtitle: 'التقارير الدورية والمنشورات الإعلامية',
      home: 'الرئيسية',
      mediaCenter: 'المركز الإعلامي',
      download: 'تحميل كملف PDF',
    }
  }[language];

  const reports = [
    { title: isAr ? 'التقرير الإعلامي السنوي 2025' : 'Annual Media Report 2025', date: '2026-01-10' },
    { title: isAr ? 'تقرير حصاد الربع الأول 2026' : 'Q1 2026 Harvest Report', date: '2026-04-05' },
    { title: isAr ? 'نشرة التوعية المجتمعية (الإصدار 3)' : 'Community Awareness Bulletin (Issue 3)', date: '2026-02-20' },
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.mediaCenter, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <Grid cols={3}>
            {reports.map((report, idx) => (
              <Card key={idx} className="border border-gray-200 text-center hover:-translate-y-1 transition-transform">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-red-50 text-red-500">
                  <FaFilePdf size={32} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#0E4B33' }}>{report.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{report.date}</p>
                <button className="inline-flex items-center gap-2 text-[#C89B3C] font-semibold hover:text-[#0E4B33] transition-colors">
                  <FaDownload /> {t.download}
                </button>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
};

export default MediaReports;
