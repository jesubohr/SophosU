import type { UserProp } from '@/types/AuthContext'

const mockFetch = (url: string, options: any) => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'averysecuretoken' })
  })
}

export async function fetchUserToken (user: UserProp) {
  const response = await mockFetch('API-URL', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
  return response.json()
}
