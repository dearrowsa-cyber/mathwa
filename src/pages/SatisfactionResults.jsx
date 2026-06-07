import React, { useState } from 'react';
import { Section, Container, Grid, Card } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';

const SatisfactionResults = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Satisfaction Results',
      subtitle: 'Transparent display of our satisfaction KPIs',
      home: 'Home',
      satisfaction: 'Satisfaction',
      overall: 'Overall Satisfaction',
      beneficiaries: 'Beneficiaries',
      donors: 'Donors',
      volunteers: 'Volunteers',
    },
    ar: {
      title: 'نتائج مؤشرات الرضا',
      subtitle: 'عرض شفاف لمؤشرات الرضا لدينا',
      home: 'الرئيسية',
      satisfaction: 'قياس الرضا',
      overall: 'الرضا العام',
      beneficiaries: 'المستفيدين',
      donors: 'المتبرعين',
      volunteers: 'المتطوعين',
    }
  }[language];

  const metrics = [
    { label: t.beneficiaries, value: '94%', color: '#3B82F6' },
    { label: t.donors, value: '97%', color: '#10B981' },
    { label: t.volunteers, value: '92%', color: '#F59E0B' },
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.satisfaction, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-40 h-40 rounded-full border-8 border-[#C89B3C] mb-4">
                <span className="text-4xl font-bold text-[#0E4B33]">95%</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0E4B33]">{t.overall}</h2>
            </div>

            <Grid cols={3}>
              {metrics.map((metric, idx) => (
                <Card key={idx} className="text-center border border-gray-100 shadow-sm">
                  <h3 className="text-3xl font-bold mb-2" style={{ color: metric.color }}>{metric.value}</h3>
                  <p className="text-gray-600 font-semibold">{metric.label}</p>
                  <div className="w-full bg-gray-200 h-2 mt-4 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: metric.value, backgroundColor: metric.color }}></div>
                  </div>
                </Card>
              ))}
            </Grid>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default SatisfactionResults;
