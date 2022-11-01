import type { Student } from "@/types/RecordModel"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { createStudent } from "@/api/auth"
import { STUDENT_INPUTS } from "@/utils/inputFields"
import { CreateRecord } from "@/components/Create"


export const AddStudent = () => {
  const navigate = useNavigate()
  const { mutate, isLoading, isError } = useMutation(createStudent, {
    onSuccess: () => {
      navigate("/students")
    },
  })

  function handleSubmit (student: Student) {
    mutate(student)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <CreateRecord
      title="Add Student"
      buttonLabel="Create Student"
      fields={ STUDENT_INPUTS }
      onSubmit={ handleSubmit }
    />
  )
}
