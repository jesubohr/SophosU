import type { Course } from "@/types/RecordModel"
import { useNavigate } from "react-router-dom"
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"
import { createCourse, getCourses, getFaculties } from "@/api/auth"
import { COURSE_INPUTS, getOptions } from "@/utils/inputFields"

import { ErrorView } from "@/components/Error"
import { LoadingView } from "@/components/Loading"
import { CreateRecord } from "@/components/Create"

export const AddCourse = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: courses } = useQuery(["courses"], () => getCourses(1))
  const { data: faculties } = useQuery(["faculties"], getFaculties)

  const { mutate, isLoading, isError, error } = useMutation(createCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"])
      navigate("/courses")
    }
  })

  function handleSubmit(course: Course) {
    mutate(course)
  }

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <CreateRecord
      title="Add Course"
      buttonLabel="Create Course"
      fields={COURSE_INPUTS}
      options={courses?.data.map(getOptions)}
      options2={faculties?.map(getOptions)}
      onSubmit={handleSubmit}
    />
  )
}
