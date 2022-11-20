import type { Teacher } from "@/types/RecordModel"
import type { InputField } from "@/types/RecordComponents"
import { useParams, useNavigate } from "react-router-dom"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getTeacher, updateTeacher, getFaculties } from "@/api/auth"
import {
  TEACHER_INPUTS,
  fitKey,
  formatDate,
  getOptions
} from "@/utils/inputFields"

import { ErrorView } from "@/components/Error"
import { LoadingView } from "@/components/Loading"
import { CreateRecord } from "@/components/Create"

export const EditTeacher = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery(["teacher", id], () =>
    getTeacher(id as string)
  )
  const { data: faculties } = useQuery(["faculties"], getFaculties)

  const { mutate } = useMutation(updateTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teacher", id])
      navigate("/teachers")
    }
  })

  function handleSubmit(student: Teacher) {
    mutate(student)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  function insertValues(field: InputField) {
    const key = field.name as keyof Teacher
    const defaultValue = key.includes("id")
      ? data?.[fitKey<Teacher>(key)]
      : key === "birthdate"
      ? formatDate(data?.birthdate as string)
      : data?.[key]
    return { ...field, defaultValue } as InputField
  }

  return (
    <CreateRecord
      title="Edit Teacher"
      buttonLabel="Update Teacher"
      fields={TEACHER_INPUTS.map(insertValues)}
      options={faculties?.map(getOptions)}
      onSubmit={handleSubmit}
    />
  )
}
