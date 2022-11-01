import { Router } from "express"
import {
  getAllStudents,
  getStudentByCode,
  createStudent,
  updateStudent,
  deleteStudent
} from "../controllers/student.controllers"
const router = Router()

export default router
  .get('/', getAllStudents)
  .get('/:code', getStudentByCode)
  .post('/', createStudent)
  .put('/:code', updateStudent)
  .delete('/:code', deleteStudent)
