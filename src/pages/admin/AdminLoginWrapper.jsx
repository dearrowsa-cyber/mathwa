import React from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import AdminLogin from './AdminLogin'

/** Always shows the login page at /admin/login (no redirect when already logged in) */
export default function AdminLoginWrapper() {
  const { loading } = useAdminAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0E4B33' }}>
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  return <AdminLogin />
}
