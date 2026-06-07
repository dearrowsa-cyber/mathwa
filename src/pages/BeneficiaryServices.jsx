import React from 'react'
import { SectionTitle, Container, Card, Grid, Section } from '../components/Common'
import PageHeader from '../components/PageHeader'

const BeneficiaryServices = () => {
  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const t = language === 'en' ? { title: 'Beneficiary Services', subtitle: 'Our available services' }: { title: 'خدمات المستفيد', subtitle: 'خدماتنا المتاحة' }

  const services = [
    { title: 'Financial Assistance', desc: 'Direct financial support' },
    { title: 'Food Support', desc: 'Food packages and meal support' },
    { title: 'Medical Services', desc: 'Healthcare assistance' },
    { title: 'Educational Support', desc: 'Scholarships and educational aid' },
    { title: 'Housing Assistance', desc: 'Housing support programs' },
    { title: 'Counseling Services', desc: 'Professional guidance and counseling' },
  ]

  const breadcrumbs = [
    { label: language === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: t.title }
  ]

  return (
    <>
      <PageHeader title={t.title} description={t.subtitle} breadcrumbs={breadcrumbs} />
      <Section>
        <Container>
          <SectionTitle title={language === 'en' ? 'Our Services' : 'خدماتنا'} />
          <Grid cols={3}>
            {services.map((service, idx) => (
              <Card key={idx} className="text-center">
                <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>
    </>
  )
}

export default BeneficiaryServices
