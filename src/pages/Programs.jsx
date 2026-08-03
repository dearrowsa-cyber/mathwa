import React, { useState } from 'react';
import { Section, Container, Card, Grid } from '../components/Common';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { FaUmbrella, FaBookOpen, FaHeart, FaGlobe } from 'react-icons/fa';

const Programs = () => {
  const [language] = useState(() => localStorage.getItem('language') || 'en');
  const isAr = language === 'ar';

  const t = {
    en: {
      title: 'Programs & Initiatives',
      subtitle: 'Discover our ongoing programs and initiatives',
      home: 'Home',
      services: 'Services',
      program1Title: 'Shade & Water Initiative',
      program1Desc: 'Providing umbrellas to protect mourners from the sun, along with cold drinking water at cemeteries.',
      program2Title: 'Training & Certification',
      program2Desc: 'Training courses for volunteers on the sunnah of washing and shrouding, granting certified licenses.',
      program3Title: 'Mowasat (Consolation)',
      program3Desc: 'A team of specialists providing moral and psychological support to families of the deceased.',
      program4Title: 'Expat Assistance',
      program4Desc: 'Handling procedures for preparing deceased expats or repatriating them to their home countries.',
    },
    ar: {
      title: 'البرامج والمبادرات',
      subtitle: 'اكتشف برامجنا ومبادراتنا المستمرة',
      home: 'الرئيسية',
      services: 'الخدمات',
      program1Title: 'مبادرة "سُقيا وظلال"',
      program1Desc: 'تجهيز المقابر وتوفير مظلات تقي المشيعين حر الشمس وقت الدفن، بالإضافة لتوفير ثلاجات مياه الشرب الباردة.',
      program2Title: 'برنامج "تأهيل وتوريث"',
      program2Desc: 'دورات تدريبية لتأهيل المتطوعين على أحكام وسنن الغسل والتكفين لمنحهم إجازات معتمدة.',
      program3Title: 'مبادرة "مواساة"',
      program3Desc: 'فريق من الأخصائيين لتقديم الدعم المعنوي والنفسي لأسر المتوفين ومساعدتهم في تجاوز صدمة الفقد.',
      program4Title: 'برنامج "دليل المغترب"',
      program4Desc: 'التكفل بإجراءات تجهيز وفيات العمالة الوافدة أو ترحيل جثامينهم لبلدانهم بناءً على رغبة ذويهم.',
    }
  }[language];

  const programs = [
    { icon: FaUmbrella, title: t.program1Title, desc: t.program1Desc },
    { icon: FaBookOpen, title: t.program2Title, desc: t.program2Desc },
    { icon: FaHeart, title: t.program3Title, desc: t.program3Desc },
    { icon: FaGlobe, title: t.program4Title, desc: t.program4Desc },
  ];

  return (
    <>
      <SEO title={t.title} titleAr={t.title} description={t.subtitle} descriptionAr={t.subtitle} />
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={[{ label: t.home, to: '/' }, { label: t.services, to: '#' }, { label: t.title }]} />
      <Section>
        <Container>
          <Grid cols={3}>
            {programs.map((p, idx) => (
              <Card key={idx} className="border border-gray-200 overflow-hidden text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(200,155,60,0.1)' }}>
                  <p.icon size={32} style={{ color: '#C89B3C' }} />
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#0E4B33' }}>{p.title}</h3>
                <p className="text-gray-600">{p.desc}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  );
};

export default Programs;
