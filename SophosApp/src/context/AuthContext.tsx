import type { IAuthContext, AuthProviderProps, UserProp } from "@/types/AuthContext"
import { useState, createContext, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useCookie } from "@/hooks/useCookie"
import { fetchUserToken } from "@/api/auth"

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [sessionToken, setSessionToken] = useCookie('user_session', '')
  const [token, setToken] = useState(sessionToken)

  const navigate = useNavigate()
  const { search } = useLocation()

  async function handleLogin (user: UserProp) {
    const { token } = await fetchUserToken(user)
    if(!token) return

    setToken(token)
    setSessionToken(token)

    // Redirect to the page the user was trying to access
    const redirect = search.split('=').pop() || '/'
    navigate(redirect)
  }

  async function handleLogout () {
    setToken('')
    setSessionToken('')
    navigate('/login')
  }

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return (
    <AuthContext.Provider value={ value }>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
