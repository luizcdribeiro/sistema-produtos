import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loading from '../../components/Loading'

export const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loading />
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />
}
