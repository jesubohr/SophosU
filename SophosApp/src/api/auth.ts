import type { UserProp } from "@/types/AuthContext"
import type { AuthResponse } from "@/types/AuthAPI"
import { API_URL } from "./utils"

export async function userLogin(user: UserProp): Promise<AuthResponse> {
  const res = await fetch(API_URL("auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  return res.json()
}

export async function userRegister(user: UserProp): Promise<AuthResponse> {
  const res = await fetch(API_URL("auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
  return res.json()
}

export async function userLogout(refreshToken: string) {
  return await fetch(API_URL("auth/logout"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  })
}

export async function userRefreshToken(refreshToken: string) {
  const res = await fetch(API_URL("auth/token"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ refreshToken })
  })
  return res.json()
}
