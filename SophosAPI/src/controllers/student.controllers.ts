import type { Request, Response } from "express"
import type { CourseType } from "../services/student.services"
import * as StudentServices from "../services/student.services"

export async function getAllStudents (req: Request, res: Response) {
  const { page } = req.query
  const maxPage = await StudentServices.getMaxPage()
  const maxItems = StudentServices.maxItemsPerPage

  const possiblePage = page ? parseInt(page as string) : 1
  const currentPage = possiblePage > 0
    ? possiblePage <= maxPage
      ? possiblePage
      : maxPage
    : 1

  try {
    const students = await StudentServices.getAllStudents(currentPage)
    return res.json({
      status: 'OK',
      page: currentPage,
      maxPage,
      maxItems,
      data: students
    })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getStudentByCode (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing student code' })

  try {
    const student = await StudentServices.getStudentByCode(code)
    return res.json({ status: 'OK', data: student })
  } catch (error) {
    return res.status(404).json({ error: 'Student not found' })
  }
}

export async function createStudent (req: Request, res: Response) {
  const {
    code, fullname, birthdate,
    cellphone, email, password,
    faculty_id, enrolled_credits, current_semester
  } = req.body

  if (
    !code || !fullname || !birthdate ||
    !cellphone || !email || !password ||
    !faculty_id || !enrolled_credits || !current_semester
  ) return res.status(400).json({ error: 'Missing student data' })

  try {
    const student = await StudentServices.createStudent({
      code, fullname, birthdate,
      cellphone, email, password,
      faculty_id, enrolled_credits, current_semester
    })
    return res.status(201).json({ status: 'OK', data: student })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function updateStudent (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing student code' })

  const {
    fullname, birthdate,
    cellphone, email, password,
    faculty_id, enrolled_credits, current_semester
  } = req.body

  if (
    !fullname && !birthdate &&
    !cellphone && !email && !password &&
    !faculty_id && !enrolled_credits && !current_semester
  ) return res.status(400).json({ error: 'Missing student data' })

  try {
    const updatedStudent = await StudentServices.updateStudent(code, {
      fullname, birthdate,
      cellphone, email, password,
      faculty_id, enrolled_credits, current_semester
    })
    return res.json({ status: 'OK', data: updatedStudent })
  } catch (error) {
    return res.status(404).json({ error: 'Student not found' })
  }
}

export async function deleteStudent (req: Request, res: Response) {
  const { code } = req.params
  if (!code) return res.status(400).json({ error: 'Missing student code' })

  try {
    const student = await StudentServices.deleteStudent(code)
    return res.json({ status: 'OK', data: student }) 
  } catch (error) {
    return res.status(404).json({ error: 'Student not found' })
  }
}

export async function addCourse (req: Request, res: Response) {
  const service = req.path.split('/')[1] as CourseType

  const { student_id, course_id } = req.body
  if (!student_id || !course_id) return res.status(400).json({ error: 'Missing student or course id' })

  try {
    const studentCourse = await StudentServices.addCourse(service, student_id, course_id)
    return res.json({ status: 'OK', data: studentCourse })
  } catch (error) {
    return res.status(404).json({ error: 'Student or Course not found' })
  }
}

export async function deleteCourse (req: Request, res: Response) {
  const service = req.path.split('/')[1] as CourseType

  const { student_id, course_id } = req.body
  if (!student_id || !course_id) return res.status(400).json({ error: 'Missing student or course id' })

  try {
    const studentCourse = await StudentServices.deleteCourse(service, student_id, course_id)
    return res.json({ status: 'OK', data: studentCourse })
  } catch (error) {
    return res.status(404).json({ error: 'Student or Course not found' })
  }
}

export async function getStudentsCount(_: Request, res: Response) {
  try {
    const count = await StudentServices.getStudentsCount()
    return res.json({ status: 'OK', data: count })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
