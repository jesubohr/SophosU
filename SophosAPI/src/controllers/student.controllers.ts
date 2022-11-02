import type { Request, Response } from "express"
import * as StudentServices from "../services/student.services"

export async function getAllStudents (req: Request, res: Response) {
  const { page } = req.query
  const maxPage = await StudentServices.getMaxPage()

  const possiblePage = page ? parseInt(page as string) : 1
  const currentPage = possiblePage > 0
    ? possiblePage <= maxPage
      ? possiblePage
      : maxPage
    : 1

  try {
    const students = await StudentServices.getAllStudents(currentPage)
    return res.json({ status: 'OK', page: currentPage, data: students })
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
