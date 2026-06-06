import React, { useState } from 'react'
import { HeroSection, Container, Card, Section, Button } from '../components/Common'
import { FaPaperPlane } from 'react-icons/fa'

const VolunteerApplication = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    opportunityId: '',
    motivation: '',
    availability: '',
  })

  const [language] = React.useState(() => localStorage.getItem('language') || 'en')
  const t = language === 'en' ? {
    title: 'Apply for Volunteer Opportunity',
    subtitle: 'Tell us why you\'d like to volunteer',
  } : {
    title: 'تقديم طلب للفرصة التطوعية',
    subtitle: 'أخبرنا لماذا تود التطوع',
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Application submitted successfully!')
  }

  return (
    <>
      <HeroSection title={t.title} subtitle={t.subtitle} />
      <Section>
        <Container>
          <div className="max-w-2xl mx-auto">
            <Card className="!p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <input placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary" />
                <textarea placeholder="Why do you want to volunteer?" onChange={(e) => setFormData({...formData, motivation: e.target.value})} rows="6" required className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary resize-none"></textarea>
                <Button type="submit" size="lg" className="w-full gap-2">
                  <FaPaperPlane size={20} /> Submit Application
                </Button>
              </form>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default VolunteerApplication
