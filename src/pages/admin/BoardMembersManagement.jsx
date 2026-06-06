import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, Users, Globe } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { getImageUrl } from '../../utils/imageUrl'

const translations = {
  en: {
    board_members_management: 'Board Members Management',
    add_member: 'Add Member',
    loading_members: 'Loading members...',
    error_label: 'Error: ',
    try_again: 'Try Again',
    no_members: 'No board members yet',
    add_first_member: 'Add First Member',
    no_role: 'No Role',
    no_email: '📧 No email',
    edit: 'Edit',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this member?',
    deleted_success: 'Member deleted successfully',
    delete_failed: 'Failed to delete member:',
    delete_error: 'Error deleting member:'
  },
  ar: {
    board_members_management: 'إدارة أعضاء المجلس',
    add_member: 'إضافة عضو',
    loading_members: 'جاري تحميل الأعضاء...',
    error_label: 'خطأ: ',
    try_again: 'حاول مرة أخرى',
    no_members: 'لا توجد أعضاء في المجلس',
    add_first_member: 'إضافة أول عضو',
    no_role: 'لا يوجد دور',
    no_email: '📧 لا يوجد بريد إلكتروني',
    edit: 'تعديل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذا العضو؟',
    deleted_success: 'تم حذف العضو بنجاح',
    delete_failed: 'فشل حذف العضو:',
    delete_error: 'خطأ في حذف العضو:'
  }
}

const BoardMembersManagement = () => {
  const navigate = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'
  
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en')
  const t = translations[language]

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'en')
    }
    window.addEventListener('languageChanged', handleLanguageChange)
    return () => window.removeEventListener('languageChanged', handleLanguageChange)
  }, [])

  useEffect(() => {
    fetchMembers()
  }, [language])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // In development: use /api proxy (Vite forwards to backend)
      // In production: use full backend URL
      const apiUrl = import.meta.env.DEV 
        ? `/api/board-members.php?lang=${language}`
        : `${BACKEND_URL}/api/board-members.php?lang=${language}`
      
      console.log('Fetching from:', apiUrl, 'DEV:', import.meta.env.DEV)
      
      const response = await fetch(apiUrl)
      console.log('Response status:', response.status)
      
      // Try to parse JSON regardless of content-type
      let data
      try {
        data = await response.json()
      } catch (parseErr) {
        const text = await response.text()
        console.error('Failed to parse JSON response:', text.substring(0, 500))
        setError('Invalid response from server. Please check browser console.')
        return
      }
      
      console.log('API Response:', data)
      
      if (data.success && data.data) {
        setMembers(Array.isArray(data.data) ? data.data : [data.data])
        setError(null)
      } else {
        setError(data.message || 'Failed to fetch members')
        setMembers([])
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError(`${t.error_label} ${err.message}`)
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(t.delete_confirmation)) return

    try {
      setLoading(true)
      const apiUrl = import.meta.env.DEV 
        ? `/api/board-members.php?id=${id}`
        : `${BACKEND_URL}/api/board-members.php?id=${id}`
      
      const response = await fetch(apiUrl, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        setMembers(members.filter(item => item.id !== id))
        alert(t.deleted_success)
      } else {
        alert(t.delete_failed + ' ' + data.message)
      }
    } catch (err) {
      alert(t.delete_error + ' ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>
          {t.board_members_management}
        </h1>
        
        <Link
          to="/admin/board-members/add"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#C89B3C' }}
        >
          <Plus size={20} /> {t.add_member}
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <Loader className="inline-block animate-spin" size={40} style={{ color: '#C89B3C' }} />
          <p className="text-gray-600 mt-4">{t.loading_members}</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchMembers}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            {t.try_again}
          </button>
        </div>
      ) : members.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <Users size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">{t.no_members}</p>
          <Link
            to="/admin/board-members/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.add_first_member}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
            >
              {/* Member Image - Top */}
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                {member.image ? (
                  <img
                    src={getImageUrl(member.image)}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                    onError={(e) => e.target.src = '/images/placeholder.jpg'}
                  />
                ) : (
                  <Users size={64} className="text-gray-300" />
                )}
              </div>

              {/* Member Info - Content */}
              <div className="p-5">
                {/* Name */}
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">
                  {member.name || '—'}
                </h3>

                {/* Role */}
                <p className="text-sm font-medium text-green-600 mb-2" style={{ color: '#0E4B33' }}>
                  {member.role || t.no_role}
                </p>

                {/* Bio/Description */}
                {member.bio && (
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {member.bio}
                  </p>
                )}

                {/* Email */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  {member.email ? (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-xs text-blue-600 hover:underline break-all"
                      title={member.email}
                    >
                      📧 {member.email}
                    </a>
                  ) : (
                    <p className="text-xs text-gray-500">{t.no_email}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
                  <Link
                    to={`/admin/board-members/edit/${member.id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded text-white text-xs font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#C89B3C' }}
                  >
                    <Edit2 size={14} />
                    {t.edit}
                  </Link>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 rounded bg-red-500 text-white text-xs font-semibold transition-opacity hover:opacity-90"
                  >
                    <Trash2 size={14} />
                    {t.delete}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default BoardMembersManagement
