import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getTeacher } from "@/api/auth"

import { ViewRecord } from "@/components/View"
import { LoadingView } from "@/components/Loading"
import { ErrorView } from "@/components/Error"

export const ViewTeacher = () => {
  const { id } = useParams()
  const { data, isLoading, isError, error } = useQuery(["teacher", id], () =>
    getTeacher(id as string)
  )

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return <ViewRecord title="Teacher" record={data} route="courses" />
}
