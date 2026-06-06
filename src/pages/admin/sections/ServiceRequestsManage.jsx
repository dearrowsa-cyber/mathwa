import React, { useState } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'

const placeholderData = [
  { id: 1, title: 'Service request A', serviceType: 'Preparation', priority: 'High', date: '2025-01-14' },
  { id: 2, title: 'Service request B', serviceType: 'Transport', priority: 'Medium', date: '2025-01-13' },
]

const columns = [
  { key: 'title', label: 'Title' },
  { key: 'serviceType', label: 'Service type' },
  { key: 'priority', label: 'Priority' },
  { key: 'date', label: 'Date' },
]

export default function ServiceRequestsManage() {
  const [data, setData] = useState(placeholderData)
  return (
    <AdminSectionPage
      title="Service Requests"
      description="Manage service requests from beneficiaries."
      addLabel="Add request"
      onAdd={() => alert('Add — connect backend')}
      columns={columns}
      data={data}
      onEdit={(row) => alert('Edit: ' + row.title)}
      onDelete={(row) => setData((prev) => prev.filter((r) => r.id !== row.id))}
    />
  )
}
