import { Router } from "express"
import {
  getAllStudents,
  getStudentByCode,
  createStudent,
  updateStudent,
  deleteStudent,
  addCourse,
  deleteCourse
} from "../controllers/student.controllers"
const router = Router()

export default router
  .get('/', getAllStudents)
  .get('/:code', getStudentByCode)
  .post('/', createStudent)
  .put('/:code', updateStudent)
  .post('/enrolled', addCourse)
  .post('/taken', addCourse)
  .delete('/:code', (req, res) => {
    const { code } = req.params
    if (code === 'enrolled' || code === 'taken') return deleteCourse(req, res)
    return deleteStudent(req, res)
  })
