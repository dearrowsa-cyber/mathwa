import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { UserAuthProvider } from './context/UserAuthContext'
import { CartProvider } from './context/CartContext'
import AdminRedirect from './pages/admin/AdminRedirect'
import AdminLoginWrapper from './pages/admin/AdminLoginWrapper'
import AdminProtectedRoutes from './pages/admin/AdminProtectedRoutes'
import { HelmetProvider } from 'react-helmet-async'

// Pages

import About from './pages/About'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Donation from './pages/Donation'
import Contact from './pages/Contact'
import WriteReview from './pages/WriteReview'
import Volunteering from './pages/Volunteering'
import VolunteerOpportunities from './pages/VolunteerOpportunities'
import VolunteerRegistration from './pages/VolunteerRegistration'
import VolunteerApplication from './pages/VolunteerApplication'
import BeneficiaryRegistration from './pages/BeneficiaryRegistration'
import BeneficiaryServices from './pages/BeneficiaryServices'
import Membership from './pages/Membership'
import BoardMembers from './pages/BoardMembers'
import PhotoAlbums from './pages/PhotoAlbums'
import VideoAlbums from './pages/VideoAlbums'
import Partnership from './pages/Partnership'
import AnnualReports from './pages/AnnualReports'
import NotFound from './pages/NotFound'
import Home from './pages/Home'
import Cart from './pages/Cart'
import OrganizationMembers from './pages/OrganizationMembers'
import BoardEstablishmentDecision from './pages/BoardEstablishmentDecision'
import OrganizationCertificate from './pages/OrganizationCertificate'
import BasicStandards from './pages/BasicStandards'
import SponsorRegistration from './pages/SponsorRegistration'
import VolunteerOpportunityRegister from './pages/VolunteerOpportunityRegister'
import ServiceRequest from './pages/ServiceRequest'
import AvailableServices from './pages/AvailableServices'
import Governance from './pages/Governance'
import Policies from './pages/Policies'
import OrganizationalStructure from './pages/OrganizationalStructure'

import GeneralAssembly from './pages/GeneralAssembly'
import Complaints from './pages/Complaints'
import Regulations from './pages/Regulations'

// New Pages
import Programs from './pages/Programs'
import HowToBenefit from './pages/HowToBenefit'
import FAQ from './pages/FAQ'
import MembershipConditions from './pages/MembershipConditions'
import MembershipApply from './pages/MembershipApply'
import MembershipRights from './pages/MembershipRights'
import MembershipPayment from './pages/MembershipPayment'
import Announcements from './pages/Announcements'
import MediaReports from './pages/MediaReports'
import SatisfactionBeneficiaries from './pages/SatisfactionBeneficiaries'
import SatisfactionDonors from './pages/SatisfactionDonors'
import SatisfactionVolunteers from './pages/SatisfactionVolunteers'
import SatisfactionResults from './pages/SatisfactionResults'

function App() {
  const { i18n } = useTranslation()
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'ar')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') || 'ar'
    setLanguage(savedLang)
    i18n.changeLanguage(savedLang)
    document.documentElement.lang = savedLang
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr'
  }, [])

  const switchLanguage = (lang) => {
    setLanguage(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    // Dispatch custom event for components listening to language changes
    window.dispatchEvent(new Event('languageChanged'))
  }

  return (
    <HelmetProvider>
      <Router basename="/">
        <AdminAuthProvider>
          <UserAuthProvider>
            <CartProvider>
              <AppContent language={language} onLanguageChange={switchLanguage} />
            </CartProvider>
          </UserAuthProvider>
        </AdminAuthProvider>
      </Router>
    </HelmetProvider>
  )
}

function AppContent({ language, onLanguageChange }) {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAdmin && <Navbar language={language} onLanguageChange={onLanguageChange} />}
      <ScrollToTop />
      <main className={isAdmin ? 'flex-grow min-h-screen flex flex-col' : 'flex-grow'}>
        <Routes>
          {/* Redirects for old/broken links */}
          <Route path="/reports" element={<Navigate to="/annual-reports" replace />} />
          <Route path="/about-us" element={<Navigate to="/about" replace />} />
          <Route path="/license" element={<Navigate to="/organization-certificate" replace />} />
          
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/donate" element={<Donation />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/write-review" element={<WriteReview />} />
          <Route path="/volunteering" element={<Volunteering />} />
          <Route path="/volunteer-opportunities" element={<VolunteerOpportunities />} />
          <Route path="/volunteer-register" element={<VolunteerRegistration />} />
          <Route path="/volunteer-apply" element={<VolunteerApplication />} />
          <Route path="/beneficiary-register" element={<BeneficiaryRegistration />} />
          <Route path="/beneficiary-services" element={<BeneficiaryServices />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/board-members" element={<BoardMembers />} />
          <Route path="/organization-members" element={<OrganizationMembers />} />
          <Route path="/board-establishment-decision" element={<BoardEstablishmentDecision />} />
          <Route path="/organization-certificate" element={<OrganizationCertificate />} />
          <Route path="/basic-standards" element={<BasicStandards />} />
          <Route path="/sponsor-register" element={<SponsorRegistration />} />
          <Route path="/volunteer-opportunity-register" element={<VolunteerOpportunityRegister />} />
          <Route path="/service-request" element={<ServiceRequest />} />
          <Route path="/available-services" element={<AvailableServices />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/organizational-structure" element={<OrganizationalStructure />} />

          <Route path="/general-assembly" element={<GeneralAssembly />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/regulations" element={<Regulations />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/how-to-benefit" element={<HowToBenefit />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/membership-conditions" element={<MembershipConditions />} />
          <Route path="/membership-apply" element={<MembershipApply />} />
          <Route path="/membership-rights" element={<MembershipRights />} />
          <Route path="/membership-payment" element={<MembershipPayment />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/media-reports" element={<MediaReports />} />
          <Route path="/satisfaction-beneficiaries" element={<SatisfactionBeneficiaries />} />
          <Route path="/satisfaction-donors" element={<SatisfactionDonors />} />
          <Route path="/satisfaction-volunteers" element={<SatisfactionVolunteers />} />
          <Route path="/satisfaction-results" element={<SatisfactionResults />} />
          <Route path="/photo-albums" element={<PhotoAlbums />} />
          <Route path="/video-albums" element={<VideoAlbums />} />
          <Route path="/partnership" element={<Partnership />} />
          <Route path="/annual-reports" element={<AnnualReports />} />
          <Route path="/admin/login" element={<AdminLoginWrapper />} />
            <Route path="/admin" element={<AdminRedirect />} />
            <Route path="/admin/*" element={<AdminProtectedRoutes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default App
