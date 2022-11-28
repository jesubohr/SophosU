import type { Student } from "@/types/RecordModel"
import { useNavigate } from "react-router-dom"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getFaculties } from "@/api/faculties"
import { createStudent } from "@/api/students"
import { STUDENT_INPUTS, getOptions } from "@/utils/inputFields"

import { ErrorView } from "@/components/Error"
import { LoadingView } from "@/components/Loading"
import { CreateRecord } from "@/components/Create"

export const AddStudent = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: faculties } = useQuery(["faculties"], getFaculties)
  const { mutate, isLoading, isError, error } = useMutation(createStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"])
      navigate("/students")
    }
  })

  function handleSubmit(student: Student) {
    mutate(student)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <CreateRecord
      title="Add Student"
      buttonLabel="Create Student"
      fields={STUDENT_INPUTS}
      options={faculties?.map(getOptions)}
      onSubmit={handleSubmit}
    />
  )
}
