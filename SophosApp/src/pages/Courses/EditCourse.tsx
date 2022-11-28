import type { Course } from "@/types/RecordModel"
import type { InputField } from "@/types/RecordComponents"
import { useParams, useNavigate } from "react-router-dom"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { getFaculties } from "@/api/faculties"
import { getCourse, updateCourse, getCourses } from "@/api/courses"
import { COURSE_INPUTS, getOptions, fitKey } from "@/utils/inputFields"

import { ErrorView } from "@/components/Error"
import { LoadingView } from "@/components/Loading"
import { CreateRecord } from "@/components/Create"

export const EditCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error } = useQuery(["course", id], () =>
    getCourse(id as string)
  )
  const { data: courses } = useQuery(["courses"], () => getCourses(1))
  const { data: faculties } = useQuery(["faculties"], getFaculties)

  const { mutate } = useMutation(updateCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["course", id])
      navigate("/courses")
    }
  })

  function handleSubmit(student: Course) {
    mutate(student)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  function insertValues(field: InputField) {
    const key = field.name as keyof Course
    const defaultValue = key.includes("id")
      ? data?.[fitKey<Course>(key)]
      : data?.[key]
    return { ...field, defaultValue } as InputField
  }

  return (
    <CreateRecord
      title="Edit Course"
      buttonLabel="Update Course"
      fields={COURSE_INPUTS.map(insertValues)}
      options={courses?.data.map(getOptions)}
      options2={faculties?.map(getOptions)}
      onSubmit={handleSubmit}
    />
  )
}
