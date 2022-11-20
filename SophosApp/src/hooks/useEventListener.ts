import { useEffect, useRef } from "react"

export function useEventListener(
  type: string,
  callback: (event: Event) => void,
  element: HTMLElement | Window = window
) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (event: Event) => callbackRef.current(event)
    element.addEventListener(type, handler)

    return () => element.removeEventListener(type, handler)
  }, [type, element])
}
