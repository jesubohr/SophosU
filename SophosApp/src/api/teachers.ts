import type { Teacher } from "@/types/RecordModel"
import type { PagedResponse } from "@/types/AuthAPI"
import { API_URL, getCookie } from "./utils"

export async function getTeachers(page = 1): Promise<PagedResponse<Teacher>> {
  const res = await fetch(API_URL(`teachers?page=${page}`), {
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

export async function getTeacher(code: string): Promise<Teacher> {
  const res = await fetch(API_URL(`teachers/${code}`), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function createTeacher(teacher: Teacher): Promise<Teacher> {
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

export async function updateTeacher(teacher: Teacher): Promise<Teacher> {
  const res = await fetch(API_URL(`teachers/${teacher.code}`), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    },
    body: JSON.stringify(teacher)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function deleteTeacher(code: string): Promise<Teacher> {
  const res = await fetch(API_URL(`teachers/${code}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
