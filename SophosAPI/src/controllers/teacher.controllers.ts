import type { Request, Response } from "express"
import * as TeacherServices from "../services/teacher.services"

export async function getAllTeachers (req: Request, res: Response) {
  const { page } = req.query
  const maxPage = await TeacherServices.getMaxPage()
  const maxItems = TeacherServices.maxItemsPerPage

  const possiblePage = page ? parseInt(page as string) : 1
  const currentPage = possiblePage > 0
    ? possiblePage <= maxPage
      ? possiblePage
      : maxPage
    : 1

  try {
    const teachers = await TeacherServices.getAllTeachers(currentPage)
    return res.json({
      status: 'OK',
      page: currentPage,
      maxPage,
      maxItems,
      data: teachers
    })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getTeacherByCode (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing teacher code' })

  try {
    const teacher = await TeacherServices.getTeacherByCode(code)
    return res.json({ status: 'OK', data: teacher })
  } catch (error) {
    return res.status(404).json({ error: 'Teacher not found' })
  }
}

export async function createTeacher (req: Request, res: Response) {
  const {
    code, fullname, birthdate,
    cellphone, email, password,
    faculty_id, academic_title, years_experience
  } = req.body

  if (
    !code || !fullname || !birthdate ||
    !cellphone || !email || !password ||
    !faculty_id || !academic_title || !years_experience
  ) return res.status(400).json({ error: 'Missing teacher data' })

  try {
    const teacher = await TeacherServices.createTeacher({
      code, fullname, birthdate,
      cellphone, email, password,
      faculty_id, academic_title, years_experience
    })
    return res.status(201).json({ status: 'OK', data: teacher })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateTeacher (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing teacher code' })

  const {
    fullname, birthdate,
    cellphone, email, password,
    faculty_id, academic_title, years_experience
  } = req.body

  if (
    !fullname && !birthdate &&
    !cellphone && !email && !password &&
    !faculty_id && !academic_title && !years_experience
  ) return res.status(400).json({ error: 'Missing teacher data' })

  try {
    const updatedTeacher = await TeacherServices.updateTeacher(code, {
      fullname, birthdate,
      cellphone, email, password,
      faculty_id, academic_title, years_experience
    })
    return res.json({ status: 'OK', data: updatedTeacher })
  } catch (error) {
    return res.status(404).json({ error: 'Teacher not found' })
  }
}

export async function deleteTeacher (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing teacher code' })

  try {
    const teacher = await TeacherServices.deleteTeacher(code)
    return res.json({ status: 'OK', data: teacher }) 
  } catch (error) {
    return res.status(404).json({ error: 'Teacher not found' })
  }
}

export async function addCourse(req: Request, res: Response) {
  const { teacher_id, course_id } = req.body
  if (!teacher_id || !course_id) return res.status(400).json({ error: 'Missing teacher or course id' })

  try {
    const teacherCourse = await TeacherServices.addCourse(teacher_id, course_id)
    return res.json({ status: 'OK', data: teacherCourse })
  } catch (error) {
    return res.status(404).json({ error: 'Teacher or Course not found' })
  }
}

export async function deleteCourse(req: Request, res: Response) {
  const { teacher_id, course_id } = req.body
  if (!teacher_id || !course_id) return res.status(400).json({ error: 'Missing teacher or course id' })

  try {
    const teacherCourse = await TeacherServices.deleteCourse(teacher_id, course_id)
    return res.json({ status: 'OK', data: teacherCourse })
  } catch (error) {
    return res.status(404).json({ error: 'Teacher or Course not found' })
  }
}

export async function getTeachersCount(_: Request, res: Response) {
  try {
    const count = await TeacherServices.getTeachersCount()
    return res.json({ status: 'OK', data: count })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
