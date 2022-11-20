import type { Intent } from "@blueprintjs/core"
import { useState, useEffect, useRef } from "react"
import { isValidEmail, isSecurePassword } from "@/utils/authHelper"
import { useAuth } from "@/context/AuthContext"
import { RegisterView } from "./RegisterView"

export const Register = () => {
  const { onRegister } = useAuth()

  const emailInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const [emailHelperText, setEmailHelperText] = useState<string>("")
  const [passwordHelperText, setPasswordHelperText] = useState<string>("")
  const [isSuccessPassword, setIsSuccessPassword] = useState<boolean | null>(
    null
  )

  const [emailIntent, setEmailIntent] = useState<Intent>("none")
  const [passwordIntent, setPasswordIntent] = useState<Intent>("none")

  function handleEmailInput(event: React.FormEvent<HTMLInputElement>) {
    const email = event.currentTarget.value
    if (isValidEmail(email)) {
      setEmailHelperText("Valid Email")
      setEmailIntent("success")
    } else {
      if (email.length === 0) {
        setEmailHelperText("")
        setEmailIntent("none")
        return
      }
      setEmailHelperText("Email is invalid")
      setEmailIntent("danger")
    }
  }
  function handlePasswordInput(event: React.FormEvent<HTMLInputElement>) {
    const password = event.currentTarget.value
    if (password.length === 0) return setIsSuccessPassword(null)

    if (isSecurePassword(password)) setIsSuccessPassword(true)
    else setIsSuccessPassword(false)
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (email.length === 0) {
      setEmailHelperText("Email is required")
      setEmailIntent("danger")
      emailInputRef.current?.focus()
      return
    }

    if (password.length === 0) {
      setPasswordHelperText("Password is required")
      setPasswordIntent("danger")
      passwordInputRef.current?.focus()
      return
    }

    if (isValidEmail(email) && isSecurePassword(password)) {
      onRegister({ email, password })
      setEmailHelperText("")
      setPasswordHelperText("")
      setEmailIntent("none")
      setPasswordIntent("none")
      setTimeout(() => {
        form.reset()
      }, 0)
    }
  }

  useEffect(() => {
    emailInputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (isSuccessPassword === null) {
      setPasswordIntent("none")
      setPasswordHelperText("")
      return
    }
    if (isSuccessPassword) {
      setPasswordIntent("success")
      setPasswordHelperText("Secure Password")
    } else {
      setPasswordIntent("danger")
      setPasswordHelperText("Password is not secure")
    }
  }, [isSuccessPassword])

  return (
    <RegisterView
      emailHelperText={emailHelperText}
      emailIntent={emailIntent}
      emailInputRef={emailInputRef}
      handleEmailInput={handleEmailInput}
      passwordHelperText={passwordHelperText}
      passwordIntent={passwordIntent}
      passwordInputRef={passwordInputRef}
      handlePasswordInput={handlePasswordInput}
      handleSubmit={handleSubmit}
      setIsSuccessPassword={setIsSuccessPassword}
    />
  )
}
