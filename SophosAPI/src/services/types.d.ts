export interface Student {
  code: string
  fullname: string
  birthdate: Date
  cellphone: string | null
  email: string
  password: string
  faculty_id: number
  enrolled_credits: number
  current_semester: number
}
export interface PutStudent implements Omit<Student, 'code'> {}
export interface GetStundents implements Pick<Student, 'code', 'fullname', 'faculty', 'enrolled_credits'> {}
export interface GetStundent implements Omit<Student, 'id', 'password', 'faculty_id'> {
  faculty: string
  enrolled_courses: { code: string, name: string }[]
  taken_courses: { code: string, name: string }[]
}


export type Teacher = {
  code: string
  fullname: string
  birthdate: string
  cellphone: string
  email: string
  password: string
  faculty_id: number
  academic_title: string
  years_experience: number
}
export type PutTeacher = Omit<Teacher, 'code'>
export interface GetTeachers implements Pick<Teacher, 'code', 'fullname', 'academic_title', 'years_experience'> {}
export interface GetTeacher implements Omit<Teacher, 'id', 'password', 'faculty_id'> {
  faculty: string
  taught_courses: { code: string, name: string }[]
}


export type Course = {
  code: string
  name: string
  precourse_id: number
  faculty_id: number
  required_credits: number
  enrolled_students: number
  max_students: number
}
export type PutCourse = Omit<Course, 'code'>
export interface GetCourses implements Pick<Course, 'code', 'name', 'precourse', 'required_credits'> {
  available_quota: number
}
export interface GetCourse implements Omit<Course, 'id', 'precourse_id', 'faculty_id'> {
  precourse: string
  faculty: string
  assigned_teacher: { code: string, fullname: string }
  current_students: { code: string, fullname: string }[]
}
