import { INPUT_FIELDS } from "./utils"
import { useNavigate } from "react-router-dom"
import { CreateRecord } from "@/components/Create"

export const AddStudent = () => {
  const navigate = useNavigate()

  function handleSubmit (student: any) {
    console.log("From AddStudent", student)
    navigate("/students")
  }

  return (
    <CreateRecord
      title="Add Student"
      buttonLabel="Create Student"
      fields={ INPUT_FIELDS }
      onSubmit={ handleSubmit }
    />
  )
}
