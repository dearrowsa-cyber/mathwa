import React from 'react'
import { Link } from 'react-router-dom'
import { SectionTitle, Container, Card, Grid, Section, Button } from '../components/Common'
import PageHeader from '../components/PageHeader'
import { FaMosque, FaUsers, FaHandHoldingHeart, FaQuran, FaBalanceScale, FaEye, FaBullseye, FaHandshake, FaUserShield, FaGavel, FaChartLine, FaCheckCircle, FaProjectDiagram, FaBuilding, FaArrowRight } from 'react-icons/fa'

const About = () => {
  const translations = {
    en: {
      title: 'About Mathwaa Association',
      subtitle: 'Mathwaa Charitable Association - Honoring the Deceased with Dignity',
      our_story: 'Who We Are',
      story_desc: 'Mathwaa Charitable Association is a trusted civic organization that operates with calmness and respect, providing its services with fairness and professionalism, treating people with dignity in the most delicate moments of their lives. It is the first association specialized in supporting the affairs of the deceased in the northern sector of Al-Ahsa, headquartered in Al-Mubarraz city, Al-Ahsa Governorate.',
      license_info: 'Licensed under No. 1000827300 dated 6/1447H',
      vision: 'Our Vision',
      vision_desc: 'Institutional leadership in honoring the deceased and serving their families, through an integrated and fair system that achieves a sustainable humanitarian impact in Al-Ahsa Governorate.',
      mission: 'Our Mission',
      mission_desc: 'Providing services for honoring the deceased and supporting and logistical services professionally with Sharia commitment, and supporting the governmental sector represented in the management of deceased affairs services, and integrating with non-profit sector associations, ensuring service coverage for all segments of society in Al-Ahsa Governorate according to the principles of moderation and justice.',
      values: 'Our Institutional Values',
      goals: 'Our Goals',
      goal1: 'Raising awareness about funeral rulings according to Islamic Sharia',
      goal2: 'Qualifying competencies to work in centers for honoring the deceased',
      goal3: 'Providing necessary care for the deceased until burial',
      goal4: 'Helping families of the deceased in transporting, preparing, and burying their dead',
      stats1: 'Board Members',
      stats2: 'Year of Establishment',
      stats3: 'First in Northern Al-Ahsa',
      cta: 'Join Our Mission',
      quran_verse: '"Indeed, my Lord has made good my place of settlement."',
      quran_ref: 'Surah Yusuf, Verse 23',
    },
    ar: {
      title: 'عن جمعية مثوى',
      subtitle: 'جمعية مثوى الأهلية - إكرام الموتى بكرامة واحترافية',
      our_story: 'من نحن',
      story_desc: 'جمعية مثوى الأهلية هي جهة أهلية موثوقة، تعمل بهدوء واحترام، وتقدّم خدماتها بعدالة واحتراف، وتُعامل الإنسان بكرامة في أدق لحظات حياته. وهي أول جمعية متخصصة في خدمة مساندة شؤون الموتى في القطاع الشمالي من الأحساء، مقرها مدينة المبرز - محافظة الأحساء.',
      license_info: 'برقم ترخيص 1000827300 بتاريخ 6-1447هـ',
      vision: 'رؤيتنا',
      vision_desc: 'الريادة المؤسسية في إكرام الموتى وخدمة ذويهم، بمنظومة تكاملية عادلة تحقق أثراً إنسانياً مستداماً في محافظة الأحساء.',
      mission: 'رسالتنا',
      mission_desc: 'تقديم خدمات إكرام الموتى والخدمات المساندة واللوجستية باحترافية والتزام شرعي، ودعم القطاع الحكومي ممثلاً في إدارة خدمات إكرام الموتى، والتكامل مع جمعيات القطاع غير الربحي، بما يضمن شمول الخدمة لكافة فئات المجتمع في محافظة الأحساء وفق مبادئ الوسطية والعدالة.',
      values: 'قيمنا المؤسسية',
      goals: 'أهدافنا',
      goal1: 'التوعية بأحكام الجنائز وفق الشريعة الإسلامية',
      goal2: 'تأهيل كفاءات للعمل في مراكز إكرام الموتى',
      goal3: 'تقديم العناية اللازمة بالموتى إلى دفنهم',
      goal4: 'مساعدة أهالي الموتى في نقل وتجهيز ودفن موتاهم',
      stats1: 'أعضاء مجلس الإدارة',
      stats2: 'سنة التأسيس',
      stats3: 'الأولى في شمال الأحساء',
      cta: 'انضم إلى رسالتنا',
      quran_verse: '﴿ إِنَّهُ رَبِّي أَحْسَنَ مَثْوَايَ ﴾',
      quran_ref: 'سورة يوسف، الآية 23',
    }
  }

  const [language] = React.useState(() => localStorage.getItem('language') || 'ar')
  const t = translations[language]

  const valuesData = [
    { title_ar: 'الوسطية', title_en: 'Moderation', desc_ar: 'الالتزام بمنهج الوسطية والاعتدال في جميع أعمالنا', desc_en: 'Adhering to the approach of moderation in all our work', icon: FaBalanceScale },
    { title_ar: 'الالتزام الشرعي', title_en: 'Sharia Commitment', desc_ar: 'تقديم خدماتنا وفق الأحكام الشرعية الصحيحة', desc_en: 'Delivering services according to Islamic rulings', icon: FaQuran },
    { title_ar: 'العدالة والشمولية', title_en: 'Justice & Inclusivity', desc_ar: 'ضمان شمول الخدمة لكافة فئات المجتمع بعدالة', desc_en: 'Ensuring services reach all segments of society fairly', icon: FaGavel },
    { title_ar: 'الشفافية والمساءلة', title_en: 'Transparency & Accountability', desc_ar: 'الوضوح والمصداقية في جميع التعاملات والقرارات', desc_en: 'Clarity and credibility in all dealings and decisions', icon: FaEye },
    { title_ar: 'التكامل والشراكة', title_en: 'Integration & Partnership', desc_ar: 'التعاون والتكامل مع الجهات الحكومية والأهلية', desc_en: 'Collaboration with governmental and civil organizations', icon: FaHandshake },
    { title_ar: 'الاحترافية', title_en: 'Professionalism', desc_ar: 'تقديم خدمات عالية الجودة بأساليب مهنية متقدمة', desc_en: 'Delivering high-quality services with advanced methods', icon: FaChartLine },
    { title_ar: 'العمل الجماعي', title_en: 'Teamwork', desc_ar: 'تعزيز روح الفريق والعمل المشترك لتحقيق الأهداف', desc_en: 'Fostering team spirit and collaboration to achieve goals', icon: FaUsers },
  ]

  const breadcrumbs = [
    { label: language === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />

      {/* QURAN VERSE */}
      <div className="py-10 text-center" style={{ backgroundColor: '#0E4B33' }}>
        <Container>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2" style={{ fontFamily: 'Alexandria, sans-serif' }}>
            {t.quran_verse}
          </p>
          <p className="text-[#C89B3C] font-medium">{t.quran_ref}</p>
        </Container>
      </div>

      {/* WHO WE ARE */}
      <Section id="who_we_are">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <SectionTitle title={t.our_story} />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 mb-8">
              <span className="bg-[#C89B3C]/10 text-[#0E4B33] px-5 py-2 rounded-full font-bold text-sm border border-[#C89B3C]/20">
                {t.license_info}
              </span>
              <Button variant="secondary" className="shadow-sm px-6 py-2">
                {t.cta}
              </Button>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t.story_desc}
            </p>
          </div>
        </Container>
      </Section>

      {/* STATS SECTION */}
      <Section bg="gray">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { number: '5', label: t.stats1, icon: FaUsers },
              { number: '1447', label: t.stats2, icon: FaUsers },
              { number: '#1', label: t.stats3, icon: FaMosque },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 card-hover-lift border border-gray-100">
                  <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#0E4B33]/10">
                    <Icon size={24} className="text-[#C89B3C]" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-extrabold text-[#C89B3C] mb-3">{stat.number}</h3>
                  <p className="text-gray-600 font-bold text-lg">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* VISION & MISSION */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10" id="vision">
            <Card className="p-8 shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-primary" id="vision">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#0E4B33]/10">
                  <FaEye size={24} className="text-[#C89B3C]" />
                </div>
                <SectionTitle title={t.vision} centered={false} />
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg">{t.vision_desc}</p>
            </Card>

            <Card className="p-8 shadow-lg hover:shadow-2xl transition duration-300 border-t-4 border-secondary" id="mission">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#C89B3C]/10">
                  <FaBullseye size={24} className="text-[#0E4B33]" />
                </div>
                <SectionTitle title={t.mission} centered={false} />
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed text-lg">{t.mission_desc}</p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* GOALS */}
      <Section bg="gray" id="goals">
        <Container>
          <SectionTitle title={t.goals} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-4xl mx-auto">
            {[t.goal1, t.goal2, t.goal3, t.goal4].map((goal, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full text-white font-bold text-lg" style={{ backgroundColor: '#C89B3C' }}>
                  {idx + 1}
                </div>
                <p className="text-gray-700 font-medium text-lg leading-relaxed">{goal}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ORGANIZATIONAL STRUCTURE */}
      <Section>
        <Container>
          <SectionTitle
            title={
              language === 'ar'
                ? 'الهيكل التنظيمي'
                : 'Organizational Structure'
            }
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-10">
            
            {/* LEFT SIDE - VISUAL STRUCTURE */}
            <div className="relative p-6 sm:p-8 bg-[#0E4B33]/5 rounded-3xl border border-[#0E4B33]/10">
              <div className={`absolute top-10 bottom-10 w-1 bg-[#C89B3C]/30 hidden sm:block ${language === 'ar' ? 'right-16' : 'left-16'}`}></div>
              
              <div className="space-y-6 sm:space-y-8 relative">
                {/* Level 1 */}
                <div className={`flex items-center gap-4 sm:gap-6 ${language === 'ar' ? 'flex-row' : ''}`}>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0E4B33] text-[#C89B3C] flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <FaUserTie size={24} className="sm:w-7 sm:h-7" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <h4 className="font-bold text-[#0E4B33]">{language === 'ar' ? 'مؤسس' : 'Founder'}</h4>
                  </div>
                </div>

                {/* Level 2 */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#C89B3C] text-white flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <FaUsers size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <h4 className="font-bold text-[#C89B3C]">{language === 'ar' ? 'عضو مجلس عموم' : 'General Assembly Member'}</h4>
                  </div>
                </div>

                {/* Level 3 */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#0E4B33] border-2 border-[#0E4B33] flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <FaAward size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <h4 className="font-bold text-[#0E4B33]">{language === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}</h4>
                  </div>
                </div>



                {/* Level 4 */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gray-100 text-gray-600 border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-lg z-10">
                    <FaBuilding size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1">
                    <h4 className="font-bold text-gray-700">{language === 'ar' ? 'الجهاز التنفيذي' : 'Executive Management'}</h4>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Link to="/organizational-structure" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-[#C89B3C]/30 text-[#0E4B33] font-bold rounded-full hover:bg-[#C89B3C] hover:text-white transition-all shadow-sm hover:shadow-md">
                  {language === 'ar' ? 'عرض الهيكل التفاعلي الكامل' : 'View Full Interactive Structure'} <FaArrowRight className={language === 'ar' ? 'rotate-180' : ''} />
                </Link>
              </div>
            </div>

            {/* RIGHT SIDE - CONTENT */}
            <div className={`space-y-6 ${language === 'ar' ? 'text-right' : ''}`}>

              <h3 className="text-2xl font-bold text-primary">
                {language === 'ar'
                  ? 'الهيكل التنظيمي لجمعية "مثوى"'
                  : 'Organizational Structure of "Mathwaa" Association'}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {language === 'ar'
                  ? 'يعكس هذا الهيكل التسلسل الهرمي للسلطات والأقسام بناءً على المواد المنصوص عليها في اللائحة.'
                  : 'This structure reflects the hierarchical order of authorities and departments based on the provisions of the bylaws.'}
              </p>

              <div className="space-y-4 text-gray-700 leading-relaxed text-sm">

                <p>
                  <strong>
                    {language === 'ar'
                      ? '1. مؤسس:'
                      : '1. Founder:'}
                  </strong><br/>
                  {language === 'ar'
                    ? 'المؤسس للجمعية وواضع رؤيتها الأولى.'
                    : 'The founder of the association who established its initial vision.'}
                </p>

                <p>
                  <strong>
                    {language === 'ar'
                      ? '2. عضو مجلس عموم:'
                      : '2. General Assembly Member:'}
                  </strong><br/>
                  {language === 'ar'
                    ? 'يمثلون أعلى سلطة، مسؤولون عن إقرار السياسات العليا، انتخاب مجلس الإدارة، واعتماد الميزانيات والتقارير.'
                    : 'Representing the supreme authority, responsible for approving high-level policies, electing the Board, and approving budgets.'}
                </p>

                <p>
                  <strong>
                    {language === 'ar'
                      ? '3. مجلس الإدارة:'
                      : '3. Board of Directors:'}
                  </strong><br/>
                  {language === 'ar'
                    ? 'يدير الجمعية ويتخذ القرارات الاستراتيجية الكبرى ويشرف على أعمالها.'
                    : 'Manages the organization and makes major strategic decisions while overseeing operations.'}
                </p>



                <p>
                  <strong>
                    {language === 'ar'
                      ? '4. الجهاز التنفيذي:'
                      : '4. Executive Management:'}
                  </strong><br/>
                  {language === 'ar'
                    ? 'يقوده المدير التنفيذي ويشمل الإدارات المالية والموارد البشرية والبرامج والعلاقات العامة.'
                    : 'Led by the Executive Officer and includes Finance, HR, Programs, and Public Relations departments.'}
                </p>

                <p className="italic text-gray-500">
                  {language === 'ar'
                    ? 'يضمن هذا الهيكل الفصل بين السلطات وتحقيق مبادئ الحوكمة الرشيدة.'
                    : 'This structure ensures separation of powers and achieves good governance principles.'}
                </p>

              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* VALUES */}
      <Section bg="gray" id="values">
        <Container>
          <SectionTitle title={t.values} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {valuesData.map((value, idx) => {
              const Icon = value.icon
              return (
                <Card
                  key={idx}
                  className="text-center p-8 rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2"
                >
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#0E4B33]/10">
                    <Icon size={28} className="text-[#C89B3C]" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {language === 'ar' ? value.title_ar : value.title_en}
                  </h3>
                  <p className="text-gray-600">
                    {language === 'ar' ? value.desc_ar : value.desc_en}
                  </p>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>
    </>
  )
}

export default About
