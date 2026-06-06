import React, { useState, useEffect } from 'react'
import { Eye, X, Trash2 } from 'lucide-react'
import AdminSectionPage from '../components/AdminSectionPage'

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'subject', label: 'Subject' },
  { key: 'created_at', label: 'Date' },
  { key: 'status', label: 'Status' },
]

export default function ContactMessagesManage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchMessages()
  }, [statusFilter, searchTerm])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      setError('')
      
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (searchTerm) params.append('search', searchTerm)
      
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://mathwaa.org.sa/Backend'
      const response = await fetch(`${apiUrl}/api/get-contact-messages.php?${params}`)
      
      if (!response.ok) throw new Error('Failed to fetch messages')
      
      const result = await response.json()
      if (result.success) {
        setData(result.data || [])
      } else {
        setError(result.message || 'Failed to load messages')
      }
    } catch (err) {
      setError(err.message)
      console.error('Error fetching messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return
    
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://mathwaa.org.sa/Backend'
      const response = await fetch(`${apiUrl}/api/delete-contact-message.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
      
      const result = await response.json()
      if (result.success) {
        setData((prev) => prev.filter((r) => r.id !== id))
      } else {
        alert('Failed to delete message')
      }
    } catch (err) {
      alert('Error deleting message: ' + err.message)
    }
  }

  const handleStatusUpdate = async (id, status) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'https://mathwaa.org.sa/Backend'
      const response = await fetch(`${apiUrl}/api/update-contact-message-status.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      })
      
      const result = await response.json()
      if (result.success) {
        setData((prev) => prev.map((msg) => msg.id === id ? { ...msg, status } : msg))
        if (selectedMessage?.id === id) {
          setSelectedMessage({ ...selectedMessage, status })
        }
      }
    } catch (err) {
      alert('Error updating status: ' + err.message)
    }
  }

  return (
    <>
      <div className="w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
          <p className="text-gray-500 mt-1">View and manage messages from the contact form.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search by name, email, or subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C89B3C] focus:border-transparent"
              >
                <option value="all">All Messages</option>
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>
            </div>
          </div>
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
            <div className="inline-block animate-spin h-8 w-8 border-4 border-gray-300 border-t-[#C89B3C] rounded-full"></div>
            <p className="text-gray-500 mt-4">Loading messages...</p>
          </div>
        )}

        {/* Messages Table */}
        {!loading && data.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {columns.map((col) => (
                      <th key={col.key} className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                        {col.label}
                      </th>
                    ))}
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{row.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{row.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{row.subject}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(row.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          row.status === 'new' ? 'bg-blue-100 text-blue-800' :
                          row.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                          row.status === 'replied' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {row.status || 'new'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedMessage(row)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                            title="View message"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                            title="Delete message"
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
        {!loading && data.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No contact messages found.</p>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white">
              <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-1 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name</label>
                  <p className="text-gray-900">{selectedMessage.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                  <p className="text-gray-900">{selectedMessage.phone || 'N/A'}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <p className="text-gray-900">{selectedMessage.subject}</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                  <div className="bg-gray-50 p-4 rounded-lg text-gray-700 whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date</label>
                  <p className="text-gray-900">
                    {new Date(selectedMessage.created_at).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Status</label>
                  <div className="flex gap-2">
                    {['new', 'read', 'replied'].map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(selectedMessage.id, status)}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                          selectedMessage.status === status
                            ? 'bg-[#C89B3C] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-3 justify-center">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedMessage.id)
                    setSelectedMessage(null)
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
