import { useState, useEffect, useCallback } from "react"

/**
 * A hook to manage a cookie
 * @param key The name of the cookie
 * @param initialValue The initial value of the cookie
 * @param expDays The number of days until the cookie expires, defaults to 7
 * @returns A tuple containing the cookie value, a function to set the cookie value, and a function to remove the cookie
 */
export function useCookie (key: string, initialValue: string, expDays = 7) {
  const [cookie, setCookie] = useState(() => {
    const name = key + "="
    const decodedCookies = decodeURIComponent(document.cookie)
    const cookies = decodedCookies.split(';')
    const cookieValue = cookies
      .find(cookie => cookie.includes(name))
      ?.trim()
      .split('=')[1]
    return cookieValue ?? initialValue
  })
  const [expires, setExpires] = useState(() => {
    const date = new Date()
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
    return "expires=" + date.toUTCString()
  })

  // Change the expiration date when expDays changes
  useEffect(() => {
    const date = new Date()
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
    setExpires("expires=" + date.toUTCString())
  }, [expDays])

  // Set the document cookie when cookie changes
  useEffect(() => {
    if (cookie === '') {
      document.cookie = key + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      return
    }
    document.cookie = `${key}=${cookie}; ${expires}; path=/`
  }, [key, cookie, expires])

  const remove = useCallback(() => {
    setCookie('')
  }, [])

  return [cookie, setCookie, remove] as const
}
