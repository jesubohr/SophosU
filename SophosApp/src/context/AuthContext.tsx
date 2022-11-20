import type {
  IAuthContext,
  AuthProviderProps,
  UserProp
} from "@/types/AuthContext"
import { createContext, useContext } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useCookie } from "@/hooks/useCookie"
import {
  userLogin,
  userRegister,
  userLogout,
  userRefreshToken
} from "@/api/auth"

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [sessionToken, setSessionToken] = useCookie("user_session", {
    expSeconds: 15 * 60
  })
  const [refreshToken, setRefreshToken] = useCookie("user_refresh_session", {
    expSeconds: 7 * 24 * 60 * 60
  })

  const navigate = useNavigate()
  const { search } = useLocation()

  async function handleRegister(user: UserProp) {
    const { token, refreshToken, error } = await userRegister(user)
    if (error) return console.error(error)
    setSessionToken(token)
    setRefreshToken(refreshToken)

    navigate("/")
  }

  async function handleLogin(user: UserProp) {
    const { token, refreshToken, error } = await userLogin(user)
    if (error) return console.error(error)
    setSessionToken(token)
    setRefreshToken(refreshToken)

    // Redirect to the page the user was trying to access
    const redirect = search.split("=").pop() || "/"
    navigate(redirect)
  }

  async function handleLogout() {
    await userLogout(refreshToken)
    setSessionToken("")
    setRefreshToken("")
    navigate("/login")
  }

  async function handleRefreshToken() {
    const { token, error } = await userRefreshToken(refreshToken)
    if (error) return console.error(error)
    setSessionToken(token)
  }

  const value = {
    token: sessionToken,
    refreshToken,
    onRegister: handleRegister,
    onLogin: handleLogin,
    onLogout: handleLogout,
    onRefresh: handleRefreshToken
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
