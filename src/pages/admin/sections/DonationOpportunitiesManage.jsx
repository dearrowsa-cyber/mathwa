import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function DonationOpportunitiesManage() {
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      console.log('🔄 Fetching donation opportunities...')
      
      const response = await fetch('https://mathwaa.org.sa/Backend/api/auto-setup-donations.php')
      console.log('✅ Response status:', response.status)
      
      const result = await response.json()
      console.log('📊 API Response:', result)
      
      if (result.success && Array.isArray(result.data)) {
        console.log(`✅ Loaded ${result.data.length} opportunities`)
        setData(result.data)
      } else {
        throw new Error(result.message || 'Failed to load opportunities')
      }
    } catch (err) {
      console.error('❌ Error:', err.message)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleAdd = () => {
    navigate('/admin/contribute/donation-opportunities/add')
  }

  const handleEdit = (id) => {
    navigate(`/admin/contribute/donation-opportunities/edit/${id}`)
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return

    try {
      const response = await fetch(`https://mathwaa.org.sa/Backend/api/donation-opportunities.php?id=${id}`, {
        method: 'DELETE'
      })
      const result = await response.json()

      if (result.success) {
        setData(prev => prev.filter(item => item.id !== id))
        alert('✅ Deleted successfully')
      } else {
        alert('❌ ' + (result.message || 'Error deleting'))
      }
    } catch (err) {
      alert('❌ Error: ' + err.message)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Donation Opportunities</h1>
          <p className="text-gray-600 mt-1">Create and manage donation opportunities that supporters can contribute to.</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-[#C89B3C] hover:bg-[#b8891f] text-white rounded-lg font-semibold transition"
        >
          <Plus size={20} />
          Add Opportunity
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
          <p className="text-red-800 font-semibold">⚠️ {error}</p>
          <button 
            onClick={fetchData}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🔄 Retry
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && !error && (
        <div className="text-center py-12">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-[#C89B3C] rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading opportunities...</p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && data.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-600 mb-4">No donation opportunities yet.</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C89B3C] text-white rounded-lg font-semibold hover:bg-[#b8891f]"
          >
            <Plus size={20} />
            Add Opportunity
          </button>
        </div>
      )}

      {/* Table */}
      {!loading && !error && data.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title (English)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title (Arabic)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Price (SAR)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((opportunity) => (
                <tr key={opportunity.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{opportunity.title_en}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{opportunity.title_ar}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{opportunity.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      opportunity.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(opportunity.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(opportunity.id)}
                        className="p-2 rounded-lg hover:bg-blue-100 hover:text-blue-600 text-gray-500"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(opportunity.id, opportunity.title_en)}
                        className="p-2 rounded-lg hover:bg-red-100 hover:text-red-600 text-gray-500"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

