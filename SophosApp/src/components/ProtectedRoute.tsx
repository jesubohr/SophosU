import { useLocation, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

interface IProtectedRouteProps {
  children: JSX.Element
}
export const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
  const { token, refreshToken, onRefresh } = useAuth()
  const { pathname } = useLocation()

  if (!token && !refreshToken) {
    const previousPath = pathname.split("/").pop()
    const newPathname = previousPath
      ? `/login?redirect=${previousPath}`
      : "/login"
    return <Navigate to={newPathname} replace />
  } else if (!token && refreshToken) {
    ;(async () => {
      await onRefresh()
      return <Navigate to={pathname} replace />
    })()
  }
  return children
}
