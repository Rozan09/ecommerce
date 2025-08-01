import React, { createContext, useEffect, useState, useCallback } from 'react'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")
        
        if (storedToken) {
          setToken(storedToken)
        }
        
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error('Error initializing auth state:', error)
        // Clear corrupted data
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // Login function
  const login = useCallback((userData, userToken) => {
    try {
      setToken(userToken)
      setUser(userData)
      localStorage.setItem("token", userToken)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error('Error during login:', error)
      throw new Error('Failed to save login data')
    }
  }, [])

  // Logout function
  const logout = useCallback(() => {
    try {
      setToken(null)
      setUser(null)
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }, [])

  // Update user data
  const updateUser = useCallback((userData) => {
    try {
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error('Error updating user data:', error)
    }
  }, [])

  // Check if user is authenticated
  const isAuthenticated = useCallback(() => {
    return !!token
  }, [token])

  const value = {
    token,
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
