import type { Request, Response, NextFunction } from "express"
import { verifyToken } from "../utils/auth"

export async function authenticateToken (req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) return res.status(401).json({ error: "Access denied. No token provided" })

  try {
    const decoded = verifyToken(token, "access")
    if(!decoded) return res.status(403).json({ error: "Access denied. Invalid token" })
    next()
  } catch (error) {
    res.status(403).json({ error: "Access denied. Invalid token" })
  }
}
