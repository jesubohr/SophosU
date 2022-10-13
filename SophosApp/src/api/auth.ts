import type { UserProp } from '@/types/AuthContext'

const mockFetch = (url: string, options: any) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'averysecuretoken' })
  })
}

const API_URL = (route: string) => `http://localhost:3000/api/${route}`

export async function userLogin (user: UserProp) {
  const res = await mockFetch(API_URL('login'), {
    method: 'POST',
    body: JSON.stringify(user)
  })
  return res.json()
}

export async function userRegister (user: UserProp) {
  const res = await mockFetch(API_URL('register'), {
    method: 'POST',
    body: JSON.stringify(user)
  })
  return res.json()
}
