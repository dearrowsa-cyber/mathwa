import React, { useState, useEffect } from 'react'
import { Eye, Trash2, Download } from 'lucide-react'

export default function SponsorsManage() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError('')
      console.log('Fetching from:', `${BACKEND_URL}/api/get-sponsor-registrations.php?limit=500`)
      
      const res = await fetch(`${BACKEND_URL}/api/get-sponsor-registrations.php?limit=500`)
      console.log('Response status:', res.status)
      
      const json = await res.json()
      console.log('Response data:', json)
      
      if (json.success) {
        const items = json.data || []
        console.log('Items count:', items.length)
        setData(items)
      } else {
        setError(json.message || 'Failed to load sponsors')
        setData([])
      }
    } catch (err) {
      const errorMsg = err.message
      console.error('Fetch error:', errorMsg, err)
      setError(errorMsg)
      setData([])
    } finally {
      setLoading(false)
    }
  }

  const filteredData = data.filter(item =>
    (item.name_en || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return
    // Add delete logic here if needed
    alert('Delete sponsor ID: ' + id)
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sponsor Registrations</h1>
        <p className="text-gray-500 mt-1">View and manage sponsor registrations from your database</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0E4B33] focus:border-transparent"
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-[#0E4B33] rounded-full"></div>
          <p className="text-gray-500 mt-4">Loading sponsors...</p>
        </div>
      )}

      {/* Data Table */}
      {!loading && filteredData.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Submitted</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{row.name_en || row.full_name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.email || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{row.phone || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        row.status === 'approved' ? 'bg-green-100 text-green-800' :
                        row.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        row.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {row.status || 'pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {row.created_at ? new Date(row.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedRecord(row)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="View details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredData.length === 0 && !error && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No sponsor registrations found.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Sponsor Details</h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-700">Name</label>
                <p className="text-gray-900 mt-1">{selectedRecord.name_en || selectedRecord.full_name || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <p className="text-gray-900 mt-1">{selectedRecord.email || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Phone</label>
                <p className="text-gray-900 mt-1">{selectedRecord.phone || 'N/A'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Status</label>
                <p className="text-gray-900 mt-1 capitalize">{selectedRecord.status || 'pending'}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Submitted</label>
                <p className="text-gray-900 mt-1">{selectedRecord.created_at ? new Date(selectedRecord.created_at).toLocaleString() : 'N/A'}</p>
              </div>
            </div>
            <div className="flex gap-3 justify-end p-6 border-t border-gray-200">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
