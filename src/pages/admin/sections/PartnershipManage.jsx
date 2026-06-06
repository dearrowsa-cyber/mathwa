import React, { useState, useEffect } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'

export default function PartnershipManage() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/get-partnership-inquiries.php?limit=200`)
        const json = await res.json()
        if (json.success) setData(json.data || json.data?.data || json)
        else setData([])
      } catch (err) {
        console.error('Error fetching partnership inquiries:', err)
        setData([])
      } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'organization_name', label: 'Organization' },
    { key: 'contact_person_name', label: 'Contact' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'created_at', label: 'Submitted' },
  ]

  return (
    <AdminSectionPage
      title="Partnership Inquiries"
      description="Manage partnership inquiries and partners"
      addLabel="Add partner"
      columns={columns}
      data={data}
      onEdit={(r) => alert('Edit inquiry: ' + (r.id || r.organization_name))}
      onDelete={(r) => alert('Delete inquiry: ' + (r.id || r.organization_name))}
      emptyMessage={loading ? 'Loading...' : 'No partnership inquiries found.'}
    />
  )
}
