import React, { useState, useEffect } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'

export default function MembershipManage() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/get-membership-registrations.php?limit=200`)
        const json = await res.json()
        if (json.success) setData(json.data || json.data?.data || json)
        else setData([])
      } catch (err) {
        console.error('Error fetching membership registrations:', err)
        setData([])
      } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'name_ar', label: 'Name' },
    { key: 'membership_type', label: 'Type' },
    { key: 'donation_amount', label: 'Donation' },
    { key: 'created_at', label: 'Submitted' },
    { key: 'status', label: 'Status' },
  ]

  return (
    <AdminSectionPage
      title="Membership Applications"
      description="View and manage membership applications"
      addLabel="Add"
      columns={columns}
      data={data}
      onEdit={(r) => alert('Edit application: ' + (r.id || r.name_ar))}
      onDelete={(r) => alert('Delete application: ' + (r.id || r.name_ar))}
      emptyMessage={loading ? 'Loading...' : 'No membership applications found.'}
    />
  )
}
