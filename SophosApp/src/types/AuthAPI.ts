export type AuthResponse = {
  token: string
  refreshToken: string
  error?: string
}

export type PagedResponse<T> = {
  data: T[]
  page: number
  maxPage: number
  maxItems: number
}
