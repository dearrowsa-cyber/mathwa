import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const BoardMembersManage = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const apiUrl = import.meta.env.DEV 
        ? `/api/board-members.php?lang=en`
        : `${BACKEND_URL}/api/board-members.php?lang=en`
      
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        setError(`Server error: HTTP ${response.status}`)
        setLoading(false)
        return
      }

      const text = await response.text()
      
      // Check if response is JSON
      if (!text.trim().startsWith('{')) {
        console.error('API returned non-JSON response:', text.substring(0, 200))
        setError('Server returned invalid response. Check console for details.')
        setLoading(false)
        return
      }

      const data = JSON.parse(text)
      
      if (data.success) {
        setMembers(data.data || [])
        setError(null)
      } else {
        setError(data.message || 'Failed to fetch members')
      }
    } catch (err) {
      console.error('Fetch error:', err.message)
      setError('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return

    try {
      const apiUrl = import.meta.env.DEV 
        ? `/api/board-members.php?id=${id}`
        : `${BACKEND_URL}/api/board-members.php?id=${id}`
      
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setMembers(members.filter(item => item.id !== id))
      } else {
        alert('Failed to delete member: ' + data.message)
      }
    } catch (err) {
      alert('Error deleting member: ' + err.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>إدارة أعضاء مجلس الإدارة</h1>
        <Link
          to="/admin/about/board-members/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> Add Member
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
          <p className="text-gray-600 mt-4">Loading members...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <Users size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">No board members yet</p>
          <Link
            to="/admin/about/board-members/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> Add First Member
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead style={{ backgroundColor: '#0E4B33' }}>
              <tr>
                <th className="px-4 py-3 text-left text-white">Name</th>
                <th className="px-4 py-3 text-left text-white">Role</th>
                <th className="px-4 py-3 text-left text-white">Email</th>
                <th className="px-4 py-3 text-left text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={member.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td className="px-4 py-3 font-semibold">{member.name}</td>
                  <td className="px-4 py-3">{member.role}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{member.email || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/about/board-members/edit/${member.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded text-white text-sm transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#C89B3C' }}
                      >
                        <Edit2 size={16} /> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white text-sm transition-opacity hover:opacity-90"
                      >
                        <Trash2 size={16} /> Delete
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

export default BoardMembersManage
