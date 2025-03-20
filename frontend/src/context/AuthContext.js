import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null)

  const getRoleFromToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decodedToken = jwtDecode(token)
        const userRole = decodedToken.role
        setRole(userRole)
      } catch (error) {
        console.error('Error decoding token', error)
        setRole(null)
      }
    }
  }

  useEffect(() => {
    getRoleFromToken()
  }, [])

  return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>
}

// Export AuthProvider dưới dạng mặc định
export default AuthProvider
