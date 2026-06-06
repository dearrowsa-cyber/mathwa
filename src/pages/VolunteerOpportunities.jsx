import React, { useState, useEffect } from 'react'
import { HeroSection, Container, Card, Grid, Section } from '../components/Common'
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaGraduationCap } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const VolunteerOpportunities = () => {
  const lang = localStorage.getItem('language') || 'en'
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const t = {
    en: {
      title: 'Volunteering Opportunities',
      subtitle: 'Discover available volunteering opportunities and contribute to community service',
      apply: 'Apply for the opportunity',
      seats: 'seats available',
      register_volunteer: 'Register as a volunteer',
      register_cta: "Didn't find the suitable opportunity? Register as a volunteer now and we will contact you when opportunities matching your skills and interests become available.",
      home: 'Home',
      volunteering: 'Volunteering',
      loading: 'Loading opportunities...',
      error: 'Failed to load opportunities. Please try again later.',
    },
    ar: {
      title: 'فرص التطوع',
      subtitle: 'اكتشف الفرص المتاحة للتطوع وساهم في خدمة المجتمع',
      apply: 'تقدم للفرصة',
      seats: 'مقعد متاح',
      register_volunteer: 'سجل كمتطوع',
      register_cta: 'لم تجد الفرصة المناسبة؟ سجل كمتطوع الآن وسنتواصل معك عند توفر فرص تناسب مهاراتك واهتماماتك.',
      home: 'الرئيسية',
      volunteering: 'التطوع',
      loading: 'جاري تحميل الفرص...',
      error: 'حدث خطأ في تحميل الفرص. يرجى المحاولة لاحقاً.',
    },
  }[lang]

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${BACKEND_URL}/api/volunteer-opportunities.php?lang=${lang}`)
        const data = await response.json()
        
        if (data.success) {
          setOpportunities(data.data)
          setError(null)
        } else {
          setError(data.message || 'Failed to load opportunities')
        }
      } catch (err) {
        setError('Unable to connect to the server')
        console.error('Error fetching opportunities:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchOpportunities()
  }, [lang, BACKEND_URL])

  return (
    <>
      <HeroSection title={t.title} subtitle={t.subtitle} />
      <div className="bg-gray-100 py-2">
        <Container>
          <nav className="text-sm text-gray-600">
            <Link to="/" className="hover:text-[#0E4B33]">{t.home}</Link>
            <span className="mx-2">/</span>
            <span className="text-[#0E4B33] font-medium">{t.title}</span>
          </nav>
        </Container>
      </div>
      <Section>
        <Container>
          <Grid cols={2}>
            {loading ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">{t.loading}</p>
              </div>
            ) : error ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-red-600">{t.error}</p>
              </div>
            ) : opportunities.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">No opportunities available at the moment.</p>
              </div>
            ) : (
              opportunities.map(opp => (
                <Card key={opp.id} className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-24 flex items-center justify-center" style={{ backgroundColor: 'rgba(14,75,51,0.9)' }}>
                    {(opp.category?.toLowerCase() === 'education' ? <FaGraduationCap size={40} className="text-white" /> : <FaCalendarAlt size={40} className="text-white" />)}
                  </div>
                  <div className="p-6 relative">
                    <span className="absolute top-4 left-4 px-2 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: '#C89B3C' }}>{opp.category}</span>
                    <span className="absolute top-4 right-4 px-2 py-1 rounded text-xs font-semibold text-white" style={{ backgroundColor: '#C89B3C' }}>{opp.availableSeats} {t.seats}</span>
                    <h3 className="text-xl font-bold mt-6 mb-3" style={{ color: '#0E4B33' }}>{opp.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{opp.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1"><FaMapMarkerAlt size={16} /> {opp.location}</span>
                      <span className="flex items-center gap-1"><FaCalendarAlt size={16} /> {lang === 'en' ? 'Starts' : 'يبدأ'} {opp.start_date}</span>
                    </div>
                    <Link to={`/volunteer-apply?opp=${opp.id}`} className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#C89B3C' }}>
                      <FaUser size={18} />
                      {t.apply}
                    </Link>
                  </div>
                </Card>
              ))
            )}
          </Grid>
          <div className="mt-12 p-8 rounded-2xl text-center border-2 border-dashed" style={{ borderColor: '#C89B3C', backgroundColor: 'rgba(200,155,60,0.04)' }}>
            <p className="text-gray-700 mb-4">{t.register_cta}</p>
            <Link to="/volunteer-register" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#C89B3C' }}>
              <FaUser size={20} />
              {t.register_volunteer}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}

export default VolunteerOpportunities
