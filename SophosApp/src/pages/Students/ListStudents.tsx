import type { Student } from "@/types/RecordModel"
import { useState } from "react"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getStudents, deleteStudent } from "@/api/auth"
import { ListRecords } from "@/components/List"
import { LoadingView } from "@/components/Loading"
import { ErrorView } from "@/components/Error"

export const ListStudents = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const TableHeaders = ["Fullname", "Faculty", "Enrolled Credits", "Actions"]

  const queryClient = useQueryClient()
  const { data, isLoading, isError, error } = useQuery(
    ["students", currentPage],
    () => getStudents(currentPage),
    { keepPreviousData: true }
  )
  const { mutate } = useMutation(deleteStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"])
    }
  })

  const handleChangePage = (page: number) => setCurrentPage(page)
  const handleDelete = (code: string) => mutate(code)

  if (isLoading) return <LoadingView />
  if (isError) return <ErrorView message={(error as Error)?.message} />

  return (
    <ListRecords
      title="Students"
      route="students"
      page={data.page}
      maxPage={data.maxPage}
      maxItems={data.maxItems}
      headers={TableHeaders}
      data={data.data as Student[]}
      searchKeys={["fullname", "faculty"]}
      onPageChange={handleChangePage}
      onDelete={handleDelete}
    />
  )
}
