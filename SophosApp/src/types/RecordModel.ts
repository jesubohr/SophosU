export type Student = {
  code: string
  fullname: string
  birthdate: string
  cellphone: string
  email: string
  faculty: string
  enrolled_credits: number
  current_semester: number
  enrolled_courses: { code: string, name: string }[]
  taken_courses: { code: string, name: string }[]
}

export type Teacher = {
  code: string
  fullname: string
  birthdate: string
  cellphone: string
  email: string
  faculty: string
  academic_title: string
  years_experience: number
  taught_courses: { code: string, name: string }[]
}

export type Course = {
  code: string
  name: string
  precourse: string
  faculty: string
  required_credits: number
  enrolled_students: number
  max_students: number
  assigned_teacher: { code: string, name: string }
  current_students: { code: string, name: string }[]
}
