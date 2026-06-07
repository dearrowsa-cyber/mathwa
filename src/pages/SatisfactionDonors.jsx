import React, { useState } from 'react';
import { Section, Container, Button } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaHeart } from 'react-icons/fa';

const SatisfactionDonors = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const [submitted, setSubmitted] = useState(false);
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Donors Satisfaction Survey',
      subtitle: 'Your opinion helps us improve our donation experience',
      home: 'Home',
      satisfaction: 'Satisfaction',
      q1: 'How easy was the donation process?',
      q2: 'How satisfied are you with the transparency of project reports?',
      q3: 'Any additional comments?',
      submit: 'Submit Survey',
      success: 'Thank you for your generous support and valuable feedback!',
    },
    ar: {
      title: 'قياس رضا المتبرعين',
      subtitle: 'رأيك يساعدنا في تحسين تجربة التبرع',
      home: 'الرئيسية',
      satisfaction: 'قياس الرضا',
      q1: 'ما مدى سهولة عملية التبرع الإلكتروني؟',
      q2: 'ما مدى رضاك عن شفافية التقارير للمشاريع التي تبرعت لها؟',
      q3: 'أي مقترحات إضافية؟',
      submit: 'إرسال التقييم',
      success: 'شكراً لك على دعمك السخي وملاحظاتك القيمة!',
    }
  }[language];

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.satisfaction, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            {submitted ? (
              <div className="text-center py-10 text-[#C89B3C]">
                <FaHeart size={64} className="mx-auto mb-4" />
                <h3 className="text-2xl font-bold">{t.success}</h3>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.q1}</label>
                  <div className="flex gap-4">
                    {['1', '2', '3', '4', '5'].map(val => (
                      <label key={val} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="q1" value={val} required className="text-[#C89B3C]" /> {val}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.q2}</label>
                  <div className="flex gap-4">
                    {['1', '2', '3', '4', '5'].map(val => (
                      <label key={val} className="flex items-center gap-1 cursor-pointer">
                        <input type="radio" name="q2" value={val} required className="text-[#C89B3C]" /> {val}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t.q3}</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent outline-none transition-all"></textarea>
                </div>
                <Button type="submit" variant="primary" className="w-full py-3">{t.submit}</Button>
              </form>
            )}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default SatisfactionDonors;
