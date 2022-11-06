import type { Request, Response } from "express"
import * as CourseServices from "../services/course.services"

export async function getAllCourses (req: Request, res: Response) {
  const { page } = req.query
  const maxPage = await CourseServices.getMaxPage()

  const possiblePage = page ? parseInt(page as string) : 1
  const currentPage = possiblePage > 0
    ? possiblePage <= maxPage
      ? possiblePage
      : maxPage
    : 1

  try {
    const students = await CourseServices.getAllCourses(currentPage)
    return res.json({ status: 'OK', page: currentPage, data: students })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getCourseByCode (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing student code' })

  try {
    const student = await CourseServices.getCourseByCode(code)
    return res.json({ status: 'OK', data: student })
  } catch (error) {
    return res.status(404).json({ error: 'Course not found' })
  }
}

export async function createCourse (req: Request, res: Response) {
  const {
    code, name, precourse_id,
    faculty_id, required_credits,
    max_students, enrolled_students
  } = req.body

  if (
    !code || !name || !precourse_id ||
    !faculty_id || !required_credits ||
    !max_students || !enrolled_students
  ) return res.status(400).json({ error: 'Missing course data' })

  try {
    const course = await CourseServices.createCourse({
      code, name, precourse_id,
      faculty_id, required_credits,
      max_students, enrolled_students
    })
    return res.status(201).json({ status: 'OK', data: course })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateCourse (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing course code' })

  const {
    name, precourse_id,
    faculty_id, required_credits,
    max_students, enrolled_students
  } = req.body

  if (
    !name && !precourse_id &&
    !faculty_id && !required_credits &&
    !max_students && !enrolled_students
  ) return res.status(400).json({ error: 'Missing course data' })

  try {
    const updatedCourse = await CourseServices.updateCourse(code, {
      name, precourse_id,
      faculty_id, required_credits,
      max_students, enrolled_students
    })
    return res.json({ status: 'OK', data: updatedCourse })
  } catch (error) {
    return res.status(404).json({ error: 'Course not found' })
  }
}

export async function deleteCourse (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing course code' })

  try {
    const course = await CourseServices.deleteCourse(code)
    return res.json({ status: 'OK', data: course }) 
  } catch (error) {
    return res.status(404).json({ error: 'Course not found' })
  }
}
