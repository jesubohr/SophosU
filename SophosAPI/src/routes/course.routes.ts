import { Router } from "express"
import {
  getAllCourses,
  getCourseByCode,
  createCourse,
  updateCourse,
  deleteCourse
} from "../controllers/course.controllers"
const router = Router()

export default router
  .get('/', getAllCourses)
  .get('/:code', getCourseByCode)
  .post('/', createCourse)
  .put('/:code', updateCourse)
  .delete('/:code', deleteCourse)
