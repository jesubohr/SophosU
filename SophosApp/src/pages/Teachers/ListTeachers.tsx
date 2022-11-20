import type { Teacher } from "@/types/RecordModel"
import { useState } from "react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getTeachers, deleteTeacher } from "@/api/auth"

import { ErrorView } from "@/components/Error"
import { ListRecords } from "@/components/List"
import { LoadingView } from "@/components/Loading"

export const ListTeachers = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const TableHeaders = [
    "Fullname",
    "Academic Title",
    "Years Experience",
    "Actions"
  ]

  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery(
    ["courses", currentPage],
    () => getTeachers(currentPage),
    { keepPreviousData: true }
  )
  const { mutate: remove } = useMutation(deleteTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"])
    }
  })

  const handleChangePage = (page: number) => setCurrentPage(page)
  const handleDelete = (code: string) => remove(code)

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <ListRecords
      title="Teachers"
      route="teachers"
      page={data.page}
      maxPage={data.maxPage}
      maxItems={data.maxItems}
      headers={TableHeaders}
      data={data.data as Teacher[]}
      searchKeys={["fullname"]}
      onPageChange={handleChangePage}
      onDelete={handleDelete}
    />
  )
}
