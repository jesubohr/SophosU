import type { Request, Response } from "express"
import { getUserByEmail, createUser } from "../services/auth.services"
import {
  REFRESH_TOKENS,
  comparePassword, hashPassword,
  verifyToken, createToken
} from "../utils/auth"

export async function Login (req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" })

  const user = await getUserByEmail(email)
  if (!user) return res.status(404).json({ error: "User not found" })

  const isPasswordCorrect = await comparePassword(password, user.password)
  if (!isPasswordCorrect) return res.status(401).json({ error: "Incorrect password" })

  const token = createToken(user.email, "access")
  const refreshToken = createToken(user.email, "refresh")
  REFRESH_TOKENS.add(refreshToken)
  return res.status(200).json({ token, refreshToken })
}

export async function Logout (req: Request, res: Response) {
  const { refreshToken } = req.body
  REFRESH_TOKENS.delete(refreshToken)
  return res.status(204).json(null)
}

export async function Register (req: Request, res: Response) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: "Missing email or password" })

  const user = await getUserByEmail(email)
  if (user) return res.status(400).json({ error: "User already exists" })

  const hashedPassword = await hashPassword(password)
  await createUser(email, hashedPassword)

  const token = createToken(email, "access")
  const refreshToken = createToken(email, "refresh")
  REFRESH_TOKENS.add(refreshToken)
  return res.status(200).json({ token, refreshToken })
}

export async function refreshToken(req: Request, res: Response) {
  const { refreshToken } = req.body
  if (!refreshToken) return res.status(401).json({ error: "Access denied. No token provided" })
  if (!REFRESH_TOKENS.has(refreshToken)) return res.status(403).json({ error: "Access denied. Invalid token" })

  try {
    const decoded = verifyToken(refreshToken, "refresh")
    if(!decoded) return res.status(403).json({ error: "Access denied. Invalid token" })

    try {
      const token = createToken(decoded.sub as string, "refresh")
      return res.status(200).json({ token })
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" })
    }
  } catch (error) {
    REFRESH_TOKENS.delete(refreshToken)
    res.status(403).json({ error: "Access denied. Invalid token" })
  }
}
