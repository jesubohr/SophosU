import type { Student } from "@/types/RecordModel"
import type { InputField } from "@/types/RecordComponents"
import { useParams, useNavigate } from "react-router-dom"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { CreateRecord } from "@/components/Create"
import { STUDENT_INPUTS } from "@/utils/inputFields"
import { getStudent, updateStudent } from "@/api/auth"

export const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery(["update-student", id], () => getStudent(id as string))
  const { mutate } = useMutation(updateStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["update-student", id])
      navigate("/students")
    },
  })
  const student = data as Student


  function handleSubmit (student: Student) {
    mutate(student)
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  // Format the date to be accepted as a value for the date input
  const formatDate = (date: string) => {
    if (date.includes("-")) return date
    const [day, month, year] = date.split("/")
    return [year, month, day].join("-")
  }
  // Insert the student's data into the input fields
  function insertValues (field: InputField) {
    const key = field.name as keyof Student
    const defaultValue = (key === 'birthdate')
      ? formatDate(student?.birthdate)
      : student?.[key]
    return { ...field, defaultValue }
  }

  return (
    <CreateRecord
      title="Edit Student"
      buttonLabel="Update Student"
      fields={ STUDENT_INPUTS.map(insertValues) }
      onSubmit={ handleSubmit }
    />
  )
}
