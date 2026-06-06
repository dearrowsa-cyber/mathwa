import React, { useState, useEffect } from 'react'
import AdminSectionPage from '../components/AdminSectionPage'
import { Trash2, Eye, Plus } from 'lucide-react'

export default function CharityDonationsManage() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedDonation, setSelectedDonation] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [formData, setFormData] = useState({
    title_ar: '',
    title_en: '',
    description_ar: '',
    description_en: '',
    target_amount: '',
    image: '',
    category: 'general',
    status: 'active',
  })

  const BACKEND_URL = '/Backend'

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'title_en', label: 'Title (EN)' },
    { key: 'title_ar', label: 'Title (AR)' },
    { key: 'target_amount', label: 'Target Amount' },
    { key: 'current_amount', label: 'Current Amount' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Created' },
  ]

  useEffect(() => {
    fetchDonations()
  }, [])

  const fetchDonations = async () => {
    try {
      setLoading(true)
      setError('')
      // Fetch all donations (all statuses) for admin view
      const response = await fetch(`${BACKEND_URL}/api/get_donations.php?limit=500&status=all`)
      const data = await response.json()
      
      if (data.success) {
        const donationsList = data.data?.donations || []
        const formatted = donationsList.map(d => ({
          ...d,
          created_at: new Date(d.created_at).toLocaleDateString(),
        }))
        setDonations(formatted)
      } else {
        setError(data.message || 'Failed to fetch donations')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this donation posting?')) return
    try {
      const response = await fetch(`${BACKEND_URL}/api/delete-charity-donation.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      const data = await response.json()
      if (data.success) {
        alert('✓ Deleted')
        fetchDonations()
      } else {
        alert('✗ Error: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  const handleView = (donation) => {
    setSelectedDonation(donation)
    setShowModal(true)
  }

  const handleCreateSubmit = async () => {
    if (!formData.title_ar || !formData.title_en || !formData.description_ar || !formData.description_en || !formData.target_amount) {
      alert('All required fields must be filled')
      return
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/create-charity-donation.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await response.json()
      if (data.success) {
        alert('✓ Charity posting created successfully')
        setFormData({
          title_ar: '',
          title_en: '',
          description_ar: '',
          description_en: '',
          target_amount: '',
          image: '',
          category: 'general',
          status: 'active',
        })
        setShowCreateForm(false)
        fetchDonations()
      } else {
        alert('✗ Error: ' + (data.message || 'Unknown error'))
      }
    } catch (err) {
      alert('Error: ' + err.message)
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-green-600 rounded-full"></div>
        <p className="text-gray-600 mt-4">Loading charity postings...</p>
      </div>
    )
  }

  return (
    <>
      <AdminSectionPage
        title="Charity Donations"
        description="View and manage charity donation postings."
        addLabel="Add Charity Posting"
        onAdd={() => setShowCreateForm(true)}
        columns={columns}
        data={donations}
        onEdit={() => {}}
        onDelete={() => {}}
        error={error}
        emptyMessage="No charity postings found."
        customActions={(row) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleView(row)}
              className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm"
              title="View Details"
            >
              <Eye size={16} />
            </button>
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
      {showModal && selectedDonation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>Donation Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedDonation && Object.entries(selectedDonation).map(([key, value]) => (
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
            </div>
          </div>
        </div>
      )}

      {/* Create Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold" style={{ color: '#0E4B33' }}>Add Charity Posting</h2>
              <button onClick={() => setShowCreateForm(false)} className="text-gray-500 hover:text-gray-700 text-2xl">×</button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Title (English) *</label>
                <input
                  type="text"
                  value={formData.title_en}
                  onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="English title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Title (Arabic) *</label>
                <input
                  type="text"
                  value={formData.title_ar}
                  onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Arabic title"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Description (English) *</label>
                <textarea
                  value={formData.description_en}
                  onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="English description"
                  rows="4"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Description (Arabic) *</label>
                <textarea
                  value={formData.description_ar}
                  onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Arabic description"
                  rows="4"
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Target Amount (PKR) *</label>
                <input
                  type="number"
                  value={formData.target_amount}
                  onChange={(e) => setFormData({ ...formData, target_amount: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Target amount"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Image URL (e.g., /Mathwaa/uploads/charity/image.jpg)"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="general">General</option>
                  <option value="emergency">Emergency</option>
                  <option value="education">Education</option>
                  <option value="health">Health</option>
                  <option value="food">Food</option>
                  <option value="family">Family Sponsorship</option>
                  <option value="deceased">Deceased Honoring</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t p-6 flex gap-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Create Posting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function StatusBadge({ status }) {
  const styles = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    completed: 'bg-blue-100 text-blue-800',
  }
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}
