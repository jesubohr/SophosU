export interface IAuthContext {
  token: string
  refreshToken: string
  onRegister: (user: UserProp) => Promise<void>
  onLogin: (user: UserProp) => Promise<void>
  onLogout: () => Promise<void>
  onRefresh: () => Promise<void>
}

export type AuthProviderProps = { children: JSX.Element }

export type UserProp = { email: string, password: string }
