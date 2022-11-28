import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getCourse } from "@/api/courses"

import { ViewRecord } from "@/components/View"
import { LoadingView } from "@/components/Loading"
import { ErrorView } from "@/components/Error"

export const ViewCourse = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery(["course", id], () =>
    getCourse(id as string)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return <ViewRecord title="Course" record={data} route="students,teachers" />
}
