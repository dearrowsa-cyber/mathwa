import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminAuthGuard from './AdminAuthGuard'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminSettings from './AdminSettings'
import BoardMembersManage from './sections/BoardMembersManage'
import OrganizationMembersManage from './sections/OrganizationMembersManage'
import AddEditBoardMember from './AddEditBoardMember'
import AddEditOrganizationMember from './AddEditOrganizationMember'
import BoardDecisionManagement from './BoardDecisionManagement'
import OrganizationCertificateManagement from './OrganizationCertificateManagement'
import BasicStandardsManagement from './BasicStandardsManagement'
import NewsArticlesManage from './sections/NewsArticlesManage'
import PhotoAlbumsManagement from './PhotoAlbumsManagement'
import VideoAlbumsManagement from './VideoAlbumsManagement'
import AddEditPhotoAlbum from './AddEditPhotoAlbum'
import AddEditVideoAlbum from './AddEditVideoAlbum'
import DonationsManage from './sections/DonationsManage'
import CharityDonationsManage from './sections/CharityDonationsManage'
import BeneficiaryRegistrationsManage from './sections/BeneficiaryRegistrationsManage'
import SponsorRegistrationsManage from './sections/SponsorRegistrationsManage'
import VolunteerRegistrationsManage from './sections/VolunteerRegistrationsManage'
import MembershipSubscriptionsManage from './sections/MembershipSubscriptionsManage'
import PartnershipInquiriesManage from './sections/PartnershipInquiriesManage'
import ServiceRequestsManage from './sections/ServiceRequestsManage'
import ContactMessagesManage from './sections/ContactMessagesManage'
import GenericManage from './sections/GenericManage'
import DonationOpportunitiesManage from './sections/DonationOpportunitiesManage'
import AddEditDonationOpportunity from './sections/AddEditDonationOpportunity'
import CreatePost from './CreatePost'

export default function AdminProtectedRoutes() {
  return (
    <Routes>
      <Route element={<AdminAuthGuard />}>
        <Route element={<AdminLayout />}>
          
          {/* When visiting /admin */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* About */}
          <Route path="about/board-members" element={<BoardMembersManage />} />
          <Route path="about/board-members/add" element={<AddEditBoardMember />} />
          <Route path="about/board-members/edit/:id" element={<AddEditBoardMember />} />
          <Route path="about/organization-members" element={<OrganizationMembersManage />} />
          <Route path="about/organization-members/add" element={<AddEditOrganizationMember />} />
          <Route path="about/organization-members/edit/:id" element={<AddEditOrganizationMember />} />
          <Route path="about/board-decision" element={<BoardDecisionManagement />} />
          <Route path="about/certificate" element={<OrganizationCertificateManagement />} />
          <Route path="about/basic-standards" element={<BasicStandardsManagement />} />

          {/* News */}
          <Route path="news/create-post" element={<CreatePost />} />
          <Route path="news/articles" element={<NewsArticlesManage />} />
          <Route path="news/photo-albums" element={<PhotoAlbumsManagement />} />
          <Route path="news/photo-albums/add" element={<AddEditPhotoAlbum />} />
          <Route path="news/photo-albums/edit/:id" element={<AddEditPhotoAlbum />} />
          <Route path="news/video-albums" element={<VideoAlbumsManagement />} />
          <Route path="news/video-albums/add" element={<AddEditVideoAlbum />} />
          <Route path="news/video-albums/edit/:id" element={<AddEditVideoAlbum />} />

          {/* Contribute */}
          <Route path="contribute/donations" element={<CharityDonationsManage />} />
          <Route 
  path="contribute/donation-opportunities" 
  element={<DonationOpportunitiesManage />} 
/>
  <Route 
  path="contribute/donation-opportunities/add" 
  element={<AddEditDonationOpportunity />} 
/>

<Route 
  path="contribute/donation-opportunities/edit/:id" 
  element={<AddEditDonationOpportunity/>} 
/>

          <Route path="contribute/sponsors" element={<SponsorRegistrationsManage />} />
          <Route path="contribute/volunteers" element={<VolunteerRegistrationsManage />} />
          <Route path="contribute/opportunities" element={<GenericManage title="Volunteer Opportunities" description="Manage volunteering opportunities." addLabel="Add opportunity" />} />
          <Route path="contribute/opportunity-register" element={<GenericManage title="Opportunity Registration" description="Manage opportunity registration entries." addLabel="Add" />} />
          <Route path="contribute/membership" element={<MembershipSubscriptionsManage />} />
          <Route path="contribute/partnership" element={<PartnershipInquiriesManage />} />

          {/* Beneficiaries */}
          <Route path="beneficiaries/registrations" element={<BeneficiaryRegistrationsManage />} />
          <Route path="beneficiaries/services" element={<GenericManage title="Available Services" description="Manage services offered to beneficiaries." addLabel="Add service" />} />
          <Route path="beneficiaries/service-requests" element={<ServiceRequestsManage />} />

          {/* Reports */}
          <Route path="reports/annual" element={<GenericManage title="Annual Reports" description="Manage annual reports and files." addLabel="Upload report" />} />
          <Route path="reports/governance" element={<GenericManage title="Governance" description="Manage governance and transparency content." addLabel="Edit content" />} />

          {/* Contact */}
          <Route path="contact/messages" element={<ContactMessagesManage />} />
          <Route path="contact/info" element={<GenericManage title="Contact Info" description="Edit contact information shown on the website." addLabel="Edit" />} />

          {/* Settings */}
          <Route path="settings" element={<AdminSettings />} />

        </Route>
      </Route>
    </Routes>
  )
}
