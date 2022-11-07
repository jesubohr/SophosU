import { Router } from "express"
import { Login, Logout, Register, refreshToken } from "../controllers/auth.controllers"
const router = Router()

export default router
  .post("/login", Login)
  .post("/logout", Logout)
  .post("/register", Register)
  .post("/token", refreshToken)
