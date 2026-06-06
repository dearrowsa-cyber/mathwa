import React, { useState, useEffect } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'

export default function OpportunityRegistrationsManage() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/get-volunteer-applications.php?limit=200`)
        const json = await res.json()
        if (json.success) setData(json.data || json.data?.applications || json)
        else setData([])
      } catch (err) {
        console.error('Error fetching opportunity applications:', err)
        setData([])
      } finally { setLoading(false) }
    }
    fetchData()
  }, [])

  const columns = [
    { key: 'volunteer_name', label: 'Volunteer' },
    { key: 'opportunity_id', label: 'Opportunity ID' },
    { key: 'motivation', label: 'Motivation' },
    { key: 'created_at', label: 'Submitted' },
    { key: 'status', label: 'Status' },
  ]

  return (
    <AdminSectionPage
      title="Opportunity Registrations"
      description="Manage volunteer opportunity applications"
      addLabel="Add"
      columns={columns}
      data={data}
      onEdit={(r) => alert('Edit application: ' + (r.id || r.volunteer_name))}
      onDelete={(r) => alert('Delete application: ' + (r.id || r.volunteer_name))}
      emptyMessage={loading ? 'Loading...' : 'No applications found.'}
    />
  )
}
