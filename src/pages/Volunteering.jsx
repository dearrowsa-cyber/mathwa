import React from 'react'
import { HeroSection, SectionTitle, Container, Card, Grid, Section, Button } from '../components/Common'
import { FaArrowRight, FaHandHoldingHeart, FaMosque, FaQuran, FaStarAndCrescent } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Volunteering = () => {
  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const t = language === 'en' ? {
    title: 'Volunteering',
    subtitle: 'Join our community of changemakers',
    why_volunteer: 'Why Volunteer With Us?',
    benefits: 'Benefits of Volunteering',
    flexible: 'Flexible Opportunities',
    flexible_desc: 'Choose when and how you want to volunteer',
    impact: 'Real Impact',
    impact_desc: 'Make a direct difference in communities',
    growth: 'Personal Growth',
    growth_desc: 'Develop new skills and connections',
    community: 'Community',
    community_desc: 'Join a network of like-minded individuals',
    get_started: 'Get Started Today',
    register: 'Register as Volunteer',
    explore: 'Explore Opportunities',
  } : {
    title: 'التطوع',
    subtitle: 'انضم إلى مجتمعنا من صناع التغيير',
    why_volunteer: 'لماذا التطوع معنا؟',
    benefits: 'فوائد التطوع',
    flexible: 'فرص مرنة',
    flexible_desc: 'اختر متى وكيف تريد التطوع',
    impact: 'تأثير حقيقي',
    impact_desc: 'احدث فرقاً مباشراً في المجتمعات',
    growth: 'النمو الشخصي',
    growth_desc: 'طور مهارات جديدة والتقط',
    community: 'المجتمع',
    community_desc: 'انضم إلى شبكة من الأفراد المتشابهين',
    get_started: 'ابدأ اليوم',
    register: 'التسجيل كمتطوع',
    explore: 'استكشف الفرص',
  }

  const benefits = [
    { title: t.flexible, desc: t.flexible_desc, icon: FaHandHoldingHeart },
    { title: t.impact, desc: t.impact_desc, icon: FaStarAndCrescent },
    { title: t.growth, desc: t.growth_desc, icon: FaQuran },
    { title: t.community, desc: t.community_desc, icon: FaMosque },
  ]

  return (
    <>
      <HeroSection 
        title={t.title}
        subtitle={t.subtitle}
      />

      <Section>
        <Container>
          <SectionTitle title={t.why_volunteer} />
          <Grid cols={4}>
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <Card key={idx} className="text-center">
                  <Icon size={48} className="mx-auto mb-4" style={{ color: '#C89B3C' }} />
                  <h3 className="text-xl font-bold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.desc}</p>
                </Card>
              )
            })}
          </Grid>
        </Container>
      </Section>

      <Section bg="gray">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <SectionTitle title={t.get_started} />
            <p className="text-gray-600 text-lg mb-8">
              Ready to make a difference? Join us today and be part of something meaningful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/volunteer-register">
                <Button size="lg">{t.register}</Button>
              </Link>
              <Link to="/volunteer-opportunities">
                <Button variant="secondary" size="lg">{t.explore}</Button>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default Volunteering
