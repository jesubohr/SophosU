import { API_URL, getCookie } from "./utils"

export async function getStudentsCount(): Promise<number> {
  const res = await fetch(API_URL("students/count"), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function getTeachersCount(): Promise<number> {
  const res = await fetch(API_URL("teachers/count"), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}

export async function getCoursesCount(): Promise<number> {
  const res = await fetch(API_URL("courses/count"), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
