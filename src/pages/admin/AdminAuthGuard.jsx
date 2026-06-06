import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAdminAuth, ADMIN_KEY } from '../../context/AdminAuthContext'

/** For protected admin routes: redirect to login if not authenticated */
export default function AdminAuthGuard() {
  const { isAuthenticated, loading } = useAdminAuth()
  const hasStoredAuth = typeof window !== 'undefined' && localStorage.getItem(ADMIN_KEY) === 'true'
  const isAuth = isAuthenticated || hasStoredAuth

  if (loading && !hasStoredAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0E4B33' }}>
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />
  }
  return <Outlet />
}
