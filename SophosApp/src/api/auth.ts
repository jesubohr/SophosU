import type { UserProp } from '@/types/AuthContext'
const API_URL = (route: string) => `http://localhost:3000/api/${route}`

function mockFetch<T> (url: string, options: any = {}) {
  const wait = (ms: number) => new Promise(rs => setTimeout(rs, ms))
  return Promise.resolve({
    ok: true,
    json: async (data: any) => {
      await wait(1000)
      return data as T
    },
  })
}

// Authentication
export async function userLogin (user: UserProp) {
  const res = await mockFetch(API_URL('login'), {
    method: 'POST',
    body: JSON.stringify(user)
  })
  return res.json({ token: 'averysecuretoken' })
}
export async function userRegister (user: UserProp) {
  const res = await mockFetch(API_URL('register'), {
    method: 'POST',
    body: JSON.stringify(user)
  })
  return res.json({ token: 'averysecuretoken' })
}
export async function userLogout () {
  const res = await mockFetch(API_URL('logout'), {
    method: 'POST'
  })
  return res.json({})
}

// Records CRUD
import { StudentsExample } from "@/examples/Students"
import type { Student } from "@/types/RecordModel"
export async function getStudents () {
  const res = await mockFetch<Student[]>(API_URL('students'))
  if (!res.ok) throw new Error('Error fetching students')
  return res.json(StudentsExample)
}
export async function getStudent (code: string) {
  const res = await mockFetch<Student>(API_URL(`students/${code}`))
  if (!res.ok) throw new Error('Error fetching student')
  return res.json(StudentsExample.find(s => s.code === code))
}
export async function createStudent (student: Student) {
  const res = await mockFetch<Student>(API_URL('students'), {
    method: 'POST',
    body: JSON.stringify(student)
  })
  if (!res.ok) throw new Error('Error creating student')

  StudentsExample.push({ ...student, id: StudentsExample.length + 1 })
  return res.json(student)
}
export async function updateStudent (student: Student) {
  const res = await mockFetch<Student>(API_URL(`students/${student.code}`), {
    method: 'PUT',
    body: JSON.stringify(student)
  })
  if (!res.ok) throw new Error('Error updating student')

  const index = StudentsExample.findIndex(s => s.code === student.code)
  StudentsExample[index] = { ...student, id: StudentsExample[index].id }
  return res.json(student)
}
export async function deleteStudent (code: string) {
  const res = await mockFetch<Student>(API_URL(`students/${code}`), {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Error deleting student')

  StudentsExample.splice(StudentsExample.findIndex(s => s.code === code), 1)
  return res.json({})
}

import { TeachersExample } from "@/examples/Teachers"
import type { Teacher } from "@/types/RecordModel"
export async function getTeachers () {
  const res = await mockFetch<Teacher[]>(API_URL('teachers'))
  if (!res.ok) throw new Error('Error fetching teachers')
  return res.json(TeachersExample)
}
export async function getTeacher (code: string) {
  const res = await mockFetch<Teacher>(API_URL(`teachers/${code}`))
  if (!res.ok) throw new Error('Error fetching teacher')
  return res.json(TeachersExample.find(s => s.code === code))
}
export async function createTeacher (teacher: Teacher) {
  const res = await mockFetch<Teacher>(API_URL('teachers'), {
    method: 'POST',
    body: JSON.stringify(teacher)
  })
  if (!res.ok) throw new Error('Error creating teacher')

  TeachersExample.push({ ...teacher, id: TeachersExample.length + 1 })
  return res.json(teacher)
}
export async function updateTeacher (teacher: Teacher) {
  const res = await mockFetch<Teacher>(API_URL(`teachers/${teacher.code}`), {
    method: 'PUT',
    body: JSON.stringify(teacher)
  })
  if (!res.ok) throw new Error('Error updating teacher')

  const index = TeachersExample.findIndex(s => s.code === teacher.code)
  TeachersExample[index] = { ...teacher, id: TeachersExample[index].id }
  return res.json(teacher)
}
export async function deleteTeacher (code: string) {
  const res = await mockFetch<Teacher>(API_URL(`teachers/${code}`), {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Error deleting teacher')

  TeachersExample.splice(TeachersExample.findIndex(s => s.code === code), 1)
  return res.json({})
}

import { CoursesExample } from "@/examples/Courses"
import type { Course } from "@/types/RecordModel"
export async function getCourses () {
  const res = await mockFetch<Course[]>(API_URL('courses'))
  if (!res.ok) throw new Error('Error fetching courses')
  return res.json(CoursesExample)
}
export async function getCourse (code: string) {
  const res = await mockFetch<Course>(API_URL(`courses/${code}`))
  if (!res.ok) throw new Error('Error fetching course')
  return res.json(CoursesExample.find(s => s.code === code))
}
export async function createCourse (course: Course) {
  const res = await mockFetch<Course>(API_URL('courses'), {
    method: 'POST',
    body: JSON.stringify(course)
  })
  if (!res.ok) throw new Error('Error creating course')

  CoursesExample.push({
    ...course,
    id: CoursesExample.length + 1,
    available_quota: course.max_students
  })
  return res.json(course)
}
export async function updateCourse (course: Course) {
  const res = await mockFetch<Course>(API_URL(`courses/${course.code}`), {
    method: 'PUT',
    body: JSON.stringify(course)
  })
  if (!res.ok) throw new Error('Error updating course')

  const index = CoursesExample.findIndex(s => s.code === course.code)
  CoursesExample[index] = { ...course, id: CoursesExample[index].id, available_quota: CoursesExample[index].available_quota }
  return res.json(course)
}
export async function deleteCourse (code: string) {
  const res = await mockFetch<Course>(API_URL(`courses/${code}`), {
    method: 'DELETE'
  })
  if (!res.ok) throw new Error('Error deleting course')

  CoursesExample.splice(CoursesExample.findIndex(s => s.code === code), 1)
  return res.json({})
}
