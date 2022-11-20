import { useState, useEffect } from "react"

/**
 * A hook to manage a cookie
 * @param key The name of the cookie
 * @param initialValue The initial value of the cookie
 * @param expSeconds The number of seconds until the cookie expires
 * @returns A tuple containing the cookie value, a function to set the cookie value, and a function to remove the cookie
 */
export function useCookie(
  key: string,
  {
    initialValue = "",
    expSeconds
  }: { initialValue?: string; expSeconds: number }
) {
  const [cookie, setCookie] = useState(() => {
    const name = key + "="
    const decodedCookies = decodeURIComponent(document.cookie)
    const cookies = decodedCookies.split(";")
    const cookieValue = cookies
      .find((cookie) => cookie.includes(name))
      ?.trim()
      .split("=")[1]
    return cookieValue ?? initialValue
  })
  const [expires, _] = useState(expSeconds)

  // Set the document cookie when cookie changes
  useEffect(() => {
    if (cookie === "") {
      document.cookie = key + "=; max-age=0; path=/"
      return
    }
    document.cookie = `${key}=${cookie}; max-age=${expires}; path=/`
  }, [key, cookie, expires])

  return [cookie, setCookie] as const
}
