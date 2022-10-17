import type { InputField } from "@/types/RecordComponents"
import { FormGroup, InputGroup, Button } from "@blueprintjs/core"
import styles from "./styles.module.css"

export interface ICreateRecordProps {
  title: string
  buttonLabel: string
  fields: InputField[]
  onSubmit: (record: any) => void
}

export const CreateRecord = (props: ICreateRecordProps) => {
  const { title, buttonLabel, fields, onSubmit } = props

  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    let record = {} as Record<string, any>

    fields.forEach(field => {
      const key = field.name
      const value = (field.type === "number")
        ? Number(formData.get(key))
        : formData.get(key) as string
      record[key] = value
    })
    onSubmit(record)
  }

  return (
    <main>
      <h1 className={ styles.title }>{ title }</h1>
      <form onSubmit={ handleSubmit } className={ styles.form }>
        {
          fields.map((input, index) => (
            <FormGroup
              key={ index }
              label={ input.label }
              labelFor={ `${input.name}-input` }
              labelInfo="*"
            >
              <InputGroup
                large
                id={ `${input.name}-input` }
                { ...input }
              />
            </FormGroup>
          ))
        }
        <Button
          fill
          large
          type="submit"
          intent="primary"
          text={ buttonLabel }
        />
      </form>
    </main>
  )
}
