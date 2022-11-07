import { Router } from "express"
import { Login, Register, refreshToken } from "../controllers/auth.controllers"
const router = Router()

export default router
  .post("/login", Login)
  .post("/register", Register)
  .post("/token", refreshToken)
