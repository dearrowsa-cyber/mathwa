import React, { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, Loader, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const translations = {
  en: {
    org_members_management: 'Organization Members Management',
    add_member: 'Add Member',
    loading_members: 'Loading members...',
    no_members: 'No organization members yet',
    add_first_member: 'Add First Member',
    name: 'Name',
    role: 'Role',
    department: 'Department',
    email: 'Email',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    delete_confirmation: 'Are you sure you want to delete this member?',
    delete_failed: 'Failed to delete member:',
    delete_error: 'Error deleting member:',
    failed_fetch: 'Failed to fetch members'
  },
  ar: {
    org_members_management: 'إدارة أعضاء المنظمة',
    add_member: 'إضافة عضو',
    loading_members: 'جاري تحميل الأعضاء...',
    no_members: 'لا توجد أعضاء منظمة حتى الآن',
    add_first_member: 'إضافة أول عضو',
    name: 'الاسم',
    role: 'الدور',
    department: 'القسم',
    email: 'البريد الإلكتروني',
    actions: 'الإجراءات',
    edit: 'تعديل',
    delete: 'حذف',
    delete_confirmation: 'هل أنت متأكد من رغبتك في حذف هذا العضو؟',
    delete_failed: 'فشل حذف العضو:',
    delete_error: 'خطأ في حذف العضو:',
    failed_fetch: 'فشل في جلب الأعضاء'
  }
}

const OrganizationMembersManagement = () => {
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
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BACKEND_URL}/api/organization-members.php?lang=en`)
      const data = await response.json()
      
      if (data.success) {
        setMembers(data.data || [])
        setError(null)
      } else {
        setError(data.message || 'Failed to fetch members')
      }
    } catch (err) {
      setError(t.failed_fetch)
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm(t.delete_confirmation)) return

    try {
      const response = await fetch(`${BACKEND_URL}/api/organization-members.php?id=${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      
      if (data.success) {
        setMembers(members.filter(item => item.id !== id))
      } else {
        alert(t.delete_failed + ' ' + data.message)
      }
    } catch (err) {
      alert(t.delete_error + ' ' + err.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#0E4B33' }}>{t.org_members_management}</h1>
        <Link
          to="/admin/organization-members/add"
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
        </div>
      ) : members.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <Users size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">{t.no_members}</p>
          <Link
            to="/admin/organization-members/add"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#C89B3C' }}
          >
            <Plus size={20} /> {t.add_first_member}
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead style={{ backgroundColor: '#0E4B33' }}>
              <tr>
                <th className="px-4 py-3 text-left text-white">{t.name}</th>
                <th className="px-4 py-3 text-left text-white">{t.role}</th>
                <th className="px-4 py-3 text-left text-white">{t.department}</th>
                <th className="px-4 py-3 text-left text-white">{t.email}</th>
                <th className="px-4 py-3 text-left text-white">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member, idx) => (
                <tr key={member.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td className="px-4 py-3 font-semibold">{member.name}</td>
                  <td className="px-4 py-3">{member.role}</td>
                  <td className="px-4 py-3 text-gray-600">{member.department || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{member.email || '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/organization-members/edit/${member.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded text-white text-sm transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#C89B3C' }}
                      >
                        <Edit2 size={16} /> {t.edit}
                      </Link>
                      <button
                        onClick={() => handleDelete(member.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded bg-red-500 text-white text-sm transition-opacity hover:opacity-90"
                      >
                        <Trash2 size={16} /> {t.delete}
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


export default OrganizationMembersManagement
