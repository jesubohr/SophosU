import type { Student } from "@/types/RecordModel"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getStudent } from "@/api/students"

import { ErrorView } from "@/components/Error"
import { ViewRecord } from "@/components/View"
import { LoadingView } from "@/components/Loading"

export const ViewStudent = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery(["student", id], () => getStudent(id as string))
  const student = data as Student

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={ (error as Error)?.message } />

  return (
    <ViewRecord
      title="Student"
      record={ student }
      route="courses"
    />
  )
}
