import { Router } from "express"
import {
  getAllTeachers,
  getTeacherByCode,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  addCourse,
  deleteCourse,
  getTeachersCount
} from "../controllers/teacher.controllers"
const router = Router()

export default router
  .get('/', getAllTeachers)
  .get('/:code', getTeacherByCode)
  .post('/', createTeacher)
  .put('/:code', updateTeacher)
  .post('/courses', addCourse)
  .delete('/:code', (req, res) => {
    const { code } = req.params
    if (code === 'courses') return deleteCourse(req, res)
    return deleteTeacher(req, res)
  })
  .get('/count', getTeachersCount)
