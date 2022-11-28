import type { Course } from "@/types/RecordModel"
import { useState } from "react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getCourses, deleteCourse } from "@/api/courses"

import { ErrorView } from "@/components/Error"
import { ListRecords } from "@/components/List"
import { LoadingView } from "@/components/Loading"

export const ListCourses = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const TableHeaders = [
    "Name",
    "Precourse",
    "Required Credits",
    "Available Quota",
    "Actions"
  ]

  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery(
    ["courses", currentPage],
    () => getCourses(currentPage),
    { keepPreviousData: true }
  )
  const { mutate: remove } = useMutation(deleteCourse, {
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"])
    }
  })

  const handleChangePage = (page: number) => setCurrentPage(page)
  const handleDelete = (code: string) => remove(code)

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <ListRecords
      title="Courses"
      route="courses"
      page={data.page}
      maxPage={data.maxPage}
      maxItems={data.maxItems}
      headers={TableHeaders}
      data={data.data as Course[]}
      searchKeys={["name"]}
      onPageChange={handleChangePage}
      onDelete={handleDelete}
    />
  )
}
