import React, { useState, useEffect } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'
import { Trash2, Eye, CheckCircle, XCircle } from 'lucide-react'

export default function VolunteerRegistrationsManage() {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedReg, setSelectedReg] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'full_name_ar', label: 'Name (AR)' },
    { key: 'full_name_en', label: 'Name (EN)' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'education_level', label: 'Education' },
    { key: 'volunteer_interests', label: 'Interests' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Registered' },
  ]

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const fetchRegistrations = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await fetch(`${BACKEND_URL}/api/get-volunteer-registrations.php?limit=200`)
      const data = await response.json()
      
      if (data.success) {
        const formatted = (data.data || []).map(reg => ({
          ...reg,
          created_at: new Date(reg.created_at).toLocaleDateString(),
        }))
        setRegistrations(formatted)
      } else {
        setError(data.message || 'Failed to fetch registrations')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    if (!window.confirm('Approve this volunteer registration?')) return
    try {
      const response = await fetch(`${BACKEND_URL}/api/volunteer-registration-approve.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      if (data.success) {
        alert('✓ Approved')
        fetchRegistrations()
      } else {
        alert('✗ Error: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleReject = async (id) => {
    if (!window.confirm('Reject this volunteer registration?')) return
    try {
      const response = await fetch(`${BACKEND_URL}/api/volunteer-registration-reject.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      if (data.success) {
        alert('✓ Rejected')
        fetchRegistrations()
      } else {
        alert('✗ Error: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this registration?')) return
    try {
      const response = await fetch(`${BACKEND_URL}/api/volunteer-registration-delete.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      if (data.success) {
        alert('✓ Deleted')
        fetchRegistrations()
      } else {
        alert('✗ Error: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleView = (reg) => {
    setSelectedReg(reg)
    setShowModal(true)
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-green-600 rounded-full"></div>
        <p className="text-gray-600 mt-4">Loading volunteer registrations...</p>
      </div>
    )
  }

  return (
    <>
      <AdminSectionPage
        title="Volunteer Registrations"
        description="View and manage volunteer registration submissions from the database."
        addLabel="Add Registration"
        onAdd={() => alert('Add form not yet implemented')}
        columns={columns}
        data={registrations}
        onEdit={() => {}}
        onDelete={() => {}}
        error={error}
        emptyMessage="No volunteer registrations found."
        customActions={(row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleView(row)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
              title="View Details"
            >
              <Eye size={16} />
            </button>
            {row.status === 'pending' && (
              <>
                <button
                  onClick={() => handleApprove(row.id)}
                  className="px-3 py-1 text-green-600 hover:bg-green-50 rounded text-sm"
                  title="Approve"
                >
                  <CheckCircle size={16} />
                </button>
                <button
                  onClick={() => handleReject(row.id)}
                  className="px-3 py-1 text-orange-600 hover:bg-orange-50 rounded text-sm"
                  title="Reject"
                >
                  <XCircle size={16} />
                </button>
              </>
            )}
            <button
              onClick={() => handleDelete(row.id)}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}
      />

      {/* Detail Modal */}
      {showModal && selectedReg && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>Registration Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedReg && Object.entries(selectedReg).map(([key, value]) => (
                key !== 'actions' && (
                  <div key={key} className="border-b pb-3">
                    <label className="text-sm font-semibold text-gray-600 uppercase">{key}</label>
                    {key === 'status' ? (
                      <StatusBadge status={value} />
                    ) : (
                      <p className="text-gray-800 break-words">{String(value)}</p>
                    )}
                  </div>
                )
              ))}
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t p-6 flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Close
              </button>
              {selectedReg.status === 'pending' && (
                <>
                  <button
                    onClick={() => {
                      handleApprove(selectedReg.id)
                      setShowModal(false)
                    }}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      handleReject(selectedReg.id)
                      setShowModal(false)
                    }}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}
