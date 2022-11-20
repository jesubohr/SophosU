import type { UserProp } from '@/types/AuthContext'
const API_URL = (route: string) => `http://localhost:5000/${route}` //https://sophosapi.up.railway.app

// Types
import type { Student, Teacher, Course, Faculty } from "@/types/RecordModel"
type AuthResponse = {
  token: string,
  refreshToken: string,
  error?: string
}
type PagedResponse<T> = {
  data: T[],
  page: number,
  maxPage: number,
  maxItems: number
}

// Cookies
function getCookie (name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift()
}

// Authentication
export async function userLogin (user: UserProp): Promise<AuthResponse> {
  const res = await fetch(API_URL('auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  return res.json()
}
export async function userRegister (user: UserProp): Promise<AuthResponse> {
  const res = await fetch(API_URL('auth/register'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  return res.json()
}
export async function userLogout (refreshToken: string) {
  return await fetch(API_URL('auth/logout'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken })
  })
}
export async function userRefreshToken (refreshToken: string) {
  const res = await fetch(API_URL('auth/token'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken })
  })
  return res.json()
}


// Records CRUD
export async function getStudents (page = 1): Promise<PagedResponse<Student>> {
  const res = await fetch(API_URL(`students?page=${page}`), {
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return {
    data: data.data,
    page: data.page,
    maxPage: data.maxPage,
    maxItems: data.maxItems
  }
}
export async function getStudent (code: string): Promise<Student> {
  const res = await fetch(API_URL(`students/${code}`), {
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function createStudent (student: Student): Promise<Student> {
  const res = await fetch(API_URL('students'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie('user_session')}`
    },
    body: JSON.stringify(student)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function updateStudent (student: Student): Promise<Student> {
  const res = await fetch(API_URL(`students/${student.code}`), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie('user_session')}`
    },
    body: JSON.stringify(student)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function deleteStudent (code: string): Promise<Student> {
  const res = await fetch(API_URL(`students/${code}`), {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getCookie('user_session')}`
    },
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}


export async function getTeachers (page = 1): Promise<PagedResponse<Teacher>> {
  const res = await fetch(API_URL(`teachers?page=${page}`), {
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return {
    data: data.data,
    page: data.page,
    maxPage: data.maxPage,
    maxItems: data.maxItems
  }
}
export async function getTeacher (code: string): Promise<Teacher> {
  const res = await fetch(API_URL(`teachers/${code}`), {
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function createTeacher (teacher: Teacher): Promise<Teacher> {
  const res = await fetch(API_URL("teachers"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("user_session")}`
    },
    body: JSON.stringify(teacher)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function updateTeacher (teacher: Teacher): Promise<Teacher> {
  const res = await fetch(API_URL(`teachers/${teacher.code}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    },
    body: JSON.stringify(teacher)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function deleteTeacher (code: string): Promise<Teacher> {
  const res = await fetch(API_URL(`teachers/${code}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}


export async function getCourses (page = 1): Promise<PagedResponse<Course>> {
  const res = await fetch(API_URL(`courses?page=${page}`), {
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return {
    data: data.data,
    page: data.page,
    maxPage: data.maxPage,
    maxItems: data.maxItems
  }
}
export async function getCourse (code: string): Promise<Course> {
  const res = await fetch(API_URL(`courses/${code}`), {
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function createCourse (course: Course): Promise<Course> {
  const res = await fetch(API_URL("courses"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("user_session")}`
    },
    body: JSON.stringify(course)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function updateCourse (course: Course): Promise<Course> {
  const res = await fetch(API_URL(`courses/${course.code}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    },
    body: JSON.stringify(course)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
export async function deleteCourse (code: string): Promise<Course> {
  const res = await fetch(API_URL(`courses/${code}`), {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function getFaculties(): Promise<Faculty[]> {
  const res = await fetch(API_URL('faculties'), {
    headers: {
      'Authorization': `Bearer ${getCookie('user_session')}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
