export interface IAuthContext {
  token: string
  onRegister: (user: UserProp) => Promise<void>
  onLogin: (user: UserProp) => Promise<void>
  onLogout: () => void
}

export type AuthProviderProps = { children: JSX.Element }

export type UserProp = { email: string, password: string }
