'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserRole = 'student' | 'teacher' | 'principal' | 'parent' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  classId?: string // for students and teachers
  childrenIds?: string[] // for parents
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo users for testing
const DEMO_USERS: Record<string, Record<string, User>> = {
  student: {
    'student@school.com': {
      id: 'STU001',
      name: 'Alex Johnson',
      email: 'student@school.com',
      role: 'student',
      classId: 'CLASS-10A',
    },
  },
  teacher: {
    'teacher@school.com': {
      id: 'TEA001',
      name: 'Dr. Sarah Johnson',
      email: 'teacher@school.com',
      role: 'teacher',
      classId: 'CLASS-10A',
    },
  },
  principal: {
    'principal@school.com': {
      id: 'PRI001',
      name: 'Mr. David Brown',
      email: 'principal@school.com',
      role: 'principal',
    },
  },
  parent: {
    'parent@school.com': {
      id: 'PAR001',
      name: 'Mrs. Emily Johnson',
      email: 'parent@school.com',
      role: 'parent',
      childrenIds: ['STU001'],
    },
  },
  admin: {
    'admin@school.com': {
      id: 'ADM001',
      name: 'Admin User',
      email: 'admin@school.com',
      role: 'admin',
    },
  },
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('[v0] Failed to parse stored user:', error)
        localStorage.removeItem('currentUser')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const roleUsers = DEMO_USERS[role]
      if (!roleUsers || !roleUsers[email]) {
        throw new Error('Invalid credentials')
      }

      // Demo: password is always 'password'
      if (password !== 'password') {
        throw new Error('Invalid credentials')
      }

      const foundUser = roleUsers[email]
      setUser(foundUser)
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
    } catch (error) {
      setUser(null)
      localStorage.removeItem('currentUser')
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
