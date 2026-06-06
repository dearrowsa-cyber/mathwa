import React, { createContext, useContext, useState, useEffect } from 'react'

export const ADMIN_KEY = 'mathwaa_admin_authenticated'
const ADMIN_USER_KEY = 'mathwaa_admin_user'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://mathwaa.org.sa/Backend'

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem(ADMIN_KEY)
    const savedUser = localStorage.getItem(ADMIN_USER_KEY)
    if (token === 'true' && savedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    setLoginError(null)
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin-login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      })

      // Check if response is ok (200-299)
      if (!response.ok) {
        setLoginError(`Server error: ${response.status} ${response.statusText}. Please check the backend URL.`)
        console.error('HTTP Error:', response.status, response.statusText)
        return false
      }

      // Parse JSON response
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError)
        setLoginError('Invalid server response. Please check the backend URL.')
        return false
      }

      if (!data.success) {
        setLoginError(data.message || 'Login failed. Please check your credentials.')
        return false
      }

      // Store user data
      localStorage.setItem(ADMIN_KEY, 'true')
      localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(data.user))
      setIsAuthenticated(true)
      setUser(data.user)
      return true
    } catch (error) {
      const errorMsg = 'Unable to connect to the server. Please check your internet connection and backend URL.'
      console.error('Login error:', error)
      setLoginError(errorMsg)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem(ADMIN_KEY)
    localStorage.removeItem(ADMIN_USER_KEY)
    setIsAuthenticated(false)
    setUser(null)
    setLoginError(null)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, loginError }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider')
  return ctx
}
