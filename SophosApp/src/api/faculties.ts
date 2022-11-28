import type { Faculty } from "@/types/RecordModel"
import { API_URL, getCookie } from "./utils"

export async function getFaculties(): Promise<Faculty[]> {
  const res = await fetch(API_URL("faculties"), {
    headers: {
      Authorization: `Bearer ${getCookie("user_session")}`
    }
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error)
  return data.data
}
