import type { Student } from "@/types/RecordModel"
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query"
import { getStudents, deleteStudent } from "@/api/auth"
import { ListRecords } from "@/components/List"

export const ListStudents = () => {
  const TableHeaders = ["Fullname", "Faculty", "Enrolled Credits", "Actions"]

  const queryClient = useQueryClient()
  const { data, isLoading, isError } = useQuery(["students"], getStudents)
  const { mutate } = useMutation(deleteStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"])
    },
  })

  const handleDelete = (code: string) => mutate(code)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error</p>

  return (
    <ListRecords
      title="Students"
      route="students"
      headers={ TableHeaders }
      data={ data as Student[] }
      searchKeys={ ["fullname", "faculty"] }
      onDelete={ handleDelete }
    />
  )
}
