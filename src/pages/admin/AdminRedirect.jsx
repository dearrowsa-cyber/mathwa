import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAdminAuth } from '../../context/AdminAuthContext'

/** Renders when user visits exactly /admin - redirect to login or dashboard */
export default function AdminRedirect() {
  const { isAuthenticated, loading } = useAdminAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#0E4B33' }}>
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  return <Navigate to={isAuthenticated ? '/admin/dashboard' : '/admin/login'} replace />
}
