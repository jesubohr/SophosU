import { sign, verify } from "jsonwebtoken"
import { hash, compare } from "bcrypt"

// Password
export async function comparePassword (password: string, hash: string) {
  return await compare(password, hash)
}

export async function hashPassword (password: string) {
  return await hash(password, 10)
}

// Token
export const REFRESH_TOKENS = new Set<string>()

export function verifyToken (token: string, type: "access" | "refresh") {
  const secret = (type === "access")
    ? process.env.ACCESS_TOKEN_SECRET!
    : process.env.REFRESH_TOKEN_SECRET!
  return verify(token, secret)
}

export function createToken (user_email: string, type: "access" | "refresh") {
  const payload = { sub: user_email }
  const secret = (type === "access")
    ? process.env.ACCESS_TOKEN_SECRET!
    : process.env.REFRESH_TOKEN_SECRET!
  const options = (type === "access")
    ? { algorithm: "HS512", expiresIn: "15m" } as const
    : { algorithm: "HS512", expiresIn: "7d" } as const
  return sign(payload, secret, options)
}
