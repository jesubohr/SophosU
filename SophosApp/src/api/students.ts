import type { Student } from "@/types/RecordModel"
import type { PagedResponse } from "@/types/AuthAPI"
import { API_URL, getCookie } from "./utils"

export async function getStudents(page = 1): Promise<PagedResponse<Student>> {
  const res = await fetch(API_URL(`students?page=${page}`), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
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

export async function getStudent(code: string): Promise<Student> {
  const res = await fetch(API_URL(`students/${code}`), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function createStudent(student: Student): Promise<Student> {
  const res = await fetch(API_URL("students"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("user_session")}`
    },
    body: JSON.stringify(student)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function updateStudent(student: Student): Promise<Student> {
  const res = await fetch(API_URL(`students/${student.code}`), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("user_session")}`
    },
    body: JSON.stringify(student)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function deleteStudent(code: string): Promise<Student> {
  const res = await fetch(API_URL(`students/${code}`), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
