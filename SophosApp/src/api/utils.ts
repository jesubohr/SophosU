export const API_URL = (route: string) => `http://localhost:5000/${route}` //https://sophosapi.up.railway.app

export function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(";").shift()
}
