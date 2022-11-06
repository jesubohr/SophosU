import { Router } from "express"
import {
  getAllFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty
} from "../controllers/faculty.controllers"
const router = Router()

export default router
  .get('/', getAllFaculties)
  .get('/:id', getFacultyById)
  .post('/', createFaculty)
  .put('/:id', updateFaculty)
  .delete('/:id', deleteFaculty)
