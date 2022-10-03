import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface IProtectedRouteProps {
  children: JSX.Element
}
export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { token } = useAuth()
  const { pathname } = useLocation()

  if (!token) {
    const previousPath = pathname.split('/').pop()
    const newPathname = previousPath ? `/login?redirect=${previousPath}` : '/login'
    return <Navigate to={ newPathname } replace />
  } 
  return children
}
