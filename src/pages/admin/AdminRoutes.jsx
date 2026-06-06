import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminGuard from './AdminGuard'
import AdminLogin from './AdminLogin'
import AdminLayout from './AdminLayout'
import AdminDashboard from './AdminDashboard'
import AdminSettings from './AdminSettings'
import CreatePost from './CreatePost'
import BoardMembersManage from './sections/BoardMembersManage'
import AddEditBoardMember from './AddEditBoardMember'
import OrganizationMembersManage from './sections/OrganizationMembersManage'
import AddEditOrganizationMember from './AddEditOrganizationMember'
import NewsArticlesManage from './sections/NewsArticlesManage'
import DonationsManage from './sections/DonationsManage'
import DonationOpportunitiesManage from './sections/DonationOpportunitiesManage'
import AddEditDonationOpportunity from './sections/AddEditDonationOpportunity'
import SponsorsManage from './sections/SponsorsManage'
import VolunteerRegistrationsManage from './sections/VolunteerRegistrationsManage'
import VolunteerOpportunitiesManage from './sections/VolunteerOpportunitiesManage'
import OpportunityRegistrationsManage from './sections/OpportunityRegistrationsManage'
import MembershipManage from './sections/MembershipManage'
import PartnershipManage from './sections/PartnershipManage'
import BeneficiaryRegistrationsManage from './sections/BeneficiaryRegistrationsManage'
import ServiceRequestsManage from './sections/ServiceRequestsManage'
import ContactMessagesManage from './sections/ContactMessagesManage'
import GenericManage from './sections/GenericManage'
import OrganizationCertificateManagement from './OrganizationCertificateManagement'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminGuard />}>
        <Route path="login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="about/board-members" element={<BoardMembersManage />} />
          <Route path="about/board-members/add" element={<AddEditBoardMember />} />
          <Route path="about/board-members/edit/:id" element={<AddEditBoardMember />} />
          <Route path="about/organization-members" element={<OrganizationMembersManage />} />
          <Route path="about/organization-members/add" element={<AddEditOrganizationMember />} />
          <Route path="about/organization-members/edit/:id" element={<AddEditOrganizationMember />} />
          <Route path="about/board-decision" element={<GenericManage title="Board Establishment Decision" description="Manage board establishment decision document." addLabel="Upload document" />} />
          <Route path="about/certificate" element={<OrganizationCertificateManagement />} />
          <Route path="about/basic-standards" element={<GenericManage title="Basic Standards" description="Manage basic standards content." addLabel="Add / Edit" />} />
          <Route path="news/create-post" element={<CreatePost />} />
          <Route path="news/articles" element={<NewsArticlesManage />} />
          <Route path="news/photo-albums" element={<GenericManage title="Photo Albums" description="Manage photo albums." addLabel="Add album" />} />
          <Route path="news/video-albums" element={<GenericManage title="Video Albums" description="Manage video albums." addLabel="Add album" />} />
          <Route path="contribute/donations" element={<DonationsManage />} />
          <Route path="contribute/donation-opportunities" element={<DonationOpportunitiesManage />} />
          <Route path="contribute/donation-opportunities/add" element={<AddEditDonationOpportunity />} />
          <Route path="contribute/donation-opportunities/edit/:id" element={<AddEditDonationOpportunity />} />
          <Route path="contribute/sponsors" element={<SponsorsManage />} />
          <Route path="contribute/volunteers" element={<VolunteerRegistrationsManage />} />
          <Route path="contribute/opportunities" element={<VolunteerOpportunitiesManage />} />
          <Route path="contribute/opportunity-register" element={<OpportunityRegistrationsManage />} />
          <Route path="contribute/membership" element={<MembershipManage />} />
          <Route path="contribute/partnership" element={<PartnershipManage />} />
          <Route path="beneficiaries/registrations" element={<BeneficiaryRegistrationsManage />} />
          <Route path="beneficiaries/services" element={<GenericManage title="Available Services" description="Manage services offered to beneficiaries." addLabel="Add service" />} />
          <Route path="beneficiaries/service-requests" element={<ServiceRequestsManage />} />
          <Route path="reports/annual" element={<GenericManage title="Annual Reports" description="Manage annual reports and files." addLabel="Upload report" />} />
          <Route path="reports/governance" element={<GenericManage title="Governance" description="Manage governance and transparency content." addLabel="Edit content" />} />
          <Route path="contact/messages" element={<ContactMessagesManage />} />
          <Route path="contact/info" element={<GenericManage title="Contact Info" description="Edit contact information shown on the website." addLabel="Edit" />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  )
}
