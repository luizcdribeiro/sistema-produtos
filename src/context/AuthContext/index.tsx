import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { AuthContextProps, User } from './interfaces'
import axios from 'axios'

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const token = localStorage.getItem('token')

    if (storedUser && token) {
      const parsedUser = JSON.parse(storedUser)
      setUser(parsedUser)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }, [])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', userData.token)
    axios.defaults.headers.common.Authorization = `Bearer ${userData.token}`
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    delete axios.defaults.headers.common.Authorization
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
