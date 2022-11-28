import { useQuery } from "@tanstack/react-query"
import {
  getStudentsCount,
  getTeachersCount,
  getCoursesCount
} from "@/api/extras"
import { HomeItem } from "@/components/Home"
import { ErrorView } from "@/components/Error"
import styles from "./styles.module.css"

export const Home = () => {
  const { data: studentsCount, isSuccess: successStudents } = useQuery(
    ["students-count"],
    getStudentsCount
  )
  const { data: teachersCount, isSuccess: successTeachers } = useQuery(
    ["teachers-count"],
    getTeachersCount
  )
  const { data: coursesCount, isSuccess: successCourses } = useQuery(
    ["courses-count"],
    getCoursesCount
  )

  if (!successStudents || !successTeachers || !successCourses) {
    return <ErrorView message="Error while fetching results" />
  }

  return (
    <main>
      <h1 className={styles.title}>Welcome Admin!</h1>
      <div className={styles["links-container"]}>
        <HomeItem
          intent="primary"
          icon="people"
          title="Students"
          count={studentsCount}
          description="View students fullname, faculty and enrolled credits"
        />
        <HomeItem
          intent="success"
          icon="learning"
          title="Teachers"
          count={teachersCount}
          description="View teachers fullname, academic title and years experience"
        />
        <HomeItem
          intent="warning"
          icon="book"
          title="Courses"
          count={coursesCount}
          description="View courses name, precourse, required credits and quota"
        />
      </div>
    </main>
  )
}
