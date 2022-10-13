import type { IAuthContext, AuthProviderProps, UserProp } from "@/types/AuthContext"
import { useState, createContext, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useCookie } from "@/hooks/useCookie"
import { userLogin, userRegister } from "@/api/auth"

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [sessionToken, setSessionToken] = useCookie('user_session', '')
  const [token, setToken] = useState(sessionToken)

  const navigate = useNavigate()
  const { search } = useLocation()

  async function handleRegister (user: UserProp) {
    const { token } = await userRegister(user)
    if (!token) return

    setToken(token)
    setSessionToken(token)

    navigate('/')
  }

  async function handleLogin (user: UserProp) {
    const { token } = await userLogin(user)
    if(!token) return

    setToken(token)
    setSessionToken(token)

    // Redirect to the page the user was trying to access
    const redirect = search.split('=').pop() || '/'
    navigate(redirect)
  }

  function handleLogout () {
    setToken('')
    setSessionToken('')
    navigate('/login')
  }

  const value = {
    token,
    onRegister: handleRegister,
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
