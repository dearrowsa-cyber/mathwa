import React from 'react'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

export default function AdminGuard() {
  const { isAuthenticated, loading } = useAdminAuth()
  const location = useLocation()
  const pathname = (location.pathname || '').replace(/\/$/, '')
  const isLoginPage = pathname === '/admin/login'
  const isAdminRoot = pathname === '/admin'

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0E4B33' }}>
        <div className="text-white text-lg">Loading...</div>
      </div>
    )
  }

  if (isAdminRoot) {
    return <Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} replace />
  }

  if (isLoginPage) {
    if (isAuthenticated) {
      return <Navigate to="/admin/dashboard" replace />
    }
    return <Outlet />
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
