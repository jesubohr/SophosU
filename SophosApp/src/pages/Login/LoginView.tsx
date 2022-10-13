import type { Intent } from "@blueprintjs/core"
import { useState } from "react"
import { FormGroup, InputGroup, Button } from "@blueprintjs/core"
import styles from "./styles.module.css"


export interface ILoginViewProps {
  emailHelperText: string
  emailIntent: Intent
  emailInputRef: React.RefObject<HTMLInputElement>
  handleEmailInput: (event: React.FormEvent<HTMLInputElement>) => void

  passwordHelperText: string
  passwordIntent: Intent
  passwordInputRef: React.RefObject<HTMLInputElement>
  handlePasswordInput: (event: React.FormEvent<HTMLInputElement>) => void

  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}
export const LoginView = (props: ILoginViewProps) => {
  const { emailHelperText, emailIntent, emailInputRef, handleEmailInput } = props
  const { passwordHelperText, passwordIntent, passwordInputRef, handlePasswordInput } = props
  const { handleSubmit } = props

  return (
    <main className={ styles.container }>
      <h1 className={ "bp4-heading" + styles.title }>Login</h1>
      <form onSubmit={ handleSubmit } className={ styles.form }>
        <FormGroup
          label="Email"
          labelFor="email-input"
          labelInfo="(required)"
          subLabel={ emailHelperText }
          intent={ emailIntent }
        >
          <InputGroup
            inputRef={ emailInputRef }
            id="email-input"
            name="email"
            large={ true }
            intent={ emailIntent }
            placeholder="user@email.com"
            onInput={ handleEmailInput }
            required
          />
        </FormGroup>
        <FormGroup
          label="Password"
          labelFor="password-input"
          labelInfo="(required)"
          subLabel={ passwordHelperText }
          intent={ passwordIntent }
        >
          <InputGroup
            inputRef={ passwordInputRef }
            id="password-input"
            name="password"
            type="password"
            large={ true }
            intent={ passwordIntent }
            placeholder="$4|uT0n_M@ndo"
            onInput={ handlePasswordInput }
            rightElement={ (<ViewPassword inputRef={ passwordInputRef } />) }
            required
          />
        </FormGroup>
        <Button
          type="submit"
          fill={ true }
          large={ true }
          intent="primary"
          text="Login"
        />
      </form>
    </main>
  )
}

interface ViewPasswordProps {
  inputRef: React.RefObject<HTMLInputElement>
}
const ViewPassword = ({ inputRef }: ViewPasswordProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Button
      icon={ isOpen ? "eye-off" : "eye-open" }
      minimal
      onClick={ () => {
        const passwordInput = inputRef.current as HTMLInputElement
        passwordInput.type = passwordInput.type === "password" ? "text" : "password"
        setIsOpen(!isOpen)
      } }
    />
  )
}
