import type { Student } from "@/types/RecordModel"
import type { InputField } from "@/types/RecordComponents"
import { useParams, useNavigate } from "react-router-dom"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getStudent, updateStudent, getFaculties } from "@/api/auth"
import {
  STUDENT_INPUTS,
  fitKey,
  formatDate,
  getOptions
} from "@/utils/inputFields"

import { ErrorView } from "@/components/Error"
import { LoadingView } from "@/components/Loading"
import { CreateRecord } from "@/components/Create"

export const EditStudent = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery(
    ["update-student", id],
    () => getStudent(id as string)
  )
  const { data: faculties } = useQuery(["faculties"], getFaculties)

  const { mutate } = useMutation(updateStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["update-student", id])
      navigate("/students")
    }
  })

  function handleSubmit(student: Student) {
    mutate(student)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  function insertValues(field: InputField) {
    const key = field.name as keyof Student
    const defaultValue = key.includes("id")
      ? data?.[fitKey<Student>(key)]
      : key === "birthdate"
      ? formatDate(data?.birthdate as string)
      : data?.[key]
    return { ...field, defaultValue } as InputField
  }

  return (
    <CreateRecord
      title="Edit Student"
      buttonLabel="Update Student"
      fields={STUDENT_INPUTS.map(insertValues)}
      options={faculties?.map(getOptions)}
      onSubmit={handleSubmit}
    />
  )
}
