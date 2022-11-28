import type { Course } from "@/types/RecordModel"
import type { PagedResponse } from "@/types/AuthAPI"
import { API_URL, getCookie } from "./utils"

export async function getCourses(page = 1): Promise<PagedResponse<Course>> {
  const res = await fetch(API_URL(`courses?page=${page}`), {
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

export async function getCourse(code: string): Promise<Course> {
  const res = await fetch(API_URL(`courses/${code}`), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function createCourse(course: Course): Promise<Course> {
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

export async function updateCourse(course: Course): Promise<Course> {
  const res = await fetch(API_URL(`courses/${course.code}`), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    },
    body: JSON.stringify(course)
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function deleteCourse(code: string): Promise<Course> {
  const res = await fetch(API_URL(`courses/${code}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
