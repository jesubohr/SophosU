export interface IAuthContext {
  token: string
  onLogin: (user: UserProp) => void
  onLogout: () => void
}

export type AuthProviderProps = {
  children: JSX.Element
}

export type UserProp = { email: string, password: string }
