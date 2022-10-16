import { ListRecords } from "@/components/List"
import { StudentsExample } from "./utils"

export const ListStudents = () => {
  const TableHeaders = ["Fullname", "Faculty", "Enrolled Credits", "Actions"]

  return (
    <ListRecords
      title="Students"
      route="students"
      headers={ TableHeaders }
      data={ StudentsExample }
      searchKeys={ ["fullname", "faculty"] }
    />
  )
}
