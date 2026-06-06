import React, { useState } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'

const placeholderData = [
  { id: 1, donor: 'Donor A', amount: '500 SAR', date: '2025-01-14', method: 'Online' },
  { id: 2, donor: 'Donor B', amount: '1,000 SAR', date: '2025-01-13', method: 'Bank' },
]

const columns = [
  { key: 'donor', label: 'Donor' },
  { key: 'amount', label: 'Amount' },
  { key: 'date', label: 'Date' },
  { key: 'method', label: 'Method' },
]

export default function DonationsManage() {
  const [data, setData] = useState(placeholderData)
  return (
    <AdminSectionPage
      title="Donations"
      description="View and manage donation records."
      addLabel="Add donation"
      onAdd={() => alert('Add donation — connect backend')}
      columns={columns}
      data={data}
      onEdit={(row) => alert('Edit: ' + row.donor)}
      onDelete={(row) => setData((prev) => prev.filter((r) => r.id !== row.id))}
    />
  )
}
