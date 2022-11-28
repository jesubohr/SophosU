import type { Teacher } from "@/types/RecordModel"
import { useNavigate } from "react-router-dom"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getFaculties } from "@/api/faculties"
import { createTeacher } from "@/api/teachers"
import { TEACHER_INPUTS, getOptions } from "@/utils/inputFields"

import { ErrorView } from "@/components/Error"
import { LoadingView } from "@/components/Loading"
import { CreateRecord } from "@/components/Create"

export const AddTeacher = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: faculties } = useQuery(["faculties"], getFaculties)
  const { mutate, isLoading, isError, error } = useMutation(createTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"])
      navigate("/teachers")
    }
  })

  function handleSubmit(teacher: Teacher) {
    mutate(teacher)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <CreateRecord
      title="Add Teacher"
      buttonLabel="Create Teacher"
      fields={TEACHER_INPUTS}
      options={faculties?.map(getOptions)}
      onSubmit={handleSubmit}
    />
  )
}
