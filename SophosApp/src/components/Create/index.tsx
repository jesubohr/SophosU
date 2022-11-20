import type { InputField, Option } from "@/types/RecordComponents"
import { FormGroup, InputGroup, Button } from "@blueprintjs/core"
import { SingleSelect } from "../SingleSelect"
import styles from "./styles.module.css"

export interface ICreateRecordProps {
  title: string
  buttonLabel: string
  fields: InputField[]
  options?: Option[]
  options2?: Option[]
  onSubmit: (record: any) => void
}

export const CreateRecord = (props: ICreateRecordProps) => {
  const { title, buttonLabel, fields, options, options2, onSubmit } = props

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    let record = {} as Record<string, any>

    fields.forEach((field) => {
      const key = field.name
      const value =
        field.type === "number" || field.type.includes("select")
          ? Number(formData.get(key))
          : field.type === "date"
          ? new Date(`${formData.get(key)} 00:00:00`)
          : formData.get(key)
      record[key] = value
    })
    onSubmit(record)
  }

  return (
    <main>
      <h1 className={styles.title}>{title}</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {fields.map((input, index) => (
          <FormGroup
            key={index}
            label={input.label}
            labelFor={`${input.name}-input`}
            labelInfo="*"
          >
            {input.type === "select" ? (
              <SingleSelect
                id={`${input.name}-input`}
                name={input.name}
                placeholder={input.defaultValue ?? input.placeholder}
                options={options ?? []}
              />
            ) : input.type === "select-2" ? (
              <SingleSelect
                id={`${input.name}-input`}
                name={input.name}
                placeholder={input.defaultValue ?? input.placeholder}
                options={options2 ?? []}
              />
            ) : (
              <InputGroup
                large
                id={`${input.name}-input`}
                {...input}
                required
              />
            )}
          </FormGroup>
        ))}
        <Button fill large type="submit" intent="primary" text={buttonLabel} />
      </form>
    </main>
  )
}
