import type { Course, PutCourse, GetCourse, GetCourses } from "./types"
import { exclude } from "../utils/services"
import { DB } from "../database"

export const maxItemsPerPage = 20
export const getMaxPage = async () => Math.ceil(await DB.course.count() / maxItemsPerPage)

export async function getAllCourses (page: number): Promise<GetCourses[]> {
  const courses = await DB.course.findMany({
    skip: (page - 1) * maxItemsPerPage,
    take: maxItemsPerPage,
    select: {
      code: true,
      name: true,
      precourse: {
        select: { name: true }
      },
      required_credits: true,
      max_students: true,
      enrolled_students: true
    }
  })

  const filteredCourses = courses.map(course => {
    return {
      ...exclude(course, 'max_students', 'enrolled_students'),
      available_quota: course.max_students - course.enrolled_students,
      precourse: course.precourse?.name,
    }
  })

  return filteredCourses
}

export async function getCourseByCode (code: string): Promise<GetCourse> {
  const course = await DB.course.findUnique({
    where: { code },
    include: {
      precourse: {
        select: { name: true }
      },
      faculty: {
        select: { name: true },
      },
      assigned_teacher: {
        select: {
          teacher: {
            select: { code: true, fullname: true }
          }
        }
      },
      current_students: {
        select: {
          student: {
            select: { code: true, fullname: true }
          }
        }
      }
    }
  })
  if (!course) throw new Error()

  const filteredCourse = {
    ...exclude(course, 'id', 'precourse_id', 'faculty_id'),
    precourse: course.precourse?.name,
    faculty: course.faculty.name,
    assigned_teacher: course.assigned_teacher?.teacher,
    current_students: course.current_students.map(({ student }) => student),
  }

  return filteredCourse
}

export async function createCourse (course: Course) {
  return await DB.course.create({ data: course })
}

export async function updateCourse (code: string, course: PutCourse) {
  return await DB.course.update({ where: { code }, data: course })
}

export async function deleteCourse (code: string) {
  return await DB.course.delete({ where: { code } })
}
