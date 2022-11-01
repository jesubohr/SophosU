import type { Student, PutStudent, GetStundent, GetStundents } from "./types.d"
import { exclude } from "../utils/services"
import { DB } from "../database"

const maxItemsPerPage = 20
export const getMaxPage = async () => Math.ceil(await DB.student.count() / maxItemsPerPage)

export async function getAllStudents (page: number): Promise<GetStundents[]> {
  const students = await DB.student.findMany({
    skip: (page - 1) * maxItemsPerPage,
    take: maxItemsPerPage,
    select: {
      code: true,
      fullname: true,
      enrolled_credits: true,
      faculty: {
        select: { name: true }
      }
    }
  })

  const filteredStudents = students.map(student => {
    return { ...student, faculty: student.faculty.name }
  })

  return filteredStudents
}

export async function getStudentByCode (code: string): Promise<GetStundent> {
  const student = await DB.student.findUnique({
    where: { code },
    include: {
      faculty: {
        select: { name: true },
      },
      enrolled_courses: {
        select: {
          course: {
            select: { code: true, name: true },
          },
        },
      },
      taken_courses: {
        select: {
          course: {
            select: { code: true, name: true },
          },
        },
      },
    }
  })
  if (!student) throw new Error()

  const filteredStudent = {
    ...exclude(student, 'id', 'password', 'faculty_id'),
    faculty: student.faculty.name,
    enrolled_courses: student.enrolled_courses.map(({ course }) => course),
    taken_courses: student.taken_courses.map(({ course }) => course),
  }

  return filteredStudent
}

export async function createStudent (student: Student) {
  return await DB.student.create({ data: student })
}

export async function updateStudent (code: string, student: PutStudent) {
  return await DB.student.update({ where: { code }, data: student })
}

export async function deleteStudent (code: string) {
  return await DB.student.delete({ where: { code } })
}
