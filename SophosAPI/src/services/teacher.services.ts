import type { Teacher, PutTeacher, GetTeacher, GetTeachers } from "./types"
import { exclude } from "../utils/services"
import { DB } from "../database"

export const maxItemsPerPage = 10
export const getTeachersCount = async () => await DB.teacher.count()
export const getMaxPage = async () => Math.ceil(await getTeachersCount() / maxItemsPerPage)

export async function getAllTeachers (page: number): Promise<GetTeachers[]> {
  const teachers = await DB.teacher.findMany({
    skip: (page - 1) * maxItemsPerPage,
    take: maxItemsPerPage,
    select: {
      code: true,
      fullname: true,
      academic_title: true,
      years_experience: true
    }
  })

  return teachers
}

export async function getTeacherByCode (code: string): Promise<GetTeacher> {
  const teacher = await DB.teacher.findUnique({
    where: { code },
    include: {
      faculty: {
        select: { name: true },
      },
      taught_courses: {
        select: {
          course: {
            select: { code: true, name: true },
          },
        },
      },
    }
  })
  if (!teacher) throw new Error()

  const filteredTeacher = {
    ...exclude(teacher, 'password', 'faculty_id'),
    faculty: teacher.faculty.name,
    taught_courses: teacher.taught_courses.map(({ course }) => course),
  }

  return filteredTeacher
}

export async function createTeacher (teacher: Teacher) {
  return await DB.teacher.create({ data: teacher })
}

export async function updateTeacher (code: string, teacher: PutTeacher) {
  return await DB.teacher.update({ where: { code }, data: teacher })
}

export async function deleteTeacher (code: string) {
  return await DB.teacher.delete({ where: { code } })
}

export async function addCourse (teacher_id: number, course_id: number) {
  return await DB.teacher_has_Course.create({
    data: { teacher_id, course_id }
  })
}

export async function deleteCourse (teacher_id: number, course_id: number) {
  return await DB.teacher_has_Course.delete({
    where: { teacher_course: { teacher_id, course_id } }
  })
}
