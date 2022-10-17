import { INPUT_FIELDS, StudentsExample } from "./utils"
import { CreateRecord } from "@/components/Create"
import { useParams, useNavigate } from "react-router-dom"

export const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const student = StudentsExample.find(student => student.id === Number(id))

  type Record = keyof typeof student
  const formatDate = (date: string) => {
    const [day, month, year] = date.split("/")
    return [year, month, day].join("-")
  }
  const inputFields = INPUT_FIELDS.map(field => {
    const key = field.name as Record
    const defaultValue = (key === 'birthdate')
      ? formatDate(student?.birthdate as string)
      : student?.[key]
    return { ...field, defaultValue }
  })

  function handleSubmit (student: any) {
    console.log("From EditStudent", student)
    navigate("/students")
  }

  return (
    <CreateRecord
      title="Edit Student"
      buttonLabel="Update Student"
      fields={ inputFields }
      onSubmit={ handleSubmit }
    />
  )
}
